import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chatbotDummyReplies } from "@/data/aiMockData";

type PortalRole = "principal" | "parent" | "student" | "admin";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const welcomeMessages: Record<PortalRole, string> = {
  principal: "Hello, Principal! I'm your EduSphere AI Advisor. Ask me about school performance, at-risk students, monthly reports, or strategic recommendations.",
  parent: "Hello! I'm your AI Parent Assistant. Ask about your child's academics, attendance, fees, or meeting suggestions.",
  student: "Hi! I'm your AI Study Buddy. Ask about your grades, assignments, study tips, or academic progress.",
  admin: "Hello! I'm the EduSphere AI Admin Assistant. Ask about school operations, AI insights, fees, or student flags.",
};

function getDummyReply(role: PortalRole, input: string): string {
  const replies = chatbotDummyReplies[role];
  const lower = input.toLowerCase();

  if (lower.includes("attendance")) return replies.find(r => r.toLowerCase().includes("attendance")) ?? replies[0];
  if (lower.includes("fee") || lower.includes("payment")) return replies.find(r => r.toLowerCase().includes("fee")) ?? replies[3];
  if (lower.includes("risk") || lower.includes("lag") || lower.includes("behind")) return replies[0];
  if (lower.includes("math") || lower.includes("academic") || lower.includes("grade")) return replies[1];
  if (lower.includes("meeting") || lower.includes("teacher")) return replies[replies.length - 1];
  if (lower.includes("report") || lower.includes("monthly")) return replies[1];

  const index = Math.abs(input.split("").reduce((a, c) => a + c.charCodeAt(0), 0)) % replies.length;
  return replies[index];
}

export function AIChatAssistant({ role }: { role: PortalRole }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "assistant", content: welcomeMessages[role] },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const reply = getDummyReply(role, userMsg.content);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: reply },
      ]);
      setTyping(false);
    }, 800 + Math.random() * 700);
  };

  return (
    <>
      {!open && (
        <Button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-violet-600 hover:bg-violet-700 text-white"
          size="icon"
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-3rem)] bg-card border rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden">
          <div className="bg-violet-600 text-white px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <div>
                <p className="font-semibold text-sm">EduSphere AI Assistant</p>
                <p className="text-xs opacity-80">Demo mode — API integration coming soon</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 h-8 w-8" onClick={() => setOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <Bot className="h-3 w-3 inline mr-1 text-violet-500" />
                    )}
                    {msg.content}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg px-3 py-2 text-sm flex items-center gap-2">
                    <Loader2 className="h-3 w-3 animate-spin text-violet-500" />
                    AI is analyzing...
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-3 border-t flex gap-2 shrink-0">
            <Input
              placeholder="Ask anything about your school..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="text-sm"
            />
            <Button size="icon" onClick={sendMessage} className="bg-violet-600 hover:bg-violet-700 shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
