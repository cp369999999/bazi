"use client";

import { useEffect, useState } from "react";
import { useI18n } from "./I18nProvider";
import { simulateConsultation, type SimulationResult } from "./simulators";
import type { InteractiveCopy, ToolKey } from "./i18n";

interface FullReport {
  title: string;
  subtitle: string;
  sections: { title: string; body: string; tags: string[]; details?: string[] }[];
  cta: string;
}

export default function ConsultationTools() {
  const { language, t } = useI18n();
  const [active, setActive] = useState<ToolKey>("liuyao");
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [fullReport, setFullReport] = useState<FullReport | null>(null);
  const [isFullReportOpen, setIsFullReportOpen] = useState(false);
  const interactive = t.interactive;

  useEffect(() => {
    setResult(null);
    setFullReport(null);
    setIsFullReportOpen(false);
  }, [language]);

  useEffect(() => {
    if (!isFullReportOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isFullReportOpen]);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries()) as Record<string, string>;
    setResult(simulateConsultation(active, data, interactive));
    setFullReport(null);
  };

  const showFullReport = (event: React.MouseEvent<HTMLButtonElement>) => {
    const form = event.currentTarget.form;
    const data = form ? (Object.fromEntries(new FormData(form).entries()) as Record<string, string>) : {};
    setFullReport(generateFullReport(data, interactive.fullReport));
    setIsFullReportOpen(true);
    setResult(null);
  };

  return (
    <section className="section" id="interactive">
      <div className="section-title">
        <span>{interactive.eyebrow}</span>
        <h2>{interactive.title}</h2>
        <p>{interactive.body}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="card p-5 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            {interactive.tools.map((tool) => (
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
            {interactive.placeholders[active].map((field, index) =>
              index === 0 && active === "liuyao" ? (
                <textarea className="input min-h-28" key={field.name} name={field.name} placeholder={field.placeholder} />
              ) : (
                <input className="input" key={field.name} name={field.name} placeholder={field.placeholder} />
              )
            )}

            <button className="btn-primary justify-center" type="submit">
              {interactive.submit}
            </button>
            <button
              className="btn-outline justify-center border-tea bg-paper text-tea"
              type="button"
              onClick={showFullReport}
            >
              {interactive.fullReport.button}
            </button>
          </form>

          <p className="mt-4 text-sm leading-6 text-mutedTea">
            {interactive.fullReport.note}
          </p>
        </div>

        <div className="card min-h-[420px] p-6 sm:p-8">
          {fullReport ? (
            <div>
              <span className="eyebrow">{interactive.fullReport.eyebrow}</span>
              <h3 className="mt-3 font-serifcn text-3xl text-ink">{fullReport.title}</h3>
              <p className="mt-4 text-lg leading-8 text-mutedTea">{fullReport.subtitle}</p>
              <div className="mt-6 grid gap-4">
                {fullReport.sections.map((section) => (
                  <article className="rounded-[24px] border border-line bg-paper p-5" key={section.title}>
                    <h4 className="font-serifcn text-2xl text-tea">{section.title}</h4>
                    <p className="mt-3 leading-8 text-mutedTea">{section.body}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {section.tags.map((tag) => (
                        <span className="rounded-full border border-line bg-rice px-3 py-1 text-xs text-tea" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
              <a className="btn-primary mt-7 inline-flex" href="#booking">
                {fullReport.cta}
              </a>
              <button className="btn-outline mt-3 inline-flex" type="button" onClick={() => setIsFullReportOpen(true)}>
                打开完整报告弹窗
              </button>
            </div>
          ) : result ? (
            <div>
              <span className="eyebrow">{interactive.resultEyebrow}</span>
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
              <span className="eyebrow">{interactive.emptyEyebrow}</span>
              <h3 className="mt-3 font-serifcn text-4xl text-ink">{interactive.emptyTitle}</h3>
              <p className="mt-4 leading-8 text-mutedTea">{interactive.emptyBody}</p>
            </div>
          )}
        </div>
      </div>

      {fullReport && isFullReportOpen ? (
        <FullReportModal report={fullReport} onClose={() => setIsFullReportOpen(false)} />
      ) : null}
    </section>
  );
}

function generateFullReport(payload: Record<string, string>, copy: InteractiveCopy["fullReport"]): FullReport {
  const birth = payload.birth || payload.personA || copy.defaultBirth;
  const focus = payload.focus || payload.relationship || payload.question || copy.defaultFocus;
  const seed = hash(`${birth}|${focus}|${payload.gender ?? ""}|${payload.personB ?? ""}`);
  const pastLife = pastLifeProfiles[seed % pastLifeProfiles.length];
  const lifeStrategy = lifeStrategies[seed % lifeStrategies.length];
  const relationshipPattern = relationshipPatterns[seed % relationshipPatterns.length];
  const yearly = yearlyTimelines[seed % yearlyTimelines.length];

  return {
    title: copy.title,
    subtitle: copy.subtitleTemplate.replace("{birth}", birth).replace("{focus}", focus),
    cta: copy.cta,
    sections: copy.sections.map((section) => enrichFullReportSection(section, pastLife, lifeStrategy, relationshipPattern, yearly))
  };
}

function FullReportModal({ report, onClose }: { report: FullReport; onClose: () => void }) {
  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-[100] overflow-y-auto bg-[#2b170d]/55 px-4 py-5 backdrop-blur-sm sm:px-6"
      role="dialog"
    >
      <div className="mx-auto max-w-5xl rounded-[34px] border border-line bg-rice shadow-soft">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 rounded-t-[34px] border-b border-line bg-rice/95 px-5 py-5 backdrop-blur sm:px-8">
          <div>
            <span className="eyebrow">完整报告详情</span>
            <h3 className="mt-2 font-serifcn text-3xl text-ink sm:text-5xl">{report.title}</h3>
            <p className="mt-3 max-w-3xl leading-8 text-mutedTea">{report.subtitle}</p>
          </div>
          <button
            aria-label="关闭完整报告"
            className="shrink-0 rounded-full border border-line bg-paper px-4 py-2 text-xl text-tea transition hover:-translate-y-0.5 hover:border-tea"
            type="button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="grid gap-5 p-5 sm:p-8">
          <article className="rounded-[28px] border border-line bg-paper p-5 sm:p-7">
            <span className="eyebrow">Report Preface</span>
            <p className="mt-3 text-xl leading-10 text-ink">
              这是一个完整 AI 命盘报告样例。它会把命盘摘要、前世今生、事业财富、感情婚姻、流年运势与大运节点单独排开，让用户看到正式交付的深度，而不是只看到三条简短预览。
            </p>
          </article>

          {report.sections.map((section) => (
            <article className="rounded-[30px] border border-line bg-paper p-5 sm:p-7" key={section.title}>
              <h4 className="font-serifcn text-3xl text-tea sm:text-4xl">{section.title}</h4>
              <p className="mt-4 whitespace-pre-line text-lg leading-9 text-mutedTea">{section.body}</p>
              {section.details ? (
                <div className="mt-5 grid gap-3">
                  {section.details.map((detail) => (
                    <div className="rounded-[22px] border border-line bg-rice px-4 py-3 text-base leading-8 text-ink" key={detail}>
                      {detail}
                    </div>
                  ))}
                </div>
              ) : null}
              <div className="mt-5 flex flex-wrap gap-2">
                {section.tags.map((tag) => (
                  <span className="rounded-full border border-line bg-rice px-3 py-1 text-xs text-tea" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}

          <div className="flex flex-col gap-3 rounded-[30px] border border-line bg-paper p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div>
              <h4 className="font-serifcn text-3xl text-ink">想看正式详批</h4>
              <p className="mt-2 text-mutedTea">正式报告会按真实资料重新生成，不使用固定样例。</p>
            </div>
            <a className="btn-primary justify-center" href="#booking" onClick={onClose}>
              {report.cta}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function enrichFullReportSection(
  section: FullReport["sections"][number],
  pastLife: (typeof pastLifeProfiles)[number],
  lifeStrategy: (typeof lifeStrategies)[number],
  relationshipPattern: (typeof relationshipPatterns)[number],
  yearly: (typeof yearlyTimelines)[number]
) {
  if (section.title.includes("命盘摘要")) {
    return {
      ...section,
      body: `${section.body}\n\n这类命盘的核心不是短期爆发，而是把稳定性、判断力和资源整合成长期优势。越是在关键选择前，越需要先看结构，再谈行动。`,
      details: [
        "性格底层：重视确定性，不喜欢被情绪推着走，但容易因为想太多而延迟行动。",
        `核心优势：${lifeStrategy.strength}`,
        `长期卡点：${lifeStrategy.block}`,
        "适合路径：把经验、专业、资源和信用做成长期复利，而不是只追逐短期机会。"
      ]
    };
  }

  if (section.title.includes("前世今生")) {
    return {
      ...section,
      body: `前世身份：${pastLife.identity}\n\n${pastLife.story}\n\n这一段不是绝对断言，而是用命盘叙事帮助你理解反复出现的性格惯性、关系吸引和人生课题。`,
      details: [
        pastLife.gift,
        pastLife.lesson,
        pastLife.currentLife,
        pastLife.relationship
      ]
    };
  }

  if (section.title.includes("事业财富")) {
    return {
      ...section,
      body: `${section.body}\n\n事业上不适合只靠一时热情，适合做有标准、有流程、有复盘的长期项目。财运更偏“慢慢变厚”，不是今天下注明天翻倍。`,
      details: [
        `适合战场：${lifeStrategy.career}`,
        `赚钱方式：${lifeStrategy.money}`,
        `贵人类型：${lifeStrategy.supporter}`,
        `风险提醒：${lifeStrategy.risk}`
      ]
    };
  }

  if (section.title.includes("感情婚姻")) {
    return {
      ...section,
      body: `${section.body}\n\n感情里真正要看的不是有没有人喜欢你，而是对方能不能承接你的节奏、边界和长期生活结构。`,
      details: [
        `爱情模式：${relationshipPattern.love}`,
        `适合对象：${relationshipPattern.partner}`,
        `婚姻关键：${relationshipPattern.marriage}`,
        `感情暗礁：${relationshipPattern.warning}`
      ]
    };
  }

  if (section.title.includes("流年运势")) {
    return {
      ...section,
      body: `${section.body}\n\n流年不是为了制造焦虑，而是帮你知道每一年更适合做什么，把力气用在顺势的位置。`,
      details: yearly.years
    };
  }

  if (section.title.includes("大运节点")) {
    return {
      ...section,
      body: `${section.body}\n\n大运看的是十年尺度。它提醒你：有些年不是失败，而是在换轨；有些机会不是突然降临，而是长期积累终于开门。`,
      details: [
        "上升期：适合主动争取资源、扩大项目、建立更高层级的人脉。",
        "调整期：适合减少消耗型关系，重新整理事业方向和现金流结构。",
        "转折期：常见于工作身份、居住城市、关系状态和合作模式的变化。",
        "财富窗口：重在长期信用、专业定价和资源组合，而不是孤注一掷。"
      ]
    };
  }

  if (section.title.includes("行动建议")) {
    return {
      ...section,
      body: `${section.body}\n\n这份报告最后要落回现实：你不需要和命运对抗，你需要把自己放到更适合的位置。`,
      details: [
        "事业：先选可持续的战场，再谈爆发。",
        "关系：少猜对方，多看行动和长期稳定性。",
        "财务：不要为了证明自己而冒过高风险。",
        "人生：越迷茫时，越要回到结构、节奏和真实需求。"
      ]
    };
  }

  return section;
}

function hash(value: string) {
  let result = 0;
  for (let index = 0; index < value.length; index += 1) {
    result = (result * 31 + value.charCodeAt(index)) >>> 0;
  }
  return result;
}

const pastLifeProfiles = [
  {
    identity: "边城守粮官，负责军中粮草、账册与后方调度",
    story: "那一世你不在最前线，却长期背负一群人的生计与安全。你习惯把责任放在自己身上，宁愿自己辛苦，也不愿局面失控。",
    gift: "你带来了强烈的责任感、资源管理能力和临危不乱的判断。",
    lesson: "你欠下的是表达需求的能力，不要总把自己放到最后。",
    currentLife: "今生要学会把责任分出去，把价值说清楚，把回报拿回来。",
    relationship: "你容易被需要你的人吸引，也容易在关系里扮演照顾者。"
  },
  {
    identity: "江南医馆女东家，懂药理，也懂人情冷暖",
    story: "那一世你见过太多人的病痛与隐忍，所以很早就学会观察细节。你对人的情绪非常敏感，也容易把别人的痛当成自己的责任。",
    gift: "你带来了洞察人心、照顾他人和把混乱整理成秩序的能力。",
    lesson: "你欠下的是边界感，不能因为心软就替所有人承担后果。",
    currentLife: "今生要学会温柔但有边界，善良但不透支。",
    relationship: "你常吸引受伤型、依赖型或需要被拯救的人。"
  },
  {
    identity: "宫廷乐师，擅长以声音安抚人心，却很少表达自己",
    story: "那一世你把才华献给秩序与规则，懂得在复杂环境里自保。你习惯观察气氛、隐藏锋芒，也习惯把真实情绪放在心里。",
    gift: "你带来了审美、表达、共情和在压力中保持体面的能力。",
    lesson: "你欠下的是主动选择，不要总等别人给你位置。",
    currentLife: "今生要把才华变成自己的品牌，而不是只做别人的配角。",
    relationship: "你容易被有地位、有能力、但情绪距离较远的人吸引。"
  },
  {
    identity: "山中修书人，长期整理古籍、命理与家族谱牒",
    story: "那一世你远离喧闹，靠知识、推演和文字理解世界。你相信规律，也害怕失控，所以今生遇到大事时总想先找到答案。",
    gift: "你带来了学习力、结构感、复盘能力和对长期趋势的敏感。",
    lesson: "你欠下的是行动力，不能把所有人生都停在分析阶段。",
    currentLife: "今生要把理解变成行动，把知识变成现实结果。",
    relationship: "你会反复遇到促使你走出舒适区的人。"
  }
];

const lifeStrategies = [
  {
    strength: "能把复杂局面拆成步骤，适合做长期规划、管理、咨询、产品化服务。",
    block: "怕一步走错，所以容易错过最佳窗口。",
    career: "专业服务、管理岗位、咨询策划、内容产品、资源整合型事业。",
    money: "靠专业定价、长期客户、复购信任和稳定现金流赚钱。",
    supporter: "年长、稳重、讲规则、有资源但不爱画饼的人。",
    risk: "不要被短期高回报诱惑，也不要和边界不清的人深度合伙。"
  },
  {
    strength: "有感知人心与抓重点的能力，适合从关系、服务、审美、沟通中创造价值。",
    block: "容易照顾别人太多，最后忘了自己的目标。",
    career: "情感咨询、女性服务、品牌运营、教育培训、疗愈陪伴、私域服务。",
    money: "靠口碑、信任、细致交付和高质量客户获得回报。",
    supporter: "愿意长期合作、尊重专业、重视细节的女性贵人或稳定客户。",
    risk: "不要低价消耗自己，也不要为了维持关系牺牲定价。"
  },
  {
    strength: "有表达、包装和影响他人的能力，适合把个人经验变成可传播的内容。",
    block: "太在意外界评价，导致真正想做的事拖延。",
    career: "内容创作、品牌顾问、商务谈判、设计审美、知识付费、社群运营。",
    money: "靠表达力、品牌感、资源链接和信息差赚钱。",
    supporter: "欣赏你才华、能给舞台、但同时要求结果的人。",
    risk: "不要只追求被看见，要把流量变成交付和收入。"
  }
];

const relationshipPatterns = [
  {
    love: "慢热、谨慎，真正动心后会很负责，但不喜欢被逼着表态。",
    partner: "成熟稳定、讲信用、有事业心，同时愿意沟通现实问题的人。",
    marriage: "安全感来自可执行的生活安排，而不是甜言蜜语。",
    warning: "别把沉默当成熟，也别把忍耐当稳定。关系需要被说清楚。"
  },
  {
    love: "容易被强烈情绪牵引，也容易在关系里先付出、后委屈。",
    partner: "情绪稳定、有边界、能回应你需求的人，比浪漫但不落地的人更适合。",
    marriage: "关键在于双方能否共同处理钱、家庭边界和未来规划。",
    warning: "不要反复回到让你自我怀疑的关系里。"
  },
  {
    love: "理性里带着敏感，看似冷静，其实很在意对方是否真正理解你。",
    partner: "懂尊重、懂空间、有审美或专业能力的人更容易进入你的心。",
    marriage: "长期稳定来自精神交流和现实协作同时成立。",
    warning: "不要只被才华或条件吸引，要看对方处理矛盾的方式。"
  }
];

const yearlyTimelines = [
  {
    years: [
      "2026：适合整理方向，减少无效合作，先把核心能力重新定价。",
      "2027：事业上会出现新入口，但要先验证模式，不宜仓促扩张。",
      "2028：关系与合作进入筛选期，留下真正稳定的人，放下消耗型牵扯。",
      "2029：财务结构有变厚机会，适合做长期项目、资产规划和客户沉淀。",
      "2030：适合站到更高位置，承担更大责任，也要注意休息与边界。"
    ]
  },
  {
    years: [
      "2026：感情和事业都要先看清真实需求，不要为了安全感做错误承诺。",
      "2027：贵人资源增强，适合学习、换赛道、建立新的合作结构。",
      "2028：容易有情感转折或重要关系重组，沟通方式决定结果。",
      "2029：财运更适合稳步积累，不宜过度投机。",
      "2030：个人影响力上升，适合做品牌、作品、团队和长期规划。"
    ]
  },
  {
    years: [
      "2026：先守住节奏，把过去没完成的事收尾。",
      "2027：适合主动争取机会，尤其是事业身份和收入结构的升级。",
      "2028：家庭、关系和居住状态可能出现调整，需要提前规划。",
      "2029：事业进入承压上升期，压力越大，越要用规则和流程解决问题。",
      "2030：适合做长期布局，减少短线选择，建立自己的稳定系统。"
    ]
  }
];
