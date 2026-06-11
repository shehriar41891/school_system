import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminFeeStructure() {
  const { toast } = useToast();

  const mockStructure = [
    { class: "Grade 6", tuition: 1500, transport: 300, library: 50, dueDate: "10th of Month" },
    { class: "Grade 5", tuition: 1400, transport: 300, library: 50, dueDate: "10th of Month" },
    { class: "Grade 4", tuition: 1300, transport: 300, library: 50, dueDate: "10th of Month" },
    { class: "Grade 3", tuition: 1200, transport: 300, library: 50, dueDate: "10th of Month" },
    { class: "Grade 2", tuition: 1100, transport: 300, library: 50, dueDate: "10th of Month" },
    { class: "Grade 1", tuition: 1000, transport: 300, library: 50, dueDate: "10th of Month" },
  ];

  const handleEdit = () => {
    toast({
      title: "Edit Fee Structure",
      description: "This feature is coming soon.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Fee Structure</h1>
        <p className="text-muted-foreground">Define fee amounts for different classes.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Standard Fee Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class</TableHead>
                  <TableHead className="text-right">Tuition Fee ($)</TableHead>
                  <TableHead className="text-right">Transport Fee ($)</TableHead>
                  <TableHead className="text-right">Library Fee ($)</TableHead>
                  <TableHead className="text-right">Total ($)</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockStructure.map((row) => (
                  <TableRow key={row.class}>
                    <TableCell className="font-medium">{row.class}</TableCell>
                    <TableCell className="text-right">{row.tuition}</TableCell>
                    <TableCell className="text-right">{row.transport}</TableCell>
                    <TableCell className="text-right">{row.library}</TableCell>
                    <TableCell className="text-right font-bold">{row.tuition + row.transport + row.library}</TableCell>
                    <TableCell>{row.dueDate}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={handleEdit}>
                        <Edit className="h-4 w-4" />
                      </Button>
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
