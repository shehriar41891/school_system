import { Link } from "wouter";
import { ShieldAlert, GraduationCap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="py-6 px-8 border-b bg-card">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold text-primary">EduSphere</span>
          </div>
          <Link href="/login">
            <Button variant="outline" className="font-medium">Sign In</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mb-16">
          <h1 className="text-5xl font-extrabold text-foreground mb-6 tracking-tight">
            The Command Center for Modern Schools
          </h1>
          <p className="text-xl text-muted-foreground">
            A comprehensive management system that connects administrators, teachers, students, and parents in one unified platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          <Card className="flex flex-col hover-elevate transition-all border-t-4 border-t-primary shadow-sm hover:shadow-md">
            <CardHeader>
              <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mb-4 text-primary">
                <ShieldAlert className="h-7 w-7" />
              </div>
              <CardTitle className="text-2xl">Admin Portal</CardTitle>
              <CardDescription className="text-base">
                Manage students, staff, academics, and school operations.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Student & Staff Directory</li>
                <li>• Attendance & Timetables</li>
                <li>• Fee Collection & Reports</li>
                <li>• Academic Planning</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/login" className="w-full">
                <Button className="w-full">Enter Admin Portal</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="flex flex-col hover-elevate transition-all border-t-4 border-t-accent shadow-sm hover:shadow-md">
            <CardHeader>
              <div className="bg-accent/10 w-14 h-14 rounded-full flex items-center justify-center mb-4 text-accent">
                <GraduationCap className="h-7 w-7" />
              </div>
              <CardTitle className="text-2xl">Student Portal</CardTitle>
              <CardDescription className="text-base">
                Access your classes, assignments, and academic progress.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Daily Timetable</li>
                <li>• Attendance Records</li>
                <li>• Assignments & Exams</li>
                <li>• Library & Study Materials</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/login" className="w-full">
                <Button variant="secondary" className="w-full text-secondary-foreground bg-accent hover:bg-accent/90">Enter Student Portal</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="flex flex-col hover-elevate transition-all border-t-4 border-t-secondary shadow-sm hover:shadow-md">
            <CardHeader>
              <div className="bg-secondary/10 w-14 h-14 rounded-full flex items-center justify-center mb-4 text-secondary">
                <Users className="h-7 w-7" />
              </div>
              <CardTitle className="text-2xl">Parent Portal</CardTitle>
              <CardDescription className="text-base">
                Stay connected with your child's educational journey.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Academic Performance</li>
                <li>• Real-time Attendance</li>
                <li>• Fee Payments</li>
                <li>• Teacher Communication</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/login" className="w-full">
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">Enter Parent Portal</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
