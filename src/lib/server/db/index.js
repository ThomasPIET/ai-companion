import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';
import { question, answer } from './schema';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = postgres(env.DATABASE_URL);

export const db = drizzle(client, { schema });

export const insertQuestion = async (user_question, ai_answer) => {
	const insertedQuestion = await db
		.insert(question)
		.values({ question: user_question })
		.returning();

	return db.insert(answer).values({ answer: ai_answer.reply, questionId: insertedQuestion[0].id });
};
