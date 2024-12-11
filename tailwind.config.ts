import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            animation: {
                pulsate: "pulsate 1.2s linear infinite",
            },
            keyframes: {
                pulsate: {
                    "0%, 100%": { scale: "1" },
                    "50%": { opacity: "0.75", scale: "0.9" },
                },
            },
            colors: {
                background: "var(--background-color)",
                foreground: "var(--color)",
                accent: "var(--accent-color)",
            },
        },
    },
    plugins: [],
} satisfies Config;
