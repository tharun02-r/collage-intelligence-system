"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ShieldAlert, Users, TrendingDown, ArrowUpRight, ArrowDownRight, MoreVertical, Wifi, Activity, Loader2 } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { motion } from "framer-motion";
import Link from "next/link";

const riskTrendData = [
  { time: "08:00", highRisk: 2, medRisk: 15 },
  { time: "12:00", highRisk: 3, medRisk: 18 },
  { time: "16:00", highRisk: 3, medRisk: 22 },
  { time: "20:00", highRisk: 5, medRisk: 25 },
  { time: "00:00", highRisk: 8, medRisk: 30 },
  { time: "04:00", highRisk: 4, medRisk: 12 },
];

export default function CounselorDashboard() {
  const [risks, setRisks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/analytics/risk')
      .then(res => res.json())
      .then(data => {
        setRisks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch analytics:", err);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">

      {/* Blackout Period Protocol Banner */}
      <div className="bg-alert-warning/10 border border-alert-warning/30 rounded-xl p-4 flex items-start gap-4 animate-in fade-in slide-in-from-top-4">
         <div className="p-2 bg-alert-warning/20 rounded-lg shrink-0 mt-0.5">
            <ShieldAlert className="w-5 h-5 text-alert-warning" />
         </div>
         <div>
            <h3 className="text-white font-medium flex items-center gap-2">
               Blackout Period Protocol Active
               <Badge variant="warning" className="animate-pulse">Exam Week</Badge>
            </h3>
            <p className="text-sm text-slate-400 mt-1">
               System sensitivity is heightened. Automatic wellness check-ins are enabled for all students in the Medium and High Risk tiers. Responses are prioritized.
            </p>
         </div>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-semibold text-white tracking-tight flex items-center gap-3">
            Risk Monitor <Badge variant="critical" className="animate-pulse">3 ACTIVE ALERTS</Badge>
          </h1>
          <p className="text-slate-400 mt-1">Real-time MSRS evaluation for 428 students across 3 connected dorms.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-surface-dark border border-white/10 hover:bg-white/5 text-white px-4 py-2 rounded-xl transition-colors font-medium">
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-alert-critical/30 bg-alert-critical/5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-alert-critical uppercase tracking-wider">High Risk Tier</p>
              <h4 className="text-3xl font-bold text-white mt-2">
                {loading ? <Loader2 className="w-6 h-6 animate-spin text-alert-critical" /> : risks.filter(r => r.score > 75).length} 
                <span className="text-sm font-normal text-slate-400 ml-2">students</span>
              </h4>
            </div>
            <div className="w-10 h-10 rounded-full bg-alert-critical/20 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-alert-critical" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-alert-critical text-sm font-medium">
            <ArrowUpRight className="w-4 h-4" /> +2 since yesterday
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Avg Campus MSRS</p>
              <h4 className="text-3xl font-bold text-white mt-2">34<span className="text-lg text-slate-500">/100</span></h4>
            </div>
            <div className="w-10 h-10 rounded-full bg-accent-teal/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-accent-teal" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-alert-normal text-sm">
             <ArrowDownRight className="w-4 h-4" /> -4% WoW
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">CampusMind Queries</p>
              <h4 className="text-3xl font-bold text-white mt-2">1.2k</h4>
            </div>
            <div className="w-10 h-10 rounded-full bg-accent-purple/10 flex items-center justify-center">
               <div className="w-5 h-5 bg-accent-purple/50 rounded-full animate-ping absolute" />
               <Wifi className="w-5 h-5 text-accent-purple relative z-10" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-accent-teal text-sm">
             Live Streaming Active
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Intervention Success</p>
              <h4 className="text-3xl font-bold text-white mt-2">78%</h4>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-slate-300" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-slate-400 text-sm">
             Based on 30-day outcomes
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Alerts Queue */}
         <div className="lg:col-span-1 space-y-4">
           <h3 className="font-heading font-semibold text-white tracking-tight flex items-center justify-between">
              Flagged Alert Queue
              <span className="text-xs font-normal text-slate-400">Auto-triage active</span>
           </h3>
           
           <div className="space-y-3">
             {loading ? <Loader2 className="w-5 h-5 animate-spin text-accent-teal mx-auto mt-8" /> : risks.filter(r => r.score > 45).map((flag, idx) => (
                <div key={idx} className="bg-surface-dark border p-4 rounded-xl relative group transition-all hover:bg-surface-darker cursor-pointer"
                     style={{ borderColor: flag.score > 75 ? 'rgba(239, 68, 68, 0.3)' : 'rgba(245, 158, 11, 0.3)' }}>
                  
                  {flag.score > 75 && (
                     <div className="absolute top-0 left-0 w-1 h-full bg-alert-critical rounded-l-xl animate-pulse" />
                  )}

                  <div className="flex items-start justify-between mb-2">
                     <span className="text-white font-medium text-sm">{flag.name}</span>
                     <Badge variant={flag.score > 75 ? "critical" : "warning"}>{Math.round(flag.score)} MSRS</Badge>
                  </div>
                  
                  <p className="text-slate-300 text-sm mb-3">
                     {flag.intervention}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500">
                     <span>Current GPA: {Math.round(flag.gpa * 10) / 10}%</span>
                     <Link href={`/counselor/student/${flag.id}`} className="text-accent-teal hover:text-white transition-colors">Review Profile &rarr;</Link>
                  </div>
                </div>
             ))}
           </div>
        </div>

         {/* Peer Guardian Network (Mockup) */}
         <div className="lg:col-span-1 space-y-4">
            <h3 className="font-heading font-semibold text-white tracking-tight">Peer Guardian Network</h3>
            <Card className="border-accent-purple/30 bg-accent-purple/5">
                <CardHeader title="Active Matches" subtitle="Anonymous student-led wellness pairing" />
                <div className="mt-4 space-y-3">
                   <div className="p-3 bg-surface-darker rounded-xl border border-white/5">
                      <div className="flex justify-between text-sm text-white mb-2">
                         <span>Student #428 &rarr; Guardian #91</span>
                         <span className="text-accent-teal flex items-center gap-1.5"><Activity className="w-3.5 h-3.5"/> Pinged 2h ago</span>
                      </div>
                      <button className="w-full mt-2 bg-accent-purple/20 hover:bg-accent-purple/30 text-accent-purple/90 text-xs py-2 rounded-lg font-medium transition-colors">
                         Send conversation prompt
                      </button>
                   </div>
                   <div className="p-3 bg-surface-darker rounded-xl border border-white/5">
                      <div className="flex justify-between text-sm text-white mb-2">
                         <span>Student #892 &rarr; Guardian #14</span>
                         <span className="text-slate-500">Last check 3d ago</span>
                      </div>
                      <button className="w-full mt-2 bg-surface-dark border border-white/10 hover:bg-white/5 text-white/70 text-xs py-2 rounded-lg font-medium transition-colors">
                         Suggest coffee meetup
                      </button>
                   </div>
                </div>
            </Card>
         </div>

        {/* Behavioral Trends */}
        <div className="lg:col-span-2 space-y-6">
           <Card className="h-[380px] flex flex-col">
             <CardHeader 
                title="24H Campus Risk Forecast (AI-Predicted)" 
                subtitle="Aggregated anomalies across IoT, Wi-Fi, and AI check-ins."
             />
             <div className="flex-1 relative mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={riskTrendData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorMed" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', borderColor: '#ffffff20', borderRadius: '12px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="highRisk" stackId="1" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#colorHigh)" />
                    <Area type="monotone" dataKey="medRisk" stackId="1" stroke="#F59E0B" strokeWidth={2} fillOpacity={1} fill="url(#colorMed)" />
                  </AreaChart>
                </ResponsiveContainer>

                {/* Live Processing Overlay */}
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-surface-darker/80 backdrop-blur border border-white/10 px-3 py-1.5 rounded-full z-10">
                   <div className="w-2 h-2 bg-accent-teal rounded-full animate-ping" />
                   <span className="text-[10px] uppercase tracking-wider text-accent-teal font-medium">LSTM Pipeline Live</span>
                </div>
             </div>
           </Card>
        </div>

      </div>
    </div>
  );
}
