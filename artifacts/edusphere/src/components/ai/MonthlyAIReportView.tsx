import { FileBarChart, AlertCircle, Trophy, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AIBadge } from "./AIBadge";
import { AIMetricTrend } from "./AIInsightCard";
import type { MonthlyAIReport } from "@/data/aiMockData";

export function MonthlyAIReportView({ report }: { report: MonthlyAIReport }) {
  return (
    <div className="space-y-6">
      <Card className="border-violet-200 dark:border-violet-800 bg-gradient-to-br from-violet-50/50 to-background dark:from-violet-950/20">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <FileBarChart className="h-5 w-5 text-violet-600" />
                AI Monthly Report — {report.month} {report.year}
              </CardTitle>
              <CardDescription>Generated {report.generatedAt} by EduSphere AI Engine</CardDescription>
            </div>
            <AIBadge />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">AI Health Score</span>
                <span className="font-bold text-violet-700 dark:text-violet-300">{report.overallScore}/100</span>
              </div>
              <Progress value={report.overallScore} className="h-3" />
            </div>
          </div>
          <p className="text-sm leading-relaxed">{report.executiveSummary}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {report.sections.map((section) => (
          <Card key={section.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{section.content}</p>
              {section.metrics && (
                <div className="grid grid-cols-2 gap-2">
                  {section.metrics.map((m) => (
                    <AIMetricTrend key={m.label} label={m.label} value={m.value} trend={m.trend} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-destructive">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-destructive" />
              Lagging Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {report.laggingAreas.map((area, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-destructive font-bold">•</span>
                  {area}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Trophy className="h-4 w-4 text-success" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {report.topPerformers.map((name, i) => (
                <li key={i} className="text-sm flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">{i + 1}</Badge>
                  {name}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="h-4 w-4 text-orange-500" />
              At-Risk Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            {report.atRiskStudents.length === 0 ? (
              <p className="text-sm text-muted-foreground">No students flagged this month.</p>
            ) : (
              <ul className="space-y-2">
                {report.atRiskStudents.map((name, i) => (
                  <li key={i} className="text-sm flex items-center gap-2">
                    <Badge variant="destructive" className="text-xs">!</Badge>
                    {name}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
