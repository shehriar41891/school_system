import { AlertTriangle, TrendingDown, TrendingUp, Minus, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AIInsight, RiskLevel } from "@/data/aiMockData";

const severityStyles: Record<RiskLevel, { badge: string; border: string }> = {
  low: { badge: "bg-success/10 text-success border-success/30", border: "border-l-success" },
  medium: { badge: "bg-secondary/10 text-secondary border-secondary/30", border: "border-l-secondary" },
  high: { badge: "bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-950 dark:text-orange-300", border: "border-l-orange-500" },
  critical: { badge: "bg-destructive/10 text-destructive border-destructive/30", border: "border-l-destructive" },
};

export function AIInsightCard({ insight }: { insight: AIInsight }) {
  const style = severityStyles[insight.severity];

  return (
    <Card className={`border-l-4 ${style.border}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-violet-500 shrink-0" />
            {insight.title}
          </CardTitle>
          <Badge variant="outline" className={style.badge}>
            {insight.severity}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">{insight.summary}</p>
        {insight.action && (
          <p className="text-sm font-medium text-foreground flex items-start gap-1.5">
            <AlertTriangle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
            {insight.action}
          </p>
        )}
        <Badge variant="secondary" className="text-xs capitalize">{insight.category}</Badge>
      </CardContent>
    </Card>
  );
}

export function AIMetricTrend({ trend, label, value }: { trend?: "up" | "down" | "stable"; label: string; value: string }) {
  const Icon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const color = trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground";

  return (
    <div className="text-center p-3 rounded-lg bg-muted/50">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-lg font-bold">{value}</p>
      {trend && <Icon className={`h-4 w-4 mx-auto mt-1 ${color}`} />}
    </div>
  );
}
