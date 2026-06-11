import { useState, useRef, useEffect } from "react";
import { Bot, Send, Sparkles, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AIDisclaimerBanner } from "@/components/ai/AIDisclaimerBanner";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "Suggest an assignment for ratios",
  "Create quiz questions on algebra",
  "Help me plan next week's lessons",
  "Draft a parent communication about low scores",
  "Generate a syllabus outline for Term 2",
];

const teacherReplies = [
  "For Grade 6 ratios, I suggest a real-world assignment: have students compare recipe ingredients and map scales. Include 8 problems with increasing difficulty.",
  "Here are 5 quiz questions on basic algebra: 1) Solve 2x + 5 = 15... (AI would generate full set in production mode)",
  "Based on your timetable, next week focus on: Mon-Wed — Ratios practice, Thu — Quiz review, Fri — Introduction to algebraic expressions.",
  "Draft parent message: 'Dear Parent, we noticed your child may benefit from additional practice in Mathematics. Here are recommended resources...'",
  "Term 2 Mathematics syllabus outline: Weeks 1-3 Ratios, Weeks 4-6 Algebra, Weeks 7-9 Geometry, Weeks 10-12 Review & Exams.",
];

export default function TeacherAIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "assistant", content: "Hello! I'm your AI Teaching Assistant. I can help create assignments, quizzes, syllabi, lesson plans, and parent communications. What do you need?" },
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
      const idx = Math.abs(text.split("").reduce((a, c) => a + c.charCodeAt(0), 0)) % teacherReplies.length;
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: teacherReplies[idx] }]);
      setTyping(false);
    }, 900);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="h-7 w-7 text-violet-600" />
          AI Teaching Assistant
        </h1>
        <p className="text-muted-foreground">Your AI helper for lesson planning, content creation, and classroom support.</p>
      </div>

      <AIDisclaimerBanner compact />

      <div className="flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <Button key={s} variant="outline" size="sm" className="text-xs" onClick={() => send(s)}>{s}</Button>
        ))}
      </div>

      <Card className="h-[500px] flex flex-col">
        <CardHeader className="bg-violet-600 text-white rounded-t-lg py-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Bot className="h-5 w-5" /> EduSphere Teacher AI
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
                <Loader2 className="h-4 w-4 animate-spin text-violet-500" /> Preparing teaching suggestions...
              </div>
            )}
          </div>
        </ScrollArea>
        <CardContent className="border-t p-3 flex gap-2">
          <Input placeholder="Ask about lessons, assignments, quizzes..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send(input)} />
          <Button onClick={() => send(input)} className="bg-violet-600 hover:bg-violet-700"><Send className="h-4 w-4" /></Button>
        </CardContent>
      </Card>
    </div>
  );
}
