import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Sparkles, Upload, FileText, Video, Link2 } from "lucide-react";
import { AIBadge } from "@/components/ai/AIBadge";
import { AIDisclaimerBanner } from "@/components/ai/AIDisclaimerBanner";

const materials = [
  { id: 1, title: "Algebra Chapter 5 Notes", type: "PDF", class: "Grade 6 A", date: "2023-11-20", views: 45 },
  { id: 2, title: "Newton's Laws Video Lecture", type: "Video", class: "Grade 6 A", date: "2023-11-18", views: 38 },
  { id: 3, title: "Practice Worksheet — Fractions", type: "PDF", class: "Grade 5 A", date: "2023-11-15", views: 52 },
  { id: 4, title: "Khan Academy — Ratios Link", type: "Link", class: "Grade 6 A", date: "2023-11-10", views: 61 },
];

const typeIcon = { PDF: FileText, Video: Video, Link: Link2 };

export default function TeacherMaterials() {
  const { toast } = useToast();
  const [aiOutline, setAiOutline] = useState("");

  const generateOutline = () => {
    setAiOutline(
      "AI Suggested Material Outline:\n\n1. Introduction to Ratios (5 min read)\n2. Key vocabulary: ratio, proportion, equivalent ratios\n3. Worked examples (3 problems with step-by-step solutions)\n4. Practice exercises (10 problems, mixed difficulty)\n5. Real-world application: recipe scaling activity\n6. Self-check quiz (5 questions)\n\nRecommended format: PDF worksheet + optional video link"
    );
    toast({ title: "Outline Generated", description: "AI material outline ready for review." });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="h-7 w-7 text-accent" />
          Materials Helper
          <AIBadge />
        </h1>
        <p className="text-muted-foreground">Upload study materials or get AI help structuring lesson content.</p>
      </div>

      <AIDisclaimerBanner compact />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Upload Material</CardTitle>
            <CardDescription>Share notes, videos, or links with your class.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input placeholder="e.g. Chapter 5 Study Guide" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select defaultValue="pdf">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="link">External Link</SelectItem>
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
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Brief description for students..." className="h-20" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Upload className="h-4 w-4 mr-2" /> Upload File
              </Button>
              <Button className="flex-1" onClick={() => toast({ title: "Material Published", description: "Students can now access this material." })}>
                Publish
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-violet-200">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-violet-500" /> AI Material Planner
            </CardTitle>
            <CardDescription>Generate a structured outline for lesson materials.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Topic</Label>
              <Input placeholder="e.g. Ratios and Proportions" />
            </div>
            <div className="space-y-2">
              <Label>Grade Level</Label>
              <Select defaultValue="g6">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="g6">Grade 6</SelectItem>
                  <SelectItem value="g5">Grade 5</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full bg-violet-600 hover:bg-violet-700" onClick={generateOutline}>
              <Sparkles className="h-4 w-4 mr-2" /> Generate Outline
            </Button>
            {aiOutline && <pre className="text-sm whitespace-pre-wrap font-sans bg-muted/50 p-3 rounded-lg">{aiOutline}</pre>}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Published Materials</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {materials.map((m) => {
            const Icon = typeIcon[m.type as keyof typeof typeIcon] || FileText;
            return (
              <div key={m.id} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 p-2 rounded-lg"><Icon className="h-5 w-5 text-accent" /></div>
                  <div>
                    <p className="font-medium text-sm">{m.title}</p>
                    <p className="text-xs text-muted-foreground">{m.class} • {m.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{m.type}</Badge>
                  <span className="text-xs text-muted-foreground">{m.views} views</span>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
