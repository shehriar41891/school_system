import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function AdminAddStudent() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "", dob: "", gender: "", bloodGroup: "",
    class: "", section: "", rollNo: ""
  });

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));
  
  const handleSubmit = () => {
    toast({
      title: "Student Added Successfully",
      description: `${formData.name} has been added to ${formData.class} Section ${formData.section}.`,
    });
    setLocation("/admin/students");
  };

  const updateForm = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => setLocation("/admin/students")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Add New Student</h1>
          <p className="text-muted-foreground">Follow the steps to enroll a new student.</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center relative z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2
              ${step === i ? 'bg-primary text-primary-foreground border-primary' : 
                step > i ? 'bg-success text-white border-success' : 'bg-background text-muted-foreground border-border'}`}>
              {step > i ? <CheckCircle2 className="h-5 w-5" /> : i}
            </div>
            <span className="text-xs mt-2 font-medium">
              {i === 1 ? "Personal Info" : i === 2 ? "Academic Details" : "Confirmation"}
            </span>
          </div>
        ))}
        {/* Connecting lines */}
        <div className="absolute left-0 top-5 w-full h-0.5 bg-border -z-0 hidden md:block px-12" style={{ transform: "translateY(-50%)" }}>
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${(step - 1) * 50}%` }} />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && "Personal Information"}
            {step === 2 && "Academic Details"}
            {step === 3 && "Review & Confirm"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={formData.name} onChange={(e) => updateForm("name", e.target.value)} placeholder="e.g. John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" value={formData.dob} onChange={(e) => updateForm("dob", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <Select value={formData.gender} onValueChange={(v) => updateForm("gender", v)}>
                  <SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Blood Group</Label>
                <Select value={formData.bloodGroup} onValueChange={(v) => updateForm("bloodGroup", v)}>
                  <SelectTrigger><SelectValue placeholder="Select Blood Group" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Class</Label>
                <Select value={formData.class} onValueChange={(v) => updateForm("class", v)}>
                  <SelectTrigger><SelectValue placeholder="Select Class" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Grade 1">Grade 1</SelectItem>
                    <SelectItem value="Grade 2">Grade 2</SelectItem>
                    <SelectItem value="Grade 3">Grade 3</SelectItem>
                    <SelectItem value="Grade 4">Grade 4</SelectItem>
                    <SelectItem value="Grade 5">Grade 5</SelectItem>
                    <SelectItem value="Grade 6">Grade 6</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Section</Label>
                <Select value={formData.section} onValueChange={(v) => updateForm("section", v)}>
                  <SelectTrigger><SelectValue placeholder="Select Section" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Section A</SelectItem>
                    <SelectItem value="B">Section B</SelectItem>
                    <SelectItem value="C">Section C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rollNo">Roll Number</Label>
                <Input id="rollNo" value={formData.rollNo} onChange={(e) => updateForm("rollNo", e.target.value)} placeholder="e.g. 15" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground block mb-1">Full Name</span><span className="font-medium">{formData.name || "N/A"}</span></div>
                <div><span className="text-muted-foreground block mb-1">Date of Birth</span><span className="font-medium">{formData.dob || "N/A"}</span></div>
                <div><span className="text-muted-foreground block mb-1">Gender</span><span className="font-medium">{formData.gender || "N/A"}</span></div>
                <div><span className="text-muted-foreground block mb-1">Blood Group</span><span className="font-medium">{formData.bloodGroup || "N/A"}</span></div>
                <div><span className="text-muted-foreground block mb-1">Class</span><span className="font-medium">{formData.class || "N/A"}</span></div>
                <div><span className="text-muted-foreground block mb-1">Section</span><span className="font-medium">{formData.section || "N/A"}</span></div>
                <div><span className="text-muted-foreground block mb-1">Roll No</span><span className="font-medium">{formData.rollNo || "N/A"}</span></div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={step === 1}>Back</Button>
          {step < 3 ? (
            <Button onClick={handleNext}>Next Step</Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-success hover:bg-success/90">Confirm & Enroll</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
