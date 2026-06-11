import { FileBarChart } from "lucide-react";
import { AIDisclaimerBanner } from "@/components/ai/AIDisclaimerBanner";
import { MonthlyAIReportView } from "@/components/ai/MonthlyAIReportView";
import { monthlyParentReport } from "@/data/aiMockData";

export default function ParentAIReports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FileBarChart className="h-7 w-7 text-violet-600" />
          Monthly AI Child Report
        </h1>
        <p className="text-muted-foreground">AI-generated monthly progress report for your child</p>
      </div>

      <AIDisclaimerBanner />
      <MonthlyAIReportView report={monthlyParentReport} />
    </div>
  );
}
