"use client"

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);
    const currentPage = segments[segments.length - 1] || "/Dashboard";

    const formattedPage = currentPage.replace(/-/g, "")
        .replace(/\b\w/g, (char) => char.toUpperCase())
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                {/* Dashboard Header */}
                <header className=" h-16 shrink-0 items-center gap-2 px-4 border-b">
                    <SidebarTrigger className="-ml-1" />
                    <Separator className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/Dashboard">Dashboard</BreadcrumbLink>
                            </BreadcrumbItem>
                            {segments.length > 1 && (
                                <>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>{formattedPage}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </>
                            )}
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>


                <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
