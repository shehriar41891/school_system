import { useData } from "@/contexts/DataContext";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminTeachers() {
  const { state } = useData();
  const [, setLocation] = useLocation();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Teachers</h1>
          <p className="text-muted-foreground">Manage and view teacher information.</p>
        </div>
        <Button variant="outline" className="opacity-50 cursor-not-allowed">
          <Plus className="h-4 w-4 mr-2" />
          Add Teacher (Coming Soon)
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Teachers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Subjects</TableHead>
                  <TableHead>Class Teacher</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {state.teachers.length > 0 ? (
                  state.teachers.map((teacher) => (
                    <TableRow 
                      key={teacher.id} 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setLocation(`/admin/teachers/${teacher.id}`)}
                    >
                      <TableCell className="font-medium">{teacher.name}</TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {teacher.subjects.map(subject => (
                            <Badge key={subject} variant="secondary" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{teacher.classTeacher || <span className="text-muted-foreground">N/A</span>}</TableCell>
                      <TableCell>
                        <Badge variant={teacher.status === "Active" ? "default" : "destructive"} className={teacher.status === "Active" ? "bg-success hover:bg-success" : ""}>
                          {teacher.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No teachers found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
