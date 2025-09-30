"use client"

import * as React from "react"
import {
  AreaChartIcon,
  AudioWaveform,
  Command,
  Plus,
  User,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
// import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useSession } from "next-auth/react"
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();

  const data = {
    user: {
      name: session?.user.name ?? "Guest User",
      email: session?.user.email ?? "guest@mail.com",
      avatar: session?.user.image ?? "../public/image/businessman-character-avatar-isolated.png",
    },
    teams: [

      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
    navMain: [
      {
        title: "User Management",
        url: "#",
        icon: User,
        isActive: true,
        items: [
          {
            title: "Users Information",
            url: "/dashboard/users-information",
          },

        ],
      },
      {
        title: "Properties",
        url: "#",
        icon: Plus,
        items: [
          {
            title: "Add Property",
            url: "/dashboard/add-property",
          },

        ],
      },
      {
        title: "Cities",
        url: "#",
        icon: AreaChartIcon,
        items: [
          {
            title: "Add city",
            url: "/dashboard/add-city",
          },

        ],
      },
      {
        title: "Blog",
        url: "#",
        icon: Plus,
        items: [
          {
            title: "Add Blog",
            url: "/dashboard/add-blog",
          },

        ],
      },

    ],

  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
