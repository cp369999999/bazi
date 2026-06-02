import { hexagramNames } from "../content/liuyao";
import type { LiuYaoAnalysis, LiuYaoFormData, LiuYaoLine, LiuYaoResult } from "../types/liuyao";

export function generateLiuYaoHexagram(formData: LiuYaoFormData): LiuYaoResult {
  const generatedAt = new Date();
  const seedSource = [
    formData.question,
    formData.mindNumber,
    formData.mindText,
    formData.birthDate,
    formData.birthTime,
    formData.birthCity,
    formData.currentCity,
    generatedAt.toISOString()
  ].join("|");
  const seed = hashString(seedSource);

  const lines: LiuYaoLine[] = Array.from({ length: 6 }, (_, index) => {
    const value = pseudo(seed + index * 97);
    return {
      position: index + 1,
      yinYang: value % 2 === 0 ? "yang" : "yin",
      moving: value % 5 === 0,
      lineText: `${["初爻", "二爻", "三爻", "四爻", "五爻", "上爻"][index]}${value % 2 === 0 ? "阳" : "阴"}${value % 5 === 0 ? "动" : "静"}`
    };
  });

  if (!lines.some((line) => line.moving)) {
    lines[seed % 6].moving = true;
    lines[seed % 6].lineText = lines[seed % 6].lineText.replace("静", "动");
  }

  const changedLines: LiuYaoLine[] = lines.map((line) =>
    line.moving ? { ...line, yinYang: line.yinYang === "yang" ? "yin" : "yang" } : { ...line }
  );

  const originalIndex = lineIndex(lines);
  const changedIndex = lineIndex(changedLines);
  const yinCount = lines.filter((line) => line.yinYang === "yin").length;
  const yangCount = 6 - yinCount;
  const movingPositions = lines.filter((line) => line.moving).map((line) => line.position);
  const keywords = extractKeywords(formData.question, formData.mindText, formData.category);

  return {
    question: formData.question,
    generatedAt: generatedAt.toLocaleString("zh-CN", { hour12: false }),
    currentCity: formData.currentCity || "未填写",
    category: formData.category,
    originalHexagram: {
      name: hexagramNames[originalIndex],
      lines
    },
    changedHexagram: {
      name: hexagramNames[changedIndex],
      lines: changedLines
    },
    yinCount,
    yangCount,
    movingPositions,
    keywords,
    analysis: buildAnalysis(formData, hexagramNames[originalIndex], hexagramNames[changedIndex], yinCount, yangCount, movingPositions, keywords)
  };
}

function buildAnalysis(
  formData: LiuYaoFormData,
  originalName: string,
  changedName: string,
  yinCount: number,
  yangCount: number,
  movingPositions: number[],
  keywords: string[]
): LiuYaoAnalysis {
  const balance = yangCount >= yinCount ? "阳气较显，事情有推进空间，但也容易急" : "阴气较显，事情仍在酝酿，需要等局势明朗";
  const categoryAdvice = {
    事业财富: "先看清资源、节奏和现金流，别因为一时焦虑做过度承诺。",
    感情关系: "先确认对方真实意愿，再决定是否继续投入，不要只凭情绪判断。",
    合作项目: "合作可谈，但规则、权责和退出机制要先写清。",
    家庭关系: "少争输赢，多看每个人背后的不安和需求。",
    健康状态: "适合把它当作提醒，规律作息并及时寻求专业帮助。",
    学业考试: "把注意力放回可执行计划，少被结果焦虑消耗。",
    人生方向: "不要急着一次定终身，先做一个能验证方向的小行动。",
    其他问题: "先把问题拆小，找到现在最能做的一步。"
  } satisfies Record<LiuYaoFormData["category"], string>;

  return {
    summary: `本卦为「${originalName}」，变卦为「${changedName}」。${balance}。`,
    situation: `你问的是「${formData.question || "当下困惑"}」。卦象显示，这件事的核心不在答案本身，而在你是否已经看清阻力、资源和自己的真实意愿。`,
    movingLineHint: `本次动爻在第 ${movingPositions.join("、")} 爻。动爻代表事情正在变化，越靠上越接近结果，越靠下越说明根基仍需整理。`,
    decisionAdvice: `${formData.category}方向建议：${categoryAdvice[formData.category]}`,
    actionAdvice: `未来七天，先做一件具体可验证的小事。关键词「${keywords.join("、")}」提醒你：不要被想象拖住，要让现实反馈说话。`,
    riskReminder: "风险在于同时问太多、想太远，或把一次卦象当作绝对结论。卦象只给你看局势，不替你承担选择。",
    oneLine: "先稳住心，再看清局；能做的一步，就是运开始变化的地方。"
  };
}

function lineIndex(lines: LiuYaoLine[]) {
  // TODO: 未来替换为严格的上下卦到 64 卦映射。
  return lines.reduce((sum, line, index) => sum + (line.yinYang === "yang" ? 1 : 0) * 2 ** index, 0) % 64;
}

function hashString(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash);
}

function pseudo(seed: number) {
  let value = seed + 0x6d2b79f5;
  value = Math.imul(value ^ (value >>> 15), value | 1);
  value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
  return Math.abs((value ^ (value >>> 14)) >>> 0);
}

function extractKeywords(question: string, mindText: string, category: string) {
  const raw = `${category} ${mindText} ${question}`.replace(/[？?，,。.!！]/g, " ");
  const words = raw.split(/\s+/).filter(Boolean);
  return Array.from(new Set(words)).slice(0, 4);
}
