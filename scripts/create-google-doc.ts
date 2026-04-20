import { google } from 'googleapis'
import * as dotenv from 'dotenv'
dotenv.config()

const SCOPES = [
  'https://www.googleapis.com/auth/documents',
  'https://www.googleapis.com/auth/drive',
]

async function main() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: SCOPES,
  })

  const docs = google.docs({ version: 'v1', auth })
  const drive = google.drive({ version: 'v3', auth })

  // Upload .docx and convert to Google Docs format
  const fs = await import('fs')
  const { Readable } = await import('stream')
  const fileContent = fs.readFileSync('/Users/kohei/Desktop/keyplayers-direct-plan.docx')
  const stream = Readable.from(fileContent)

  const file = await drive.files.create({
    requestBody: {
      name: 'KEYPLAYERS DIRECT プロジェクト計画書',
      mimeType: 'application/vnd.google-apps.document',
    },
    media: {
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      body: stream,
    },
    fields: 'id',
  })

  const docId = file.data.id!
  console.log('Document created:', docId)

  // Build content requests
  const requests: any[] = []

  const addText = (text: string) => {
    requests.push({ insertText: { location: { index: 1 }, text } })
  }

  // We'll build the doc content using batchUpdate
  // Insert all text first (in reverse order since index:1 prepends)
  const content = [
    // Footer line
    '\nKEYPLAYERS DIRECT  |  direct.keyplayers.jp',

    // Section 11
    '\n1. 候補者登録フォームをつくる（これがないと何も始まらない）\n2. 高野さんのSNSから direct.keyplayers.jp への導線を1本貼る（まず流入）\n3. /recruit から1社でも問い合わせを取る（企業側の検証）\n',
    '\n直近の優先アクション（来月まで）\n',

    // Section 10
    '\n1ヶ月後\t投資先・支援先から10社掲載\n3ヶ月後\t調達企業アプローチで+20社、計30社\n6ヶ月後\tインバウンド+アウトリーチで50社、求人100件\n',
    '\n数値目標\n',

    // Section 9
    '\n無料掲載から始める\t初期は無料でハードルを下げる\n掲載後に候補者を1名紹介する\t価値を体験させてから有料化\n企業の自己入力フォームをつくる\t高野さんが全部入力しなくて済む仕組み\n掲載企業に「掲載中バッジ」を渡す\t企業側のPRになり口コミが生まれる\n',
    '\n掲載を増やすための仕組み化\n',

    // Section 8
    '\n「キープレイヤーズダイレクトは、私（高野）が11,000件の面談で出会った幹部候補に、直接御社の求人をご紹介するプラットフォームです。まず無料で掲載してみませんか？」\n',
    '\n✅ やるべきこと：「高野が直接候補者に紹介します」を前面に出す\n\n例文：\n',
    '\n❌ やってはいけないこと：「掲載をお願いしたい」→ 媒体営業と同じに見える\n',
    '\nアプローチ文のトーン設計\n',

    // Section 7 - approach steps
    '\nSTEP 1\t投資先・支援先に高野さんが直接連絡（メールor電話1本）\nSTEP 2\t調達情報ウォッチ → 高野さん名義でお祝いメール\nSTEP 3\t/recruit への問い合わせ対応（インバウンド）\nSTEP 4\tStartupClass掲載企業へのアウトリーチ\n',
    '\nアプローチ方法\n',

    // Section 7 - priorities
    '\n1. 最優先：高野さんの既存ネットワーク内\n   投資先80社、上場支援178社、過去の面談候補者の在籍企業\n   → まずここで10〜20社を獲得。信頼関係ゼロから始まらない。\n2. 第2優先：スタートアップ調達情報\n   情報源：INITIAL、Crunchbase、PR TIMES\n   タイミング：調達発表から2週間以内にアプローチ\n   見るべきラウンド：シリーズA〜C\n3. 第3優先：StartupClass掲載企業（すでにクローリング中）\n   採用意欲は確実にあるが、競合媒体にも出している\n   「高野さん経由の方が質が高い」という差別化が必要\n',
    '\nアプローチ優先順位\n',
    '\n掲載企業獲得戦略\n',

    // Section 6
    '\n審査通過者への「認定バッジ」発行\t候補者の拡散・口コミ\n転職成功事例のコンテンツ発信\tSEO・信頼構築\nVC・投資家ネットワークとの連携\t企業獲得の加速\n',
    '\n目標：「幹部転職＝キープレイヤーズダイレクト」のポジション獲得\n',
    '\nPhase 4：ブランド確立（1〜2年）\n',

    // Section 5
    '\n企業が候補者DBを検索・スカウト送付\t収益化の柱①\n成功報酬モデルの整備\t収益化の柱②\n面談・選考状況の管理機能\tATS（採用管理）化\n候補者へのレコメンド通知（メール・LINE）\tエンゲージメント維持\n',
    '\n目標：スカウト機能でマネタイズを本格化\n',
    '\nPhase 3：マッチング強化（6〜12ヶ月）\n',

    // Section 4
    '\n候補者の登録フォーム実装（経歴・希望条件）\t候補者DBの構築開始\n審査制の仕組みを入れる（高野さんが承認）\tブランド・品質担保\n企業向けの掲載管理画面\t企業の自走化\nマイページ（保存求人・応募状況管理）\t候補者のリテンション\n',
    '\n目標：候補者・企業の両面でDB化を始める\n',
    '\nPhase 2：登録フロー構築（3〜6ヶ月）\n',

    // Section 3
    '\n求人を継続的に増やす（クローラー拡充）\tSEO・コンテンツ充実\n高野さんのSNS・note等からの導線設置\t既存フォロワーを流入させる\nkeyplayers.jpとの相互リンク\tドメイン評価向上\n/recruit LPで企業向けの問い合わせ獲得開始\t掲載企業の初期獲得\n',
    '\n目標：サイトへの流入をつくる\n',
    '\nPhase 1：集客・認知（今〜3ヶ月）\n',

    // Section 2 - roadmap table
    '\nPhase 1\t今〜3ヶ月\t集客・認知\nPhase 2\t3〜6ヶ月\t登録フロー構築\nPhase 3\t6〜12ヶ月\tマッチング強化・マネタイズ\nPhase 4\t1〜2年\tブランド確立\n',
    '\nフェーズ別ロードマップ\n',

    // Section 1 - goal table
    '\n候補者DB\t審査通過済みの幹部候補 500〜1,000名\n掲載企業\tスタートアップ 100社以上\nマネタイズ\t企業からの掲載料・成功報酬で年間数千万円規模\n',
    '\n「高野秀敏が選んだ幹部人材だけが集まるプラットフォーム」\n',
    '\n最終ゴール（2〜3年後）\n',

    // Cover
    '\n幹部転職プラットフォーム 事業開発ロードマップ｜2026年4月\n',
    '\nKEYPLAYERS DIRECT プロジェクト計画書\n',
  ]

  // Insert text in order (each at index 1 prepends, so last item ends up first)
  for (const text of content) {
    requests.push({
      insertText: {
        location: { index: 1 },
        text,
      },
    })
  }

  await docs.documents.batchUpdate({
    documentId: docId,
    requestBody: { requests },
  })

  // Now apply heading styles - we need to get the document to find indices
  const docContent = await docs.documents.get({ documentId: docId })
  const bodyContent = docContent.data.body?.content || []

  const styleRequests: any[] = []
  const headings = [
    'KEYPLAYERS DIRECT プロジェクト計画書',
    '最終ゴール（2〜3年後）',
    'フェーズ別ロードマップ',
    'Phase 1：集客・認知（今〜3ヶ月）',
    'Phase 2：登録フロー構築（3〜6ヶ月）',
    'Phase 3：マッチング強化（6〜12ヶ月）',
    'Phase 4：ブランド確立（1〜2年）',
    '掲載企業獲得戦略',
    'アプローチ優先順位',
    'アプローチ方法',
    'アプローチ文のトーン設計',
    '掲載を増やすための仕組み化',
    '数値目標',
    '直近の優先アクション（来月まで）',
  ]

  for (const element of bodyContent) {
    if (!element.paragraph) continue
    const paraText = element.paragraph.elements
      ?.map((e: any) => e.textRun?.content || '')
      .join('')
      .trim()

    const startIndex = element.startIndex
    const endIndex = element.endIndex

    if (paraText === 'KEYPLAYERS DIRECT プロジェクト計画書') {
      styleRequests.push({
        updateParagraphStyle: {
          range: { startIndex, endIndex },
          paragraphStyle: { namedStyleType: 'TITLE' },
          fields: 'namedStyleType',
        },
      })
    } else if (headings.slice(1, 8).includes(paraText)) {
      styleRequests.push({
        updateParagraphStyle: {
          range: { startIndex, endIndex },
          paragraphStyle: { namedStyleType: 'HEADING_1' },
          fields: 'namedStyleType',
        },
      })
    } else if (headings.slice(8).includes(paraText)) {
      styleRequests.push({
        updateParagraphStyle: {
          range: { startIndex, endIndex },
          paragraphStyle: { namedStyleType: 'HEADING_2' },
          fields: 'namedStyleType',
        },
      })
    } else if (paraText.startsWith('目標：')) {
      styleRequests.push({
        updateTextStyle: {
          range: { startIndex, endIndex },
          textStyle: { bold: true },
          fields: 'bold',
        },
      })
    }
  }

  if (styleRequests.length > 0) {
    await docs.documents.batchUpdate({
      documentId: docId,
      requestBody: { requests: styleRequests },
    })
  }

  // Share the document with anyone with the link (viewer)
  await drive.permissions.create({
    fileId: docId,
    requestBody: {
      role: 'writer',
      type: 'anyone',
    },
  })

  console.log('\n✅ Googleドキュメントを作成しました')
  console.log(`🔗 URL: https://docs.google.com/document/d/${docId}/edit`)
}

main().catch(console.error)
