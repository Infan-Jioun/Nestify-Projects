"use client"

import * as React from "react"
import {
  AreaChartIcon, AudioWaveform, Command,
  Menu, Plus, User, Home, FileText, ChevronRight
} from "lucide-react"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar, SidebarContent, SidebarFooter,
  SidebarHeader, SidebarRail,
} from "@/components/ui/sidebar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useSession } from "next-auth/react"
import { UserRole } from "@/app/Types/auth"
import { cn } from "@/lib/utils"
import Link from "next/link"

// ─── Skeleton ────────────────────────────────────────────────────────────────
function SidebarSkeleton() {
  return (
    <>
      <SidebarHeader className="border-b border-zinc-800 p-4">
        <div className="h-8 w-32 rounded-lg bg-zinc-800 animate-pulse" />
      </SidebarHeader>
      <SidebarContent className="p-3">
        <div className="flex flex-col gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="h-9 w-full rounded-lg bg-zinc-800 animate-pulse" />
              <div className="ml-9 h-6 w-3/4 rounded-md bg-zinc-800/60 animate-pulse" />
            </div>
          ))}
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t border-zinc-800 p-3">
        <div className="flex items-center gap-3 p-2">
          <div className="h-8 w-8 rounded-full bg-zinc-800 animate-pulse flex-shrink-0" />
          <div className="flex flex-col gap-1 flex-1">
            <div className="h-3 w-24 rounded bg-zinc-800 animate-pulse" />
            <div className="h-2.5 w-16 rounded bg-zinc-800/60 animate-pulse" />
          </div>
        </div>
      </SidebarFooter>
    </>
  )
}

// ─── Inner content ────────────────────────────────────────────────────────────
interface SidebarInnerProps {
  status: string
  teams: { name: string; logo: React.ElementType; plan: string }[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterNav: any[]
  user: { name: string; email: string; avatar: string }
  role?: string
}

function SidebarInner({ status, teams, filterNav, user, role }: SidebarInnerProps) {
  if (status === "loading") return <SidebarSkeleton />

  return (
    <>
      <SidebarHeader className="border-b border-zinc-800">
        <div className="flex items-center gap-2.5 px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600  flex-shrink-0">
            <Link href={"/"}><Home className="text-white" /></Link>
          </div>
          {role && (
            <span className="ml-auto text-[10px] rounded-full border border-green-800 bg-green-950 px-2 py-0.5 text-green-400">
              {role}
            </span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <NavMain items={filterNav} />
      </SidebarContent>

      <SidebarFooter className="border-t border-zinc-800 p-2">
        <NavUser user={user} />
      </SidebarFooter>
    </>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const userRole = session?.user?.role as UserRole
  const userId = session?.user?.id

  const teams = [
    { name: "Nestify", logo: AudioWaveform, plan: "Pro" },
    { name: "Evil Corp.", logo: Command, plan: "Free" },
  ]

  const user = {
    name: session?.user?.name ?? "Guest User",
    email: session?.user?.email ?? "guest@mail.com",
    avatar: session?.user?.image ?? "",
  }

  const navMain = [
    {
      title: "Properties",
      url: "#",
      icon: Home,
      roles: [UserRole.ADMIN, UserRole.REAL_ESTATE_DEVELOPER],
      items: [
        { title: "Add Property", url: "/dashboard/add-property" },
        { title: "MyProperties", url: "/dashboard/MyProperties" },
      ],
    },
    {
      title: "User Management",
      url: "#",
      icon: User,
      roles: [UserRole.ADMIN],
      items: [
        { title: "Users Information", url: "/dashboard/users-information" },
      ],
    },
    {
      title: "Cities",
      url: "#",
      icon: AreaChartIcon,
      roles: [UserRole.ADMIN],
      items: [
        { title: "Add City", url: "/dashboard/add-city", },
      ],
    },
    {
      title: "Blog",
      url: "#",
      icon: FileText,
      roles: [UserRole.ADMIN, UserRole.REAL_ESTATE_DEVELOPER],
      items: [
        { title: "Add Blog", url: "/dashboard/add-blog" },
      ],
    },
  ]

  const filterNav = navMain.filter(
    item => !item.roles || item.roles.includes(userRole)
  )

  const innerProps = {
    status,
    teams,
    filterNav,
    user,
    role: session?.user?.role,
  }

  return (
    <>
      {/* ── Mobile hamburger ── */}
      <div className="md:hidden fixed top-3 left-3 z-50">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg",
                "border border-zinc-700 bg-zinc-900 shadow-lg",
                "transition-all duration-200 hover:bg-zinc-800 hover:border-zinc-600",
                "active:scale-95"
              )}
            >
              <Menu className="h-4 w-4 text-zinc-300" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="p-0 w-64 bg-zinc-950 border-zinc-800"
          >
            <Sidebar
              collapsible="none"
              className="h-full border-none bg-zinc-950"
            >
              <SidebarInner {...innerProps} />
            </Sidebar>
          </SheetContent>
        </Sheet>
      </div>

      {/* ── Desktop sidebar ── */}
      <div className="hidden md:block">
        <Sidebar
          collapsible="icon"
          className="border-zinc-800 bg-zinc-950"
          {...props}
        >
          <SidebarInner {...innerProps} />
          <SidebarRail />
        </Sidebar>
      </div>
    </>
  )
}