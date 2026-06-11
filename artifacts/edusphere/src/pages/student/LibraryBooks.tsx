import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Book, Clock } from "lucide-react";

export default function StudentLibraryBooks() {
  const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", issuedOn: "2023-10-15", dueDate: "2023-10-29", status: "Overdue" },
    { id: 2, title: "Introduction to Algorithms", author: "Thomas H. Cormen", issuedOn: "2023-10-25", dueDate: "2023-11-08", status: "Issued" },
    { id: 3, title: "Sapiens", author: "Yuval Noah Harari", issuedOn: "2023-09-10", dueDate: "2023-09-24", status: "Returned" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Library Books</h1>
        <p className="text-muted-foreground">Track your issued library books and due dates.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-4 flex items-center gap-4">
            <Book className="h-8 w-8 opacity-80" />
            <div>
              <div className="text-2xl font-bold">2</div>
              <div className="text-sm opacity-80">Currently Issued</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-destructive text-destructive-foreground">
          <CardContent className="p-4 flex items-center gap-4">
            <Clock className="h-8 w-8 opacity-80" />
            <div>
              <div className="text-2xl font-bold">1</div>
              <div className="text-sm opacity-80">Overdue Books</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Issuance History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Issued On</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book.id} className={book.status === "Overdue" ? "bg-destructive/5" : ""}>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.issuedOn}</TableCell>
                    <TableCell className={book.status === "Overdue" ? "text-destructive font-bold" : ""}>
                      {book.dueDate}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={book.status === 'Returned' ? 'secondary' : book.status === 'Overdue' ? 'destructive' : 'default'}
                        className={book.status === 'Issued' ? 'bg-primary' : ''}
                      >
                        {book.status}
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
