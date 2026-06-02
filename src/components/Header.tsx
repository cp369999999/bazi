import { brand } from "../content/brand";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-paper/88 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <a className="flex items-center gap-3" href="/">
          <span className="grid h-11 w-11 place-items-center rounded-full border border-line bg-rice font-serifcn text-2xl text-tea shadow-sm">陈</span>
          <span>
            <strong className="block font-serifcn text-xl text-ink">{brand.name}</strong>
            <span className="text-xs tracking-[.18em] text-mutedTea">AI DESTINY SYSTEM</span>
          </span>
        </a>
        <div className="hidden flex-wrap items-center justify-end gap-4 text-sm font-medium text-mutedTea lg:flex">
          {brand.nav.map((item) => (
            <a className="transition hover:text-tea" href={item.href} key={item.label}>
              {item.label}
            </a>
          ))}
        </div>
        <a className="rounded-full bg-tea px-5 py-2 text-sm font-bold text-rice shadow-sm transition hover:-translate-y-0.5" href="/liuyao">
          六爻问一事
        </a>
      </nav>
    </header>
  );
}
