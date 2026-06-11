import { useData } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, CalendarCheck, TrendingDown } from "lucide-react";

export default function AdminAttendanceReports() {
  const { state } = useData();

  const avgAttendance = state.students.reduce((acc, s) => acc + s.attendancePercent, 0) / state.students.length;
  const below75 = state.students.filter(s => s.attendancePercent < 75);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Attendance Reports</h1>
        <p className="text-muted-foreground">School-wide attendance statistics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Attendance</CardTitle>
            <CalendarCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{avgAttendance.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-1">Across all classes</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-destructive">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Students Below 75%</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{below75.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Requires immediate attention</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Student Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Roll No</TableHead>
                  <TableHead className="text-right">Attendance %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {state.students.sort((a, b) => a.attendancePercent - b.attendancePercent).map((student) => {
                  const isLow = student.attendancePercent < 75;
                  return (
                    <TableRow key={student.id} className={isLow ? "bg-destructive/10 hover:bg-destructive/20" : ""}>
                      <TableCell className="font-medium flex items-center gap-2">
                        {student.name}
                        {isLow && <TrendingDown className="h-4 w-4 text-destructive" />}
                      </TableCell>
                      <TableCell>{student.class} {student.section}</TableCell>
                      <TableCell>{student.rollNo}</TableCell>
                      <TableCell className={`text-right font-bold ${isLow ? "text-destructive" : ""}`}>
                        {student.attendancePercent}%
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
