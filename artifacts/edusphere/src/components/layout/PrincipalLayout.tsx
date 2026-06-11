import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "../../contexts/AuthContext";
import {
  LayoutDashboard, Brain, Users, GraduationCap, CalendarCheck,
  FileBarChart, MessageSquare, CalendarDays, LogOut, Menu,
  Bell, ChevronLeft, ChevronRight, Sparkles,
} from "lucide-react";
import { Button } from "../ui/button";
import { AIChatAssistant } from "../ai/AIChatAssistant";
import { AIBadge } from "../ai/AIBadge";

const principalNav = [
  { title: "AI Dashboard", href: "/principal/dashboard", icon: LayoutDashboard },
  { title: "School Analytics", href: "/principal/analytics", icon: Brain },
  { title: "Student Analysis", href: "/principal/students", icon: Users },
  { title: "Academic Analysis", href: "/principal/academics", icon: GraduationCap },
  { title: "Attendance AI", href: "/principal/attendance", icon: CalendarCheck },
  { title: "Monthly AI Reports", href: "/principal/reports", icon: FileBarChart },
  { title: "AI Advisor", href: "/principal/advisor", icon: Sparkles },
  { title: "Meetings", href: "/principal/meetings", icon: CalendarDays },
  { title: "Communications", href: "/principal/messages", icon: MessageSquare },
];

export function PrincipalLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const { state: auth, logout } = useAuth();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <aside
        className={`bg-sidebar border-r border-sidebar-border transition-all duration-300 z-20
          ${collapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "translate-x-0 fixed h-full" : "-translate-x-full absolute"}
          md:relative md:translate-x-0 flex flex-col`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          {!collapsed && (
            <div>
              <span className="font-bold text-xl text-primary">EduSphere</span>
              <AIBadge className="mt-1" />
            </div>
          )}
          {collapsed && <Sparkles className="h-6 w-6 text-violet-600 mx-auto" />}
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {principalNav.map((item) => {
            const isActive = location.startsWith(item.href);
            return (
              <Link key={item.title} href={item.href}>
                <div className={`flex items-center px-3 py-2.5 rounded-md cursor-pointer transition-colors ${
                  isActive
                    ? "bg-violet-600 text-white"
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
          <Button variant="ghost" className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={logout}>
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
              <h2 className="font-semibold text-lg text-foreground hidden sm:block">Principal Portal</h2>
              <p className="text-xs text-muted-foreground hidden sm:block">AI-Powered School Intelligence</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <AIBadge />
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-destructive rounded-full" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-violet-600 text-white flex items-center justify-center font-semibold text-sm">
                P
              </div>
              <span className="text-sm font-medium hidden sm:block">{auth.user?.name}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-background">
          {children}
        </main>

        {mobileOpen && (
          <div className="fixed inset-0 bg-black/50 z-10 md:hidden" onClick={() => setMobileOpen(false)} />
        )}
      </div>

      <AIChatAssistant role="principal" />
    </div>
  );
}
