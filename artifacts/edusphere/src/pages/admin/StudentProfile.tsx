import { useData } from "@/contexts/DataContext";
import { useParams, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, GraduationCap, Calendar as CalendarIcon, Banknote, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminStudentProfile() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { state } = useData();

  const student = state.students.find((s) => s.id === id);
  const feeDetails = state.fees.filter((f) => f.studentId === id);

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <h2 className="text-2xl font-bold">Student Not Found</h2>
        <Button onClick={() => setLocation("/admin/students")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Students
        </Button>
      </div>
    );
  }

  // Mock Calendar Data
  const daysInMonth = 30;
  const attendanceCells = Array.from({ length: daysInMonth }, (_, i) => {
    if (i < 20) return "P";
    return i % 2 === 0 ? "A" : "L";
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => setLocation("/admin/students")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{student.name}</h1>
          <p className="text-muted-foreground">{student.class} - Section {student.section}</p>
        </div>
        <div className="ml-auto">
          <Badge variant={student.status === "Active" ? "default" : "destructive"} className={student.status === "Active" ? "bg-success" : ""}>
            {student.status}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full sm:w-[400px] grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="fees">Fees</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-y-4 text-sm">
                  <div>
                    <span className="text-muted-foreground block mb-1">Full Name</span>
                    <span className="font-medium">{student.name}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block mb-1">Student ID</span>
                    <span className="font-medium">{student.id}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block mb-1">Parent ID</span>
                    <span className="font-medium">{student.parentId}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block mb-1">Status</span>
                    <span className="font-medium">{student.status}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-accent" />
                  Academic Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-y-4 text-sm">
                  <div>
                    <span className="text-muted-foreground block mb-1">Class</span>
                    <span className="font-medium">{student.class}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block mb-1">Section</span>
                    <span className="font-medium">{student.section}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block mb-1">Roll No</span>
                    <span className="font-medium">{student.rollNo}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block mb-1">GPA</span>
                    <span className="font-medium">{student.gpa.toFixed(1)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-success" />
                Attendance Record
              </CardTitle>
              <CardDescription>Overall: {student.attendancePercent}%</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 sm:gap-4 max-w-2xl">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-xs font-medium text-muted-foreground pb-2">
                    {day}
                  </div>
                ))}
                
                {/* Empty offset days (assuming starts on Wed for mock) */}
                <div className="aspect-square"></div>
                <div className="aspect-square"></div>
                <div className="aspect-square"></div>

                {attendanceCells.map((status, idx) => (
                  <div 
                    key={idx} 
                    className={`aspect-square rounded flex items-center justify-center font-semibold text-sm
                      ${status === 'P' ? 'bg-success/20 text-success border border-success/30' : ''}
                      ${status === 'A' ? 'bg-destructive/20 text-destructive border border-destructive/30' : ''}
                      ${status === 'L' ? 'bg-secondary/20 text-secondary border border-secondary/30' : ''}
                    `}
                    title={status === 'P' ? 'Present' : status === 'A' ? 'Absent' : 'Late'}
                  >
                    {idx + 1}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex gap-4 text-sm">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-success/50 border border-success"></div> Present</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-destructive/50 border border-destructive"></div> Absent</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-secondary/50 border border-secondary"></div> Late</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fees" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Banknote className="h-5 w-5 text-amber-500" />
                Fee History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {feeDetails.length > 0 ? (
                <div className="space-y-6">
                  {feeDetails.map((fee, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1 mb-4 sm:mb-0">
                        <div className="font-semibold flex items-center gap-2">
                          Term Fee
                          <Badge variant={fee.status === 'Paid' ? 'default' : 'destructive'} className={fee.status === 'Paid' ? 'bg-success' : ''}>
                            {fee.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">Due: {fee.dueDate}</div>
                      </div>
                      <div className="flex flex-col sm:items-end gap-1">
                        <div className="text-sm flex justify-between sm:justify-start w-full gap-4">
                          <span className="text-muted-foreground">Tuition:</span>
                          <span className="font-medium">${fee.tuition}</span>
                        </div>
                        <div className="text-sm flex justify-between sm:justify-start w-full gap-4">
                          <span className="text-muted-foreground">Transport:</span>
                          <span className="font-medium">${fee.transport}</span>
                        </div>
                        <div className="text-sm flex justify-between sm:justify-start w-full gap-4">
                          <span className="text-muted-foreground">Library:</span>
                          <span className="font-medium">${fee.library}</span>
                        </div>
                        <div className="text-sm flex justify-between sm:justify-start w-full gap-4 pt-1 border-t mt-1">
                          <span className="text-muted-foreground font-semibold">Total:</span>
                          <span className="font-bold">${fee.tuition + fee.transport + fee.library}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">No fee records found for this student.</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
