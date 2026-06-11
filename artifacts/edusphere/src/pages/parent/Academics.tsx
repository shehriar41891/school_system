import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles } from "lucide-react";
import { AIBadge } from "@/components/ai/AIBadge";

export default function ParentAcademics() {
  const { state } = useData();
  const student = state.students[0];
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("mid-term");

  const resultsData = {
    "unit-1": [
      { subject: "Mathematics", max: 50, obtained: 45, grade: "A", remarks: "Excellent" },
      { subject: "Science", max: 50, obtained: 42, grade: "A", remarks: "Very Good" },
      { subject: "English", max: 50, obtained: 38, grade: "B+", remarks: "Good" },
    ],
    "mid-term": [
      { subject: "Mathematics", max: 100, obtained: 92, grade: "A", remarks: "Excellent progress" },
      { subject: "Science", max: 100, obtained: 88, grade: "A", remarks: "Very Good" },
      { subject: "English", max: 100, obtained: 85, grade: "B+", remarks: "Good" },
      { subject: "History", max: 100, obtained: 78, grade: "B", remarks: "Can improve" },
      { subject: "PE", max: 100, obtained: 95, grade: "A+", remarks: "Outstanding" },
    ]
  };

  const chartData = resultsData[activeTab as keyof typeof resultsData].map(r => ({
    subject: r.subject,
    Score: Math.round((r.obtained / r.max) * 100),
    ClassAverage: 75 // Mock average
  }));

  const currentResults = resultsData[activeTab as keyof typeof resultsData];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            Academics
            <AIBadge />
          </h1>
          <p className="text-muted-foreground">AI-enhanced examination results and performance analytics for {student.name}.</p>
        </div>
        <Button onClick={() => setLocation("/parent/academics/reportcard")}>
          <FileText className="h-4 w-4 mr-2" />
          View Full Report Card
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full sm:w-[400px] grid-cols-2">
          <TabsTrigger value="unit-1">Unit Test 1</TabsTrigger>
          <TabsTrigger value="mid-term">Mid-Term</TabsTrigger>
        </TabsList>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Subject Marks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead className="text-right">Max</TableHead>
                      <TableHead className="text-right">Obtained</TableHead>
                      <TableHead className="text-center">Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentResults.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{row.subject}</TableCell>
                        <TableCell className="text-right">{row.max}</TableCell>
                        <TableCell className="text-right font-bold">{row.obtained}</TableCell>
                        <TableCell className="text-center">
                          <span className="bg-primary/10 text-primary px-2 py-1 rounded font-bold">{row.grade}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Child vs Class Average (%)</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="subject" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip cursor={{ fill: "#f3f4f6" }} />
                  <Bar dataKey="Score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name={`${student.name}'s Score`} />
                  <Bar dataKey="ClassAverage" fill="hsl(var(--muted-foreground))" opacity={0.3} radius={[4, 4, 0, 0]} name="Class Average" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </Tabs>

      <Card className="border-violet-200 bg-violet-50/30 dark:bg-violet-950/10">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-violet-500" />
            AI Academic Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2 leading-relaxed">
          <p><strong>{student.name}</strong> averages <strong>87.6%</strong> across Mid-Term subjects — top 15% of class.</p>
          <p>Standout: Mathematics (92%) and PE (95%). Growth area: History (78%) — AI predicts 85%+ with 20 min daily revision on chapters 4-6.</p>
          <p>Predicted term GPA: <strong>3.9</strong> based on current trajectory and engagement patterns.</p>
        </CardContent>
      </Card>
    </div>
  );
}
