import { useData } from "@/contexts/DataContext";
import { useParams } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, GraduationCap, Users } from "lucide-react";

export default function ParentChildProfile() {
  const { id } = useParams<{ id: string }>();
  const { state } = useData();

  // If id is not passed correctly or we want a default mock
  const student = state.students.find((s) => s.id === id) || state.students[0];
  const classTeacher = state.teachers.find(t => t.classTeacher === `${student.class} ${student.section}`);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Child Profile</h1>
        <p className="text-muted-foreground">View details for {student.name}.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 border-primary/20">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="mx-auto w-24 h-24 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-3xl font-bold">
              {student.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-xl font-bold">{student.name}</h2>
              <p className="text-muted-foreground">Student ID: {student.id}</p>
            </div>
            <Badge variant={student.status === "Active" ? "default" : "destructive"} className="bg-success">
              {student.status}
            </Badge>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <GraduationCap className="h-5 w-5 text-accent" />
              Academic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <span className="text-xs text-muted-foreground uppercase font-semibold">Class</span>
                <p className="font-medium text-base mt-1">{student.class}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase font-semibold">Section</span>
                <p className="font-medium text-base mt-1">{student.section}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase font-semibold">Roll No</span>
                <p className="font-medium text-base mt-1">{student.rollNo}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase font-semibold">Date of Birth</span>
                <p className="font-medium text-base mt-1">15 May 2010</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase font-semibold">Blood Group</span>
                <p className="font-medium text-base mt-1">O+</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase font-semibold">Current GPA</span>
                <p className="font-medium text-base mt-1">{student.gpa.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="h-5 w-5 text-secondary" />
              Class Teacher
            </CardTitle>
          </CardHeader>
          <CardContent>
            {classTeacher ? (
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-full flex items-center justify-center font-bold text-lg">
                  {classTeacher.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{classTeacher.name}</h3>
                  <p className="text-sm text-muted-foreground">Class Teacher - {student.class} {student.section}</p>
                </div>
              </div>
            ) : (
              <div className="text-muted-foreground">No class teacher assigned.</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-primary" />
              Siblings Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-3 rounded-lg border border-border">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold">
                M
              </div>
              <div>
                <h3 className="font-semibold">Mia Johnson</h3>
                <p className="text-xs text-muted-foreground">Grade 4 - Section B</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
