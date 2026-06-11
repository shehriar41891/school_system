import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Sparkles, Users, Clock } from "lucide-react";
import { AIDisclaimerBanner } from "@/components/ai/AIDisclaimerBanner";
import { studentAnalyses } from "@/data/aiMockData";

const upcomingMeetings = [
  { id: 1, parent: "Mr. & Mrs. Stone", student: "Ian Stone", date: "2023-12-02", time: "10:00", reason: "Critical attendance & academic intervention", aiPriority: "critical" },
  { id: 2, parent: "Mr. Wright", student: "Evan Wright", date: "2023-12-03", time: "14:00", reason: "Mathematics decline & attendance review", aiPriority: "high" },
  { id: 3, parent: "Mrs. Johnson", student: "Alice Johnson", date: "2023-12-05", time: "11:00", reason: "Advanced enrichment discussion", aiPriority: "low" },
  { id: 4, parent: "Mr. Smith", student: "Bob Smith", date: "2023-12-06", time: "15:30", reason: "Fee payment & English performance", aiPriority: "medium" },
];

export default function PrincipalMeetings() {
  const aiRecommended = studentAnalyses
    .filter(s => s.riskLevel === "critical" || s.riskLevel === "high")
    .map(s => ({
      student: s.name,
      reason: s.concerns[0],
      urgency: s.riskLevel,
      recommendation: s.recommendations[0],
    }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <CalendarDays className="h-7 w-7 text-violet-600" />
          AI-Enhanced Meetings
        </h1>
        <p className="text-muted-foreground">AI-recommended parent meetings based on student risk analysis</p>
      </div>

      <AIDisclaimerBanner />

      <Card className="border-violet-200 bg-violet-50/30 dark:bg-violet-950/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="h-5 w-5 text-violet-500" />
            AI-Recommended Meetings
          </CardTitle>
          <CardDescription>Based on combined attendance, academic, and behavioral risk scores</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {aiRecommended.map((m) => (
            <div key={m.student} className="flex items-start justify-between p-4 rounded-lg border bg-card">
              <div>
                <p className="font-medium">{m.student}</p>
                <p className="text-sm text-muted-foreground mt-1">{m.reason}</p>
                <p className="text-sm text-violet-700 dark:text-violet-300 mt-2">→ {m.recommendation}</p>
              </div>
              <Badge variant="outline" className="capitalize shrink-0">{m.urgency}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scheduled Meetings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Parent</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>AI Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingMeetings.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {m.parent}
                      </div>
                    </TableCell>
                    <TableCell>{m.student}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <span>{m.date}</span>
                        <span className="flex items-center gap-1 text-muted-foreground mt-0.5">
                          <Clock className="h-3 w-3" /> {m.time}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm max-w-[200px]">{m.reason}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">{m.aiPriority}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
