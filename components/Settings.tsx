import { useEffect, useState } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { BookA, CircleCheck, Speech, Binary } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import ThemeSelector from "@/components/ThemeSelector";

interface Props {
    testType: string | undefined;
    testLength: number[];
    setTestType: React.Dispatch<React.SetStateAction<string | undefined>>;
    setTestLength: React.Dispatch<React.SetStateAction<number[]>>;
}

const gameTypeOptions = [
    {
        label: "Words",
        value: "words",
        icon: BookA,
        defaultChecked: true,
    },
    {
        label: "Quotes",
        value: "quotes",
        icon: Speech,
        defaultChecked: false,
    },
    {
        label: "Code",
        value: "code",
        icon: Binary,
        defaultChecked: false,
    },
];

export default function Settings({ setTestType, setTestLength, testType, testLength }: Props) {
    const [checkedOptions, setCheckedOptions] = useState(gameTypeOptions.map(() => false));

    useEffect(() => {
        if (testType) {
            setCheckedOptions(gameTypeOptions.map((option) => option.value === testType));
        }
    }, [testType]);

    const handleCheckedChange = (index: number, checked: boolean) => {
        setCheckedOptions((prev) => prev.map((_, i) => (i === index ? checked : false)));
    };

    const changeTestType = ({ string }: { string: string }) => {
        setTestType(string);
        localStorage.setItem("testType", string);
    };

    const changeTestLength = (newLength: number[]) => {
        setTestLength([Number(newLength[0]), Number(newLength[1])]);
        localStorage.setItem("testLength", newLength.toString());
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="bg-foreground text-background">Settings</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="leading-none">Settings</SheetTitle>
                    <SheetDescription className="leading-none">
                        Customise your typing test experience.
                    </SheetDescription>
                </SheetHeader>
                <section className="mt-10 space-y-10">
                    <section id="gameType" className="space-y-4">
                        <h2 className="text-sm font-semibold">Game Type</h2>
                        <div className="w-full max-w-sm grid grid-cols-3 gap-3">
                            {gameTypeOptions.map((option, index) => (
                                <CheckboxPrimitive.Root
                                    key={option.value}
                                    checked={checkedOptions[index]}
                                    onCheckedChange={(checked) =>
                                        handleCheckedChange(index, Boolean(checked))
                                    }
                                    onClick={() => changeTestType({ string: option.value })}
                                    className="relative ring-[1px] ring-foreground rounded-lg px-4 py-3 text-start text-muted-foreground data-[state=checked]:ring-1 data-[state=checked]:ring-accent data-[state=checked]:text-primary"
                                >
                                    <option.icon className="mb-3" />
                                    <span className="font-medium tracking-tight">
                                        {option.label}
                                    </span>
                                    <CheckboxPrimitive.Indicator className="absolute top-2 right-2">
                                        <CircleCheck className="fill-primary text-primary-foreground" />
                                    </CheckboxPrimitive.Indicator>
                                </CheckboxPrimitive.Root>
                            ))}
                        </div>
                    </section>
                    {testType === "words" && (
                        <section id="gameLength" className="space-y-4">
                            <h2 className="text-sm font-semibold">Game Length</h2>
                            <ul className="flex space-x-4">
                                <li>
                                    <Button
                                        onClick={() => changeTestLength([1, 30])}
                                        className={`${
                                            testLength[1] === 30 && testType === "words"
                                                ? "bg-accent text-background"
                                                : "bg-transparent border-[1px] border-accent text-foreground"
                                        } cursor-pointer`}
                                    >
                                        30
                                    </Button>
                                </li>
                                <li>
                                    <Button
                                        variant="secondary"
                                        onClick={() => changeTestLength([31, 60])}
                                        className={`${
                                            testLength[1] === 60 && testType === "words"
                                                ? "bg-accent text-background"
                                                : "bg-transparent border-[1px] border-accent text-foreground"
                                        } cursor-pointer`}
                                    >
                                        60
                                    </Button>
                                </li>
                                <li>
                                    <Button
                                        variant="secondary"
                                        onClick={() => changeTestLength([61, 120])}
                                        className={`${
                                            testLength[1] === 120 && testType === "words"
                                                ? "bg-accent text-background"
                                                : "bg-transparent border-[1px] border-accent text-foreground"
                                        } cursor-pointer`}
                                    >
                                        120
                                    </Button>
                                </li>
                            </ul>
                        </section>
                    )}
                    <section id="theme select" className="space-y-4">
                        <h2 className="text-sm font-semibold">Select your theme</h2>
                        <ThemeSelector />
                    </section>
                </section>
            </SheetContent>
        </Sheet>
    );
}
