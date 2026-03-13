"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Database, Filter, Search } from "lucide-react";

const MOCK_LOGS = [
  { id: "LOG-9921", time: "10:42:01", user: "admin_krishna", action: "UPDATED_SYSTEM_CONFIG", resource: "Firewall Rules", status: "Success" },
  { id: "LOG-9920", time: "10:35:12", user: "system_cron", action: "MSRS_RISK_CALC", resource: "All Students", status: "Success" },
  { id: "LOG-9919", time: "10:11:44", user: "counselor_sarah", action: "VIEW_STUDENT_PROFILE", resource: "Student S-10492", status: "Success" },
  { id: "LOG-9918", time: "09:44:02", user: "api_gateway", action: "FAILED_LOGIN_ATTEMPT", resource: "Auth Service", status: "Warning" },
  { id: "LOG-9917", time: "08:30:00", user: "faculty_dr_jones", action: "SUBMITTED_ATTENDANCE", resource: "MATH-301", status: "Success" },
  { id: "LOG-9916", time: "03:12:55", user: "SYSTEM", action: "DB_MAINTENANCE", resource: "Supabase PG", status: "Failed" },
];

export default function AuditLogs() {
  return (
    <MainLayout role="admin">
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-semibold text-white tracking-tight flex items-center gap-3">
            System Audit Logs <Badge variant="info">Immutable</Badge>
          </h1>
          <p className="text-slate-400 mt-1">Review all configuration changes, data access events, and system anomalies.</p>
        </div>

        <Card className="flex flex-col gap-4">
           {/* Filters */}
           <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-surface-darker/50 border border-white/5 rounded-xl">
              <div className="flex items-center gap-3 w-full md:w-auto">
                 <div className="relative w-full md:w-64">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input type="text" placeholder="Search logs..." className="w-full bg-surface-dark border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-accent-teal/50" />
                 </div>
                 <button className="bg-surface-dark border border-white/10 p-2 rounded-lg text-slate-400 hover:text-white transition-colors">
                    <Filter className="w-4 h-4" />
                 </button>
              </div>
              <div className="flex gap-2">
                 <select className="bg-surface-dark border border-white/10 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-accent-purple/50">
                    <option>All Events</option>
                    <option>Security Events</option>
                    <option>Data Access</option>
                    <option>System Errors</option>
                 </select>
              </div>
           </div>

           {/* Table */}
           <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-y border-white/5 text-xs font-medium uppercase tracking-wider text-slate-500">
                       <th className="px-4 py-3">Log ID</th>
                       <th className="px-4 py-3">Timestamp (Today)</th>
                       <th className="px-4 py-3">Actor</th>
                       <th className="px-4 py-3">Action</th>
                       <th className="px-4 py-3">Resource</th>
                       <th className="px-4 py-3">Status</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5 text-sm">
                    {MOCK_LOGS.map(log => (
                       <tr key={log.id} className="hover:bg-white/[0.02] bg-surface-darker/20 transition-colors">
                          <td className="px-4 py-3 font-mono text-xs text-slate-400">{log.id}</td>
                          <td className="px-4 py-3 text-slate-300">{log.time}</td>
                          <td className="px-4 py-3 text-accent-purple font-mono text-xs">{log.user}</td>
                          <td className="px-4 py-3 font-medium text-slate-200">{log.action}</td>
                          <td className="px-4 py-3 text-slate-400">{log.resource}</td>
                          <td className="px-4 py-3">
                             <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                                log.status === 'Success' ? 'bg-accent-teal/10 text-accent-teal' :
                                log.status === 'Warning' ? 'bg-alert-warning/10 text-alert-warning' :
                                'bg-alert-critical/10 text-alert-critical animate-pulse'
                             }`}>
                                {log.status}
                             </span>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </Card>
      </div>
    </MainLayout>
  );
}
