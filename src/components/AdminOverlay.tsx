import { useEffect, useState } from "react";
import { brand, reports as defaultReports } from "../content/brand";
import {
  getBaziSubmissions,
  getLiuYaoSubmissions,
  getReportProducts,
  getSiteSettings,
  isSupabaseConfigured,
  replaceReportProducts,
  updateSiteSettings
} from "../lib/supabase";
import type { ReportProduct, SiteSettings } from "../types/site";

type AdminTab = "records" | "reports" | "content";

const defaultSettings: SiteSettings = {
  heroTitle: brand.heroTitle,
  heroSubtitle: brand.heroSubtitle,
  signature: brand.signature,
  nav: brand.nav,
  faq: [
    { q: "AI命盘是什么？", a: "AI命盘帮助你理解性格底层、天赋剧本和人生方向。" },
    { q: "六爻问事适合问什么？", a: "适合问当下具体的一件事，例如工作、关系、合作、项目、考试或人生方向。" },
    { q: "结果是绝对准确的吗？", a: "不是。系统内容仅作为自我认知、情绪整理和决策参考。" }
  ]
};

export default function AdminOverlay() {
  const [open, setOpen] = useState(false);
  const [authed, setAuthed] = useState(localStorage.getItem("admin_auth") === "true");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<AdminTab>("records");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [baziRows, setBaziRows] = useState<any[]>([]);
  const [liuYaoRows, setLiuYaoRows] = useState<any[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [reportsJson, setReportsJson] = useState(JSON.stringify(defaultReports, null, 2));
  const [navJson, setNavJson] = useState(JSON.stringify(defaultSettings.nav, null, 2));
  const [faqJson, setFaqJson] = useState(JSON.stringify(defaultSettings.faq, null, 2));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("admin") === "mingpan2026") setOpen(true);
    let buffer = "";
    const listener = (event: KeyboardEvent) => {
      if (event.key.length !== 1) return;
      buffer = (buffer + event.key.toLowerCase()).slice(-7);
      if (buffer === "admincp") setOpen(true);
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);

  useEffect(() => {
    if (open && authed) loadAdminData();
  }, [open, authed]);

  if (!open) return null;

  const login = () => {
    if (password === "mingpan2026admin") {
      localStorage.setItem("admin_auth", "true");
      setAuthed(true);
      setError("");
    } else {
      setError("密码错误");
    }
  };

  async function loadAdminData() {
    setLoading(true);
    setMessage("");
    try {
      const [remoteSettings, remoteReports, bazi, liuyao] = await Promise.all([
        getSiteSettings(),
        getReportProducts(),
        getBaziSubmissions(),
        getLiuYaoSubmissions()
      ]);
      const nextSettings = remoteSettings || defaultSettings;
      const nextReports = remoteReports.length ? remoteReports : defaultReports;
      setSettings(nextSettings);
      setReportsJson(JSON.stringify(nextReports, null, 2));
      setNavJson(JSON.stringify(nextSettings.nav, null, 2));
      setFaqJson(JSON.stringify(nextSettings.faq, null, 2));
      setBaziRows(bazi);
      setLiuYaoRows(liuyao);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "后台数据读取失败");
    } finally {
      setLoading(false);
    }
  }

  async function saveContent() {
    try {
      const nextSettings = {
        ...settings,
        nav: JSON.parse(navJson),
        faq: JSON.parse(faqJson)
      };
      const result = await updateSiteSettings(nextSettings);
      setSettings(nextSettings);
      setMessage(result.ok ? "首页文案、导航和 FAQ 已保存" : result.reason || "保存失败");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "JSON 格式错误");
    }
  }

  async function saveReports() {
    try {
      const products = JSON.parse(reportsJson) as ReportProduct[];
      const result = await replaceReportProducts(products);
      setMessage(result.ok ? "高级报告产品已保存" : result.reason || "保存失败");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "报告 JSON 格式错误");
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-ink/80 p-4 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl py-8">
        {!authed ? (
          <div className="mx-auto mt-20 max-w-md rounded-[28px] bg-rice p-8 shadow-paper">
            <span className="eyebrow">ADMIN</span>
            <h2 className="font-serifcn text-3xl text-ink">命盘后台</h2>
            <p className="mt-2 text-mutedTea">保留入口：/?admin=mingpan2026</p>
            <input className="input mt-6" type="password" placeholder="请输入后台密码" value={password} onChange={(event) => setPassword(event.target.value)} />
            {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
            <div className="mt-5 flex gap-3">
              <button className="primary-pill flex-1 justify-center" type="button" onClick={login}>进入后台</button>
              <button className="secondary-pill flex-1 justify-center" type="button" onClick={() => setOpen(false)}>关闭</button>
            </div>
          </div>
        ) : (
          <div className="rounded-[28px] bg-rice p-6 shadow-paper md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="eyebrow">ADMIN · SUPABASE</span>
                <h2 className="font-serifcn text-4xl text-ink">陈鹏AI先生后台</h2>
                <p className="mt-2 text-mutedTea">Supabase：{isSupabaseConfigured ? "已配置" : "未配置，当前仅显示本地默认内容"}</p>
              </div>
              <button className="secondary-pill" type="button" onClick={() => setOpen(false)}>退出后台 ×</button>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <TabButton active={tab === "records"} onClick={() => setTab("records")}>提交记录</TabButton>
              <TabButton active={tab === "reports"} onClick={() => setTab("reports")}>高级报告产品</TabButton>
              <TabButton active={tab === "content"} onClick={() => setTab("content")}>首页文案 / FAQ / 导航</TabButton>
              <button className="secondary-pill" type="button" onClick={loadAdminData}>刷新</button>
            </div>
            {loading && <p className="mt-4 text-mutedTea">正在读取 Supabase...</p>}
            {message && <p className="mt-4 rounded-2xl border border-line bg-paper px-4 py-3 text-tea">{message}</p>}
            {tab === "records" && <RecordsPanel baziRows={baziRows} liuYaoRows={liuYaoRows} />}
            {tab === "reports" && (
              <div className="mt-6 grid gap-4">
                <p className="text-mutedTea">直接编辑报告产品 JSON。字段：title / fit / desc / cta / url / sortOrder / active。</p>
                <textarea className="input min-h-[420px] font-mono text-sm" value={reportsJson} onChange={(event) => setReportsJson(event.target.value)} />
                <button className="primary-pill w-fit" type="button" onClick={saveReports}>保存报告产品</button>
              </div>
            )}
            {tab === "content" && (
              <div className="mt-6 grid gap-5">
                <label>
                  <span className="mb-2 block font-bold text-ink">首页标题</span>
                  <input className="input" value={settings.heroTitle} onChange={(event) => setSettings({ ...settings, heroTitle: event.target.value })} />
                </label>
                <label>
                  <span className="mb-2 block font-bold text-ink">首页副标题</span>
                  <textarea className="input min-h-32" value={settings.heroSubtitle} onChange={(event) => setSettings({ ...settings, heroSubtitle: event.target.value })} />
                </label>
                <label>
                  <span className="mb-2 block font-bold text-ink">品牌签名</span>
                  <textarea className="input min-h-28" value={settings.signature} onChange={(event) => setSettings({ ...settings, signature: event.target.value })} />
                </label>
                <label>
                  <span className="mb-2 block font-bold text-ink">导航 JSON</span>
                  <textarea className="input min-h-56 font-mono text-sm" value={navJson} onChange={(event) => setNavJson(event.target.value)} />
                </label>
                <label>
                  <span className="mb-2 block font-bold text-ink">FAQ JSON</span>
                  <textarea className="input min-h-56 font-mono text-sm" value={faqJson} onChange={(event) => setFaqJson(event.target.value)} />
                </label>
                <button className="primary-pill w-fit" type="button" onClick={saveContent}>保存首页文案 / FAQ / 导航</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function RecordsPanel({ baziRows, liuYaoRows }: { baziRows: any[]; liuYaoRows: any[] }) {
  return (
    <div className="mt-6 grid gap-6">
      <div>
        <h3 className="font-serifcn text-2xl text-ink">命盘提交记录（{baziRows.length}）</h3>
        <div className="mt-3 overflow-auto rounded-3xl border border-line bg-paper">
          <table className="min-w-full text-left text-sm">
            <thead className="text-tea"><tr><th className="p-3">时间</th><th className="p-3">姓名</th><th className="p-3">出生日期</th><th className="p-3">关注</th></tr></thead>
            <tbody>{baziRows.map((row) => <tr className="border-t border-line/60" key={row.id}><td className="p-3">{formatTime(row.created_at)}</td><td className="p-3">{row.name}</td><td className="p-3">{row.birth_date}</td><td className="p-3">{row.focus}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
      <div>
        <h3 className="font-serifcn text-2xl text-ink">六爻问事记录（{liuYaoRows.length}）</h3>
        <div className="mt-3 overflow-auto rounded-3xl border border-line bg-paper">
          <table className="min-w-full text-left text-sm">
            <thead className="text-tea"><tr><th className="p-3">时间</th><th className="p-3">问题</th><th className="p-3">城市</th><th className="p-3">本卦</th><th className="p-3">变卦</th></tr></thead>
            <tbody>{liuYaoRows.map((row) => <tr className="border-t border-line/60" key={row.id}><td className="p-3">{formatTime(row.created_at)}</td><td className="p-3">{row.question}</td><td className="p-3">{row.current_city}</td><td className="p-3">{row.original_hexagram?.name}</td><td className="p-3">{row.changed_hexagram?.name}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button className={active ? "primary-pill" : "secondary-pill"} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

function formatTime(value?: string) {
  if (!value) return "-";
  return new Date(value).toLocaleString("zh-CN", { hour12: false });
}
