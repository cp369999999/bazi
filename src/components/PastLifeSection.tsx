export default function PastLifeSection() {
  const cards = [
    ["前世能量", "解释你可能携带的性格惯性、执念、天赋来源。"],
    ["今生课题", "分析这一生最重要的成长方向、事业挑战、情感模式。"],
    ["灵魂关系", "理解亲密关系、合作关系、贵人、小人与业力牵引。"],
    ["命运节点", "分析人生关键转折、流年机会、低谷期和上升期。"]
  ];

  return (
    <section className="section-wrap" id="past-life">
      <div className="section-heading">
        <span className="eyebrow">PAST LIFE · 前世今生</span>
        <h2>陈鹏AI先生 · 前世今生</h2>
        <p>
          有些性格，不像是这一生才形成的。有些关系，也不像是偶然才遇见的。
        </p>
        <p>
          前世今生不是为了制造神秘感，而是用一种更深的叙事方式，帮你理解那些反复出现的人生课题、关系模式、执念、天赋和恐惧。
        </p>
        <p>当你看懂这些重复出现的模式，就不会再一味责怪自己。你只是需要更早地理解自己。</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {cards.map(([title, text]) => (
          <article className="paper-card p-6" key={title}>
            <h3 className="font-serifcn text-2xl text-ink">{title}</h3>
            <p className="mt-3 text-mutedTea">{text}</p>
          </article>
        ))}
      </div>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <a className="primary-pill justify-center" href="/#ai-bazi">开始前世今生推演</a>
        <a className="secondary-pill justify-center" href="/#reports">生成完整灵魂报告</a>
      </div>
    </section>
  );
}
