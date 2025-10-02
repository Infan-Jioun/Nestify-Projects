"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react"
import { BookOpenIcon, Layers2Icon, LogOutIcon } from "lucide-react";
import Image from "next/image";
import profileImage from './../../../public/image/businessman-character-avatar-isolated.png'
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect } from "react";
import { setCurrentUser } from "@/app/features/user/userAuthSlice";
import { useDispatch, useSelector } from "react-redux"

export function DropdownAvatar() {
  const users = useSelector((state: RootState) => state?.user?.users || []);
  const currentUser = useSelector((state: RootState) => state?.user?.currentUser);
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  // Set current user when component mounts or users change
  useEffect(() => {
    if (users.length > 0 && !currentUser) {
      // You might want to set the logged-in user instead of first user
      // For now, using first user as example
      dispatch(setCurrentUser(users[0]));
    }
  }, [users, currentUser, dispatch]);

  // Fallback to session data if no currentUser in Redux
  const displayUser = currentUser || {
    _id: session?.user?.id,
    name: session?.user?.name,
    email: session?.user?.email,
    image: session?.user?.image
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage
              className="w-10 h-10 rounded-full border-2 border-green-100"
              src={displayUser?.image || session?.user?.image || ""}
              alt="Profile"
            />
            <AvatarFallback>
              <Image
                src={profileImage}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full border-2"
              />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align="end">
          <DropdownMenuLabel className="flex min-w-0 flex-col">
            <span className="text-foreground truncate text-sm font-medium">
              {displayUser?.name || session?.user?.name || "User"}
            </span>
            <span className="text-muted-foreground truncate text-xs font-normal">
              {displayUser?.email || session?.user?.email || "No email"}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href={`/Profile/${displayUser?._id || session?.user?.id || ''}`} className="flex items-center w-full">
                <CgProfile size={16} className="opacity-60 mr-2" aria-hidden="true" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard" className="flex items-center w-full">
                <Layers2Icon size={16} className="opacity-60 mr-2" aria-hidden="true" />
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/bookmark" className="flex items-center w-full">
                <BookOpenIcon size={16} className="opacity-60 mr-2" aria-hidden="true" />
                <span>Bookmark</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => signOut()}
            className="cursor-pointer"
          >
            <LogOutIcon size={16} className="opacity-60 mr-2" aria-hidden="true" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}