"use client";

import { useEffect, useState } from "react";
import { fetchCode, fetchQuotes, fetchWords } from "@/services/localFunctions";
import Link from "next/link";
import TypeThroughInput from "@/components/TypeThroughInput";
import ThemeSelector from "@/components/ThemeSelector";
import HelpGuide from "@/components/HelpGuide";

export default function Home() {
    const [testType, setTestType] = useState<string>();
    const [testContent, setTestContent] = useState<string>();
    const [testLength, setTestLength] = useState<number[]>([]);
    const [generateNewTest, setGenerateNewTest] = useState<boolean>();

    const refreshText = () => setGenerateNewTest(true);

    const changeTestType = (string: string) => {
        setTestType(string);
        localStorage.setItem("testType", string);
    };

    const changeTestLength = (newLength: number[]) => {
        setTestLength([Number(newLength[0]), Number(newLength[1])]);
        localStorage.setItem("testLength", newLength.toString());
    };

    //# Get the stored args and add the transition classes after mounting
    useEffect(() => {
        const storedTestType = localStorage.getItem("testType");
        const storedTestLength = localStorage.getItem("testLength")?.split(",");

        document.body.classList.add("transition-colors");
        document.body.classList.add("duration-300");

        if (storedTestType) {
            setTestType(storedTestType);
        } else {
            setTestType("words");
        }

        if (storedTestLength) {
            setTestLength([Number(storedTestLength[0]), Number(storedTestLength[1])]);
        } else {
            setTestLength([1, 30]);
        }
    }, []);

    //# Get the data
    useEffect(() => {
        const getData = async () => {
            switch (testType) {
                case "words":
                    const randomWords = await fetchWords(testLength);
                    setTestContent(randomWords);
                    break;
                case "quotes":
                    const quotes = await fetchQuotes();
                    setTestContent(quotes);
                    break;
                case "code":
                    const code = await fetchCode();
                    setTestContent(code);
                    break;

                default:
                    break;
            }
        };

        getData();

        setTimeout(() => {
            setGenerateNewTest(false);
        }, 1);
    }, [testType, testLength, generateNewTest]);

    return (
        <>
            <header className="min-h-20 flex flex-wrap justify-between items-center p-5 gap-y-5">
                <div>
                    <h1 className="text-lg font-semibold">Code-type</h1>
                    <sup>A minimalistic typing test</sup>
                </div>
                <div className="w-full max-w-sm sm:w-auto flex justify-between items-center gap-x-4">
                    <ul
                        className={`flex justify-center items-center gap-x-4 ${
                            testType === "words" ? "opacity-100" : "opacity-25 pointer-events-none"
                        }`}
                    >
                        <li
                            onClick={() => changeTestLength([1, 30])}
                            className={`${
                                testLength[1] === 30 && testType === "words" ? "underline text-accent" : "text-foreground"
                            } cursor-pointer`}
                        >
                            30
                        </li>
                        <li
                            onClick={() => changeTestLength([31, 60])}
                            className={`${
                                testLength[1] === 60 && testType === "words" ? "underline text-accent" : "text-foreground"
                            } cursor-pointer`}
                        >
                            60
                        </li>
                        <li
                            onClick={() => changeTestLength([61, 120])}
                            className={`${
                                testLength[1] === 120 && testType === "words" ? "underline text-accent" : "text-foreground"
                            } cursor-pointer`}
                        >
                            120
                        </li>
                    </ul>
                    <div className="w-[1px] h-5 bg-foreground"></div>
                    <ul className="flex justify-center items-center gap-x-4">
                        <li
                            onClick={(e) => changeTestType(e.currentTarget.innerHTML)}
                            className={`${
                                testType === "words" ? "underline text-accent" : "text-foreground"
                            } cursor-pointer`}
                        >
                            words
                        </li>
                        <li
                            onClick={(e) => changeTestType(e.currentTarget.innerHTML)}
                            className={`${
                                testType === "quotes" ? "underline text-accent" : "text-foreground"
                            } cursor-pointer`}
                        >
                            quotes
                        </li>
                        <li
                            onClick={(e) => changeTestType(e.currentTarget.innerHTML)}
                            className={`${
                                testType === "code" ? "underline text-accent" : "text-foreground"
                            } cursor-pointer`}
                        >
                            code
                        </li>
                    </ul>
                </div>
            </header>
            <main>
                <TypeThroughInput text={testContent!} refreshText={refreshText} />
            </main>
            <footer className="min-h-20 flex justify-between items-center px-5">
                <section className="flex justify-center items-center gap-2">
                    <HelpGuide />
                    <p>/</p>
                    <ThemeSelector />
                </section>
                <Link
                    href={"https://github.com/DLee1993/CodeType#codetype-guide"}
                    target="_blank"
                    className="hover:text-accent hover:transition-colors"
                >
                    github
                </Link>
            </footer>
        </>
    );
}
