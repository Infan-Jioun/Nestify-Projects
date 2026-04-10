"use client"

import { useSession } from "next-auth/react"
import { UserRole } from "@/app/Types/auth"
import AdminPage from "./admin/[userId]/page"
import RealEsateDeveloperPage from "./real_estate_developer/[userId]/page"

export default function Page() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500" />
      </div>
    )
  }

  const role = session?.user?.role

  if (role === UserRole.ADMIN) return <AdminPage />
  if (role === UserRole.REAL_ESTATE_DEVELOPER) return <RealEsateDeveloperPage />

  return (
    <div className="flex justify-center items-center h-64">
      <p className="text-gray-500">Unauthorized</p>
    </div>
  )
}