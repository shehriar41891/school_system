import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

export default function AdminMarksEntry() {
  const { state } = useData();
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState("Grade 6 A");
  const [selectedExam, setSelectedExam] = useState("Mid-Term");

  const classOptions = state.classes.map(c => `${c.name} ${c.section}`);
  const classStudents = state.students.filter(s => `${s.class} ${s.section}` === selectedClass);
  const subjects = ["Math", "Science", "English", "History", "PE"];

  const [marks, setMarks] = useState<Record<string, Record<string, string>>>(() => {
    const initial: Record<string, Record<string, string>> = {};
    classStudents.forEach(s => {
      initial[s.id] = {};
      subjects.forEach(sub => {
        initial[s.id][sub] = Math.floor(Math.random() * 41 + 60).toString(); // 60-100
      });
    });
    return initial;
  });

  const handleMarkChange = (studentId: string, subject: string, value: string) => {
    setMarks(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [subject]: value
      }
    }));
  };

  const handleSave = () => {
    toast({
      title: "Marks Saved",
      description: `Marks for ${selectedClass} - ${selectedExam} updated successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Marks Entry</h1>
        <p className="text-muted-foreground">Record student marks for examinations.</p>
      </div>

      <Card>
        <CardHeader className="pb-4 border-b">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex gap-4 flex-1">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {classOptions.map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedExam} onValueChange={setSelectedExam}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Exam" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Unit Test 1">Unit Test 1</SelectItem>
                  <SelectItem value="Mid-Term">Mid-Term</SelectItem>
                  <SelectItem value="Unit Test 2">Unit Test 2</SelectItem>
                  <SelectItem value="Finals">Finals</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSave} className="w-full sm:w-auto">
              <Save className="h-4 w-4 mr-2" />
              Save Marks
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16 px-6">Roll</TableHead>
                  <TableHead className="min-w-[150px]">Student Name</TableHead>
                  {subjects.map(sub => (
                    <TableHead key={sub} className="w-24 text-center">{sub}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {classStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="px-6 font-medium text-muted-foreground">{student.rollNo}</TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    {subjects.map(sub => (
                      <TableCell key={sub} className="p-2">
                        <Input 
                          type="number" 
                          min="0" 
                          max="100" 
                          className="w-16 mx-auto text-center h-8"
                          value={marks[student.id]?.[sub] || ""}
                          onChange={(e) => handleMarkChange(student.id, sub, e.target.value)}
                        />
                      </TableCell>
                    ))}
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
