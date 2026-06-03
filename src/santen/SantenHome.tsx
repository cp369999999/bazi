"use client";

import ConsultationTools from "./ConsultationTools";
import { useI18n } from "./I18nProvider";
import LanguageSelector from "./LanguageSelector";

export default function SantenHome() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BrandAttitude />
        <PastLifeSection />
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
  const { t } = useI18n();
  const navItems = t.brand.nav.some((item) => item.href === "#past-life")
    ? t.brand.nav
    : [t.brand.nav[0], { label: t.pastLife.navLabel, href: "#past-life" }, ...t.brand.nav.slice(1)];

  return (
    <header className="sticky top-0 z-30 border-b border-line/50 bg-rice/80 backdrop-blur-xl">
      <div className="page-shell flex min-h-20 items-center justify-between gap-5">
        <a className="flex items-center gap-3" href="#">
          <span className="seal">参</span>
          <span>
            <strong className="block font-serifcn text-xl text-ink">{t.brand.name}</strong>
            <small className="text-mutedTea">{t.brand.positioning}</small>
          </span>
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium text-mutedTea lg:flex">
          {navItems.map((item) => (
            <a className="transition hover:text-tea" href={item.href} key={item.label}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSelector />
          <a className="btn-primary hidden sm:inline-flex" href="#booking">
            {t.common.book}
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const { t } = useI18n();
  return (
    <section className="page-shell grid min-h-[calc(100vh-80px)] items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
      <div>
        <span className="eyebrow">{t.hero.eyebrow}</span>
        <h1 className="mt-5 font-serifcn text-5xl leading-tight text-ink sm:text-6xl lg:text-7xl">
          {t.brand.name}
          <span className="mt-4 block text-3xl text-tea sm:text-4xl">{t.brand.slogan}</span>
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-9 text-mutedTea sm:text-xl">{t.brand.subtitle}</p>
        <p className="mt-5 max-w-2xl text-base leading-8 text-tea">
          {t.brand.founderLine} {t.brand.promise}
        </p>

        <div className="mt-9 flex flex-col gap-4 sm:flex-row">
          <a className="btn-primary justify-center" href="#booking">
            {t.hero.primaryCta}
          </a>
          <a className="btn-outline justify-center" href="#services">
            {t.hero.servicesCta}
          </a>
          <a className="btn-outline justify-center" href="#interactive">
            {t.hero.previewCta}
          </a>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {t.hero.highlights.map((item) => (
            <span className="rounded-full border border-line bg-rice px-4 py-2 text-sm text-tea" key={item}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="card mountain-bg relative overflow-hidden p-6 sm:p-8">
        <div className="absolute right-8 top-6 font-serifcn text-[180px] leading-none text-tea/5">命</div>
        <div className="relative">
          <span className="eyebrow">{t.compass.eyebrow}</span>
          <h2 className="mt-4 font-serifcn text-4xl leading-tight text-ink">{t.compass.title}</h2>
          <p className="mt-5 leading-8 text-mutedTea">{t.compass.body}</p>
          <div className="mt-8 grid gap-4">
            {t.compass.items.map((item, index) => (
              <div className="flex items-center gap-4 rounded-[24px] border border-line bg-rice/75 p-5" key={item}>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-tea text-rice">{index + 1}</span>
                <strong className="text-ink">{item}</strong>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-[28px] border border-line bg-paper/70 p-6">
            <p className="font-serifcn text-2xl leading-10 text-tea">{t.compass.quote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandAttitude() {
  const { t } = useI18n();
  return (
    <section className="section">
      <div className="grid gap-5 md:grid-cols-3">
        {t.attitude.items.map((item) => (
          <article className="card p-7" key={item.title}>
            <span className="eyebrow">{t.attitude.eyebrow}</span>
            <h2 className="mt-4 font-serifcn text-3xl text-ink">{item.title}</h2>
            <p className="mt-4 leading-8 text-mutedTea">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PastLifeSection() {
  const { t } = useI18n();
  return (
    <section className="section" id="past-life">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="card mountain-bg p-8 sm:p-10">
          <span className="eyebrow">{t.pastLife.eyebrow}</span>
          <h2 className="mt-4 font-serifcn text-4xl leading-tight text-ink sm:text-5xl">{t.pastLife.title}</h2>
          <p className="mt-5 text-xl leading-9 text-tea">{t.pastLife.subtitle}</p>
          <p className="mt-5 leading-8 text-mutedTea">{t.pastLife.body}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a className="btn-primary justify-center" href="#interactive">
              {t.pastLife.primaryCta}
            </a>
            <a className="btn-outline justify-center" href="#booking">
              {t.pastLife.secondaryCta}
            </a>
          </div>
          <p className="mt-6 text-sm leading-7 text-mutedTea">{t.pastLife.note}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {t.pastLife.cards.map((card, index) => (
            <article className="ink-card p-6" key={card.title}>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-tea text-rice">
                {index + 1}
              </span>
              <h3 className="mt-5 font-serifcn text-2xl text-ink">{card.title}</h3>
              <p className="mt-3 leading-8 text-mutedTea">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const { t } = useI18n();
  const serviceItems = [...t.services.items, t.pastLife.service];

  return (
    <section className="section" id="services">
      <div className="section-title">
        <span>{t.services.eyebrow}</span>
        <h2>{t.services.title}</h2>
        <p>{t.services.body}</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {serviceItems.map((service) => (
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
              {t.common.delivery}: {service.delivery}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Booking() {
  const { t } = useI18n();
  return (
    <section className="section" id="booking">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="card p-8 sm:p-10">
          <span className="eyebrow">{t.booking.eyebrow}</span>
          <h2 className="mt-4 font-serifcn text-4xl text-ink">{t.booking.title}</h2>
          <p className="mt-5 text-lg leading-9 text-mutedTea">{t.booking.body}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a className="btn-primary justify-center" href="#contact">
              {t.booking.primaryCta}
            </a>
            <a className="btn-outline justify-center" href="#interactive">
              {t.booking.secondaryCta}
            </a>
          </div>
        </div>
        <div className="grid gap-4">
          {t.booking.steps.map((step, index) => (
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
  const { t } = useI18n();
  return (
    <section className="section" id="client-center">
      <div className="section-title">
        <span>{t.clientCenter.eyebrow}</span>
        <h2>{t.clientCenter.title}</h2>
        <p>{t.clientCenter.body}</p>
      </div>
      <div className="card p-6 sm:p-8">
        <div className="grid gap-4 md:grid-cols-5">
          {t.clientCenter.items.map((item) => (
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
  const { t } = useI18n();
  return (
    <section className="section" id="story">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="card mountain-bg p-8">
          <span className="eyebrow">{t.story.eyebrow}</span>
          <h2 className="mt-4 font-serifcn text-4xl text-ink">{t.story.title}</h2>
          <p className="mt-5 text-xl leading-9 text-tea">{t.story.founderDesc}</p>
        </div>
        <div className="card p-8 sm:p-10">
          {t.story.paragraphs.map((item) => (
            <p className="mt-5 text-lg leading-10 text-mutedTea first:mt-0" key={item}>
              {item}
            </p>
          ))}
          <p className="mt-5 font-serifcn text-2xl leading-10 text-tea">{t.story.signature}</p>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const { t } = useI18n();
  return (
    <section className="section" id="faq">
      <div className="section-title">
        <span>{t.faq.eyebrow}</span>
        <h2>{t.faq.title}</h2>
        <p>{t.faq.body}</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {t.faq.items.map((item) => (
          <article className="card p-7" key={item.q}>
            <h3 className="font-serifcn text-2xl text-ink">{item.q}</h3>
            <p className="mt-4 leading-8 text-mutedTea">{item.a}</p>
          </article>
        ))}
      </div>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="card p-7">
          <span className="eyebrow">Allowed</span>
          <h3 className="mt-3 font-serifcn text-2xl text-ink">{t.faq.allowedTitle}</h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {t.faq.allowed.map((item) => (
              <span className="rounded-full border border-line bg-paper px-4 py-2 text-sm text-tea" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="card p-7">
          <span className="eyebrow">Boundary</span>
          <h3 className="mt-3 font-serifcn text-2xl text-ink">{t.faq.forbiddenTitle}</h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {t.faq.forbidden.map((item) => (
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
  const { t } = useI18n();
  return (
    <footer className="border-t border-line/70 bg-rice/80" id="contact">
      <div className="page-shell grid gap-8 py-10 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="font-serifcn text-3xl text-ink">{t.brand.name}</h2>
          <p className="mt-4 max-w-2xl leading-8 text-mutedTea">{t.brand.promise}</p>
          <p className="mt-5 text-sm leading-7 text-mutedTea">{t.footer.disclaimer}</p>
        </div>
        <div className="rounded-[28px] border border-line bg-paper p-6">
          <span className="eyebrow">Contact</span>
          <p className="mt-3 text-xl text-ink">{t.common.contactMethods}</p>
          <p className="mt-2 text-mutedTea">
            {t.footer.contactTitle}. {t.footer.contactBody}
          </p>
        </div>
      </div>
    </footer>
  );
}
