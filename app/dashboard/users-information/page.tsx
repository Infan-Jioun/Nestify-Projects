"use client"
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { setUsers } from '@/app/features/user/userAuthSlice'
type User = {
  id: string
  name: string
  email: string
  image?: string | null
  role: string
}
export default function UserInformation() {
  // const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.user.users);
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/users")
        const data: User[] = await res.json();
        // setUsers(data);
        dispatch(setUsers(data))
        setLoading(false);
      } catch (err) {
        console.error("Error fetching users:", err)
        setLoading(false)
      }
    } fetchUsers();
  }, [dispatch])
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }
  if (!users || users.length === 0) {
    return <div className="flex justify-center items-center h-screen">No users found.</div>
  }
  return (
    <div>
      <Table>
        <TableCaption>A list of User recent data.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]"></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            users.map((user: User) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <Image
                    src={user.image || "/image/businessman-character-avatar-isolated.png"}
                    alt={user.name}
                    width={50}
                    height={50}
                    className="rounded-full" />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-right">{user.role || "guest"}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}
