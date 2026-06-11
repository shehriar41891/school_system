import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon, Clock, Users } from "lucide-react";

export default function ParentMeetings() {
  const { state } = useData();
  const { toast } = useToast();

  const handleRequest = () => {
    toast({
      title: "Meeting Requested",
      description: "Your request has been sent. You will be notified once confirmed.",
    });
  };

  const meetingsHistory = [
    { id: 1, date: "2023-11-25", time: "14:00", teacher: "Mr. Arthur Pendragon", type: "Academic Review", status: "Pending" },
    { id: 2, date: "2023-10-15", time: "15:30", teacher: "Ms. Beatrice Prior", type: "General Discussion", status: "Confirmed" },
    { id: 3, date: "2023-09-05", time: "10:00", teacher: "Principal", type: "PTA Meeting", status: "Completed" },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Confirmed": return <Badge className="bg-success hover:bg-success">Confirmed</Badge>;
      case "Completed": return <Badge variant="secondary">Completed</Badge>;
      case "Pending": return <Badge variant="outline" className="border-secondary text-secondary">Pending</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Meetings</h1>
        <p className="text-muted-foreground">Schedule and view parent-teacher meetings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Request a Meeting</CardTitle>
            <CardDescription>Schedule time with a teacher.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Teacher</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Teacher" />
                </SelectTrigger>
                <SelectContent>
                  {state.teachers.map(t => (
                    <SelectItem key={t.id} value={t.id}>{t.name} ({t.subjects[0]})</SelectItem>
                  ))}
                  <SelectItem value="principal">Principal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Preferred Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <Input type="time" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Purpose/Reason</Label>
              <Textarea placeholder="Briefly describe what you'd like to discuss..." className="h-24" />
            </div>

            <Button className="w-full mt-2" onClick={handleRequest}>Submit Request</Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Meeting History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {meetingsHistory.map((meeting) => (
                    <TableRow key={meeting.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {meeting.teacher}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="flex items-center gap-1"><CalendarIcon className="h-3 w-3 text-muted-foreground" /> {meeting.date}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-muted-foreground" /> {meeting.time}</span>
                        </div>
                      </TableCell>
                      <TableCell>{meeting.type}</TableCell>
                      <TableCell>{getStatusBadge(meeting.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
