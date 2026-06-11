import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, ShieldAlert, Users, UserSquare2, Brain, Sparkles } from "lucide-react";

type LoginRole = 'admin' | 'teacher' | 'student' | 'parent' | 'principal';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogin = (role: LoginRole) => {
    const roleName = role === 'principal' ? 'Principal' : role === 'teacher' ? 'Teacher' : role.charAt(0).toUpperCase() + role.slice(1);
    login({
      id: "U001",
      role: role as 'admin' | 'student' | 'parent' | 'principal' | 'teacher',
      name: roleName,
      email
    });
    setLocation(`/${role}/dashboard`);
  };

  const fillDemoCreds = (roleType: string) => {
    setEmail(`${roleType}@edusphere`);
    setPassword(`${roleType.charAt(0).toUpperCase() + roleType.slice(1)}@123`);
  };

  const roles: { value: LoginRole; label: string; icon: React.ReactNode }[] = [
    { value: 'admin', label: 'Admin', icon: <ShieldAlert className="h-4 w-4 mr-1 hidden sm:block" /> },
    { value: 'principal', label: 'Principal', icon: <Brain className="h-4 w-4 mr-1 hidden sm:block" /> },
    { value: 'teacher', label: 'Teacher', icon: <UserSquare2 className="h-4 w-4 mr-1 hidden sm:block" /> },
    { value: 'student', label: 'Student', icon: <GraduationCap className="h-4 w-4 mr-1 hidden sm:block" /> },
    { value: 'parent', label: 'Parent', icon: <Users className="h-4 w-4 mr-1 hidden sm:block" /> },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="mb-8 flex flex-col items-center">
        <div className="bg-primary text-primary-foreground p-3 rounded-xl mb-4">
          <GraduationCap className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold text-primary">EduSphere</h1>
        <p className="text-muted-foreground mt-2 flex items-center gap-1">
          <Sparkles className="h-4 w-4 text-violet-500" />
          AI-Powered School Management System
        </p>
      </div>

      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to your AI-enhanced portal</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="admin" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              {roles.map((r) => (
                <TabsTrigger key={r.value} value={r.value} onClick={() => fillDemoCreds(r.value === 'teacher' ? 'teacher' : r.value)}>
                  {r.icon} {r.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {roles.map((r) => (
              <TabsContent key={r.value} value={r.value}>
                <form onSubmit={(e) => { e.preventDefault(); handleLogin(r.value); }} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address or ID</Label>
                    <Input
                      id="email"
                      type="text"
                      placeholder={`${r.value}@edusphere`}
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
                    Sign In as {r.label}
                  </Button>
                </form>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg text-sm">
                  <p className="font-semibold mb-2">Demo Credentials:</p>
                  <p>Email: <span className="font-mono bg-background px-1 border rounded">{r.value}@edusphere</span></p>
                  <p>Password: <span className="font-mono bg-background px-1 border rounded">{r.value.charAt(0).toUpperCase() + r.value.slice(1)}@123</span></p>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
