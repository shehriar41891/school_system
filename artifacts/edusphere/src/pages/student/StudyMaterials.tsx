import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Video, Book, Download, ExternalLink } from "lucide-react";

export default function StudentStudyMaterials() {
  const [activeTab, setActiveTab] = useState("all");

  const materials = [
    { id: 1, title: "Algebra Chapter 1 Notes", subject: "Mathematics", type: "pdf", size: "2.4 MB", date: "Oct 12", downloads: 45 },
    { id: 2, title: "Photosynthesis Video Lecture", subject: "Science", type: "video", duration: "45 mins", date: "Oct 15", views: 89 },
    { id: 3, title: "Grammar Rules Cheatsheet", subject: "English", type: "pdf", size: "1.1 MB", date: "Oct 18", downloads: 112 },
    { id: 4, title: "World War II Summary", subject: "History", type: "document", size: "3.5 MB", date: "Oct 20", downloads: 34 },
    { id: 5, title: "Geometry Formulas", subject: "Mathematics", type: "pdf", size: "0.8 MB", date: "Oct 22", downloads: 156 },
    { id: 6, title: "Chemical Reactions Lab Guide", subject: "Science", type: "document", size: "1.5 MB", date: "Oct 25", downloads: 28 },
  ];

  const filteredMaterials = activeTab === "all" ? materials : materials.filter(m => m.subject.toLowerCase() === activeTab);

  const getIcon = (type: string) => {
    switch(type) {
      case 'pdf': return <FileText className="h-8 w-8 text-destructive" />;
      case 'video': return <Video className="h-8 w-8 text-primary" />;
      default: return <Book className="h-8 w-8 text-accent" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Study Materials</h1>
        <p className="text-muted-foreground">Access notes, lectures, and resources shared by teachers.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <ScrollArea className="w-full pb-2">
          <TabsList className="inline-flex w-max min-w-full sm:w-auto h-10 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground">
            <TabsTrigger value="all">All Subjects</TabsTrigger>
            <TabsTrigger value="mathematics">Mathematics</TabsTrigger>
            <TabsTrigger value="science">Science</TabsTrigger>
            <TabsTrigger value="english">English</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
        </ScrollArea>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMaterials.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow flex flex-col">
              <CardContent className="p-5 flex gap-4 flex-1">
                <div className="shrink-0 bg-muted/50 p-3 rounded-lg flex items-center justify-center">
                  {getIcon(item.type)}
                </div>
                <div className="space-y-1">
                  <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider">{item.subject}</Badge>
                  <h3 className="font-semibold text-sm leading-tight line-clamp-2">{item.title}</h3>
                  <div className="text-xs text-muted-foreground pt-1 flex items-center gap-3">
                    <span>{item.date}</span>
                    <span>•</span>
                    <span>{item.type === 'video' ? item.duration : item.size}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-3 bg-muted/20 border-t flex justify-between items-center mt-auto">
                <span className="text-xs text-muted-foreground font-medium">
                  {item.type === 'video' ? `${item.views} views` : `${item.downloads} downloads`}
                </span>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
                  {item.type === 'video' ? <><ExternalLink className="h-4 w-4 mr-2" /> Watch</> : <><Download className="h-4 w-4 mr-2" /> Download</>}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Tabs>
    </div>
  );
}

// Quick inline scroll area for tabs if needed
function ScrollArea({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={`overflow-x-auto hide-scrollbar ${className || ''}`}>{children}</div>;
}
