"use client";

import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Users, BookOpen, Activity, ChevronRight, BrainCircuit, AlertTriangle } from "lucide-react";
import Link from "next/link";

const mockClasses = [
  {
    id: "MATH-301",
    name: "Advanced Calculus",
    students: 120,
    attendance: "88%",
    time: "Mon/Wed 10:00 AM",
    location: "Lecture Hall A",
    hostelSplit: "Block A (60%), Block B (30%), Off-Campus (10%)",
    mlRisk: "High",
    mlRiskCount: 14,
    mlInsight: "12% drop in engagement detected; correlated with upcoming midterms."
  },
  {
    id: "PHYS-402",
    name: "Quantum Mechanics",
    students: 64,
    attendance: "94%",
    time: "Tue/Thu 2:00 PM",
    location: "Seminar Room 4",
    hostelSplit: "Block C (80%), Block A (20%)",
    mlRisk: "Low",
    mlRiskCount: 2,
    mlInsight: "Stable performance trajectory. No anomalous behavioral patterns."
  },
  {
    id: "CS-205",
    name: "Data Structures",
    students: 184,
    attendance: "81%",
    time: "Mon/Wed/Fri 1:00 PM",
    location: "Auditorium B",
    hostelSplit: "Block B (50%), Block C (40%), Off-Campus (10%)",
    mlRisk: "Medium",
    mlRiskCount: 28,
    mlInsight: "Spike in late assignment submissions; possible syllabus overload."
  }
];

export default function FacultyClassesPage() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
           <h1 className="text-2xl md:text-3xl font-heading font-semibold text-white tracking-tight flex items-center gap-3">
             Curriculum Cohorts <Badge variant="info">Faculty View</Badge>
           </h1>
           <p className="text-slate-400 mt-1">Overview of your active classes, enriched with MSRS Machine Learning predictive analytics.</p>
         </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockClasses.map((course) => (
             <Card key={course.id} className="flex flex-col hover:border-accent-teal/30 transition-colors group">
                <div className="p-5 border-b border-white/5">
                   <div className="flex justify-between items-start mb-2">
                      <Badge variant="normal" className="bg-white/5 text-slate-300 border-white/10 font-mono">
                         {course.id}
                      </Badge>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                         <BookOpen className="w-3.5 h-3.5" /> {course.students} Students
                      </div>
                   </div>
                   <h2 className="text-xl font-bold text-white mb-1 group-hover:text-accent-teal transition-colors">
                      {course.name}
                   </h2>
                   <p className="text-sm text-slate-400">{course.time} &middot; {course.location}</p>
                </div>
                
                <div className="p-5 flex-1 space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-surface-darker rounded-xl p-3 border border-white/5">
                         <div className="text-xs text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5" /> Avg Attendance
                         </div>
                         <div className="text-2xl font-bold text-white">{course.attendance}</div>
                      </div>
                      <div className={`rounded-xl p-3 border ${course.mlRisk === 'High' ? 'bg-alert-critical/10 border-alert-critical/30' : course.mlRisk === 'Medium' ? 'bg-alert-warning/10 border-alert-warning/30' : 'bg-surface-darker border-white/5'}`}>
                         <div className="text-xs text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                            <BrainCircuit className={`w-3.5 h-3.5 ${course.mlRisk === 'High' ? 'text-alert-critical animate-pulse' : course.mlRisk === 'Medium' ? 'text-alert-warning' : 'text-accent-teal'}`} /> 
                            ML At-Risk
                         </div>
                         <div className={`text-2xl font-bold ${course.mlRisk === 'High' ? 'text-alert-critical' : course.mlRisk === 'Medium' ? 'text-alert-warning' : 'text-accent-teal'}`}>
                            {course.mlRiskCount} <span className="text-sm font-normal opacity-70">students</span>
                         </div>
                      </div>
                   </div>

                   <div className="bg-surface-dark/50 rounded-xl p-3 border border-white/5 text-sm">
                      <div className="flex items-center gap-2 mb-1">
                         <BrainCircuit className="w-4 h-4 text-accent-purple" />
                         <span className="font-semibold text-accent-purple text-xs uppercase tracking-wider">CampusMind ML Insight</span>
                      </div>
                      <p className="text-slate-300 italic">"{course.mlInsight}"</p>
                   </div>
                   
                   {/* Hostel Locator (Phase 7 Integration) */}
                   <div className="pt-2 border-t border-white/5">
                      <div className="text-xs text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                         Hostel Locator Split
                      </div>
                      <span className="text-xs font-mono text-slate-400 bg-surface-darker px-2 py-1 flex rounded-md border border-white/5 block w-fit">
                         {course.hostelSplit}
                      </span>
                   </div>
                </div>

                <div className="p-4 border-t border-white/5 bg-surface-darker/50 mt-auto">
                   <Link href="/faculty" className="w-full flex items-center justify-center gap-2 bg-surface-dark hover:bg-white/5 text-white py-2 rounded-lg transition-colors text-sm font-medium border border-white/10">
                      Open Observation Deck <ChevronRight className="w-4 h-4" />
                   </Link>
                </div>
             </Card>
          ))}
       </div>
    </div>
  );
}
