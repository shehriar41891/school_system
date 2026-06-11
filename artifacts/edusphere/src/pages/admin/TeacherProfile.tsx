import { useData } from "@/contexts/DataContext";
import { useParams, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UserSquare2, Book, CalendarDays, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminTeacherProfile() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { state } = useData();

  const teacher = state.teachers.find((t) => t.id === id);

  if (!teacher) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <h2 className="text-2xl font-bold">Teacher Not Found</h2>
        <Button onClick={() => setLocation("/admin/teachers")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Teachers
        </Button>
      </div>
    );
  }

  // Mock schedule data
  const schedule = [
    { day: "Mon", periods: ["Math (6A)", "Free", "Physics (6B)", "Math (5A)", "Free", "Physics (5B)"] },
    { day: "Tue", periods: ["Physics (6A)", "Math (6B)", "Free", "Free", "Math (5A)", "Math (5B)"] },
    { day: "Wed", periods: ["Math (6A)", "Math (6B)", "Physics (5A)", "Physics (5B)", "Free", "Free"] },
    { day: "Thu", periods: ["Free", "Physics (6A)", "Physics (6B)", "Free", "Math (5A)", "Math (5B)"] },
    { day: "Fri", periods: ["Math (6A)", "Math (6B)", "Free", "Physics (5A)", "Physics (5B)", "Free"] },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => setLocation("/admin/teachers")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{teacher.name}</h1>
          <p className="text-muted-foreground">{teacher.id}</p>
        </div>
        <div className="ml-auto">
          <Badge variant={teacher.status === "Active" ? "default" : "destructive"} className={teacher.status === "Active" ? "bg-success" : ""}>
            {teacher.status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <UserSquare2 className="h-5 w-5 text-primary" />
              Teacher Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <span className="text-muted-foreground block text-sm mb-1 flex items-center gap-2"><Book className="h-4 w-4" /> Subjects Taught</span>
              <div className="flex gap-2 flex-wrap mt-2">
                {teacher.subjects.map(sub => (
                  <Badge key={sub} variant="secondary">{sub}</Badge>
                ))}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground block text-sm mb-1">Class Teacher Of</span>
              <span className="font-medium text-lg">{teacher.classTeacher || "None"}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-accent" />
              Weekly Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[600px]">
                <div className="grid grid-cols-7 gap-2 mb-2">
                  <div className="font-medium text-muted-foreground text-sm py-2">Day</div>
                  {[1, 2, 3, 4, 5, 6].map(p => (
                    <div key={p} className="font-medium text-muted-foreground text-sm py-2 text-center">P{p}</div>
                  ))}
                </div>
                {schedule.map((dayRow) => (
                  <div key={dayRow.day} className="grid grid-cols-7 gap-2 mb-2">
                    <div className="font-medium flex items-center">{dayRow.day}</div>
                    {dayRow.periods.map((period, idx) => (
                      <div 
                        key={idx} 
                        className={`p-2 rounded text-xs text-center flex items-center justify-center
                          ${period === 'Free' ? 'bg-muted/30 text-muted-foreground border border-dashed' : 'bg-accent/10 text-accent border border-accent/20 font-medium'}
                        `}
                      >
                        {period}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
