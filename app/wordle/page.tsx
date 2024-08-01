"use client";

import React, { useState, useRef } from "react";
import { TileComponent } from '@/app/wordle/components/tile';
import { TileRow, TileRowComponent } from "./components/tile-row";
import { GameBoardComponent } from "./components/game-board";
import { InputFieldComponent } from "./components/forms";

export default function Page() {

    const [gameBoard, setGameBoard] = useState(Array<TileRow>);
    const [gameState, setGameState] = useState("form-set-attempts");
    const [selectedWord, setWord] = useState("telly");
    const [guessWord, setGuess] = useState("");
    const [maxAttempts, setMaxAttempts] = useState(6);
    const [currentAttempt, setCurrentAttempt] = useState(0);
    const [room, setRoom] = useState("huhu");

    let initializeGame = () => {
        let count = 0;
        while (count < maxAttempts) {
            let tr = new TileRow(selectedWord.length)
            if(gameBoard.length < count){
                gameBoard.push(tr);
            }else{
                gameBoard[count] = tr;
            }
            count++
        }

        setGameBoard(gameBoard);
        setCurrentAttempt(0);
        setGameState("game-start");

    }

    let updateGuessWord = (e: React.FormEvent<HTMLInputElement>) => {
        let guess = e.currentTarget.value;

        for (let i = 0; i < selectedWord.length; i++) {
            gameBoard[currentAttempt].tiles[i].letter = guess[i] || ""
        }
        setGameBoard(gameBoard);
        if (guess.length <= selectedWord.length) {
            setGuess(guess);
        }
    }

    let submitWord = () => {

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
        
        if(perfect || currentAttempt == maxAttempts){
            setGameState("end-game")
        }

        
        setGameBoard(gameBoard);
        setGuess("");
        
    }

    if (gameState == "game-init") {
        initializeGame();
    }

    let getInputContent = () => {
        switch (gameState) {
            case "form-challenge":
                return (
                    <InputFieldComponent
                        label="Enter a room name"
                        inputType="text"
                        onChange={(e: React.FormEvent<HTMLInputElement>) => { setRoom(e.currentTarget.value); return false; }}
                        onSubmit={() => { setGameState("form-set-word"); return false; }}
                        value={room}
                    />
                )
                break;

            case "form-set-word":
                return (
                    <InputFieldComponent
                        label="Enter a word"
                        inputType="text"
                        onChange={(e: React.FormEvent<HTMLInputElement>) => { setWord(e.currentTarget.value); return false; }}
                        onSubmit={() => { setGameState("form-set-attempts"); return false; }}
                        value={selectedWord}
                    />

                )
                break;

            case "form-set-attempts":
                return (
                    <InputFieldComponent
                        label="Enter attempts"
                        inputType="number"
                        onChange={(e: React.FormEvent<HTMLInputElement>) => { setMaxAttempts(e.currentTarget.valueAsNumber); return false; }}
                        onSubmit={() => { initializeGame(); return false; }}
                        value={maxAttempts}
                    />
                )
                break;

            case "game-start":
                return (

                    <div>
                        <InputFieldComponent
                            label="Enter Guess"
                            inputType="text"
                            onSubmit={() => { submitWord(); return false; }}
                            onChange={(e: React.FormEvent<HTMLInputElement>) => { updateGuessWord(e); return false }}
                            value={guessWord}
                        />

                    </div>
                )
                break;
                return (
                    <div></div>
                )
        }
    }

    let getPopUpContent = () => {

        if(gameState=="end-game"){
            return (
                <div className="flex justify-center w-full h-full">
                    <div className="relative bg-orange-300 w-5/6 h-5/6 top-5">
                        <button onClick={()=>{setGameState("game-init")}} >Restart Game?</button>}
                    </div>
                </div>
            )
        }
        

        
    }

    const input_content = getInputContent();

    const popup_content = getPopUpContent();

    return (
        <main className="min-h-screen">
            <div className="flex justify-center">
                <label className="p-2">Room: {room}</label>
                <label className="p-2">Word: {selectedWord}</label>
                <label className="p-2">Attemps: {maxAttempts}</label>
            </div>

            <div id="game" className="flex justify-center">
                <GameBoardComponent
                    gameBoard={gameBoard}
                />
            </div>

            <div id="input_area" className="">
                {input_content}
            </div>

            <div id="message_area" className="absolute w-full h-1/4 flex">
                {popup_content}
            </div>

        </main>
    )

}