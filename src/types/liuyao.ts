export type YinYang = "yin" | "yang";

export interface LiuYaoFormData {
  question: string;
  mindNumber: string;
  mindText: string;
  name: string;
  gender: "男" | "女" | "不方便透露";
  birthDate: string;
  birthTime: string;
  birthCity: string;
  currentCity: string;
  category:
    | "事业财富"
    | "感情关系"
    | "合作项目"
    | "家庭关系"
    | "健康状态"
    | "学业考试"
    | "人生方向"
    | "其他问题";
  wantReport: "仅看简版卦象" | "生成完整六爻报告";
}

export interface LiuYaoLine {
  position: number;
  yinYang: YinYang;
  moving: boolean;
  lineText: string;
}

export interface HexagramInfo {
  name: string;
  lines: LiuYaoLine[];
}

export interface LiuYaoAnalysis {
  summary: string;
  situation: string;
  movingLineHint: string;
  decisionAdvice: string;
  actionAdvice: string;
  riskReminder: string;
  oneLine: string;
}

export interface LiuYaoResult {
  question: string;
  generatedAt: string;
  currentCity: string;
  category: LiuYaoFormData["category"];
  originalHexagram: HexagramInfo;
  changedHexagram: HexagramInfo;
  yinCount: number;
  yangCount: number;
  movingPositions: number[];
  keywords: string[];
  analysis: LiuYaoAnalysis;
}
