import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";

export default function AdminTimetable() {
  const { state } = useData();
  const [selectedClass, setSelectedClass] = useState("Grade 6 A");
  const classOptions = state.classes.map(c => `${c.name} ${c.section}`);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  
  const mockTimetable = days.reduce((acc, day) => {
    acc[day] = [
      { subject: "Mathematics", teacher: "Mr. Arthur" },
      { subject: "Science", teacher: "Dr. Diana" },
      { subject: "English", teacher: "Ms. Beatrice" },
      { subject: "Break", teacher: "" },
      { subject: "History", teacher: "Mr. Charles" },
      { subject: "PE", teacher: "Mr. Edward" },
    ];
    return acc;
  }, {} as Record<string, {subject: string, teacher: string}[]>);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Class Timetable</h1>
          <p className="text-muted-foreground">View weekly schedule for classes.</p>
        </div>
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            Weekly Schedule: {selectedClass}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-6 gap-2 mb-2">
                <div className="font-semibold text-muted-foreground py-2">Day / Period</div>
                {[1, 2, 3, "Break", 4, 5].map((p, i) => (
                  <div key={i} className="font-semibold text-center text-muted-foreground py-2 bg-muted/50 rounded">
                    {typeof p === 'number' ? `Period ${p}` : p}
                  </div>
                ))}
              </div>

              {days.map((day) => (
                <div key={day} className="grid grid-cols-6 gap-2 mb-2">
                  <div className="font-semibold flex items-center bg-muted/20 p-2 rounded">{day}</div>
                  {mockTimetable[day].map((period, idx) => (
                    <div 
                      key={idx} 
                      className={`p-3 rounded border text-center flex flex-col items-center justify-center
                        ${period.subject === 'Break' ? 'bg-muted/50 border-dashed text-muted-foreground' : 'bg-card border-border hover:border-primary/50 transition-colors'}
                      `}
                    >
                      {period.subject !== 'Break' ? (
                        <>
                          <span className="font-bold text-sm text-foreground">{period.subject}</span>
                          <span className="text-xs text-muted-foreground mt-1">{period.teacher}</span>
                        </>
                      ) : (
                        <span className="font-medium text-sm tracking-widest uppercase">Break</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
