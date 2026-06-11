import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "../../contexts/AuthContext";
import {
  LayoutDashboard, Users, CalendarCheck, ClipboardList, FileText,
  BookOpen, HelpCircle, PenLine, CalendarDays, MessageSquare,
  LogOut, Menu, Bell, ChevronLeft, ChevronRight, Sparkles,
} from "lucide-react";
import { Button } from "../ui/button";
import { AIBadge } from "../ai/AIBadge";

const teacherNav = [
  { title: "Dashboard", href: "/teacher/dashboard", icon: LayoutDashboard },
  { title: "My Classes", href: "/teacher/classes", icon: Users },
  { title: "Attendance", href: "/teacher/attendance", icon: CalendarCheck },
  { title: "Assignment Helper", href: "/teacher/assignments", icon: ClipboardList },
  { title: "Materials Helper", href: "/teacher/materials", icon: BookOpen },
  { title: "Syllabus Generator", href: "/teacher/syllabus", icon: FileText },
  { title: "Quiz Creator", href: "/teacher/quizzes", icon: HelpCircle },
  { title: "Marks Entry", href: "/teacher/marks", icon: PenLine },
  { title: "Timetable", href: "/teacher/timetable", icon: CalendarDays },
  { title: "Messages", href: "/teacher/messages", icon: MessageSquare },
  { title: "AI Assistant", href: "/teacher/ai-assistant", icon: Sparkles },
];

export function TeacherLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { state: auth, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    setLocation("/login");
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <aside
        className={`bg-sidebar border-r border-sidebar-border transition-all duration-300 z-20
          ${collapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "translate-x-0 fixed h-full" : "-translate-x-full absolute"}
          md:relative md:translate-x-0 flex flex-col`}
      >
        <div className="h-16 flex flex-col justify-center px-4 border-b border-sidebar-border">
          {!collapsed && (
            <>
              <span className="font-bold text-xl text-primary">EduSphere</span>
              <AIBadge className="mt-1 w-fit" />
            </>
          )}
          {collapsed && <span className="font-bold text-xl text-primary mx-auto">ES</span>}
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {teacherNav.map((item) => {
            const isActive = location.startsWith(item.href);
            return (
              <Link key={item.title} href={item.href} onClick={() => setMobileOpen(false)}>
                <div className={`flex items-center px-3 py-2.5 rounded-md cursor-pointer transition-colors ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}>
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span className="ml-3 font-medium text-sm">{item.title}</span>}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={() => setMobileOpen(!mobileOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex mr-4" onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
            <div>
              <h2 className="font-semibold text-lg text-foreground hidden sm:block">Teacher Portal</h2>
              <p className="text-xs text-muted-foreground hidden sm:block">Classroom tools & AI helpers</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-destructive rounded-full" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-semibold text-sm">
              {auth.user?.name.charAt(0) ?? "T"}
            </div>
            <span className="text-sm font-medium hidden md:block">{auth.user?.name}</span>
            <Button
              variant="outline"
              size="sm"
              className="text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-1.5" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-background">
          {children}
        </main>

        {mobileOpen && (
          <div className="fixed inset-0 bg-black/50 z-10 md:hidden" onClick={() => setMobileOpen(false)} />
        )}
      </div>
    </div>
  );
}
