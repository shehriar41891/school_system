import { useData } from "@/contexts/DataContext";
import { Brain, Sparkles, TrendingUp, BookOpen, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, PolarRadiusAxis } from "recharts";
import { AIDisclaimerBanner } from "@/components/ai/AIDisclaimerBanner";
import { AIInsightCard } from "@/components/ai/AIInsightCard";
import { parentChildInsights } from "@/data/aiMockData";

export default function ParentAIAnalysis() {
  const { state } = useData();
  const child = state.students[0];

  const subjectScores = [
    { subject: "Math", score: 92, potential: 95 },
    { subject: "Science", score: 88, potential: 92 },
    { subject: "English", score: 85, potential: 90 },
    { subject: "History", score: 78, potential: 88 },
    { subject: "PE", score: 95, potential: 96 },
  ];

  const wellnessRadar = [
    { area: "Academics", score: 88 },
    { area: "Attendance", score: 95 },
    { area: "Engagement", score: 92 },
    { area: "Behavior", score: 96 },
    { area: "Social", score: 90 },
    { area: "Wellbeing", score: 90 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Brain className="h-7 w-7 text-violet-600" />
          AI Child Analysis — {child.name}
        </h1>
        <p className="text-muted-foreground">Comprehensive AI-powered analysis of your child's academic journey</p>
      </div>

      <AIDisclaimerBanner />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-violet-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">AI Wellness Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-violet-700">88/100</div>
            <Progress value={88} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-success" /> Excellent overall performance
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Class Ranking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">Top 15%</div>
            <p className="text-xs text-muted-foreground mt-2">Of {child.class} Section {child.section}</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Predicted Term GPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3.9</div>
            <p className="text-xs text-muted-foreground mt-2">+0.1 from current {child.gpa}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Subject Scores vs AI Potential
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectScores}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="subject" tick={{ fontSize: 11 }} />
                <YAxis domain={[60, 100]} />
                <Tooltip />
                <Bar dataKey="score" fill="hsl(262, 83%, 58%)" name="Current" radius={[4, 4, 0, 0]} />
                <Bar dataKey="potential" fill="hsl(142, 76%, 36%)" name="AI Potential" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Child Wellness Radar
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={wellnessRadar}>
                <PolarGrid />
                <PolarAngleAxis dataKey="area" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar dataKey="score" stroke="hsl(262, 83%, 58%)" fill="hsl(262, 83%, 58%)" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-violet-200 bg-violet-50/30 dark:bg-violet-950/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-violet-500" />
            AI Narrative Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-relaxed space-y-2">
          <p>
            <strong>{child.name}</strong> is performing excellently this term with a GPA of {child.gpa} and {child.attendancePercent}% attendance.
            Mathematics (92%) and PE (95%) are standout subjects placing her in the top tier of her class.
          </p>
          <p>
            The primary growth opportunity is <strong>History (78%)</strong>, which is 7% below her personal average.
            AI modeling suggests focused revision on chapters 4-6 for 20 minutes daily could raise this to 85%+ within 3 weeks.
          </p>
          <p>
            Overall trajectory is <Badge variant="outline" className="text-success border-success">Positive</Badge> with a predicted term GPA of 3.9.
            No behavioral or attendance concerns detected.
          </p>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-violet-500" />
          AI Insights for Your Child
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {parentChildInsights.map((insight) => (
            <AIInsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </div>
    </div>
  );
}
