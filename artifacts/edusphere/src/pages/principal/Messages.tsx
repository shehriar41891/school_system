import { MessageSquare, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AIDisclaimerBanner } from "@/components/ai/AIDisclaimerBanner";
import { schoolWideInsights } from "@/data/aiMockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const aiDraftMessages = [
  {
    title: "Monday Attendance Reminder",
    audience: "All Parents",
    preview: "Dear Parents, AI analysis shows Monday attendance is 8% lower than other days. Please ensure your child arrives on time every Monday...",
    insight: "SW002",
  },
  {
    title: "Grade 5 B Mathematics Alert",
    audience: "Grade 5 B Parents",
    preview: "We have identified a need for additional Mathematics support. Remedial sessions will begin next week...",
    insight: "SW001",
  },
  {
    title: "Fee Payment Reminder",
    audience: "15 Overdue Families",
    preview: "This is a friendly reminder that your child's tuition fee payment is overdue. Please clear the balance at your earliest convenience...",
    insight: "SW003",
  },
];

export default function PrincipalMessages() {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="h-7 w-7 text-violet-600" />
          AI Communications
        </h1>
        <p className="text-muted-foreground">AI-drafted messages based on school insights and alerts</p>
      </div>

      <AIDisclaimerBanner />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {aiDraftMessages.map((msg) => {
          const insight = schoolWideInsights.find(i => i.id === msg.insight);
          return (
            <Card key={msg.title}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-violet-500" />
                    {msg.title}
                  </CardTitle>
                </div>
                <Badge variant="secondary" className="w-fit">{msg.audience}</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-3">{msg.preview}</p>
                {insight && (
                  <p className="text-xs text-violet-600 dark:text-violet-400">
                    Triggered by: {insight.title}
                  </p>
                )}
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-violet-600 hover:bg-violet-700" onClick={() => toast({ title: "Message Sent", description: `"${msg.title}" sent to ${msg.audience}` })}>
                    Send
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">Edit</Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
