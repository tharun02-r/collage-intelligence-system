"use client";

import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Activity, BookOpen, Clock, Users, ArrowDownRight, AlertTriangle, FileText, CheckCircle, Search, Edit3 } from "lucide-react";

export default function FacultyDashboard() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-semibold text-white tracking-tight flex items-center gap-3">
          Academic Observation Deck <Badge variant="info">Faculty View</Badge>
        </h1>
        <p className="text-slate-400 mt-1">Manage class grades, update behavioral logs, and view MSRS predictive risk analytics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-alert-warning/30 bg-alert-warning/5">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-xs font-medium text-alert-warning uppercase tracking-wider">Attendance Drops</p>
               <h4 className="text-3xl font-bold text-white mt-2">3</h4>
             </div>
             <div className="w-10 h-10 rounded-full bg-alert-warning/20 flex items-center justify-center">
               <ArrowDownRight className="w-5 h-5 text-alert-warning" />
             </div>
           </div>
           <p className="text-sm mt-4 text-alert-warning font-medium">&gt; 2 consecutive absences</p>
        </Card>

        <Card>
           <div className="flex justify-between items-start">
             <div>
               <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Performance Risk</p>
               <h4 className="text-3xl font-bold text-white mt-2">12%</h4>
             </div>
             <div className="w-10 h-10 rounded-full bg-accent-purple/10 flex items-center justify-center">
               <Activity className="w-5 h-5 text-accent-purple" />
             </div>
           </div>
           <p className="text-sm mt-4 text-slate-400">Class average deviation</p>
        </Card>

        <Card>
           <div className="flex justify-between items-start">
             <div>
               <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Active Seminars</p>
               <h4 className="text-3xl font-bold text-white mt-2">4</h4>
             </div>
             <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
               <BookOpen className="w-5 h-5 text-blue-500" />
             </div>
           </div>
           <p className="text-sm mt-4 text-slate-400">Current Semester</p>
        </Card>

        <Card>
           <div className="flex justify-between items-start">
             <div>
               <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Students</p>
               <h4 className="text-3xl font-bold text-white mt-2">184</h4>
             </div>
             <div className="w-10 h-10 rounded-full bg-accent-teal/10 flex items-center justify-center">
               <Users className="w-5 h-5 text-accent-teal" />
             </div>
           </div>
           <p className="text-sm mt-4 text-slate-400">Across all cohorts</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         <div className="lg:col-span-2 space-y-6">
            {/* Academic Performance Tracker Table */}
            <Card className="overflow-hidden flex flex-col">
               <div className="flex justify-between items-center px-4 pt-4 mb-2">
                  <CardHeader title="Academic Performance Tracker" subtitle="MATH-301: Advanced Calculus (Current Roster)" />
                  <div className="relative w-56">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input type="text" placeholder="Search Student..." className="w-full bg-surface-dark border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-sm text-white focus:outline-none focus:border-accent-teal/50" />
                  </div>
               </div>
               <div className="mt-4 flex-1 overflow-x-auto pb-4">
                  <table className="w-full text-left border-collapse">
                     <thead>
                        <tr className="border-y border-white/5 bg-surface-darker/50 text-xs uppercase tracking-wider text-slate-500">
                           <th className="px-4 py-3 font-medium">Student (ID)</th>
                           <th className="px-4 py-3 font-medium">Midterm Grade</th>
                           <th className="px-4 py-3 font-medium">Behavioral Log</th>
                           <th className="px-4 py-3 font-medium">MSRS Risk Prediction</th>
                           <th className="px-4 py-3 font-medium text-right">Update</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-white/5 text-sm">
                        {[
                           { name: 'Alex Mercer', id: 'S-19042', grade: '88', behavior: 'Engaged', msrs: 'Low Risk', riskLevel: 'normal' },
                           { name: 'Priya Patel', id: 'S-18331', grade: '92', behavior: 'Attentive', msrs: 'Low Risk', riskLevel: 'normal' },
                           { name: 'Marcus Cole', id: 'S-8821', grade: '45', behavior: 'Absent (3x)', msrs: 'High Risk (Dropout)', riskLevel: 'critical' },
                           { name: 'Sarah Jenkins', id: 'S-19222', grade: '76', behavior: 'Distracted', msrs: 'Elevated Stress', riskLevel: 'warning' },
                        ].map((student, i) => (
                           <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                              <td className="px-4 py-3">
                                 <div className="font-medium text-white">{student.name}</div>
                                 <div className="text-xs text-slate-500 font-mono">{student.id}</div>
                              </td>
                              <td className="px-4 py-3">
                                 <div className="relative w-16">
                                    <input type="text" defaultValue={student.grade} className="w-full bg-surface-dark border border-white/10 rounded-md px-2 py-1 text-center text-white font-mono focus:border-accent-teal/50 focus:outline-none" />
                                 </div>
                              </td>
                              <td className="px-4 py-3">
                                 <select className="bg-surface-dark border border-white/10 rounded-md px-2 py-1 text-slate-300 text-xs focus:border-accent-teal/50 focus:outline-none w-full">
                                    <option>{student.behavior}</option>
                                    <option>Engaged</option>
                                    <option>Distracted</option>
                                    <option>Absent</option>
                                    <option>Disruptive</option>
                                 </select>
                              </td>
                              <td className="px-4 py-3">
                                 <div className="flex items-center gap-2">
                                    {student.riskLevel === 'normal' && <CheckCircle className="w-4 h-4 text-accent-teal" />}
                                    {student.riskLevel === 'warning' && <AlertTriangle className="w-4 h-4 text-alert-warning" />}
                                    {student.riskLevel === 'critical' && <AlertTriangle className="w-4 h-4 text-alert-critical animate-pulse" />}
                                    <span className={`text-xs font-medium ${student.riskLevel === 'critical' ? 'text-alert-critical' : student.riskLevel === 'warning' ? 'text-alert-warning' : 'text-slate-300'}`}>
                                       {student.msrs}
                                    </span>
                                 </div>
                              </td>
                              <td className="px-4 py-3 text-right">
                                 <button className="bg-accent-teal/20 hover:bg-accent-teal/30 text-accent-teal p-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1">
                                    <Edit3 className="w-3 h-3" /> Save
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </Card>

            <Card className="border-alert-critical/20 bg-alert-critical/5">
                <CardHeader title="Action Required: MSRS Intervention" />
                <div className="mt-4 bg-surface-darker border border-alert-critical/30 rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-1 h-full bg-alert-critical animate-pulse" />
                   <div className="flex justify-between items-start">
                      <div>
                         <h4 className="font-semibold text-white">Student ID: S-8821 (Marcus Cole)</h4>
                         <p className="text-xs text-alert-critical mt-0.5 font-medium">Predicted Risk: Academic Failure & Dropout</p>
                      </div>
                      <Badge variant="critical">High Risk</Badge>
                   </div>
                   <div className="text-sm text-slate-300">
                      <p className="mb-2"><strong>AI Analysis:</strong> Marcus's midterm grade has dropped by 42% compared to last semester. Combined with 3 recent absences and a "Distracted" behavioral log, the MSRS engine predicts an 89% chance of course failure.</p>
                      <ul className="list-disc list-inside space-y-1 text-xs text-slate-400">
                         <li>Grade Trend: 87 &rarr; 45 (Severe Drop)</li>
                         <li>Behavioral Log: Absent (Class 4, 7, 8)</li>
                      </ul>
                   </div>
                   <div className="flex flex-col sm:flex-row gap-2 mt-2">
                      <button className="flex-1 bg-surface-dark border border-white/10 hover:bg-white/5 text-white py-2 rounded-lg text-xs font-medium transition-colors">Log Official Incident</button>
                      <button className="flex-1 bg-alert-critical hover:bg-alert-critical/80 text-white py-2 rounded-lg text-xs font-semibold transition-colors">Escalate to Counselor</button>
                   </div>
                </div>
            </Card>
         </div>

         <div className="space-y-6 lg:col-span-1">
            <Card className="h-48 border-accent-purple/20 bg-accent-purple/5">
                <CardHeader title="Daily Briefing" subtitle="Generated by CampusMind NLP" />
                <div className="mt-4 p-4 bg-surface-darker/80 rounded-xl border border-white/5 text-sm text-slate-300 leading-relaxed relative">
                   <div className="absolute top-0 left-0 w-1 h-full bg-accent-purple rounded-l-xl" />
                   "Good morning, Professor. Today you have 2 lectures. Note that <strong>MATH-301</strong> has a 12% lower attendance rate than average this week, likely due to the upcoming Engineering midterms. <strong>3 students</strong> in your roster have active privacy blocks enabled, meaning their specific crisis data is currently hidden from your view."
                </div>
            </Card>

            <Card className="flex-1">
               <CardHeader title="Today's Academic Schedule" />
               <div className="mt-4 space-y-3">
                 <div className="flex items-center justify-between p-3 bg-surface-darker rounded-xl border border-white/5">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-lg bg-accent-teal/10 flex items-center justify-center text-accent-teal">
                       <span className="font-bold text-xs uppercase">10am</span>
                     </div>
                     <div>
                       <h4 className="text-sm font-medium text-white">Advanced Calculus</h4>
                       <p className="text-xs text-slate-400">Lecture Hall A &middot; 120 Students</p>
                     </div>
                   </div>
                 </div>
                 
                 <div className="flex items-center justify-between p-3 bg-surface-darker rounded-xl border border-white/5">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                       <span className="font-bold text-xs uppercase">2pm</span>
                     </div>
                     <div>
                       <h4 className="text-sm font-medium text-white">Quantum Mechanics</h4>
                       <p className="text-xs text-slate-400">Seminar Room 4 &middot; 64 Students</p>
                     </div>
                   </div>
                 </div>
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}
