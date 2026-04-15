import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Add store hero columns to page_heroes global
    ALTER TABLE "page_heroes"
      ADD COLUMN IF NOT EXISTS "store_hero_title" varchar,
      ADD COLUMN IF NOT EXISTS "store_hero_subtitle" varchar,
      ADD COLUMN IF NOT EXISTS "store_hero_image_id" integer;

    -- FK for hero image
    ALTER TABLE "page_heroes"
      ADD CONSTRAINT "page_heroes_store_hero_image_id_media_id_fk"
      FOREIGN KEY ("store_hero_image_id") REFERENCES "public"."media"("id")
      ON DELETE set null ON UPDATE no action;

    -- Index for hero image
    CREATE INDEX IF NOT EXISTS "page_heroes_store_store_hero_image_idx"
      ON "page_heroes" USING btree ("store_hero_image_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "page_heroes"
      DROP CONSTRAINT IF EXISTS "page_heroes_store_hero_image_id_media_id_fk";
    DROP INDEX IF EXISTS "page_heroes_store_store_hero_image_idx";
    ALTER TABLE "page_heroes"
      DROP COLUMN IF EXISTS "store_hero_title",
      DROP COLUMN IF EXISTS "store_hero_subtitle",
      DROP COLUMN IF EXISTS "store_hero_image_id";
  `)
}
