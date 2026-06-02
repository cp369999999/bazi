import { liuyaoCopy } from "../content/liuyao";
import type { LiuYaoResult as LiuYaoResultType } from "../types/liuyao";
import HexagramDisplay from "./HexagramDisplay";

export default function LiuYaoResult({ result }: { result: LiuYaoResultType }) {
  const cards = [
    ["卦象总览", result.analysis.summary],
    ["当前局势", result.analysis.situation],
    ["动爻提示", result.analysis.movingLineHint],
    ["决策建议", result.analysis.decisionAdvice],
    ["近期行动", result.analysis.actionAdvice],
    ["风险提醒", result.analysis.riskReminder]
  ];

  return (
    <section id="liuyao-result" className="mt-10 grid gap-6">
      <div className="paper-card p-7 md:p-9">
        <span className="eyebrow">RESULT · 六爻结果</span>
        <h2 className="mt-2">你的六爻卦象已生成</h2>
        <p className="mt-4 text-mutedTea">这是陈鹏AI先生为你生成的本次六爻推演。它不是替你决定人生，而是帮你看清当下局势、阻力和可行动作。</p>
        <div className="mt-6 grid gap-3 text-sm text-mutedTea md:grid-cols-2">
          <Info label="提问事项" value={result.question} />
          <Info label="起卦时间" value={result.generatedAt} />
          <Info label="当前城市" value={result.currentCity} />
          <Info label="关注方向" value={result.category} />
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <HexagramDisplay title="本卦" hexagram={result.originalHexagram} />
        <HexagramDisplay title="变卦" hexagram={result.changedHexagram} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {cards.map(([title, text]) => (
          <article className="paper-card p-6" key={title}>
            <h3 className="font-serifcn text-2xl text-ink">{title}</h3>
            <p className="mt-3 text-mutedTea">{text}</p>
          </article>
        ))}
      </div>
      <div className="rounded-[30px] border border-line bg-tea p-7 text-rice shadow-paper">
        <h3 className="font-serifcn text-3xl">想看完整六爻详解？</h3>
        <p className="mt-3 text-rice/80">
          完整报告将结合你的出生信息、当前所在地、提问时间、心念数字与卦象变化，进一步分析事情的发展趋势、关键阻力、可行动作和未来节点。
        </p>
        <a className="mt-6 inline-flex rounded-full bg-rice px-6 py-3 font-bold text-tea transition hover:-translate-y-0.5" href={liuyaoCopy.reportUrl}>
          生成完整六爻报告
        </a>
      </div>
      <p className="text-sm text-mutedTea">{liuyaoCopy.disclaimer}</p>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line/70 bg-rice px-4 py-3">
      <strong className="mr-2 text-tea">{label}：</strong>
      <span>{value || "未填写"}</span>
    </div>
  );
}
