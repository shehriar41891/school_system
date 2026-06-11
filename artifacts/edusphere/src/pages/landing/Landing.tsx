import { Link } from "wouter";
import { ShieldAlert, GraduationCap, Users, Brain, Sparkles, UserSquare2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
            <Badge variant="outline" className="ml-2 gap-1 border-violet-300 text-violet-700">
              <Sparkles className="h-3 w-3" />
              AI Powered
            </Badge>
          </div>
          <Link href="/login">
            <Button variant="outline" className="font-medium">Sign In</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mb-16">
          <Badge className="mb-4 bg-violet-600 hover:bg-violet-700">
            <Sparkles className="h-3 w-3 mr-1" />
            Next-Generation AI School System
          </Badge>
          <h1 className="text-5xl font-extrabold text-foreground mb-6 tracking-tight">
            Replace Traditional Schools with AI Intelligence
          </h1>
          <p className="text-xl text-muted-foreground">
            AI-powered analysis, predictive reports, smart chatbots, and real-time insights
            for principals, teachers, parents, students, and administrators — all in one platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 w-full max-w-7xl">
          <Card className="flex flex-col hover-elevate transition-all border-t-4 border-t-violet-600 shadow-sm hover:shadow-md">
            <CardHeader>
              <div className="bg-violet-100 dark:bg-violet-950 w-14 h-14 rounded-full flex items-center justify-center mb-4 text-violet-600">
                <Brain className="h-7 w-7" />
              </div>
              <CardTitle className="text-xl">Principal Portal</CardTitle>
              <CardDescription className="text-sm">
                Extensive AI analysis for school leadership.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• AI Command Center Dashboard</li>
                <li>• Student Risk Analysis</li>
                <li>• Monthly AI School Reports</li>
                <li>• AI Strategic Advisor Chatbot</li>
                <li>• AI-Recommended Meetings</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/login" className="w-full">
                <Button className="w-full bg-violet-600 hover:bg-violet-700">Enter Principal Portal</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="flex flex-col hover-elevate transition-all border-t-4 border-t-primary shadow-sm hover:shadow-md">
            <CardHeader>
              <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mb-4 text-primary">
                <ShieldAlert className="h-7 w-7" />
              </div>
              <CardTitle className="text-xl">Admin Portal</CardTitle>
              <CardDescription className="text-sm">
                Manage operations with AI insights.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Student & Staff Directory</li>
                <li>• AI Insights Center</li>
                <li>• Attendance & Fee Reports</li>
                <li>• AI Admin Chatbot</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/login" className="w-full">
                <Button className="w-full">Enter Admin Portal</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="flex flex-col hover-elevate transition-all border-t-4 border-t-orange-500 shadow-sm hover:shadow-md">
            <CardHeader>
              <div className="bg-orange-100 dark:bg-orange-950 w-14 h-14 rounded-full flex items-center justify-center mb-4 text-orange-600">
                <UserSquare2 className="h-7 w-7" />
              </div>
              <CardTitle className="text-xl">Teacher Portal</CardTitle>
              <CardDescription className="text-sm">
                Classroom tools with AI teaching helpers.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Assignment & Quiz Creator</li>
                <li>• Materials & Syllabus Generator</li>
                <li>• Attendance & Marks Entry</li>
                <li>• AI Teaching Assistant</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/login" className="w-full">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">Enter Teacher Portal</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="flex flex-col hover-elevate transition-all border-t-4 border-t-accent shadow-sm hover:shadow-md">
            <CardHeader>
              <div className="bg-accent/10 w-14 h-14 rounded-full flex items-center justify-center mb-4 text-accent">
                <GraduationCap className="h-7 w-7" />
              </div>
              <CardTitle className="text-xl">Student Portal</CardTitle>
              <CardDescription className="text-sm">
                AI study buddy and academic insights.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• AI Study Buddy Chatbot</li>
                <li>• Personalized Study Tips</li>
                <li>• Assignments & Exams</li>
                <li>• AI Performance Insights</li>
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
              <CardTitle className="text-xl">Parent Portal</CardTitle>
              <CardDescription className="text-sm">
                Extensive AI analysis for your child.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• AI Child Analysis</li>
                <li>• Monthly AI Progress Reports</li>
                <li>• AI Parent Assistant Chatbot</li>
                <li>• AI Meeting Suggestions</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/login" className="w-full">
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">Enter Parent Portal</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <p className="text-sm text-muted-foreground mt-12 text-center max-w-2xl">
          <Sparkles className="h-4 w-4 inline text-violet-500 mr-1" />
          Currently running in demo AI mode with simulated analysis. Connect your API keys later
          to unlock live AI intelligence across every corner of your school.
        </p>
      </main>
    </div>
  );
}
