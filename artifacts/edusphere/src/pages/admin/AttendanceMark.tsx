import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/hooks/use-toast";
import { Save, CheckSquare } from "lucide-react";
import { format } from "date-fns";

export default function AdminAttendanceMark() {
  const { state } = useData();
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState("Grade 6 A");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  
  // Initialize attendance state for all students in the selected class
  // Default to Present
  const [attendance, setAttendance] = useState<Record<string, string>>({});

  const classOptions = state.classes.map(c => `${c.name} ${c.section}`);
  
  // Filter students based on selected class
  const classStudents = state.students.filter(s => `${s.class} ${s.section}` === selectedClass);

  const handleMarkAll = (status: string) => {
    const newAttendance: Record<string, string> = {};
    classStudents.forEach(s => {
      newAttendance[s.id] = status;
    });
    setAttendance(newAttendance);
  };

  const handleToggle = (studentId: string, status: string) => {
    if (status) {
      setAttendance(prev => ({ ...prev, [studentId]: status }));
    }
  };

  const handleSave = () => {
    toast({
      title: "Attendance Saved",
      description: `Successfully marked attendance for ${selectedClass} on ${date}.`,
    });
  };

  // Helper to get status or default to "P"
  const getStatus = (id: string) => attendance[id] || "P";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mark Attendance</h1>
        <p className="text-muted-foreground">Record daily attendance for classes.</p>
      </div>

      <Card>
        <CardHeader className="pb-4 border-b">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex gap-4 flex-1">
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
              
              <Input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                className="w-[180px]"
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline" onClick={() => handleMarkAll("P")} className="flex-1 sm:flex-none">
                <CheckSquare className="h-4 w-4 mr-2" />
                Mark All Present
              </Button>
              <Button onClick={handleSave} className="flex-1 sm:flex-none">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16 px-6">Roll</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead className="text-right px-6">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classStudents.length > 0 ? (
                classStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="px-6 font-medium text-muted-foreground">{student.rollNo}</TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell className="text-right px-6">
                      <ToggleGroup 
                        type="single" 
                        value={getStatus(student.id)} 
                        onValueChange={(v) => handleToggle(student.id, v)}
                        className="justify-end"
                      >
                        <ToggleGroupItem value="P" aria-label="Present" className="data-[state=on]:bg-success data-[state=on]:text-white">
                          P
                        </ToggleGroupItem>
                        <ToggleGroupItem value="A" aria-label="Absent" className="data-[state=on]:bg-destructive data-[state=on]:text-white">
                          A
                        </ToggleGroupItem>
                        <ToggleGroupItem value="L" aria-label="Late" className="data-[state=on]:bg-secondary data-[state=on]:text-white">
                          L
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                    No students found in this class.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
