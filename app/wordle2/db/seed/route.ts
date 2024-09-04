import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { users , challenges } from '../test/placeholder-data';

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      displayName VARCHAR(255) NOT NULL,
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

async function seedSessions(){
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
    CREATE TABLE IF NOT EXISTS sessions (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID references users(id)
    );
    `;

    return true;
}

async function seedChallenges() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
    CREATE TABLE IF NOT EXISTS challenges (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        nickname VARCHAR(255) UNIQUE NOT NULL,
        author_id UUID references users(id),
        word VARCHAR(255) NOT NULL,
        attempts INT NOT NULL,
        expiration_date DATE NOT NULL
    );
    `;

    const insertedInvoices = await Promise.all(
    challenges.map(
        (challenge) => client.sql`
        INSERT INTO challenges (author_id, nickname, word, attempts, expiration_date)
        VALUES (${challenge.author}, ${challenge.nickname}, ${challenge.word}, ${challenge.attempts}, ${challenge.expiration})
        ON CONFLICT (id) DO NOTHING;
        `,
    ),
    );

    return insertedInvoices;
}

async function seedAttempts() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
  CREATE TABLE IF NOT EXISTS attempts (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      session_id UUID NOT NULL references sessions(id),
      challenge_id UUID NOT NULL references challenges(id),
      guess VARCHAR(255) NOT NULL,
      attempt_number INT NOT NULL
  );`;

}

export async function GET() {
    try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedChallenges();
    await seedAttempts();
    await seedSessions();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
    }
  }
  

