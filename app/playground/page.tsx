import { fetchChallenge } from "../wordle/db/data";

export default function Page() {
  const joinChallenge = async (id: string) => {
    let challenge = await fetchChallenge(id);
    //initializeGame(challenge.word, challenge.attempts);
    console.log(challenge.id);
  }
}