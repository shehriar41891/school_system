import { useData } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GraduationCap, AlertCircle, Calendar, MessageSquare, BookOpen } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ParentDashboard() {
  const { state: data } = useData();

  // Find a mock student linked to this parent (P001 -> S001)
  const child = data.students[0];
  const feeStatus = data.fees.find(f => f.studentId === child.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Parent Dashboard</h1>
          <p className="text-muted-foreground">Overview for {child.name}</p>
        </div>
      </div>

      {feeStatus?.status === 'Overdue' && (
        <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <AlertTitle className="text-destructive">Fee Payment Overdue</AlertTitle>
          <AlertDescription className="text-destructive/90">
            There is an outstanding balance of ${feeStatus.tuition} for the current term. Please clear the dues by {feeStatus.dueDate}.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-primary-foreground/20 rounded-full flex items-center justify-center text-xl font-bold">
                {child.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="text-right">
                <p className="text-sm opacity-80">{child.class}</p>
                <p className="text-sm opacity-80">Sec {child.section}</p>
              </div>
            </div>
            <h3 className="font-bold text-xl">{child.name}</h3>
            <div className="mt-4 pt-4 border-t border-primary-foreground/20 flex justify-between text-sm">
              <span>Status: Present</span>
              <span className="font-medium bg-success text-white px-2 py-0.5 rounded text-xs">In School</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{child.attendancePercent}%</div>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Current term</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Academic Standing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{child.gpa} <span className="text-lg text-muted-foreground font-normal">GPA</span></div>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <GraduationCap className="h-4 w-4" />
              <span className="text-success">Top 15% of class</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Latest Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">92%</div>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>Mid-Term Mathematics</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Notices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.notices.map(notice => (
              <div key={notice.id} className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                <div className="bg-background p-2 rounded shadow-sm shrink-0">
                  <MessageSquare className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{notice.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{notice.date} • From {notice.author}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
