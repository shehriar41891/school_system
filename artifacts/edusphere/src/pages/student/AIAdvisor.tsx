import { useState, useRef, useEffect } from "react";
import { Bot, Send, Sparkles, Loader2, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AIDisclaimerBanner } from "@/components/ai/AIDisclaimerBanner";
import { chatbotDummyReplies } from "@/data/aiMockData";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "How am I doing in my subjects?",
  "What should I study today?",
  "Help me improve in History",
  "What assignments are due?",
  "What's my predicted GPA?",
];

export default function StudentAIAdvisor() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "assistant", content: "Hey! I'm your AI Study Buddy. I can help with study tips, track your progress, plan assignments, and suggest ways to improve. What do you need help with?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), role: "user", content: text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const replies = chatbotDummyReplies.student;
      const idx = Math.abs(text.split("").reduce((a, c) => a + c.charCodeAt(0), 0)) % replies.length;
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: replies[idx] }]);
      setTyping(false);
    }, 900);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="h-7 w-7 text-violet-600" />
          AI Study Buddy
        </h1>
        <p className="text-muted-foreground">Your personal AI assistant for academics and study planning</p>
      </div>

      <AIDisclaimerBanner />

      <div className="flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <Button key={s} variant="outline" size="sm" className="text-xs" onClick={() => send(s)}>{s}</Button>
        ))}
      </div>

      <Card className="h-[480px] flex flex-col">
        <CardHeader className="bg-violet-600 text-white rounded-t-lg py-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            EduSphere Study Buddy
          </CardTitle>
        </CardHeader>
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-lg px-4 py-2.5 text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin text-violet-500" />
                <Bot className="h-4 w-4" />
                Thinking...
              </div>
            )}
          </div>
        </ScrollArea>
        <CardContent className="border-t p-3 flex gap-2">
          <Input placeholder="Ask about your studies..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send(input)} />
          <Button onClick={() => send(input)} className="bg-violet-600 hover:bg-violet-700"><Send className="h-4 w-4" /></Button>
        </CardContent>
      </Card>
    </div>
  );
}
