import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";

const schedule = {
  Monday: [
    { time: "08:00", subject: "Mathematics", class: "Grade 6 A", room: "Room 201" },
    { time: "09:30", subject: "Physics", class: "Grade 6 A", room: "Lab 1" },
    { time: "11:00", subject: "Free Period", class: "—", room: "Staff Room" },
    { time: "14:00", subject: "Mathematics", class: "Grade 5 A", room: "Room 105" },
  ],
  Tuesday: [
    { time: "08:00", subject: "Physics", class: "Grade 6 A", room: "Lab 1" },
    { time: "10:00", subject: "Mathematics", class: "Grade 6 A", room: "Room 201" },
    { time: "13:00", subject: "Staff Meeting", class: "—", room: "Conference" },
  ],
  Wednesday: [
    { time: "08:00", subject: "Mathematics", class: "Grade 5 A", room: "Room 105" },
    { time: "09:30", subject: "Mathematics", class: "Grade 6 A", room: "Room 201" },
    { time: "14:00", subject: "Remedial Math", class: "Grade 5 B", room: "Room 102" },
  ],
  Thursday: [
    { time: "08:00", subject: "Physics", class: "Grade 6 A", room: "Lab 1" },
    { time: "11:00", subject: "Mathematics", class: "Grade 6 A", room: "Room 201" },
  ],
  Friday: [
    { time: "08:00", subject: "Mathematics", class: "Grade 6 A", room: "Room 201" },
    { time: "09:30", subject: "Mathematics", class: "Grade 5 A", room: "Room 105" },
    { time: "14:00", subject: "Free Period", class: "—", room: "Staff Room" },
  ],
};

export default function TeacherTimetable() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <CalendarDays className="h-6 w-6" /> My Timetable
        </h1>
        <p className="text-muted-foreground">Your weekly teaching schedule.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(schedule).map(([day, slots]) => (
          <Card key={day}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{day}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {slots.map((slot) => (
                <div key={slot.time} className="flex items-start gap-3 p-2 rounded-lg bg-muted/50">
                  <Badge variant="outline" className="shrink-0 text-xs">{slot.time}</Badge>
                  <div>
                    <p className="font-medium text-sm">{slot.subject}</p>
                    <p className="text-xs text-muted-foreground">{slot.class} • {slot.room}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
