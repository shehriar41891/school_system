import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Edit, Send } from "lucide-react";

export default function AdminMessages() {
  const [activeThread, setActiveThread] = useState(1);

  const threads = [
    { id: 1, name: "PTA Committee", lastMessage: "Can we schedule the meeting for next week?", time: "10:30 AM", unread: 2 },
    { id: 2, name: "John Doe (Parent)", lastMessage: "Thank you for the update.", time: "Yesterday", unread: 0 },
    { id: 3, name: "Staff Group", lastMessage: "Please submit your reports by Friday.", time: "Monday", unread: 0 },
  ];

  const messages = [
    { id: 1, sender: "PTA Committee", content: "Hello, we would like to discuss the upcoming annual day event.", time: "09:00 AM", isMe: false },
    { id: 2, sender: "Me", content: "Sure, let me know what dates work for you.", time: "09:15 AM", isMe: true },
    { id: 3, sender: "PTA Committee", content: "Can we schedule the meeting for next week?", time: "10:30 AM", isMe: false },
  ];

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)]">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Messages</h1>
          <p className="text-muted-foreground">Communicate with staff, students, and parents.</p>
        </div>
        <Button>
          <Edit className="h-4 w-4 mr-2" />
          New Message
        </Button>
      </div>

      <div className="flex h-full gap-4">
        {/* Left Panel: Conversation List */}
        <Card className="w-1/3 flex flex-col hidden sm:flex">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-8" />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-1 p-2">
              {threads.map(thread => (
                <div 
                  key={thread.id} 
                  className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${activeThread === thread.id ? 'bg-primary/10' : 'hover:bg-muted'}`}
                  onClick={() => setActiveThread(thread.id)}
                >
                  <Avatar>
                    <AvatarFallback>{thread.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-sm truncate">{thread.name}</h4>
                      <span className="text-xs text-muted-foreground">{thread.time}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-muted-foreground truncate pr-2">{thread.lastMessage}</p>
                      {thread.unread > 0 && (
                        <span className="bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                          {thread.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Right Panel: Thread Detail */}
        <Card className="flex-1 flex flex-col">
          <div className="p-4 border-b flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{threads.find(t => t.id === activeThread)?.name.substring(0, 2) || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{threads.find(t => t.id === activeThread)?.name}</h3>
            </div>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className={`flex flex-col max-w-[75%] ${msg.isMe ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
                  <div className={`p-3 rounded-lg ${msg.isMe ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-muted rounded-tl-none'}`}>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">{msg.time}</span>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t mt-auto">
            <div className="flex gap-2">
              <Input placeholder="Type a message..." className="flex-1" />
              <Button size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
