export interface Student {
  id: string;
  name: string;
  class: string;
  section: string;
  rollNo: string;
  gpa: number;
  attendancePercent: number;
  parentId: string;
  status: 'Active' | 'Inactive';
}

export interface Teacher {
  id: string;
  name: string;
  subjects: string[];
  classTeacher: string | null;
  status: 'Active' | 'Inactive';
}

export const mockStudents: Student[] = [
  { id: "S001", name: "Alice Johnson", class: "Grade 6", section: "A", rollNo: "01", gpa: 3.8, attendancePercent: 95, parentId: "P001", status: "Active" },
  { id: "S002", name: "Bob Smith", class: "Grade 6", section: "A", rollNo: "02", gpa: 3.5, attendancePercent: 88, parentId: "P002", status: "Active" },
  { id: "S003", name: "Charlie Brown", class: "Grade 6", section: "B", rollNo: "03", gpa: 3.9, attendancePercent: 98, parentId: "P003", status: "Active" },
  { id: "S004", name: "Diana Prince", class: "Grade 5", section: "A", rollNo: "04", gpa: 4.0, attendancePercent: 100, parentId: "P004", status: "Active" },
  { id: "S005", name: "Evan Wright", class: "Grade 5", section: "B", rollNo: "05", gpa: 3.2, attendancePercent: 82, parentId: "P005", status: "Active" },
  { id: "S006", name: "Fiona Gallagher", class: "Grade 4", section: "A", rollNo: "06", gpa: 3.6, attendancePercent: 91, parentId: "P006", status: "Active" },
  { id: "S007", name: "George Miller", class: "Grade 4", section: "B", rollNo: "07", gpa: 3.4, attendancePercent: 85, parentId: "P007", status: "Active" },
  { id: "S008", name: "Hannah Abbott", class: "Grade 3", section: "A", rollNo: "08", gpa: 3.7, attendancePercent: 93, parentId: "P008", status: "Active" },
  { id: "S009", name: "Ian Stone", class: "Grade 3", section: "B", rollNo: "09", gpa: 3.1, attendancePercent: 78, parentId: "P009", status: "Active" },
  { id: "S010", name: "Julia Roberts", class: "Grade 2", section: "A", rollNo: "10", gpa: 3.9, attendancePercent: 97, parentId: "P010", status: "Active" },
  { id: "S011", name: "Kevin Hart", class: "Grade 2", section: "B", rollNo: "11", gpa: 3.3, attendancePercent: 86, parentId: "P011", status: "Active" },
  { id: "S012", name: "Laura Croft", class: "Grade 1", section: "A", rollNo: "12", gpa: 4.0, attendancePercent: 99, parentId: "P012", status: "Active" }
];

export const mockTeachers: Teacher[] = [
  { id: "T001", name: "Mr. Arthur Pendragon", subjects: ["Mathematics", "Physics"], classTeacher: "Grade 6 A", status: "Active" },
  { id: "T002", name: "Ms. Beatrice Prior", subjects: ["English", "Literature"], classTeacher: "Grade 6 B", status: "Active" },
  { id: "T003", name: "Mr. Charles Xavier", subjects: ["History", "Geography"], classTeacher: "Grade 5 A", status: "Active" },
  { id: "T004", name: "Dr. Diana Troy", subjects: ["Biology", "Chemistry"], classTeacher: "Grade 5 B", status: "Active" },
  { id: "T005", name: "Mr. Edward Elric", subjects: ["Physical Education"], classTeacher: "Grade 4 A", status: "Active" },
  { id: "T006", name: "Ms. Felicity Smoak", subjects: ["Art", "Music"], classTeacher: null, status: "Active" }
];

export const mockClasses = [
  { id: "C001", name: "Grade 6", section: "A", teacherId: "T001", capacity: 30, enrolled: 28 },
  { id: "C002", name: "Grade 6", section: "B", teacherId: "T002", capacity: 30, enrolled: 29 },
  { id: "C003", name: "Grade 5", section: "A", teacherId: "T003", capacity: 30, enrolled: 25 },
  { id: "C004", name: "Grade 5", section: "B", teacherId: "T004", capacity: 30, enrolled: 27 },
  { id: "C005", name: "Grade 4", section: "A", teacherId: "T005", capacity: 30, enrolled: 30 },
  { id: "C006", name: "Grade 4", section: "B", teacherId: "T006", capacity: 30, enrolled: 26 },
];

export const mockFees = [
  { studentId: "S001", tuition: 1500, transport: 300, library: 50, status: "Paid", dueDate: "2023-11-01" },
  { studentId: "S002", tuition: 1500, transport: 300, library: 50, status: "Overdue", dueDate: "2023-10-01" },
  { studentId: "S003", tuition: 1500, transport: 0, library: 50, status: "Paid", dueDate: "2023-11-01" },
];

export const mockNotices = [
  { id: "N001", title: "Annual Sports Day", date: "2023-11-15", author: "Admin", priority: "High" },
  { id: "N002", title: "Term 1 Exams Schedule", date: "2023-11-20", author: "Principal", priority: "High" },
  { id: "N003", title: "Library Book Returns", date: "2023-11-25", author: "Librarian", priority: "Normal" },
];
