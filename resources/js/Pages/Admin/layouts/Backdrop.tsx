// ./resources/js/Pages/Admin/layouts/Backdrop.tsx
import { useSidebar } from "@/Pages/Admin/tailadmin-source";

const Backdrop: React.FC = () => {
    const { isMobileOpen, toggleMobileSidebar } = useSidebar();

    if (!isMobileOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[9998] bg-gray-900/50 xl:hidden"
            onClick={toggleMobileSidebar}
            aria-hidden="true"
        />
    );
};

export default Backdrop;
