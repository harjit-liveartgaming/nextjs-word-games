"use client";

import React, { useState, createContext, startTransition } from "react";
import { TileRow, TileRowComponent } from "./tile-row";
import { GameBoardComponent } from "./game-board";
import { getRandomWord } from "./words";
import { fetchChallenge } from "../db/data";
import { Challenge } from "../db/definitions";

export default function Game(props: {
  selectedWord: string,
  maxAttempts: number
}) {
  const [attempts, setAttempts] = useState(Array<string>);
  const [gameBoard, setGameBoard] = useState(Array<TileRow>);
  const [gameState, setGameState] = useState("init");
  const [guessWord, setGuess] = useState("");
  const [currentAttempt, setCurrentAttempt] = useState(0);

  let updateGuessWord = (e: React.FormEvent<HTMLInputElement>) => {
    let guess = e.currentTarget.value.toUpperCase();

    for (let i = 0; i < props.selectedWord.length; i++) {
      gameBoard[currentAttempt].tiles[i].letter = guess[i] || ""
    }
    setGameBoard(gameBoard);
    if (guess.length <= props.selectedWord.length) {
      setGuess(guess);
    }
  }

  let submitWord = async () => {

    //api only returns an object with a title property when its an
    let alreadyGuessed = guessWord in attempts;
    if (!alreadyGuessed && guessWord.length == props.selectedWord.length) {
      try {
        let data = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + guessWord);
        
        if (data.status != 404) {
          let gScan = new Map();
          let wScan = new Map();

          let perfect = true;

          for (let i = 0; i < guessWord.length; i++) {
            let _gl = guessWord[i]
            let _wl = props.selectedWord[i]

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
            attempts.push(guessWord);
            setAttempts(attempts);
            setCurrentAttempt(currentAttempt + 1);
            
          }

          if (perfect || currentAttempt == props.maxAttempts) {
            setGameState("end-game")
          }


          setGameBoard(gameBoard);
          setGuess("");
        }
      } catch {
        attempts.push(guessWord);
        setAttempts(attempts);
        console.log("not a word");
      }
    }

  }

  let initializeGame = (_word?: string, _maxAttempts?: number) => {
    let count = 0;
    let p_word: string = _word || getRandomWord();
    //for some reason, I can't clear the array first
    //so I'm just replacing value in the array with a new one

    while (count < (_maxAttempts || props.maxAttempts)) {
      let tr = new TileRow(p_word.length)
      if (gameBoard.length < count) {
        gameBoard.push(tr);
      } else {
        gameBoard[count] = tr;
      }
      count++
    }
    setGameBoard(gameBoard);
    setCurrentAttempt(0);
    setGameState("game-start");
  }

  if(gameState == "init"){
    initializeGame(props.selectedWord, props.maxAttempts);
  }

  return (
    <>
      {()=>{
        if(gameState != "init"){
          return (
            <GameBoardComponent 
              gameBoard={gameBoard}
            />
          )
        }
      }}
      
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
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                onClick={submitWord}
              //disabled = {selectedWord.length == guessWord.length}
              >
                Submit
              </button>
            </div>

          </div>
    </>
  )
}