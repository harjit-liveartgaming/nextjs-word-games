export class Challenge{
    selectedWord: string;
    maxAttempts: number

    constructor(word: string, attempts: number){
        this.selectedWord = word;
        this.maxAttempts = attempts;
    }

}

export function ChallengeComponent(props: {}){

    return(
        <div></div>
    )
}