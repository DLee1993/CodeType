"use client";

import { useEffect, useState } from "react";
import { Themes } from "@/themes";
import { useTheme } from "next-themes";

export default function ThemeSelector() {
    const [selectThemeOpen, isSelectThemeOpen] = useState<boolean>(false);
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    //# Set the theme
    useEffect(() => {
        if (theme) {
            document.documentElement.className = theme;
        }
    }, [theme]);

    return (
        <section>
            <button
                onClick={() => isSelectThemeOpen(true)}
                className="hover:text-accent hover:transition-colors"
            >
                themes
            </button>
            <section
                className={`${
                    selectThemeOpen ? "visible" : "hidden"
                } bg-background text-foreground w-full h-screen z-50 absolute top-0 left-0 overflow-x-hidden overflow-y-auto`}
            >
                <aside className="p-5 w-full flex justify-between items-center">
                    <h2>Select your favourite theme</h2>
                    <button
                        onClick={() => isSelectThemeOpen(false)}
                        className="bg-accent text-background px-4 py-1 rounded-sm"
                    >
                        X
                    </button>
                </aside>
                <ul className="p-5 flex justify-center md:justify-start gap-4 flex-wrap mt-10">
                    {Themes.map((themeItem, i) => (
                        <li
                            key={i}
                            className="flex justify-center items-center cursor-pointer rounded-md w-40 h-20"
                            onClick={() => setTheme(themeItem.name)}
                            style={{
                                backgroundColor: `${themeItem.background}`,
                                color: `${themeItem.foreground}`,
                                border: `1px solid ${themeItem.accent}`,
                                outline: `1px solid ${
                                    mounted && theme === themeItem.name && `${themeItem.accent}`
                                }`,
                                outlineOffset: `${
                                    mounted && theme === themeItem.name ? "5px" : "0px"
                                }`,
                            }}
                        >
                            {themeItem.name.slice(0, -6)}
                        </li>
                    ))}
                </ul>
            </section>
        </section>
    );
}
