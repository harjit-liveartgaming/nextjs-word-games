"use server";

import { sql } from '@vercel/postgres';
import { Challenge, Attempt} from '@/app/wordle/db/definitions';

export async function fetchChallenge(id: string) {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

     console.log('Request: join challenge: ' + id);
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    //const data = await sql<Challenge>`SELECT * FROM challenges WHERE id = '2064defa-9add-4d08-9108-e750a53c76eb' `;
    const data = await sql<Challenge>`SELECT * FROM challenges WHERE id = ${id} `;

    console.log('Data fetch completed after 3 seconds.');

    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function submitAttempt(game_id: string, user_id: string){

}