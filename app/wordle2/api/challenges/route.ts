"use server";

import { sql } from '@vercel/postgres';
import {Challenge} from '@/app/wordle/db/definitions';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url);
    let nickname = searchParams.get("id");
    let query: string = "SELECT * FROM challenges";

    if(nickname != null){
        query += " WHERE nickname = '${nickname}'" 
    }

    const result = await sql<Challenge> `${query}`
    return NextResponse.json(result)
}