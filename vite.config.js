import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/cubeta-starter.tsx",
            refresh: false,
        }),
        react(),
        tailwindcss(),
        legacy({
            targets: ["chrome >= 49"],
            modernPolyfills: true,
        }),
    ],
    resolve: {
        alias: {
            "@": "/resources/js",
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (!id.includes("node_modules")) return;

                    // Core framework/runtime
                    if (
                        /node_modules\/(react|react-dom|scheduler)\//.test(id)
                    ) {
                        return "react";
                    }

                    // Inertia + helpers
                    if (/node_modules\/@inertiajs\//.test(id)) {
                        return "inertia";
                    }

                    // Radix UI (often many small packages)
                    if (/node_modules\/@radix-ui\//.test(id)) {
                        return "radix";
                    }

                    // Editors (TipTap is heavy; TinyMCE also heavy)
                    if (/node_modules\/(@tiptap\/|prosemirror-)/.test(id)) {
                        return "tiptap";
                    }
                    if (/node_modules\/(@tinymce\/|tinymce)/.test(id)) {
                        return "tinymce";
                    }

                    // Uploads / images
                    if (
                        /node_modules\/(filepond|react-filepond|filepond-plugin-)/.test(
                            id,
                        )
                    ) {
                        return "filepond";
                    }

                    // UI/UX libs
                    if (
                        /node_modules\/(sweetalert2|sweetalert2-react-content|react-toastify|sonner)/.test(
                            id,
                        )
                    ) {
                        return "notifications";
                    }

                    // Icons
                    if (
                        /node_modules\/(lucide-react|@tabler\/icons-react)/.test(
                            id,
                        )
                    ) {
                        return "icons";
                    }

                    // HTTP
                    if (/node_modules\/axios\//.test(id)) {
                        return "axios";
                    }

                    // Everything else
                    return "vendor";
                },
            },
        },
    },
    server: {
        watch: {
            ignored: [
                "**/*.php", // ignore all PHP files
            ],
        },
    },
});
