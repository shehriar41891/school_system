import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Sparkles } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";
import { AIDisclaimerBanner } from "@/components/ai/AIDisclaimerBanner";
import { AIInsightCard } from "@/components/ai/AIInsightCard";
import { schoolWideInsights } from "@/data/aiMockData";

const subjectPerformance = [
  { subject: "Math", school: 82, district: 78, target: 85 },
  { subject: "Science", school: 88, district: 80, target: 85 },
  { subject: "English", school: 79, district: 77, target: 82 },
  { subject: "History", school: 76, district: 75, target: 80 },
  { subject: "PE", school: 92, district: 85, target: 88 },
  { subject: "Art", school: 90, district: 82, target: 85 },
];

const gradeTrend = [
  { term: "T1", g6: 85, g5: 80, g4: 83, g3: 78, g2: 86, g1: 88 },
  { term: "T2", g6: 87, g5: 78, g4: 84, g3: 76, g2: 87, g1: 89 },
  { term: "T3", g6: 86, g5: 75, g4: 83, g3: 77, g2: 88, g1: 90 },
];

const academicInsights = schoolWideInsights.filter(i => i.category === "academic");

export default function PrincipalAcademicAnalysis() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <GraduationCap className="h-7 w-7 text-violet-600" />
          AI Academic Analysis
        </h1>
        <p className="text-muted-foreground">Subject-wise performance, grade trends, and AI academic recommendations</p>
      </div>

      <AIDisclaimerBanner />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Subject Performance vs Benchmarks</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectPerformance}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="subject" />
                <YAxis domain={[60, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="school" fill="hsl(262, 83%, 58%)" name="School Avg" radius={[4, 4, 0, 0]} />
                <Bar dataKey="district" fill="hsl(221, 83%, 53%)" name="District Avg" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="hsl(142, 76%, 36%)" name="Target" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Grade-Wise Academic Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={gradeTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="term" />
                <YAxis domain={[70, 95]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="g6" stroke="hsl(262, 83%, 58%)" name="Grade 6" />
                <Line type="monotone" dataKey="g5" stroke="hsl(0, 84%, 60%)" name="Grade 5" strokeWidth={2} />
                <Line type="monotone" dataKey="g4" stroke="hsl(221, 83%, 53%)" name="Grade 4" />
                <Line type="monotone" dataKey="g3" stroke="hsl(25, 95%, 53%)" name="Grade 3" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-violet-200 bg-violet-50/30 dark:bg-violet-950/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-violet-500" />
            AI Academic Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2 leading-relaxed">
          <p>School-wide GPA average is <strong>3.6</strong>, up 0.1 from last month. Science (88%) and PE (92%) exceed district benchmarks by 8% and 7% respectively.</p>
          <p><strong>Critical:</strong> Grade 5 B Mathematics has declined 12% over 6 weeks. AI recommends immediate remedial sessions for 4 affected students.</p>
          <p><strong>Opportunity:</strong> Grade 6 A History average (76%) is 4% below target. Cross-grade sharing of Science teaching methods could lift overall scores.</p>
          <p><strong>Prediction:</strong> Without intervention, Grade 5 B may fall below 70% average by end of term. With remedial action, AI projects recovery to 78% within 4 weeks.</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {academicInsights.map((insight) => (
          <AIInsightCard key={insight.id} insight={insight} />
        ))}
      </div>
    </div>
  );
}
