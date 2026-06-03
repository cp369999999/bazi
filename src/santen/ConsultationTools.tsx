"use client";

import { useState } from "react";
import { simulateConsultation, type SimulationResult, type ToolKey } from "./simulators";

const tools: { key: ToolKey; label: string; desc: string }[] = [
  { key: "liuyao", label: "六爻测事", desc: "一事一卦，适合短周期决策。" },
  { key: "bazi", label: "命盘详批", desc: "看原局结构、喜忌与大运走势。" },
  { key: "match", label: "情感合盘", desc: "看双方匹配、矛盾与长期稳定性。" },
  { key: "naming", label: "取名 / 择吉", desc: "按命盘结构与场景生成方案方向。" }
];

export default function ConsultationTools() {
  const [active, setActive] = useState<ToolKey>("liuyao");
  const [result, setResult] = useState<SimulationResult | null>(null);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries()) as Record<string, string>;
    setResult(simulateConsultation(active, data));
  };

  return (
    <section className="section" id="interactive">
      <div className="section-title">
        <span>Consultation Preview</span>
        <h2>预约前，先看交付结构</h2>
        <p>
          以下为前端模拟预览，用于展示参命 Santen 的咨询语言与文稿结构。正式服务均为付费排期，不提供免费详批。
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="card p-5 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            {tools.map((tool) => (
              <button
                className={`rounded-[28px] border px-5 py-4 text-left transition ${
                  active === tool.key
                    ? "border-tea bg-tea text-rice shadow-soft"
                    : "border-line bg-rice text-ink hover:-translate-y-0.5 hover:border-tea"
                }`}
                key={tool.key}
                type="button"
                onClick={() => {
                  setActive(tool.key);
                  setResult(null);
                }}
              >
                <strong>{tool.label}</strong>
                <span className="mt-1 block text-sm opacity-75">{tool.desc}</span>
              </button>
            ))}
          </div>

          <form className="mt-6 grid gap-4" onSubmit={submit}>
            {active === "liuyao" && (
              <>
                <textarea
                  className="input min-h-28"
                  name="question"
                  placeholder="请输入你此刻最想问的一件事，例如：这段关系还有结果吗？这个项目能不能做？"
                />
                <input className="input" name="number" placeholder="心中自然浮现的数字，例如 18、369" />
                <input className="input" name="city" placeholder="当前所在城市，例如 深圳 / London" />
              </>
            )}

            {active === "bazi" && (
              <>
                <input className="input" name="birth" placeholder="出生日期与时间，例如 1996-12-09 13:30" />
                <input className="input" name="gender" placeholder="性别" />
                <input className="input" name="focus" placeholder="当前最想看的方向：事业 / 财运 / 婚恋" />
              </>
            )}

            {active === "match" && (
              <>
                <input className="input" name="personA" placeholder="你的出生信息" />
                <input className="input" name="personB" placeholder="对方出生信息" />
                <input className="input" name="relationship" placeholder="关系状态：恋爱 / 复合 / 订婚 / 已婚" />
              </>
            )}

            {active === "naming" && (
              <>
                <input className="input" name="scene" placeholder="取名 / 婚礼择吉 / 乔迁 / 开业" />
                <input className="input" name="birth" placeholder="出生信息或目标日期范围" />
                <input className="input" name="preference" placeholder="偏好、避讳、姓氏或地区习俗" />
              </>
            )}

            <button className="btn-primary justify-center" type="submit">
              生成预约前预览
            </button>
          </form>

          <p className="mt-4 text-sm leading-6 text-mutedTea">
            预览不构成正式咨询结论。正式文稿长度按项目约 2000–4000 字，交付后 3 天内可追问一次。
          </p>
        </div>

        <div className="card min-h-[420px] p-6 sm:p-8">
          {result ? (
            <div>
              <span className="eyebrow">AI Draft</span>
              <h3 className="mt-3 font-serifcn text-3xl text-ink">{result.title}</h3>
              <p className="mt-4 text-lg leading-8 text-mutedTea">{result.summary}</p>
              <div className="mt-6 grid gap-4">
                {result.sections.map((section) => (
                  <div className="rounded-[24px] border border-line bg-paper p-5" key={section.title}>
                    <strong className="text-tea">{section.title}</strong>
                    <p className="mt-2 leading-7 text-mutedTea">{section.body}</p>
                  </div>
                ))}
              </div>
              <a className="btn-primary mt-7 inline-flex" href="#booking">
                {result.cta}
              </a>
            </div>
          ) : (
            <div className="flex h-full min-h-[360px] flex-col justify-center">
              <span className="eyebrow">Private Preview</span>
              <h3 className="mt-3 font-serifcn text-4xl text-ink">选择一个项目，生成预约前预览</h3>
              <p className="mt-4 leading-8 text-mutedTea">
                这里展示的是文稿结构和咨询风格。真正的高客单服务，会根据完整资料与排期交付，不把复杂人生问题做成廉价娱乐。
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
