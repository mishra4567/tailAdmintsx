// ./resources/js/Pages/Admin/layouts/AppSidebar.tsx
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

import { NavItem, navItems, othersItems } from "@/Pages/Admin/Back";

import {
    HorizontalDotsIcon,
    LogoIcon,
} from "@/Pages/Admin/tailadmin-source/icons";
// import {  } from "@/Pages/Admin/tailadmin-source/images";

import { useSidebar } from "@/Pages/Admin/tailadmin-source";

const AppSidebar: React.FC = () => {
    const { t } = useTranslation();

    const { isExpanded, isHovered, isMobileOpen, setIsHovered } = useSidebar();

    const expanded = isExpanded || isHovered;
    const showText = expanded || isMobileOpen;

    return (
        <aside
            className={`
                fixed left-0 top-0 z-[9999]
                flex h-screen flex-col
                w-[290px] max-w-[85vw]
                border-r border-gray-200
                bg-white px-5
                transition-all duration-300 ease-in-out
                dark:border-gray-800 dark:bg-gray-900

                ${expanded ? "xl:w-[290px]" : "xl:w-[90px]"}

                ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}

                xl:translate-x-0
            `}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Logo (also pushes the nav below the sticky mobile header) */}
            <div
                className={`flex py-8 ${
                    !showText ? "xl:justify-center" : "justify-start"
                }`}
            >
                <Link href="/dashboard">
                    <LogoIcon />
                </Link>
            </div>

            <div className="no-scrollbar flex flex-col overflow-y-auto overflow-x-hidden duration-300 ease-linear">
                <nav className="mb-6">
                    <div className="flex flex-col gap-4">
                        <div>
                            <h2
                                className={`mb-4 flex text-xs leading-5 text-gray-400 uppercase ${
                                    !showText
                                        ? "xl:justify-center"
                                        : "justify-start"
                                }`}
                            >
                                {showText ? (
                                    t("sidebar.groups.menu")
                                ) : (
                                    <HorizontalDotsIcon className="size-6" />
                                )}
                            </h2>

                            <NavItem items={navItems} menuType="main" />
                        </div>

                        <div>
                            <h2
                                className={`mb-4 flex text-xs leading-5 text-gray-400 uppercase ${
                                    !showText
                                        ? "xl:justify-center"
                                        : "justify-start"
                                }`}
                            >
                                {showText ? (
                                    t("sidebar.groups.others")
                                ) : (
                                    <HorizontalDotsIcon className="size-6" />
                                )}
                            </h2>

                            <NavItem items={othersItems} menuType="others" />
                        </div>
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default AppSidebar;
