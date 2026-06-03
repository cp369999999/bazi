export type ToolKey = "liuyao" | "bazi" | "match" | "naming";

export interface SimulationResult {
  title: string;
  summary: string;
  sections: { title: string; body: string }[];
  cta: string;
}

export function simulateConsultation(tool: ToolKey, payload: Record<string, string>): SimulationResult {
  const seed = hash(Object.values(payload).join("|") + tool);
  const tones = ["宜先稳住局面，再做判断", "先看结构，再看选择", "关系要看长期成本", "财运重在节奏与资源"];
  const tone = tones[seed % tones.length];

  if (tool === "liuyao") {
    const hexagrams = ["风泽中孚", "水火既济", "雷风恒", "山泽损", "地天泰", "泽火革"];
    return {
      title: `本次卦象：${hexagrams[seed % hexagrams.length]}`,
      summary: `你问的是「${payload.question || "当下这件事"}」。当前卦象提示：${tone}。`,
      sections: [
        {
          title: "局势判断",
          body: "事情并非完全没有机会，但关键不在情绪强弱，而在信息是否透明、资源是否到位。"
        },
        {
          title: "行动建议",
          body: "未来 7 天先做一次小范围验证，不建议立刻押上全部资源或情绪。"
        },
        {
          title: "预约交付",
          body: "正式六爻服务会围绕一件事展开，给出短周期趋势、阻力、可行动作与风险提醒。"
        }
      ],
      cta: "预约 ¥699 六爻测事"
    };
  }

  if (tool === "match") {
    const score = 62 + (seed % 25);
    return {
      title: `合盘匹配度参考：${score}%`,
      summary: "这段关系有吸引力，也有现实磨合成本。真正要看的不是热度，而是长期相处能否稳定。",
      sections: [
        {
          title: "关系优势",
          body: "彼此在情绪补位和资源互助上有空间，适合把期待说清楚。"
        },
        {
          title: "核心矛盾",
          body: "容易因为安全感、边界和现实节奏不同而反复拉扯。"
        },
        {
          title: "预约交付",
          body: "完整合盘会结合双方命盘结构、关系阶段与未来三年节奏给出建议。"
        }
      ],
      cta: "预约 ¥1999 情感合盘"
    };
  }

  if (tool === "naming") {
    return {
      title: "方案方向：稳中有生，重音形义",
      summary: "取名/择吉不只看好听，也要看命盘结构、家庭期待和现实使用场景。",
      sections: [
        {
          title: "命名方向",
          body: "宜用温润、清朗、含生发之意的字，避免过重、过燥、过锋利。"
        },
        {
          title: "择吉方向",
          body: "优先避开冲克明显的日子，再结合实际排期与家庭便利。"
        },
        {
          title: "预约交付",
          body: "完整服务会生成多组方案，并说明每个方案的取舍逻辑。"
        }
      ],
      cta: "预约取名 / 择吉"
    };
  }

  return {
    title: "命盘初步结构已生成",
    summary: "你的命盘更适合做长期规划，而不是只看单点运势。事业、婚恋和财运需要一起判断。",
    sections: [
      {
        title: "性格底层",
        body: "你做选择时重视确定性，也容易因为想太多而延迟行动。"
      },
      {
        title: "事业财运",
        body: "适合把能力产品化，靠专业、资源和长期信用获得回报。"
      },
      {
        title: "预约交付",
        body: "命盘详批会完整分析原局喜忌、十神格局、事业财运、婚恋模式与大运走势。"
      }
    ],
    cta: "预约 ¥3999 命盘详批"
  };
}

function hash(value: string) {
  let result = 0;
  for (let index = 0; index < value.length; index += 1) {
    result = (result * 31 + value.charCodeAt(index)) >>> 0;
  }
  return result;
}
