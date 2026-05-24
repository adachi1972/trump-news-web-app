"use client";

import { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { IndexData } from "@/lib/market";
import { trumpEvents, categoryColors, TrumpEvent, EventCategory } from "@/lib/events";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

type Range = "3m" | "6m" | "1y";

const RANGE_DAYS: Record<Range, number> = { "3m": 90, "6m": 180, "1y": 365 };

function mergeByDate(indices: IndexData[]): Record<string, unknown>[] {
  const dateMap = new Map<string, Record<string, unknown>>();
  for (const idx of indices) {
    for (const d of idx.data) {
      if (!dateMap.has(d.date)) dateMap.set(d.date, { date: d.date });
      dateMap.get(d.date)![idx.key] = d.pctChange;
    }
  }
  return Array.from(dateMap.values()).sort((a, b) =>
    (a.date as string).localeCompare(b.date as string)
  );
}

function filterByRange(rows: Record<string, unknown>[], days: number) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  const cutoffStr = cutoff.toISOString().split("T")[0];
  return rows.filter((r) => (r.date as string) >= cutoffStr);
}

function eventsInRange(events: TrumpEvent[], rows: Record<string, unknown>[]): TrumpEvent[] {
  if (!rows.length) return [];
  const minDate = rows[0].date as string;
  const maxDate = rows.at(-1)!.date as string;
  return events.filter((e) => e.date >= minDate && e.date <= maxDate);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label, events }: any) {
  if (!active || !payload?.length) return null;
  const event = events.find((e: TrumpEvent) => e.date === label);
  return (
    <div className="rounded-lg border bg-background p-3 shadow-md text-xs max-w-xs">
      <p className="font-semibold mb-1">{label}</p>
      {event && (
        <div className="mb-2 border-l-2 pl-2" style={{ borderColor: categoryColors[event.category as EventCategory] }}>
          <p className="font-medium">{event.title}</p>
          <p className="text-muted-foreground">{event.description}</p>
        </div>
      )}
      {payload.map((p: { name: string; value: number; color: string }) => (
        <div key={p.name} className="flex justify-between gap-4">
          <span style={{ color: p.color }}>{p.name}</span>
          <span className={p.value >= 0 ? "text-emerald-600" : "text-red-500"}>
            {p.value >= 0 ? "+" : ""}
            {p.value.toFixed(2)}%
          </span>
        </div>
      ))}
    </div>
  );
}

interface Props {
  indices: IndexData[];
}

export function MarketChart({ indices }: Props) {
  const [range, setRange] = useState<Range>("1y");

  const allRows = useMemo(() => mergeByDate(indices), [indices]);
  const rows = useMemo(() => filterByRange(allRows, RANGE_DAYS[range]), [allRows, range]);
  const visibleEvents = useMemo(() => eventsInRange(trumpEvents, rows), [rows]);

  const xTicks = useMemo(() => {
    if (!rows.length) return [];
    const step = Math.max(1, Math.floor(rows.length / 8));
    return rows.filter((_, i) => i % step === 0).map((r) => r.date as string);
  }, [rows]);

  if (!indices.length) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64 text-muted-foreground">
          データを読み込み中...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base">市場パフォーマンス（期間比較 %）</CardTitle>
        <Tabs value={range} onValueChange={(v) => setRange(v as Range)}>
          <TabsList className="h-7">
            <TabsTrigger value="3m" className="text-xs px-2">3ヶ月</TabsTrigger>
            <TabsTrigger value="6m" className="text-xs px-2">6ヶ月</TabsTrigger>
            <TabsTrigger value="1y" className="text-xs px-2">1年</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={380}>
          <LineChart data={rows} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              ticks={xTicks}
              tick={{ fontSize: 11 }}
              tickFormatter={(v) => v.slice(5)} // MM-DD
            />
            <YAxis
              tickFormatter={(v) => `${v >= 0 ? "+" : ""}${v.toFixed(0)}%`}
              tick={{ fontSize: 11 }}
              width={52}
            />
            <Tooltip content={<CustomTooltip events={trumpEvents} />} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <ReferenceLine y={0} stroke="#9ca3af" strokeDasharray="4 2" />
            {visibleEvents.map((e) => (
              <ReferenceLine
                key={e.date}
                x={e.date}
                stroke={categoryColors[e.category]}
                strokeDasharray="4 2"
                strokeWidth={1.5}
              />
            ))}
            {indices.map((idx) => (
              <Line
                key={idx.key}
                type="monotone"
                dataKey={idx.key}
                name={idx.label}
                stroke={idx.color}
                dot={false}
                strokeWidth={2}
                connectNulls
              />
            ))}
          </LineChart>
        </ResponsiveContainer>

        {/* Event legend */}
        {visibleEvents.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {visibleEvents.map((e) => (
              <div
                key={e.date}
                className="flex items-center gap-1.5 text-xs text-muted-foreground"
                title={e.description}
              >
                <span
                  className="inline-block h-3 w-0.5 rounded"
                  style={{ backgroundColor: categoryColors[e.category] }}
                />
                <span className="text-[10px] text-muted-foreground">{e.date.slice(5)}</span>
                <Badge
                  variant="outline"
                  className="text-[10px] h-4 px-1 cursor-default"
                  style={{ borderColor: categoryColors[e.category], color: categoryColors[e.category] }}
                >
                  {e.title}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
