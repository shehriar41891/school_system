import { useData } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CalendarCheck } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ParentAttendance() {
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
      description: "Request has been sent to the class teacher.",
    });
  };

  const trendData = [
    { month: "Jun", percent: 98 },
    { month: "Jul", percent: 95 },
    { month: "Aug", percent: 85 },
    { month: "Sep", percent: 90 },
    { month: "Oct", percent: 95 },
    { month: "Nov", percent: 92 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Attendance</h1>
        <p className="text-muted-foreground">Monitor attendance and apply for leaves for {student.name}.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarCheck className="h-5 w-5 text-success" />
                Current Month Record
              </CardTitle>
              <CardDescription>November 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 max-w-sm mx-auto">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-xs font-medium text-muted-foreground pb-2">
                    {day}
                  </div>
                ))}
                
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
              
              <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-success/50 border border-success"></div> Present</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-destructive/50 border border-destructive"></div> Absent</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-secondary/50 border border-secondary"></div> Late</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">6-Month Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} domain={[50, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="percent" stroke="hsl(var(--success))" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Apply for Leave</CardTitle>
            <CardDescription>Submit a leave application for your child.</CardDescription>
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
              <Textarea placeholder="Please provide the reason for leave..." className="h-32" />
            </div>
            <div className="space-y-2">
              <Label>Supporting Document (Optional)</Label>
              <Input type="file" />
            </div>
            <Button className="w-full mt-4" onClick={handleApplyLeave}>Submit Application</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
