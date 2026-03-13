"use client";

import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Search, Filter, Calendar, FileText, CheckCircle2, Clock } from "lucide-react";
import { clsx } from "clsx";

const mockReports = [
  { id: "IR-2023-142", date: "Oct 24, 2023", studentId: "S-19042", flagType: "Academic Drop", actionTaken: "Nudged via CampusMind", status: "Resolved", priority: "low" },
  { id: "IR-2023-141", date: "Oct 23, 2023", studentId: "S-8821", flagType: "Suicide Ideation", actionTaken: "Emergency Session + Guardian Notified", status: "Monitoring", priority: "critical" },
  { id: "IR-2023-140", date: "Oct 21, 2023", studentId: "S-19222", flagType: "Sleep Anomaly", actionTaken: "Wellness Check-in", status: "Resolved", priority: "low" },
  { id: "IR-2023-139", date: "Oct 20, 2023", studentId: "S-10492", flagType: "Severe Anxiety", actionTaken: "Referred to Peer Network", status: "In Progress", priority: "medium" },
  { id: "IR-2023-138", date: "Oct 18, 2023", studentId: "S-18990", flagType: "Isolation", actionTaken: "Scheduled Counseling", status: "In Progress", priority: "medium" },
  { id: "IR-2023-137", date: "Oct 15, 2023", studentId: "S-17540", flagType: "MSRS Tier Escalation", actionTaken: "Faculty Consultation", status: "Resolved", priority: "low" },
];

export default function CounselorReportsPage() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
           <h1 className="text-2xl md:text-3xl font-heading font-semibold text-white tracking-tight flex items-center gap-3">
             Intervention Ledger
           </h1>
           <p className="text-slate-400 mt-1">Historical index of finalized crisis interventions and case statuses.</p>
         </div>
         <div className="flex gap-3">
           <button className="bg-surface-dark border border-white/10 hover:bg-white/5 text-white px-4 py-2 rounded-xl transition-colors font-medium flex items-center gap-2 text-sm shadow-lg shadow-black/20">
             <Calendar className="w-4 h-4 text-accent-purple" /> Export Monthly Report
           </button>
         </div>
       </div>

       <Card className="overflow-hidden flex flex-col min-h-[500px]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-white/5 gap-4">
             <div className="flex items-center gap-3 w-full sm:w-auto">
               <div className="relative flex-1 sm:w-80">
                 <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                 <input type="text" placeholder="Search report ID or student..." className="w-full bg-surface-dark border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-accent-teal/50" />
               </div>
               <button className="bg-surface-dark border border-white/10 hover:bg-white/5 text-slate-300 p-2 rounded-lg transition-colors shrink-0">
                  <Filter className="w-4 h-4" />
               </button>
             </div>
             
             <div className="flex gap-4 text-sm font-medium">
                <div className="flex items-center gap-2 text-slate-400">
                   <Clock className="w-4 h-4 text-alert-warning" /> 2 Active Cases
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                   <CheckCircle2 className="w-4 h-4 text-accent-teal" /> 14 Resolved (Oct)
                </div>
             </div>
          </div>
          
          <div className="flex-1 overflow-x-auto">
             <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                   <tr className="border-b border-white/5 bg-surface-darker/50 text-xs uppercase tracking-wider text-slate-500">
                      <th className="px-5 py-4 font-medium">Report ID / Date</th>
                      <th className="px-5 py-4 font-medium">Student ID</th>
                      <th className="px-5 py-4 font-medium">Trigger / Flag Type</th>
                      <th className="px-5 py-4 font-medium">Resolution Action</th>
                      <th className="px-5 py-4 font-medium text-right">Status</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                   {mockReports.map((report, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                         <td className="px-5 py-4">
                            <div className="font-medium text-white flex items-center gap-2">
                               <FileText className="w-3.5 h-3.5 text-accent-teal" /> {report.id}
                            </div>
                            <div className="text-xs text-slate-500 mt-1">{report.date}</div>
                         </td>
                         <td className="px-5 py-4 font-mono text-xs text-slate-300">{report.studentId}</td>
                         <td className="px-5 py-4">
                            <span className={clsx(
                               "px-2.5 py-1 rounded text-xs font-medium border",
                               report.priority === 'critical' ? "bg-alert-critical/10 text-alert-critical border-alert-critical/20" :
                               report.priority === 'medium' ? "bg-alert-warning/10 text-alert-warning border-alert-warning/20" :
                               "bg-slate-800 text-slate-300 border-white/5"
                            )}>
                               {report.flagType}
                            </span>
                         </td>
                         <td className="px-5 py-4 text-slate-300">{report.actionTaken}</td>
                         <td className="px-5 py-4 text-right">
                            <Badge variant={report.status === 'Resolved' ? 'normal' : report.status === 'Monitoring' ? 'critical' : 'warning'}>
                               {report.status}
                            </Badge>
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
