export type LanguageCode = "zh-CN" | "zh-TW" | "en" | "ja" | "ko" | "vi";
export type ToolKey = "liuyao" | "bazi" | "match" | "naming";

export const languageStorageKey = "santen_language";
export const defaultLanguage: LanguageCode = "zh-CN";

export const languages: { code: LanguageCode; label: string; short: string; htmlLang: string }[] = [
  { code: "zh-CN", label: "简体中文", short: "简", htmlLang: "zh-CN" },
  { code: "zh-TW", label: "繁體中文", short: "繁", htmlLang: "zh-Hant" },
  { code: "en", label: "English", short: "EN", htmlLang: "en" },
  { code: "ja", label: "日本語", short: "日", htmlLang: "ja" },
  { code: "ko", label: "한국어", short: "한", htmlLang: "ko" },
  { code: "vi", label: "Tiếng Việt", short: "VI", htmlLang: "vi" }
];

export interface SiteDictionary {
  brand: {
    name: string;
    positioning: string;
    founder: string;
    founderLine: string;
    slogan: string;
    subtitle: string;
    description: string;
    promise: string;
    nav: { label: string; href: string }[];
  };
  common: {
    book: string;
    delivery: string;
    contactMethods: string;
  };
  hero: {
    eyebrow: string;
    primaryCta: string;
    servicesCta: string;
    previewCta: string;
    highlights: string[];
  };
  compass: {
    eyebrow: string;
    title: string;
    body: string;
    items: string[];
    quote: string;
  };
  attitude: {
    eyebrow: string;
    items: { title: string; body: string }[];
  };
  pastLife: {
    navLabel: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    body: string;
    cards: { title: string; body: string }[];
    primaryCta: string;
    secondaryCta: string;
    note: string;
    service: { title: string; price: string; scene: string; description: string; delivery: string };
  };
  services: {
    eyebrow: string;
    title: string;
    body: string;
    items: { title: string; price: string; scene: string; description: string; delivery: string }[];
  };
  booking: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
    steps: string[];
  };
  clientCenter: {
    eyebrow: string;
    title: string;
    body: string;
    items: string[];
  };
  story: {
    eyebrow: string;
    title: string;
    founderDesc: string;
    paragraphs: string[];
    signature: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    body: string;
    items: { q: string; a: string }[];
    allowedTitle: string;
    forbiddenTitle: string;
    allowed: string[];
    forbidden: string[];
  };
  footer: {
    disclaimer: string;
    contactTitle: string;
    contactBody: string;
  };
  interactive: InteractiveCopy;
}

export interface InteractiveCopy {
  eyebrow: string;
  title: string;
  body: string;
  tools: { key: ToolKey; label: string; desc: string }[];
  placeholders: Record<ToolKey, { name: string; placeholder: string }[]>;
  submit: string;
  previewNote: string;
  resultEyebrow: string;
  emptyEyebrow: string;
  emptyTitle: string;
  emptyBody: string;
  tones: string[];
  resultCopy: Record<
    ToolKey,
    {
      hexagrams?: string[];
      title: string;
      defaultSubject: string;
      summary: string;
      sections: { title: string; body: string }[];
      cta: string;
    }
  >;
}

const nav = {
  zhCN: [
    { label: "服务项目", href: "#services" },
    { label: "预约排期", href: "#booking" },
    { label: "互动咨询", href: "#interactive" },
    { label: "品牌故事", href: "#story" },
    { label: "客户中心", href: "#client-center" },
    { label: "联系我们", href: "#contact" }
  ],
  zhTW: [
    { label: "服務項目", href: "#services" },
    { label: "預約排期", href: "#booking" },
    { label: "互動諮詢", href: "#interactive" },
    { label: "品牌故事", href: "#story" },
    { label: "客戶中心", href: "#client-center" },
    { label: "聯絡我們", href: "#contact" }
  ],
  en: [
    { label: "Services", href: "#services" },
    { label: "Booking", href: "#booking" },
    { label: "Preview", href: "#interactive" },
    { label: "Story", href: "#story" },
    { label: "Client Center", href: "#client-center" },
    { label: "Contact", href: "#contact" }
  ],
  ja: [
    { label: "サービス", href: "#services" },
    { label: "予約", href: "#booking" },
    { label: "相談プレビュー", href: "#interactive" },
    { label: "ブランド", href: "#story" },
    { label: "顧客センター", href: "#client-center" },
    { label: "お問い合わせ", href: "#contact" }
  ],
  ko: [
    { label: "서비스", href: "#services" },
    { label: "예약", href: "#booking" },
    { label: "상담 미리보기", href: "#interactive" },
    { label: "브랜드 이야기", href: "#story" },
    { label: "고객 센터", href: "#client-center" },
    { label: "문의", href: "#contact" }
  ],
  vi: [
    { label: "Dịch vụ", href: "#services" },
    { label: "Lịch hẹn", href: "#booking" },
    { label: "Tư vấn thử", href: "#interactive" },
    { label: "Câu chuyện", href: "#story" },
    { label: "Trung tâm KH", href: "#client-center" },
    { label: "Liên hệ", href: "#contact" }
  ]
};

export const dictionaries: Record<LanguageCode, SiteDictionary> = {
  "zh-CN": {
    brand: {
      name: "参命 Santen",
      positioning: "高端东方命理预约咨询",
      founder: "陈鹏",
      founderLine: "主理人陈鹏，10年命理经验。",
      slogan: "参透关系，参透财运，参透自己",
      subtitle: "专注女性情感、婚恋合盘、事业财运与关键决策咨询。预约制交付，全球可约，文稿可保存。",
      description: "参命 Santen 不做低价免费娱乐入口，也不承诺神准。我们用东方命理结构、AI 深度文稿和现实咨询语言，帮助客户看懂关系、财运与自己。",
      promise: "不制造焦虑，不恐吓客户，不给绝对化结论。所有分析仅作为自我认知、关系判断与人生规划参考。",
      nav: nav.zhCN
    },
    common: { book: "预约咨询", delivery: "交付", contactMethods: "微信 / WhatsApp / Telegram" },
    hero: {
      eyebrow: "Private Eastern Astrology Consultation",
      primaryCta: "预约高端咨询",
      servicesCta: "查看服务项目",
      previewCta: "体验交付结构",
      highlights: ["高客单预约制", "女性情感与婚恋合盘", "事业财运关键决策", "AI 文稿 + 人工交付", "微信 / WhatsApp / TG 全球可约"]
    },
    compass: {
      eyebrow: "Consulting Compass",
      title: "不是算热闹，是看结构。",
      body: "关系为什么反复拉扯，财运为什么卡在同一处，事业为什么总在关键节点犹豫。参命做的是结构洞察，不是廉价断语。",
      items: ["女性情感与婚恋合盘", "事业财运与关键决策", "命盘详批与长期规划"],
      quote: "命理不是替你做决定，而是让你更清楚：此刻该进，还是该退。"
    },
    attitude: {
      eyebrow: "Attitude",
      items: [
        { title: "高端预约制", body: "取消低端免费入口，把时间留给真正需要深度咨询的人。" },
        { title: "参考性质", body: "不承诺绝对准确，不制造恐惧，所有结论都回到现实选择。" },
        { title: "命运结构洞察", body: "看性格底层、关系模式、财运路径与关键节点。" }
      ]
    },
    pastLife: {
      navLabel: "前世今生",
      eyebrow: "Past Life Narrative",
      title: "前世今生 · 灵魂剧本推演",
      subtitle: "有些性格，不像是这一生才形成的。有些关系，也不像是偶然才遇见的。",
      body: "前世今生不是为了制造神秘感，而是用一种更深的叙事方式，帮你理解那些反复出现的人生课题、关系模式、执念、天赋和恐惧。当你看懂这些重复出现的模式，就不会再一味责怪自己。",
      cards: [
        { title: "前世能量", body: "分析你可能携带的性格惯性、执念、天赋来源与内在熟悉感。" },
        { title: "今生课题", body: "梳理这一生最重要的成长方向、事业挑战与情感模式。" },
        { title: "灵魂关系", body: "观察亲密关系、合作关系、贵人与消耗型关系的牵引模式。" },
        { title: "命运节点", body: "整理人生关键转折、流年机会、低谷期与上升期。" }
      ],
      primaryCta: "开始前世今生推演",
      secondaryCta: "生成完整灵魂报告",
      note: "本模块采用命盘结构与 AI 叙事推演，不做绝对断言，仅作为自我理解与关系复盘参考。",
      service: {
        title: "前世今生灵魂剧本报告",
        price: "¥1999",
        scene: "潜意识模式 / 关系牵引 / 人生课题",
        description: "网站特色项目，适合想理解反复关系、情绪惯性、天赋来源与人生主题的人。",
        delivery: "AI深度文稿 + 30分钟追问"
      }
    },
    services: {
      eyebrow: "Service Matrix",
      title: "服务矩阵",
      body: "围绕情感婚恋、合盘、事业财运与关键决策，提供高客单、预约制、可保存的 AI 深度文稿交付。",
      items: [
        { title: "六爻测事", price: "¥699", scene: "一事一卦，短周期 1–2 天", description: "适合情感、跳槽、合作、财运等当下具体决策。", delivery: "AI文稿生成 + 微信 / WhatsApp / TG 交付" },
        { title: "情感单项咨询", price: "¥999", scene: "单身 / 复合 / 恋爱 / 婚姻走向", description: "分析关系趋势、核心矛盾、相处方式与下一步选择。", delivery: "AI文稿 + 30分钟追问" },
        { title: "事业财运单项", price: "¥999", scene: "事业规划 / 财运趋势", description: "判断事业节奏、财富机会、适合路径与风险点。", delivery: "AI文稿 + 30分钟追问" },
        { title: "情感合盘", price: "¥1999", scene: "情侣 / 订婚 / 已婚关系匹配", description: "分析匹配度、关系结构、长期稳定性与助运建议。", delivery: "AI文稿 + 30分钟追问" },
        { title: "命盘详批", price: "¥3999", scene: "原局喜忌 / 十神格局 / 大运走势", description: "完整拆解事业财运、婚恋模式、性格底层与未来节奏。", delivery: "AI文稿 + 30分钟追问" },
        { title: "取名 / 择吉", price: "取名 ¥3999 / 择吉 ¥1999", scene: "新生儿命名 / 婚礼 / 乔迁 / 开业吉日", description: "结合命盘结构、用神偏好与现实场景生成方案。", delivery: "AI文稿 + 客户追问" }
      ]
    },
    booking: {
      eyebrow: "Booking",
      title: "预约排期",
      body: "付预约定金 ¥399 后，由助理确认排期。尾款未支付可退定金或取消预约。排期当天交付文稿，3 天内可追问一次。",
      primaryCta: "付定金预约",
      secondaryCta: "先看交付结构",
      steps: ["客户付预约定金 ¥399，助理确认排期", "测前提交生日、性别、时辰、问题与背景信息", "排期当天交付 AI 深度文稿", "客户 3 天内可追问一次，由客服整理答疑", "尾款未支付可退定金或取消预约"]
    },
    clientCenter: {
      eyebrow: "Client Center",
      title: "客户中心规划",
      body: "后续客户可在这里查看预约、下载文稿、提交追问与接收尾款提醒。当前版本先展示模块结构，方便后续接入后台。",
      items: ["我的预约", "文稿下载", "追问提交", "尾款支付提醒", "交付记录保存"]
    },
    story: {
      eyebrow: "Founder",
      title: "主理人陈鹏",
      founderDesc: "10年命理经验，长期观察关系、财富与人生选择的结构。",
      paragraphs: [
        "参命 Santen 是一个高端东方命理预约咨询品牌。我们关心的不是把一句话说得多玄，而是把一段关系、一条财运路径、一次关键决策拆解清楚。",
        "命理可以是一种结构语言。它让人知道自己为什么总被同一种关系牵动，为什么在某类机会前犹豫，为什么越到关键时刻越需要一个稳定的外部视角。"
      ],
      signature: "参透关系，参透财运，参透自己。"
    },
    faq: {
      eyebrow: "FAQ",
      title: "常见问题",
      body: "专业、克制、私密，是参命 Santen 的基本边界。",
      items: [
        { q: "为什么不做免费测算？", a: "参命 Santen 服务的是认真预约、认真面对问题的客户。高客单预约制能保证信息完整、文稿质量和交付秩序。" },
        { q: "AI 文稿怎么交付？", a: "先由系统生成结构化文稿，再按服务项目通过微信、WhatsApp 或 Telegram 交付。重要项目含一次追问。" },
        { q: "是否可以保存文稿？", a: "可以。文稿可保存，用于后续复盘。客户中心后续会支持下载、追问和尾款提醒。" },
        { q: "为什么先款后测？", a: "预约制需要排期、整理信息和占用交付时间。定金用于确认排期，尾款按项目规则支付。" },
        { q: "可以做海外客户吗？", a: "可以。服务支持全球预约，沟通与交付可使用微信、WhatsApp 或 Telegram，时间按双方排期确认。" },
        { q: "哪些内容不测？", a: "不测寿命、违法事项、前世、他人心理活动，也不提供恐吓式或绝对化结论。" }
      ],
      allowedTitle: "内容允许",
      forbiddenTitle: "内容禁止",
      allowed: ["八字格局分析", "五行喜忌", "性格底层", "婚恋匹配度", "事业财运趋势", "助运建议"],
      forbidden: ["百分百准确保证", "寿命预测", "违法事项", "前世", "他人心理活动", "迷信恐吓"]
    },
    footer: {
      disclaimer: "免责声明：本网站提供的 AI 命理、六爻测事、合盘、事业财运与命盘分析内容，仅作为自我认知、关系整理与人生规划参考，不构成医疗、法律、投资或重大人生决策建议。",
      contactTitle: "预约制服务",
      contactBody: "先定金，后排期交付。"
    },
    interactive: {
      eyebrow: "Consultation Preview",
      title: "预约前，先看交付结构",
      body: "以下为前端模拟预览，用于展示参命 Santen 的咨询语言与文稿结构。正式服务均为付费排期，不提供免费详批。",
      tools: [
        { key: "liuyao", label: "六爻测事", desc: "一事一卦，适合短周期决策。" },
        { key: "bazi", label: "命盘详批", desc: "看原局结构、喜忌与大运走势。" },
        { key: "match", label: "情感合盘", desc: "看双方匹配、矛盾与长期稳定性。" },
        { key: "naming", label: "取名 / 择吉", desc: "按命盘结构与场景生成方案方向。" }
      ],
      placeholders: {
        liuyao: [
          { name: "question", placeholder: "请输入你此刻最想问的一件事，例如：这段关系还有结果吗？这个项目能不能做？" },
          { name: "number", placeholder: "心中自然浮现的数字，例如 18、369" },
          { name: "city", placeholder: "当前所在城市，例如 深圳 / London" }
        ],
        bazi: [
          { name: "birth", placeholder: "出生日期与时间，例如 1996-12-09 13:30" },
          { name: "gender", placeholder: "性别" },
          { name: "focus", placeholder: "当前最想看的方向：事业 / 财运 / 婚恋" }
        ],
        match: [
          { name: "personA", placeholder: "你的出生信息" },
          { name: "personB", placeholder: "对方出生信息" },
          { name: "relationship", placeholder: "关系状态：恋爱 / 复合 / 订婚 / 已婚" }
        ],
        naming: [
          { name: "scene", placeholder: "取名 / 婚礼择吉 / 乔迁 / 开业" },
          { name: "birth", placeholder: "出生信息或目标日期范围" },
          { name: "preference", placeholder: "偏好、避讳、姓氏或地区习俗" }
        ]
      },
      submit: "生成预约前预览",
      previewNote: "预览不构成正式咨询结论。正式文稿长度按项目约 2000–4000 字，交付后 3 天内可追问一次。",
      resultEyebrow: "AI Draft",
      emptyEyebrow: "Private Preview",
      emptyTitle: "选择一个项目，生成预约前预览",
      emptyBody: "这里展示的是文稿结构和咨询风格。真正的高客单服务，会根据完整资料与排期交付，不把复杂人生问题做成廉价娱乐。",
      tones: ["宜先稳住局面，再做判断", "先看结构，再看选择", "关系要看长期成本", "财运重在节奏与资源"],
      resultCopy: {
        liuyao: { hexagrams: ["风泽中孚", "水火既济", "雷风恒", "山泽损", "地天泰", "泽火革"], title: "本次卦象", defaultSubject: "当下这件事", summary: "当前卦象提示", sections: [{ title: "局势判断", body: "事情并非完全没有机会，但关键不在情绪强弱，而在信息是否透明、资源是否到位。" }, { title: "行动建议", body: "未来 7 天先做一次小范围验证，不建议立刻押上全部资源或情绪。" }, { title: "预约交付", body: "正式六爻服务会围绕一件事展开，给出短周期趋势、阻力、可行动作与风险提醒。" }], cta: "预约 ¥699 六爻测事" },
        bazi: { title: "命盘初步结构已生成", defaultSubject: "完整命盘", summary: "你的命盘更适合做长期规划，而不是只看单点运势。", sections: [{ title: "性格底层", body: "你做选择时重视确定性，也容易因为想太多而延迟行动。" }, { title: "事业财运", body: "适合把能力产品化，靠专业、资源和长期信用获得回报。" }, { title: "预约交付", body: "命盘详批会完整分析原局喜忌、十神格局、事业财运、婚恋模式与大运走势。" }], cta: "预约 ¥3999 命盘详批" },
        match: { title: "合盘匹配度参考", defaultSubject: "这段关系", summary: "这段关系有吸引力，也有现实磨合成本。真正要看的不是热度，而是长期相处能否稳定。", sections: [{ title: "关系优势", body: "彼此在情绪补位和资源互助上有空间，适合把期待说清楚。" }, { title: "核心矛盾", body: "容易因为安全感、边界和现实节奏不同而反复拉扯。" }, { title: "预约交付", body: "完整合盘会结合双方命盘结构、关系阶段与未来三年节奏给出建议。" }], cta: "预约 ¥1999 情感合盘" },
        naming: { title: "方案方向：稳中有生，重音形义", defaultSubject: "取名或择吉", summary: "取名/择吉不只看好听，也要看命盘结构、家庭期待和现实使用场景。", sections: [{ title: "命名方向", body: "宜用温润、清朗、含生发之意的字，避免过重、过燥、过锋利。" }, { title: "择吉方向", body: "优先避开冲克明显的日子，再结合实际排期与家庭便利。" }, { title: "预约交付", body: "完整服务会生成多组方案，并说明每个方案的取舍逻辑。" }], cta: "预约取名 / 择吉" }
      }
    }
  },
  "zh-TW": {
    brand: {
      name: "參命 Santen",
      positioning: "高端東方命理預約諮詢",
      founder: "陳鵬",
      founderLine: "主理人陳鵬，10年命理經驗。",
      slogan: "參透關係，參透財運，參透自己",
      subtitle: "專注女性情感、婚戀合盤、事業財運與關鍵決策諮詢。預約制交付，全球可約，文稿可保存。",
      description: "參命 Santen 不做低價免費娛樂入口，也不承諾神準。我們用東方命理結構、AI 深度文稿和現實諮詢語言，幫助客戶看懂關係、財運與自己。",
      promise: "不製造焦慮，不恐嚇客戶，不給絕對化結論。所有分析僅作為自我認知、關係判斷與人生規劃參考。",
      nav: nav.zhTW
    },
    common: { book: "預約諮詢", delivery: "交付", contactMethods: "微信 / WhatsApp / Telegram" },
    hero: { eyebrow: "Private Eastern Astrology Consultation", primaryCta: "預約高端諮詢", servicesCta: "查看服務項目", previewCta: "體驗交付結構", highlights: ["高客單預約制", "女性情感與婚戀合盤", "事業財運關鍵決策", "AI 文稿 + 人工交付", "微信 / WhatsApp / TG 全球可約"] },
    compass: { eyebrow: "Consulting Compass", title: "不是算熱鬧，是看結構。", body: "關係為什麼反覆拉扯，財運為什麼卡在同一處，事業為什麼總在關鍵節點猶豫。參命做的是結構洞察，不是廉價斷語。", items: ["女性情感與婚戀合盤", "事業財運與關鍵決策", "命盤詳批與長期規劃"], quote: "命理不是替你做決定，而是讓你更清楚：此刻該進，還是該退。" },
    attitude: { eyebrow: "Attitude", items: [{ title: "高端預約制", body: "取消低端免費入口，把時間留給真正需要深度諮詢的人。" }, { title: "參考性質", body: "不承諾絕對準確，不製造恐懼，所有結論都回到現實選擇。" }, { title: "命運結構洞察", body: "看性格底層、關係模式、財運路徑與關鍵節點。" }] },
    pastLife: {
      navLabel: "前世今生",
      eyebrow: "Past Life Narrative",
      title: "前世今生 · 靈魂劇本推演",
      subtitle: "有些性格，不像是這一生才形成的。有些關係，也不像是偶然才遇見的。",
      body: "前世今生不是為了製造神秘感，而是用一種更深的敘事方式，幫你理解那些反覆出現的人生課題、關係模式、執念、天賦和恐懼。當你看懂這些重複出現的模式，就不會再一味責怪自己。",
      cards: [
        { title: "前世能量", body: "分析你可能攜帶的性格慣性、執念、天賦來源與內在熟悉感。" },
        { title: "今生課題", body: "梳理這一生最重要的成長方向、事業挑戰與情感模式。" },
        { title: "靈魂關係", body: "觀察親密關係、合作關係、貴人與消耗型關係的牽引模式。" },
        { title: "命運節點", body: "整理人生關鍵轉折、流年機會、低谷期與上升期。" }
      ],
      primaryCta: "開始前世今生推演",
      secondaryCta: "生成完整靈魂報告",
      note: "本模組採用命盤結構與 AI 敘事推演，不做絕對斷言，僅作為自我理解與關係復盤參考。",
      service: {
        title: "前世今生靈魂劇本報告",
        price: "¥1999",
        scene: "潛意識模式 / 關係牽引 / 人生課題",
        description: "網站特色項目，適合想理解反覆關係、情緒慣性、天賦來源與人生主題的人。",
        delivery: "AI深度文稿 + 30分鐘追問"
      }
    },
    services: {
      eyebrow: "Service Matrix",
      title: "服務矩陣",
      body: "圍繞情感婚戀、合盤、事業財運與關鍵決策，提供高客單、預約制、可保存的 AI 深度文稿交付。",
      items: [
        { title: "六爻測事", price: "¥699", scene: "一事一卦，短週期 1–2 天", description: "適合情感、跳槽、合作、財運等當下具體決策。", delivery: "AI文稿生成 + 微信 / WhatsApp / TG 交付" },
        { title: "情感單項諮詢", price: "¥999", scene: "單身 / 復合 / 戀愛 / 婚姻走向", description: "分析關係趨勢、核心矛盾、相處方式與下一步選擇。", delivery: "AI文稿 + 30分鐘追問" },
        { title: "事業財運單項", price: "¥999", scene: "事業規劃 / 財運趨勢", description: "判斷事業節奏、財富機會、適合路徑與風險點。", delivery: "AI文稿 + 30分鐘追問" },
        { title: "情感合盤", price: "¥1999", scene: "情侶 / 訂婚 / 已婚關係匹配", description: "分析匹配度、關係結構、長期穩定性與助運建議。", delivery: "AI文稿 + 30分鐘追問" },
        { title: "命盤詳批", price: "¥3999", scene: "原局喜忌 / 十神格局 / 大運走勢", description: "完整拆解事業財運、婚戀模式、性格底層與未來節奏。", delivery: "AI文稿 + 30分鐘追問" },
        { title: "取名 / 擇吉", price: "取名 ¥3999 / 擇吉 ¥1999", scene: "新生兒命名 / 婚禮 / 喬遷 / 開業吉日", description: "結合命盤結構、用神偏好與現實場景生成方案。", delivery: "AI文稿 + 客戶追問" }
      ]
    },
    booking: { eyebrow: "Booking", title: "預約排期", body: "付預約定金 ¥399 後，由助理確認排期。尾款未支付可退定金或取消預約。排期當天交付文稿，3 天內可追問一次。", primaryCta: "付定金預約", secondaryCta: "先看交付結構", steps: ["客戶付預約定金 ¥399，助理確認排期", "測前提交生日、性別、時辰、問題與背景資訊", "排期當天交付 AI 深度文稿", "客戶 3 天內可追問一次，由客服整理答疑", "尾款未支付可退定金或取消預約"] },
    clientCenter: { eyebrow: "Client Center", title: "客戶中心規劃", body: "後續客戶可在這裡查看預約、下載文稿、提交追問與接收尾款提醒。當前版本先展示模組結構，方便後續接入後台。", items: ["我的預約", "文稿下載", "追問提交", "尾款支付提醒", "交付記錄保存"] },
    story: { eyebrow: "Founder", title: "主理人陳鵬", founderDesc: "10年命理經驗，長期觀察關係、財富與人生選擇的結構。", paragraphs: ["參命 Santen 是一個高端東方命理預約諮詢品牌。我們關心的不是把一句話說得多玄，而是把一段關係、一條財運路徑、一次關鍵決策拆解清楚。", "命理可以是一種結構語言。它讓人知道自己為什麼總被同一種關係牽動，為什麼在某類機會前猶豫，為什麼越到關鍵時刻越需要一個穩定的外部視角。"], signature: "參透關係，參透財運，參透自己。" },
    faq: { eyebrow: "FAQ", title: "常見問題", body: "專業、克制、私密，是參命 Santen 的基本邊界。", items: [{ q: "為什麼不做免費測算？", a: "參命 Santen 服務的是認真預約、認真面對問題的客戶。高客單預約制能保證資訊完整、文稿品質和交付秩序。" }, { q: "AI 文稿怎麼交付？", a: "先由系統生成結構化文稿，再按服務項目通過微信、WhatsApp 或 Telegram 交付。重要項目含一次追問。" }, { q: "是否可以保存文稿？", a: "可以。文稿可保存，用於後續復盤。客戶中心後續會支持下載、追問和尾款提醒。" }, { q: "為什麼先款後測？", a: "預約制需要排期、整理資訊和佔用交付時間。定金用於確認排期，尾款按項目規則支付。" }, { q: "可以做海外客戶嗎？", a: "可以。服務支持全球預約，溝通與交付可使用微信、WhatsApp 或 Telegram，時間按雙方排期確認。" }, { q: "哪些內容不測？", a: "不測壽命、違法事項、前世、他人心理活動，也不提供恐嚇式或絕對化結論。" }], allowedTitle: "內容允許", forbiddenTitle: "內容禁止", allowed: ["八字格局分析", "五行喜忌", "性格底層", "婚戀匹配度", "事業財運趨勢", "助運建議"], forbidden: ["百分百準確保證", "壽命預測", "違法事項", "前世", "他人心理活動", "迷信恐嚇"] },
    footer: { disclaimer: "免責聲明：本網站提供的 AI 命理、六爻測事、合盤、事業財運與命盤分析內容，僅作為自我認知、關係整理與人生規劃參考，不構成醫療、法律、投資或重大人生決策建議。", contactTitle: "預約制服務", contactBody: "先定金，後排期交付。" },
    interactive: makeTraditionalInteractive()
  },
  en: {
    brand: {
      name: "Santen",
      positioning: "Premium Eastern Astrology Consultation",
      founder: "Chen Peng",
      founderLine: "Founded by Chen Peng, with 10 years of astrology consulting experience.",
      slogan: "Understand relationships, wealth, and yourself",
      subtitle: "Focused on women’s relationships, marriage compatibility, career wealth, and key life decisions. Appointment-only delivery, available worldwide, with saved written reports.",
      description: "Santen is not a free entertainment tool and does not promise absolute accuracy. We combine Eastern destiny structures, AI-assisted long-form reports, and practical consulting language.",
      promise: "We do not create fear, pressure, or absolute claims. Every analysis is for self-understanding, relationship review, and life planning reference.",
      nav: nav.en
    },
    common: { book: "Book Consultation", delivery: "Delivery", contactMethods: "WeChat / WhatsApp / Telegram" },
    hero: { eyebrow: "Private Eastern Astrology Consultation", primaryCta: "Book Premium Consultation", servicesCta: "View Services", previewCta: "Preview Delivery", highlights: ["Premium appointment only", "Women’s love & compatibility", "Career and wealth decisions", "AI report + human delivery", "Worldwide via WeChat / WhatsApp / TG"] },
    compass: { eyebrow: "Consulting Compass", title: "Not fortune-telling for fun. We read structure.", body: "Why relationships repeat, why wealth gets stuck, and why career choices become hesitant at key moments. Santen looks at structure, not cheap predictions.", items: ["Love and marriage compatibility", "Career wealth decisions", "Full chart and long-term planning"], quote: "Astrology is not here to decide for you. It helps you see whether this moment asks you to move forward or step back." },
    attitude: { eyebrow: "Attitude", items: [{ title: "Premium Booking", body: "No free low-end entry. Time is reserved for clients who need serious, private consultation." }, { title: "Reference Only", body: "No absolute promises, no fear language. Every conclusion returns to real choices." }, { title: "Destiny Structure", body: "We read personality foundations, relationship patterns, wealth paths, and turning points." }] },
    pastLife: {
      navLabel: "Past Life",
      eyebrow: "Past Life Narrative",
      title: "Past Life & Present Life · Soul Script Reading",
      subtitle: "Some personality patterns feel older than this lifetime. Some relationships do not feel accidental.",
      body: "This module is not built to create superstition. It uses chart structure and AI narrative analysis to help you understand repeated life themes, relationship patterns, attachments, talents, and fears.",
      cards: [
        { title: "Past-Life Energy", body: "Reads recurring temperaments, attachments, familiar talents, and emotional instincts." },
        { title: "Present-Life Lesson", body: "Clarifies the main growth direction, career challenge, and relationship pattern of this life." },
        { title: "Soul Relationships", body: "Reviews intimacy, partnership, supporters, and draining relationships through a narrative lens." },
        { title: "Destiny Nodes", body: "Maps turning points, yearly openings, low periods, and rising phases." }
      ],
      primaryCta: "Start Soul Script Reading",
      secondaryCta: "Generate Full Soul Report",
      note: "This module uses chart structure and AI narrative reasoning. It is for self-understanding and relationship review, not absolute prediction.",
      service: {
        title: "Past Life & Soul Script Report",
        price: "¥1999",
        scene: "Subconscious patterns / relationship pull / life themes",
        description: "A signature Santen report for clients who want to understand recurring relationships, emotional inertia, talents, and life themes.",
        delivery: "AI deep report + 30-minute follow-up"
      }
    },
    services: {
      eyebrow: "Service Matrix",
      title: "Services",
      body: "Premium appointment-based reports for relationships, compatibility, career wealth, and important decisions.",
      items: [
        { title: "Liu Yao Decision Reading", price: "¥699", scene: "One question, one hexagram, 1–2 day cycle", description: "Best for relationship, job change, partnership, and short-term financial decisions.", delivery: "AI report + WeChat / WhatsApp / TG delivery" },
        { title: "Single Love Consultation", price: "¥999", scene: "Single, reunion, dating, marriage direction", description: "Reviews relationship trend, core conflict, communication style, and next step.", delivery: "AI report + 30-minute follow-up" },
        { title: "Career & Wealth Reading", price: "¥999", scene: "Career planning / wealth trend", description: "Looks at career timing, money opportunities, suitable path, and risk points.", delivery: "AI report + 30-minute follow-up" },
        { title: "Relationship Compatibility", price: "¥1999", scene: "Couples / engaged / married", description: "Analyzes compatibility, relationship structure, stability, and supportive advice.", delivery: "AI report + 30-minute follow-up" },
        { title: "Full Destiny Chart", price: "¥3999", scene: "Original chart / ten gods / luck cycles", description: "Full reading of career, wealth, relationship pattern, personality foundation, and long-term timing.", delivery: "AI report + 30-minute follow-up" },
        { title: "Naming / Auspicious Date", price: "Naming ¥3999 / Date ¥1999", scene: "Baby naming / wedding / moving / opening", description: "Plans options based on chart structure, favorable elements, and real-world use.", delivery: "AI report + client follow-up" }
      ]
    },
    booking: { eyebrow: "Booking", title: "Appointment Flow", body: "Pay a ¥399 deposit first. An assistant confirms the schedule. If the balance is not paid, the deposit can be refunded or the booking cancelled. Reports are delivered on the scheduled day, with one follow-up within 3 days.", primaryCta: "Pay Deposit", secondaryCta: "Preview Delivery", steps: ["Pay ¥399 deposit and confirm schedule", "Submit birth data, gender, time, question, and background", "Receive the AI-assisted deep report on delivery day", "One follow-up within 3 days, organized by support", "Balance unpaid: refund deposit or cancel booking"] },
    clientCenter: { eyebrow: "Client Center", title: "Client Center Plan", body: "Clients will later view bookings, download reports, submit follow-ups, and receive balance reminders here. This version displays the structure for future backend connection.", items: ["My Bookings", "Report Download", "Follow-up", "Balance Reminder", "Delivery Records"] },
    story: { eyebrow: "Founder", title: "Chen Peng", founderDesc: "10 years of astrology consulting experience, observing relationships, wealth, and the structure behind life choices.", paragraphs: ["Santen is a premium Eastern astrology consulting brand. We care less about sounding mysterious and more about making a relationship, a wealth path, or a decision structure clear.", "Destiny work can be a structural language. It helps people see why the same relationship pattern returns, why certain opportunities cause hesitation, and why a stable outside perspective matters at key moments."], signature: "Understand relationships, wealth, and yourself." },
    faq: { eyebrow: "FAQ", title: "FAQ", body: "Professional, restrained, and private. That is the boundary of Santen.", items: [{ q: "Why no free reading?", a: "Santen serves clients who are ready for serious private consultation. Premium booking protects information quality, writing depth, and delivery order." }, { q: "How are AI reports delivered?", a: "The system first creates a structured report, then it is delivered through WeChat, WhatsApp, or Telegram according to the service type." }, { q: "Can I save the report?", a: "Yes. Reports can be saved for later review. The client center will support downloads and follow-up tracking." }, { q: "Why pay first?", a: "Appointment-based work requires scheduling, information preparation, and delivery time. The deposit confirms the slot." }, { q: "Do you serve overseas clients?", a: "Yes. Global booking is supported through WeChat, WhatsApp, or Telegram." }, { q: "What do you not read?", a: "We do not read lifespan, illegal matters, past lives, another person’s inner thoughts, or fear-based claims." }], allowedTitle: "Allowed", forbiddenTitle: "Not Provided", allowed: ["Bazi structure", "Five element balance", "Personality foundation", "Compatibility", "Career wealth trend", "Supportive advice"], forbidden: ["100% guarantee", "Lifespan prediction", "Illegal matters", "Past lives", "Mind reading", "Fear-based claims"] },
    footer: { disclaimer: "Disclaimer: AI astrology, Liu Yao, compatibility, career wealth, and chart readings are for self-understanding, emotional organization, and life planning reference only. They are not medical, legal, investment, or major life decision advice.", contactTitle: "Appointment-only service", contactBody: "Deposit first, then scheduled delivery." },
    interactive: makeEnglishInteractive()
  },
  get ja() {
    return makeJapaneseDictionary();
  },
  get ko() {
    return makeKoreanDictionary();
  },
  get vi() {
    return makeVietnameseDictionary();
  }
};

function makeTraditionalInteractive(): InteractiveCopy {
  return {
    eyebrow: "Consultation Preview",
    title: "預約前，先看交付結構",
    body: "以下為前端模擬預覽，用於展示參命 Santen 的諮詢語言與文稿結構。正式服務均為付費排期，不提供免費詳批。",
    tools: [
      { key: "liuyao", label: "六爻測事", desc: "一事一卦，適合短週期決策。" },
      { key: "bazi", label: "命盤詳批", desc: "看原局結構、喜忌與大運走勢。" },
      { key: "match", label: "情感合盤", desc: "看雙方匹配、矛盾與長期穩定性。" },
      { key: "naming", label: "取名 / 擇吉", desc: "按命盤結構與場景生成方案方向。" }
    ],
    placeholders: {
      liuyao: [
        { name: "question", placeholder: "請輸入你此刻最想問的一件事，例如：這段關係還有結果嗎？這個項目能不能做？" },
        { name: "number", placeholder: "心中自然浮現的數字，例如 18、369" },
        { name: "city", placeholder: "當前所在城市，例如 深圳 / London" }
      ],
      bazi: [
        { name: "birth", placeholder: "出生日期與時間，例如 1996-12-09 13:30" },
        { name: "gender", placeholder: "性別" },
        { name: "focus", placeholder: "當前最想看的方向：事業 / 財運 / 婚戀" }
      ],
      match: [
        { name: "personA", placeholder: "你的出生資訊" },
        { name: "personB", placeholder: "對方出生資訊" },
        { name: "relationship", placeholder: "關係狀態：戀愛 / 復合 / 訂婚 / 已婚" }
      ],
      naming: [
        { name: "scene", placeholder: "取名 / 婚禮擇吉 / 喬遷 / 開業" },
        { name: "birth", placeholder: "出生資訊或目標日期範圍" },
        { name: "preference", placeholder: "偏好、避諱、姓氏或地區習俗" }
      ]
    },
    submit: "生成預約前預覽",
    previewNote: "預覽不構成正式諮詢結論。正式文稿長度按項目約 2000–4000 字，交付後 3 天內可追問一次。",
    resultEyebrow: "AI Draft",
    emptyEyebrow: "Private Preview",
    emptyTitle: "選擇一個項目，生成預約前預覽",
    emptyBody: "這裡展示的是文稿結構和諮詢風格。真正的高客單服務，會根據完整資料與排期交付，不把複雜人生問題做成廉價娛樂。",
    tones: ["宜先穩住局面，再做判斷", "先看結構，再看選擇", "關係要看長期成本", "財運重在節奏與資源"],
    resultCopy: {
      liuyao: { hexagrams: ["風澤中孚", "水火既濟", "雷風恆", "山澤損", "地天泰", "澤火革"], title: "本次卦象", defaultSubject: "當下這件事", summary: "當前卦象提示", sections: [{ title: "局勢判斷", body: "事情並非完全沒有機會，但關鍵不在情緒強弱，而在資訊是否透明、資源是否到位。" }, { title: "行動建議", body: "未來 7 天先做一次小範圍驗證，不建議立刻押上全部資源或情緒。" }, { title: "預約交付", body: "正式六爻服務會圍繞一件事展開，給出短週期趨勢、阻力、可行動作與風險提醒。" }], cta: "預約 ¥699 六爻測事" },
      bazi: { title: "命盤初步結構已生成", defaultSubject: "完整命盤", summary: "你的命盤更適合做長期規劃，而不是只看單點運勢。", sections: [{ title: "性格底層", body: "你做選擇時重視確定性，也容易因為想太多而延遲行動。" }, { title: "事業財運", body: "適合把能力產品化，靠專業、資源和長期信用獲得回報。" }, { title: "預約交付", body: "命盤詳批會完整分析原局喜忌、十神格局、事業財運、婚戀模式與大運走勢。" }], cta: "預約 ¥3999 命盤詳批" },
      match: { title: "合盤匹配度參考", defaultSubject: "這段關係", summary: "這段關係有吸引力，也有現實磨合成本。真正要看的不是熱度，而是長期相處能否穩定。", sections: [{ title: "關係優勢", body: "彼此在情緒補位和資源互助上有空間，適合把期待說清楚。" }, { title: "核心矛盾", body: "容易因為安全感、邊界和現實節奏不同而反覆拉扯。" }, { title: "預約交付", body: "完整合盤會結合雙方命盤結構、關係階段與未來三年節奏給出建議。" }], cta: "預約 ¥1999 情感合盤" },
      naming: { title: "方案方向：穩中有生，重音形義", defaultSubject: "取名或擇吉", summary: "取名/擇吉不只看好聽，也要看命盤結構、家庭期待和現實使用場景。", sections: [{ title: "命名方向", body: "宜用溫潤、清朗、含生發之意的字，避免過重、過燥、過鋒利。" }, { title: "擇吉方向", body: "優先避開沖克明顯的日子，再結合實際排期與家庭便利。" }, { title: "預約交付", body: "完整服務會生成多組方案，並說明每個方案的取捨邏輯。" }], cta: "預約取名 / 擇吉" }
    }
  };
}

function makeEnglishInteractive(): InteractiveCopy {
  return {
    eyebrow: "Consultation Preview",
    title: "Preview the delivery before booking",
    body: "This is a front-end simulation that shows the consulting language and report structure. Formal services are paid and appointment-based.",
    tools: [
      { key: "liuyao", label: "Liu Yao Reading", desc: "One question, one hexagram for short-term decisions." },
      { key: "bazi", label: "Full Chart", desc: "Original chart, favorable elements, and luck cycles." },
      { key: "match", label: "Compatibility", desc: "Compatibility, conflicts, and long-term stability." },
      { key: "naming", label: "Naming / Date", desc: "Plans naming or auspicious date directions." }
    ],
    placeholders: {
      liuyao: [{ name: "question", placeholder: "Enter one specific question, e.g. Is this relationship still possible?" }, { name: "number", placeholder: "A number that appears naturally, e.g. 18 or 369" }, { name: "city", placeholder: "Current city, e.g. Singapore / London" }],
      bazi: [{ name: "birth", placeholder: "Birth date and time, e.g. 1996-12-09 13:30" }, { name: "gender", placeholder: "Gender" }, { name: "focus", placeholder: "Main focus: career / wealth / relationship" }],
      match: [{ name: "personA", placeholder: "Your birth information" }, { name: "personB", placeholder: "Partner’s birth information" }, { name: "relationship", placeholder: "Status: dating / reunion / engaged / married" }],
      naming: [{ name: "scene", placeholder: "Naming / wedding date / moving / opening" }, { name: "birth", placeholder: "Birth data or target date range" }, { name: "preference", placeholder: "Preferences, taboos, surname, or local customs" }]
    },
    submit: "Generate Preview",
    previewNote: "This preview is not a formal consultation conclusion. Formal reports are about 2000–4000 words, with one follow-up within 3 days.",
    resultEyebrow: "AI Draft",
    emptyEyebrow: "Private Preview",
    emptyTitle: "Choose a service to preview",
    emptyBody: "This area shows report structure and consulting style. Full services are delivered after complete information and scheduling.",
    tones: ["stabilize first, then decide", "read the structure before choosing", "relationships require long-term cost awareness", "wealth depends on timing and resources"],
    resultCopy: {
      liuyao: { hexagrams: ["Wind over Lake", "Water over Fire", "Thunder over Wind", "Mountain over Lake", "Earth over Heaven", "Lake over Fire"], title: "Current hexagram", defaultSubject: "this matter", summary: "The hexagram suggests", sections: [{ title: "Situation", body: "The matter is not closed, but the key is not emotional intensity. It is whether information and resources are clear." }, { title: "Action", body: "Within the next 7 days, test on a small scale before investing all resources or emotions." }, { title: "Delivery", body: "A formal Liu Yao reading focuses on one matter and gives trend, resistance, action, and risk reminders." }], cta: "Book ¥699 Liu Yao Reading" },
      bazi: { title: "Initial chart structure generated", defaultSubject: "full chart", summary: "Your chart is better read through long-term planning rather than single-point luck.", sections: [{ title: "Personality", body: "You value certainty when choosing, and may delay action when thinking too much." }, { title: "Career & Wealth", body: "You are suited to productizing skills and earning through expertise, resources, and long-term credibility." }, { title: "Delivery", body: "The full chart reading covers original structure, favorable elements, career wealth, relationship patterns, and luck cycles." }], cta: "Book ¥3999 Full Chart" },
      match: { title: "Compatibility reference", defaultSubject: "this relationship", summary: "There is attraction here, but also real-world adjustment cost. The key is not heat, but stability.", sections: [{ title: "Strength", body: "There is room for emotional complement and resource support if expectations are clearly spoken." }, { title: "Conflict", body: "Security, boundaries, and different life pacing may create repeated tension." }, { title: "Delivery", body: "A full compatibility report combines both charts, relationship stage, and future timing." }], cta: "Book ¥1999 Compatibility" },
      naming: { title: "Direction: stable, warm, and meaningful", defaultSubject: "naming or date selection", summary: "Naming or date selection should consider chart structure, family expectation, and real-world use.", sections: [{ title: "Naming", body: "Use gentle, clear, growth-oriented characters; avoid overly heavy, dry, or sharp tones." }, { title: "Date", body: "Avoid obviously conflicting days first, then match practical family scheduling." }, { title: "Delivery", body: "Full service provides multiple options and explains the logic behind each choice." }], cta: "Book Naming / Date Selection" }
    }
  };
}

function makeJapaneseDictionary(): SiteDictionary {
  const en = dictionaries.en;
  return {
    ...en,
    brand: { name: "参命 Santen", positioning: "高級東洋命理 予約制コンサルティング", founder: "陳鵬", founderLine: "主宰者・陳鵬。10年の命理相談経験。", slogan: "関係を読み、財運を読み、自分を読む", subtitle: "女性の恋愛、結婚相性、仕事と財運、重要な決断に特化した予約制コンサルティング。世界中から予約可能、レポート保存可。", description: "Santen は無料の娯楽ツールではありません。東洋命理の構造、AI支援レポート、現実的な相談言語で関係・財運・自己理解を支えます。", promise: "不安を煽らず、絶対的な断言もしません。すべての分析は自己理解、関係整理、人生設計の参考です。", nav: nav.ja },
    common: { book: "予約相談", delivery: "納品", contactMethods: "WeChat / WhatsApp / Telegram" },
    hero: { eyebrow: "Private Eastern Astrology Consultation", primaryCta: "高級相談を予約", servicesCta: "サービスを見る", previewCta: "納品構成を見る", highlights: ["高単価・予約制", "女性の恋愛と相性", "仕事と財運の決断", "AI文稿 + 人による納品", "世界対応"] },
    compass: { eyebrow: "Consulting Compass", title: "ただ占うのではなく、構造を読む。", body: "なぜ関係が繰り返すのか、なぜ財運が止まるのか、なぜ仕事の節目で迷うのか。Santen は安い断言ではなく構造を見ます。", items: ["恋愛と結婚相性", "仕事・財運の決断", "命盤詳批と長期計画"], quote: "命理はあなたの代わりに決めるものではありません。今進むべきか、退くべきかを見やすくするものです。" },
    attitude: { eyebrow: "Attitude", items: [{ title: "高級予約制", body: "無料の低価格入口をなくし、本当に深い相談が必要な方に時間を使います。" }, { title: "参考として", body: "絶対の的中を約束せず、恐怖を作らず、現実の選択に戻します。" }, { title: "運命構造の洞察", body: "性格の土台、関係パターン、財運の道筋、転機を読みます。" }] },
    pastLife: {
      ...en.pastLife,
      navLabel: "前世今生",
      title: "前世今生 · 魂の脚本リーディング",
      subtitle: "ある性格は、この人生だけで形成されたものに見えません。ある関係も、偶然だけでは説明しにくいものです。",
      body: "前世今生は神秘を売るためではなく、繰り返される人生課題、関係パターン、執着、才能、恐れを深い物語として理解するためのモジュールです。",
      cards: [
        { title: "前世のエネルギー", body: "持ち越しているように見える性格の癖、執着、才能、内なる既視感を読みます。" },
        { title: "今生の課題", body: "今世で育てるべき方向、仕事の挑戦、感情パターンを整理します。" },
        { title: "魂の関係", body: "親密な関係、協力者、支援者、消耗する関係の引力を見ます。" },
        { title: "運命の節目", body: "人生の転機、流年の機会、低迷期と上昇期を整理します。" }
      ],
      primaryCta: "前世今生を始める",
      secondaryCta: "完全な魂レポートを生成",
      note: "命盤構造と AI の物語推演を用いた自己理解の参考であり、絶対的な断言ではありません。",
      service: {
        title: "前世今生・魂の脚本レポート",
        price: "¥1999",
        scene: "潜在意識パターン / 関係の引力 / 人生テーマ",
        description: "繰り返す関係、感情の癖、才能の源、人生テーマを理解したい方のための Santen 特色レポート。",
        delivery: "AI深度レポート + 30分フォローアップ"
      }
    },
    services: { ...en.services, title: "サービス", body: "恋愛、相性、仕事・財運、重要な決断に向けた高級予約制レポート。", items: en.services.items },
    booking: { ...en.booking, title: "予約の流れ", body: "予約金 ¥399 をお支払い後、アシスタントが日程を確認します。残金未払いの場合は予約金返金またはキャンセル可能です。", primaryCta: "予約金を支払う", secondaryCta: "納品構成を見る" },
    clientCenter: { ...en.clientCenter, title: "顧客センター構想", body: "今後、予約確認、文稿ダウンロード、追問提出、残金通知をここで管理できます。", items: ["予約", "文稿ダウンロード", "追問", "残金通知", "納品記録"] },
    story: { eyebrow: "Founder", title: "主理人 陳鵬", founderDesc: "10年の命理経験。関係、財運、人生選択の構造を長く観察。", paragraphs: ["Santen は高級東洋命理の予約制相談ブランドです。神秘的に聞こえる言葉より、関係、財運、決断の構造を明確にすることを大切にします。", "命理は構造を読む言語です。同じ関係パターンが戻る理由、機会の前で迷う理由、節目に外部視点が必要な理由を見せてくれます。"], signature: "関係を読み、財運を読み、自分を読む。" },
    faq: { ...en.faq, title: "よくある質問", body: "専門性、抑制、プライバシー。それが Santen の境界です。" },
    footer: { disclaimer: "免責事項：AI命理、六爻、相性、仕事・財運、命盤分析は自己理解と人生設計の参考であり、医療・法律・投資・重大な人生決定の助言ではありません。", contactTitle: "予約制サービス", contactBody: "予約金の後、日程を組んで納品します。" },
    interactive: { ...makeEnglishInteractive(), title: "予約前に納品構成を見る", body: "これは相談文体とレポート構造を示すフロントエンドのプレビューです。正式サービスは有料予約制です。", submit: "プレビュー生成", emptyTitle: "サービスを選んでプレビュー", emptyBody: "ここでは文稿構造と相談スタイルを表示します。正式サービスは完全な情報と日程確定後に納品されます。" }
  };
}

function makeKoreanDictionary(): SiteDictionary {
  const en = dictionaries.en;
  return {
    ...en,
    brand: { name: "참명 Santen", positioning: "프리미엄 동양 명리 예약 상담", founder: "천펑", founderLine: "주관자 천펑, 10년 명리 상담 경험.", slogan: "관계를 읽고, 재운을 읽고, 나를 읽다", subtitle: "여성의 연애, 결혼 궁합, 커리어와 재운, 중요한 결정을 위한 예약제 상담. 전 세계 예약 가능, 리포트 저장 가능.", description: "Santen은 무료 오락 도구가 아닙니다. 동양 명리 구조, AI 보조 심층 문서, 현실적인 상담 언어로 관계와 재운, 자기 이해를 돕습니다.", promise: "불안을 만들지 않고, 공포를 조장하지 않으며, 절대적 결론을 주지 않습니다. 모든 분석은 자기 이해와 관계 정리, 인생 계획의 참고입니다.", nav: nav.ko },
    common: { book: "상담 예약", delivery: "제공", contactMethods: "WeChat / WhatsApp / Telegram" },
    hero: { eyebrow: "Private Eastern Astrology Consultation", primaryCta: "프리미엄 상담 예약", servicesCta: "서비스 보기", previewCta: "제공 구조 보기", highlights: ["프리미엄 예약제", "여성 감정과 궁합", "커리어·재운 결정", "AI 문서 + 사람의 전달", "전 세계 상담 가능"] },
    compass: { eyebrow: "Consulting Compass", title: "재미로 보는 점이 아니라 구조를 봅니다.", body: "관계가 왜 반복되는지, 재운이 왜 막히는지, 커리어의 중요한 지점에서 왜 망설이는지. Santen은 싼 단정이 아니라 구조를 읽습니다.", items: ["연애와 결혼 궁합", "커리어·재운 결정", "명반 상세 분석과 장기 계획"], quote: "명리는 당신 대신 결정하지 않습니다. 지금 나아갈지 물러설지 더 선명하게 보게 합니다." },
    attitude: { eyebrow: "Attitude", items: [{ title: "프리미엄 예약제", body: "무료 저가 입구를 없애고 깊은 상담이 필요한 고객에게 시간을 씁니다." }, { title: "참고 성격", body: "절대적 정확성을 약속하지 않고 두려움을 만들지 않으며 현실 선택으로 돌아갑니다." }, { title: "운명 구조 통찰", body: "성격 기반, 관계 패턴, 재운 경로, 전환점을 읽습니다." }] },
    pastLife: {
      ...en.pastLife,
      navLabel: "전생과 현생",
      title: "전생과 현생 · 영혼 스크립트 리딩",
      subtitle: "어떤 성격은 이번 생에서만 만들어진 것 같지 않습니다. 어떤 관계도 단순한 우연처럼 느껴지지 않습니다.",
      body: "전생과 현생 모듈은 신비감을 팔기 위한 것이 아니라 반복되는 삶의 과제, 관계 패턴, 집착, 재능, 두려움을 더 깊은 서사로 이해하도록 돕습니다.",
      cards: [
        { title: "전생 에너지", body: "반복되는 성격의 관성, 집착, 익숙한 재능, 내면의 기시감을 읽습니다." },
        { title: "현생 과제", body: "이번 생에서 성장해야 할 방향, 커리어 과제, 감정 패턴을 정리합니다." },
        { title: "영혼 관계", body: "친밀한 관계, 협력 관계, 귀인과 소모적 관계의 끌림을 살핍니다." },
        { title: "운명 노드", body: "인생의 전환점, 해마다 열리는 기회, 저점과 상승기를 정리합니다." }
      ],
      primaryCta: "전생과 현생 리딩 시작",
      secondaryCta: "전체 영혼 리포트 생성",
      note: "명반 구조와 AI 서사 추론을 활용한 자기 이해 참고 자료이며 절대적 예언이 아닙니다.",
      service: {
        title: "전생과 현생 영혼 스크립트 리포트",
        price: "¥1999",
        scene: "무의식 패턴 / 관계 끌림 / 삶의 주제",
        description: "반복되는 관계, 감정 관성, 재능의 근원, 인생 주제를 이해하려는 고객을 위한 Santen 시그니처 리포트.",
        delivery: "AI 심층 문서 + 30분 후속 질문"
      }
    },
    services: { ...en.services, title: "서비스", body: "연애, 궁합, 커리어·재운, 중요한 결정을 위한 프리미엄 예약제 리포트.", items: en.services.items },
    booking: { ...en.booking, title: "예약 절차", body: "예약금 ¥399 결제 후 담당자가 일정을 확인합니다. 잔금 미결제 시 예약금 환불 또는 예약 취소가 가능합니다.", primaryCta: "예약금 결제", secondaryCta: "제공 구조 보기" },
    clientCenter: { ...en.clientCenter, title: "고객 센터 계획", body: "추후 예약 확인, 문서 다운로드, 추가 질문 제출, 잔금 알림을 이곳에서 관리할 수 있습니다.", items: ["내 예약", "문서 다운로드", "추가 질문", "잔금 알림", "제공 기록"] },
    story: { eyebrow: "Founder", title: "주관자 천펑", founderDesc: "10년 명리 경험, 관계와 부, 인생 선택의 구조를 오래 관찰했습니다.", paragraphs: ["Santen은 프리미엄 동양 명리 예약 상담 브랜드입니다. 신비롭게 들리는 말보다 관계, 재운 경로, 결정 구조를 명확히 하는 데 집중합니다.", "명리는 구조의 언어가 될 수 있습니다. 같은 관계 패턴이 반복되는 이유, 기회 앞에서 망설이는 이유, 중요한 순간에 안정적인 외부 시선이 필요한 이유를 보여줍니다."], signature: "관계를 읽고, 재운을 읽고, 나를 읽다." },
    faq: { ...en.faq, title: "자주 묻는 질문", body: "전문성, 절제, 프라이버시가 Santen의 기본 경계입니다." },
    footer: { disclaimer: "면책: AI 명리, 육효, 궁합, 커리어·재운, 명반 분석은 자기 이해와 인생 계획 참고용이며 의료, 법률, 투자 또는 중대한 인생 결정 조언이 아닙니다.", contactTitle: "예약제 서비스", contactBody: "예약금 결제 후 일정에 맞춰 전달합니다." },
    interactive: { ...makeEnglishInteractive(), title: "예약 전 제공 구조 보기", body: "상담 문체와 리포트 구조를 보여주는 프론트엔드 미리보기입니다. 정식 서비스는 유료 예약제입니다.", submit: "미리보기 생성", emptyTitle: "서비스를 선택해 미리보기", emptyBody: "이곳은 문서 구조와 상담 스타일을 보여줍니다. 정식 서비스는 완전한 정보와 일정 확정 후 제공됩니다." }
  };
}

function makeVietnameseDictionary(): SiteDictionary {
  const en = dictionaries.en;
  return {
    ...en,
    brand: { name: "Santen", positioning: "Tư vấn mệnh lý Đông phương cao cấp", founder: "Chen Peng", founderLine: "Do Chen Peng chủ lý, 10 năm kinh nghiệm mệnh lý.", slogan: "Thấu hiểu quan hệ, tài vận và chính mình", subtitle: "Tập trung vào tình cảm nữ giới, hợp hôn, sự nghiệp tài vận và quyết định quan trọng. Đặt lịch riêng, phục vụ toàn cầu, báo cáo có thể lưu.", description: "Santen không phải công cụ giải trí miễn phí và không hứa chính xác tuyệt đối. Chúng tôi kết hợp cấu trúc mệnh lý Đông phương, báo cáo AI chuyên sâu và ngôn ngữ tư vấn thực tế.", promise: "Không tạo lo âu, không hù dọa, không kết luận tuyệt đối. Mọi phân tích chỉ để tham khảo cho tự nhận thức, quan hệ và kế hoạch cuộc đời.", nav: nav.vi },
    common: { book: "Đặt lịch tư vấn", delivery: "Bàn giao", contactMethods: "WeChat / WhatsApp / Telegram" },
    hero: { eyebrow: "Private Eastern Astrology Consultation", primaryCta: "Đặt tư vấn cao cấp", servicesCta: "Xem dịch vụ", previewCta: "Xem cấu trúc báo cáo", highlights: ["Đặt lịch cao cấp", "Tình cảm nữ giới & hợp hôn", "Quyết định sự nghiệp tài vận", "Báo cáo AI + bàn giao thủ công", "Hỗ trợ toàn cầu"] },
    compass: { eyebrow: "Consulting Compass", title: "Không xem cho vui. Chúng tôi đọc cấu trúc.", body: "Vì sao quan hệ lặp lại, vì sao tài vận bị kẹt, vì sao sự nghiệp do dự ở điểm then chốt. Santen đọc cấu trúc, không đưa lời đoán rẻ tiền.", items: ["Tình cảm và hợp hôn", "Sự nghiệp tài vận", "Mệnh bàn chi tiết và kế hoạch dài hạn"], quote: "Mệnh lý không quyết định thay bạn. Nó giúp bạn nhìn rõ lúc này nên tiến hay nên lui." },
    attitude: { eyebrow: "Attitude", items: [{ title: "Đặt lịch cao cấp", body: "Không có lối vào miễn phí giá thấp; thời gian dành cho khách cần tư vấn sâu." }, { title: "Chỉ để tham khảo", body: "Không hứa đúng tuyệt đối, không tạo sợ hãi, mọi kết luận quay về lựa chọn thực tế." }, { title: "Đọc cấu trúc vận mệnh", body: "Đọc nền tính cách, mẫu quan hệ, đường tài vận và nút chuyển đổi." }] },
    pastLife: {
      ...en.pastLife,
      navLabel: "Kiếp trước & hiện tại",
      title: "Kiếp trước & hiện tại · Kịch bản linh hồn",
      subtitle: "Có những tính cách dường như không chỉ hình thành trong đời này. Có những mối quan hệ cũng không giống sự gặp gỡ ngẫu nhiên.",
      body: "Mô-đun này không nhằm tạo cảm giác mê tín, mà dùng cấu trúc mệnh bàn và diễn giải AI để giúp bạn hiểu các chủ đề đời sống, mẫu quan hệ, chấp niệm, tài năng và nỗi sợ lặp lại.",
      cards: [
        { title: "Năng lượng kiếp trước", body: "Đọc các quán tính tính cách, chấp niệm, tài năng quen thuộc và cảm giác đã biết từ bên trong." },
        { title: "Bài học hiện tại", body: "Sắp xếp hướng trưởng thành, thử thách sự nghiệp và mẫu cảm xúc của đời này." },
        { title: "Quan hệ linh hồn", body: "Quan sát lực kéo trong quan hệ thân mật, hợp tác, quý nhân và quan hệ tiêu hao." },
        { title: "Nút vận mệnh", body: "Tóm lược các điểm chuyển hướng, cơ hội theo năm, giai đoạn thấp và giai đoạn đi lên." }
      ],
      primaryCta: "Bắt đầu đọc kiếp trước",
      secondaryCta: "Tạo báo cáo linh hồn đầy đủ",
      note: "Nội dung dùng cấu trúc mệnh bàn và diễn giải AI, chỉ để tham khảo cho tự nhận thức và quan hệ.",
      service: {
        title: "Báo cáo kịch bản linh hồn",
        price: "¥1999",
        scene: "Mẫu tiềm thức / lực kéo quan hệ / chủ đề đời sống",
        description: "Báo cáo đặc trưng của Santen cho người muốn hiểu quan hệ lặp lại, quán tính cảm xúc, nguồn tài năng và chủ đề cuộc đời.",
        delivery: "Báo cáo AI chuyên sâu + 30 phút hỏi thêm"
      }
    },
    services: { ...en.services, title: "Dịch vụ", body: "Báo cáo cao cấp theo lịch hẹn cho tình cảm, hợp hôn, sự nghiệp tài vận và quyết định quan trọng.", items: en.services.items },
    booking: { ...en.booking, title: "Quy trình đặt lịch", body: "Thanh toán cọc ¥399 trước, trợ lý xác nhận lịch. Nếu chưa thanh toán phần còn lại, có thể hoàn cọc hoặc hủy lịch.", primaryCta: "Thanh toán cọc", secondaryCta: "Xem cấu trúc báo cáo" },
    clientCenter: { ...en.clientCenter, title: "Kế hoạch trung tâm khách hàng", body: "Sau này khách có thể xem lịch, tải báo cáo, gửi câu hỏi tiếp theo và nhận nhắc thanh toán tại đây.", items: ["Lịch của tôi", "Tải báo cáo", "Câu hỏi tiếp", "Nhắc thanh toán", "Lưu giao nhận"] },
    story: { eyebrow: "Founder", title: "Chen Peng", founderDesc: "10 năm kinh nghiệm mệnh lý, quan sát lâu dài cấu trúc của quan hệ, tài phú và lựa chọn đời người.", paragraphs: ["Santen là thương hiệu tư vấn mệnh lý Đông phương cao cấp theo lịch hẹn. Điều chúng tôi quan tâm không phải lời nói huyền bí, mà là làm rõ cấu trúc của một mối quan hệ, một đường tài vận hoặc một quyết định.", "Mệnh lý có thể là ngôn ngữ của cấu trúc. Nó giúp bạn hiểu vì sao cùng một mẫu quan hệ quay lại, vì sao do dự trước cơ hội, và vì sao ở điểm then chốt cần một góc nhìn ổn định từ bên ngoài."], signature: "Thấu hiểu quan hệ, tài vận và chính mình." },
    faq: { ...en.faq, title: "Câu hỏi thường gặp", body: "Chuyên nghiệp, tiết chế và riêng tư là ranh giới cơ bản của Santen." },
    footer: { disclaimer: "Miễn trừ trách nhiệm: AI mệnh lý, lục hào, hợp hôn, sự nghiệp tài vận và phân tích mệnh bàn chỉ dùng để tham khảo cho tự nhận thức và kế hoạch cuộc sống, không phải tư vấn y tế, pháp lý, đầu tư hoặc quyết định trọng đại.", contactTitle: "Dịch vụ đặt lịch", contactBody: "Cọc trước, sau đó sắp lịch và bàn giao." },
    interactive: { ...makeEnglishInteractive(), title: "Xem cấu trúc trước khi đặt lịch", body: "Đây là bản mô phỏng giao diện để thể hiện phong cách tư vấn và cấu trúc báo cáo. Dịch vụ chính thức là trả phí theo lịch hẹn.", submit: "Tạo bản xem trước", emptyTitle: "Chọn dịch vụ để xem trước", emptyBody: "Khu vực này hiển thị cấu trúc báo cáo và phong cách tư vấn. Dịch vụ đầy đủ sẽ được bàn giao sau khi có đủ thông tin và lịch hẹn." }
  };
}

export function isLanguageCode(value: string | null): value is LanguageCode {
  return languages.some((item) => item.code === value);
}
