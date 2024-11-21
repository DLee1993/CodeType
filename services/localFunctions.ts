//? Functions to be called

export const fetchCode = async () => {
    const res = await fetch("./static/codeBlocks/english.json");
    const data = await res.json();
    console.log(data);
};

export const fetchQuotes = async () => {
    const res = await fetch("./static/quotes/english.json");
    const data = await res.json();
    console.log(data);
};

export const fetchWords = async () => {
    const res = await fetch("./static/words/english.json");
    const data = await res.json();
    console.log(data);
};
