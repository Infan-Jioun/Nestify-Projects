"use client"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut, useSession } from "next-auth/react"
import { BookOpenIcon, LogOutIcon, Save } from "lucide-react"
import Image from "next/image"
import profileImage from './../../../public/image/businessman-character-avatar-isolated.png'
import Link from "next/link"
import { CgProfile } from "react-icons/cg"
import { useEffect, useState } from "react"

type DisplayUser = {
  _id?: string
  name?: string
  email?: string
  image?: string | null
  slug?: string | null
}

export function DropdownAvatar() {

  const { data: session } = useSession()
  const [fetchedUser, setFetchedUser] = useState<DisplayUser | null>(null)

  useEffect(() => {
    async function fetchUser() {
      if (session?.user?.email) {
        try {
          const res = await fetch(`/api/users/${session.user.email}`)
          if (!res.ok) throw new Error("User not found")
          const data = await res.json()
          setFetchedUser(data)
        } catch (err) {
          console.error("Error fetching user:", err)
        }
      }
    }
    fetchUser()
  }, [session?.user?.email])


  const displayUser: DisplayUser = {
    _id: fetchedUser?._id || session?.user?.id,
    name: fetchedUser?.name || session?.user?.name,
    email: fetchedUser?.email || session?.user?.email,
    image: fetchedUser?.image || session?.user?.image,
    slug: fetchedUser?.slug || null,
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            className="w-10 h-10 rounded-full border-2 border-green-100"
            src={displayUser?.image || ""}
            alt="Profile"
          />
          <AvatarFallback>
            <Image
              src={profileImage}
              alt="Profile"
              width={100}
              height={100}
              className="rounded-full border-2"
            />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {displayUser?.name || "User"}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {displayUser?.email || "No email"}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              href={displayUser?.slug
                ? `/profile/${displayUser.slug}`
                : `/profile/${displayUser._id}`}
              className="flex items-center w-full"
            >
              <CgProfile size={16} className="opacity-60 mr-2" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/Bookmark" className="flex items-center w-full">
              <BookOpenIcon size={16} className="opacity-60 mr-2" />
              <span>Bookmark</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="flex lg:hidden">
            <Link href="/Properties/UserBookings" className="flex items-center w-full">
              <Save size={16} className="opacity-60 mr-2" />
              <span>My Bookings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
          <LogOutIcon size={16} className="opacity-60 mr-2" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}