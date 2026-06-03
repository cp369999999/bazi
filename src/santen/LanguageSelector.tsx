"use client";

import { useEffect, useRef, useState } from "react";

const languages = [
  { code: "zh-CN", label: "简体中文", short: "简", htmlLang: "zh-CN" },
  { code: "zh-TW", label: "繁體中文", short: "繁", htmlLang: "zh-Hant" },
  { code: "en", label: "English", short: "EN", htmlLang: "en" },
  { code: "ja", label: "日本語", short: "日", htmlLang: "ja" },
  { code: "ko", label: "한국어", short: "한", htmlLang: "ko" },
  { code: "vi", label: "Tiếng Việt", short: "VI", htmlLang: "vi" }
] as const;

type LanguageCode = (typeof languages)[number]["code"];

const storageKey = "santen_language";

export default function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<LanguageCode>("zh-CN");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const urlLang = search.get("lang") as LanguageCode | null;
    const storedLang = window.localStorage.getItem(storageKey) as LanguageCode | null;
    const nextLang: LanguageCode = isLanguageCode(urlLang)
      ? urlLang
      : isLanguageCode(storedLang)
        ? storedLang
        : "zh-CN";

    applyLanguage(nextLang, false);

    const onClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("click", onClickOutside);
    return () => window.removeEventListener("click", onClickOutside);
  }, []);

  const selected = languages.find((item) => item.code === current) ?? languages[0];

  const applyLanguage = (code: LanguageCode, updateUrl = true) => {
    const language = languages.find((item) => item.code === code) ?? languages[0];
    setCurrent(language.code);
    window.localStorage.setItem(storageKey, language.code);
    document.documentElement.lang = language.htmlLang;

    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", language.code);
      window.history.replaceState({}, "", url);
    }
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        aria-expanded={open}
        aria-label="选择语言"
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
          {languages.map((language) => (
            <button
              className={`block w-full px-4 py-3 text-left text-sm transition hover:bg-paper ${
                language.code === current ? "bg-paper font-semibold text-tea" : "text-mutedTea"
              }`}
              key={language.code}
              type="button"
              onClick={() => {
                applyLanguage(language.code);
                setOpen(false);
              }}
            >
              {language.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function isLanguageCode(value: string | null): value is LanguageCode {
  return languages.some((item) => item.code === value);
}
