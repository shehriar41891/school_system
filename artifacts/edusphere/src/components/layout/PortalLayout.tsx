import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "../../contexts/AuthContext";
import { LogOut, Menu, Bell, User } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { AIChatAssistant } from "../ai/AIChatAssistant";

interface PortalLayoutProps {
  children: React.ReactNode;
  navItems: { title: string; href: string }[];
  portalName: string;
}

export function PortalLayout({ children, navItems, portalName }: PortalLayoutProps) {
  const [location, setLocation] = useLocation();
  const { state: auth, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const chatRole = auth.user?.role === "parent" ? "parent" : "student";

  const handleLogout = () => {
    logout();
    setOpen(false);
    setLocation("/login");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="h-16 bg-primary text-primary-foreground flex items-center px-4 md:px-8 shrink-0 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-primary-foreground hover:bg-primary-foreground/20 shrink-0">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-card p-0 flex flex-col">
              <div className="p-4 border-b border-border bg-primary text-primary-foreground">
                <h2 className="font-bold text-xl">EduSphere</h2>
                <p className="text-sm opacity-80">{portalName}</p>
              </div>
              <nav className="flex flex-col py-4 flex-1 overflow-y-auto">
                {navItems.map((item) => (
                  <Link key={item.title} href={item.href} onClick={() => setOpen(false)}>
                    <div className={`px-4 py-3 text-sm font-medium transition-colors ${
                      location.startsWith(item.href) ? "bg-accent/10 text-accent border-r-4 border-accent" : "text-foreground hover:bg-muted"
                    }`}>
                      {item.title}
                    </div>
                  </Link>
                ))}
              </nav>
              <div className="p-4 border-t border-border mt-auto">
                <Button
                  variant="outline"
                  className="w-full text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <Link href={`/${auth.user?.role}/dashboard`} className="flex items-center gap-2 min-w-0">
            <span className="font-bold text-xl tracking-tight hidden sm:block">EduSphere</span>
            <span className="bg-primary-foreground/20 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider truncate">{portalName}</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1 mx-4 overflow-x-auto flex-nowrap hide-scrollbar">
          {navItems.map((item) => (
            <Link key={item.title} href={item.href}>
              <div className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap cursor-pointer transition-colors ${
                location === item.href || (item.href !== `/${auth.user?.role}/dashboard` && location.startsWith(item.href))
                  ? "bg-primary-foreground text-primary"
                  : "text-primary-foreground/80 hover:bg-primary-foreground/20 hover:text-primary-foreground"
              }`}>
                {item.title}
              </div>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 flex-1 justify-end shrink-0">
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 pl-2 border-l border-primary-foreground/20">
            <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center font-semibold text-sm shrink-0">
              {auth.user?.name.charAt(0) || <User className="h-4 w-4" />}
            </div>
            <span className="text-sm font-medium hidden lg:block">{auth.user?.name}</span>
            <Button
              variant="outline"
              size="sm"
              className="text-primary-foreground border-primary-foreground/30 bg-primary-foreground/10 hover:bg-destructive/20 hover:text-destructive hover:border-destructive/40"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-7xl mx-auto py-6 px-4 md:py-8 md:px-8">
        {children}
      </main>

      <AIChatAssistant role={chatRole} />
    </div>
  );
}
