"use client";

import { useEffect, useState } from "react";
import { useI18n } from "./I18nProvider";
import { simulateConsultation, type SimulationResult } from "./simulators";
import type { InteractiveCopy, ToolKey } from "./i18n";

interface FullReport {
  title: string;
  subtitle: string;
  sections: { title: string; body: string; tags: string[] }[];
  cta: string;
}

export default function ConsultationTools() {
  const { language, t } = useI18n();
  const [active, setActive] = useState<ToolKey>("liuyao");
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [fullReport, setFullReport] = useState<FullReport | null>(null);
  const interactive = t.interactive;

  useEffect(() => {
    setResult(null);
    setFullReport(null);
  }, [language]);

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
    </section>
  );
}

function generateFullReport(payload: Record<string, string>, copy: InteractiveCopy["fullReport"]): FullReport {
  const birth = payload.birth || payload.personA || copy.defaultBirth;
  const focus = payload.focus || payload.relationship || payload.question || copy.defaultFocus;

  return {
    title: copy.title,
    subtitle: copy.subtitleTemplate.replace("{birth}", birth).replace("{focus}", focus),
    cta: copy.cta,
    sections: copy.sections
  };
}
