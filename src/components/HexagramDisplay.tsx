import type { HexagramInfo } from "../types/liuyao";

export default function HexagramDisplay({ title, hexagram }: { title: string; hexagram: HexagramInfo }) {
  return (
    <div className="rounded-[28px] border border-line bg-rice p-6 shadow-sm">
      <span className="eyebrow">{title}</span>
      <h3 className="mt-2 font-serifcn text-3xl text-ink">{hexagram.name}</h3>
      <div className="mt-6 flex flex-col-reverse gap-3">
        {hexagram.lines.map((line) => (
          <div className="grid grid-cols-[1fr_40px] items-center gap-3" key={`${title}-${line.position}`}>
            {line.yinYang === "yang" ? (
              <div className="h-2 rounded-full bg-tea" />
            ) : (
              <div className="grid grid-cols-[1fr_28px_1fr] items-center gap-3">
                <span className="h-2 rounded-full bg-tea" />
                <span />
                <span className="h-2 rounded-full bg-tea" />
              </div>
            )}
            <span className="text-center text-sm font-bold text-softGold">{line.moving ? "动" : ""}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
