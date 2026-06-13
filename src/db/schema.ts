import {
  pgTable, text, boolean, integer, jsonb, timestamp, serial,
} from 'drizzle-orm/pg-core';

export type Member = {
  name: string;
  role: string;
  emoji: string;
  bio: string;
};

export const categories = pgTable('categories', {
  id: text('id').primaryKey(), // slug, e.g. "healthcare"
  name: text('name').notNull(),
  icon: text('icon').default('').notNull(),
  description: text('description').default('').notNull(),
  sort: integer('sort').default(0).notNull(),
});

export const careers = pgTable('careers', {
  id: text('id').primaryKey(), // slug, e.g. "registered-nurse"
  title: text('title').notNull(),
  categoryId: text('category_id'),
  icon: text('icon').default('').notNull(),
  featured: boolean('featured').default(false).notNull(),
  shortDescription: text('short_description').default('').notNull(),
  whatTheyDo: text('what_they_do').default('').notNull(),
  workEnvironment: text('work_environment').default('').notNull(),
  howToBecome: text('how_to_become').default('').notNull(),
  skills: jsonb('skills').$type<string[]>().default([]).notNull(),
  salary: text('salary').default('').notNull(),
  jobOutlook: text('job_outlook').default('medium').notNull(),
  education: text('education').default('').notNull(),
  dayInLife: text('day_in_life').default('').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const interviews = pgTable('interviews', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  youtubeUrl: text('youtube_url').default('').notNull(),
  sort: integer('sort').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const settings = pgTable('settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
});

export const about = pgTable('about', {
  id: integer('id').primaryKey(), // always 1 (single row)
  heading: text('heading').default('About Us').notNull(),
  intro: text('intro').default('').notNull(),
  mission: text('mission').default('').notNull(),
  members: jsonb('members').$type<Member[]>().default([]).notNull(),
});

export type Category = typeof categories.$inferSelect;
export type Career = typeof careers.$inferSelect;
export type About = typeof about.$inferSelect;
export type Interview = typeof interviews.$inferSelect;
