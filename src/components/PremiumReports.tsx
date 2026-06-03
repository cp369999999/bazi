import { reports } from "../content/brand";
import type { ReportProduct } from "../types/site";

export default function PremiumReports({ products = reports }: { products?: ReportProduct[] }) {
  return (
    <section className="section-wrap" id="reports">
      <div className="section-heading">
        <span className="eyebrow">PREMIUM REPORTS · 高级报告</span>
        <h2>陈鹏AI先生 · 高级命运报告</h2>
        <p>
          如果你想更深入地看懂自己，可以生成完整报告。它会从命盘结构、当下问题、关系模式和未来趋势中，为你整理出一份更清晰的人生说明书。
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {products.map((report) => (
          <article className="paper-card flex flex-col p-6" key={report.title}>
            <span className="mb-3 inline-flex w-fit rounded-full bg-paper px-3 py-1 text-sm font-bold text-tea">{report.fit}</span>
            <h3 className="font-serifcn text-2xl text-ink">{report.title}</h3>
            <p className="mt-3 flex-1 text-mutedTea">{report.desc}</p>
            <a className="secondary-pill mt-6 justify-center" href={report.url || "/#ai-bazi"}>{report.cta}</a>
          </article>
        ))}
      </div>
    </section>
  );
}
