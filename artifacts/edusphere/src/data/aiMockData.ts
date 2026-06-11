export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface AIInsight {
  id: string;
  title: string;
  summary: string;
  category: "academic" | "attendance" | "behavior" | "fees" | "general";
  severity: RiskLevel;
  action?: string;
}

export interface StudentAIAnalysis {
  studentId: string;
  name: string;
  class: string;
  riskScore: number;
  riskLevel: RiskLevel;
  strengths: string[];
  concerns: string[];
  recommendations: string[];
  predictedGpa: number;
  attendanceTrend: "improving" | "stable" | "declining";
}

export interface MonthlyAIReportSection {
  title: string;
  content: string;
  metrics?: { label: string; value: string; trend?: "up" | "down" | "stable" }[];
}

export interface MonthlyAIReport {
  month: string;
  year: number;
  generatedAt: string;
  overallScore: number;
  executiveSummary: string;
  sections: MonthlyAIReportSection[];
  laggingAreas: string[];
  topPerformers: string[];
  atRiskStudents: string[];
}

export const schoolWideInsights: AIInsight[] = [
  {
    id: "SW001",
    title: "Grade 5 Section B — Academic Dip",
    summary: "AI detected a 12% drop in Mathematics averages over the last 6 weeks. 4 students are scoring below 60%.",
    category: "academic",
    severity: "high",
    action: "Schedule remedial sessions and parent notifications for affected students.",
  },
  {
    id: "SW002",
    title: "Attendance Pattern Anomaly",
    summary: "Mondays show 8% lower attendance school-wide compared to other weekdays. Grade 3 is most affected.",
    category: "attendance",
    severity: "medium",
    action: "Investigate transport delays and send Monday morning reminders to parents.",
  },
  {
    id: "SW003",
    title: "Fee Collection Forecast",
    summary: "AI predicts 18% of outstanding fees may remain uncollected by month-end unless follow-up is initiated this week.",
    category: "fees",
    severity: "medium",
    action: "Trigger automated fee reminders to 15 families with overdue balances.",
  },
  {
    id: "SW004",
    title: "Science Department Strength",
    summary: "Grade 6 Science scores are 15% above district benchmark. Consider sharing best practices across grades.",
    category: "academic",
    severity: "low",
    action: "Document teaching methods from Dr. Diana Troy's classes.",
  },
  {
    id: "SW005",
    title: "Early Warning — 3 Critical Students",
    summary: "Combined attendance (<80%) and GPA (<3.0) flags 3 students for immediate intervention.",
    category: "behavior",
    severity: "critical",
    action: "Principal review meeting recommended within 48 hours.",
  },
];

export const studentAnalyses: StudentAIAnalysis[] = [
  {
    studentId: "S005",
    name: "Evan Wright",
    class: "Grade 5 B",
    riskScore: 78,
    riskLevel: "high",
    strengths: ["Strong in Physical Education", "Positive peer interactions"],
    concerns: ["Attendance at 82% — below school threshold", "Mathematics declining 3 consecutive assessments", "Homework completion rate 65%"],
    recommendations: ["Weekly check-in with class teacher", "Parent-teacher meeting within 2 weeks", "Assign peer study buddy for Mathematics"],
    predictedGpa: 2.9,
    attendanceTrend: "declining",
  },
  {
    studentId: "S009",
    name: "Ian Stone",
    class: "Grade 3 B",
    riskScore: 85,
    riskLevel: "critical",
    strengths: ["Creative in Art class", "Improving reading comprehension"],
    concerns: ["Attendance at 78% — critical level", "Low engagement in group activities", "Fee payment overdue"],
    recommendations: ["Immediate counselor referral", "Home visit coordination", "Fee payment plan discussion with parents"],
    predictedGpa: 2.8,
    attendanceTrend: "declining",
  },
  {
    studentId: "S002",
    name: "Bob Smith",
    class: "Grade 6 A",
    riskScore: 55,
    riskLevel: "medium",
    strengths: ["Consistent homework submission", "Good Science performance"],
    concerns: ["Fee payment overdue", "English scores below class average"],
    recommendations: ["English tutoring sessions", "Fee reminder to parents"],
    predictedGpa: 3.3,
    attendanceTrend: "stable",
  },
  {
    studentId: "S007",
    name: "George Miller",
    class: "Grade 4 B",
    riskScore: 48,
    riskLevel: "medium",
    strengths: ["Steady academic progress", "Active in sports"],
    concerns: ["Attendance dipped to 85% this month", "History subject needs attention"],
    recommendations: ["Monitor attendance for 2 more weeks", "Extra History worksheets"],
    predictedGpa: 3.2,
    attendanceTrend: "declining",
  },
  {
    studentId: "S001",
    name: "Alice Johnson",
    class: "Grade 6 A",
    riskScore: 12,
    riskLevel: "low",
    strengths: ["Top 15% of class", "Excellent attendance at 95%", "Strong across all subjects"],
    concerns: ["History could improve from B to A with focused effort"],
    recommendations: ["Consider advanced Mathematics enrichment", "Encourage leadership roles"],
    predictedGpa: 3.9,
    attendanceTrend: "stable",
  },
];

export const parentChildInsights: AIInsight[] = [
  {
    id: "PC001",
    title: "Strong Academic Trajectory",
    summary: "Alice is performing in the top 15% of Grade 6 A. Mathematics and Science are particular strengths with 92% and 88% respectively.",
    category: "academic",
    severity: "low",
  },
  {
    id: "PC002",
    title: "History — Room for Growth",
    summary: "AI analysis shows History scores (78%) are 7% below Alice's personal average. Focused revision on chapters 4-6 could close this gap within 3 weeks.",
    category: "academic",
    severity: "medium",
    action: "Recommended: 20 minutes daily History practice using study materials in the library portal.",
  },
  {
    id: "PC003",
    title: "Attendance Excellence",
    summary: "95% attendance places Alice in the top 10% of her class. Consistent presence correlates with her strong GPA of 3.8.",
    category: "attendance",
    severity: "low",
  },
  {
    id: "PC004",
    title: "Peer Learning Opportunity",
    summary: "AI suggests Alice could benefit from and contribute to a peer study group for History, boosting both confidence and scores.",
    category: "general",
    severity: "low",
    action: "Ask class teacher about study group availability.",
  },
];

export const monthlySchoolReport: MonthlyAIReport = {
  month: "November",
  year: 2023,
  generatedAt: "2023-11-30",
  overallScore: 82,
  executiveSummary:
    "November showed solid overall performance with an AI health score of 82/100. Academic outcomes remain strong in upper grades, but Grade 5 Section B and Grade 3 attendance require targeted intervention. Fee collection is on track at 87% but 15 families need follow-up.",
  sections: [
    {
      title: "Academic Performance",
      content:
        "School-wide GPA average is 3.6, up 0.1 from October. Mathematics in Grade 5 B declined 12% — flagged for remedial action. Science and PE departments exceed benchmarks.",
      metrics: [
        { label: "Avg GPA", value: "3.6", trend: "up" },
        { label: "Pass Rate", value: "94%", trend: "stable" },
        { label: "Top Subject", value: "Science", trend: "up" },
        { label: "Needs Attention", value: "Grade 5 Math", trend: "down" },
      ],
    },
    {
      title: "Attendance Analysis",
      content:
        "Overall attendance is 91.2%, slightly below the 93% target. Monday absences account for 35% of total missed days. Grade 3 B has the lowest attendance at 86%.",
      metrics: [
        { label: "School Average", value: "91.2%", trend: "down" },
        { label: "Best Class", value: "Grade 6 A", trend: "up" },
        { label: "Worst Day", value: "Monday", trend: "down" },
        { label: "Chronic Absentees", value: "3 students", trend: "stable" },
      ],
    },
    {
      title: "Financial Health",
      content:
        "Fee collection reached $59,000 this month (87% of target). 15 students have overdue balances totaling $12,450. AI predicts 82% collection by month-end without intervention.",
      metrics: [
        { label: "Collected", value: "$59,000", trend: "up" },
        { label: "Outstanding", value: "$12,450", trend: "down" },
        { label: "Collection Rate", value: "87%", trend: "stable" },
      ],
    },
    {
      title: "Staff & Operations",
      content:
        "All 6 class teachers are active. Substitute coverage was needed 2 days. Library utilization increased 20%. Transport route B reported 3 delays affecting punctuality.",
      metrics: [
        { label: "Teacher Attendance", value: "98%", trend: "stable" },
        { label: "Library Usage", value: "+20%", trend: "up" },
        { label: "Transport Issues", value: "3 incidents", trend: "down" },
      ],
    },
  ],
  laggingAreas: [
    "Grade 5 Section B — Mathematics performance",
    "Grade 3 Section B — Attendance (86%)",
    "Monday school-wide attendance pattern",
    "Fee collection for 15 overdue families",
    "History scores in Grade 6 A (class average)",
  ],
  topPerformers: ["Alice Johnson", "Diana Prince", "Charlie Brown", "Laura Croft", "Julia Roberts"],
  atRiskStudents: ["Ian Stone", "Evan Wright", "Bob Smith"],
};

export const monthlyParentReport: MonthlyAIReport = {
  month: "November",
  year: 2023,
  generatedAt: "2023-11-30",
  overallScore: 88,
  executiveSummary:
    "Alice had an excellent November with an AI wellness score of 88/100. She maintained strong attendance (95%), achieved 92% in Mid-Term Mathematics, and remains in the top 15% of her class. History is the one area where focused improvement could yield significant gains.",
  sections: [
    {
      title: "Academic Progress",
      content:
        "Alice scored an average of 87.6% across all Mid-Term subjects. Mathematics (92%) and PE (95%) are standout subjects. History (78%) is below her personal best and class top quartile.",
      metrics: [
        { label: "Mid-Term Avg", value: "87.6%", trend: "up" },
        { label: "GPA", value: "3.8", trend: "stable" },
        { label: "Class Rank", value: "Top 15%", trend: "up" },
        { label: "Weakest Subject", value: "History", trend: "down" },
      ],
    },
    {
      title: "Attendance & Engagement",
      content:
        "Present 19 of 20 school days in November. No unexplained absences. AI engagement score (based on assignment submission and participation patterns) is 92%.",
      metrics: [
        { label: "Days Present", value: "19/20", trend: "stable" },
        { label: "Engagement Score", value: "92%", trend: "up" },
      ],
    },
    {
      title: "Behavior & Wellbeing",
      content:
        "No disciplinary incidents reported. AI wellbeing indicators suggest a positive social environment. Recommended: maintain current study routine with added History focus.",
      metrics: [
        { label: "Incidents", value: "0", trend: "stable" },
        { label: "Wellbeing Score", value: "90/100", trend: "up" },
      ],
    },
  ],
  laggingAreas: ["History — 78% (7% below personal average)", "Chapter 4-6 History topics need revision"],
  topPerformers: ["Mathematics — 92%", "Physical Education — 95%", "Science — 88%"],
  atRiskStudents: [],
};

export const chatbotDummyReplies: Record<string, string[]> = {
  principal: [
    "Based on AI analysis, 3 students are currently flagged as at-risk. Ian Stone (Grade 3 B) requires immediate attention with 78% attendance and declining GPA.",
    "November's school health score is 82/100. The main lagging areas are Grade 5 B Mathematics and Monday attendance patterns.",
    "I recommend scheduling a remedial session for Grade 5 B Mathematics this week. AI predicts a 15% improvement within 4 weeks with intervention.",
    "Fee collection is at 87%. Sending reminders to 15 families with overdue balances could improve collection to 94% by month-end.",
    "Top performing students this month: Alice Johnson, Diana Prince, and Charlie Brown. Consider recognition at the next assembly.",
  ],
  parent: [
    "Alice is performing excellently with a 3.8 GPA and 95% attendance. She's in the top 15% of Grade 6 A.",
    "AI suggests focusing on History — Alice scored 78%, which is 7% below her average. Daily 20-minute practice on chapters 4-6 could help.",
    "Your child's Mid-Term Mathematics score of 92% is outstanding — 17% above the class average!",
    "No fee payments are overdue for Alice. Next tuition due date is November 1st (already paid).",
    "I recommend requesting a meeting with Mr. Arthur Pendragon to discuss advanced Mathematics enrichment opportunities for Alice.",
  ],
  student: [
    "Great job on your Mid-Term Mathematics — 92%! You're 17% above the class average.",
    "AI study tip: Your History score (78%) could improve with focused revision on chapters 4-6. Try 20 minutes daily this week.",
    "Your attendance is excellent at 95%. Keep it up — consistent attendance correlates with your strong GPA!",
    "You have 2 assignments due this week: Science project (Friday) and English essay (Thursday). Want me to help you plan your study schedule?",
    "Based on your performance, you're on track for a predicted GPA of 3.9 this term. History is your biggest opportunity for improvement.",
  ],
  admin: [
    "School overview: 12 active students, 6 teachers, 6 classes. Today's attendance is estimated at 92%.",
    "AI flagged 5 students for review: 2 critical, 2 high risk, 1 medium risk. Check the AI Insights dashboard for details.",
    "November fee collection: $59,000 collected, $12,450 outstanding from 15 students.",
    "Grade 5 B Mathematics needs attention — 12% score decline detected over 6 weeks.",
    "3 notices are active. Consider sending an AI-generated attendance reminder for Monday mornings.",
  ],
};

export const meetingAISuggestions = [
  {
    topic: "History Performance Review",
    reason: "AI detected Alice's History score (78%) is 7% below her personal average. A focused discussion with the English/History teacher could create an action plan.",
    suggestedTeacher: "Ms. Beatrice Prior",
    priority: "medium" as RiskLevel,
  },
  {
    topic: "Advanced Mathematics Enrichment",
    reason: "Alice's Mathematics score (92%) suggests readiness for advanced enrichment. Teacher consultation recommended.",
    suggestedTeacher: "Mr. Arthur Pendragon",
    priority: "low" as RiskLevel,
  },
  {
    topic: "Quarterly Progress Check",
    reason: "Regular AI-recommended check-in. Last meeting was 6 weeks ago with Ms. Beatrice Prior.",
    suggestedTeacher: "Mr. Arthur Pendragon",
    priority: "low" as RiskLevel,
  },
];
