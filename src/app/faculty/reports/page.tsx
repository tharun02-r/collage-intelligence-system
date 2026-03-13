"use client";

import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { BrainCircuit, Download, FileText, TrendingDown, TrendingUp, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const mSRSRiskTrendData = [
  { week: 'W1', gpa: 3.2, risk: 10 },
  { week: 'W2', gpa: 3.1, risk: 15 },
  { week: 'W3', gpa: 2.9, risk: 25 },
  { week: 'W4', gpa: 2.7, risk: 40 },
  { week: 'W5', gpa: 2.6, risk: 55 },
  { week: 'W6', gpa: 2.5, risk: 72 }, // Midterms
];

export default function FacultyReportsPage() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
           <h1 className="text-2xl md:text-3xl font-heading font-semibold text-white tracking-tight flex items-center gap-3">
             Academic Health Reports <Badge variant="info">ML Enhanced</Badge>
           </h1>
           <p className="text-slate-400 mt-1">Generate term summaries and view MSRS predictive risk models mapped against cohort grades.</p>
         </div>
         <div className="flex gap-3">
           <button className="bg-surface-dark border border-white/10 hover:bg-white/5 text-white px-4 py-2 rounded-xl transition-colors font-medium flex items-center gap-2 text-sm shadow-lg shadow-black/20">
             <Download className="w-4 h-4 text-accent-teal" /> Download PDF Report
           </button>
         </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
             <Card className="h-96 border-alert-warning/20">
                <CardHeader 
                   title="MSRS Risk Progression vs. Cohort GPA (MATH-301)" 
                   subtitle="AI predictive model mapping historical grade drops to dropout probability." 
                />
                <div className="h-72 mt-4 relative">
                   <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={mSRSRiskTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                       <defs>
                         <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#F43F5E" stopOpacity={0}/>
                         </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                       <XAxis dataKey="week" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                       <YAxis yAxisId="left" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={[0, 4.0]} />
                       <YAxis yAxisId="right" orientation="right" stroke="#F43F5E" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                       <Tooltip 
                         contentStyle={{ backgroundColor: '#1F2937', borderColor: '#ffffff20', borderRadius: '12px' }}
                         itemStyle={{ color: '#0D9488' }}
                       />
                       <Line yAxisId="left" type="monotone" dataKey="gpa" stroke="#0D9488" strokeWidth={3} name="Avg GPA" />
                       <Area yAxisId="right" type="monotone" dataKey="risk" stroke="#F43F5E" strokeWidth={2} fillOpacity={1} fill="url(#colorRisk)" name="Risk Probability %" />
                     </AreaChart>
                   </ResponsiveContainer>
                </div>
             </Card>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-surface-darker to-alert-critical/5 border-alert-critical/20">
                   <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-alert-critical/10 rounded-lg text-alert-critical">
                         <TrendingDown className="w-5 h-5 text-alert-critical" />
                      </div>
                      <h3 className="font-semibold text-white">ML Critical Intervention</h3>
                   </div>
                   <p className="text-3xl font-bold text-white mt-4">14 <span className="text-sm font-normal text-slate-400">Students</span></p>
                   <p className="text-sm text-slate-400 mt-2">Predicted &gt;80% chance of course failure based on current trajectory.</p>
                </Card>
                
                <Card className="bg-gradient-to-br from-surface-darker to-accent-teal/5 border-accent-teal/20">
                   <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-accent-teal/10 rounded-lg text-accent-teal">
                         <TrendingUp className="w-5 h-5 text-accent-teal" />
                      </div>
                      <h3 className="font-semibold text-white">Projected Recovery</h3>
                   </div>
                   <p className="text-3xl font-bold text-white mt-4">8 <span className="text-sm font-normal text-slate-400">Students</span></p>
                   <p className="text-sm text-slate-400 mt-2">Showing positive trajectory after Counselor academic nudge.</p>
                </Card>
             </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
             <Card>
                <CardHeader title="Generate Reports" subtitle="Select cohort to analyze" />
                <div className="mt-4 space-y-2">
                   <button className="w-full flex justify-between items-center bg-surface-dark border border-accent-teal/30 p-3 rounded-lg hover:bg-white/5 transition-colors text-left group">
                      <div>
                         <div className="text-sm font-medium text-white group-hover:text-accent-teal transition-colors flex items-center gap-2">
                            <FileText className="w-4 h-4 text-accent-teal" /> MATH-301 Midterm Summary
                         </div>
                         <div className="text-xs text-slate-400 mt-1">Generated: Today, 09:41 AM</div>
                      </div>
                   </button>
                   <button className="w-full flex justify-between items-center bg-surface-dark border border-white/5 p-3 rounded-lg hover:bg-white/5 transition-colors text-left group">
                      <div>
                         <div className="text-sm font-medium text-white group-hover:text-accent-teal transition-colors flex items-center gap-2">
                            <FileText className="w-4 h-4 text-slate-500" /> PHYS-402 Monthly ML Audit
                         </div>
                         <div className="text-xs text-slate-400 mt-1">Generated: Oct 20, 2023</div>
                      </div>
                   </button>
                   <button className="w-full flex justify-between items-center bg-surface-dark border border-white/5 p-3 rounded-lg hover:bg-white/5 transition-colors text-left group opacity-70">
                      <div>
                         <div className="text-sm font-medium text-white group-hover:text-accent-teal transition-colors flex items-center gap-2">
                            <FileText className="w-4 h-4 text-slate-500" /> CS-205 Initial Syllabus Review
                         </div>
                         <div className="text-xs text-slate-400 mt-1">Generated: Sep 01, 2023</div>
                      </div>
                   </button>
                </div>
             </Card>

             <Card className="border-accent-purple/20 bg-accent-purple/5">
                <CardHeader title="CampusMind ML Insights" />
                <div className="mt-4 space-y-4">
                   <div className="bg-surface-darker/80 border border-white/5 p-4 rounded-xl relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-accent-purple" />
                      <div className="flex items-center gap-2 mb-2">
                         <BrainCircuit className="w-4 h-4 text-accent-purple" />
                         <span className="text-xs font-semibold text-accent-purple uppercase tracking-wider">Pattern Detected</span>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">
                         The Neural Network identifies a significant correlation between missed <strong>Friday 1PM Lectures (CS-205)</strong> and <strong>Sleep Anomalies</strong> on Thursday nights across 28% of the cohort.
                      </p>
                      <button className="mt-3 text-xs font-medium text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded transition-colors w-full text-center border border-white/10">
                         View Correlated Students
                      </button>
                   </div>
                </div>
             </Card>
          </div>
       </div>
    </div>
  );
}
