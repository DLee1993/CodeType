import { useState } from "react";

export default function HelpGuide() {
    const [helpGuideOpen, isHelpGuideOpen] = useState<boolean>(false);

    return (
        <section>
            <button
                onClick={() => isHelpGuideOpen(true)}
                className="hover:text-accent hover:transition-colors"
            >
                help
            </button>
            <section
                className={`${
                    helpGuideOpen ? "visible" : "hidden"
                } bg-background text-foreground w-full h-screen z-50 absolute top-0 left-0 overflow-x-hidden overflow-y-auto p-5`}
            >
                <aside className="w-full flex justify-between items-center">
                    <h2>Help guide</h2>
                    <button
                        onClick={() => isHelpGuideOpen(false)}
                        className="bg-accent text-background px-4 py-1 rounded-sm"
                    >
                        X
                    </button>
                </aside>
                <section className="md:ml-10 my-10 space-y-10">
                    <aside>
                        <h3 className="mb-5 text-accent font-bold">Commands</h3>
                        <ul className="list-disc ml-10 space-y-5">
                            <li>
                                Tab:{" "}
                                <span className="ml-2">
                                    Pressing tab focuses on the typing game
                                </span>
                            </li>
                            <li>
                                Enter:{" "}
                                <span className="ml-2">
                                    When focused on the game, pressing enter refreshes the current typing game text
                                </span>
                            </li>
                        </ul>
                    </aside>
                    <aside>
                        <h3 className="mb-5 text-accent font-bold">Features</h3>
                        <ul className="list-disc ml-10 space-y-5">
                            <li>
                                Numbers:{" "}
                                <span className="ml-2">
                                    The numbers{" "}
                                    <span className="text-accent font-semibold">30, 60, 120</span>{" "}
                                    are the different charactrer lengths you can choose from for the words test type, by
                                    default it is <span className="text-accent font-semibold">30</span>
                                </span>
                            </li>
                            <li>
                                Test type:{" "}
                                <span className="ml-2">
                                    You have a choice of three tests{" "}
                                    <span className="text-accent font-semibold">
                                        words, quotes or code
                                    </span>{" "}
                                    the typing game text depends on which one is selected, by
                                    default it is{" "}
                                    <span className="text-accent font-semibold">words</span>
                                </span>
                            </li>
                            <li>
                                Themes:{" "}
                                <span className="ml-2">
                                    You have a variety of themes to choose from, when a theme is
                                    selected it will become the default theme everytime you visit
                                    the website, by default it is{" "}
                                    <span className="text-accent font-semibold">light theme</span>
                                </span>
                            </li>
                        </ul>
                    </aside>

                    <p>
                        ** All selected game options are indicated with underline and a color change
                    </p>
                </section>
            </section>
        </section>
    );
}
