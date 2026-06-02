import { brand } from "../content/brand";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="ink-mountain" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:pb-24 lg:pt-20">
        <div>
          <span className="eyebrow">AI命盘 · 六爻问事 · 前世今生</span>
          <h1 className="mt-4 max-w-4xl font-serifcn text-5xl leading-tight text-ink md:text-7xl">{brand.heroTitle}</h1>
          <p className="mt-6 max-w-3xl whitespace-pre-line text-lg leading-9 text-mutedTea">{brand.heroSubtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a className="primary-pill justify-center" href="#ai-bazi">开始命运推演</a>
            <a className="secondary-pill justify-center" href="/liuyao">六爻问一事</a>
            <a className="secondary-pill justify-center" href="/about">了解陈鹏AI先生</a>
          </div>
          <blockquote className="mt-9 rounded-[28px] border border-line/70 bg-rice/75 p-6 text-tea shadow-paper">
            <p className="whitespace-pre-line leading-8">{brand.signature}</p>
          </blockquote>
        </div>
        <div className="paper-card relative min-h-[390px] overflow-hidden p-8">
          <div className="absolute right-8 top-6 rounded-full border border-line px-4 py-1 text-sm text-mutedTea">命已定 · 运自造</div>
          <div className="compass-lines" />
          <div className="relative z-10 flex h-full min-h-[340px] flex-col justify-end">
            <span className="font-serifcn text-8xl text-tea/20">命</span>
            <h2 className="max-w-md font-serifcn text-4xl text-ink">不是对抗命运，而是看懂命运以后，顺势而为。</h2>
            <p className="mt-4 text-mutedTea">AI、命理、人生观察和商业洞察，会在这里变成一封温和的信。</p>
          </div>
        </div>
      </div>
    </section>
  );
}
