import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download } from "lucide-react";

export default function AdminReportCards() {
  const { state } = useData();
  const [selectedClass, setSelectedClass] = useState("Grade 6 A");
  
  const classOptions = state.classes.map(c => `${c.name} ${c.section}`);
  const classStudents = state.students.filter(s => `${s.class} ${s.section}` === selectedClass);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Report Cards</h1>
        <p className="text-muted-foreground">Generate and print student report cards.</p>
      </div>

      <div className="flex gap-4 items-center">
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Class" />
          </SelectTrigger>
          <SelectContent>
            {classOptions.map(c => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download All
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {classStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xl font-bold">
                {student.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{student.name}</h3>
                <p className="text-sm text-muted-foreground">Roll No: {student.rollNo}</p>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Preview Report
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold border-b pb-4">
                      EduSphere Academy<br/>
                      <span className="text-sm font-normal text-muted-foreground">Report Card - Term 1</span>
                    </DialogTitle>
                  </DialogHeader>
                  <div className="py-4 space-y-6">
                    <div className="grid grid-cols-2 gap-4 text-sm bg-muted/50 p-4 rounded-lg">
                      <div><span className="text-muted-foreground">Name:</span> <span className="font-semibold">{student.name}</span></div>
                      <div><span className="text-muted-foreground">Class:</span> <span className="font-semibold">{student.class} {student.section}</span></div>
                      <div><span className="text-muted-foreground">Roll No:</span> <span className="font-semibold">{student.rollNo}</span></div>
                      <div><span className="text-muted-foreground">Attendance:</span> <span className="font-semibold">{student.attendancePercent}%</span></div>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subject</TableHead>
                          <TableHead className="text-center">Marks</TableHead>
                          <TableHead className="text-center">Grade</TableHead>
                          <TableHead>Remarks</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Mathematics</TableCell>
                          <TableCell className="text-center">92/100</TableCell>
                          <TableCell className="text-center">A</TableCell>
                          <TableCell>Excellent</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Science</TableCell>
                          <TableCell className="text-center">88/100</TableCell>
                          <TableCell className="text-center">A</TableCell>
                          <TableCell>Very Good</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>English</TableCell>
                          <TableCell className="text-center">85/100</TableCell>
                          <TableCell className="text-center">B+</TableCell>
                          <TableCell>Good</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>

                    <div className="flex justify-between items-center bg-primary/5 p-4 rounded border border-primary/20">
                      <div className="font-semibold">Overall Percentage: <span className="text-primary text-lg">88.3%</span></div>
                      <div className="font-semibold">Overall Grade: <span className="text-primary text-lg">A</span></div>
                    </div>
                    
                    <div className="pt-8 flex justify-between text-sm font-medium text-muted-foreground border-t">
                      <div className="text-center w-32 border-t pt-2">Class Teacher</div>
                      <div className="text-center w-32 border-t pt-2">Principal</div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
