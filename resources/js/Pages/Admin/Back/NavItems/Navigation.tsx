// ./resources/js/Pages/Admin/Back/NavItem/NavItem.tsx
import type { ReactNode } from "react";
import {
    BoxCubeIcon,
    CalendarIcon,
    GridIcon,
    ListIcon,
    PageIcon,
    PieChartIcon,
    PlugInIcon,
    TableIcon,
    UserCircleIcon,
} from "@/Pages/Admin/tailadmin-source/icons";

// Admin URL prefix
const ADMIN_PREFIX = "/d";
// Generate admin URLs
const adminPath = (path: string) => `${ADMIN_PREFIX}/${path}`;

export interface NavSubItem {
    name: string;
    key?: string;
    path: string;
    pro?: boolean;
    new?: boolean;
    target?: string;
}

export interface NavItemType {
    name: string;
    key?: string;
    icon: ReactNode;
    path?: string;
    new?: boolean;
    target?: string;
    subItems?: NavSubItem[];
}

export const navItems: NavItemType[] = [
    {
        name: "Dashboard",
        key: "dashboard",
        icon: <GridIcon fontSize={24} />,
        subItems: [
            {
                name: "Ecommerce",
                key: "ecommerceHome",
                path: "/dashboard",
            },
            // {
            //     name: "Analytics",
            //     key: "analytics",
            //     path: "/analytics",
            // },
            // {
            //     name: "Marketing",
            //     key: "marketing",
            //     path: "/marketing",
            // },
            // {
            //     name: "CRM",
            //     key: "crm",
            //     path: "/crm",
            // },
            // {
            //     name: "Stocks",
            //     key: "stocks",
            //     path: "/stocks",
            // },
        ],
    },
    {
        name: "Calendar",
        key: "calendar",
        icon: <CalendarIcon fontSize={24} />,
        path: adminPath("calendar"),
    },
    {
        name: "User Profile",
        key: "userProfile",
        icon: <UserCircleIcon fontSize={24} />,
        path: adminPath("profile"),
    },
    {
        name: "Forms",
        key: "forms",
        icon: <ListIcon fontSize={24} />,
        subItems: [
            {
                name: "Form Elements",
                key: "formElements",
                path: adminPath('form-elements'),
            },
        ],
    },
    {
        name: "Tables",
        key: "tables",
        icon: <TableIcon fontSize={24} />,
        subItems: [
            {
                name: "Basic Tables",
                key: "basicTables",
                path: adminPath("basic-tables"),
            },
        ],
    },
    {
        name: "Pages",
        key: "pages",
        icon: <PageIcon fontSize={24} />,
        subItems: [
            {
                name: "Blank Page",
                key: "blankPage",
                path: adminPath("blank"),
            },
        ],
    },
];

export const othersItems: NavItemType[] = [
    {
        name: "Charts",
        key: "charts",
        icon: <PieChartIcon fontSize={24} />,
        subItems: [
            {
                name: "Line Chart",
                key: "lineChart",
                path: adminPath("line-chart"),
            },
            {
                name: "Bar Chart",
                key: "barChart",
                path: adminPath("bar-chart"),
            },
        ],
    },
    {
        name: "UI Elements",
        key: "uiElements",
        icon: <BoxCubeIcon fontSize={24} />,
        subItems: [
            { name: "Alerts", key: "alerts", path: adminPath("alerts") },
            { name: "Avatar", key: "avatar", path: adminPath("avatars") },
            { name: "Badge", key: "badge", path: adminPath("badge") },
            { name: "Buttons", key: "buttons", path: adminPath("buttons") },
            { name: "Images", key: "images", path: adminPath("images") },
            { name: "Videos", key: "videos", path: adminPath("videos") },
        ],
    },
    {
        name: "Authentication",
        key: "authentication",
        icon: <PlugInIcon fontSize={24} />,
        subItems: [
            { name: "Sign In", key: "signIn", path: adminPath("signin") },
            { name: "Sign Up", key: "signUp", path: adminPath("signup") },
        ],
    },
];
