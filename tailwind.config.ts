import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "hsla(211, 28%, 17%, 1)",
                foreground: "hsla(222, 15%, 87%, 1)",
                accent: "hsla(160, 86%, 36%, 1)",
            },
        },
    },
    plugins: [],
} satisfies Config;
