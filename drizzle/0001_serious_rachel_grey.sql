CREATE TABLE "interviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"youtube_url" text DEFAULT '' NOT NULL,
	"sort" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
