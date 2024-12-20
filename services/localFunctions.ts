//* GET RANDOM ITEM FROM DATA

function getRandomQuote(array: { id: number; string: string }[]) {
    if (array.length < 1) return;

    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex].string;
}

//? FETCH

export const fetchCode = async () => {
    try {
        const response = await fetch("./codeBlocks/english.json");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        const random = getRandomQuote(data["content"]);

        return random;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

export const fetchQuotes = async () => {
    try {
        const response = await fetch("./quotes/english.json");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        const random = getRandomQuote(data["content"]);

        return random;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

export const fetchWords = async (length: number[]) => {
    const words: string[] = [];

    try {
        const response = await fetch("./words/english.json");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        while (words.length <= length[1]) {
            const randomIndex = Math.floor(Math.random() * data["content"].length);
            const num = data["content"][randomIndex];
            if (!words.includes(num)) {
                words.push(num);
            }
        }

        const sentence = words.join(",").replaceAll(",", " ");

        return sentence;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
