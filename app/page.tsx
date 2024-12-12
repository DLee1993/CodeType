"use client";

import { useEffect, useState } from "react";
import { fetchCode, fetchQuotes, fetchWords } from "@/services/localFunctions";
import Link from "next/link";
import TypeThroughInput from "@/components/TypeThroughInput";

export default function Home() {
    const [testType, setTestType] = useState<string>();
    const [testContent, setTestContent] = useState<string>();
    const [testLength, setTestLength] = useState<number>();
    const [generateNewTest, setGenerateNewTest] = useState<boolean>();

    const refreshText = () => setGenerateNewTest(true);

    const changeTestType = (string: string) => {
        setTestType(string);
        localStorage.setItem("testType", string);
    };

    const changeTestLength = (string: string) => {
        setTestLength(Number(string));
        localStorage.setItem("testLength", string);
    };

    //# Get the stored args
    useEffect(() => {
        const storedTestType = localStorage.getItem("testType");
        const storedTestLength = localStorage.getItem("testLength");

        if (storedTestType) {
            setTestType(storedTestType);
        } else {
            setTestType("words");
        }

        if (storedTestLength) {
            setTestLength(Number(storedTestLength));
        } else {
            setTestLength(15);
        }
    }, []);

    //# Get the data
    useEffect(() => {
        const getData = async () => {
            switch (testType) {
                case "words":
                    const randomWords = await fetchWords(testLength!);
                    setTestContent(randomWords);
                    break;
                case "quotes":
                    const quotes = await fetchQuotes(testLength!);
                    setTestContent(quotes);
                    break;
                case "code":
                    const code = await fetchCode(testLength!);
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
            <header className="min-h-20 flex flex-col sm:flex-row justify-between items-start sm:items-center px-5 sm:px-10 py-5 sm:py-0">
                <div>
                    <h1 className="text-lg font-semibold">Code-type</h1>
                    <sup>A minimalistic typing test</sup>
                </div>
                <div className="w-full sm:w-auto flex justify-center items-center gap-x-4 mt-5 sm:mt-0">
                    <ul className="flex justify-center items-center gap-x-4">
                        <li
                            onClick={(e) => changeTestLength(e.currentTarget.innerHTML)}
                            className={`${
                                testLength === 15 ? "underline" : "text-foreground opacity-50"
                            } cursor-pointer`}
                        >
                            15
                        </li>
                        <li
                            onClick={(e) => changeTestLength(e.currentTarget.innerHTML)}
                            className={`${
                                testLength === 30 ? "underline" : "text-foreground opacity-50"
                            } cursor-pointer`}
                        >
                            30
                        </li>
                        <li
                            onClick={(e) => changeTestLength(e.currentTarget.innerHTML)}
                            className={`${
                                testLength === 60 ? "underline" : "text-foreground opacity-50"
                            } cursor-pointer`}
                        >
                            60
                        </li>
                        <li
                            onClick={(e) => changeTestLength(e.currentTarget.innerHTML)}
                            className={`${
                                testLength === 120 ? "underline" : "text-foreground opacity-50"
                            } cursor-pointer`}
                        >
                            120
                        </li>
                    </ul>
                    <div className="w-[1px] h-5 bg-foreground opacity-75"></div>
                    <ul className="flex justify-center items-center gap-x-4">
                        <li
                            onClick={(e) => changeTestType(e.currentTarget.innerHTML)}
                            className={`${
                                testType === "words" ? "underline" : "text-foreground opacity-50"
                            } cursor-pointer`}
                        >
                            words
                        </li>
                        <li
                            onClick={(e) => changeTestType(e.currentTarget.innerHTML)}
                            className={`${
                                testType === "quotes" ? "underline" : "text-foreground opacity-50"
                            } cursor-pointer`}
                        >
                            quotes
                        </li>
                        <li
                            onClick={(e) => changeTestType(e.currentTarget.innerHTML)}
                            className={`${
                                testType === "code" ? "underline" : "text-foreground opacity-50"
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
            <footer className="min-h-20 flex justify-between items-center px-5 sm:px-10 py-5 sm:py-0">
                <Link href={"https://github.com/DLee1993/CodeType#codetype-guide"} target="_blank">
                    help guide
                </Link>
            </footer>
        </>
    );
}
