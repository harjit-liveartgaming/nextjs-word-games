"use client"

import { getRandomWord } from "./words";
import { fetchChallenge, checkAddChallenge } from "../db/data";
import React, { startTransition, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";


export function SetUpForm() {
  const router = useRouter();
  const [room, setRoom] = useState("AAAA");
  const [selectedWord, setSelectedWord] = useState("jolly");
  const [maxAttempts, setMaxAttempts] = useState(6);

  let createJoinChallenge = (_word?: string, _maxAttempts?: number) => {
    let p_word: string = _word || getRandomWord();
    let m_att: number = _maxAttempts || 6;
    startTransition(async () => {
      let roomName = await checkAddChallenge(p_word, m_att);
      router.push("/wordle2/challenges/" + roomName as string);
    })
   
  }

  return (
    <>
      <div className='w-full flex justify-center items-center p-2 '>
        <div><label className="p-2 text-right w-1/5">Enter a room name</label></div>
        <div><input className="p-2 border-2"
          type="text"
          value={room}
          onChange={(e)=>{setRoom(e.currentTarget.value)}}
          hint-text="AAAA"
        /></div>
      </div>
      <div className='w-full flex p-5 items-center justify-center text-center'>
        <Link className="p-2 border-2 w-3/5"
          href={"/wordle2/challenges/"+room}
        >
          Join
        </Link>
      </div>
      <div className='w-full flex justify-center items-center p-2 '>
        <label className="p-2 text-center w-1/5">Enter a word</label>
        <input className="p-2 border-2"
          type="text"
          value={selectedWord}
          onChange={(e) => {setSelectedWord(e.currentTarget.value)}}
        />
      </div>
      <div className='w-full flex justify-center items-center p-2 '>
        <label className="p-2 text-center w-1/5">Enter attempts</label>
        <input className="p-2 border-2"
          type="number"
          value={maxAttempts}
         onChange={(e)=>{setMaxAttempts(e.currentTarget.valueAsNumber)}}
        />
      </div>
      <div className='w-full flex p-5 items-center justify-center text-center'>
        <button className="p-2 border-2 w-3/5"
          onClick={()=>{createJoinChallenge(selectedWord, maxAttempts)}}
        >
          Start
        </button>
      </div>
    </>
  )

}