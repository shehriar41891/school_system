import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from "recharts";

export default function StudentResults() {
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
  const totalObtained = currentResults.reduce((acc, r) => acc + r.obtained, 0);
  const totalMax = currentResults.reduce((acc, r) => acc + r.max, 0);
  const percentage = ((totalObtained / totalMax) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Academic Results</h1>
        <p className="text-muted-foreground">View your performance across different examinations.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full sm:w-[400px] grid-cols-2">
          <TabsTrigger value="unit-1">Unit Test 1</TabsTrigger>
          <TabsTrigger value="mid-term">Mid-Term</TabsTrigger>
        </TabsList>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
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
                        <TableHead className="text-right">Max Marks</TableHead>
                        <TableHead className="text-right">Obtained</TableHead>
                        <TableHead className="text-center">Grade</TableHead>
                        <TableHead>Remarks</TableHead>
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
                          <TableCell className="text-muted-foreground text-sm">{row.remarks}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance vs Class Average (%)</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="subject" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} domain={[0, 100]} />
                    <Tooltip cursor={{ fill: "#f3f4f6" }} />
                    <Bar dataKey="Score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="ClassAverage" fill="hsl(var(--muted-foreground))" opacity={0.3} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Overall Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-6 border-b">
                  <div className="text-5xl font-bold text-primary mb-2">{percentage}%</div>
                  <div className="text-muted-foreground font-medium">Overall Percentage</div>
                </div>
                <div className="pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Marks</span>
                    <span className="font-semibold">{totalObtained} / {totalMax}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Overall Grade</span>
                    <span className="font-semibold text-primary">A</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Class Rank</span>
                    <span className="font-semibold">4th</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
