import { useData } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Phone, MapPin, Mail, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function StudentProfile() {
  const { state: data } = useData();
  const student = data.students[0]; // Currently logged in student mock

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground">View your personal and academic details.</p>
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
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="h-5 w-5 text-secondary" />
            Parent/Guardian Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <span className="text-xs text-muted-foreground block">Parent Name</span>
                <p className="font-medium">Mr. Robert Johnson</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <span className="text-xs text-muted-foreground block">Contact Number</span>
                <p className="font-medium">+1 (555) 987-6543</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <span className="text-xs text-muted-foreground block">Email Address</span>
                <p className="font-medium">robert.j@example.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <span className="text-xs text-muted-foreground block">Home Address</span>
                <p className="font-medium">456 Elm Street, Springfield</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
