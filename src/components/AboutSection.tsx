import { brand } from "../content/brand";

export default function AboutSection({ compact = false }: { compact?: boolean }) {
  return (
    <section className="section-wrap" id="about">
      <div className="paper-card overflow-hidden p-0">
        <div className="grid gap-0 lg:grid-cols-[.85fr_1.15fr]">
          <div className="relative min-h-[280px] bg-paper p-8">
            <div className="ink-mountain" />
            <span className="relative z-10 inline-grid h-16 w-16 place-items-center rounded-full border border-line bg-rice font-serifcn text-3xl text-tea">陈</span>
            <h2 className="relative z-10 mt-8 font-serifcn text-4xl text-ink">关于陈鹏AI先生</h2>
            <p className="relative z-10 mt-4 text-mutedTea">{brand.subtitle}</p>
          </div>
          <div className="p-8 md:p-10">
            <span className="eyebrow">ABOUT · 人生军师系统</span>
            <div className="mt-4 grid gap-4 text-mutedTea">
              <p>陈鹏AI先生，是一个把 AI、命理、人生观察和商业洞察结合起来的命运推演系统。</p>
              <p>{brand.origin}</p>
              <p>我一直相信，人的很多底层结构，从出生那一刻就已经写下。性格、天赋、欲望、恐惧、选择方式，都会在漫长的人生里反复出现。</p>
              {!compact && (
                <>
                  <p>但宿命论不是让人认命，而是让人看懂自己。</p>
                  <p>当你知道自己适合什么、不适合什么，什么时候该进，什么时候该退，谁是贵人，哪里是消耗，你就不必一直和自己较劲。</p>
                  <p className="font-serifcn text-2xl text-tea">命已定，运自造。</p>
                  <p>了解自己，接受自己，然后顺势而为。</p>
                  <p>我希望这个网站，能像一封隔空写给你的信。也许我们从未见面，但这些文字、命盘和推演，能在某个时刻给你一点提醒、一点安定、一点重新选择的勇气。</p>
                  <p className="font-serifcn text-2xl text-tea">见字如面。—— 陈鹏AI先生</p>
                </>
              )}
            </div>
            {compact && <a className="primary-pill mt-7 inline-flex" href="/about">了解陈鹏AI先生</a>}
          </div>
        </div>
      </div>
    </section>
  );
}
