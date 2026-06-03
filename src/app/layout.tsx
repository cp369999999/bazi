import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://santen.ai"),
  title: "参命 Santen｜高端AI命理咨询｜婚恋合盘与事业财运预约",
  description:
    "参命 Santen 是由陈鹏主理的高端东方命理预约咨询品牌，专注女性情感、婚恋合盘、事业财运、六爻测事、命盘详批与取名择吉，提供 AI 深度文稿与全球预约交付。",
  keywords: [
    "参命 Santen",
    "陈鹏命理",
    "高端命理咨询",
    "婚恋合盘",
    "女性情感咨询",
    "事业财运",
    "六爻测事",
    "八字分析",
    "AI命理",
    "Eastern Astrology",
    "Bazi consultation"
  ],
  openGraph: {
    title: "参命 Santen｜参透关系，参透财运，参透自己",
    description: "高端东方命理预约咨询，专注婚恋合盘、事业财运与关键决策。",
    type: "website",
    locale: "zh_CN"
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7efe2"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
