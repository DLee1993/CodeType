import { Button } from "@/components/ui/button";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import useTyping, { CharStateType, PhaseType } from "react-typing-game-hook";

const TypeThroughInput: FC<{ text: string; refreshText: () => void }> = ({ text, refreshText }) => {
    const [duration, setDuration] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const letterElements = useRef<HTMLDivElement>(null);

    const {
        states: { charsState, currIndex, phase, correctChar, startTime, endTime },
        actions: { insertTyping, deleteTyping, resetTyping },
    } = useTyping(text, { skipCurrentWordOnSpace: false });

    const cursorPosition = useMemo(() => {
        if (currIndex !== -1 && letterElements.current) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const spanref: any = letterElements.current.children[currIndex];
            const left = spanref.offsetLeft + spanref.offsetWidth - 2;
            const top = spanref.offsetTop - 2;
            return { left, top };
        } else {
            return {
                left: -2,
                top: 2,
            };
        }
    }, [currIndex]);

    const handleKeyDown = (letter: string, control: boolean) => {
        if (letter === "Escape") {
            resetTyping();
        } else if (letter === "Enter") {
            refreshText();
        } else if (letter === "Backspace") {
            deleteTyping(control);
        } else if (letter.length === 1) {
            insertTyping(letter);
        }
    };

    //# set words per minute
    useEffect(() => {
        if (phase === PhaseType.Ended && endTime && startTime) {
            setDuration(Math.floor((endTime - startTime) / 1000));
        } else {
            setDuration(0);
        }
    }, [phase, startTime, endTime]);

    //# reFocus on the text
    useEffect(() => {
        if (phase === PhaseType.NotStarted) {
            letterElements.current?.focus();
        }
    }, [phase]);

    return (
        <section className="w-11/12 max-w-6xl mx-auto flex flex-col gap-10 items-center relative">
            {!isFocused && text && (
                <p className="absolute top-1/2 -translate-y-1/2 z-50 pointer-events-none">
                    Click or press <span className="text-accent font-bold">TAB</span> to focus
                </p>
            )}
            {phase === PhaseType.Ended && startTime && endTime ? (
                <section className="w-screen flex flex-col justify-center items-center gap-20">
                    <h2 className="text-lg font-semibold">Congratulations!</h2>

                    <ul className="flex justify-center items-center gap-5">
                        <li className="flex gap-2">
                            <p>Words per minute:</p>
                            <p>{Math.round(((60 / duration) * correctChar) / 5)}</p>
                        </li>
                        <li className="flex gap-2">
                            <p>Accuracy:</p>
                            <p>{((correctChar / text.length) * 100).toFixed(2)}%</p>
                        </li>
                        <li className="flex gap-2">
                            <p>Duration:</p>
                            <p>{duration}s</p>
                        </li>
                    </ul>
                    <Button
                        className="bg-foreground text-background rounded-md hover:bg-accent hover:text-background hover:transition-colors"
                        onClick={() => {
                            resetTyping();
                            refreshText();
                        }}
                    >
                        Try again
                    </Button>
                </section>
            ) : (
                <section
                    tabIndex={0}
                    onKeyDown={(e) => handleKeyDown(e.key, e.ctrlKey)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`max-h-72 max-w-4xl text-xl 2xl:text-2xl outline-none relative hover:cursor-text`}
                >
                    <article
                        ref={letterElements}
                        className="tracking-wide pointer-events-none select-none focus-visible:outline-0"
                        tabIndex={0}
                    >
                        {text?.split("").map((letter, index) => {
                            const state = charsState[index];
                            const color =
                                state === CharStateType.Incomplete
                                    ? "text-foreground"
                                    : state === CharStateType.Incorrect
                                    ? "text-red-500"
                                    : "text-accent";
                            return (
                                <span
                                    key={letter + index}
                                    className={`${color} ${
                                        !isFocused && "opacity-25 blur-sm transition-all"
                                    }`}
                                >
                                    {letter}
                                </span>
                            );
                        })}
                    </article>
                    {phase !== PhaseType.Ended && text ? (
                        <span
                            style={{
                                left: cursorPosition.left,
                                top: cursorPosition.top,
                            }}
                            className={`${
                                !isFocused && "hidden"
                            } block absolute border-l-2 border-accent transition-all duration-75`}
                        >
                            &nbsp;
                        </span>
                    ) : null}
                </section>
            )}
        </section>
    );
};

export default TypeThroughInput;
