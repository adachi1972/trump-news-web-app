import { trumpEvents, categoryColors, EventCategory } from "@/lib/events";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const impactLabel: Record<string, string> = { high: "高", medium: "中", low: "低" };
const impactColor: Record<string, string> = {
  high: "bg-red-100 text-red-700 border-red-200",
  medium: "bg-amber-100 text-amber-700 border-amber-200",
  low: "bg-gray-100 text-gray-600 border-gray-200",
};

export function EventsTimeline() {
  const sorted = [...trumpEvents].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Trump 主要イベント</CardTitle>
      </CardHeader>
      <CardContent className="overflow-y-auto max-h-[420px] pr-2">
        <ol className="relative border-l border-border ml-2">
          {sorted.map((e) => (
            <li key={e.date} className="mb-5 ml-4">
              <span
                className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full border-2 border-background"
                style={{ backgroundColor: categoryColors[e.category as EventCategory] }}
              />
              <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                <time className="text-xs font-semibold text-muted-foreground">{e.date}</time>
                <Badge
                  variant="outline"
                  className="text-[10px] h-4 px-1"
                  style={{ borderColor: categoryColors[e.category as EventCategory], color: categoryColors[e.category as EventCategory] }}
                >
                  {e.category}
                </Badge>
                <span className={`text-[10px] px-1 rounded border ${impactColor[e.impact]}`}>
                  影響: {impactLabel[e.impact]}
                </span>
              </div>
              <p className="text-sm font-medium leading-tight">{e.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{e.description}</p>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
