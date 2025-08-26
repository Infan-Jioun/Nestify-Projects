"use client"
import React, { useEffect } from "react"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/lib/store"
import { setUsers, deletedUser } from "@/app/features/user/userAuthSlice"
import { setLoading } from "@/app/features/loader/loaderSlice"
import NextHead from "@/app/components/NextHead/NextHead"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { TiUserDeleteOutline } from "react-icons/ti"
import DeletedConfirmation from "@/app/components/DeleteConfirmation/DeleteConfirmation"

type User = {
  _id: string
  name: string
  email: string
  image?: string | null
  role: string
  provider?: string
  createdAt?: string
}

export default function UserInformation() {
  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector((state: RootState) => state?.user.users)
  const loading = useSelector((state: RootState) => state?.loader.loading)

  const [deleteUser, setDeleteUser] = React.useState<User | null>(null)

  // fetch users
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/users")
        const data: User[] = await res.json()
        dispatch(setUsers(data))
        dispatch(setLoading(false))
      } catch (err) {
        console.error("Error fetching users:", err)
        dispatch(setLoading(false))
      }
    }
    fetchUsers()
  }, [dispatch])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold animate-pulse">
        Loading...
      </div>
    )
  }

  if (!users || users.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        No users found.
      </div>
    )
  }

  return (
    <div className="p-6">
      <NextHead title="User Information - Nestify" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {users.map((user: User, index: number) => (
          <motion.div
            key={user._id || user.email}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl shadow-lg p-5 border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center hover:shadow-2xl transition"
          >
            <Image
              src={
                user.image ||
                "/image/businessman-character-avatar-isolated.png"
              }
              alt={user.name}
              width={80}
              height={80}
              className="rounded-full border border-gray-300 dark:border-gray-600 shadow-sm"
            />
            <h2 className="mt-3 font-semibold text-lg text-gray-800 dark:text-gray-200">
              {user.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {user.email}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {user.provider ? `Provider: ${user.provider}` : "Provider: N/A"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Joined:{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
            <span
              className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${user.role === "admin"
                  ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                  : user.role === "moderator"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                    : user.role === "owner"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                }`}
            >
              {user.role || "guest"}
            </span>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDeleteUser(user)}
              className="mt-4 w-72 mx-auto bg-red-500 hover:bg-red-600 text-white"
            >
              <TiUserDeleteOutline className="mr-2" /> Delete
            </Button>
          </motion.div>
        ))}
      </motion.div>

      {/* Delete confirmation modal */}
      {deleteUser && (
        <DeletedConfirmation
          userId={deleteUser._id}
          userName={deleteUser.name}
          userEmail={deleteUser.email}
          onConfirm={(_id) => {
            dispatch(deletedUser(_id))
            setDeleteUser(null)
          }}
          onCancel={() => setDeleteUser(null)}
        />
      )}
    </div>
  )
}
