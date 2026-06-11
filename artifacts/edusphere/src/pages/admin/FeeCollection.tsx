import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Banknote, AlertCircle, CheckCircle2 } from "lucide-react";

export default function AdminFeeCollection() {
  const { state } = useData();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  // Extend mock fees with student data
  const feeRecords = state.fees.map(f => {
    const student = state.students.find(s => s.id === f.studentId);
    return { ...f, studentName: student?.name, class: student?.class };
  });

  const totalCollected = feeRecords.filter(f => f.status === 'Paid').reduce((acc, f) => acc + f.tuition + f.transport + f.library, 0);
  const totalOverdue = feeRecords.filter(f => f.status === 'Overdue').reduce((acc, f) => acc + f.tuition + f.transport + f.library, 0);
  const overdueCount = feeRecords.filter(f => f.status === 'Overdue').length;

  const handleRecordPayment = () => {
    toast({
      title: "Payment Recorded",
      description: "The fee payment has been successfully recorded.",
    });
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Fee Collection</h1>
          <p className="text-muted-foreground">Manage and record student fee payments.</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Banknote className="h-4 w-4 mr-2" />
              Record Payment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Record Fee Payment</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Student ID or Name</Label>
                <Input placeholder="Search student..." />
              </div>
              <div className="space-y-2">
                <Label>Amount</Label>
                <Input type="number" placeholder="Enter amount..." />
              </div>
              <div className="space-y-2">
                <Label>Payment Mode</Label>
                <Input placeholder="Cash, Card, Transfer..." />
              </div>
              <Button onClick={handleRecordPayment} className="w-full mt-2 bg-success hover:bg-success/90">
                Submit Payment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-success">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Collected</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalCollected.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">This term</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-destructive">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overdue Amount</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">${totalOverdue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">From {overdueCount} students</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Collection</CardTitle>
            <Banknote className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${(totalOverdue + 5000).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Expected this month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Fee Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feeRecords.map((fee, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{fee.studentName}</TableCell>
                    <TableCell>{fee.class}</TableCell>
                    <TableCell className="font-bold">${fee.tuition + fee.transport + fee.library}</TableCell>
                    <TableCell>{fee.dueDate}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={fee.status === 'Paid' ? 'default' : fee.status === 'Overdue' ? 'destructive' : 'secondary'}
                        className={fee.status === 'Paid' ? 'bg-success' : fee.status === 'Partial' ? 'bg-secondary' : ''}
                      >
                        {fee.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
