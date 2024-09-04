import { useRouter } from "next/router";
import { fetchChallenge } from "../db/data";
import Game from "../components/game";

export default async function Page() {
  const router = useRouter();
  debugger;
  let challengeId = router.query.slug as string;

  let challenge = await fetchChallenge(challengeId);
  //initializeGame(challenge.word, challenge.attempts);

  return (
    <Game
      selectedWord={challenge.word.toUpperCase()}
      maxAttempts={challenge.attempts}
    />
  )

}