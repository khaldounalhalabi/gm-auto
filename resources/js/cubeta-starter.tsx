import AuthLayout from "@/Components/layouts/AuthLayout";
import Layout from "@/Components/layouts/Layout";
import FatalErrorPage from "@/FatalError";
import ErrorBoundary from "@/Handlers/ErrorBoundry";
import { createInertiaApp } from "@inertiajs/react";
import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "../css/cubeta-starter.css";
import "./bootstrap";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

const authPages = [
    "login",
    "forget-password",
    "reset-password-code-form",
    "reset-password",
];

type PageWithLayout = React.ComponentType & {
    layout?: (page: React.ReactNode) => React.ReactNode;
};

Promise.resolve()
    .then(() =>
        createInertiaApp({
            title: () => `${appName} Dashboard`,
            resolve: (name: string) => {
                const pages = import.meta.glob<{
                    default: PageWithLayout;
                }>("./Pages/**/*.tsx", { eager: true });

                let page = pages[`./Pages/${name}.tsx`];
                if (!page) {
                    throw new Error(`Page "${name}" not found`);
                }

                page.default.layout = !authPages.includes(name)
                    ? (page) => <Layout>{page}</Layout>
                    : (page) => <AuthLayout>{page}</AuthLayout>;

                return page;
            },
            setup({ el, App, props }) {
                const root = createRoot(el);

                root.render(
                    <ErrorBoundary>
                        <Suspense fallback={<div>Loading...</div>}>
                            <App {...props} />
                        </Suspense>
                    </ErrorBoundary>,
                );
            },
            progress: {
                color: "#4B5563",
            },
        }),
    )
    .catch((error) => {
        const el =
            document.getElementById("app") ||
            document.body.appendChild(document.createElement("div"));
        const root = createRoot(el);
        root.render(<FatalErrorPage error={error} />);
    });
