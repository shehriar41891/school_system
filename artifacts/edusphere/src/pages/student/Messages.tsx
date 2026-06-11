import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Send, ArrowLeft } from "lucide-react";

export default function StudentMessages() {
  const [activeThread, setActiveThread] = useState<number | null>(null);

  const threads = [
    { id: 1, name: "Mr. Arthur (Math)", lastMessage: "Don't forget the assignment due tomorrow.", time: "10:30 AM", unread: 1 },
    { id: 2, name: "Class 6A Group", lastMessage: "Anyone has the notes for History?", time: "Yesterday", unread: 0 },
    { id: 3, name: "Admin Office", lastMessage: "Your ID card is ready for collection.", time: "Monday", unread: 0 },
  ];

  const messages = [
    { id: 1, sender: "Mr. Arthur", content: "Hello! Just a reminder that the algebra assignment is due tomorrow.", time: "09:00 AM", isMe: false },
    { id: 2, sender: "Me", content: "Yes sir, I have almost finished it.", time: "09:15 AM", isMe: true },
    { id: 3, sender: "Mr. Arthur", content: "Great. Don't forget to show your steps.", time: "10:30 AM", isMe: false },
  ];

  return (
    <div className="h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-4 shrink-0">
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden relative">
        {/* Thread List - Hidden on mobile if viewing thread */}
        <Card className={`w-full md:w-1/3 flex flex-col ${activeThread !== null ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b shrink-0">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-8" />
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
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {thread.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-sm truncate">{thread.name}</h4>
                      <span className="text-xs text-muted-foreground shrink-0">{thread.time}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p className={`text-xs truncate pr-2 ${thread.unread > 0 ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                        {thread.lastMessage}
                      </p>
                      {thread.unread > 0 && (
                        <span className="bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center shrink-0">
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

        {/* Thread Detail - Hidden on mobile if NO thread selected */}
        {activeThread !== null ? (
          <Card className={`flex-1 flex flex-col ${activeThread === null ? 'hidden md:flex' : 'flex absolute inset-0 z-10 md:relative'}`}>
            <div className="p-4 border-b flex items-center gap-3 shrink-0">
              <Button variant="ghost" size="icon" className="md:hidden shrink-0" onClick={() => setActiveThread(null)}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                  {threads.find(t => t.id === activeThread)?.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold">{threads.find(t => t.id === activeThread)?.name}</h3>
            </div>
            
            <ScrollArea className="flex-1 p-4 bg-muted/10">
              <div className="space-y-4">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${msg.isMe ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
                    <div className={`p-3 rounded-xl shadow-sm ${msg.isMe ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-card border rounded-tl-sm'}`}>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-1 px-1">{msg.time}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t bg-card shrink-0">
              <div className="flex gap-2">
                <Input placeholder="Type a message..." className="flex-1" />
                <Button size="icon" className="shrink-0 bg-primary hover:bg-primary/90">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="hidden md:flex flex-1 items-center justify-center bg-muted/10">
            <div className="text-center text-muted-foreground">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="h-6 w-6 opacity-50" />
              </div>
              <p>Select a conversation to start messaging</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
