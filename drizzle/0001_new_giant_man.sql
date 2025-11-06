CREATE TABLE "answer" (
	"id" serial PRIMARY KEY NOT NULL,
	"answer" text,
	"questionId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chat" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"createdAt" text DEFAULT 'now()' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "question" (
	"id" serial PRIMARY KEY NOT NULL,
	"question" text,
	"chatId" integer NOT NULL,
	"createdAt" text DEFAULT 'now()' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "answer" ADD CONSTRAINT "answer_questionId_question_id_fk" FOREIGN KEY ("questionId") REFERENCES "public"."question"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "question" ADD CONSTRAINT "question_chatId_chat_id_fk" FOREIGN KEY ("chatId") REFERENCES "public"."chat"("id") ON DELETE no action ON UPDATE no action;