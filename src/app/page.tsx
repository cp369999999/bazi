import ConsultationTools from "@/santen/ConsultationTools";
import {
  allowed,
  bookingSteps,
  brand,
  clientCenterItems,
  faqs,
  forbidden,
  serviceHighlights,
  services
} from "@/santen/content";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a
    }
  }))
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "参命 Santen 高端东方命理预约咨询",
  provider: {
    "@type": "Person",
    name: "陈鹏"
  },
  serviceType: "婚恋合盘、事业财运、六爻测事、命盘详批、取名择吉",
  areaServed: "Worldwide",
  description: brand.description,
  offers: services.map((service) => ({
    "@type": "Offer",
    name: service.title,
    priceCurrency: "CNY",
    price: service.price.replace(/[^\d]/g, "") || undefined,
    description: `${service.scene}。${service.description}`
  }))
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Header />
      <main>
        <Hero />
        <BrandAttitude />
        <Services />
        <Booking />
        <ConsultationTools />
        <ClientCenter />
        <BrandStory />
        <Faq />
      </main>
      <Footer />
    </>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/50 bg-rice/80 backdrop-blur-xl">
      <div className="page-shell flex min-h-20 items-center justify-between gap-5">
        <a className="flex items-center gap-3" href="#">
          <span className="seal">参</span>
          <span>
            <strong className="block font-serifcn text-xl text-ink">{brand.name}</strong>
            <small className="text-mutedTea">{brand.positioning}</small>
          </span>
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium text-mutedTea lg:flex">
          {brand.nav.map((item) => (
            <a className="transition hover:text-tea" href={item.href} key={item.label}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="btn-primary hidden sm:inline-flex" href="#booking">
          预约咨询
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="page-shell grid min-h-[calc(100vh-80px)] items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
      <div>
        <span className="eyebrow">Private Eastern Astrology Consultation</span>
        <h1 className="mt-5 font-serifcn text-5xl leading-tight text-ink sm:text-6xl lg:text-7xl">
          参命 Santen
          <span className="mt-4 block text-3xl text-tea sm:text-4xl">参透关系，参透财运，参透自己</span>
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-9 text-mutedTea sm:text-xl">{brand.subtitle}</p>
        <p className="mt-5 max-w-2xl text-base leading-8 text-tea">{brand.founderLine}。不低价、不免费、不娱乐，只服务高质量预约客户。</p>

        <div className="mt-9 flex flex-col gap-4 sm:flex-row">
          <a className="btn-primary justify-center" href="#booking">
            预约高端咨询
          </a>
          <a className="btn-outline justify-center" href="#services">
            查看服务项目
          </a>
          <a className="btn-outline justify-center" href="#interactive">
            体验交付结构
          </a>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {serviceHighlights.map((item) => (
            <span className="rounded-full border border-line bg-rice px-4 py-2 text-sm text-tea" key={item}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="card mountain-bg relative overflow-hidden p-6 sm:p-8">
        <div className="absolute right-8 top-6 font-serifcn text-[180px] leading-none text-tea/5">命</div>
        <div className="relative">
          <span className="eyebrow">Consulting Compass</span>
          <h2 className="mt-4 font-serifcn text-4xl leading-tight text-ink">不是算热闹，是看结构。</h2>
          <p className="mt-5 leading-8 text-mutedTea">
            关系为什么反复拉扯，财运为什么卡在同一处，事业为什么总在关键节点犹豫。参命做的是结构洞察，不是廉价断语。
          </p>
          <div className="mt-8 grid gap-4">
            {["女性情感与婚恋合盘", "事业财运与关键决策", "命盘详批与长期规划"].map((item, index) => (
              <div className="flex items-center gap-4 rounded-[24px] border border-line bg-rice/75 p-5" key={item}>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-tea text-rice">{index + 1}</span>
                <strong className="text-ink">{item}</strong>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-[28px] border border-line bg-paper/70 p-6">
            <p className="font-serifcn text-2xl leading-10 text-tea">
              命理不是替你做决定，而是让你更清楚：此刻该进，还是该退。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandAttitude() {
  const items = [
    {
      title: "高端预约制",
      body: "取消低端免费入口，把时间留给真正需要深度咨询的人。"
    },
    {
      title: "参考性质",
      body: "不承诺绝对准确，不制造恐惧，所有结论都回到现实选择。"
    },
    {
      title: "命运结构洞察",
      body: "看性格底层、关系模式、财运路径与关键节点。"
    }
  ];

  return (
    <section className="section">
      <div className="grid gap-5 md:grid-cols-3">
        {items.map((item) => (
          <article className="card p-7" key={item.title}>
            <span className="eyebrow">Attitude</span>
            <h2 className="mt-4 font-serifcn text-3xl text-ink">{item.title}</h2>
            <p className="mt-4 leading-8 text-mutedTea">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section" id="services">
      <div className="section-title">
        <span>Service Matrix</span>
        <h2>服务矩阵</h2>
        <p>围绕情感婚恋、合盘、事业财运与关键决策，提供高客单、预约制、可保存的 AI 深度文稿交付。</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <article className="card flex flex-col p-7" key={service.title}>
            <div className="flex items-start justify-between gap-5">
              <div>
                <span className="eyebrow">{service.scene}</span>
                <h3 className="mt-3 font-serifcn text-3xl text-ink">{service.title}</h3>
              </div>
              <strong className="rounded-full bg-tea px-4 py-2 text-sm text-rice">{service.price}</strong>
            </div>
            <p className="mt-5 flex-1 leading-8 text-mutedTea">{service.description}</p>
            <div className="mt-6 rounded-[22px] border border-line bg-paper p-4 text-sm leading-7 text-tea">
              交付：{service.delivery}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Booking() {
  return (
    <section className="section" id="booking">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="card p-8 sm:p-10">
          <span className="eyebrow">Booking</span>
          <h2 className="mt-4 font-serifcn text-4xl text-ink">预约排期</h2>
          <p className="mt-5 text-lg leading-9 text-mutedTea">
            付预约定金 ¥399 后，由助理确认排期。尾款未支付可退定金或取消预约。排期当天交付文稿，3 天内可追问一次。
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a className="btn-primary justify-center" href="#contact">
              付定金预约
            </a>
            <a className="btn-outline justify-center" href="#interactive">
              先看交付结构
            </a>
          </div>
        </div>
        <div className="grid gap-4">
          {bookingSteps.map((step, index) => (
            <div className="ink-card flex gap-5 p-5" key={step}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tea text-rice">{index + 1}</span>
              <p className="pt-1 text-lg leading-8 text-ink">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClientCenter() {
  return (
    <section className="section" id="client-center">
      <div className="section-title">
        <span>Client Center</span>
        <h2>客户中心规划</h2>
        <p>后续客户可在这里查看预约、下载文稿、提交追问与接收尾款提醒。当前版本先展示模块结构，方便后续接入后台。</p>
      </div>
      <div className="card p-6 sm:p-8">
        <div className="grid gap-4 md:grid-cols-5">
          {clientCenterItems.map((item) => (
            <div className="rounded-[24px] border border-line bg-paper p-5 text-center text-tea" key={item}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandStory() {
  return (
    <section className="section" id="story">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="card mountain-bg p-8">
          <span className="eyebrow">Founder</span>
          <h2 className="mt-4 font-serifcn text-4xl text-ink">主理人陈鹏</h2>
          <p className="mt-5 text-xl leading-9 text-tea">10年命理经验，长期观察关系、财富与人生选择的结构。</p>
        </div>
        <div className="card p-8 sm:p-10">
          <p className="text-lg leading-10 text-mutedTea">
            参命 Santen 是一个高端东方命理预约咨询品牌。我们关心的不是把一句话说得多玄，而是把一段关系、一条财运路径、一次关键决策拆解清楚。
          </p>
          <p className="mt-5 text-lg leading-10 text-mutedTea">
            命理可以是一种结构语言。它让人知道自己为什么总被同一种关系牵动，为什么在某类机会前犹豫，为什么越到关键时刻越需要一个稳定的外部视角。
          </p>
          <p className="mt-5 font-serifcn text-2xl leading-10 text-tea">参透关系，参透财运，参透自己。</p>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="section" id="faq">
      <div className="section-title">
        <span>FAQ</span>
        <h2>常见问题</h2>
        <p>专业、克制、私密，是参命 Santen 的基本边界。</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {faqs.map((item) => (
          <article className="card p-7" key={item.q}>
            <h3 className="font-serifcn text-2xl text-ink">{item.q}</h3>
            <p className="mt-4 leading-8 text-mutedTea">{item.a}</p>
          </article>
        ))}
      </div>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="card p-7">
          <span className="eyebrow">Allowed</span>
          <h3 className="mt-3 font-serifcn text-2xl text-ink">内容允许</h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {allowed.map((item) => (
              <span className="rounded-full border border-line bg-paper px-4 py-2 text-sm text-tea" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="card p-7">
          <span className="eyebrow">Boundary</span>
          <h3 className="mt-3 font-serifcn text-2xl text-ink">内容禁止</h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {forbidden.map((item) => (
              <span className="rounded-full border border-seal/30 bg-seal/5 px-4 py-2 text-sm text-seal" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line/70 bg-rice/80" id="contact">
      <div className="page-shell grid gap-8 py-10 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="font-serifcn text-3xl text-ink">{brand.name}</h2>
          <p className="mt-4 max-w-2xl leading-8 text-mutedTea">{brand.promise}</p>
          <p className="mt-5 text-sm leading-7 text-mutedTea">
            免责声明：本网站提供的 AI 命理、六爻测事、合盘、事业财运与命盘分析内容，仅作为自我认知、关系整理与人生规划参考，不构成医疗、法律、投资或重大人生决策建议。
          </p>
        </div>
        <div className="rounded-[28px] border border-line bg-paper p-6">
          <span className="eyebrow">Contact</span>
          <p className="mt-3 text-xl text-ink">微信 / WhatsApp / Telegram</p>
          <p className="mt-2 text-mutedTea">预约制服务，先定金，后排期交付。</p>
        </div>
      </div>
    </footer>
  );
}
