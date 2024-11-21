import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "CodeType | A minimal typing test",
    description:
        "A minimal typing test to improve your typing skills, choose between random words, quotes or blocks of code",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${lexend.className} antialiased`}>{children}</body>
        </html>
    );
}
