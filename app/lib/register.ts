// /app/lib/register.ts

import { sql, QueryResult } from '@vercel/postgres'; // Import QueryResult
import bcrypt from 'bcrypt';
import type { User } from '@/app/lib/definitions';

export async function registerUser(email: string, password: string): Promise<User> {
  const hashedPassword = await bcrypt.hash(password, 10);
  const queryResult: QueryResult<User> = await sql<User>`
    INSERT INTO users (email, password) VALUES (${email}, ${hashedPassword}) RETURNING *`;
  
  const user = queryResult.rows[0];
  return user;
}
