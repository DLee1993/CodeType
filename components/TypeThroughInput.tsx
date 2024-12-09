import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import useTyping, { CharStateType, PhaseType } from "react-typing-game-hook";

const TypeThroughInput: FC<{ text: string; refreshText: () => void; resetFocus: boolean }> = ({
    text,
    refreshText,
    resetFocus,
}) => {
    const [duration, setDuration] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isFocused, setIsFocused] = useState(false);
    const letterElements = useRef<HTMLDivElement>(null);

    const {
        states: { charsState, currIndex, phase, correctChar, startTime, endTime },
        actions: { insertTyping, deleteTyping, resetTyping },
    } = useTyping(text, { skipCurrentWordOnSpace: false });

    //# set cursor
    const pos = useMemo(() => {
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

    //# set WPM
    useEffect(() => {
        if (phase === PhaseType.Ended && endTime && startTime) {
            setDuration(Math.floor((endTime - startTime) / 1000));
        } else {
            setDuration(0);
        }
    }, [phase, startTime, endTime]);

    //# reFocus on the text
    useEffect(() => {
        if (!resetFocus) {
            letterElements.current?.focus();
        }
        if (phase === PhaseType.NotStarted) {
            letterElements.current?.focus();
        }
    }, [phase, resetFocus]);

    //# handle key presses
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

    return (
        <section className="w-11/12 max-w-4xl mx-auto flex flex-col gap-10 items-center">
            {phase === PhaseType.Ended && startTime && endTime ? (
                <section className="flex flex-col justify-center items-center gap-10">
                    <h2 className="text-lg font-semibold">Congratulations!</h2>

                    <p className="min-h-5">
                        <>
                            <span className="mr-4">
                                WPM: {Math.round(((60 / duration) * correctChar) / 5)}
                            </span>
                            <span className="mr-4">
                                Accuracy: {((correctChar / text.length) * 100).toFixed(2)}%
                            </span>
                            <span className="mr-4">Duration: {duration}s</span>
                        </>
                    </p>
                    <button
                        className="bg-foreground rounded-md px-4 py-1 text-background"
                        onClick={() => {
                            resetTyping();
                            refreshText();
                        }}
                    >
                        Try again
                    </button>
                </section>
            ) : (
                <section
                    tabIndex={0}
                    onKeyDown={(e) => handleKeyDown(e.key, e.ctrlKey)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`text-xl outline-none relative hover:cursor-text`}
                >
                    <article
                        ref={letterElements}
                        className="tracking-wide pointer-events-none select-none mb-4 focus-visible:outline-0"
                        tabIndex={0}
                        autoFocus
                    >
                        {text?.split("").map((letter, index) => {
                            const state = charsState[index];
                            const color =
                                state === CharStateType.Incomplete
                                    ? "text-foreground/40"
                                    : state === CharStateType.Correct
                                    ? "text-green-400"
                                    : "text-red-500";
                            return (
                                <span key={letter + index} className={`${color}`}>
                                    {letter}
                                </span>
                            );
                        })}
                    </article>
                    {phase !== PhaseType.Ended && text ? (
                        <span
                            style={{
                                left: pos.left,
                                top: pos.top,
                            }}
                            className={`absolute border-l-2 border-foreground animate-pulsate transition-all duration-100`}
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
