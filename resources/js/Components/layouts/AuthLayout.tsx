import { ThemeProvider } from "@/Components/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children?: ReactNode }) => {
    return (
        <ThemeProvider>
                <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background">
                    <div className="w-full max-w-sm">
                        <div className={cn("flex flex-col gap-6")}>
                            {children}
                        </div>
                    </div>
                </div>
        </ThemeProvider>
    );
};

export default AuthLayout;
