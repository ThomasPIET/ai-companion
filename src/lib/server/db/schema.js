import { pgTable, serial, integer, text } from 'drizzle-orm/pg-core';

export const chat = pgTable('chat', {
	id: serial('id').primaryKey(),
	createdAt: text('createdAt').notNull().default('now()')
});

export const question = pgTable('question', {
	id: serial('id').primaryKey(),
	question: text('question'),
	chatId: integer('chatId').references(() => chat.id),
	createdAt: text('createdAt').notNull().default('now()')
});

export const answer = pgTable('answer', {
	id: serial('id').primaryKey(),
	answer: text('answer'),
	questionId: integer('questionId').references(() => question.id),
	createdAt: text('createdAt').notNull().default('now()')
});
