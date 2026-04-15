import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "mission_partners" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "slug" varchar,
      "summary" varchar,
      "description" jsonb,
      "image_id" integer,
      "partner_url" varchar,
      "order" numeric DEFAULT 0,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE UNIQUE INDEX IF NOT EXISTS "mission_partners_slug_idx"
      ON "mission_partners" USING btree ("slug");
    CREATE INDEX IF NOT EXISTS "mission_partners_updated_at_idx"
      ON "mission_partners" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "mission_partners_created_at_idx"
      ON "mission_partners" USING btree ("created_at");

    ALTER TABLE "mission_partners"
      ADD CONSTRAINT "mission_partners_image_id_fk"
      FOREIGN KEY ("image_id") REFERENCES "public"."media"("id")
      ON DELETE set null ON UPDATE no action;

    -- Payload internal: add mission_partners relation column to locked documents
    ALTER TABLE "payload_locked_documents_rels"
      ADD COLUMN IF NOT EXISTS "mission_partners_id" integer;

    ALTER TABLE "payload_locked_documents_rels"
      ADD CONSTRAINT "payload_locked_documents_rels_mission_partners_fk"
      FOREIGN KEY ("mission_partners_id") REFERENCES "public"."mission_partners"("id")
      ON DELETE cascade ON UPDATE no action;

    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_mission_partners_id_idx"
      ON "payload_locked_documents_rels" USING btree ("mission_partners_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
      DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_mission_partners_fk";
    ALTER TABLE "payload_locked_documents_rels"
      DROP COLUMN IF EXISTS "mission_partners_id";
    DROP TABLE IF EXISTS "mission_partners" CASCADE;
  `)
}
