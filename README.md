# 陈鹏AI先生 · 命运推演系统

AI命盘、六爻问事、前世今生与人生军师系统。

## 本地运行

```bash
npm install
npm run dev
```

访问：

- 首页：http://127.0.0.1:4173/
- 六爻问事：http://127.0.0.1:4173/liuyao
- 关于陈鹏AI先生：http://127.0.0.1:4173/about
- 后台入口：http://127.0.0.1:4173/?admin=mingpan2026

后台密码：

```text
mingpan2026admin
```

## 构建

```bash
npm run build
```

构建产物在 `dist/`。

## Supabase

1. 在 Supabase SQL Editor 执行：

```text
supabase/schema.sql
```

2. 本地新建 `.env.local`：

```text
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

3. Vercel 环境变量也添加同名两项：

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

后台入口：

```text
/?admin=mingpan2026
```
