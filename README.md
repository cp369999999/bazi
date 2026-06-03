# 参命 Santen

高端东方命理预约咨询品牌网站。主理人陈鹏，10年命理经验，专注女性情感、婚恋合盘、事业财运、六爻测事、命盘详批与取名择吉。

## 本地运行

```bash
npm install
npm run dev
```

访问：

```text
http://127.0.0.1:4173/
```

## 构建

```bash
npm run build
```

Next.js 构建产物由 `.next/` 管理，Vercel 会自动识别。

## 修改文案

主要内容集中在：

```text
src/santen/content.ts
```

可在这里修改：

- 品牌名称、主理人、口号
- 导航
- 服务项目与价格
- 预约流程
- FAQ
- 内容允许/禁止边界

## 修改互动预览

互动咨询模块在：

```text
src/santen/ConsultationTools.tsx
src/santen/simulators.ts
```

后续接 AI API 时，可把 `simulateConsultation()` 替换为真实接口请求。

## 部署

1. 推送代码到 GitHub。
2. Vercel 新建项目，选择该仓库。
3. Framework Preset 选择 `Next.js`。
4. Build Command 使用 `npm run build`。
5. Output Directory 留空。
