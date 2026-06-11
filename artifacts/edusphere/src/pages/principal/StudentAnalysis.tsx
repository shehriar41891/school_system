import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Sparkles, CheckCircle, AlertCircle, Lightbulb } from "lucide-react";
import { AIDisclaimerBanner } from "@/components/ai/AIDisclaimerBanner";
import { StudentRiskTable } from "@/components/ai/StudentRiskTable";
import { studentAnalyses } from "@/data/aiMockData";
import { Progress } from "@/components/ui/progress";

export default function PrincipalStudentAnalysis() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Users className="h-7 w-7 text-violet-600" />
          AI Student Analysis
        </h1>
        <p className="text-muted-foreground">Individual student risk profiles, predictions, and intervention recommendations</p>
      </div>

      <AIDisclaimerBanner />

      <Card>
        <CardHeader>
          <CardTitle>Risk Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <StudentRiskTable students={studentAnalyses} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {studentAnalyses.map((student) => (
          <Card key={student.studentId} className={student.riskLevel === "critical" ? "border-destructive" : student.riskLevel === "high" ? "border-orange-400" : ""}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-violet-500" />
                  {student.name}
                </CardTitle>
                <Badge variant="outline" className="capitalize">{student.riskLevel} risk</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{student.class} • ID: {student.studentId}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>AI Risk Score</span>
                  <span className="font-bold">{student.riskScore}/100</span>
                </div>
                <Progress value={student.riskScore} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Predicted GPA</p>
                  <p className="font-bold text-lg">{student.predictedGpa}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Attendance Trend</p>
                  <p className="font-bold text-lg capitalize">{student.attendanceTrend}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium flex items-center gap-1 mb-2">
                  <CheckCircle className="h-4 w-4 text-success" /> Strengths
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {student.strengths.map((s, i) => <li key={i}>• {s}</li>)}
                </ul>
              </div>

              <div>
                <p className="text-sm font-medium flex items-center gap-1 mb-2">
                  <AlertCircle className="h-4 w-4 text-destructive" /> Concerns
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {student.concerns.map((c, i) => <li key={i}>• {c}</li>)}
                </ul>
              </div>

              <div>
                <p className="text-sm font-medium flex items-center gap-1 mb-2">
                  <Lightbulb className="h-4 w-4 text-accent" /> AI Recommendations
                </p>
                <ul className="text-sm space-y-1">
                  {student.recommendations.map((r, i) => (
                    <li key={i} className="bg-violet-50 dark:bg-violet-950/30 rounded px-2 py-1">→ {r}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
