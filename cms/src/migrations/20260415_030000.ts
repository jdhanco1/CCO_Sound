import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "merch_items" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "description" varchar,
      "price" numeric NOT NULL,
      "image_id" integer NOT NULL,
      "purchase_url" varchar NOT NULL,
      "category" varchar DEFAULT 'apparel',
      "featured" boolean DEFAULT false,
      "available" boolean DEFAULT true,
      "order" numeric DEFAULT 0,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE INDEX IF NOT EXISTS "merch_items_updated_at_idx"
      ON "merch_items" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "merch_items_created_at_idx"
      ON "merch_items" USING btree ("created_at");

    ALTER TABLE "merch_items"
      ADD CONSTRAINT "merch_items_image_id_fk"
      FOREIGN KEY ("image_id") REFERENCES "public"."media"("id")
      ON DELETE set null ON UPDATE no action;

    -- Payload internal: add merch_items relation column to locked documents
    ALTER TABLE "payload_locked_documents_rels"
      ADD COLUMN IF NOT EXISTS "merch_items_id" integer;

    ALTER TABLE "payload_locked_documents_rels"
      ADD CONSTRAINT "payload_locked_documents_rels_merch_items_fk"
      FOREIGN KEY ("merch_items_id") REFERENCES "public"."merch_items"("id")
      ON DELETE cascade ON UPDATE no action;

    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_merch_items_id_idx"
      ON "payload_locked_documents_rels" USING btree ("merch_items_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
      DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_merch_items_fk";
    ALTER TABLE "payload_locked_documents_rels"
      DROP COLUMN IF EXISTS "merch_items_id";
    DROP TABLE IF EXISTS "merch_items" CASCADE;
  `)
}
