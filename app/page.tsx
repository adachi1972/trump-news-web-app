import { fetchAllIndices } from "@/lib/market";
import { MarketOverview } from "@/components/MarketOverview";
import { MarketChart } from "@/components/MarketChart";
import { EventsTimeline } from "@/components/EventsTimeline";
import { Separator } from "@/components/ui/separator";
import { auth, signOut } from "@/auth";

export const revalidate = 3600;

export default async function Home() {
  const [indices, session] = await Promise.all([fetchAllIndices(), auth()]);
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
          <div className="flex items-center gap-3">
            <p className="text-[11px] text-muted-foreground hidden sm:block">
              更新: {updatedAt} JST
            </p>
            {session?.user && (
              <div className="flex items-center gap-2">
                {session.user.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={session.user.image}
                    alt={session.user.name ?? "user"}
                    className="h-7 w-7 rounded-full border"
                  />
                )}
                <span className="text-xs text-muted-foreground hidden md:block">
                  {session.user.name}
                </span>
                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/login" });
                  }}
                >
                  <button
                    type="submit"
                    className="text-xs text-muted-foreground hover:text-foreground border rounded px-2 py-1 transition-colors"
                  >
                    ログアウト
                  </button>
                </form>
              </div>
            )}
          </div>
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
