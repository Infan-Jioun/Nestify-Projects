import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { signOut, useSession } from "next-auth/react"
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
export function DropdownAvatar() {
  const { data: session } = useSession();
  return (
    <div className="">
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
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mr-4.5" align="start">
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
      
          </DropdownMenuGroup>
    
          <DropdownMenuItem>Support</DropdownMenuItem>
   
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
           <LogOut/> Log out
            {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
