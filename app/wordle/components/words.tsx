export const WordBank = [
    "telly",
    "hello",
    "pious",
    "taunt",
    "effect",
    "siren",
    "sassy",
    "party",
    "agile",
    "ovens",
    "coils",
    "broil"
];

export function getRandomWord(){
    let rIndex = (Math.random() * (WordBank.length - 1))/1
    return WordBank[rIndex]
}