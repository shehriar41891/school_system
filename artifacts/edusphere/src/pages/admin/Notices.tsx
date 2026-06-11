import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Megaphone, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function AdminNotices() {
  const { state } = useData();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handlePost = () => {
    toast({
      title: "Notice Posted",
      description: "The notice has been successfully published.",
    });
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notice Board</h1>
          <p className="text-muted-foreground">Manage school-wide announcements.</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Post Notice
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Notice</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Notice Title</Label>
                <Input placeholder="Enter title..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Target Audience</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">Everyone</SelectItem>
                      <SelectItem value="Students">Students Only</SelectItem>
                      <SelectItem value="Parents">Parents Only</SelectItem>
                      <SelectItem value="Teachers">Teachers Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Notice Body</Label>
                <Textarea placeholder="Enter notice content..." className="min-h-[100px]" />
              </div>
              <Button onClick={handlePost} className="w-full mt-2">Publish Notice</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {state.notices.map((notice) => (
          <Card key={notice.id}>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg shrink-0">
                    <Megaphone className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">{notice.title}</h3>
                    <p className="text-muted-foreground text-sm max-w-3xl">
                      This is a placeholder body for the notice. In a real application, this would contain the full detailed text of the announcement made by the administration.
                    </p>
                    <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mt-4 pt-2">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {notice.date}</span>
                      <span>By: {notice.author}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <Badge variant={notice.priority === 'High' ? 'destructive' : 'secondary'} className={notice.priority === 'High' ? '' : ''}>
                    {notice.priority} Priority
                  </Badge>
                  <Badge variant="outline">Audience: All</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
