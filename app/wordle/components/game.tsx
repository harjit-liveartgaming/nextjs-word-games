"use client";

import React, { useState, createContext } from "react";
import { TileRow, TileRowComponent } from "../components/tile-row";
import { GameBoardComponent } from "../components/game-board";
import { InputFieldComponent } from "../components/forms";
import { getRandomWord } from "../components/words";
import { fetchChallenge } from "../db/data";
import { Challenge } from "../db/definitions";

export const GameContext = createContext({});

export default function Game() {
  const [gameBoard, setGameBoard] = useState(Array<TileRow>);
  const [gameState, setGameState] = useState("set-up-form");
  const [selectedWord, setWord] = useState("");
  const [guessWord, setGuess] = useState("");
  const [maxAttempts, setMaxAttempts] = useState(6);
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [room, setRoom] = useState("huhu");

  const ctx = {

  }

  return (
    <></>
  )
}