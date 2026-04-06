import { PrismaPg } from '@prisma/adapter-pg'
import pkg from 'pg'
const { Pool } = pkg
import * as dotenv from 'dotenv'
dotenv.config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

async function main() {
  const client = await pool.connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS "CompanyInquiry" (
        id SERIAL PRIMARY KEY,
        company TEXT NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        position TEXT NOT NULL,
        headcount TEXT,
        message TEXT,
        "createdAt" TIMESTAMPTZ DEFAULT NOW()
      )
    `)
    console.log('✅ CompanyInquiry テーブルを作成しました')
  } finally {
    client.release()
    await pool.end()
  }
}

main().catch(console.error)
