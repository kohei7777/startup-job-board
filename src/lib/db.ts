import { neon } from '@neondatabase/serverless'
import pkg from 'pg'
const { Pool } = pkg

// タグ付きテンプレート用（シンプルなクエリ）
export const sql = neon(process.env.DATABASE_URL!)

// 動的な条件が必要なクエリ用（Pool経由）
let _pool: InstanceType<typeof Pool> | null = null
export function getPool() {
  if (!_pool) {
    _pool = new Pool({ connectionString: process.env.DATABASE_URL })
  }
  return _pool
}

export default sql
