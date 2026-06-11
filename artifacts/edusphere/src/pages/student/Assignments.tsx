import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, Clock, FileText, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function StudentAssignments() {
  const { toast } = useToast();
  
  const [assignments, setAssignments] = useState([
    { id: 1, title: "Algebra Worksheet", subject: "Mathematics", dueDate: "2023-11-15", status: "Pending", priority: "high" },
    { id: 2, title: "Science Project Report", subject: "Science", dueDate: "2023-11-10", status: "Overdue", priority: "high" },
    { id: 3, title: "Essay: The Great Gatsby", subject: "English", dueDate: "2023-11-18", status: "Pending", priority: "medium" },
    { id: 4, title: "History Chapter 4 Notes", subject: "History", dueDate: "2023-11-05", status: "Submitted", priority: "low" },
    { id: 5, title: "Physics Lab Record", subject: "Science", dueDate: "2023-11-20", status: "Pending", priority: "medium" },
    { id: 6, title: "Math Quiz Prep", subject: "Mathematics", dueDate: "2023-11-08", status: "Submitted", priority: "high" },
  ]);

  const handleMarkSubmitted = (id: number) => {
    setAssignments(prev => prev.map(a => a.id === id ? { ...a, status: "Submitted" } : a));
    toast({
      title: "Assignment Submitted",
      description: "Marked as completed successfully.",
    });
  };

  const getStatusColor = (status: string) => {
    if (status === "Submitted") return "bg-success hover:bg-success";
    if (status === "Overdue") return "bg-destructive hover:bg-destructive";
    return "bg-secondary hover:bg-secondary"; // Amber
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Assignments</h1>
        <p className="text-muted-foreground">Track your homework and projects.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map(assignment => (
          <Card key={assignment.id} className="flex flex-col">
            <CardHeader className="pb-3 border-b">
              <div className="flex justify-between items-start gap-2">
                <CardTitle className="text-lg leading-tight">{assignment.title}</CardTitle>
                <Badge variant={assignment.status === "Pending" ? "default" : "secondary"} className={`shrink-0 ${getStatusColor(assignment.status)} ${assignment.status !== 'Pending' ? 'text-white' : ''}`}>
                  {assignment.status}
                </Badge>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-2">
                <BookOpen className="h-4 w-4" />
                <span>{assignment.subject}</span>
              </div>
            </CardHeader>
            <CardContent className="pt-4 flex-1">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className={assignment.status === "Overdue" ? "text-destructive font-medium" : ""}>
                  Due: {assignment.dueDate}
                </span>
              </div>
            </CardContent>
            <CardFooter className="pt-0 pb-4 px-4 bg-muted/20 border-t mt-auto flex gap-2">
              <Button variant="outline" className="flex-1" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                View Details
              </Button>
              {assignment.status !== "Submitted" && (
                <Button 
                  className="flex-1 bg-success hover:bg-success/90" 
                  size="sm"
                  onClick={() => handleMarkSubmitted(assignment.id)}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark Done
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
