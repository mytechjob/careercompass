CREATE TABLE "about" (
	"id" integer PRIMARY KEY NOT NULL,
	"heading" text DEFAULT 'About Us' NOT NULL,
	"intro" text DEFAULT '' NOT NULL,
	"mission" text DEFAULT '' NOT NULL,
	"members" jsonb DEFAULT '[]'::jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "careers" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"category_id" text,
	"icon" text DEFAULT '' NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"short_description" text DEFAULT '' NOT NULL,
	"what_they_do" text DEFAULT '' NOT NULL,
	"work_environment" text DEFAULT '' NOT NULL,
	"how_to_become" text DEFAULT '' NOT NULL,
	"skills" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"salary" text DEFAULT '' NOT NULL,
	"job_outlook" text DEFAULT 'medium' NOT NULL,
	"education" text DEFAULT '' NOT NULL,
	"day_in_life" text DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"icon" text DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"sort" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"key" text PRIMARY KEY NOT NULL,
	"value" text NOT NULL
);
