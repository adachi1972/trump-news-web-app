export interface IndexMeta {
  key: string;
  symbol: string;
  label: string;
  unit: string;
  color: string;
}

export const INDICES: IndexMeta[] = [
  { key: "sp500",  symbol: "^GSPC",  label: "S&P 500",   unit: "pt",  color: "#2563eb" },
  { key: "nasdaq", symbol: "^IXIC",  label: "Nasdaq",    unit: "pt",  color: "#7c3aed" },
  { key: "dow",    symbol: "^DJI",   label: "Dow Jones", unit: "pt",  color: "#dc2626" },
  { key: "usdjpy", symbol: "JPY=X",  label: "ドル円",    unit: "円",  color: "#d97706" },
  { key: "oil",    symbol: "CL=F",   label: "WTI原油",   unit: "USD", color: "#059669" },
];

export interface DayData {
  date: string;
  value: number;
  pctChange: number; // % change from first day in the period
}

export interface IndexData extends IndexMeta {
  currentPrice: number;
  changePercent: number; // daily change %
  data: DayData[];
}

async function fetchYahoo(symbol: string): Promise<IndexData | null> {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=1y&interval=1d`;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const result = json?.chart?.result?.[0];
    if (!result) return null;

    const timestamps: number[] = result.timestamp ?? [];
    const closes: (number | null)[] = result.indicators?.quote?.[0]?.close ?? [];
    const meta = result.meta ?? {};

    const valid = timestamps
      .map((ts, i) => ({ date: new Date(ts * 1000).toISOString().split("T")[0], value: closes[i] }))
      .filter((d): d is { date: string; value: number } => d.value != null && isFinite(d.value));

    const base = valid[0]?.value ?? 1;
    const indexMeta = INDICES.find((m) => m.symbol === symbol)!;

    return {
      ...indexMeta,
      currentPrice: meta.regularMarketPrice ?? valid.at(-1)?.value ?? 0,
      changePercent: meta.regularMarketChangePercent ?? 0,
      data: valid.map((d) => ({
        date: d.date,
        value: d.value,
        pctChange: ((d.value - base) / base) * 100,
      })),
    };
  } catch {
    return null;
  }
}

export async function fetchAllIndices(): Promise<IndexData[]> {
  const results = await Promise.all(INDICES.map((m) => fetchYahoo(m.symbol)));
  return results.filter((r): r is IndexData => r !== null);
}
