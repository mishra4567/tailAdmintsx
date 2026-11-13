// ./resources/js/Pages/Admin/layouts/AdminLayout.tsx
import type { PropsWithChildren } from "react";

import {
    SidebarProvider,
    useSidebar,
} from "@/Pages/Admin/tailadmin-source/context/SidebarContext";
import { ThemeProvider } from "@/Pages/Admin/tailadmin-source/context/ThemeContext";
import { LanguageProvider } from "@/Pages/Admin/tailadmin-source/context/LanguageContext";

import AppHeader from "@/Pages/Admin/layouts/AppHeader";
import AppSidebar from "@/Pages/Admin/layouts/AppSidebar";
import Backdrop from "@/Pages/Admin/layouts/Backdrop";

function LayoutContent({ children }: PropsWithChildren) {
    const { isExpanded, isHovered, isMobileOpen } = useSidebar();

    const sidebarExpanded = isExpanded || isHovered;

    return (
        <div className="min-h-screen xl:flex">
            <AppSidebar />

            <Backdrop />

            <div
                className={`min-w-0 flex-1 transition-[margin] duration-300 ease-in-out ${
                    isMobileOpen
                        ? "ms-0"
                        : sidebarExpanded
                          ? "xl:ms-72.5"
                          : "xl:ms-22.5"
                }`}
            >
                <AppHeader />

                <main className="mx-auto w-full max-w-(--breakpoint-2xl) p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default function AdminLayout({ children }: PropsWithChildren) {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <SidebarProvider>
                    <LayoutContent>{children}</LayoutContent>
                </SidebarProvider>
            </LanguageProvider>
        </ThemeProvider>
    );
}
