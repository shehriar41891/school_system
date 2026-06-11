import { useData } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Users, AlertTriangle, TrendingUp, Sparkles } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, PolarRadiusAxis } from "recharts";
import { AIDisclaimerBanner } from "@/components/ai/AIDisclaimerBanner";
import { AIInsightCard } from "@/components/ai/AIInsightCard";
import { StudentRiskTable } from "@/components/ai/StudentRiskTable";
import { schoolWideInsights, studentAnalyses, monthlySchoolReport } from "@/data/aiMockData";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function PrincipalDashboard() {
  const { state } = useData();
  const criticalInsights = schoolWideInsights.filter(i => i.severity === "critical" || i.severity === "high");
  const atRisk = studentAnalyses.filter(s => s.riskLevel === "critical" || s.riskLevel === "high");

  const healthData = [
    { area: "Academics", score: 85 },
    { area: "Attendance", score: 78 },
    { area: "Fees", score: 87 },
    { area: "Behavior", score: 92 },
    { area: "Staff", score: 90 },
    { area: "Engagement", score: 83 },
  ];

  const classPerformance = [
    { class: "G6A", avg: 88 },
    { class: "G6B", avg: 82 },
    { class: "G5A", avg: 85 },
    { class: "G5B", avg: 71 },
    { class: "G4A", avg: 86 },
    { class: "G4B", avg: 79 },
    { class: "G3A", avg: 84 },
    { class: "G3B", avg: 74 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="h-7 w-7 text-violet-600" />
            AI Command Center
          </h1>
          <p className="text-muted-foreground">Real-time school intelligence powered by EduSphere AI</p>
        </div>
        <Link href="/principal/reports">
          <Button className="bg-violet-600 hover:bg-violet-700">
            <Sparkles className="h-4 w-4 mr-2" />
            View Monthly AI Report
          </Button>
        </Link>
      </div>

      <AIDisclaimerBanner />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-violet-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">AI Health Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-violet-700">{monthlySchoolReport.overallScore}/100</div>
            <Progress value={monthlySchoolReport.overallScore} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">November 2023</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-destructive">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Critical Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{criticalInsights.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Require immediate action</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">At-Risk Students</CardTitle>
            <Users className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{atRisk.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Of {state.students.length} total students</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Improving Areas</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">4</div>
            <p className="text-xs text-muted-foreground mt-1">Departments above benchmark</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-violet-500" />
              School Health Radar
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={healthData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="area" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar dataKey="score" stroke="hsl(262, 83%, 58%)" fill="hsl(262, 83%, 58%)" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">AI Class Performance Index</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classPerformance}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="class" tick={{ fontSize: 11 }} />
                <YAxis domain={[60, 100]} />
                <Tooltip />
                <Bar dataKey="avg" fill="hsl(262, 83%, 58%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-violet-500" />
          AI Priority Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {schoolWideInsights.slice(0, 4).map((insight) => (
            <AIInsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Student Risk Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <StudentRiskTable students={studentAnalyses} />
        </CardContent>
      </Card>
    </div>
  );
}
