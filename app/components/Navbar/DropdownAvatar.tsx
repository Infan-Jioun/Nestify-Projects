
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { signOut, useSession } from "next-auth/react"
import { BookOpenIcon, Layers2Icon, LayoutDashboardIcon, LogOut, LogOutIcon } from "lucide-react";
import Image from "next/image";
import profileImage from './../../../public/image/businessman-character-avatar-isolated.png'
import Link from "next/link";
import { CgProfile } from "react-icons/cg";

export function DropdownAvatar() {
  const { data: session } = useSession();
  return (
    <div>
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          {/* <motion.button
            whileHover={{ scale: 1.0, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="btn h-10 px-4 rounded-full bg-white text-black border border-gray-300 hover:text-green-500 transition"
          >
            Property
          </motion.button> */}
          <Avatar>
            <AvatarImage className="w-10 h-10  rounded-full border-2 border-green-100" src={session?.user?.image ?? ""} />
            <AvatarFallback><Image src={profileImage} alt="unavilable" width={40} height={40} className="rounded-full border-2" /></AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-64">
          <DropdownMenuLabel className="flex min-w-0 flex-col">
            <span className="text-foreground truncate text-sm font-medium">
              {session?.user?.name}
            </span>
            <span className="text-muted-foreground truncate text-xs font-normal">
              {session?.user?.email}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <CgProfile size={16} className="opacity-60" aria-hidden="true" />
              <Link href={"/Profile"}> Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Layers2Icon size={16} className="opacity-60" aria-hidden="true" />
              <Link href="/dashboard"> Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BookOpenIcon size={16} className="opacity-60" aria-hidden="true" />
              <Link href="/Bookmark"> Bookmark</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>  <DropdownMenuContent className="w-56 mr-4.5" align="start">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>


            <DropdownMenuItem>

              <Link className="flex  items-center gap-3" href={"/dashboard"}>
                <LayoutDashboardIcon />
                Dashboard
              </Link>
              <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            </DropdownMenuItem>


          </DropdownMenuGroup>

          <DropdownMenuItem>Support</DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut /> Log out
            {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
