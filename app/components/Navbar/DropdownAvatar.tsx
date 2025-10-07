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
import { useEffect, useState } from "react";
import { setCurrentUser } from "@/app/features/user/userAuthSlice";
import { useDispatch, useSelector } from "react-redux"

type DisplayUser = {
  _id?: string;
  name?: string;
  email?: string;
  image?: string | null;
  slug?: string | null;
};

export function DropdownAvatar() {
  const users = useSelector((state: RootState) => state?.user?.users || []);
  const currentUser = useSelector((state: RootState) => state?.user?.currentUser);
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const [fetchedUser, setFetchedUser] = useState<DisplayUser | null>(null);

  useEffect(() => {
    if (users.length > 0 && !currentUser) {
      dispatch(setCurrentUser(users[0]));
    }
  }, [users, currentUser, dispatch]);

  useEffect(() => {
    async function fetchUser() {
      if (session?.user?.email) {
        try {
          const res = await fetch(`/api/users/${session.user.email}`); // ID দিয়ে fetch
          if (!res.ok) throw new Error("User not found");
          const data = await res.json();
          setFetchedUser(data);
        } catch (err) {
          console.error("Error fetching user:", err);
        }
      }
    }
    fetchUser();
  }, [session?.user?.id]);

  const displayUser: DisplayUser = currentUser || fetchedUser || {
    _id: session?.user?.id,
    name: session?.user?.name,
    email: session?.user?.email,
    image: session?.user?.image,
    slug: null
  };

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
              href={displayUser?.slug ? `/profile/${displayUser.slug}` : `/profile/${displayUser._id}`}
              className="flex items-center w-full"
            >
              <CgProfile size={16} className="opacity-60 mr-2" aria-hidden="true" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/Bookmark" className="flex items-center w-full">
              <BookOpenIcon size={16} className="opacity-60 mr-2" aria-hidden="true" />
              <span>Bookmark</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/Properties/UserBookings" className="flex items-center w-full">
              <BookOpenIcon size={16} className="opacity-60 mr-2" aria-hidden="true" />
              <span>My Bookings</span>
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
  )
}
