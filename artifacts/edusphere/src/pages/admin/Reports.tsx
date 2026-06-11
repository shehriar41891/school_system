import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AdminReports() {
  const classPerformanceData = [
    { class: "Grade 1", avgMarks: 85 },
    { class: "Grade 2", avgMarks: 82 },
    { class: "Grade 3", avgMarks: 78 },
    { class: "Grade 4", avgMarks: 88 },
    { class: "Grade 5", avgMarks: 75 },
    { class: "Grade 6", avgMarks: 80 },
  ];

  const subjectData = [
    { name: "Math", value: 30 },
    { name: "Science", value: 25 },
    { name: "English", value: 20 },
    { name: "History", value: 15 },
    { name: "PE", value: 10 },
  ];
  
  const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--success))", "hsl(var(--secondary))", "hsl(var(--destructive))"];

  const attendanceTrendData = [
    { month: "Jan", percent: 95 },
    { month: "Feb", percent: 94 },
    { month: "Mar", percent: 96 },
    { month: "Apr", percent: 92 },
    { month: "May", percent: 88 },
    { month: "Jun", percent: 91 },
  ];

  const feeData = [
    { class: "Grade 1", collected: 45000, target: 50000 },
    { class: "Grade 2", collected: 42000, target: 45000 },
    { class: "Grade 3", collected: 40000, target: 45000 },
    { class: "Grade 4", collected: 38000, target: 40000 },
    { class: "Grade 5", collected: 35000, target: 40000 },
    { class: "Grade 6", collected: 30000, target: 35000 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics & Reports</h1>
        <p className="text-muted-foreground">Comprehensive overview of school performance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Class Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classPerformanceData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="class" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip cursor={{ fill: "#f3f4f6" }} />
                <Bar dataKey="avgMarks" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subject Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subjectData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {subjectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceTrendData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} domain={[80, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="percent" stroke="hsl(var(--success))" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fee Collection by Class</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={feeData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="class" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: "#f3f4f6" }} />
                <Bar dataKey="collected" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} name="Collected" />
                <Bar dataKey="target" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} opacity={0.3} name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
