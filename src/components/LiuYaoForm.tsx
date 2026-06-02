import { useState } from "react";
import { liuyaoCopy, liuyaoInitialForm } from "../content/liuyao";
import type { LiuYaoFormData } from "../types/liuyao";

interface Props {
  onSubmit: (formData: LiuYaoFormData) => void;
}

export default function LiuYaoForm({ onSubmit }: Props) {
  const [form, setForm] = useState<LiuYaoFormData>(liuyaoInitialForm);
  const [error, setError] = useState("");

  const update = (field: keyof LiuYaoFormData, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.question.trim()) {
      setError("请先写下当前最想问的一件事。");
      return;
    }
    if (!form.mindNumber.trim() && !form.mindText.trim()) {
      setError("心中数字和文字至少填写一个。第一感觉即可。");
      return;
    }
    onSubmit(form);
  };

  return (
    <form className="paper-card grid gap-5 p-6 md:p-9" onSubmit={submit}>
      <div className="rounded-[24px] bg-paper p-5 text-mutedTea">
        <strong className="text-tea">起卦说明：</strong>
        <p className="mt-2">{liuyaoCopy.seedNote}</p>
      </div>
      <Field label="当前最想问的问题" note="问题越具体，卦象越有参考价值。建议一次只问一件事。">
        <textarea
          className="input min-h-28"
          name="question"
          placeholder="请输入你此刻最想问的一件事，例如：我该不该换工作？这段关系还有结果吗？这个项目能不能做？"
          value={form.question}
          onChange={(event) => update("question", event.target.value)}
        />
      </Field>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="此刻心中自然浮现的数字" note="不要刻意挑选，第一感觉即可。">
          <input className="input" name="mindNumber" placeholder="例如 7、18、369" value={form.mindNumber} onChange={(event) => update("mindNumber", event.target.value)} />
        </Field>
        <Field label="此刻心中自然浮现的文字" note="数字和文字至少填写一个，都填写更好。">
          <input className="input" name="mindText" placeholder="例如：火、等、向前、放下" value={form.mindText} onChange={(event) => update("mindText", event.target.value)} />
        </Field>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="姓名 / 昵称">
          <input className="input" name="name" placeholder="请输入姓名或昵称" value={form.name} onChange={(event) => update("name", event.target.value)} />
        </Field>
        <Field label="性别">
          <select className="input" name="gender" value={form.gender} onChange={(event) => update("gender", event.target.value)}>
            <option>男</option>
            <option>女</option>
            <option>不方便透露</option>
          </select>
        </Field>
        <Field label="出生日期">
          <input className="input" name="birthDate" type="date" value={form.birthDate} onChange={(event) => update("birthDate", event.target.value)} />
        </Field>
        <Field label="出生时间" note="如果不确定准确时间，可以选择大概时间。">
          <input className="input" name="birthTime" type="time" value={form.birthTime} onChange={(event) => update("birthTime", event.target.value)} />
        </Field>
        <Field label="出生城市">
          <input className="input" name="birthCity" placeholder="例如：河南郑州 / 广东深圳 / London" value={form.birthCity} onChange={(event) => update("birthCity", event.target.value)} />
        </Field>
        <Field label="当前所在城市">
          <input className="input" name="currentCity" placeholder="例如：郑州 / 深圳 / London" value={form.currentCity} onChange={(event) => update("currentCity", event.target.value)} />
        </Field>
        <Field label="当前关注方向">
          <select className="input" name="category" value={form.category} onChange={(event) => update("category", event.target.value)}>
            {["事业财富", "感情关系", "合作项目", "家庭关系", "健康状态", "学业考试", "人生方向", "其他问题"].map((item) => <option key={item}>{item}</option>)}
          </select>
        </Field>
        <Field label="是否愿意生成高级报告">
          <select className="input" name="wantReport" value={form.wantReport} onChange={(event) => update("wantReport", event.target.value)}>
            <option>仅看简版卦象</option>
            <option>生成完整六爻报告</option>
          </select>
        </Field>
      </div>
      {error && <p className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-tea">{error}</p>}
      <button className="primary-pill justify-center" type="submit">摇出我的卦象</button>
      <p className="text-sm text-mutedTea">{liuyaoCopy.disclaimer}</p>
    </form>
  );
}

function Field({ label, note, children }: { label: string; note?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block font-bold text-ink">{label}</span>
      {children}
      {note && <span className="mt-2 block text-sm text-mutedTea">{note}</span>}
    </label>
  );
}
