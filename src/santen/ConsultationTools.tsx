"use client";

import { useEffect, useState } from "react";
import { useI18n } from "./I18nProvider";
import { simulateConsultation, type SimulationResult } from "./simulators";
import type { ToolKey } from "./i18n";

export default function ConsultationTools() {
  const { language, t } = useI18n();
  const [active, setActive] = useState<ToolKey>("liuyao");
  const [result, setResult] = useState<SimulationResult | null>(null);
  const interactive = t.interactive;

  useEffect(() => {
    setResult(null);
  }, [language]);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries()) as Record<string, string>;
    setResult(simulateConsultation(active, data, interactive));
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
          </form>

          <p className="mt-4 text-sm leading-6 text-mutedTea">{interactive.previewNote}</p>
        </div>

        <div className="card min-h-[420px] p-6 sm:p-8">
          {result ? (
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
