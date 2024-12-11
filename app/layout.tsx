import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/components/providers/Provider";

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
        <html lang="en">
            <body className={`${inter.className} antialiased`}>
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
