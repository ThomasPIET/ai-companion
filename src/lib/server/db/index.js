import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';
import { question, answer, chat } from './schema';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = postgres(env.DATABASE_URL);

export const db = drizzle(client, { schema });

/**+
 * @param {any} user_question
 * @param {{ reply: string }} ai_answer
 * @param {number} chat_id
 * @returns {Promise<any>}
 */
export const insertQuestion = async (user_question, ai_answer, chat_id) => {
	const insertedQuestion = await db
		.insert(question)
		.values({ question: user_question, chatId: chat_id })
		.returning();

	return await db
		.insert(answer)
		.values({ answer: ai_answer.reply, questionId: insertedQuestion[0].id });
};

/**
 *
 * @param {string} title
 * @returns  {Promise<any>}
 *
 */
export const insertChat = async (title) => {
	const insertedChat = await db.insert(chat).values({ title: title }).returning();

	return insertedChat[0].id;
};

/**
 *
 * @param {number} chatId
 * @returns {Promise<{id: number, title: string, createdAt: *, questions: Array<{id: number, question: string | null, createdAt: *, answer: string | null}>} | null>}
 */
export const getChatById = async (chatId) => {
	console.log('Fetching chat by ID:', typeof chatId);
	const result = await db.query.chat.findFirst({
		where: (chat, { eq }) => eq(chat.id, chatId),
		with: {
			questions: {
				with: {
					answers: true
				}
			}
		}
	});

	if (!result) {
		return null;
	}

	return {
		id: result.id,
		title: result.title,
		createdAt: result.createdAt,
		questions: result.questions.map((q) => ({
			id: q.id,
			question: q.question,
			createdAt: q.createdAt,
			answer: q.answers && q.answers.length > 0 ? q.answers[0].answer : null
		}))
	};
};

export const getAllTitles = async () => {};
