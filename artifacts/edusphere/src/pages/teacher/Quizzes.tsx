import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { HelpCircle, Sparkles, Plus, Trash2 } from "lucide-react";
import { AIBadge } from "@/components/ai/AIBadge";
import { AIDisclaimerBanner } from "@/components/ai/AIDisclaimerBanner";

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
}

const existingQuizzes = [
  { id: 1, title: "Ratios Quick Check", class: "Grade 6 A", questions: 10, status: "Published", avg: "78%" },
  { id: 2, title: "Newton's Laws Quiz", class: "Grade 6 A", questions: 8, status: "Draft", avg: "—" },
  { id: 3, title: "Fractions Review", class: "Grade 5 A", questions: 12, status: "Published", avg: "85%" },
];

export default function TeacherQuizzes() {
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizTitle, setQuizTitle] = useState("");

  const generateQuiz = () => {
    setQuizTitle("Ratios & Proportions — Pop Quiz");
    setQuestions([
      { id: 1, text: "What is the ratio of 4 to 6 in simplest form?", options: ["2:3", "4:6", "1:2", "3:4"], correct: 0 },
      { id: 2, text: "If 3 apples cost $6, how much do 5 apples cost?", options: ["$8", "$10", "$12", "$15"], correct: 1 },
      { id: 3, text: "Which pair of ratios are equivalent?", options: ["2:3 and 4:5", "1:2 and 3:6", "5:1 and 1:5", "3:4 and 5:6"], correct: 1 },
      { id: 4, text: "A map scale is 1:50000. 2cm on the map equals how many km in real life?", options: ["0.5 km", "1 km", "2 km", "5 km"], correct: 1 },
      { id: 5, text: "Express 0.75 as a ratio.", options: ["3:4", "4:3", "7:5", "1:4"], correct: 0 },
    ]);
    toast({ title: "Quiz Generated", description: "5 AI-generated questions ready. Add more or publish." });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <HelpCircle className="h-7 w-7 text-accent" />
          Quiz Creator
          <AIBadge />
        </h1>
        <p className="text-muted-foreground">Build quizzes manually or generate questions with AI.</p>
      </div>

      <AIDisclaimerBanner compact />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quiz Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Quiz Title</Label>
              <Input value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} placeholder="Quiz title..." />
            </div>
            <div className="space-y-2">
              <Label>Topic</Label>
              <Input placeholder="e.g. Ratios and Proportions" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Class</Label>
                <Select defaultValue="g6a">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="g6a">Grade 6 A</SelectItem>
                    <SelectItem value="g5a">Grade 5 A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Questions</Label>
                <Input type="number" defaultValue={5} min={1} max={30} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Difficulty</Label>
              <Select defaultValue="medium">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full bg-violet-600 hover:bg-violet-700" onClick={generateQuiz}>
              <Sparkles className="h-4 w-4 mr-2" /> AI Generate Questions
            </Button>
            <Button variant="outline" className="w-full" onClick={() => setQuestions(p => [...p, { id: Date.now(), text: "", options: ["", "", "", ""], correct: 0 }])}>
              <Plus className="h-4 w-4 mr-2" /> Add Question Manually
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Questions ({questions.length})</CardTitle>
              <CardDescription>Review and edit before publishing.</CardDescription>
            </div>
            {questions.length > 0 && (
              <Button size="sm" onClick={() => toast({ title: "Quiz Published", description: `"${quizTitle}" is now live for students.` })}>
                Publish Quiz
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {questions.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-12">No questions yet. Generate with AI or add manually.</p>
            ) : (
              questions.map((q, idx) => (
                <div key={q.id} className="p-4 rounded-lg border space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <Label className="font-medium">Q{idx + 1}. {q.text}</Label>
                    <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8 text-destructive" onClick={() => setQuestions(p => p.filter(x => x.id !== q.id))}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {q.options.map((opt, i) => (
                      <div key={i} className={`text-sm p-2 rounded border ${i === q.correct ? "border-success bg-success/10" : ""}`}>
                        {String.fromCharCode(65 + i)}. {opt}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>My Quizzes</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {existingQuizzes.map((q) => (
            <div key={q.id} className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <p className="font-medium">{q.title}</p>
                <p className="text-sm text-muted-foreground">{q.class} • {q.questions} questions</p>
              </div>
              <div className="flex items-center gap-3">
                {q.avg !== "—" && <span className="text-sm text-muted-foreground">Avg: {q.avg}</span>}
                <Badge variant={q.status === "Published" ? "default" : "secondary"}>{q.status}</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
