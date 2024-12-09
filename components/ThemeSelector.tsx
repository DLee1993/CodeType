"use client";

import { Dispatch, SetStateAction } from "react";

const ThemeSelector = ({
    toggle,
    isOpen,
}: {
    toggle: Dispatch<SetStateAction<boolean>>;
    isOpen: boolean;
}) => {
    return (
        <>
            <button onClick={() => toggle(!isOpen)}>Themes</button>
            <section
                className={`${
                    isOpen ? "block" : "hidden"
                } w-full h-full absolute top-0 left-0 bg-red-300`}
            >
                <button onClick={() => toggle(!isOpen)}>close theme selector</button>
                ThemeSelector content
            </section>
        </>
    );
};
export default ThemeSelector;
