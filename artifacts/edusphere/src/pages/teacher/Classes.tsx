import { useData } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users } from "lucide-react";

export default function TeacherClasses() {
  const { state } = useData();
  const myClasses = state.classes.filter(c => c.teacherId === "T001");
  const allMyStudents = state.students.filter(s =>
    myClasses.some(c => c.name === s.class && c.section === s.section)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Classes</h1>
        <p className="text-muted-foreground">Classes and students under your supervision.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {myClasses.map((cls) => {
          const students = state.students.filter(s => s.class === cls.name && s.section === cls.section);
          const avgAttendance = Math.round(students.reduce((a, s) => a + s.attendancePercent, 0) / students.length);
          const avgGpa = (students.reduce((a, s) => a + s.gpa, 0) / students.length).toFixed(1);

          return (
            <Card key={cls.id}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-base">
                  <span>{cls.name} Section {cls.section}</span>
                  <Badge variant="outline">{students.length}/{cls.capacity}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Avg Attendance</p>
                    <p className="font-bold text-lg">{avgAttendance}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Avg GPA</p>
                    <p className="font-bold text-lg">{avgGpa}</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Class Capacity</span>
                    <span>{Math.round((students.length / cls.capacity) * 100)}%</span>
                  </div>
                  <Progress value={(students.length / cls.capacity) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            All My Students ({allMyStudents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Roll No</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>GPA</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allMyStudents.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell>{s.class} {s.section}</TableCell>
                    <TableCell>{s.rollNo}</TableCell>
                    <TableCell>{s.attendancePercent}%</TableCell>
                    <TableCell>{s.gpa}</TableCell>
                    <TableCell>
                      <Badge variant={s.attendancePercent < 85 ? "destructive" : "outline"}>
                        {s.attendancePercent < 85 ? "Watch" : "Good"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
