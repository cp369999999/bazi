import { useMemo, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import LiuYaoSection from "./components/LiuYaoSection";
import LiuYaoForm from "./components/LiuYaoForm";
import LiuYaoResult from "./components/LiuYaoResult";
import PastLifeSection from "./components/PastLifeSection";
import PremiumReports from "./components/PremiumReports";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import AdminOverlay from "./components/AdminOverlay";
import { brand } from "./content/brand";
import { liuyaoCopy } from "./content/liuyao";
import { generateLiuYaoHexagram } from "./lib/liuyao";
import type { LiuYaoFormData, LiuYaoResult as LiuYaoResultType } from "./types/liuyao";

type Route = "home" | "liuyao" | "about" | "liuyao-report" | "result";

export default function App() {
  const route = useMemo<Route>(() => {
    const path = window.location.pathname;
    if (path.startsWith("/liuyao")) return "liuyao";
    if (path.startsWith("/about")) return "about";
    if (path.startsWith("/reports/liuyao")) return "liuyao-report";
    if (path.startsWith("/result")) return "result";
    return "home";
  }, []);
  const [liuYaoResult, setLiuYaoResult] = useState<LiuYaoResultType | null>(null);

  const handleLiuYaoSubmit = (formData: LiuYaoFormData) => {
    const result = generateLiuYaoHexagram(formData);
    setLiuYaoResult(result);
    window.setTimeout(() => document.getElementById("liuyao-result")?.scrollIntoView({ behavior: "smooth" }), 80);
  };

  return (
    <>
      <Analytics />
      <Header />
      {route === "home" && (
        <main>
          <Hero />
          <LiuYaoSection />
          <section id="ai-bazi" className="section-wrap">
            <div className="section-heading">
              <span className="eyebrow">AI BAZI · AI命盘</span>
              <h2>输入生辰，看懂性格底层与天赋剧本</h2>
              <p>命盘不是为了让你害怕命运，而是让你看清自己适合什么、不适合什么，什么时候该进，什么时候该退。</p>
            </div>
            <BirthGuideCard />
          </section>
          <PastLifeSection />
          <InsightSections />
          <PremiumReports />
          <AboutSection compact />
        </main>
      )}
      {route === "liuyao" && (
        <main className="section-wrap pt-12">
          <div className="section-heading">
            <span className="eyebrow">LIU YAO · 六爻问事</span>
            <h1 className="page-title">{liuyaoCopy.title}</h1>
            <p className="whitespace-pre-line">{liuyaoCopy.subtitle}</p>
            <p>{liuyaoCopy.description}</p>
          </div>
          <LiuYaoForm onSubmit={handleLiuYaoSubmit} />
          {liuYaoResult && <LiuYaoResult result={liuYaoResult} />}
        </main>
      )}
      {route === "about" && (
        <main>
          <AboutSection />
        </main>
      )}
      {route === "liuyao-report" && (
        <main className="section-wrap pt-12">
          <div className="paper-card p-8 md:p-12">
            <span className="eyebrow">PREMIUM REPORT · 六爻完整报告</span>
            <h1 className="page-title">六爻问事完整报告</h1>
            <p className="mt-4 text-mutedTea">
              完整报告将结合你的出生信息、当前所在地、提问时间、心念数字与卦象变化，进一步分析事情的发展趋势、关键阻力、可行动作和未来节点。
            </p>
            <a className="primary-pill mt-8 inline-flex" href="/liuyao">先起一卦</a>
          </div>
        </main>
      )}
      {route === "result" && (
        <main className="section-wrap pt-12">
          <div className="paper-card p-8 md:p-12">
            <span className="eyebrow">BAZI RESULT · 命盘结果</span>
            <h1 className="page-title">AI命盘结果页已升级</h1>
            <p className="mt-4 text-mutedTea">
              现在首页提交资料后，会进入新的温暖东方风格命盘结果。后续可继续把完整八字结果组件化到这里。
            </p>
            <a className="primary-pill mt-8 inline-flex" href="/#ai-bazi">返回首页重新推演</a>
          </div>
        </main>
      )}
      <Footer />
      <AdminOverlay />
    </>
  );
}

function BirthGuideCard() {
  const submitBirth = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    localStorage.setItem("mingpan_result_profile", JSON.stringify({ ...data, submitTime: Date.now() }));
    window.location.href = "/result";
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
      <div className="paper-card p-7">
        <h3 className="font-serifcn text-2xl text-ink">陈鹏AI先生怎么看命盘</h3>
        <p className="mt-3 text-mutedTea">
          性格即命运，天赋即剧本。命盘里真正有价值的，不是标签，而是你的选择方式、消耗模式、优势战场和长期节奏。
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
          {["八字结构", "五行能量", "事业财富", "感情关系", "前世今生", "流年运势", "天赋剧本", "人生方向"].map((item) => (
            <span className="rounded-2xl border border-line/70 bg-rice px-4 py-3 text-center text-tea" key={item}>
              {item}
            </span>
          ))}
        </div>
      </div>
      <form className="paper-card grid gap-4 p-7" onSubmit={submitBirth}>
        <h3 className="font-serifcn text-2xl text-ink">开始命运推演</h3>
        <input className="input" name="name" placeholder="姓名 / 昵称" defaultValue="访客" />
        <div className="grid gap-4 md:grid-cols-2">
          <select className="input" name="gender" defaultValue="不方便透露">
            <option>男</option>
            <option>女</option>
            <option>不方便透露</option>
          </select>
          <input className="input" name="birthDate" type="date" defaultValue="1996-12-09" />
          <input className="input" name="birthTime" type="time" defaultValue="13:30" />
          <input className="input" name="city" placeholder="出生城市" />
        </div>
        <select className="input" name="focus" defaultValue="综合命盘">
          <option>事业财富</option>
          <option>感情关系</option>
          <option>前世今生</option>
          <option>流年运势</option>
          <option>人生方向</option>
          <option>综合命盘</option>
        </select>
        <button className="primary-pill justify-center" type="submit">开始命运推演</button>
      </form>
    </div>
  );
}

function InsightSections() {
  const sections = [
    ["career", "CAREER & WEALTH · 事业财富", "看懂你的财富路径与事业剧本", "有些人适合靠技术，有些人适合靠资源，有些人适合靠流量和信息差。陈鹏AI先生帮你看清自己的优势战场。"],
    ["love", "LOVE MATCH · 感情合盘", "关系不是偶然，是能量结构的互相牵引", "感情合盘看两人性格匹配、情绪模式、相处风险、婚姻稳定性和彼此消耗点。"],
    ["yearly", "YEARLY FORTUNE · 流年运势", "每一年，都有不同的命运主题", "流年不是让你焦虑，而是提醒你什么时候该进、什么时候该稳、什么时候要避开无谓消耗。"]
  ];
  return (
    <>
      {sections.map(([id, eyebrow, title, desc]) => (
        <section className="section-wrap" id={id} key={id}>
          <div className="paper-card p-8 md:p-10">
            <span className="eyebrow">{eyebrow}</span>
            <h2>{title}</h2>
            <p className="mt-4 max-w-3xl text-mutedTea">{desc}</p>
          </div>
        </section>
      ))}
    </>
  );
}
