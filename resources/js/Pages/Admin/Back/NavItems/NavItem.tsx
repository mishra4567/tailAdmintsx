import { useEffect, useRef, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

import { useSidebar } from "@/Pages/Admin/tailadmin-source";
import { ChevronDownIcon } from "@/Pages/Admin/tailadmin-source/icons";

import type { NavItemType } from "../index";
import { usePathname } from "../../tailadmin-source/hooks/usePathname";

interface NavItemProps {
    items: NavItemType[];
    menuType: "main" | "others";
}

export default function NavItem({ items, menuType }: NavItemProps) {
    const { isExpanded, isHovered, isMobileOpen } = useSidebar();
    const { t } = useTranslation();

    // const { url } = usePage();
    // const pathname = url.split("?")[0];
    const pathname = usePathname();

    const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);

    const [subMenuHeight, setSubMenuHeight] = useState<Record<number, number>>(
        {},
    );

    const subMenuRefs = useRef<Record<number, HTMLDivElement | null>>({});

    const expanded = isExpanded || isHovered || isMobileOpen;

    const isActive = (path: string) => pathname === path;

    // Automatically open submenu containing the active page
    useEffect(() => {
        const activeIndex = items.findIndex((item) =>
            item.subItems?.some((subItem) => isActive(subItem.path)),
        );

        setOpenSubmenu(activeIndex === -1 ? null : activeIndex);
    }, [pathname, items]);

    // Calculate submenu height for animation
    useEffect(() => {
        if (openSubmenu !== null) {
            const element = subMenuRefs.current[openSubmenu];

            if (element) {
                setSubMenuHeight((prev) => ({
                    ...prev,
                    [openSubmenu]: element.scrollHeight,
                }));
            }
        }
    }, [openSubmenu, expanded]);

    const handleToggle = (index: number) => {
        setOpenSubmenu((previous) => (previous === index ? null : index));
    };

    return (
        <ul className="flex flex-col gap-1">
            {items.map((item, index) => {
                const active = item.path ? isActive(item.path) : false;
                const submenuOpen = openSubmenu === index;

                return (
                    <li key={`${menuType}-${item.name}`}>
                        {item.subItems ? (
                            <button
                                type="button"
                                onClick={() => handleToggle(index)}
                                className={`group menu-item ${
                                    submenuOpen
                                        ? "menu-item-active"
                                        : "menu-item-inactive"
                                } ${
                                    !expanded
                                        ? "xl:justify-center"
                                        : "xl:justify-start"
                                }`}
                            >
                                <span
                                    className={`menu-item-icon-size ${
                                        submenuOpen
                                            ? "menu-item-icon-active"
                                            : "menu-item-icon-inactive"
                                    }`}
                                >
                                    {item.icon}
                                </span>

                                {expanded && (
                                    <>
                                        <span className="menu-item-text">
                                            {item.key
                                                ? t(`sidebar.items.${item.key}`)
                                                : item.name}
                                        </span>

                                        <ChevronDownIcon
                                            className={`ms-auto h-5 w-5 transition-transform ${
                                                submenuOpen
                                                    ? "rotate-180 text-brand-500"
                                                    : ""
                                            }`}
                                        />
                                    </>
                                )}
                            </button>
                        ) : (
                            item.path && (
                                <Link
                                    href={item.path}
                                    target={item.target}
                                    className={`group menu-item ${
                                        active
                                            ? "menu-item-active"
                                            : "menu-item-inactive"
                                    }`}
                                >
                                    <span className="menu-item-icon-size menu-item-icon-inactive">
                                        {item.icon}
                                    </span>

                                    {expanded && (
                                        <span className="menu-item-text">
                                            {item.key
                                                ? t(`sidebar.items.${item.key}`)
                                                : item.name}
                                        </span>
                                    )}
                                </Link>
                            )
                        )}

                        {item.subItems && expanded && (
                            <div
                                ref={(element) => {
                                    subMenuRefs.current[index] = element;
                                }}
                                className="overflow-hidden transition-all duration-300"
                                style={{
                                    height: submenuOpen
                                        ? `${subMenuHeight[index] || 0}px`
                                        : "0px",
                                }}
                            >
                                <ul className="ms-9 mt-2 space-y-1">
                                    {item.subItems.map((subItem) => (
                                        <li key={subItem.path}>
                                            <Link
                                                href={subItem.path}
                                                target={subItem.target}
                                                className={`menu-dropdown-item ${
                                                    isActive(subItem.path)
                                                        ? "menu-dropdown-item-active"
                                                        : "menu-dropdown-item-inactive"
                                                }`}
                                            >
                                                {subItem.key
                                                    ? t(
                                                          `sidebar.items.${subItem.key}`,
                                                      )
                                                    : subItem.name}

                                                <span className="ms-auto flex gap-1">
                                                    {subItem.new && (
                                                        <span className="menu-dropdown-badge">
                                                            {t(
                                                                "sidebar.badges.new",
                                                            )}
                                                        </span>
                                                    )}

                                                    {subItem.pro && (
                                                        <span className="menu-dropdown-badge-pro">
                                                            {t(
                                                                "sidebar.badges.pro",
                                                            )}
                                                        </span>
                                                    )}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
