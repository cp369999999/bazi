import type { InteractiveCopy, ToolKey } from "./i18n";

export interface SimulationResult {
  title: string;
  summary: string;
  sections: { title: string; body: string }[];
  cta: string;
}

export function simulateConsultation(
  tool: ToolKey,
  payload: Record<string, string>,
  copy: InteractiveCopy
): SimulationResult {
  const seed = hash(Object.values(payload).join("|") + tool);
  const tone = copy.tones[seed % copy.tones.length] ?? copy.tones[0] ?? "";
  const resultCopy = copy.resultCopy[tool];

  if (tool === "liuyao") {
    const hexagrams = resultCopy.hexagrams ?? [];
    const hexagram = hexagrams[seed % hexagrams.length] ?? resultCopy.title;
    const subject = payload.question || resultCopy.defaultSubject;
    return {
      title: `${resultCopy.title}: ${hexagram}`,
      summary: `${subject} - ${resultCopy.summary}: ${tone}.`,
      sections: resultCopy.sections,
      cta: resultCopy.cta
    };
  }

  if (tool === "match") {
    const score = 62 + (seed % 25);
    return {
      title: `${resultCopy.title}: ${score}%`,
      summary: resultCopy.summary,
      sections: resultCopy.sections,
      cta: resultCopy.cta
    };
  }

  return {
    title: resultCopy.title,
    summary: resultCopy.summary,
    sections: resultCopy.sections,
    cta: resultCopy.cta
  };
}

function hash(value: string) {
  let result = 0;
  for (let index = 0; index < value.length; index += 1) {
    result = (result * 31 + value.charCodeAt(index)) >>> 0;
  }
  return result;
}
