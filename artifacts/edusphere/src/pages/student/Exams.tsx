import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, Calendar as CalendarIcon, MapPin } from "lucide-react";

export default function StudentExams() {
  const upcomingExams = [
    { id: 1, subject: "Mathematics", date: "2023-11-10", time: "09:00 AM", venue: "Main Hall", daysRemaining: 5 },
    { id: 2, subject: "Science", date: "2023-11-12", time: "09:00 AM", venue: "Main Hall", daysRemaining: 7 },
    { id: 3, subject: "English", date: "2023-11-15", time: "09:00 AM", venue: "Room 101", daysRemaining: 10 },
    { id: 4, subject: "History", date: "2023-11-18", time: "10:00 AM", venue: "Room 102", daysRemaining: 13 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Exams</h1>
        <p className="text-muted-foreground">View your upcoming examination schedule.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Exams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Venue</TableHead>
                    <TableHead className="text-right">Countdown</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingExams.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell className="font-bold">{exam.subject}</TableCell>
                      <TableCell>{exam.date}</TableCell>
                      <TableCell>{exam.time}</TableCell>
                      <TableCell>{exam.venue}</TableCell>
                      <TableCell className="text-right">
                        <span className={`font-semibold ${exam.daysRemaining <= 7 ? 'text-destructive' : 'text-primary'}`}>
                          {exam.daysRemaining} days
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4">
              {upcomingExams.map((exam) => (
                <div key={exam.id} className="border p-4 rounded-lg space-y-3">
                  <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="font-bold text-lg">{exam.subject}</h3>
                    <span className={`font-semibold text-sm px-2 py-1 rounded bg-muted ${exam.daysRemaining <= 7 ? 'text-destructive' : 'text-primary'}`}>
                      In {exam.daysRemaining} days
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><CalendarIcon className="h-4 w-4" /> {exam.date}</div>
                    <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> {exam.time}</div>
                    <div className="flex items-center gap-2 col-span-2"><MapPin className="h-4 w-4" /> {exam.venue}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
