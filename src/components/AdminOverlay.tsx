import { useEffect, useState } from "react";
import { brand, reports } from "../content/brand";

export default function AdminOverlay() {
  const [open, setOpen] = useState(false);
  const [authed, setAuthed] = useState(localStorage.getItem("admin_auth") === "true");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-ink/80 p-4 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl py-8">
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
                <span className="eyebrow">ADMIN</span>
                <h2 className="font-serifcn text-4xl text-ink">陈鹏AI先生后台说明</h2>
              </div>
              <button className="secondary-pill" type="button" onClick={() => setOpen(false)}>退出后台 ×</button>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <AdminCard title="品牌名称" value={brand.fullName} />
              <AdminCard title="报告产品" value={`${reports.length} 个`} />
              <AdminCard title="六爻入口" value="/liuyao" />
            </div>
            <div className="mt-6 rounded-3xl border border-line bg-paper p-5 text-mutedTea">
              <p>文案集中在 <code>src/content/brand.ts</code> 与 <code>src/content/liuyao.ts</code>。</p>
              <p className="mt-2">六爻算法在 <code>src/lib/liuyao.ts</code>，后续接 AI 时可把结果对象发送给后端或模型接口。</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-3xl border border-line bg-paper p-5">
      <p className="text-sm text-mutedTea">{title}</p>
      <strong className="mt-2 block text-xl text-tea">{value}</strong>
    </div>
  );
}
