import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "CodeType | A minimal typing test",
    description:
        "A minimal typing test to improve your typing skills, choose between random words, quotes or blocks of code",
    icons: {
        icon: "./icon.svg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`antialiased ${inter.className}`}>
                <main className="min-h-screen flex flex-col justify-between items-center bg-background text-foreground">
                    {children}
                </main>
            </body>
        </html>
    );
}
