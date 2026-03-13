"use client";

import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Activity, Calendar, Heart, Award, ArrowUpRight, ArrowDownRight, PhoneCall, BookHeart, ShieldCheck } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { motion } from "framer-motion";

const wellnessData = [
  { day: "Mon", score: 72 },
  { day: "Tue", score: 68 },
  { day: "Wed", score: 75 },
  { day: "Thu", score: 82 },
  { day: "Fri", score: 85 },
  { day: "Sat", score: 88 },
  { day: "Sun", score: 91 },
];

export default function StudentDashboard() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-semibold text-white tracking-tight">Academic Overview</h1>
          <p className="text-slate-400 mt-1">Hello Alex. Here is your academic performance and wellness summary.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-accent-teal hover:bg-teal-500 text-white px-4 py-2 rounded-xl transition-colors font-medium flex items-center gap-2 shadow-lg shadow-teal-500/20">
            <Heart className="w-4 h-4" /> Daily Check-in
          </button>
        </div>
      </div>

      {/* KPI Stats Row (Academic Focus) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Overall CGPA</p>
              <h4 className="text-3xl font-bold text-white mt-2">3.84<span className="text-lg text-slate-500">/4.0</span></h4>
            </div>
            <div className="w-10 h-10 rounded-full bg-accent-teal/10 flex items-center justify-center">
              <Award className="w-5 h-5 text-accent-teal" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-accent-teal text-sm font-medium">
            <ArrowUpRight className="w-4 h-4" /> Top 15% of Class
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Next Deadline</p>
              <h4 className="text-2xl font-bold text-white mt-2">Friday</h4>
            </div>
            <div className="w-10 h-10 rounded-full bg-accent-purple/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-accent-purple" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-slate-400 text-sm">
             Data Structures Project
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Wellness Score</p>
              <h4 className="text-3xl font-bold text-white mt-2">85<span className="text-lg text-slate-500">/100</span></h4>
            </div>
            <div className="w-10 h-10 rounded-full bg-alert-normal/10 flex items-center justify-center border border-alert-normal/20">
              <Activity className="w-5 h-5 text-alert-normal" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-alert-normal text-sm font-medium">
             <ArrowUpRight className="w-4 h-4" /> +12% from last week
          </div>
        </Card>

        <Card className="border-alert-warning/30 bg-alert-warning/5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-alert-warning uppercase tracking-wider">Current Stress</p>
              <h4 className="text-2xl font-bold text-white mt-2 border-b border-alert-warning/30 border-dashed pb-1">Elevated</h4>
            </div>
            <div className="w-10 h-10 rounded-full bg-alert-warning/20 flex items-center justify-center">
              <div className="w-2 h-2 bg-alert-warning rounded-full animate-ping" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-alert-warning text-sm">
             <Badge variant="warning" className="bg-transparent border-alert-warning/50">Midterms approaching</Badge>
          </div>
        </Card>
      </div>

      {/* Academic Snapshot Moved to Top */}
      <Card>
         <CardHeader 
            title="Academic Performance Snapshot" 
            subtitle="Latest grades and upcoming assignments for the current semester."
            action={<Badge variant="normal" className="bg-white/10 text-white font-mono text-sm">CGPA: 3.84</Badge>}
         />
         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
            <div className="bg-surface-dark/50 p-4 rounded-xl border border-white/5 flex flex-col justify-between hover:bg-white/5 transition-colors">
               <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-medium text-white">Advanced Calculus</h4>
                  <span className="text-accent-teal font-bold bg-accent-teal/10 px-2.5 py-1 rounded text-xs border border-accent-teal/20">A-</span>
               </div>
               <p className="text-xs text-slate-400 mt-2 flex justify-between">
                  <span>Midterm: 88%</span>
                  <span className="text-alert-warning font-medium">Exam in 4d</span>
               </p>
            </div>
            
            <div className="bg-surface-dark/50 p-4 rounded-xl border border-white/5 flex flex-col justify-between hover:bg-white/5 transition-colors">
               <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-medium text-white">Quantum Physics</h4>
                  <span className="text-blue-500 font-bold bg-blue-500/10 px-2.5 py-1 rounded text-xs border border-blue-500/20">B+</span>
               </div>
               <p className="text-xs text-slate-400 mt-2 flex justify-between">
                  <span>Midterm: 78%</span>
                  <span>Project: 90%</span>
               </p>
            </div>

            <div className="bg-surface-dark/50 p-4 rounded-xl border border-white/5 flex flex-col justify-between hover:bg-white/5 transition-colors">
               <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-medium text-white">Data Structures</h4>
                  <span className="text-accent-purple font-bold bg-accent-purple/10 px-2.5 py-1 rounded text-xs border border-accent-purple/20">A</span>
               </div>
               <p className="text-xs text-slate-400 mt-2 flex justify-between">
                  <span>Midterm: 94%</span>
                  <span className="text-emerald-500 font-medium whitespace-nowrap">Due: Friday</span>
               </p>
            </div>
         </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
           <Card className="h-96">
             <CardHeader 
                title="7-Day Wellness Trajectory" 
                subtitle="Composite score based on sleep, mood, and activity."
                action={<Badge variant="info">Visible to: Counselor</Badge>}
             />
             <div className="h-72 mt-4 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={wellnessData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0D9488" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0D9488" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 10', 'dataMax + 10']} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', borderColor: '#ffffff20', borderRadius: '12px' }}
                      itemStyle={{ color: '#0D9488' }}
                    />
                    <Area type="monotone" dataKey="score" stroke="#0D9488" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                    {/* Live indicator dot at the end */}
                    <motion.circle 
                       cx="98%" cy="20%" r="5" fill="#0D9488" 
                       className="shadow-[0_0_10px_#0D9488]"
                       animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
           </Card>
        </div>

        {/* Resources & Quick Actions */}
        <div className="space-y-6">
           <Card>
             <CardHeader title="Crisis Resources" subtitle="Always confidential" />
             <div className="space-y-3 mt-4">
                <button className="w-full flex items-center justify-between p-3 rounded-xl bg-surface-darker hover:bg-white/5 border border-white/5 transition-colors group">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-alert-critical/10 rounded-lg text-alert-critical group-hover:bg-alert-critical group-hover:text-white transition-colors">
                         <PhoneCall className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                         <div className="text-sm font-medium text-white">Campus Crisis Line</div>
                         <div className="text-xs text-slate-400">24/7 immediate support</div>
                      </div>
                   </div>
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl bg-surface-darker hover:bg-white/5 border border-white/5 transition-colors group">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-accent-teal/10 rounded-lg text-accent-teal group-hover:bg-accent-teal group-hover:text-white transition-colors">
                         <BookHeart className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                         <div className="text-sm font-medium text-white">Peer Guardian Match</div>
                         <div className="text-xs text-slate-400">Anonymous peer support</div>
                      </div>
                   </div>
                </button>
             </div>
           </Card>

           <Card className="bg-gradient-to-br from-accent-purple/20 to-surface-dark border-accent-purple/30">
              <div className="flex items-center gap-3 mb-3">
                 <Award className="w-6 h-6 text-accent-purple" />
                 <h3 className="font-heading font-semibold text-white">Post-Crisis Recovery</h3>
              </div>
              <p className="text-sm text-slate-300 mb-4">You've completed 5 consecutive days of sleep tracking and mood check-ins. Keep building the habit!</p>
              
              <div className="space-y-3 mt-4 mb-4">
                 <div className="flex items-center gap-2 text-sm text-white">
                    <div className="w-4 h-4 rounded-full bg-accent-teal flex items-center justify-center text-black text-[10px]">&check;</div>
                    Attended Math 101
                 </div>
                 <div className="flex items-center gap-2 text-sm text-white">
                    <div className="w-4 h-4 rounded-full bg-accent-teal flex items-center justify-center text-black text-[10px]">&check;</div>
                    Counseling Session Complete
                 </div>
                 <div className="flex items-center gap-2 text-sm text-slate-400">
                    <div className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center"></div>
                    Attend Coding Club (Tomorrow)
                 </div>
              </div>

              <div className="w-full bg-surface-darker rounded-full h-1.5 mb-2 overflow-hidden mt-4">
                <div className="bg-accent-purple h-1.5 rounded-full w-[70%]" />
              </div>
              <p className="text-xs text-right text-accent-purple font-medium">70% Milestone</p>
           </Card>

           {/* Family Bridge Alert Concept */}
           <Card className="border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3">
                 <div className="w-8 h-4 bg-accent-teal/20 rounded-full relative cursor-pointer group-hover:bg-accent-teal/30 transition-colors">
                    <div className="w-4 h-4 bg-accent-teal rounded-full absolute right-0 shadow" />
                 </div>
              </div>
              <CardHeader title="Family Bridge Alert" subtitle="Opt-in risk sharing" />
              <p className="text-xs text-slate-400 mt-2 mb-3 pr-8">
                 If your wellness score drops critically, we will automatically text your designated contact.
              </p>
              <div className="bg-surface-darker rounded-xl p-3 border border-white/5">
                 <p className="text-[11px] text-slate-300 italic font-mono">
                   "Your child may benefit from a conversation today — Campus Wellness Team."
                 </p>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-accent-teal font-medium">
                 <span>Active Contact: Mom</span>
                 <ShieldCheck className="w-4 h-4" />
              </div>
           </Card>

         </div>
      </div>
    </div>
  );
}
