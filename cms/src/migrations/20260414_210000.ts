import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "ministries"
      ADD COLUMN IF NOT EXISTS "type" varchar DEFAULT 'serve_area';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "ministries" DROP COLUMN IF EXISTS "type";
  `)
}
