import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { DataProvider } from "@/contexts/DataContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { PrincipalLayout } from "@/components/layout/PrincipalLayout";
import { TeacherLayout } from "@/components/layout/TeacherLayout";

import Landing from "@/pages/landing/Landing";
import Login from "@/pages/auth/Login";
import NotFound from "@/pages/not-found";

import AdminDashboard from "@/pages/admin/Dashboard";
import AdminStudents from "@/pages/admin/Students";
import AdminStudentProfile from "@/pages/admin/StudentProfile";
import AdminAddStudent from "@/pages/admin/AddStudent";
import AdminTeachers from "@/pages/admin/Teachers";
import AdminTeacherProfile from "@/pages/admin/TeacherProfile";
import AdminClasses from "@/pages/admin/Classes";
import AdminAttendanceMark from "@/pages/admin/AttendanceMark";
import AdminAttendanceReports from "@/pages/admin/AttendanceReports";
import AdminExamSchedule from "@/pages/admin/ExamSchedule";
import AdminMarksEntry from "@/pages/admin/MarksEntry";
import AdminReportCards from "@/pages/admin/ReportCards";
import AdminFeeStructure from "@/pages/admin/FeeStructure";
import AdminFeeCollection from "@/pages/admin/FeeCollection";
import AdminFeeReports from "@/pages/admin/FeeReports";
import AdminTimetable from "@/pages/admin/Timetable";
import AdminNotices from "@/pages/admin/Notices";
import AdminMessages from "@/pages/admin/Messages";
import AdminLibrary from "@/pages/admin/Library";
import AdminTransport from "@/pages/admin/Transport";
import AdminCalendar from "@/pages/admin/Calendar";
import AdminReports from "@/pages/admin/Reports";
import AdminAIInsights from "@/pages/admin/AIInsights";
import AdminSettings from "@/pages/admin/Settings";

import StudentDashboard from "@/pages/student/Dashboard";
import StudentProfile from "@/pages/student/Profile";
import StudentAttendance from "@/pages/student/Attendance";
import StudentTimetable from "@/pages/student/Timetable";
import StudentAssignments from "@/pages/student/Assignments";
import StudentExams from "@/pages/student/Exams";
import StudentResults from "@/pages/student/Results";
import StudentFees from "@/pages/student/Fees";
import StudentStudyMaterials from "@/pages/student/StudyMaterials";
import StudentLibraryBooks from "@/pages/student/LibraryBooks";
import StudentNotices from "@/pages/student/Notices";
import StudentMessages from "@/pages/student/Messages";
import StudentNotifications from "@/pages/student/Notifications";
import StudentAIAdvisor from "@/pages/student/AIAdvisor";

import ParentDashboard from "@/pages/parent/Dashboard";
import ParentChildProfile from "@/pages/parent/ChildProfile";
import ParentAttendance from "@/pages/parent/Attendance";
import ParentAcademics from "@/pages/parent/Academics";
import ParentReportCard from "@/pages/parent/ReportCard";
import ParentFees from "@/pages/parent/Fees";
import ParentMessages from "@/pages/parent/Messages";
import ParentMeetings from "@/pages/parent/Meetings";
import ParentNotices from "@/pages/parent/Notices";
import ParentTransport from "@/pages/parent/Transport";
import ParentProfile from "@/pages/parent/ParentProfile";
import ParentAIAnalysis from "@/pages/parent/AIAnalysis";
import ParentAIReports from "@/pages/parent/AIReports";
import ParentAIAdvisor from "@/pages/parent/AIAdvisor";

import PrincipalDashboard from "@/pages/principal/Dashboard";
import PrincipalAnalytics from "@/pages/principal/Analytics";
import PrincipalStudentAnalysis from "@/pages/principal/StudentAnalysis";
import PrincipalAcademicAnalysis from "@/pages/principal/AcademicAnalysis";
import PrincipalAttendanceAnalysis from "@/pages/principal/AttendanceAnalysis";
import PrincipalReports from "@/pages/principal/Reports";
import PrincipalAdvisor from "@/pages/principal/Advisor";
import PrincipalMeetings from "@/pages/principal/Meetings";
import PrincipalMessages from "@/pages/principal/Messages";

import TeacherDashboard from "@/pages/teacher/Dashboard";
import TeacherClasses from "@/pages/teacher/Classes";
import TeacherAttendance from "@/pages/teacher/Attendance";
import TeacherAssignments from "@/pages/teacher/Assignments";
import TeacherMaterials from "@/pages/teacher/Materials";
import TeacherSyllabus from "@/pages/teacher/Syllabus";
import TeacherQuizzes from "@/pages/teacher/Quizzes";
import TeacherMarks from "@/pages/teacher/Marks";
import TeacherTimetable from "@/pages/teacher/Timetable";
import TeacherMessages from "@/pages/teacher/Messages";
import TeacherAIAssistant from "@/pages/teacher/AIAssistant";

const queryClient = new QueryClient();

const studentNav = [
  { title: "Dashboard", href: "/student/dashboard" },
  { title: "AI Study Buddy", href: "/student/ai-advisor" },
  { title: "Attendance", href: "/student/attendance" },
  { title: "Timetable", href: "/student/timetable" },
  { title: "Assignments", href: "/student/assignments" },
  { title: "Exams", href: "/student/exams" },
  { title: "Results", href: "/student/results" },
  { title: "Fees", href: "/student/fees" },
  { title: "Library", href: "/student/library/materials" },
  { title: "Notices", href: "/student/notices" },
  { title: "Messages", href: "/student/messages" },
];

const parentNav = [
  { title: "Dashboard", href: "/parent/dashboard" },
  { title: "AI Analysis", href: "/parent/ai-analysis" },
  { title: "AI Reports", href: "/parent/ai-reports" },
  { title: "AI Assistant", href: "/parent/ai-advisor" },
  { title: "Child Profile", href: "/parent/child/S001" },
  { title: "Attendance", href: "/parent/attendance" },
  { title: "Academics", href: "/parent/academics" },
  { title: "Fees", href: "/parent/fees" },
  { title: "Messages", href: "/parent/messages" },
  { title: "Meetings", href: "/parent/meetings" },
  { title: "Notices", href: "/parent/notices" },
  { title: "Transport", href: "/parent/transport" },
  { title: "Profile", href: "/parent/profile" },
];

function AdminRoute({ component: Component }: { component: React.ComponentType }) {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminLayout>
        <Component />
      </AdminLayout>
    </ProtectedRoute>
  );
}

function StudentRoute({ component: Component }: { component: React.ComponentType }) {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <PortalLayout navItems={studentNav} portalName="Student Portal">
        <Component />
      </PortalLayout>
    </ProtectedRoute>
  );
}

function ParentRoute({ component: Component }: { component: React.ComponentType }) {
  return (
    <ProtectedRoute allowedRoles={["parent"]}>
      <PortalLayout navItems={parentNav} portalName="Parent Portal">
        <Component />
      </PortalLayout>
    </ProtectedRoute>
  );
}

function PrincipalRoute({ component: Component }: { component: React.ComponentType }) {
  return (
    <ProtectedRoute allowedRoles={["principal"]}>
      <PrincipalLayout>
        <Component />
      </PrincipalLayout>
    </ProtectedRoute>
  );
}

function TeacherRoute({ component: Component }: { component: React.ComponentType }) {
  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <TeacherLayout>
        <Component />
      </TeacherLayout>
    </ProtectedRoute>
  );
}

import React from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />

      {/* Admin routes */}
      <Route path="/admin/dashboard" component={() => <AdminRoute component={AdminDashboard} />} />
      <Route path="/admin/students/new" component={() => <AdminRoute component={AdminAddStudent} />} />
      <Route path="/admin/students/:id" component={() => <AdminRoute component={AdminStudentProfile} />} />
      <Route path="/admin/students" component={() => <AdminRoute component={AdminStudents} />} />
      <Route path="/admin/teachers/:id" component={() => <AdminRoute component={AdminTeacherProfile} />} />
      <Route path="/admin/teachers" component={() => <AdminRoute component={AdminTeachers} />} />
      <Route path="/admin/classes" component={() => <AdminRoute component={AdminClasses} />} />
      <Route path="/admin/attendance/mark" component={() => <AdminRoute component={AdminAttendanceMark} />} />
      <Route path="/admin/attendance/reports" component={() => <AdminRoute component={AdminAttendanceReports} />} />
      <Route path="/admin/attendance" component={() => <AdminRoute component={AdminAttendanceReports} />} />
      <Route path="/admin/academic/exams" component={() => <AdminRoute component={AdminExamSchedule} />} />
      <Route path="/admin/academic/marks" component={() => <AdminRoute component={AdminMarksEntry} />} />
      <Route path="/admin/academic/reportcards" component={() => <AdminRoute component={AdminReportCards} />} />
      <Route path="/admin/academic" component={() => <AdminRoute component={AdminExamSchedule} />} />
      <Route path="/admin/fees/structure" component={() => <AdminRoute component={AdminFeeStructure} />} />
      <Route path="/admin/fees/collection" component={() => <AdminRoute component={AdminFeeCollection} />} />
      <Route path="/admin/fees/reports" component={() => <AdminRoute component={AdminFeeReports} />} />
      <Route path="/admin/fees" component={() => <AdminRoute component={AdminFeeCollection} />} />
      <Route path="/admin/timetable" component={() => <AdminRoute component={AdminTimetable} />} />
      <Route path="/admin/communication/notices" component={() => <AdminRoute component={AdminNotices} />} />
      <Route path="/admin/communication/messages" component={() => <AdminRoute component={AdminMessages} />} />
      <Route path="/admin/communication" component={() => <AdminRoute component={AdminNotices} />} />
      <Route path="/admin/library" component={() => <AdminRoute component={AdminLibrary} />} />
      <Route path="/admin/transport" component={() => <AdminRoute component={AdminTransport} />} />
      <Route path="/admin/calendar" component={() => <AdminRoute component={AdminCalendar} />} />
      <Route path="/admin/reports" component={() => <AdminRoute component={AdminReports} />} />
      <Route path="/admin/ai-insights" component={() => <AdminRoute component={AdminAIInsights} />} />
      <Route path="/admin/settings" component={() => <AdminRoute component={AdminSettings} />} />
      <Route path="/admin" component={() => <AdminRoute component={AdminDashboard} />} />

      {/* Student routes */}
      <Route path="/student/dashboard" component={() => <StudentRoute component={StudentDashboard} />} />
      <Route path="/student/profile" component={() => <StudentRoute component={StudentProfile} />} />
      <Route path="/student/attendance" component={() => <StudentRoute component={StudentAttendance} />} />
      <Route path="/student/timetable" component={() => <StudentRoute component={StudentTimetable} />} />
      <Route path="/student/assignments" component={() => <StudentRoute component={StudentAssignments} />} />
      <Route path="/student/exams" component={() => <StudentRoute component={StudentExams} />} />
      <Route path="/student/results" component={() => <StudentRoute component={StudentResults} />} />
      <Route path="/student/fees" component={() => <StudentRoute component={StudentFees} />} />
      <Route path="/student/library/materials" component={() => <StudentRoute component={StudentStudyMaterials} />} />
      <Route path="/student/library/books" component={() => <StudentRoute component={StudentLibraryBooks} />} />
      <Route path="/student/library" component={() => <StudentRoute component={StudentStudyMaterials} />} />
      <Route path="/student/notices" component={() => <StudentRoute component={StudentNotices} />} />
      <Route path="/student/messages" component={() => <StudentRoute component={StudentMessages} />} />
      <Route path="/student/notifications" component={() => <StudentRoute component={StudentNotifications} />} />
      <Route path="/student/ai-advisor" component={() => <StudentRoute component={StudentAIAdvisor} />} />
      <Route path="/student" component={() => <StudentRoute component={StudentDashboard} />} />

      {/* Parent routes */}
      <Route path="/parent/dashboard" component={() => <ParentRoute component={ParentDashboard} />} />
      <Route path="/parent/child/:id" component={() => <ParentRoute component={ParentChildProfile} />} />
      <Route path="/parent/attendance" component={() => <ParentRoute component={ParentAttendance} />} />
      <Route path="/parent/academics/reportcard" component={() => <ParentRoute component={ParentReportCard} />} />
      <Route path="/parent/academics" component={() => <ParentRoute component={ParentAcademics} />} />
      <Route path="/parent/fees" component={() => <ParentRoute component={ParentFees} />} />
      <Route path="/parent/messages" component={() => <ParentRoute component={ParentMessages} />} />
      <Route path="/parent/meetings" component={() => <ParentRoute component={ParentMeetings} />} />
      <Route path="/parent/notices" component={() => <ParentRoute component={ParentNotices} />} />
      <Route path="/parent/transport" component={() => <ParentRoute component={ParentTransport} />} />
      <Route path="/parent/profile" component={() => <ParentRoute component={ParentProfile} />} />
      <Route path="/parent/ai-analysis" component={() => <ParentRoute component={ParentAIAnalysis} />} />
      <Route path="/parent/ai-reports" component={() => <ParentRoute component={ParentAIReports} />} />
      <Route path="/parent/ai-advisor" component={() => <ParentRoute component={ParentAIAdvisor} />} />
      <Route path="/parent" component={() => <ParentRoute component={ParentDashboard} />} />

      {/* Teacher routes */}
      <Route path="/teacher/dashboard" component={() => <TeacherRoute component={TeacherDashboard} />} />
      <Route path="/teacher/classes" component={() => <TeacherRoute component={TeacherClasses} />} />
      <Route path="/teacher/attendance" component={() => <TeacherRoute component={TeacherAttendance} />} />
      <Route path="/teacher/assignments" component={() => <TeacherRoute component={TeacherAssignments} />} />
      <Route path="/teacher/materials" component={() => <TeacherRoute component={TeacherMaterials} />} />
      <Route path="/teacher/syllabus" component={() => <TeacherRoute component={TeacherSyllabus} />} />
      <Route path="/teacher/quizzes" component={() => <TeacherRoute component={TeacherQuizzes} />} />
      <Route path="/teacher/marks" component={() => <TeacherRoute component={TeacherMarks} />} />
      <Route path="/teacher/timetable" component={() => <TeacherRoute component={TeacherTimetable} />} />
      <Route path="/teacher/messages" component={() => <TeacherRoute component={TeacherMessages} />} />
      <Route path="/teacher/ai-assistant" component={() => <TeacherRoute component={TeacherAIAssistant} />} />
      <Route path="/teacher" component={() => <TeacherRoute component={TeacherDashboard} />} />

      {/* Principal routes */}
      <Route path="/principal/dashboard" component={() => <PrincipalRoute component={PrincipalDashboard} />} />
      <Route path="/principal/analytics" component={() => <PrincipalRoute component={PrincipalAnalytics} />} />
      <Route path="/principal/students" component={() => <PrincipalRoute component={PrincipalStudentAnalysis} />} />
      <Route path="/principal/academics" component={() => <PrincipalRoute component={PrincipalAcademicAnalysis} />} />
      <Route path="/principal/attendance" component={() => <PrincipalRoute component={PrincipalAttendanceAnalysis} />} />
      <Route path="/principal/reports" component={() => <PrincipalRoute component={PrincipalReports} />} />
      <Route path="/principal/advisor" component={() => <PrincipalRoute component={PrincipalAdvisor} />} />
      <Route path="/principal/meetings" component={() => <PrincipalRoute component={PrincipalMeetings} />} />
      <Route path="/principal/messages" component={() => <PrincipalRoute component={PrincipalMessages} />} />
      <Route path="/principal" component={() => <PrincipalRoute component={PrincipalDashboard} />} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DataProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </DataProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
