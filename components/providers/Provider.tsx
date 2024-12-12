"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

const Provider = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeProvider attribute="class" enableSystem={false}>
            {children}
        </ThemeProvider>
    );
};
export default Provider;
