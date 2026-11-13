// resources/js/Pages/Admin/tailadmin-source/hooks/usePathname.ts
import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

export function usePathname(): string {
    const [path, setPath] = useState(() => window.location.pathname);

    useEffect(() => {
        const off = router.on("navigate", () =>
            setPath(window.location.pathname),
        );
        return () => off();
    }, []);

    return path;
}
