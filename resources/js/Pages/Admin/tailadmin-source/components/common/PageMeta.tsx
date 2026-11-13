// ./resources/js/Pages/Admin/tailadmin-source/components/common/PageMeta.tsx
import type { ReactNode } from "react";
import { Head } from "@inertiajs/react";

const PageMeta = ({
    title,
    description,
}: {
    title: string;
    description?: string;
}) => (
    <Head title={title}>
        {description && <meta name="description" content={description} />}
    </Head>
);

// Kept so existing imports don't break. Inertia needs no provider.
export const AppWrapper = ({ children }: { children: ReactNode }) => (
    <>{children}</>
);

export default PageMeta;
