import { fetchAllIndices } from "@/lib/market";
import { MarketOverview } from "@/components/MarketOverview";
import { MarketChart } from "@/components/MarketChart";
import { EventsTimeline } from "@/components/EventsTimeline";
import { Separator } from "@/components/ui/separator";

export const revalidate = 3600;

export default async function Home() {
  const indices = await fetchAllIndices();
  const updatedAt = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tight">🇺🇸 Trump Impact Dashboard</h1>
            <p className="text-xs text-muted-foreground">
              トランプ大統領の発言・政策が市場に与えた影響を追跡
            </p>
          </div>
          <p className="text-[11px] text-muted-foreground hidden sm:block">
            更新: {updatedAt} JST
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Market overview cards */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            マーケット概況
          </h2>
          <MarketOverview indices={indices} />
        </section>

        <Separator />

        {/* Chart + Timeline */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              市場パフォーマンス × Trump イベント
            </h2>
            <MarketChart indices={indices} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              主要イベント年表
            </h2>
            <EventsTimeline />
          </div>
        </section>

        {/* Footer note */}
        <p className="text-[11px] text-muted-foreground text-center pb-4">
          データソース: Yahoo Finance（市場データ）/ 各種報道・外交資料（イベント）
          &nbsp;·&nbsp; 1時間ごとに自動更新 (ISR)
        </p>
      </div>
    </main>
  );
}
