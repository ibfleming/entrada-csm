CREATE TABLE IF NOT EXISTS "entrada_post" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "entrada_user" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(256) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"phone_type" varchar DEFAULT 'mobile' NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"first_name" varchar(256) NOT NULL,
	"middle_name" varchar(256),
	"last_name" varchar(256) NOT NULL,
	"gender" varchar NOT NULL,
	"birth_date" date,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "entrada_user_username_unique" UNIQUE("username"),
	CONSTRAINT "entrada_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "entrada_post" ("name");
