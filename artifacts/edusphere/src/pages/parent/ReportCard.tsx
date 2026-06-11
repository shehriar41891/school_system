import { useData } from "@/contexts/DataContext";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Download, Printer } from "lucide-react";

export default function ParentReportCard() {
  const { state } = useData();
  const [, setLocation] = useLocation();
  const student = state.students[0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => setLocation("/parent/academics")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Academics
        </Button>
        <div className="flex gap-2">
          <Button variant="outline"><Printer className="h-4 w-4 mr-2" /> Print</Button>
          <Button><Download className="h-4 w-4 mr-2" /> Download PDF</Button>
        </div>
      </div>

      <Card className="border-2 shadow-lg">
        <CardContent className="p-8 sm:p-12">
          {/* Header */}
          <div className="text-center border-b-2 border-primary pb-8 mb-8">
            <h1 className="text-3xl font-serif font-bold text-primary mb-2">EduSphere Academy</h1>
            <p className="text-muted-foreground">123 Education Lane, Learning City</p>
            <h2 className="text-xl font-bold mt-6 uppercase tracking-widest">Official Report Card</h2>
            <p className="text-sm font-medium mt-1">Academic Year 2023-2024 • Term 1</p>
          </div>

          {/* Student Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 bg-muted/30 p-6 rounded-lg">
            <div>
              <span className="text-xs text-muted-foreground uppercase font-bold block mb-1">Student Name</span>
              <span className="font-semibold text-lg">{student.name}</span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground uppercase font-bold block mb-1">Class & Section</span>
              <span className="font-semibold text-lg">{student.class} {student.section}</span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground uppercase font-bold block mb-1">Roll Number</span>
              <span className="font-semibold text-lg">{student.rollNo}</span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground uppercase font-bold block mb-1">Attendance</span>
              <span className="font-semibold text-lg">{student.attendancePercent}%</span>
            </div>
          </div>

          {/* Marks Table */}
          <div className="mb-10">
            <h3 className="font-bold text-lg mb-4 border-l-4 border-primary pl-3">Scholastic Performance</h3>
            <Table className="border">
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="font-bold">Subjects</TableHead>
                  <TableHead className="text-center font-bold">Max Marks</TableHead>
                  <TableHead className="text-center font-bold">Marks Obtained</TableHead>
                  <TableHead className="text-center font-bold">Grade</TableHead>
                  <TableHead className="font-bold">Teacher Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Mathematics</TableCell>
                  <TableCell className="text-center">100</TableCell>
                  <TableCell className="text-center font-semibold">92</TableCell>
                  <TableCell className="text-center font-bold text-primary">A</TableCell>
                  <TableCell>Excellent problem-solving skills.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Science</TableCell>
                  <TableCell className="text-center">100</TableCell>
                  <TableCell className="text-center font-semibold">88</TableCell>
                  <TableCell className="text-center font-bold text-primary">A</TableCell>
                  <TableCell>Very active in practical labs.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">English</TableCell>
                  <TableCell className="text-center">100</TableCell>
                  <TableCell className="text-center font-semibold">85</TableCell>
                  <TableCell className="text-center font-bold text-primary">B+</TableCell>
                  <TableCell>Good reading comprehension.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">History</TableCell>
                  <TableCell className="text-center">100</TableCell>
                  <TableCell className="text-center font-semibold">78</TableCell>
                  <TableCell className="text-center font-bold text-primary">B</TableCell>
                  <TableCell>Needs to memorize dates better.</TableCell>
                </TableRow>
                <TableRow className="bg-muted/30 font-bold border-t-2">
                  <TableCell>Total</TableCell>
                  <TableCell className="text-center">400</TableCell>
                  <TableCell className="text-center">343</TableCell>
                  <TableCell className="text-center">-</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Summary */}
          <div className="flex flex-col md:flex-row gap-6 mb-12">
            <div className="flex-1 bg-primary/5 border border-primary/20 p-6 rounded-lg text-center">
              <span className="text-sm font-semibold uppercase text-muted-foreground">Overall Percentage</span>
              <div className="text-4xl font-bold text-primary mt-2">85.7%</div>
            </div>
            <div className="flex-1 bg-primary/5 border border-primary/20 p-6 rounded-lg text-center">
              <span className="text-sm font-semibold uppercase text-muted-foreground">Overall Grade</span>
              <div className="text-4xl font-bold text-primary mt-2">A</div>
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-12 mt-12 border-t">
            <div className="text-center">
              <div className="border-b border-muted-foreground/50 h-10 w-48 mx-auto mb-2"></div>
              <span className="text-sm font-semibold text-muted-foreground">Class Teacher</span>
            </div>
            <div className="text-center hidden md:block">
              <div className="border-b border-muted-foreground/50 h-10 w-48 mx-auto mb-2"></div>
              <span className="text-sm font-semibold text-muted-foreground">Parent/Guardian</span>
            </div>
            <div className="text-center">
              <div className="border-b border-muted-foreground/50 h-10 w-48 mx-auto mb-2"></div>
              <span className="text-sm font-semibold text-muted-foreground">Principal</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
