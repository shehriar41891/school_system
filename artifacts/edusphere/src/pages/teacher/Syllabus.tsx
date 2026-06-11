import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { FileText, Sparkles, Download } from "lucide-react";
import { AIBadge } from "@/components/ai/AIBadge";
import { AIDisclaimerBanner } from "@/components/ai/AIDisclaimerBanner";

const savedSyllabi = [
  { id: 1, subject: "Mathematics", class: "Grade 6 A", term: "Term 2", weeks: 12, status: "Published" },
  { id: 2, subject: "Physics", class: "Grade 6 A", term: "Term 2", weeks: 10, status: "Draft" },
];

export default function TeacherSyllabus() {
  const { toast } = useToast();
  const [generated, setGenerated] = useState("");

  const generateSyllabus = () => {
    setGenerated(`AI Generated Syllabus — Mathematics, Grade 6, Term 2

Week 1-2: Ratios & Proportions
  • Understanding ratios in real-world contexts
  • Equivalent ratios and unit rates
  • Assessment: Unit quiz

Week 3-4: Algebraic Expressions
  • Variables and constants
  • Simplifying expressions
  • Assessment: Assignment + class test

Week 5-6: Linear Equations
  • One-step and two-step equations
  • Word problems with equations
  • Assessment: Mid-term exam

Week 7-8: Geometry — Angles & Triangles
  • Angle relationships
  • Triangle properties and classification
  • Assessment: Practical worksheet

Week 9-10: Data & Statistics
  • Mean, median, mode
  • Reading and creating graphs
  • Assessment: Project presentation

Week 11-12: Review & Final Assessment
  • Comprehensive review sessions
  • Final term examination`);
    toast({ title: "Syllabus Generated", description: "Review the AI draft and publish when ready." });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="h-7 w-7 text-accent" />
          Syllabus Generator
          <AIBadge />
        </h1>
        <p className="text-muted-foreground">AI-powered syllabus creation for your subjects and terms.</p>
      </div>

      <AIDisclaimerBanner compact />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Generate Syllabus</CardTitle>
            <CardDescription>Configure and let AI build a term plan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Subject</Label>
              <Select defaultValue="math">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
              <Label>Term</Label>
              <Select defaultValue="t2">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="t1">Term 1</SelectItem>
                  <SelectItem value="t2">Term 2</SelectItem>
                  <SelectItem value="t3">Term 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Duration (weeks)</Label>
              <Input type="number" defaultValue={12} min={4} max={20} />
            </div>
            <Button className="w-full bg-violet-600 hover:bg-violet-700" onClick={generateSyllabus}>
              <Sparkles className="h-4 w-4 mr-2" /> Generate with AI
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Generated Syllabus</CardTitle>
            {generated && (
              <Button variant="outline" size="sm" onClick={() => toast({ title: "Downloaded", description: "Syllabus PDF saved." })}>
                <Download className="h-4 w-4 mr-1" /> Export PDF
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {generated ? (
              <pre className="text-sm whitespace-pre-wrap font-sans leading-relaxed">{generated}</pre>
            ) : (
              <p className="text-muted-foreground text-sm text-center py-12">
                Configure options and click "Generate with AI" to create a syllabus draft.
              </p>
            )}
            {generated && (
              <Button className="mt-4" onClick={() => toast({ title: "Syllabus Published", description: "Students and parents can now view the syllabus." })}>
                Publish Syllabus
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Saved Syllabi</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {savedSyllabi.map((s) => (
            <div key={s.id} className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <p className="font-medium">{s.subject} — {s.class}</p>
                <p className="text-sm text-muted-foreground">{s.term} • {s.weeks} weeks</p>
              </div>
              <Badge variant={s.status === "Published" ? "default" : "secondary"}>{s.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
