CREATE TABLE "chat" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" text DEFAULT 'now()' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "answer" ADD COLUMN "createdAt" text DEFAULT 'now()' NOT NULL;--> statement-breakpoint
ALTER TABLE "question" ADD COLUMN "chatId" integer;--> statement-breakpoint
ALTER TABLE "question" ADD COLUMN "createdAt" text DEFAULT 'now()' NOT NULL;--> statement-breakpoint
ALTER TABLE "question" ADD CONSTRAINT "question_chatId_chat_id_fk" FOREIGN KEY ("chatId") REFERENCES "public"."chat"("id") ON DELETE no action ON UPDATE no action;