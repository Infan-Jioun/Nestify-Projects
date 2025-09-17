"use client"
import React, { useEffect } from "react"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/lib/store"
import { setUsers, deletedUser, setUserLoader } from "@/app/features/user/userAuthSlice"
import { setLoading } from "@/app/features/loader/loaderSlice"
import NextHead from "@/app/components/NextHead/NextHead"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { TiUserDeleteOutline } from "react-icons/ti"
import DeletedConfirmation from "@/app/components/DeleteConfirmation/DeleteConfirmation"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

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
  const userLoader = useSelector((state: RootState) => state?.user.userLoader)

  const [deleteUser, setDeleteUser] = React.useState<User | null>(null)

  useEffect(() => {
    async function fetchUsers() {
      try {
        dispatch(setUserLoader(true));
        const res = await fetch("/api/users");
        const data: User[] = await res.json();
        dispatch(setUsers(data));
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        dispatch(setUserLoader(false));
      }
    }
    fetchUsers();
  }, [dispatch]);

  // skeleton card design
  const renderSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {[...Array(6)].map((_, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700"
        >
          <Skeleton circle height={96} width={96} />
          <Skeleton width={120} height={20} className="mt-4" />
          <Skeleton width={180} height={15} className="mt-2" />
          <Skeleton width={100} height={15} className="mt-2" />
          <Skeleton width={80} height={25} className="mt-4 rounded-full" />
          <Skeleton width={`100%`} height={40} className="mt-5 rounded-xl" />
        </div>
      ))}
    </div>
  )

  return (
    <div className="p-6">
      <NextHead title="User Information - Nestify" />

      {userLoader || !users || users.length === 0 ? (
        renderSkeleton()
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {users.map((user: User, index: number) => (
            <motion.div
              key={user._id || user.email}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700 hover:scale-105 hover:shadow-2xl transition-transform duration-300"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-green-200 drop-shadow-2xl">
                <Image
                  src={user.image || "/image/businessman-character-avatar-isolated.png"}
                  alt={user.name}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
              <h2 className="mt-4 font-bold text-xl text-gray-800 dark:text-gray-200">
                {user.name}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{user.email}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {user.provider ? `Provider: ${user.provider}` : "Provider: N/A"}
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                Joined:{" "}
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
              </p>

              <span
                className={`mt-3 px-4 py-1 rounded-full text-sm font-medium ${user.role === "admin"
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
                className="mt-5 flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow hover:shadow-lg transition-all duration-200"
              >
                <TiUserDeleteOutline className="mr-2 text-lg" /> Delete
              </Button>
            </motion.div>
          ))}
        </motion.div>
      )}

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
