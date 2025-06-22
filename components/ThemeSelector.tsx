"use client";

import { useEffect, useState } from "react";
import { Themes } from "@/themes";
import { useTheme } from "next-themes";

export default function ThemeSelector() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (theme) {
            document.documentElement.className = theme;
        }
    }, [theme]);

    return (
        <section className="overflow-x-scroll">
            <ul className="flex justify-start items-center gap-10 w-[1900px] pt-2 pb-5 px-2">
                {Themes.map((themeItem, i) => (
                    <li
                        key={i}
                        className="relative flex justify-center items-center size-12 rounded-full cursor-pointer"
                        onClick={() => setTheme(themeItem.name)}
                        style={{
                            border: `2px solid ${themeItem.accent}`,
                            outline: `1px solid ${
                                mounted && theme === themeItem.name && `${themeItem.accent}`
                            }`,
                            outlineOffset: `${mounted && theme === themeItem.name ? "5px" : "0px"}`,
                        }}
                    >
                        <div
                            className="absolute top-0 left-0 w-full h-1/2"
                            style={{
                                borderRadius: "5rem 5rem 0 0",
                                backgroundColor: themeItem.background,
                            }}
                        ></div>
                        <div
                            className="absolute bottom-0 left-0 w-full h-1/2"
                            style={{
                                borderRadius: "0 0 5rem 5rem",
                                backgroundColor: themeItem.foreground,
                            }}
                        ></div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
