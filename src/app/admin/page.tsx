"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ShieldAlert, Activity, Zap, Users, TrendingUp, Search, MoreHorizontal, UserCheck, ShieldCheck, Database, Server, Loader2, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [risks, setRisks] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/api/users').then(res => res.json()),
      fetch('http://localhost:5000/api/analytics/risk').then(res => res.json()),
      fetch('http://localhost:5000/api/analytics/resources').then(res => res.json())
    ])
    .then(([usersData, riskData, resourceData]) => {
      setUsers(usersData);
      setRisks(riskData);
      
      // Process resource data for chart
      const chartData = resourceData
        .filter((r: any) => r.type === 'Electricity' && r.building.includes('Block'))
        .slice(0, 7)
        .reverse()
        .map((r: any) => ({
          name: new Date(r.timestamp).toLocaleDateString('en-US', { weekday: 'short' }),
          electricity: Math.round(r.value)
        }));
      setResources(chartData);

      setLoading(false);
    })
    .catch(err => {
      console.error("Failed to fetch analytics:", err);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-semibold text-white tracking-tight flex items-center gap-3">
          Executive Command Center <Badge variant="purple">Full Access</Badge>
        </h1>
        <p className="text-slate-400 mt-1">Superuser privilege: Complete oversight of all campus users, resources, and AI pipeline health.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
           <div className="flex justify-between items-start">
             <div>
               <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Campus Risk Index</p>
               <h4 className="text-3xl font-bold text-white mt-2">28<span className="text-lg text-slate-500">/100</span></h4>
             </div>
             <div className="w-10 h-10 rounded-full bg-accent-teal/10 flex items-center justify-center">
               <Activity className="w-5 h-5 text-accent-teal" />
             </div>
           </div>
           <p className="text-sm mt-4 text-accent-teal font-medium flex items-center gap-1"><TrendingUp className="w-4 h-4" /> Improved by 5%</p>
        </Card>

        <Card className="border-alert-critical/30 bg-alert-critical/5">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-xs font-medium text-alert-critical uppercase tracking-wider">Active Crises</p>
               <h4 className="text-3xl font-bold text-white mt-2">1</h4>
             </div>
             <div className="w-10 h-10 rounded-full bg-alert-critical/20 flex items-center justify-center">
               <ShieldAlert className="w-5 h-5 text-alert-critical" />
             </div>
           </div>
           <p className="text-sm mt-4 text-alert-critical">Escalated to local authorities</p>
        </Card>

        <Card>
           <div className="flex justify-between items-start">
             <div>
               <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Energy Saved</p>
               <h4 className="text-3xl font-bold text-white mt-2">1.2<span className="text-lg text-slate-500">mWh</span></h4>
             </div>
             <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
               <Zap className="w-5 h-5 text-yellow-500" />
             </div>
           </div>
           <p className="text-sm mt-4 text-slate-400">This month via IoT shutoffs</p>
        </Card>

        <Card>
           <div className="flex justify-between items-start">
             <div>
               <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Counselor Util.</p>
               <h4 className="text-3xl font-bold text-white mt-2">84%</h4>
             </div>
             <div className="w-10 h-10 rounded-full bg-accent-purple/10 flex items-center justify-center">
               <Users className="w-5 h-5 text-accent-purple" />
             </div>
           </div>
           <p className="text-sm mt-4 text-slate-400">Peak hours: 2pm - 5pm</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Global User Directory */}
         <Card className="lg:col-span-2 overflow-hidden flex flex-col">
            <CardHeader title="Global User Directory" subtitle="Manage all authenticated entities on CampusGuard" />
            <div className="flex justify-between items-center px-4 mt-2">
               <div className="relative w-64">
                 <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                 <input type="text" placeholder="Search ID or Name..." className="w-full bg-surface-dark border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-sm text-white focus:outline-none focus:border-accent-purple/50" />
               </div>
               <Badge variant="normal" className="bg-white/5 text-slate-300">Total: {loading ? '...' : users.length}</Badge>
            </div>
            <div className="mt-4 flex-1 overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="border-y border-white/5 bg-surface-darker/50 text-xs uppercase tracking-wider text-slate-500">
                        <th className="px-4 py-3 font-medium">ID / Name</th>
                        <th className="px-4 py-3 font-medium">Role</th>
                        <th className="px-4 py-3 font-medium">Hostel Allocation</th>
                        <th className="px-4 py-3 font-medium">Auth / Pass</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                     {loading ? (
                       <tr>
                         <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                           <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2 text-accent-teal" />
                           Fetching Live Directory...
                         </td>
                       </tr>
                     ) : users.length === 0 ? (
                       <tr>
                         <td colSpan={6} className="px-4 py-4 text-center text-slate-500">No users found.</td>
                       </tr>
                     ) : users.map((user, i) => (
                        <tr key={user.id || i} className="hover:bg-white/[0.02] transition-colors group">
                           <td className="px-4 py-3">
                              <div className="font-medium text-white">{user.name}</div>
                              <div className="text-xs text-slate-500 font-mono">{user.id}</div>
                           </td>
                           <td className="px-4 py-3">
                              <span className="text-xs capitalize text-slate-300 bg-surface-darker px-2 py-1 rounded-md border border-white/5">{user.role}</span>
                           </td>
                           <td className="px-4 py-3">
                              <span className="text-xs text-slate-400 font-mono">{user.room}</span>
                           </td>
                           <td className="px-4 py-3">
                              <div className="text-xs font-mono text-slate-500 flex items-center gap-2">
                                <ShieldCheck className="w-3.5 h-3.5 text-accent-teal/50" /> ••••••••
                              </div>
                           </td>
                           <td className="px-4 py-3">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                 user.status === 'Active' ? 'text-accent-teal bg-accent-teal/10' :
                                 user.status === 'Away' ? 'text-amber-500 bg-amber-500/10' :
                                 user.status === 'Flagged' ? 'text-alert-warning bg-alert-warning/10' :
                                 'text-slate-400 bg-white/5'
                              }`}>
                                 {user.status}
                              </span>
                           </td>
                           <td className="px-4 py-3 text-right">
                              <button className="text-slate-500 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10">
                                 <MoreHorizontal className="w-4 h-4" />
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </Card>

         <div className="space-y-6">
            <Card>
               <div className="flex justify-between items-center mb-4">
                  <div>
                     <h3 className="font-heading font-semibold text-white">System Health & Auth DB</h3>
                     <p className="text-xs text-slate-400">Live operational status</p>
                  </div>
                  <Badge variant="purple" className="animate-pulse">Optimal</Badge>
               </div>
               
               <div className="grid grid-cols-2 gap-3 mb-6">
                 <div className="bg-surface-darker border border-emerald-500/20 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                    <Database className="w-5 h-5 text-emerald-500 mb-1" />
                    <span className="text-xs text-slate-400">PostgreSQL Cloud</span>
                    <span className="text-sm font-bold text-emerald-500">99.9% Uptime</span>
                 </div>
                 <div className="bg-surface-darker border border-accent-teal/20 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                    <Server className="w-5 h-5 text-accent-teal mb-1" />
                    <span className="text-xs text-slate-400">LSTM Microservices</span>
                    <span className="text-sm font-bold text-accent-teal">12ms Latency</span>
                 </div>
               </div>

               <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Live Access Logs</h4>
               <div className="space-y-2">
                 <div className="p-3 bg-surface-darker/50 border border-white/5 rounded-lg flex justify-between text-sm items-center">
                    <div className="flex items-center gap-2">
                       <UserCheck className="w-3.5 h-3.5 text-accent-teal" />
                       <span className="text-slate-300 text-xs">Dr. Chen <span className="text-slate-500 font-mono text-[10px]">F-8810</span></span>
                    </div>
                    <span className="text-emerald-500 text-[10px] uppercase font-bold tracking-wider">Auth Success</span>
                 </div>
                 <div className="p-3 bg-surface-darker/50 border border-white/5 rounded-lg flex justify-between text-sm items-center">
                    <div className="flex items-center gap-2">
                       <ShieldAlert className="w-3.5 h-3.5 text-alert-warning" />
                       <span className="text-slate-300 text-xs">Unknown <span className="text-slate-500 font-mono text-[10px]">IP: 192.168.1.5</span></span>
                    </div>
                    <span className="text-alert-warning text-[10px] uppercase font-bold tracking-wider">Auth Failed</span>
                 </div>
                 <div className="p-3 bg-surface-darker/50 border border-white/5 rounded-lg flex justify-between text-sm items-center">
                    <div className="flex items-center gap-2">
                       <UserCheck className="w-3.5 h-3.5 text-accent-purple" />
                       <span className="text-slate-300 text-xs">P. Sharma <span className="text-slate-500 font-mono text-[10px]">C-992</span></span>
                    </div>
                    <span className="text-emerald-500 text-[10px] uppercase font-bold tracking-wider">Auth Success</span>
                 </div>
               </div>
            </Card>

            {/* Predictive Dropout / High Risk Alerts */}
            <Card className="border-alert-critical/30">
               <CardHeader title="High-Risk Intervention Required" subtitle="AI marked students with probability > 75% for dropout/crisis." action={<Badge variant="critical">{risks.filter(r => r.score > 75).length} Alerts</Badge>}/>
               <div className="mt-4 space-y-3">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto text-alert-critical" /> : risks.filter(r => r.score > 75).slice(0, 3).map((r, i) => (
                    <div key={i} className="flex items-start gap-3 bg-alert-critical/10 border border-alert-critical/20 p-3 rounded-xl">
                      <div className="mt-1"><AlertTriangle className="w-4 h-4 text-alert-critical animate-pulse" /></div>
                      <div>
                        <div className="text-sm font-semibold text-white">{r.name} <span className="text-slate-500 font-mono text-xs font-normal">({r.id})</span></div>
                        <div className="text-xs text-alert-critical/80 mt-1">Risk Score: {Math.round(r.score)}% | Action: {r.intervention}</div>
                      </div>
                    </div>
                  ))}
                  {risks.filter(r => r.score > 75).length === 0 && !loading && (
                    <div className="text-sm text-slate-500 text-center py-4">No critical AI alerts at this time.</div>
                  )}
               </div>
            </Card>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resource Analytics */}
        <Card className="h-96">
           <CardHeader title="Campus Resource Consumption" subtitle="7-Day Electricity Usage Tracking (Hostels)" />
           <div className="h-72 mt-4 relative">
              {loading ? <div className="absolute inset-0 flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-yellow-500" /></div> : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={resources} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{fill: '#ffffff05'}} contentStyle={{ backgroundColor: '#1F2937', borderColor: '#ffffff20', borderRadius: '12px' }} />
                  <Bar dataKey="electricity" fill="#eab308" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              )}
           </div>
        </Card>

        {/* Global Student Drop-out Risk Heatmap Map (Conceptualized as a Trend Line) */}
        <Card className="h-96">
           <CardHeader title="Population Risk Distribution" subtitle="Normalized student risk score density across cohorts." action={<Badge variant="info">LSTM Model</Badge>}/>
           <div className="h-72 mt-4 relative">
              {loading ? <div className="absolute inset-0 flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-accent-purple" /></div> : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { range: '0-20', count: risks.filter(r => r.score <= 20).length },
                  { range: '21-40', count: risks.filter(r => r.score > 20 && r.score <= 40).length },
                  { range: '41-60', count: risks.filter(r => r.score > 40 && r.score <= 60).length },
                  { range: '61-80', count: risks.filter(r => r.score > 60 && r.score <= 80).length },
                  { range: '81-100', count: risks.filter(r => r.score > 80).length },
                ]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="range" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#ffffff20', borderRadius: '12px' }} />
                  <Line type="monotone" dataKey="count" stroke="#8b5cf6" strokeWidth={3} dot={{r: 4, fill: '#8b5cf6'}} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
              )}
           </div>
        </Card>
      </div>
    </div>
  );
}
