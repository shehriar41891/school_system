import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Megaphone } from "lucide-react";

export default function StudentNotices() {
  const { state } = useData();
  const [filter, setFilter] = useState("all");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Notice Board</h1>
        <p className="text-muted-foreground">Stay updated with school announcements.</p>
      </div>

      <Tabs value={filter} onValueChange={setFilter} className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="event">Events</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 gap-4 mt-4">
        {state.notices.map((notice) => (
          <Card key={notice.id} className="hover:border-primary/30 transition-colors">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg shrink-0 mt-1">
                    <Megaphone className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold leading-none">{notice.title}</h3>
                      {notice.priority === 'High' && (
                        <Badge variant="destructive" className="text-[10px] h-5">Important</Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Please be informed about the {notice.title.toLowerCase()}. Detailed instructions have been shared with your class teacher. Make sure to note the dates and prepare accordingly.
                    </p>
                    <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground pt-2">
                      <span className="flex items-center gap-1 bg-muted px-2 py-1 rounded"><Calendar className="h-3 w-3" /> {notice.date}</span>
                      <span>From: {notice.author}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
