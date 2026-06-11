import { Brain, Sparkles } from "lucide-react";
import { AIDisclaimerBanner } from "@/components/ai/AIDisclaimerBanner";
import { AIInsightCard } from "@/components/ai/AIInsightCard";
import { StudentRiskTable } from "@/components/ai/StudentRiskTable";
import { MonthlyAIReportView } from "@/components/ai/MonthlyAIReportView";
import { schoolWideInsights, studentAnalyses, monthlySchoolReport } from "@/data/aiMockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminAIInsights() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Brain className="h-7 w-7 text-violet-600" />
          AI Insights Center
        </h1>
        <p className="text-muted-foreground">School-wide AI analysis, risk detection, and monthly reports</p>
      </div>

      <AIDisclaimerBanner />

      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-violet-500" />
          Priority Alerts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {schoolWideInsights.map((insight) => (
            <AIInsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Student Risk Table</CardTitle>
        </CardHeader>
        <CardContent>
          <StudentRiskTable students={studentAnalyses} />
        </CardContent>
      </Card>

      <MonthlyAIReportView report={monthlySchoolReport} />
    </div>
  );
}
