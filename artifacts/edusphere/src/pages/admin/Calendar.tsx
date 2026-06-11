import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminCalendar() {
  const events = [
    { date: 5, title: "Science Fair", type: "academic" },
    { date: 12, title: "Staff Meeting", type: "admin" },
    { date: 15, title: "Sports Day", type: "event" },
    { date: 20, title: "Parent-Teacher Meeting", type: "academic" },
    { date: 25, title: "Public Holiday", type: "holiday" },
    { date: 28, title: "Term Exams Begin", type: "academic" },
  ];

  const daysInMonth = 31;
  const startDayOffset = 3; // Let's say month starts on Wednesday
  
  const getEventsForDate = (date: number) => {
    return events.filter(e => e.date === date);
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'academic': return 'bg-primary/20 text-primary border-primary/30';
      case 'admin': return 'bg-secondary/20 text-secondary border-secondary/30';
      case 'event': return 'bg-accent/20 text-accent border-accent/30';
      case 'holiday': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Academic Calendar</h1>
          <p className="text-muted-foreground">Manage school events and holidays.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
            <CardTitle className="text-xl">May 2026</CardTitle>
            <Button variant="outline" size="icon"><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="bg-muted p-2 text-center text-sm font-semibold text-muted-foreground">
                {day}
              </div>
            ))}
            
            {Array.from({ length: startDayOffset }).map((_, i) => (
              <div key={`empty-${i}`} className="bg-card min-h-[100px] p-2 opacity-50" />
            ))}
            
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const date = i + 1;
              const dateEvents = getEventsForDate(date);
              
              return (
                <div key={date} className="bg-card min-h-[100px] p-2 border-t border-transparent hover:border-primary transition-colors">
                  <div className="font-medium text-sm text-muted-foreground mb-1">{date}</div>
                  <div className="space-y-1">
                    {dateEvents.map((evt, idx) => (
                      <div 
                        key={idx} 
                        className={`text-[10px] font-medium p-1 rounded border truncate ${getTypeColor(evt.type)}`}
                        title={evt.title}
                      >
                        {evt.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            
            {/* Fill remainder of grid */}
            {Array.from({ length: (7 - ((daysInMonth + startDayOffset) % 7)) % 7 }).map((_, i) => (
              <div key={`empty-end-${i}`} className="bg-card min-h-[100px] p-2 opacity-50" />
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary/50"></div> Academic</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-accent/50"></div> Event</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-secondary/50"></div> Administrative</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-destructive/50"></div> Holiday</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
