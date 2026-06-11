import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, Sparkles } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { AIDisclaimerBanner } from "@/components/ai/AIDisclaimerBanner";
import { AIInsightCard } from "@/components/ai/AIInsightCard";
import { schoolWideInsights } from "@/data/aiMockData";
import { Badge } from "@/components/ui/badge";

const weekdayData = [
  { day: "Mon", percent: 84 },
  { day: "Tue", percent: 93 },
  { day: "Wed", percent: 95 },
  { day: "Thu", percent: 94 },
  { day: "Fri", percent: 92 },
];

const classAttendance = [
  { class: "Grade 6 A", percent: 96 },
  { class: "Grade 6 B", percent: 94 },
  { class: "Grade 5 A", percent: 91 },
  { class: "Grade 5 B", percent: 88 },
  { class: "Grade 4 A", percent: 93 },
  { class: "Grade 4 B", percent: 87 },
  { class: "Grade 3 A", percent: 92 },
  { class: "Grade 3 B", percent: 86 },
];

const monthlyTrend = [
  { month: "Jun", rate: 90 },
  { month: "Jul", rate: 92 },
  { month: "Aug", rate: 89 },
  { month: "Sep", rate: 91 },
  { month: "Oct", rate: 93 },
  { month: "Nov", rate: 91 },
];

const chronicAbsentees = [
  { name: "Ian Stone", class: "Grade 3 B", rate: 78, days: 8 },
  { name: "Evan Wright", class: "Grade 5 B", rate: 82, days: 6 },
  { name: "George Miller", class: "Grade 4 B", rate: 85, days: 5 },
];

const attendanceInsights = schoolWideInsights.filter(i => i.category === "attendance");

export default function PrincipalAttendanceAnalysis() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <CalendarCheck className="h-7 w-7 text-violet-600" />
          AI Attendance Analysis
        </h1>
        <p className="text-muted-foreground">Pattern detection, chronic absenteeism alerts, and predictive attendance modeling</p>
      </div>

      <AIDisclaimerBanner />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Weekday Pattern</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekdayData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis domain={[75, 100]} />
                <Tooltip />
                <Bar dataKey="percent" fill="hsl(262, 83%, 58%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Class Attendance</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classAttendance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[80, 100]} />
                <YAxis type="category" dataKey="class" width={80} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="percent" fill="hsl(142, 76%, 36%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">6-Month Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis domain={[85, 95]} />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke="hsl(262, 83%, 58%)" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-violet-500" />
            Chronic Absenteeism — AI Flagged
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {chronicAbsentees.map((s) => (
              <div key={s.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-sm text-muted-foreground">{s.class}</p>
                </div>
                <div className="text-right">
                  <Badge variant="destructive">{s.rate}% attendance</Badge>
                  <p className="text-xs text-muted-foreground mt-1">{s.days} absences this term</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {attendanceInsights.map((insight) => (
          <AIInsightCard key={insight.id} insight={insight} />
        ))}
      </div>
    </div>
  );
}
