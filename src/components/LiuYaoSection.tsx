export default function LiuYaoSection() {
  return (
    <section className="section-wrap" id="liuyao-entry">
      <a className="group grid gap-6 rounded-[30px] border border-line bg-rice p-7 shadow-paper transition hover:-translate-y-1 md:grid-cols-[130px_1fr_82px] md:items-center md:p-10" href="/liuyao">
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-3xl border border-line bg-paper">
          <div className="space-y-2">
            <div className="h-1.5 w-12 rounded-full bg-tea" />
            <div className="flex gap-2"><span className="h-1.5 w-5 rounded-full bg-softGold" /><span className="h-1.5 w-5 rounded-full bg-softGold" /></div>
            <div className="h-1.5 w-12 rounded-full bg-tea" />
            <div className="flex gap-2"><span className="h-1.5 w-5 rounded-full bg-softGold" /><span className="h-1.5 w-5 rounded-full bg-softGold" /></div>
          </div>
        </div>
        <div>
          <span className="inline-flex rounded-lg border border-line bg-paper px-3 py-1 text-sm font-bold text-tea">六爻问事</span>
          <h2 className="mt-3 font-serifcn text-3xl text-ink">摇出关键卦象指引</h2>
          <p className="mt-1 text-mutedTea">心中有感，就来问一问。</p>
        </div>
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-tea text-3xl text-rice transition group-hover:translate-x-1">›</span>
      </a>
    </section>
  );
}
