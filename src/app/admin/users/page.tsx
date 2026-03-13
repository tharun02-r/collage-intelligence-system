"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Users, Search, MoreVertical, Edit, Trash2, PowerOff } from "lucide-react";

const MOCK_USERS = [
  { id: "S-10492", name: "Liam O'Connor", role: "student", email: "liam.o@campus.edu", status: "Active" },
  { id: "S-18331", name: "Priya Patel", role: "student", email: "priya.p@campus.edu", status: "Active" },
  { id: "F-8810", name: "Dr. Indiana Jones", role: "faculty", email: "ijones@campus.edu", status: "Active" },
  { id: "C-2041", name: "Sarah Jenkins", role: "counselor", email: "sarah.j@campus.edu", status: "Active" },
  { id: "S-9922", name: "John Doe", role: "student", email: "j.doe@campus.edu", status: "Suspended" },
];

export default function UserDirectory() {
  return (
    <MainLayout role="admin">
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-semibold text-white tracking-tight flex items-center gap-3">
              User Directory <Badge variant="info">Global</Badge>
            </h1>
            <p className="text-slate-400 mt-1">Manage all accounts across the Central Authentication System.</p>
          </div>
          <button className="bg-accent-teal hover:bg-teal-400 text-slate-900 font-bold py-2 px-6 rounded-xl text-sm transition-colors shadow-lg shadow-accent-teal/20">
             + Provision New Account
          </button>
        </div>

        <Card>
           <div className="mb-6 relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type="text" placeholder="Search by name, ID, or email..." className="w-full bg-surface-dark border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-accent-teal/50" />
           </div>

           <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-y border-white/5 bg-surface-darker/50 text-xs font-medium uppercase tracking-wider text-slate-500">
                       <th className="px-4 py-3">User</th>
                       <th className="px-4 py-3">Campus ID</th>
                       <th className="px-4 py-3">Role Partition</th>
                       <th className="px-4 py-3">Status</th>
                       <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5 text-sm">
                    {MOCK_USERS.map(user => (
                       <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-4 py-4">
                             <div className="font-semibold text-white">{user.name}</div>
                             <div className="text-xs text-slate-500 mt-0.5">{user.email}</div>
                          </td>
                          <td className="px-4 py-4 font-mono text-xs text-slate-300">{user.id}</td>
                          <td className="px-4 py-4">
                             <span className="capitalize text-slate-300 border border-white/10 bg-surface-darker px-2 py-1 rounded text-xs">
                               {user.role}
                             </span>
                          </td>
                          <td className="px-4 py-4">
                             <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-accent-teal shadow-[0_0_8px_rgba(20,241,217,0.6)]' : 'bg-slate-600'}`} />
                                <span className={user.status === 'Active' ? 'text-white' : 'text-slate-500'}>{user.status}</span>
                             </div>
                          </td>
                          <td className="px-4 py-4 text-right">
                             <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                <button className="p-1.5 text-slate-400 hover:text-white bg-surface-darker hover:bg-white/10 rounded border border-white/5" title="Edit User">
                                   <Edit className="w-4 h-4" />
                                </button>
                                <button className="p-1.5 text-alert-warning hover:text-white bg-surface-darker hover:bg-alert-warning/20 rounded border border-alert-warning/20" title="Suspend Account">
                                   <PowerOff className="w-4 h-4" />
                                </button>
                                <button className="p-1.5 text-alert-critical hover:text-white bg-surface-darker hover:bg-alert-critical/20 rounded border border-alert-critical/20" title="Delete User">
                                   <Trash2 className="w-4 h-4" />
                                </button>
                             </div>
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
