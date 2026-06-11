import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Save, PenLine } from "lucide-react";

export default function TeacherMarks() {
  const { state } = useData();
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState("Grade 6 A");
  const [selectedExam, setSelectedExam] = useState("Mid-Term");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");

  const classStudents = state.students.filter(s => `${s.class} ${s.section}` === selectedClass);
  const [marks, setMarks] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    classStudents.forEach(s => { initial[s.id] = String(Math.floor(Math.random() * 41 + 60)); });
    return initial;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <PenLine className="h-6 w-6" /> Marks Entry
        </h1>
        <p className="text-muted-foreground">Enter and update student marks for your subjects.</p>
      </div>

      <Card>
        <CardHeader className="pb-4 border-b">
          <div className="flex flex-wrap gap-4">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Grade 6 A">Grade 6 A</SelectItem>
                <SelectItem value="Grade 5 A">Grade 5 A</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedExam} onValueChange={setSelectedExam}>
              <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Unit Test 1">Unit Test 1</SelectItem>
                <SelectItem value="Mid-Term">Mid-Term</SelectItem>
                <SelectItem value="Final">Final</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => toast({ title: "Marks Saved", description: `${selectedSubject} marks for ${selectedClass} saved.` })}>
              <Save className="h-4 w-4 mr-2" /> Save Marks
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll</TableHead>
                <TableHead>Student</TableHead>
                <TableHead className="w-[120px]">Marks (/{selectedExam === "Unit Test 1" ? "50" : "100"})</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classStudents.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.rollNo}</TableCell>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={marks[s.id] ?? ""}
                      onChange={(e) => setMarks(p => ({ ...p, [s.id]: e.target.value }))}
                      className="w-20"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
