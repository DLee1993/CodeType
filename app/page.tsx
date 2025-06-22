"use client";

import { useEffect, useState } from "react";
import { fetchCode, fetchQuotes, fetchWords } from "@/services/localFunctions";
import TypeThroughInput from "@/components/TypeThroughInput";
import Settings from "@/components/Settings";

export default function Home() {
    const [testType, setTestType] = useState<string>();
    const [testContent, setTestContent] = useState<string>();
    const [testLength, setTestLength] = useState<number[]>([]);
    const [generateNewTest, setGenerateNewTest] = useState<boolean>();

    const refreshText = () => setGenerateNewTest(true);

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
            <header className="h-20 flex flex-wrap justify-between items-center p-5 gap-y-5">
                <div>
                    <h1 className="text-lg font-semibold">Code-type</h1>
                    <sup>A minimalistic typing test</sup>
                </div>
                <Settings testType={testType} testLength={testLength} setTestType={setTestType} setTestLength={setTestLength} />
            </header>
            <main className="h-[calc(100vh-150px)] grid place-content-center">
                <TypeThroughInput text={testContent!} refreshText={refreshText} />
            </main>
        </>
    );
}
