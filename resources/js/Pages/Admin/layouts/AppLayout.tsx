// ./resources/js/Pages/Admin/layouts/AppLayout.tsx

import type { ReactNode } from "react";

import { cn, useSidebar } from "@/Pages/Admin/tailadmin-source";

import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import Backdrop from "./Backdrop";

interface LayoutContentProps {
    children: ReactNode;
}

const LayoutContent = ({ children }: LayoutContentProps) => {
    const { isExpanded, isHovered } = useSidebar();

    return (
        <div className="min-h-screen xl:flex">
            {/* Sidebar */}
            <AppSidebar />

            {/* Mobile backdrop */}
            <Backdrop />

            {/* Main content */}
            <div
                className={cn(
                    "min-w-0 flex-1 transition-[margin] duration-300 ease-in-out",
                    isExpanded || isHovered ? "xl:ms-72.5" : "xl:ms-22.5",
                )}
            >
                <AppHeader />

                <main className="mx-auto w-full max-w-(--breakpoint-2xl) p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

interface AppLayoutProps {
    children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
    return <LayoutContent>{children}</LayoutContent>;
};

export default AppLayout;

