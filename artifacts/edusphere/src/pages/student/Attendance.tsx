import { useData } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CalendarCheck, AlertTriangle } from "lucide-react";

export default function StudentAttendance() {
  const { state: data } = useData();
  const { toast } = useToast();
  const student = data.students[0];

  const daysInMonth = 30;
  const attendanceCells = Array.from({ length: daysInMonth }, (_, i) => {
    if (i < 20) return "P";
    return i % 3 === 0 ? "A" : (i % 2 === 0 ? "L" : "P");
  });

  const handleApplyLeave = () => {
    toast({
      title: "Leave Application Submitted",
      description: "Your request has been forwarded to the class teacher.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Attendance</h1>
        <p className="text-muted-foreground">View your attendance record and apply for leave.</p>
      </div>

      {student.attendancePercent < 75 && (
        <div className="bg-destructive/10 border border-destructive/50 text-destructive p-4 rounded-lg flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 mt-0.5 shrink-0" />
          <div>
            <h4 className="font-semibold">Low Attendance Warning</h4>
            <p className="text-sm">Your attendance is below the mandatory 75% requirement. Please maintain regular attendance.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarCheck className="h-5 w-5 text-success" />
              Monthly Record
            </CardTitle>
            <CardDescription>November 2023</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-medium text-muted-foreground pb-2">
                  {day}
                </div>
              ))}
              
              {/* Empty offset days */}
              <div className="aspect-square bg-muted/20 rounded"></div>
              <div className="aspect-square bg-muted/20 rounded"></div>
              <div className="aspect-square bg-muted/20 rounded"></div>

              {attendanceCells.map((status, idx) => (
                <div 
                  key={idx} 
                  className={`aspect-square rounded flex items-center justify-center font-semibold text-sm
                    ${status === 'P' ? 'bg-success/20 text-success border border-success/30' : ''}
                    ${status === 'A' ? 'bg-destructive/20 text-destructive border border-destructive/30' : ''}
                    ${status === 'L' ? 'bg-secondary/20 text-secondary border border-secondary/30' : ''}
                  `}
                >
                  {idx + 1}
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-success/50 border border-success"></div> Present (23)</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-destructive/50 border border-destructive"></div> Absent (4)</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-secondary/50 border border-secondary"></div> Late (3)</div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{student.attendancePercent}%</div>
              <p className="text-sm text-muted-foreground mt-1">Overall Attendance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Apply for Leave</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>From Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>To Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Reason</Label>
                <Textarea placeholder="Brief reason for leave..." className="h-20" />
              </div>
              <Button className="w-full" onClick={handleApplyLeave}>Submit Application</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
