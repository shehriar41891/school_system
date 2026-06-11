import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, FileText, Banknote, GraduationCap } from "lucide-react";

export default function StudentNotifications() {
  const notifications = [
    { id: 1, type: "academic", title: "New Assignment", message: "Mr. Arthur has posted a new Mathematics assignment.", time: "10 mins ago", read: false },
    { id: 2, type: "fee", title: "Fee Reminder", message: "Your term fee is due in 5 days.", time: "2 hours ago", read: false },
    { id: 3, type: "general", title: "Sports Day", message: "Annual sports day schedule has been published.", time: "1 day ago", read: true },
    { id: 4, type: "academic", title: "Exam Results", message: "Unit Test 1 results are now available.", time: "2 days ago", read: true },
  ];

  const getIcon = (type: string) => {
    switch(type) {
      case 'academic': return <FileText className="h-5 w-5 text-primary" />;
      case 'fee': return <Banknote className="h-5 w-5 text-destructive" />;
      default: return <Bell className="h-5 w-5 text-accent" />;
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
        <Badge variant="secondary">{notifications.filter(n => !n.read).length} Unread</Badge>
      </div>

      <div className="space-y-3">
        {notifications.map((notif) => (
          <Card key={notif.id} className={`transition-colors ${notif.read ? 'bg-muted/30 border-transparent' : 'bg-card border-primary/20 shadow-sm'}`}>
            <CardContent className="p-4 flex gap-4">
              <div className={`p-2 rounded-full h-fit shrink-0 ${notif.read ? 'bg-muted' : 'bg-primary/10'}`}>
                {getIcon(notif.type)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <h4 className={`text-sm ${notif.read ? 'font-medium text-muted-foreground' : 'font-bold text-foreground'}`}>
                    {notif.title}
                  </h4>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{notif.time}</span>
                </div>
                <p className={`text-sm ${notif.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                  {notif.message}
                </p>
              </div>
              {!notif.read && (
                <div className="flex items-center shrink-0">
                  <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
