import { Dispatch, SetStateAction, useState } from "react";
import { Themes } from "@/themes";

type Props = {
    currentTheme: string | undefined;
    setTheme: Dispatch<SetStateAction<string>>;
};

export default function ThemeSelector({ currentTheme, setTheme }: Props) {
    const [selectThemeOpen, isSelectThemeOpen] = useState<boolean>(false);

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
                <ul className="p-5 flex gap-4 flex-wrap mt-10">
                    {Themes.map((theme, i) => (
                        <li
                            key={i}
                            className="flex justify-center items-center cursor-pointer rounded-md w-40 h-20"
                            onClick={() => setTheme(theme.name)}
                            style={{
                                backgroundColor: `${theme.background}`,
                                color: `${theme.foreground}`,
                                border: `1px solid ${theme.accent}`,
                                outline: `1.5px solid ${
                                    currentTheme === theme.name
                                        ? `${theme.accent}`
                                        : `${theme.accent}`
                                }`,
                                outlineOffset: `${currentTheme === theme.name ? "5px" : "0px"}`,
                            }}
                        >
                            {theme.name.slice(0, -6)}
                        </li>
                    ))}
                </ul>
            </section>
        </section>
    );
}
