"use client";

import { IndexData } from "@/lib/market";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

function fmt(value: number, unit: string): string {
  if (unit === "円") return value.toFixed(2) + " 円";
  if (unit === "USD") return "$" + value.toFixed(2);
  return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

interface Props {
  indices: IndexData[];
}

export function MarketOverview({ indices }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {indices.map((idx) => {
        const up = idx.changePercent > 0;
        const flat = Math.abs(idx.changePercent) < 0.01;
        const Icon = flat ? Minus : up ? TrendingUp : TrendingDown;
        const color = flat ? "text-gray-500" : up ? "text-emerald-600" : "text-red-500";

        return (
          <Card key={idx.key} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-muted-foreground">{idx.label}</span>
                <span className="text-xs text-muted-foreground">{idx.unit}</span>
              </div>
              <p className="text-lg font-bold leading-tight" style={{ color: idx.color }}>
                {fmt(idx.currentPrice, idx.unit)}
              </p>
              <div className={`flex items-center gap-1 mt-1 ${color}`}>
                <Icon className="h-3 w-3" />
                <span className="text-xs font-medium">
                  {idx.changePercent >= 0 ? "+" : ""}
                  {idx.changePercent.toFixed(2)}%
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
