import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "../../contexts/AuthContext";
import { 
  LayoutDashboard, Users, UserSquare2, BookOpen, CalendarCheck, 
  GraduationCap, Banknote, CalendarDays, MessageSquare, Book, 
  Bus, FileBarChart, Settings, LogOut, Menu, Bell, ChevronLeft, ChevronRight 
} from "lucide-react";
import { Button } from "../ui/button";

const adminNav = [
  { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Students", href: "/admin/students", icon: Users },
  { title: "Teachers", href: "/admin/teachers", icon: UserSquare2 },
  { title: "Classes", href: "/admin/classes", icon: BookOpen },
  { title: "Attendance", href: "/admin/attendance/reports", icon: CalendarCheck },
  { title: "Academics", href: "/admin/academic/exams", icon: GraduationCap },
  { title: "Fees", href: "/admin/fees/collection", icon: Banknote },
  { title: "Timetable", href: "/admin/timetable", icon: CalendarDays },
  { title: "Communication", href: "/admin/communication/notices", icon: MessageSquare },
  { title: "Library", href: "/admin/library", icon: Book },
  { title: "Transport", href: "/admin/transport", icon: Bus },
  { title: "Calendar", href: "/admin/calendar", icon: CalendarDays },
  { title: "Reports", href: "/admin/reports", icon: FileBarChart },
  { title: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const { state: auth, logout } = useAuth();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`bg-sidebar border-r border-sidebar-border transition-all duration-300 z-20
          ${collapsed ? "w-20" : "w-64"} 
          ${mobileOpen ? "translate-x-0 fixed h-full" : "-translate-x-full absolute"} 
          md:relative md:translate-x-0 flex flex-col`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          <span className={`font-bold text-xl text-primary transition-opacity ${collapsed ? "opacity-0 hidden" : "opacity-100"}`}>
            EduSphere
          </span>
          {collapsed && <span className="font-bold text-xl text-primary mx-auto">ES</span>}
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {adminNav.map((item) => {
            const isActive = location.startsWith(item.href);
            return (
              <Link key={item.title} href={item.href}>
                <div className={`flex items-center px-3 py-2.5 rounded-md cursor-pointer transition-colors ${
                  isActive 
                    ? "bg-primary text-primary-foreground" 
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={() => setMobileOpen(!mobileOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex mr-4" onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
            <h2 className="font-semibold text-lg text-foreground hidden sm:block">Admin Portal</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-destructive rounded-full" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                A
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
    </div>
  );
}
