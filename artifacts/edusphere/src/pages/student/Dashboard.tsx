import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock, Calendar, Bell, FileText } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function StudentDashboard() {
  const { state: auth } = useAuth();
  const { state: data } = useData();

  // Find a mock student
  const student = data.students[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, {student.name.split(' ')[0]}!</h1>
          <p className="text-muted-foreground">{student.class} Section {student.section} • Roll No: {student.rollNo}</p>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-medium flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Today's Schedule: 8:00 AM - 3:00 PM
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" />
              Today's Timetable
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {/* Mock timeline items */}
              {[
                { time: "08:00 AM", subject: "Mathematics", teacher: "Mr. Arthur Pendragon", current: false },
                { time: "09:30 AM", subject: "Physics", teacher: "Mr. Arthur Pendragon", current: true },
                { time: "11:00 AM", subject: "English", teacher: "Ms. Beatrice Prior", current: false },
              ].map((slot, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow ${slot.current ? 'bg-accent text-white' : 'bg-muted text-muted-foreground'}`}>
                    <Clock className="h-4 w-4" />
                  </div>
                  <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border shadow-sm ${slot.current ? 'border-accent bg-accent/5' : 'bg-card'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-foreground">{slot.subject}</h4>
                      <span className="text-xs font-medium text-muted-foreground">{slot.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{slot.teacher}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Attendance</CardTitle>
              <CardDescription>Current month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between mb-2">
                <span className="text-3xl font-bold">{student.attendancePercent}%</span>
                <span className="text-sm font-medium text-success">Good standing</span>
              </div>
              <Progress value={student.attendancePercent} className="h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Notices</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-4">
              {data.notices.slice(0, 3).map(notice => (
                <div key={notice.id} className="border-b border-border last:border-0 pb-3 last:pb-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-muted-foreground">{notice.date}</span>
                    {notice.priority === 'High' && (
                      <span className="px-1.5 py-0.5 bg-destructive/10 text-destructive text-[10px] rounded font-bold uppercase tracking-wider">High</span>
                    )}
                  </div>
                  <p className="font-medium text-sm text-foreground">{notice.title}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
