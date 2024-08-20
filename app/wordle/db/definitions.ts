export type Challenge = {
    id: string;
    author: string;
    word: string;
    attempts: number;
    expiration: Date;
}

export type Attempt = {
    challenge_id: string;
    user_id: string;
    guessIndex: number;
    guess: string;
}