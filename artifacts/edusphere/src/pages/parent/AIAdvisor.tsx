import { useState, useRef, useEffect } from "react";
import { Bot, Send, Sparkles, Loader2 } from "lucide-react";
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
  "How is my child performing academically?",
  "Which subject needs the most attention?",
  "Are there any attendance concerns?",
  "Suggest a meeting with a teacher",
  "What is my child's predicted GPA?",
];

export default function ParentAIAdvisor() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "assistant", content: "Hello! I'm your AI Parent Assistant. I can help you understand your child's academic performance, attendance, fees, and suggest actions. How can I help you today?" },
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
      const replies = chatbotDummyReplies.parent;
      const lower = text.toLowerCase();
      let reply = replies[Math.abs(text.split("").reduce((a, c) => a + c.charCodeAt(0), 0)) % replies.length];
      if (lower.includes("attendance")) reply = replies.find(r => r.includes("attendance")) ?? reply;
      if (lower.includes("math") || lower.includes("academic")) reply = replies.find(r => r.includes("GPA") || r.includes("Mathematics")) ?? reply;
      if (lower.includes("meeting")) reply = replies[replies.length - 1];
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: reply }]);
      setTyping(false);
    }, 900);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="h-7 w-7 text-violet-600" />
          AI Parent Assistant
        </h1>
        <p className="text-muted-foreground">Chat with AI about your child's education</p>
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
            <Bot className="h-5 w-5" />
            EduSphere Parent AI
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
                Analyzing your child's data...
              </div>
            )}
          </div>
        </ScrollArea>
        <CardContent className="border-t p-3 flex gap-2">
          <Input placeholder="Ask about your child's progress..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send(input)} />
          <Button onClick={() => send(input)} className="bg-violet-600 hover:bg-violet-700"><Send className="h-4 w-4" /></Button>
        </CardContent>
      </Card>
    </div>
  );
}
