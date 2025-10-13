"use client"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/lib/store"
import { setUsers, setUserLoader, deleteUser } from "../../features/user/userAuthSlice"
import NextHead from "@/app/components/NextHead/NextHead"
import { toast } from "react-hot-toast"
import DeleteConfirmation from "@/app/components/DeleteConfirmation/DeleteConfirmation"
import UserHeader from "./Components/UserHeader"
import UserSkeletonGrid from "./Components/UserSkeletonGrid"
import UserGrid from "./Components/UserGrid"
import UserEmptyState from "./Components/UserEmptyState"
import { User } from "@/app/Types/user"
import { useRoleGuard } from "@/app/hook/useRoleGuard"
import { UserRole } from "@/app/Types/auth"

export default function UserInformation() {
  useRoleGuard({
    allowedRoles: [UserRole.ADMIN],
    callbackUrl: "/dashboard/users-information"
  })
  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector((state: RootState) => state.user.users)
  const userLoader = useSelector((state: RootState) => state.user.userLoader)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [sortedUsers, setSortedUsers] = useState<User[]>([])

  useEffect(() => {
    async function fetchUsers() {
      try {
        dispatch(setUserLoader(true))
        const res = await fetch("/api/users")
        const data: User[] = await res.json()
        dispatch(setUsers(data))
      } catch (err) {
        console.error("Error fetching users:", err)
        toast.error("Failed to fetch users")
      } finally {
        dispatch(setUserLoader(false))
      }
    }
    fetchUsers()
  }, [dispatch])

  
  useEffect(() => {
    if (users.length > 0) {
      const sorted = [...users].sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
        return dateB - dateA
      })
      setSortedUsers(sorted)
    } else {
      setSortedUsers([])
    }
  }, [users])

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return
    try {
      await dispatch(deleteUser(userToDelete._id)).unwrap()
      toast.success(`User ${userToDelete.name} deleted successfully`)
      setUserToDelete(null)
    } catch (error) {
      console.error("Delete error:", error)
      toast.error("Failed to delete user")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 p-6">
      <NextHead title="User Management - Nestify" />
      <UserHeader totalUsers={users.length} />

      {userLoader ? <UserSkeletonGrid /> : sortedUsers.length > 0 ? (
        <UserGrid users={sortedUsers} onDelete={setUserToDelete} />
      ) : <UserEmptyState />}

      {userToDelete && (
        <DeleteConfirmation
          userId={userToDelete._id}
          userName={userToDelete.name}
          userEmail={userToDelete.email}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setUserToDelete(null)}
        />
      )}
    </div>
  )
}