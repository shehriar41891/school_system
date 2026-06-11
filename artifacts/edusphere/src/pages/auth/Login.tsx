import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, ShieldAlert, Users, UserSquare2 } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogin = (role: 'admin' | 'student' | 'parent', roleName: string) => {
    // In a real app, this would validate credentials against an API
    login({
      id: "U001",
      role,
      name: roleName,
      email
    });
    setLocation(`/${role}/dashboard`);
  };

  const fillDemoCreds = (roleType: string) => {
    setEmail(`${roleType}@edusphere`);
    setPassword(`${roleType.charAt(0).toUpperCase() + roleType.slice(1)}@123`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="mb-8 flex flex-col items-center">
        <div className="bg-primary text-primary-foreground p-3 rounded-xl mb-4">
          <GraduationCap className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold text-primary">EduSphere</h1>
        <p className="text-muted-foreground mt-2">School Management System</p>
      </div>

      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="admin" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="admin" onClick={() => fillDemoCreds("admin")}>
                <ShieldAlert className="h-4 w-4 mr-2 hidden sm:block" /> Admin
              </TabsTrigger>
              <TabsTrigger value="teacher" onClick={() => fillDemoCreds("teacher")}>
                <UserSquare2 className="h-4 w-4 mr-2 hidden sm:block" /> Staff
              </TabsTrigger>
              <TabsTrigger value="student" onClick={() => fillDemoCreds("student")}>
                <GraduationCap className="h-4 w-4 mr-2 hidden sm:block" /> Student
              </TabsTrigger>
              <TabsTrigger value="parent" onClick={() => fillDemoCreds("parent")}>
                <Users className="h-4 w-4 mr-2 hidden sm:block" /> Parent
              </TabsTrigger>
            </TabsList>

            {['admin', 'teacher', 'student', 'parent'].map((role) => (
              <TabsContent key={role} value={role}>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  // For the sake of this mock app, 'teacher' logs into 'admin' portal
                  handleLogin(role === 'teacher' ? 'admin' : role as any, role.charAt(0).toUpperCase() + role.slice(1));
                }} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address or ID</Label>
                    <Input 
                      id="email" 
                      type="text" 
                      placeholder="admin@edusphere"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <a href="#" className="text-xs text-accent hover:underline">Forgot password?</a>
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full py-6 mt-4">
                    Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}
                  </Button>
                </form>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg text-sm">
                  <p className="font-semibold mb-2">Demo Credentials:</p>
                  <p>Email: <span className="font-mono bg-background px-1 border rounded">{role}@edusphere</span></p>
                  <p>Password: <span className="font-mono bg-background px-1 border rounded">{role.charAt(0).toUpperCase() + role.slice(1)}@123</span></p>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
