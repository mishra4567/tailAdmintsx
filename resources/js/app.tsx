// resources/js/app.tsx
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import type { ComponentType, ReactNode } from "react";

import "@/Pages/i18n";
import "@/Pages/Admin/tailadmin-source/css/index.css";

import AdminLayout from "@/Pages/Admin/layouts/AdminLayout";

type PageWithLayout = ComponentType & {
    layout?: (page: ReactNode) => ReactNode;
};

// Lazy: each page becomes its own chunk, loaded when visited.
const pages = import.meta.glob<{ default: PageWithLayout }>([
    "./Pages/**/*.tsx",
    "!./Pages/Admin/tailadmin-source/**",
    "!./Pages/Admin/layouts/**",
    "!./Pages/Admin/Back/**",
]);
createInertiaApp({
    resolve: async (name) => {
        const importPage = pages[`./Pages/${name}.tsx`];

        if (!importPage) {
            throw new Error(`Page not found: ./Pages/${name}.tsx`);
        }

        const module = await importPage();
        const page = module.default;

        // Apply AdminLayout to every page automatically.
        page.layout =
            page.layout ??
            ((children) => <AdminLayout>{children}</AdminLayout>);

        return page;
    },

    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
