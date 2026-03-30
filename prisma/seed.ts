import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import path from 'path'

const dbPath = path.resolve(__dirname, '../dev.db')
const adapter = new PrismaBetterSqlite3({ url: dbPath })
const prisma = new PrismaClient({ adapter } as any)

async function main() {
  await prisma.job.deleteMany()

  const jobs = [
    {
      title: 'フルスタックエンジニア',
      company: 'クラウドネクスト株式会社',
      stage: 'シリーズB',
      featured: true,
      description: 'BtoB SaaSプロダクトの開発をリードするフルスタックエンジニアを募集。React/Next.jsとGoを使ったモダンな開発環境で、プロダクトの成長を技術面から牽引していただきます。',
      tags: 'エンジニア,SaaS,リモート可',
      salaryMin: 700,
      salaryMax: 1200,
      location: '東京都渋谷区',
      employees: '120名',
      founded: '2018年',
      requirements: 'React/Next.js開発経験3年以上,Go言語での開発経験,チームリード経験',
      benefits: 'ストックオプション制度,フルリモート可,フレックスタイム,書籍購入補助',
      industry: 'SaaS',
      jobType: 'エンジニア',
    },
    {
      title: '事業開発マネージャー',
      company: 'フィンテックラボ株式会社',
      stage: 'シリーズA',
      featured: true,
      description: '金融×テクノロジーで業界を変革するスタートアップで、事業開発をリードするマネージャーを募集。銀行・証券会社とのアライアンス構築や新規事業の立ち上げを担当していただきます。',
      tags: 'ビジネス,FinTech',
      salaryMin: 800,
      salaryMax: 1500,
      location: '東京都千代田区',
      employees: '45名',
      founded: '2020年',
      requirements: '金融業界での実務経験3年以上,事業開発・アライアンス経験,ビジネスレベルの英語力',
      benefits: 'ストックオプション制度,副業OK,学習支援制度',
      industry: 'FinTech',
      jobType: 'ビジネス',
    },
    {
      title: 'プロダクトデザイナー',
      company: 'ヘルスケアAI株式会社',
      stage: 'シリーズA',
      featured: false,
      description: 'AIを活用した健康管理アプリのUI/UXデザインを担当。ユーザーリサーチからプロトタイピング、デザインシステムの構築まで一貫して携わっていただきます。',
      tags: 'デザイナー,HealthTech,リモート可',
      salaryMin: 600,
      salaryMax: 1000,
      location: '東京都港区',
      employees: '30名',
      founded: '2021年',
      requirements: 'UI/UXデザイン経験3年以上,Figmaの実務経験,ユーザーリサーチの実施経験',
      benefits: 'リモートワーク可,フレックスタイム,健康支援制度',
      industry: 'HealthTech',
      jobType: 'デザイナー',
    },
    {
      title: 'プロダクトマネージャー',
      company: 'エドテックイノベーション株式会社',
      stage: 'シリーズB',
      featured: true,
      description: '教育×テクノロジーで学びを変革するプロダクトのPMを募集。ユーザーインタビューからロードマップ策定、開発チームとの協業までプロダクト全体を統括していただきます。',
      tags: 'PM,EdTech,リモート可',
      salaryMin: 800,
      salaryMax: 1300,
      location: '東京都新宿区',
      employees: '60名',
      founded: '2019年',
      requirements: 'PMまたはPdM経験2年以上,アジャイル開発の理解,データドリブンな意思決定経験',
      benefits: 'ストックオプション制度,リモートワーク可,副業OK,学習支援制度',
      industry: 'EdTech',
      jobType: 'PM',
    },
    {
      title: 'マーケティングマネージャー',
      company: 'コマースプラス株式会社',
      stage: 'シード',
      featured: false,
      description: 'D2Cブランドのグロースを牽引するマーケティングマネージャーを募集。SNSマーケティング、CRM、広告運用を統括し、ブランドの急成長を実現していただきます。',
      tags: 'マーケティング,EC',
      salaryMin: 600,
      salaryMax: 900,
      location: '東京都目黒区',
      employees: '15名',
      founded: '2022年',
      requirements: 'デジタルマーケティング経験3年以上,D2C・EC業界での経験,データ分析スキル',
      benefits: 'ストックオプション制度,副業OK,リモート可',
      industry: 'EC',
      jobType: 'マーケティング',
    },
    {
      title: 'バックエンドエンジニア',
      company: 'スペーステック株式会社',
      stage: 'シリーズB',
      featured: true,
      description: '大規模分散システムの設計・開発を担当するバックエンドエンジニアを募集。マイクロサービスアーキテクチャの設計からパフォーマンスチューニングまで幅広く携わっていただきます。',
      tags: 'エンジニア,SaaS,リモート可',
      salaryMin: 800,
      salaryMax: 1400,
      location: '東京都品川区',
      employees: '80名',
      founded: '2017年',
      requirements: 'バックエンド開発経験5年以上,分散システムの設計経験,AWS/GCPの運用経験',
      benefits: 'ストックオプション制度,フルリモート可,フレックスタイム,技術書購入補助',
      industry: 'SaaS',
      jobType: 'エンジニア',
    },
    {
      title: 'CFO候補',
      company: 'メディカルDX株式会社',
      stage: '上場準備中',
      featured: true,
      description: 'IPOを目指すヘルステックスタートアップのCFO候補を募集。資金調達、IR戦略、管理体制の構築をリードし、上場に向けた体制整備を担っていただきます。',
      tags: 'ビジネス,HealthTech',
      salaryMin: 1200,
      salaryMax: 2000,
      location: '東京都中央区',
      employees: '150名',
      founded: '2016年',
      requirements: 'CFO・財務責任者経験,IPO準備経験,監査法人・投資銀行での経験',
      benefits: 'ストックオプション制度,役員待遇,社用車',
      industry: 'HealthTech',
      jobType: 'ビジネス',
    },
    {
      title: 'データサイエンティスト',
      company: 'AIアナリティクス株式会社',
      stage: 'シリーズA',
      featured: false,
      description: '機械学習・統計解析を活用したデータ分析基盤の構築を担当。顧客データの分析から予測モデルの開発、ビジネスインサイトの提供まで一貫して携わっていただきます。',
      tags: 'エンジニア,SaaS,リモート可',
      salaryMin: 700,
      salaryMax: 1200,
      location: '東京都渋谷区',
      employees: '35名',
      founded: '2020年',
      requirements: '機械学習の実務経験2年以上,Python/Rでの統計分析,SQLの実務経験',
      benefits: 'リモートワーク可,フレックスタイム,学会参加支援,GPU環境完備',
      industry: 'SaaS',
      jobType: 'エンジニア',
    },
    {
      title: 'カスタマーサクセスマネージャー',
      company: 'HRクラウド株式会社',
      stage: 'シリーズA',
      featured: false,
      description: 'HR SaaSプロダクトのカスタマーサクセスを担当。顧客のオンボーディングから活用支援、チャーン防止まで、顧客の成功を支援する重要なポジションです。',
      tags: 'ビジネス,SaaS,リモート可',
      salaryMin: 500,
      salaryMax: 800,
      location: '東京都渋谷区',
      employees: '50名',
      founded: '2019年',
      requirements: 'カスタマーサクセス経験2年以上,SaaS業界での経験,データ分析スキル',
      benefits: 'リモートワーク可,副業OK,学習支援制度',
      industry: 'SaaS',
      jobType: 'ビジネス',
    },
    {
      title: 'フロントエンドエンジニア',
      company: 'リテールテック株式会社',
      stage: 'シード',
      featured: false,
      description: '次世代ECプラットフォームのフロントエンド開発を担当。React/TypeScriptを使ったモダンなUI開発に携わり、ユーザー体験の向上を推進していただきます。',
      tags: 'エンジニア,EC,リモート可',
      salaryMin: 600,
      salaryMax: 1000,
      location: '大阪府大阪市',
      employees: '20名',
      founded: '2023年',
      requirements: 'React/TypeScript開発経験2年以上,レスポンシブデザインの実装経験,パフォーマンス最適化の知識',
      benefits: 'フルリモート可,フレックスタイム,副業OK',
      industry: 'EC',
      jobType: 'エンジニア',
    },
  ]

  for (const job of jobs) {
    await prisma.job.create({ data: job })
  }

  console.log('Seed data inserted successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
