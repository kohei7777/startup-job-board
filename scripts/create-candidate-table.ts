import pkg from 'pg'
const { Pool } = pkg
import * as dotenv from 'dotenv'
dotenv.config()

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

async function main() {
  const client = await pool.connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Candidate" (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        "currentCompany" TEXT,
        "currentTitle" TEXT,
        "desiredPosition" TEXT NOT NULL,
        industry TEXT,
        experience TEXT,
        "salaryMin" INTEGER,
        "salaryDesired" INTEGER,
        skills TEXT,
        timing TEXT,
        message TEXT,
        status TEXT NOT NULL DEFAULT 'pending',
        "createdAt" TIMESTAMPTZ DEFAULT NOW()
      )
    `)
    console.log('✅ Candidate テーブルを作成しました')
  } finally {
    client.release()
    await pool.end()
  }
}

main().catch(console.error)
