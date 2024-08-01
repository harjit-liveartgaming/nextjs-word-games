const WordBank = [
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

export function getRandomWord(): string {
    let rIndex: number = (Math.random() * WordBank.length)
    //round down to whole number
    rIndex -= rIndex % 1;
    return WordBank[rIndex]
}