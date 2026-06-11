import { Sparkles } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { StudentAIAnalysis, RiskLevel } from "@/data/aiMockData";

const riskBadge: Record<RiskLevel, string> = {
  low: "bg-success/10 text-success border-success/30",
  medium: "bg-secondary/10 text-secondary border-secondary/30",
  high: "bg-orange-100 text-orange-700 border-orange-300",
  critical: "bg-destructive/10 text-destructive border-destructive/30",
};

export function StudentRiskTable({ students }: { students: StudentAIAnalysis[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Risk Score</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Predicted GPA</TableHead>
            <TableHead>Attendance Trend</TableHead>
            <TableHead>Top Concern</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((s) => (
            <TableRow key={s.studentId}>
              <TableCell className="font-medium">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-violet-500" />
                  {s.name}
                </span>
              </TableCell>
              <TableCell>{s.class}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2 min-w-[100px]">
                  <Progress value={s.riskScore} className="h-2 flex-1" />
                  <span className="text-xs font-medium w-8">{s.riskScore}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={riskBadge[s.riskLevel]}>{s.riskLevel}</Badge>
              </TableCell>
              <TableCell>{s.predictedGpa.toFixed(1)}</TableCell>
              <TableCell className="capitalize">{s.attendanceTrend}</TableCell>
              <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                {s.concerns[0]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
