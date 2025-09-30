import {
  BoltIcon,
  BookOpenIcon,
  ChevronDownIcon,
  Layers2Icon,
  LogOutIcon,
  PinIcon,
  UserPenIcon,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";
import profileImage from './../../../public/image/businessman-character-avatar-isolated.png'
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { signOut, useSession } from "next-auth/react"
export function DropdownAvatar() {
  const { data: session } = useSession();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
            <Avatar>
              <AvatarImage className="w-16 h-16  rounded-full border-2 border-green-100" src={session?.user?.image ?? ""} />
              <AvatarFallback><Image src={profileImage} alt="unavilable" width={40} height={40} className="rounded-full border-2" /></AvatarFallback>
            </Avatar>
            <ChevronDownIcon
              size={16}
              className="opacity-60"
              aria-hidden="true"
            />
          </Button>
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
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
