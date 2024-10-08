"use client";

import React, { startTransition, useState, useTransition } from "react";
import { TileRow, TileRowComponent } from "./components/tile-row";
import { GameBoardComponent } from "./components/game-board";
import { getRandomWord } from "./components/words";
import { fetchChallenge } from "./db/data";
import { SetUpForm } from "./components/forms";

export default function Page() {

  const [gameBoard, setGameBoard] = useState(Array<TileRow>);
  const [gameState, setGameState] = useState("set-up-form");
  const [selectedWord, setWord] = useState("");
  const [guessWord, setGuess] = useState("");
  const [maxAttempts, setMaxAttempts] = useState(6);
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [room, setRoom] = useState("AAAA");

  let initializeGame = (_word?: string, _maxAttempts?: number) => {
    let count = 0;
    let p_word: string = _word || getRandomWord();
    //for some reason, I can't clear the array first
    //so I'm just replacing value in the array with a new one

    while (count < (_maxAttempts || maxAttempts)) {
      let tr = new TileRow(p_word.length)
      if (gameBoard.length < count) {
        gameBoard.push(tr);
      } else {
        gameBoard[count] = tr;
      }
      count++
    }
    if (_maxAttempts != null && _maxAttempts != maxAttempts) {
      setMaxAttempts(_maxAttempts);
    }
    setWord(p_word.toUpperCase());
    setGameBoard(gameBoard);
    setCurrentAttempt(0);
    setGameState("game-start");
  }

  let joinChallenge = () => {
    startTransition(async () => {
      let challenge = await fetchChallenge(room);
      initializeGame(challenge.word, challenge.attempts);
    })
  }


  let updateGuessWord = (e: React.FormEvent<HTMLInputElement>) => {
    let guess = e.currentTarget.value.toUpperCase();

    for (let i = 0; i < selectedWord.length; i++) {
      gameBoard[currentAttempt].tiles[i].letter = guess[i] || ""
    }
    setGameBoard(gameBoard);
    if (guess.length <= selectedWord.length) {
      setGuess(guess);
    }
  }

  let submitWord = async () => {

    //api only returns an object with a title property when its an

    if (guessWord.length == selectedWord.length) {
      try {
        debugger
        let data = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + guessWord);
        
        if (data.status != 404) {
          let gScan = new Map();
          let wScan = new Map();

          let perfect = true;

          for (let i = 0; i < guessWord.length; i++) {
            let _gl = guessWord[i]
            let _wl = selectedWord[i]

            if (_gl == _wl) {
              gameBoard[currentAttempt].tiles[i].status = 'correct-location'
            } else {
              perfect = false;
              let _gs: Array<number>;
              if (gScan.has(_gl)) {
                _gs = gScan.get(_gl);
              } else {
                _gs = new Array<number>();
              }

              _gs.push(i);
              gScan.set(_gl, _gs);

              let _ws: Array<number>;
              if (wScan.has(_wl)) {
                _ws = wScan.get(_wl);
              } else {
                _ws = new Array<number>();
              }

              _ws.push(i);
              wScan.set(_wl, _ws);
            }
          }

          if (!perfect) {
            gScan.forEach((g_is: Array<number>, l: string) => {
              let w_is = wScan.get(l);

              for (let i = 0; i < g_is.length; i++) {
                let g_index = g_is[i] as number;
                if (w_is != null && i < w_is.length) {
                  gameBoard[currentAttempt].tiles[g_index].status = 'correct-letter'
                } else {
                  gameBoard[currentAttempt].tiles[g_index].status = 'submitted'
                }
              }
            })
            setCurrentAttempt(currentAttempt + 1);
          }

          if (perfect || currentAttempt == maxAttempts) {
            setGameState("end-game")
          }


          setGameBoard(gameBoard);
          setGuess("");
        }
      } catch {
        console.log("not a word");
      }
    }

  }

  if (gameState == "game-init") {
    initializeGame();
  }

  let getInputContent = () => {
    switch (gameState) {
      case "set-up-form":
        return (
          <SetUpForm
            setRoom={(e) => { setRoom(e.currentTarget.value); return false; }}
            room={room}
            maxAttempts={maxAttempts}
            setMaxAttempts={(e) => { setMaxAttempts(e.currentTarget.valueAsNumber); return false; }}
            selectedWord={selectedWord}
            setSelectedWord={(e) => { setWord(e.currentTarget.value); return false; }}
            initializeGame={() => { initializeGame(selectedWord, maxAttempts); return false; }}
            joinChallenge={() => { joinChallenge(); return false; }}
          />
        )
        break;

      case "game-start":
        return (

          <div>
            <div className='items-center text-center w-full'>
              <div><label className="p-2 w-3/5">Enter Guess</label></div>
              <div><input className="p-2 border-2 w-2/5"
                type="text"
                value={guessWord}
                onChange={updateGuessWord}
              /></div>
            </div>
            <div className='p-5 items-center text-center'>
              <button
                className="
                    bg-blue-500 
                    hover:bg-blue-400 
                    text-white 
                    font-bold 
                    py-2 
                    px-4 
                    border-b-4 
                    border-blue-700 
                    hover:border-blue-500 
                    rounded"
                onClick={submitWord}
              //disabled = {selectedWord.length == guessWord.length}
              >
                Submit
              </button>
            </div>

          </div>
        )
        break;

      default:
        return (
          <div></div>
        )
        break;
    }
  }

  let getPopUpContent = () => {

    if (gameState == "end-game") {
      return (
        <div className="flex justify-center w-full h-full">
          <div className="relative bg-orange-300 w-5/6 h-5/6 top-5">
            <button onClick={() => { setGameState("game-init") }} >Restart Game?</button>
          </div>
        </div>
      )
    }



  }

  const input_content = getInputContent();

  const popup_content = getPopUpContent();

  return (
    <main className="min-h-screen">
      <div id="game" className="flex justify-center">
        <GameBoardComponent
          gameBoard={gameBoard}
        />
      </div>

      <div id="input_area" className="">
        {input_content}
      </div>

      <div id="message_area" className="w-full h-1/4 flex">
        {popup_content}
      </div>

    </main>
  )

}