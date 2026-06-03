"use client";

import { useEffect, useRef, useState } from "react";
import { languages } from "./i18n";
import { useI18n } from "./I18nProvider";

export default function LanguageSelector() {
  const { language, setLanguage } = useI18n();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const selected = languages.find((item) => item.code === language) ?? languages[0];

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("click", onClickOutside);
    return () => window.removeEventListener("click", onClickOutside);
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        aria-expanded={open}
        aria-label="Select language"
        className="flex h-12 items-center gap-2 rounded-full border border-line bg-rice px-4 text-sm font-semibold text-tea shadow-sm transition hover:-translate-y-0.5 hover:border-tea"
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          setOpen((value) => !value);
        }}
      >
        <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-paper px-2 font-serifcn">
          {selected.short}
        </span>
        <span className="hidden xl:inline">{selected.label}</span>
        <span className={`text-xs transition ${open ? "rotate-180" : ""}`}>⌄</span>
      </button>

      {open && (
        <div className="absolute right-0 top-14 z-50 w-44 overflow-hidden rounded-[18px] border border-line bg-rice py-2 shadow-soft">
          {languages.map((item) => (
            <button
              className={`block w-full px-4 py-3 text-left text-sm transition hover:bg-paper ${
                item.code === language ? "bg-paper font-semibold text-tea" : "text-mutedTea"
              }`}
              key={item.code}
              type="button"
              onClick={() => {
                setLanguage(item.code);
                setOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
