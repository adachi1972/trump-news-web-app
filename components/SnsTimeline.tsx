import { trumpStatements, platformColors, SnsPlatform } from "@/lib/sns";
import { Badge } from "@/components/ui/badge";

export function SnsTimeline() {
  const sorted = [...trumpStatements].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="overflow-y-auto max-h-[420px] pr-2">
      <p className="text-[10px] text-muted-foreground mb-3 leading-relaxed">
        ※ 広く報道された発言・声明の要旨です。Truth Social・記者会見・ホワイトハウス公式声明を基に作成。
      </p>
      <ol className="relative border-l border-border ml-2">
        {sorted.map((s, i) => {
          const color = platformColors[s.platform as SnsPlatform];
          return (
            <li key={`${s.date}-${i}`} className="mb-5 ml-4">
              <span
                className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full border-2 border-background"
                style={{ backgroundColor: color }}
              />
              <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                <time className="text-xs font-semibold text-muted-foreground">{s.date}</time>
                <Badge
                  variant="outline"
                  className="text-[10px] h-4 px-1"
                  style={{ borderColor: color, color }}
                >
                  {s.platform}
                </Badge>
                <span className="text-[10px] px-1 rounded border bg-gray-50 text-gray-600 border-gray-200">
                  {s.topic}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{s.content}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
