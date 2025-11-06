ALTER TABLE "chat" ALTER COLUMN "createdAt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "chat" ALTER COLUMN "createdAt" SET DATA TYPE timestamp USING now();--> statement-breakpoint
ALTER TABLE "chat" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "question" ALTER COLUMN "createdAt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "question" ALTER COLUMN "createdAt" SET DATA TYPE timestamp USING now();--> statement-breakpoint
ALTER TABLE "question" ALTER COLUMN "createdAt" SET DEFAULT now();