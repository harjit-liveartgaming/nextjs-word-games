import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { users , challenges } from '../test/placeholder-data';

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, displayName, email, password)
        VALUES (${user.id}, ${user.displayName}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedChallenges() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
    CREATE TABLE IF NOT EXISTS challenges (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        author_id UUID NOT NULL,
        word VARCHAR(255) NOT NULL,
        attempts INT NOT NULL,
        expiration_date DATE NOT NULL
    );
    `;

    const insertedInvoices = await Promise.all(
    challenges.map(
        (challenge) => client.sql`
        INSERT INTO challenges (author_id, word, attempts, expiration_date)
        VALUES (${challenge.author}, ${challenge.word}, ${challenge.attempts}, ${challenge.expiration})
        ON CONFLICT (id) DO NOTHING;
        `,
    ),
    );

    return insertedInvoices;
}

