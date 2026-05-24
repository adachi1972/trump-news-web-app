export type EventCategory = "関税" | "外交" | "政治" | "法律" | "市場";

export interface TrumpEvent {
  date: string; // YYYY-MM-DD
  title: string;
  description: string;
  category: EventCategory;
  impact: "high" | "medium" | "low";
}

export const trumpEvents: TrumpEvent[] = [
  {
    date: "2025-01-20",
    title: "第2次政権発足",
    description: "トランプ大統領（第47代）就任。初日に複数の大統領令に署名",
    category: "政治",
    impact: "high",
  },
  {
    date: "2025-02-01",
    title: "カナダ・メキシコ関税発動",
    description: "カナダ・メキシコに25%関税（エネルギーは10%）発動を決定",
    category: "関税",
    impact: "high",
  },
  {
    date: "2025-03-12",
    title: "EU対抗措置発表",
    description: "EUが260億ユーロ相当の米国製品への対抗関税を発表",
    category: "外交",
    impact: "medium",
  },
  {
    date: "2025-04-02",
    title: "Liberation Day",
    description: "全貿易相手国に相互関税発動。S&P500が7週間で約20%下落",
    category: "関税",
    impact: "high",
  },
  {
    date: "2025-04-10",
    title: "EU停戦・交渉優先",
    description: "EUが対抗措置を90日間停止し交渉ルートを優先",
    category: "外交",
    impact: "medium",
  },
  {
    date: "2025-05-12",
    title: "米中90日合意",
    description: "米中が90日間の相互関税引き下げに合意（125%→10%）",
    category: "外交",
    impact: "high",
  },
  {
    date: "2025-12-01",
    title: "台湾武器売却",
    description: "台湾への111億ドル武器売却を発表。中国が強く反発",
    category: "外交",
    impact: "medium",
  },
  {
    date: "2026-01-15",
    title: "グリーンランド関税",
    description: "グリーンランド問題でEU6カ国＋英国・ノルウェーに追加10%関税",
    category: "関税",
    impact: "medium",
  },
  {
    date: "2026-02-20",
    title: "最高裁 IEEPA 違憲判決",
    description: "米最高裁がIEEPA関税権限を違憲と判断（6-3）。今後の関税発動余地が縮小",
    category: "法律",
    impact: "high",
  },
];

export const categoryColors: Record<EventCategory, string> = {
  関税: "#ef4444",
  外交: "#3b82f6",
  政治: "#8b5cf6",
  法律: "#f59e0b",
  市場: "#10b981",
};
