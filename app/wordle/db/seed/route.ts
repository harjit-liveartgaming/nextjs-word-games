//import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { users , challenges, attempts } from '../test/placeholder-data';

const client = await db.connect();