import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";
import { format } from "date-fns";

export default function TeacherAttendance() {
  const { state } = useData();
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState("Grade 6 A");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [attendance, setAttendance] = useState<Record<string, string>>({});

  const myClasses = ["Grade 6 A", "Grade 5 A"];
  const classStudents = state.students.filter(s => `${s.class} ${s.section}` === selectedClass);

  const handleMarkAll = (status: string) => {
    const next: Record<string, string> = {};
    classStudents.forEach(s => { next[s.id] = status; });
    setAttendance(next);
  };

  const getStatus = (id: string) => attendance[id] || "P";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Mark Attendance</h1>
        <p className="text-muted-foreground">Record daily attendance for your classes.</p>
      </div>

      <Card>
        <CardHeader className="pb-4 border-b">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex gap-4 flex-wrap">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {myClasses.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-[180px]" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleMarkAll("P")}>All Present</Button>
              <Button size="sm" onClick={() => toast({ title: "Attendance Saved", description: `Marked for ${selectedClass} on ${date}` })}>
                <Save className="h-4 w-4 mr-2" /> Save
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll</TableHead>
                <TableHead>Student</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classStudents.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.rollNo}</TableCell>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell className="text-right">
                    <ToggleGroup type="single" value={getStatus(s.id)} onValueChange={(v) => v && setAttendance(p => ({ ...p, [s.id]: v }))}>
                      <ToggleGroupItem value="P" className="data-[state=on]:bg-success data-[state=on]:text-white px-3">P</ToggleGroupItem>
                      <ToggleGroupItem value="A" className="data-[state=on]:bg-destructive data-[state=on]:text-white px-3">A</ToggleGroupItem>
                      <ToggleGroupItem value="L" className="data-[state=on]:bg-secondary data-[state=on]:text-white px-3">L</ToggleGroupItem>
                    </ToggleGroup>
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
