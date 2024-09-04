"use server";

import { sql } from '@vercel/postgres';
import { Challenge, Attempt } from '@/app/wordle/db/definitions';

export async function fetchChallenge(id: string) {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Request: join challenge: ' + id);
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    //const data = await sql<Challenge>`SELECT * FROM challenges WHERE id = '2064defa-9add-4d08-9108-e750a53c76eb' `;
    const data = await sql<Challenge>`SELECT * FROM challenges WHERE nickname = ${id} `;

    console.log('Data fetch completed after 3 seconds.');

    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function checkAddChallenge(word: string, attempts: number) {
  try {
    console.log('Request: new challenge: ' + word);
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    //const data = await sql<Challenge>`SELECT * FROM challenges WHERE id = '2064defa-9add-4d08-9108-e750a53c76eb' `;
    const data = await sql<Challenge>`SELECT * FROM challenges WHERE word = ${word} AND attempts = ${attempts}`;
    return data.rows[0].nickname;
  } catch (error) {
    
      let newId = null;
      let w = "default";
      while(newId == null){
        let w = (Math.random() + 1).toString(36).substring(7);
        console.log(w);
        const data = await sql<Challenge>`SELECT * FROM challenges WHERE nickname = ${w}`

        if(data.rowCount == 0){
          newId = w;
        }
      }

    try {
      const newChallenge = await sql<Challenge>`
      INSERT INTO challenges (word, attempts, nickname)
      VALUES (${word}, ${attempts}, ${newId})
      ON CONFLICT (id) DO NOTHING;
    `;

      return newId;
    } catch {
      console.error("error adding");
    }
  }
}

export async function submitAttempt(game_id: string, user_id: string) {

}