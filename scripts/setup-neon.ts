import pkg from 'pg'
const { Pool } = pkg
import * as dotenv from 'dotenv'
dotenv.config()

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

async function main() {
  const client = await pool.connect()
  try {
    // Job テーブル
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Job" (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        company TEXT NOT NULL,
        description TEXT,
        requirements TEXT,
        benefits TEXT,
        "jobType" TEXT,
        industry TEXT,
        stage TEXT,
        location TEXT,
        "salaryMin" INTEGER,
        "salaryMax" INTEGER,
        employees TEXT,
        founded TEXT,
        tags TEXT,
        "applyUrl" TEXT,
        featured BOOLEAN DEFAULT false,
        "createdAt" TIMESTAMPTZ DEFAULT NOW()
      )
    `)
    console.log('✅ Job テーブル作成')

    // Application テーブル
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Application" (
        id SERIAL PRIMARY KEY,
        "jobId" INTEGER REFERENCES "Job"(id),
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT,
        "createdAt" TIMESTAMPTZ DEFAULT NOW()
      )
    `)
    console.log('✅ Application テーブル作成')

    // CompanyInquiry テーブル
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
    console.log('✅ CompanyInquiry テーブル作成')

    // Candidate テーブル
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
    console.log('✅ Candidate テーブル作成')

    console.log('\n🎉 全テーブルの作成が完了しました')
  } finally {
    client.release()
    await pool.end()
  }
}

main().catch(console.error)
