"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogInIcon,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Image from "next/image"
import profileImage from './../public/image/businessman-character-avatar-isolated.png'
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { motion } from "framer-motion"
export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { data: session } = useSession();
  const { isMobile } = useSidebar()

  const handelSignOut = async () => {
    await signOut({ redirect: false })
  }
  return (
    <SidebarMenu>
      {
        session ? (<SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar>
                  <AvatarImage className="w-10 h-10  rounded-full border-2 border-green-100" src={user?.avatar ?? ""} />
                  <AvatarFallback><Image src={profileImage} alt="unavilable" width={40} height={40} className="rounded-full border-2" /></AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user?.avatar ?? ""} alt={user.name} />
                    <AvatarFallback><Image src={profileImage} alt="unavilable" width={40} height={40} className="rounded-full border-2" /></AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Sparkles />
                  Upgrade to Pro
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              {
                session ? (<DropdownMenuItem onClick={() => handelSignOut()}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>) : (
                  <DropdownMenuItem>

                    <Link href="/LoginPage">
                      <motion.button
                        whileHover={{ scale: 1.0 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-4 flex justify-center items-center p-2 gap-2 rounded-full hover:text-white bg-green-500 text-white hover:bg-green-600 font-semibold transition"
                      >
                        <LogInIcon /> Login
                      </motion.button>
                    </Link>
                  </DropdownMenuItem>
                )
              }
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>) : (<DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuItem>

              <Link href="/LoginPage">
                <motion.button
                  whileHover={{ scale: 1.0 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-4 flex justify-center items-center p-2 gap-2 rounded-full hover:text-white bg-green-500 text-white hover:bg-green-600 font-semibold transition"
                >
                  <LogInIcon /> Login
                </motion.button>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>)
      }
    </SidebarMenu>
  )
}
