"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { ShieldAlert, ChevronLeft, CalendarClock, Beaker, Wifi, BookOpen, UserMinus, FileText, HeartPulse, BrainCircuit, Play } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock 7-Dimension Risk Data
const riskData = [
  { subject: 'Academic', A: 85, fullMark: 100 },
  { subject: 'Social Isolation', A: 92, fullMark: 100 },
  { subject: 'Financial Stress', A: 40, fullMark: 100 },
  { subject: 'IoT Routine', A: 88, fullMark: 100 },
  { subject: 'MSRS Baseline', A: 75, fullMark: 100 },
  { subject: 'Chat Sentiment', A: 96, fullMark: 100 },
  { subject: 'Attendance', A: 60, fullMark: 100 },
];

export default function StudentRiskProfile() {
  const params = useParams();
  const studentId = params.id || "10492";

  return (
    <MainLayout role="counselor" alertCount={3}>
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
        
        {/* Header & Nav */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-white/5 pb-6">
          <div className="space-y-4">
            <Link href="/counselor" className="text-slate-400 hover:text-white flex items-center gap-1 text-sm font-medium transition-colors w-fit">
               <ChevronLeft className="w-4 h-4" /> Back to Risk Monitor
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-heading font-semibold text-white tracking-tight flex items-center gap-3">
                Student Profile: #{studentId} <Badge variant="critical" className="animate-pulse">Level 4 Crisis</Badge>
              </h1>
              <p className="text-slate-400 mt-1">Multi-Signal Risk Score: <span className="text-alert-critical font-bold">88.5</span> (Top 2% risk threshold)</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button className="bg-surface-dark border border-white/10 text-white font-semibold py-2 px-4 rounded-xl text-sm transition-colors hover:bg-white/5">
                Download Forensic Log
             </button>
             <button className="bg-alert-critical text-white font-semibold py-2 px-4 rounded-xl text-sm transition-colors shadow-lg shadow-alert-critical/20 hover:bg-red-600">
                Initiate Emergency Intercept
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           
           {/* 7-Dimension Spider Graph (D3/Recharts) */}
           <Card className="h-[450px]">
              <CardHeader title="7-Dimension Threat Surface" subtitle="Normalized risk vectors across all campus data silos" />
              <div className="w-full h-[350px] mt-4 relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={riskData}>
                       <PolarGrid stroke="#334155" />
                       <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                       <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                       <Tooltip 
                         contentStyle={{ backgroundColor: '#132040', borderColor: '#334155', color: '#fff', borderRadius: '8px' }}
                         itemStyle={{ color: '#0D9488' }}
                       />
                       <Radar name="Risk Score" dataKey="A" stroke="#EF4444" fill="#EF4444" fillOpacity={0.4} />
                    </RadarChart>
                 </ResponsiveContainer>
                 {/* Decorative target reticle */}
                 <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
                    <div className="w-4 h-4 border-2 border-alert-critical rounded-full animate-ping" />
                 </div>
              </div>
           </Card>

           {/* Behavioral Breadcrumb Trail */}
           <Card className="h-[450px] overflow-hidden flex flex-col">
              <CardHeader title="Forensic Breadcrumb Trail" subtitle="Automated behavioral chain leading to Level 4 Alert" />
              <div className="mt-6 flex-1 overflow-y-auto pr-2 space-y-0 relative">
                 {/* Vertical Timeline Line */}
                 <div className="absolute left-6 top-2 bottom-6 w-0.5 bg-white/5" />

                 {/* Timeline Items */}
                 <div className="relative pl-14 pb-6">
                    <div className="absolute left-4 top-1 w-5 h-5 rounded-full bg-surface-darker border-2 border-slate-500 flex items-center justify-center z-10">
                       <div className="w-1.5 h-1.5 bg-slate-500 rounded-full" />
                    </div>
                    <div className="bg-surface-darker border border-white/5 p-3 rounded-xl">
                       <p className="text-xs text-slate-400 font-mono mb-1">Thursday, 14:30</p>
                       <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-slate-400" /> Academic Checkpoint missed
                       </h4>
                       <p className="text-sm text-slate-300 mt-1">Failed to submit Midterm assignment in MATH-301.</p>
                    </div>
                 </div>

                 <div className="relative pl-14 pb-6">
                    <div className="absolute left-4 top-1 w-5 h-5 rounded-full bg-surface-darker border-2 border-yellow-500 flex items-center justify-center z-10">
                       <UserMinus className="w-3 h-3 text-yellow-500" />
                    </div>
                    <div className="bg-alert-warning/5 border border-alert-warning/20 p-3 rounded-xl">
                       <p className="text-xs text-slate-400 font-mono mb-1">Friday, 19:45</p>
                       <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                          <HeartPulse className="w-4 h-4 text-yellow-500" /> Social Isolation Detected
                       </h4>
                       <p className="text-sm text-slate-300 mt-1">MSRS tracked 0 interactions at the Mess Hub. Dinner skipped.</p>
                    </div>
                 </div>

                 <div className="relative pl-14 pb-6">
                    <div className="absolute left-4 top-1 w-5 h-5 rounded-full bg-surface-darker border-2 border-orange-500 flex items-center justify-center z-10">
                       <Wifi className="w-3 h-3 text-orange-500" />
                    </div>
                    <div className="bg-orange-500/5 border border-orange-500/20 p-3 rounded-xl">
                       <p className="text-xs text-slate-400 font-mono mb-1">Saturday, 03:15</p>
                       <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                          <CalendarClock className="w-4 h-4 text-orange-500" /> IoT Routine Broken
                       </h4>
                       <p className="text-sm text-slate-300 mt-1">High bandwidth late-night usage. Lights off, but persistent device activity tracking "Depression/Burnout" keywords on campus DNS.</p>
                    </div>
                 </div>

                 <div className="relative pl-14 pb-2">
                    <div className="absolute left-4 top-1 w-5 h-5 rounded-full bg-alert-critical flex items-center justify-center z-10 animate-pulse">
                       <ShieldAlert className="w-3 h-3 text-white" />
                    </div>
                    <div className="bg-alert-critical/10 border border-alert-critical/40 p-3 rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.15)]">
                       <p className="text-xs text-alert-critical font-mono mb-1">Today, 09:12</p>
                       <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Beaker className="w-4 h-4 text-alert-critical" /> Level 4 Synthesis Triggered
                       </h4>
                       <p className="text-sm text-slate-300 mt-1">Behavioral engine confirms high-risk trajectory. Intervention protocol mandated.</p>
                       <button className="mt-3 w-full bg-alert-critical hover:bg-red-600 text-white py-1.5 rounded-lg text-xs font-bold transition-colors">
                          Join Live Intercept Chat
                       </button>
                    </div>
                 </div>

              </div>
           </Card>
        </div>

        {/* Explainable AI with Smart Intervention Recommendations */}
        <div className="grid grid-cols-1 mt-6">
           <Card className="border-accent-purple/50 bg-accent-purple/5 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-64 h-64 bg-accent-purple/10 rounded-full blur-3xl" />
              <CardHeader 
                 title={
                    <span className="flex items-center gap-2 text-white">
                       <BrainCircuit className="w-5 h-5 text-accent-purple" /> 
                       Explainable AI & Smart Interventions
                    </span>
                 } 
                 subtitle="AI-driven contextual analysis and recommended actions based on historical + real-time markers" 
              />
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                 {/* Risk Level */}
                 <div className="bg-surface-dark border border-white/5 rounded-xl p-4 flex flex-col justify-center items-center text-center">
                    <p className="text-sm text-slate-400 font-medium mb-2 uppercase tracking-wide">Risk Level</p>
                    <Badge variant="critical" className="text-lg py-1 px-4 animate-pulse shadow-[0_0_15px_rgba(255,51,102,0.4)]">High Risk</Badge>
                 </div>
                 
                 {/* Reason */}
                 <div className="bg-surface-dark border border-white/5 rounded-xl p-4 flex flex-col justify-center">
                    <p className="text-sm text-slate-400 font-medium mb-2 uppercase tracking-wide flex items-center gap-2">
                       <FileText className="w-4 h-4" /> Principal Reason Matrix
                    </p>
                    <p className="text-sm text-white leading-relaxed">
                       <span className="text-alert-warning font-semibold">Attendance dropped by 30%</span> over the last 14 days, and <span className="text-alert-critical font-semibold">two failed subjects</span> detected in recent formative assessments (MATH-301, PHY-201).
                    </p>
                 </div>

                 {/* Suggested Action */}
                 <div className="bg-surface-dark border border-accent-teal/30 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                       <p className="text-sm text-accent-teal font-medium mb-2 uppercase tracking-wide flex items-center gap-2">
                          <Play className="w-4 h-4 fill-accent-teal" /> Suggested Actions
                       </p>
                       <ul className="space-y-2 text-sm text-white">
                          <li className="flex items-start gap-2">
                             <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-accent-teal flex-shrink-0" />
                             Schedule urgent 1-on-1 counseling session.
                          </li>
                          <li className="flex items-start gap-2">
                             <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-accent-teal flex-shrink-0" />
                             Assign dedicated academic mentor for MATH & PHY.
                          </li>
                       </ul>
                    </div>
                    <button className="mt-4 w-full bg-accent-teal/20 hover:bg-accent-teal/40 text-accent-teal border border-accent-teal/50 py-2 rounded-lg text-sm font-bold transition-colors">
                       Deploy Intervention Plan
                    </button>
                 </div>
              </div>
           </Card>
        </div>
      </div>
    </MainLayout>
  );
}
