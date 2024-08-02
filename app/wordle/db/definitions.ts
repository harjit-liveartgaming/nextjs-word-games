export type User = {
    id: string;
    displayName: string;
    email: string;
    password: string;
}

export type Challenge = {
    id: string;
    author: string;
    word: string;
    attempts: number;
}

export type Attempt = {
    challenge_id: string;
    user_id: string;
    guessIndex: number;
    guess: string;
}