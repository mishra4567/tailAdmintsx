import { router } from "@inertiajs/react";

const useGoBack = () => {
    const goBack = () => {
        if (window.history.state && window.history.state.idx > 0) {
            window.history.back();
        } else {
            router.visit("/admin/dashboard");
        }
    };

    return goBack;
};

export default useGoBack;
