import type { Metadata } from 'next'
import Link from 'next/link'
import CompanyContactForm from '@/components/CompanyContactForm'

export const metadata: Metadata = {
  title: '企業様向け採用掲載 | KEYPLAYERS DIRECT',
  description: 'スタートアップ・ベンチャーの幹部採用に特化。11,000件以上のキャリア面談実績を持つ高野秀敏が、貴社の採用を直接支援します。',
}

const painPoints = [
  {
    icon: '😔',
    title: '一般媒体では幹部候補が集まらない',
    desc: '大手求人サイトに掲載しても、スタートアップの幹部ポジションに合う人材はなかなか現れない。',
  },
  {
    icon: '💸',
    title: 'エージェント費用が高すぎる',
    desc: '成功報酬型のエージェントでは、採用ごとに年収の30〜35%が発生。初期フェーズには重すぎるコスト。',
  },
  {
    icon: '🔍',
    title: '自社の魅力が候補者に伝わらない',
    desc: 'スタートアップの魅力や将来性を正しく言語化して伝えるには、専門知識とネットワークが必要。',
  },
]

const reasons = [
  {
    number: '01',
    title: '11,000件の面談実績',
    desc: '高野秀敏が積み上げた圧倒的な面談数。スタートアップ幹部層の動向・転職意向を誰よりも把握しています。',
  },
  {
    number: '02',
    title: 'スタートアップ専門に特化',
    desc: '大手・総合型媒体とは異なり、スタートアップ・ベンチャーの幹部採用に完全特化。質の高いマッチングを実現します。',
  },
  {
    number: '03',
    title: '高野が候補者に直接訴求',
    desc: '求人掲載だけでなく、高野自身が候補者に向けてご紹介。信頼関係をベースにした紹介で、接触率・面談率が高い。',
  },
  {
    number: '04',
    title: '178社以上の上場支援実績',
    desc: '投資先・支援先のネットワークを活用。採用だけでなく、事業成長の視点も加えた採用支援を提供します。',
  },
]

const steps = [
  {
    step: 'STEP 1',
    title: 'お問い合わせ',
    desc: 'まずはフォームからお気軽にご連絡ください。採用背景や求めるポジションをお聞かせください。',
  },
  {
    step: 'STEP 2',
    title: '採用ヒアリング・掲載開始',
    desc: '高野が直接ヒアリング。求人票の作成・掲載をサポートします。最短3営業日で公開可能です。',
  },
  {
    step: 'STEP 3',
    title: 'スカウト・マッチング',
    desc: '候補者データベースから適切な人材をスカウト。面談のセッティングまでサポートします。',
  },
]

const plans = [
  {
    name: 'スタンダード',
    price: '掲載無料',
    sub: '成果報酬型',
    features: [
      '求人掲載（1ポジション）',
      '候補者からの直接応募',
      '採用成功時のみ費用発生',
      'サポート：メール',
    ],
    cta: '相談する',
    highlight: false,
  },
  {
    name: 'プレミアム',
    price: 'お問い合わせ',
    sub: '高野直接サポート付き',
    features: [
      '求人掲載（複数ポジション対応）',
      '高野によるスカウト実施',
      '採用要件ヒアリング・求人票作成代行',
      '候補者の事前スクリーニング',
      '面談設定・クロージングサポート',
      '採用戦略アドバイス',
    ],
    cta: '詳細を相談する',
    highlight: true,
  },
]

const faqs = [
  {
    q: 'どんな企業が掲載できますか？',
    a: 'スタートアップ・ベンチャー企業を対象としています。シリーズA〜上場前後の企業様に特に多くご利用いただいています。',
  },
  {
    q: '掲載できるポジションに制限はありますか？',
    a: '幹部・マネジメントポジションを中心に掲載しています。CxO、VP、部長クラスのポジションが中心です。',
  },
  {
    q: '掲載開始まで何日かかりますか？',
    a: 'ヒアリング後、最短3営業日で掲載開始できます。',
  },
  {
    q: '成果報酬の金額はどのくらいですか？',
    a: '採用ポジションや条件によって異なります。まずはお気軽にお問い合わせください。',
  },
]

export default function ForCompaniesPage() {
  return (
    <div style={{ backgroundColor: '#0a0a0f', minHeight: '100vh' }}>

      {/* Hero */}
      <section className="relative pt-36 pb-28 px-4 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 60% 0%, rgba(124, 58, 237, 0.35) 0%, rgba(10, 10, 15, 0) 65%)'
        }} />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6"
               style={{ backgroundColor: 'rgba(124, 58, 237, 0.15)', border: '1px solid rgba(168, 85, 247, 0.3)', color: '#c084fc' }}>
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            企業様向け採用支援
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            スタートアップの幹部採用を、<br />
            <span style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              もっと確実に。
            </span>
          </h1>

          <p className="text-lg text-gray-400 mb-10 max-w-2xl leading-relaxed">
            11,000件以上のキャリア面談実績を持つ<strong className="text-white">高野秀敏</strong>が、
            貴社の幹部採用を直接支援します。<br />
            スタートアップに特化したネットワークと知見で、適切な人材をご紹介。
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact"
               className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-white transition-all hover:opacity-90"
               style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
              無料で採用相談する
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <Link href="/"
               className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-white transition-all hover:bg-white/10"
               style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
              掲載求人を見る
            </Link>
          </div>

          {/* Stats bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: '11,000+', label: 'キャリア面談実績' },
              { num: '178+', label: '上場支援実績' },
              { num: '80+', label: '投資先企業' },
              { num: '3営業日', label: '掲載開始目安' },
            ].map((s) => (
              <div key={s.label} className="text-center p-4 rounded-xl"
                   style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(168, 85, 247, 0.15)' }}>
                <div className="text-2xl md:text-3xl font-bold mb-1"
                     style={{ background: 'linear-gradient(135deg, #7c3aed, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {s.num}
                </div>
                <div className="text-gray-500 text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-purple-400 text-sm font-medium mb-3 tracking-widest uppercase">こんなお悩みはありませんか？</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">スタートアップの採用、<br />うまくいっていますか？</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {painPoints.map((p) => (
              <div key={p.title} className="rounded-2xl p-8"
                   style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(168, 85, 247, 0.15)' }}>
                <div className="text-4xl mb-5">{p.icon}</div>
                <h3 className="text-white font-semibold text-lg mb-3">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 px-4" style={{ backgroundColor: 'rgba(124, 58, 237, 0.05)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-purple-400 text-sm font-medium mb-3 tracking-widest uppercase">Why KEYPLAYERS DIRECT</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">選ばれる4つの理由</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reasons.map((r) => (
              <div key={r.number} className="flex gap-6 p-8 rounded-2xl"
                   style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
                <div className="text-3xl font-black shrink-0"
                     style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {r.number}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">{r.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profile */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl overflow-hidden"
               style={{ background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15), rgba(168, 85, 247, 0.08))', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
            <div className="p-10 md:p-14 flex flex-col md:flex-row items-center gap-10">
              {/* Avatar placeholder */}
              <div className="shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center text-5xl"
                   style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
                👤
              </div>
              <div>
                <p className="text-purple-400 text-sm font-medium mb-2">KEYPLAYERS DIRECT 代表</p>
                <h2 className="text-3xl font-bold text-white mb-1">高野 秀敏</h2>
                <p className="text-gray-400 text-sm mb-5">Hidetoshi Takano</p>
                <p className="text-gray-300 leading-relaxed text-sm max-w-xl">
                  スタートアップ・ベンチャー向けの採用支援を専門とし、11,000件以上のキャリア面談を実施。
                  178社以上の上場支援に携わり、10社の投資先上場を経験。
                  スタートアップのフェーズに合った採用戦略の立案から、
                  幹部候補の発掘・紹介まで、一貫して支援しています。
                </p>
                <div className="mt-5 flex gap-3 flex-wrap">
                  {['スタートアップ採用', '幹部人材', 'キャリア面談11,000件+', '178社上場支援'].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: 'rgba(124, 58, 237, 0.2)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4" style={{ backgroundColor: 'rgba(124, 58, 237, 0.05)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-purple-400 text-sm font-medium mb-3 tracking-widest uppercase">Flow</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">掲載までの流れ</h2>
          </div>
          <div className="relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px"
                 style={{ background: 'linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.4), transparent)' }} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((s, i) => (
                <div key={s.step} className="text-center relative">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold"
                       style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', color: 'white', position: 'relative', zIndex: 1 }}>
                    {i + 1}
                  </div>
                  <p className="text-purple-400 text-xs font-semibold mb-2 tracking-widest">{s.step}</p>
                  <h3 className="text-white font-bold text-lg mb-3">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-purple-400 text-sm font-medium mb-3 tracking-widest uppercase">Plans</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">料金プラン</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan) => (
              <div key={plan.name}
                   className="rounded-2xl p-8 flex flex-col"
                   style={plan.highlight
                     ? { background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.3), rgba(168, 85, 247, 0.15))', border: '1px solid rgba(168, 85, 247, 0.5)' }
                     : { backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(168, 85, 247, 0.2)' }
                   }>
                {plan.highlight && (
                  <span className="inline-flex self-start px-3 py-1 rounded-full text-xs font-semibold mb-4"
                        style={{ backgroundColor: 'rgba(168, 85, 247, 0.3)', color: '#e879f9' }}>
                    おすすめ
                  </span>
                )}
                <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
                <div className="text-3xl font-black text-white mb-1"
                     style={{ background: 'linear-gradient(135deg, #7c3aed, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {plan.price}
                </div>
                <p className="text-gray-400 text-sm mb-6">{plan.sub}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-gray-300">
                      <svg className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#a855f7' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#contact"
                   className="block text-center py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90"
                   style={plan.highlight
                     ? { background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }
                     : { border: '1px solid rgba(168, 85, 247, 0.5)', backgroundColor: 'transparent' }
                   }>
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4" style={{ backgroundColor: 'rgba(124, 58, 237, 0.05)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-purple-400 text-sm font-medium mb-3 tracking-widest uppercase">FAQ</p>
            <h2 className="text-3xl font-bold text-white">よくある質問</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-xl p-6"
                   style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
                <h3 className="text-white font-semibold mb-3 flex items-start gap-3">
                  <span className="shrink-0 font-black" style={{ color: '#a855f7' }}>Q.</span>
                  {faq.q}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-purple-400 text-sm font-medium mb-3 tracking-widest uppercase">Contact</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">無料採用相談はこちら</h2>
            <p className="text-gray-400">フォームにご入力いただければ、2営業日以内にご連絡いたします。</p>
          </div>
          <div className="rounded-2xl p-8 md:p-12"
               style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(168, 85, 247, 0.25)' }}>
            <CompanyContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4" style={{ borderColor: 'rgba(168, 85, 247, 0.2)', backgroundColor: '#080810' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xl font-bold">
            <span style={{ color: '#a855f7' }}>KEY</span>
            <span className="text-white">PLAYERS</span>
            <span className="text-gray-400 mx-1">|</span>
            <span className="text-white">DIRECT</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-300 transition-colors">求人一覧（候補者向け）</Link>
            <a href="#" className="hover:text-gray-300 transition-colors">プライバシーポリシー</a>
            <a href="#" className="hover:text-gray-300 transition-colors">利用規約</a>
          </div>
          <p className="text-gray-600 text-xs">© 2024 KEYPLAYERS DIRECT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
