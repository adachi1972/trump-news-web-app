export type EventCategory = "関税" | "外交" | "政治" | "法律" | "市場";

export interface TrumpEvent {
  date: string; // YYYY-MM-DD
  title: string;
  description: string;
  category: EventCategory;
  impact: "high" | "medium" | "low";
}

export const trumpEvents: TrumpEvent[] = [
  // ── 2025年1月 ──
  {
    date: "2025-01-20",
    title: "第2次政権発足",
    description: "トランプ大統領（第47代）就任。「America First Trade Policy」覚書に署名。不法移民・フェンタニル密輸に関する国家緊急事態を宣言",
    category: "政治",
    impact: "high",
  },
  // ── 2025年2月 ──
  {
    date: "2025-02-01",
    title: "カナダ・メキシコ関税発動",
    description: "カナダ・メキシコに25%関税（エネルギーは10%）発動。USTRに全貿易関係の見直しを指示",
    category: "関税",
    impact: "high",
  },
  {
    date: "2025-02-28",
    title: "ゼレンスキー訪米・決裂",
    description: "ゼレンスキー大統領がホワイトハウスを訪問。トランプと激しく対立しウクライナ支援見直しへ",
    category: "外交",
    impact: "high",
  },
  // ── 2025年3月 ──
  {
    date: "2025-03-04",
    title: "鉄鋼・アルミ追加関税",
    description: "鉄鋼・アルミニウムへのSection 232関税を25%から50%に引き上げ",
    category: "関税",
    impact: "medium",
  },
  {
    date: "2025-03-12",
    title: "EU対抗措置発表",
    description: "EUが260億ユーロ相当の米国製品への対抗関税を発表",
    category: "外交",
    impact: "medium",
  },
  // ── 2025年4月 ──
  {
    date: "2025-04-02",
    title: "Liberation Day",
    description: "80カ国超に相互関税発動（ベトナム46%・EU20%等）。S&P500が7週間で約20%下落、世界市場で10兆ドル消失",
    category: "関税",
    impact: "high",
  },
  {
    date: "2025-04-10",
    title: "EU90日停戦",
    description: "EUが対抗関税を90日間停止し交渉ルートを優先。市場が急反発",
    category: "外交",
    impact: "medium",
  },
  {
    date: "2025-04-15",
    title: "重要鉱物調査命令",
    description: "加工済み重要鉱物・半導体の輸入が国家安全保障に与える影響の調査を商務省に命令",
    category: "政治",
    impact: "low",
  },
  // ── 2025年5月 ──
  {
    date: "2025-05-12",
    title: "米中90日関税停戦",
    description: "米中が90日間の相互関税引き下げに合意（125%→10%）。市場が大幅上昇",
    category: "外交",
    impact: "high",
  },
  // ── 2025年6月 ──
  {
    date: "2025-06-15",
    title: "銅・半導体・木材に新関税",
    description: "銅50%・半導体25%・木材10%の新たなSection 232関税を発動",
    category: "関税",
    impact: "medium",
  },
  // ── 2025年7月 ──
  {
    date: "2025-07-04",
    title: "One Big Beautiful Bill 署名",
    description: "大型減税・歳出削減法案「One Big Beautiful Bill Act」に署名。第2次政権最大の立法成果",
    category: "政治",
    impact: "high",
  },
  // ── 2025年9月 ──
  {
    date: "2025-09-15",
    title: "木材・家具追加関税",
    description: "針葉樹木材10%・キッチンキャビネット等25%の関税を10月14日から発動と発表",
    category: "関税",
    impact: "low",
  },
  // ── 2025年10月 ──
  {
    date: "2025-10-01",
    title: "国際貿易裁判所 IEEPA違憲判断",
    description: "米国際貿易裁判所がIEEPAに基づく関税権限を違憲と判断。関税の法的根拠が揺らぐ",
    category: "法律",
    impact: "high",
  },
  {
    date: "2025-10-20",
    title: "ゼレンスキーに領土譲歩要求",
    description: "トランプがゼレンスキー大統領と会談し、ロシアへの領土譲歩を要求。NATO同盟国が反発",
    category: "外交",
    impact: "medium",
  },
  // ── 2025年11月 ──
  {
    date: "2025-11-01",
    title: "連邦巡回裁もIEEPA違憲支持",
    description: "連邦巡回控訴裁判所が国際貿易裁判所の判断を支持。IEEPA関税の法的根拠が更に縮小",
    category: "法律",
    impact: "medium",
  },
  {
    date: "2025-11-10",
    title: "米中関税停戦を1年延長",
    description: "米中が関税引き下げ（125%→10%）を2026年11月まで1年間延長することで合意",
    category: "外交",
    impact: "medium",
  },
  // ── 2025年12月 ──
  {
    date: "2025-12-01",
    title: "台湾 111億ドル武器売却",
    description: "台湾への111億ドル規模の武器売却を発表。中国が強く反発し米中関係が悪化",
    category: "外交",
    impact: "medium",
  },
  // ── 2026年1月 ──
  {
    date: "2026-01-14",
    title: "半導体・鉱物輸入制限布告",
    description: "加工済み重要鉱物・半導体の輸入制限に関する大統領布告を発令",
    category: "関税",
    impact: "medium",
  },
  {
    date: "2026-01-15",
    title: "グリーンランド関税",
    description: "グリーンランド問題でEU6カ国・英国・ノルウェーに追加10%関税。8カ国首脳が共同声明で反発",
    category: "関税",
    impact: "medium",
  },
  // ── 2026年2月 ──
  {
    date: "2026-02-20",
    title: "最高裁 IEEPA 違憲判決",
    description: "最高裁がIEEPA関税権限を違憲と判断（6-3）。トランプは貿易法Section 122に基づく10%世界一律関税に切り替え（150日間）",
    category: "法律",
    impact: "high",
  },
  // ── 2026年4月 ──
  {
    date: "2026-04-02",
    title: "医薬品に100%関税",
    description: "特許医薬品・原材料に100%関税を賦課する大統領令に署名（EU・日本・韓国等は15%の優遇税率）",
    category: "関税",
    impact: "high",
  },
  {
    date: "2026-04-08",
    title: "イラン停戦成立",
    description: "2月28日開始の米・イスラエル合同軍事作戦「Operation Epic Fury」から40日で停戦。イランの核施設・軍事インフラを標的とした大規模作戦が終結",
    category: "外交",
    impact: "high",
  },
  // ── 2026年5月 ──
  {
    date: "2026-05-07",
    title: "Section 122関税無効",
    description: "米国際貿易裁判所が世界一律10% Section 122関税を「法的根拠なし」と2対1で判断。政府は即日控訴し5月12日に連邦巡回裁が暫定的に徴収継続を認める",
    category: "法律",
    impact: "medium",
  },
  {
    date: "2026-05-15",
    title: "米中首脳会談合意",
    description: "トランプが中国を国賓訪問し習近平と会談。農産物170億ドル/年購入・ボーイング200機・レアアース取引など大型合意を締結。両国の「戦略的安定」構築に合意",
    category: "外交",
    impact: "high",
  },
  // ── 2026年6月 ──
  {
    date: "2026-06-01",
    title: "鉄鋼・銅関税再強化",
    description: "アルミ・鉄鋼・銅の輸入関税を更に引き上げる大統領令に署名（6月8日発効）。国内製造業保護を一層強化",
    category: "関税",
    impact: "medium",
  },
  {
    date: "2026-06-03",
    title: "連邦公務員解雇容易化令",
    description: "GS-15以上を中心に約8,000人の連邦公務員を「Schedule Policy/Career」に再分類し解雇しやすくする大統領令に署名。官僚機構の政策実行責任を強化する狙い",
    category: "政治",
    impact: "medium",
  },
  {
    date: "2026-06-06",
    title: "イラン核交渉が一時停滞",
    description: "60日停戦延長・ホルムズ海峡再開を条件とする核合意交渉でイランが一時離脱。補償金額・核物質管理の扱いが難航。トランプは「合意は近い」と強調しつつ圧力継続",
    category: "外交",
    impact: "medium",
  },
];

export const categoryColors: Record<EventCategory, string> = {
  関税: "#ef4444",
  外交: "#3b82f6",
  政治: "#8b5cf6",
  法律: "#f59e0b",
  市場: "#10b981",
};
