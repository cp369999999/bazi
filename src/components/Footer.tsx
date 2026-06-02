import { brand } from "../content/brand";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line/60 bg-rice/70">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <p className="font-serifcn text-3xl text-ink">命已定，运自造。</p>
        <p className="mt-2 text-mutedTea">愿你了解自己，接受自己，顺势而为。</p>
        <div className="mt-6 flex flex-col gap-3 border-t border-line/60 pt-6 text-sm text-mutedTea md:flex-row md:items-center md:justify-between">
          <span>陈鹏AI先生 · AI命运推演系统</span>
          <span>{brand.disclaimer}</span>
        </div>
      </div>
    </footer>
  );
}
