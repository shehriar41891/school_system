import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Edit, Send } from "lucide-react";

export default function TeacherMessages() {
  const [activeThread, setActiveThread] = useState(1);

  const threads = [
    { id: 1, name: "Mrs. Johnson (Parent)", lastMessage: "How is Alice doing in Mathematics?", time: "10:30 AM", unread: 1 },
    { id: 2, name: "Staff Group", lastMessage: "Staff meeting moved to Thursday.", time: "Yesterday", unread: 0 },
    { id: 3, name: "Mr. Smith (Parent)", lastMessage: "Thank you for the extra worksheets.", time: "Monday", unread: 0 },
    { id: 4, name: "Grade 6 A Class Group", lastMessage: "Reminder: Quiz on Friday.", time: "Sunday", unread: 0 },
  ];

  const messages = [
    { id: 1, sender: "Mrs. Johnson", content: "Hello Mr. Pendragon, I wanted to ask about Alice's progress in Mathematics.", time: "09:45 AM", isMe: false },
    { id: 2, sender: "Me", content: "Alice is doing excellently — 92% in the last mid-term. She's in the top 15% of the class.", time: "10:00 AM", isMe: true },
    { id: 3, sender: "Mrs. Johnson", content: "How is Alice doing in Mathematics?", time: "10:30 AM", isMe: false },
  ];

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)]">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-muted-foreground">Communicate with parents, students, and staff.</p>
        </div>
        <Button><Edit className="h-4 w-4 mr-2" /> New Message</Button>
      </div>

      <div className="flex h-full gap-4">
        <Card className="w-1/3 flex-col hidden sm:flex">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-8" />
            </div>
          </div>
          <ScrollArea className="flex-1">
            {threads.map((t) => (
              <div
                key={t.id}
                className={`p-4 border-b cursor-pointer hover:bg-muted/50 ${activeThread === t.id ? "bg-muted" : ""}`}
                onClick={() => setActiveThread(t.id)}
              >
                <div className="flex justify-between items-start">
                  <p className="font-medium text-sm">{t.name}</p>
                  <span className="text-xs text-muted-foreground">{t.time}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 truncate">{t.lastMessage}</p>
              </div>
            ))}
          </ScrollArea>
        </Card>

        <Card className="flex-1 flex flex-col">
          <div className="p-4 border-b flex items-center gap-3">
            <Avatar><AvatarFallback>P</AvatarFallback></Avatar>
            <p className="font-medium">{threads.find(t => t.id === activeThread)?.name}</p>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.isMe ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] rounded-lg px-4 py-2 text-sm ${m.isMe ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                    <p>{m.content}</p>
                    <p className="text-xs opacity-70 mt-1">{m.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <CardContent className="border-t p-3 flex gap-2">
            <Input placeholder="Type a message..." />
            <Button size="icon"><Send className="h-4 w-4" /></Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
