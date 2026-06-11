import { FileBarChart } from "lucide-react";
import { AIDisclaimerBanner } from "@/components/ai/AIDisclaimerBanner";
import { MonthlyAIReportView } from "@/components/ai/MonthlyAIReportView";
import { monthlySchoolReport } from "@/data/aiMockData";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function PrincipalReports() {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileBarChart className="h-7 w-7 text-violet-600" />
            Monthly AI Reports
          </h1>
          <p className="text-muted-foreground">Comprehensive AI-generated monthly school performance reports</p>
        </div>
        <Button
          className="bg-violet-600 hover:bg-violet-700"
          onClick={() => toast({ title: "Report Generated", description: "AI monthly report for December 2023 will be available on Dec 31." })}
        >
          Generate New Report
        </Button>
      </div>

      <AIDisclaimerBanner />
      <MonthlyAIReportView report={monthlySchoolReport} />
    </div>
  );
}
