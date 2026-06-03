-- 陈鹏AI先生 · 命运推演系统 Supabase schema
-- 先在 Supabase SQL Editor 执行本文件，再配置 Vercel 环境变量：
-- VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY

create extension if not exists "pgcrypto";

create table if not exists public.bazi_submissions (
  id uuid primary key default gen_random_uuid(),
  name text,
  gender text,
  birth_date date,
  birth_time time,
  birth_city text,
  focus text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.liuyao_submissions (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  mind_number text,
  mind_text text,
  name text,
  gender text,
  birth_date date,
  birth_time time,
  birth_city text,
  current_city text,
  category text,
  want_report text,
  original_hexagram jsonb not null default '{}'::jsonb,
  changed_hexagram jsonb not null default '{}'::jsonb,
  analysis jsonb not null default '{}'::jsonb,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id text primary key default 'main',
  hero_title text,
  hero_subtitle text,
  signature text,
  nav jsonb not null default '[]'::jsonb,
  faq jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.report_products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  fit text,
  description text,
  cta text,
  url text,
  sort_order int not null default 0,
  active boolean not null default true,
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id, hero_title, hero_subtitle, signature, nav, faq)
values (
  'main',
  '陈鹏AI先生 · 命运推演系统',
  '命已定，运自造。\n输入你的出生信息与当下困惑，用 AI 命盘、六爻问事与前世今生推演，帮你看懂性格底层、天赋剧本、事业财富、感情关系与人生方向。',
  '我希望这个网站、这些文字和这些推演，能给从未见面的你带来一点温度。\n见字如面。\n—— 陈鹏AI先生',
  '[
    {"label":"首页","href":"/"},
    {"label":"AI命盘","href":"/#ai-bazi"},
    {"label":"六爻问事","href":"/liuyao"},
    {"label":"前世今生","href":"/#past-life"},
    {"label":"事业财富","href":"/#career"},
    {"label":"感情合盘","href":"/#love"},
    {"label":"流年运势","href":"/#yearly"},
    {"label":"高级报告","href":"/#reports"},
    {"label":"关于陈鹏AI先生","href":"/about"}
  ]'::jsonb,
  '[
    {"q":"AI命盘是什么？","a":"AI命盘是把命理结构、人生观察和 AI 推演结合起来，帮助你理解性格底层、天赋剧本和人生方向。"},
    {"q":"六爻问事适合问什么？","a":"适合问当下具体的一件事，例如工作、关系、合作、项目、考试或人生方向。"},
    {"q":"结果是绝对准确的吗？","a":"不是。系统内容仅作为自我认知、情绪整理和决策参考，不替你决定人生。"}
  ]'::jsonb
)
on conflict (id) do nothing;

insert into public.report_products (title, fit, description, cta, url, sort_order)
values
  ('AI基础命盘报告','适合第一次了解自己的人','看性格底层、五行能量、天赋剧本与人生方向。','生成我的报告',null,1),
  ('六爻问事完整报告','适合正在面对具体问题的人','结合问题、时间、所在地、心念数字与卦象变化，给出局势和行动建议。','查看完整推演','/reports/liuyao',2),
  ('前世今生灵魂剧本报告','适合想理解重复模式的人','分析潜意识模式、关系牵引、执念、恐惧与天赋来源。','获得陈鹏AI先生建议',null,3),
  ('事业财富命盘报告','适合创业者、老板和职业转型者','看优势战场、财富路径、贵人资源和风险年份。','生成我的报告',null,4),
  ('感情合盘报告','适合恋爱、婚姻和合作关系判断','看两人能量结构、相处风险、稳定性与关系建议。','查看完整推演',null,5),
  ('未来十年大运报告','适合做长期规划的人','梳理未来十年的事业、财富、关系和关键转折。','生成我的报告',null,6),
  ('老板人生军师报告','适合老板、管理者和高压决策者','用命盘结构和商业洞察，辅助判断战略、团队、资源与节奏。','获得陈鹏AI先生建议',null,7)
on conflict do nothing;

alter table public.bazi_submissions enable row level security;
alter table public.liuyao_submissions enable row level security;
alter table public.site_settings enable row level security;
alter table public.report_products enable row level security;

-- 前端演示版策略：允许 anon 写入提交、后台读取和编辑配置。
-- 生产环境建议改为 Supabase Auth + service role 后端接口，不要长期暴露管理权限给 anon。
drop policy if exists "anon_insert_bazi" on public.bazi_submissions;
create policy "anon_insert_bazi" on public.bazi_submissions for insert to anon with check (true);

drop policy if exists "anon_insert_liuyao" on public.liuyao_submissions;
create policy "anon_insert_liuyao" on public.liuyao_submissions for insert to anon with check (true);

drop policy if exists "anon_select_bazi" on public.bazi_submissions;
create policy "anon_select_bazi" on public.bazi_submissions for select to anon using (true);

drop policy if exists "anon_select_liuyao" on public.liuyao_submissions;
create policy "anon_select_liuyao" on public.liuyao_submissions for select to anon using (true);

drop policy if exists "anon_manage_site_settings" on public.site_settings;
create policy "anon_manage_site_settings" on public.site_settings for all to anon using (true) with check (true);

drop policy if exists "anon_manage_report_products" on public.report_products;
create policy "anon_manage_report_products" on public.report_products for all to anon using (true) with check (true);
