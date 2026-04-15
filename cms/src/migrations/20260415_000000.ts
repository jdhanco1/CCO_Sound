import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "ministries"
      ADD COLUMN IF NOT EXISTS "tagline" varchar,
      ADD COLUMN IF NOT EXISTS "external_url" varchar,
      ADD COLUMN IF NOT EXISTS "accent_color" varchar DEFAULT 'accent';

    -- Expand type column to support new ministry_card value (already varchar, no change needed)
    -- Update existing type default to remain serve_area
    UPDATE "ministries" SET "accent_color" = 'accent' WHERE "accent_color" IS NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "ministries"
      DROP COLUMN IF EXISTS "tagline",
      DROP COLUMN IF EXISTS "external_url",
      DROP COLUMN IF EXISTS "accent_color";
  `)
}
