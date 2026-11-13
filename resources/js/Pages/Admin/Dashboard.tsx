// ./js/Pages/Admin/Dashboard.tsx
import { Head } from "@inertiajs/react";
import { AdminLayout } from "./tailadmin-source";
import { Ecommerce } from "./pages";

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />

            {/* <AdminLayout> */}
                <Ecommerce />
                {/* <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">
                    Dashboard
                </h1> */}
            {/* </AdminLayout> */}
        </>
    );
}
