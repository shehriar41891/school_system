import { Link } from "wouter";
import { useData } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users, ClipboardList, HelpCircle, FileText, BookOpen,
  CalendarDays, Sparkles, Clock,
} from "lucide-react";
import { AIDisclaimerBanner } from "@/components/ai/AIDisclaimerBanner";

const todaySchedule = [
  { time: "08:00", subject: "Mathematics", class: "Grade 6 A" },
  { time: "09:30", subject: "Physics", class: "Grade 6 A" },
  { time: "11:00", subject: "Mathematics", class: "Grade 5 A" },
  { time: "14:00", subject: "Remedial Math", class: "Grade 5 B" },
];

const pendingTasks = [
  { title: "Grade Mid-Term Assignments", count: 12, href: "/teacher/assignments" },
  { title: "Quizzes awaiting review", count: 3, href: "/teacher/quizzes" },
  { title: "Unread parent messages", count: 5, href: "/teacher/messages" },
];

export default function TeacherDashboard() {
  const { state } = useData();
  const myClass = state.classes[0];
  const myStudents = state.students.filter(s => s.class === myClass.name && s.section === myClass.section);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome, Mr. Arthur Pendragon</h1>
        <p className="text-muted-foreground">Class Teacher — Grade 6 A • Mathematics & Physics</p>
      </div>

      <AIDisclaimerBanner compact />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">My Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{myStudents.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Grade 6 Section A</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-accent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Assignments to Grade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">Due this week</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-secondary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Active Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">2 drafts, 1 published</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-violet-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">AI Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-violet-700">4</div>
            <p className="text-xs text-muted-foreground mt-1">New teaching ideas today</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-4 w-4" /> Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {todaySchedule.map((slot) => (
              <div key={slot.time} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium text-sm">{slot.subject}</p>
                  <p className="text-xs text-muted-foreground">{slot.class}</p>
                </div>
                <Badge variant="outline">{slot.time}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingTasks.map((task) => (
              <Link key={task.title} href={task.href}>
                <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors">
                  <span className="text-sm font-medium">{task.title}</span>
                  <Badge>{task.count}</Badge>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-violet-500" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "Create Assignment", icon: ClipboardList, href: "/teacher/assignments" },
            { label: "Upload Materials", icon: BookOpen, href: "/teacher/materials" },
            { label: "Generate Syllabus", icon: FileText, href: "/teacher/syllabus" },
            { label: "Create Quiz", icon: HelpCircle, href: "/teacher/quizzes" },
            { label: "Mark Attendance", icon: Users, href: "/teacher/attendance" },
            { label: "View Timetable", icon: CalendarDays, href: "/teacher/timetable" },
          ].map((action) => (
            <Link key={action.label} href={action.href}>
              <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
                <action.icon className="h-5 w-5 text-accent" />
                <span className="text-xs text-center">{action.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
