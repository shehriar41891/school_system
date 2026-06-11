import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock } from "lucide-react";

export default function StudentTimetable() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  
  const mockTimetable = days.reduce((acc, day) => {
    acc[day] = [
      { subject: "Mathematics", teacher: "Mr. Arthur", time: "08:00 AM" },
      { subject: "Science", teacher: "Dr. Diana", time: "09:00 AM" },
      { subject: "English", teacher: "Ms. Beatrice", time: "10:00 AM" },
      { subject: "Break", teacher: "", time: "11:00 AM" },
      { subject: "History", teacher: "Mr. Charles", time: "11:30 AM" },
      { subject: "PE", teacher: "Mr. Edward", time: "12:30 PM" },
    ];
    return acc;
  }, {} as Record<string, {subject: string, teacher: string, time: string}[]>);

  // Assuming it's Monday 09:30 AM
  const currentDay = "Monday";
  const currentPeriodIndex = 1;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Timetable</h1>
          <p className="text-muted-foreground">Weekly class schedule.</p>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-medium flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Up next: English at 10:00 AM
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-accent" />
            Weekly Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-6 gap-2 mb-4">
                <div className="font-semibold text-muted-foreground py-2">Day</div>
                {[1, 2, 3, "Break", 4, 5].map((p, i) => (
                  <div key={i} className="text-center">
                    <div className="font-semibold text-muted-foreground">{typeof p === 'number' ? `Period ${p}` : p}</div>
                    <div className="text-xs text-muted-foreground">{mockTimetable["Monday"][i].time}</div>
                  </div>
                ))}
              </div>

              {days.map((day) => (
                <div key={day} className="grid grid-cols-6 gap-2 mb-2">
                  <div className="font-semibold flex items-center bg-muted/20 p-2 rounded">{day}</div>
                  {mockTimetable[day].map((period, idx) => {
                    const isCurrent = day === currentDay && idx === currentPeriodIndex;
                    return (
                      <div 
                        key={idx} 
                        className={`p-3 rounded border text-center flex flex-col items-center justify-center transition-all
                          ${period.subject === 'Break' ? 'bg-muted/50 border-dashed text-muted-foreground' : 'bg-card border-border hover:border-primary/50'}
                          ${isCurrent ? 'ring-2 ring-accent border-transparent bg-accent/5' : ''}
                        `}
                      >
                        {period.subject !== 'Break' ? (
                          <>
                            <span className={`font-bold text-sm ${isCurrent ? 'text-accent' : 'text-foreground'}`}>{period.subject}</span>
                            <span className="text-xs text-muted-foreground mt-1">{period.teacher}</span>
                          </>
                        ) : (
                          <span className="font-medium text-sm tracking-widest uppercase">Break</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
