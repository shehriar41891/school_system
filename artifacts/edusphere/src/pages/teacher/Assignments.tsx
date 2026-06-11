import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { ClipboardList, Sparkles, Plus } from "lucide-react";
import { AIBadge } from "@/components/ai/AIBadge";
import { AIDisclaimerBanner } from "@/components/ai/AIDisclaimerBanner";

const existingAssignments = [
  { id: 1, title: "Algebra Word Problems", class: "Grade 6 A", due: "2023-12-05", submitted: 24, total: 28, status: "Active" },
  { id: 2, title: "Newton's Laws Worksheet", class: "Grade 6 A", due: "2023-12-08", submitted: 18, total: 28, status: "Active" },
  { id: 3, title: "Fractions Practice Set", class: "Grade 5 A", due: "2023-11-28", submitted: 25, total: 25, status: "Closed" },
];

export default function TeacherAssignments() {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");

  const generateWithAI = () => {
    setAiSuggestion(
      "AI Suggested Assignment:\n\nTitle: Real-World Ratio Problems\n\nInstructions: Students will solve 10 word problems involving ratios in everyday contexts (recipes, maps, sports statistics). Include 2 challenge problems for advanced learners.\n\nRubric: Accuracy (40%), Show Work (30%), Neatness (15%), Bonus Challenge (15%)\n\nEstimated time: 45 minutes"
    );
    toast({ title: "AI Generated", description: "Assignment draft created. Review and publish when ready." });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ClipboardList className="h-7 w-7 text-accent" />
            Assignment Helper
            <AIBadge />
          </h1>
          <p className="text-muted-foreground">Create, manage, and get AI help drafting assignments.</p>
        </div>
      </div>

      <AIDisclaimerBanner compact />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Create New Assignment</CardTitle>
            <CardDescription>Fill in details or let AI draft it for you.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input placeholder="e.g. Chapter 5 Algebra Problems" value={title} onChange={(e) => setTitle(e.target.value)} />
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
                <Label>Due Date</Label>
                <Input type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description / Instructions</Label>
              <Textarea placeholder="Assignment instructions for students..." value={description} onChange={(e) => setDescription(e.target.value)} className="h-24" />
            </div>
            <div className="flex gap-2">
              <Button className="bg-violet-600 hover:bg-violet-700 flex-1" onClick={generateWithAI}>
                <Sparkles className="h-4 w-4 mr-2" /> AI Generate Draft
              </Button>
              <Button className="flex-1" onClick={() => toast({ title: "Assignment Published", description: title || "New assignment created." })}>
                <Plus className="h-4 w-4 mr-2" /> Publish
              </Button>
            </div>
          </CardContent>
        </Card>

        {aiSuggestion && (
          <Card className="border-violet-200 bg-violet-50/30 dark:bg-violet-950/10">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-violet-500" /> AI Draft
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-sm whitespace-pre-wrap font-sans">{aiSuggestion}</pre>
              <Button variant="outline" size="sm" className="mt-4" onClick={() => setDescription(aiSuggestion)}>Use This Draft</Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Due</TableHead>
                <TableHead>Submissions</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {existingAssignments.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">{a.title}</TableCell>
                  <TableCell>{a.class}</TableCell>
                  <TableCell>{a.due}</TableCell>
                  <TableCell>{a.submitted}/{a.total}</TableCell>
                  <TableCell><Badge variant={a.status === "Active" ? "default" : "secondary"}>{a.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
