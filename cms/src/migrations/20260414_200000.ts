import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE "events_links" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "url" varchar NOT NULL
    );

    ALTER TABLE "events_links"
      ADD CONSTRAINT "events_links_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id")
      ON DELETE cascade ON UPDATE no action;

    CREATE INDEX "events_links_order_idx" ON "events_links" USING btree ("_order");
    CREATE INDEX "events_links_parent_id_idx" ON "events_links" USING btree ("_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE "events_links" CASCADE;`)
}
