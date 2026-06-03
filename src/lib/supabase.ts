import { createClient } from "@supabase/supabase-js";
import type { LiuYaoFormData, LiuYaoResult } from "../types/liuyao";
import type { BaziSubmission, ReportProduct, SiteSettings } from "../types/site";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: { persistSession: false }
    })
  : null;

export async function saveBaziSubmission(submission: BaziSubmission) {
  if (!supabase) return { ok: false, reason: "Supabase 未配置" };
  const { error } = await supabase.from("bazi_submissions").insert({
    name: submission.name,
    gender: submission.gender,
    birth_date: submission.birthDate || null,
    birth_time: submission.birthTime || null,
    birth_city: submission.birthCity,
    focus: submission.focus,
    payload: submission.payload || submission
  });
  return { ok: !error, reason: error?.message };
}

export async function saveLiuYaoSubmission(form: LiuYaoFormData, result: LiuYaoResult) {
  if (!supabase) return { ok: false, reason: "Supabase 未配置" };
  const { error } = await supabase.from("liuyao_submissions").insert({
    question: form.question,
    mind_number: form.mindNumber,
    mind_text: form.mindText,
    name: form.name,
    gender: form.gender,
    birth_date: form.birthDate || null,
    birth_time: form.birthTime || null,
    birth_city: form.birthCity,
    current_city: form.currentCity,
    category: form.category,
    want_report: form.wantReport,
    original_hexagram: result.originalHexagram,
    changed_hexagram: result.changedHexagram,
    analysis: result.analysis,
    payload: { form, result }
  });
  return { ok: !error, reason: error?.message };
}

export async function getBaziSubmissions() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("bazi_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) throw error;
  return data || [];
}

export async function getLiuYaoSubmissions() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("liuyao_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) throw error;
  return data || [];
}

export async function getSiteSettings() {
  if (!supabase) return null;
  const { data, error } = await supabase.from("site_settings").select("*").eq("id", "main").maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return {
    heroTitle: data.hero_title,
    heroSubtitle: data.hero_subtitle,
    signature: data.signature,
    nav: data.nav || [],
    faq: data.faq || []
  } satisfies SiteSettings;
}

export async function updateSiteSettings(settings: SiteSettings) {
  if (!supabase) return { ok: false, reason: "Supabase 未配置" };
  const { error } = await supabase.from("site_settings").upsert({
    id: "main",
    hero_title: settings.heroTitle,
    hero_subtitle: settings.heroSubtitle,
    signature: settings.signature,
    nav: settings.nav,
    faq: settings.faq,
    updated_at: new Date().toISOString()
  });
  return { ok: !error, reason: error?.message };
}

export async function getReportProducts() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("report_products")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data || []).map((item) => ({
    id: item.id,
    title: item.title,
    fit: item.fit || "",
    desc: item.description || "",
    cta: item.cta || "生成我的报告",
    url: item.url,
    sortOrder: item.sort_order,
    active: item.active
  })) satisfies ReportProduct[];
}

export async function replaceReportProducts(products: ReportProduct[]) {
  if (!supabase) return { ok: false, reason: "Supabase 未配置" };
  const rows = products.map((product, index) => ({
    id: product.id,
    title: product.title,
    fit: product.fit,
    description: product.desc,
    cta: product.cta,
    url: product.url || null,
    sort_order: product.sortOrder ?? index + 1,
    active: product.active ?? true,
    updated_at: new Date().toISOString()
  }));
  const { error } = await supabase.from("report_products").upsert(rows);
  return { ok: !error, reason: error?.message };
}
