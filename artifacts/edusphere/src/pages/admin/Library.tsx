import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminLibrary() {
  const [searchTerm, setSearchTerm] = useState("");

  const mockBooks = [
    { id: "B001", title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", copies: 5, issued: 2 },
    { id: "B002", title: "1984", author: "George Orwell", category: "Fiction", copies: 3, issued: 3 },
    { id: "B003", title: "Brief History of Time", author: "Stephen Hawking", category: "Science", copies: 4, issued: 1 },
    { id: "B004", title: "Introduction to Algorithms", author: "Thomas H. Cormen", category: "Computer Science", copies: 2, issued: 0 },
    { id: "B005", title: "Sapiens", author: "Yuval Noah Harari", category: "History", copies: 6, issued: 4 },
    { id: "B006", title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction", copies: 4, issued: 2 },
    { id: "B007", title: "A People's History of the United States", author: "Howard Zinn", category: "History", copies: 3, issued: 1 },
    { id: "B008", title: "Clean Code", author: "Robert C. Martin", category: "Computer Science", copies: 5, issued: 5 },
    { id: "B009", title: "The Selfish Gene", author: "Yuval Noah Harari", category: "Science", copies: 4, issued: 2 },
    { id: "B010", title: "Pride and Prejudice", author: "Jane Austen", category: "Fiction", copies: 7, issued: 3 },
  ];

  const filteredBooks = mockBooks.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Library</h1>
          <p className="text-muted-foreground">Manage books, inventory, and issuances.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Book
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle>Book Inventory</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title or author..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Total Copies</TableHead>
                  <TableHead className="text-right">Available</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBooks.map((book) => {
                  const available = book.copies - book.issued;
                  return (
                    <TableRow key={book.id}>
                      <TableCell className="font-medium">{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>{book.category}</TableCell>
                      <TableCell className="text-right">{book.copies}</TableCell>
                      <TableCell className="text-right">{available}</TableCell>
                      <TableCell>
                        <Badge variant={available > 0 ? "default" : "destructive"} className={available > 0 ? "bg-success" : ""}>
                          {available > 0 ? "Available" : "Out of Stock"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
