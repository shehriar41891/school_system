import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Sparkles } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { AIDisclaimerBanner } from "@/components/ai/AIDisclaimerBanner";
import { AIInsightCard } from "@/components/ai/AIInsightCard";
import { schoolWideInsights } from "@/data/aiMockData";

const trendData = [
  { month: "Jun", health: 78, attendance: 89, academics: 82 },
  { month: "Jul", health: 80, attendance: 91, academics: 84 },
  { month: "Aug", health: 79, attendance: 88, academics: 83 },
  { month: "Sep", health: 81, attendance: 90, academics: 85 },
  { month: "Oct", health: 83, attendance: 92, academics: 86 },
  { month: "Nov", health: 82, attendance: 91, academics: 85 },
];

const riskDistribution = [
  { name: "Low Risk", value: 7, color: "hsl(142, 76%, 36%)" },
  { name: "Medium Risk", value: 2, color: "hsl(45, 93%, 47%)" },
  { name: "High Risk", value: 2, color: "hsl(25, 95%, 53%)" },
  { name: "Critical", value: 1, color: "hsl(0, 84%, 60%)" },
];

export default function PrincipalAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Brain className="h-7 w-7 text-violet-600" />
          School-Wide AI Analytics
        </h1>
        <p className="text-muted-foreground">Deep AI analysis across all school operations and departments</p>
      </div>

      <AIDisclaimerBanner />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">6-Month AI Health Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis domain={[70, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="health" stroke="hsl(262, 83%, 58%)" strokeWidth={2} name="Health Score" />
                <Line type="monotone" dataKey="attendance" stroke="hsl(142, 76%, 36%)" strokeWidth={2} name="Attendance %" />
                <Line type="monotone" dataKey="academics" stroke="hsl(221, 83%, 53%)" strokeWidth={2} name="Academics %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Student Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={riskDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                  {riskDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-violet-500" />
          All AI-Generated Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {schoolWideInsights.map((insight) => (
            <AIInsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </div>
    </div>
  );
}
