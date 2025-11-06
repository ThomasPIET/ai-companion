import { pgTable, serial, integer, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const chat = pgTable('chat', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	createdAt: timestamp('createdAt').notNull().defaultNow()
});

export const question = pgTable('question', {
	id: serial('id').primaryKey(),
	question: text('question'),
	chatId: integer('chatId')
		.references(() => chat.id)
		.notNull(),
		createdAt: timestamp('createdAt').notNull().defaultNow()
	});

export const answer = pgTable('answer', {
	id: serial('id').primaryKey(),
	answer: text('answer'),
	questionId: integer('questionId')
		.references(() => question.id)
		.notNull(),
	createdAt: timestamp('createdAt').notNull().defaultNow()
});

export const chatRelations = relations(chat, ({ many }) => ({
	questions: many(question)
}));

export const questionRelations = relations(question, ({ many, one }) => ({
	answers: many(answer),
	chat: one(chat, { fields: [question.chatId], references: [chat.id] })
}));

export const answerRelations = relations(answer, ({ one }) => ({
	question: one(question, { fields: [answer.questionId], references: [question.id] })
}));
