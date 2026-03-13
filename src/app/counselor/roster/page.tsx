"use client";

import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Search, Filter, ChevronRight, Activity, AlertTriangle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";

const mockStudents = [
  { id: "S-19042", name: "Alex Mercer", course: "Computer Science", wellness: 85, risk: "Low Risk", riskLevel: "normal", lastCheckIn: "2 hours ago" },
  { id: "S-18331", name: "Priya Patel", course: "Engineering", wellness: 72, risk: "Low Risk", riskLevel: "normal", lastCheckIn: "1 day ago" },
  { id: "S-19222", name: "Sarah Jenkins", course: "Mathematics", wellness: 54, risk: "Elevated Stress", riskLevel: "warning", lastCheckIn: "3 days ago" },
  { id: "S-8821", name: "Marcus Cole", course: "Physics", wellness: 31, risk: "High Risk (Dropout)", riskLevel: "critical", lastCheckIn: "4 days ago" },
  { id: "S-17540", name: "David Chen", course: "Biology", wellness: 68, risk: "Low Risk", riskLevel: "normal", lastCheckIn: "5 hours ago" },
  { id: "S-18990", name: "Emma Wilson", course: "Literature", wellness: 45, risk: "Moderate Risk", riskLevel: "warning", lastCheckIn: "2 days ago" },
  { id: "S-10492", name: "Liam O'Connor", course: "History", wellness: 28, risk: "Critical (SOS Active)", riskLevel: "critical", lastCheckIn: "10 mins ago" },
  { id: "S-19345", name: "Olivia Davis", course: "Chemistry", wellness: 91, risk: "Low Risk", riskLevel: "normal", lastCheckIn: "1 hour ago" },
];

export default function CounselorRosterPage() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
       <div>
         <h1 className="text-2xl md:text-3xl font-heading font-semibold text-white tracking-tight flex items-center gap-3">
           Student Roster Directory
         </h1>
         <p className="text-slate-400 mt-1">Comprehensive index of all students, live wellness aggregates, and AI risk strata.</p>
       </div>

       <Card className="overflow-hidden flex flex-col min-h-[500px]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-white/5 gap-4">
             <div className="flex items-center gap-3 w-full sm:w-auto">
               <div className="relative flex-1 sm:w-80">
                 <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                 <input type="text" placeholder="Search by name, ID, or course..." className="w-full bg-surface-dark border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-accent-teal/50" />
               </div>
               <button className="bg-surface-dark border border-white/10 hover:bg-white/5 text-slate-300 p-2 rounded-lg transition-colors shrink-0">
                  <Filter className="w-4 h-4" />
               </button>
             </div>
             <div className="flex gap-2 text-sm w-full sm:w-auto justify-between sm:justify-start">
                <Badge variant="critical">2 Critical</Badge>
                <Badge variant="warning">2 Elevated</Badge>
                <Badge variant="normal">4 Normal</Badge>
             </div>
          </div>
          
          <div className="flex-1 overflow-x-auto">
             <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                   <tr className="border-b border-white/5 bg-surface-darker/50 text-xs uppercase tracking-wider text-slate-500">
                      <th className="px-5 py-4 font-medium">Student Info</th>
                      <th className="px-5 py-4 font-medium">Course</th>
                      <th className="px-5 py-4 font-medium text-center">Wellness Score</th>
                      <th className="px-5 py-4 font-medium">MSRS Risk Tier</th>
                      <th className="px-5 py-4 font-medium">Last Interaction</th>
                      <th className="px-5 py-4 font-medium text-right">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                   {mockStudents.map((student, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                         <td className="px-5 py-4">
                            <div className="font-medium text-white">{student.name}</div>
                            <div className="text-xs text-slate-500 font-mono mt-0.5">{student.id}</div>
                         </td>
                         <td className="px-5 py-4 text-slate-300">{student.course}</td>
                         <td className="px-5 py-4">
                            <div className="flex items-center justify-center gap-2">
                               <div className="w-16 bg-surface-darker rounded-full h-1.5 overflow-hidden">
                                  <div 
                                     className={clsx(
                                        "h-1.5 rounded-full",
                                        student.wellness > 75 ? "bg-accent-teal" : student.wellness > 40 ? "bg-alert-warning" : "bg-alert-critical"
                                     )}
                                     style={{ width: `${student.wellness}%` }} 
                                  />
                               </div>
                               <span className="text-xs font-mono font-medium text-slate-300 w-6 text-right">{student.wellness}</span>
                            </div>
                         </td>
                         <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                               {student.riskLevel === 'normal' && <ShieldCheck className="w-4 h-4 text-accent-teal" />}
                               {student.riskLevel === 'warning' && <Activity className="w-4 h-4 text-alert-warning" />}
                               {student.riskLevel === 'critical' && <AlertTriangle className="w-4 h-4 text-alert-critical animate-pulse" />}
                               <span className={clsx(
                                  "text-xs font-medium",
                                  student.riskLevel === 'normal' ? 'text-accent-teal' : 
                                  student.riskLevel === 'warning' ? 'text-alert-warning' : 'text-alert-critical'
                               )}>
                                  {student.risk}
                               </span>
                            </div>
                         </td>
                         <td className="px-5 py-4 text-slate-400 text-xs">
                            {student.lastCheckIn}
                         </td>
                         <td className="px-5 py-4 text-right">
                            <Link 
                               href={`/counselor/student/${student.id}`}
                               className="inline-flex items-center justify-center bg-surface-dark hover:bg-white/10 border border-white/10 text-white rounded-lg p-2 transition-all opacity-0 group-hover:opacity-100"
                               title="View 7-D Profile"
                            >
                               <ChevronRight className="w-4 h-4 text-accent-teal" />
                            </Link>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </Card>
    </div>
  );
}
