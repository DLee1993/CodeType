"use client";

import { useEffect, useState } from "react";
import { fetchCode, fetchQuotes, fetchWords } from "@/services/localFunctions";
import Link from "next/link";

export default function Home() {
    const [testType, setTestType] = useState<string>();
    const [testContent, setTestContent] = useState<string>();
    const [testLength, setTestLength] = useState<number>();

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
    }, [testType, testLength]);

    const changeTestType = (string: string) => {
        setTestType(string);
        localStorage.setItem("testType", string);
    };

    const changeTestLength = (string: string) => {
        setTestLength(Number(string));
        localStorage.setItem("testLength", string);
    };

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
                                testLength === 15 ? "underline" : "text-background/50"
                            } cursor-pointer`}
                        >
                            15
                        </li>
                        <li
                            onClick={(e) => changeTestLength(e.currentTarget.innerHTML)}
                            className={`${
                                testLength === 30 ? "underline" : "text-background/50"
                            } cursor-pointer`}
                        >
                            30
                        </li>
                        <li
                            onClick={(e) => changeTestLength(e.currentTarget.innerHTML)}
                            className={`${
                                testLength === 60 ? "underline" : "text-background/50"
                            } cursor-pointer`}
                        >
                            60
                        </li>
                        <li
                            onClick={(e) => changeTestLength(e.currentTarget.innerHTML)}
                            className={`${
                                testLength === 120 ? "underline" : "text-background/50"
                            } cursor-pointer`}
                        >
                            120
                        </li>
                    </ul>
                    <div className="w-[1px] h-5 bg-background "></div>
                    <ul className="flex justify-center items-center gap-x-4">
                        <li
                            onClick={(e) => changeTestType(e.currentTarget.innerHTML)}
                            className={`${
                                testType === "words" ? "underline" : "text-background/50"
                            } cursor-pointer`}
                        >
                            words
                        </li>
                        <li
                            onClick={(e) => changeTestType(e.currentTarget.innerHTML)}
                            className={`${
                                testType === "quotes" ? "underline" : "text-background/50"
                            } cursor-pointer`}
                        >
                            quotes
                        </li>
                        <li
                            onClick={(e) => changeTestType(e.currentTarget.innerHTML)}
                            className={`${
                                testType === "code" ? "underline" : "text-background/50"
                            } cursor-pointer`}
                        >
                            code
                        </li>
                    </ul>
                </div>
            </header>
            <main className="w-11/12 max-w-5xl mx-auto flex flex-col gap-10 items-center">
                <p className="text-xl min-h-20 leading-relaxed">{testContent}</p>
                {testContent && (
                    <button className="group relative">
                        <svg
                            className="size-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                {" "}
                                <path
                                    d="M21 3V8M21 8H16M21 8L18 5.29168C16.4077 3.86656 14.3051 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.2832 21 19.8675 18.008 20.777 14"
                                    stroke="#000000"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                            </g>
                        </svg>
                        <div className="absolute z-10 top-8 left-1/2 -translate-x-1/2 w-40 inline-block bg-background shadow-sm text-foreground py-2 px-2 text-sm rounded-lg invisible group-hover:visible">
                            restart the test
                            <div className=" w-6 overflow-hidden absolute -top-3 left-1/2 -translate-x-1/2">
                                <div className=" h-4 w-4 bg-background rotate-45 transform origin-bottom-left"></div>
                            </div>
                        </div>
                    </button>
                )}
            </main>
            <footer className="min-h-20 flex justify-between items-center px-5 sm:px-10 py-5 sm:py-0">
                {/* when clicked, fetch a new word | quote | codeblock */}
                <p className="text-background/50">
                    press <span className="px-2 py-1 bg-foreground text-background/100">tab</span> +{" "}
                    <span className="px-2 py-1 bg-foreground text-background/100">enter</span> to
                    restart the test
                </p>
                <Link href={"https://github.com/DLee1993/CodeType#codetype-guide"} target="_blank">
                    help guide
                </Link>
            </footer>
        </>
    );
}
