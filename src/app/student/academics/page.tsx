"use client";

import { Card, CardHeader } from "@/components/ui/Card";
import { GraduationCap, BookOpen, Clock, FileText } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export default function AcademicsPage() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-semibold text-white tracking-tight flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-blue-500" /> Academics Hub
        </h1>
        <p className="text-slate-400 mt-1">Manage your coursework, schedules, and academic performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-blue-500/20 bg-blue-500/5">
          <CardHeader title="Current GPA" subtitle="Fall Semester" />
          <div className="mt-4 flex items-end gap-2">
            <span className="text-4xl font-bold text-white">3.8</span>
            <span className="text-lg text-slate-500 mb-1">/ 4.0</span>
          </div>
          <p className="mt-4 text-sm text-blue-400 font-medium">+0.2 from last semester</p>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader title="Upcoming Assignments" subtitle="Next 7 days" action={<Badge variant="warning">2 Due Soon</Badge>} />
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between p-3 bg-surface-darker rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent-teal/10 flex items-center justify-center text-accent-teal">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">Advanced Calculus - Midterm Essay</h4>
                  <p className="text-xs text-slate-400">Due in 2 days</p>
                </div>
              </div>
              <button className="text-xs font-semibold text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors">Submit</button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-surface-darker rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent-purple/10 flex items-center justify-center text-accent-purple">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">Physics Lab Report</h4>
                  <p className="text-xs text-slate-400">Due in 4 days</p>
                </div>
              </div>
              <button className="text-xs font-semibold text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors">Submit</button>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader title="Today's Schedule" subtitle="Classes & Labs" />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="p-4 bg-surface-darker border border-white/5 rounded-2xl flex flex-col gap-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent-teal" />
                <span className="text-xs font-bold tracking-wider text-accent-teal uppercase">09:00 AM - 10:30 AM</span>
                <span className="text-lg font-semibold text-white">Neuroscience 301</span>
                <span className="text-sm text-slate-400 flex items-center gap-1.5"><Clock className="w-4 h-4" /> Science Block, Room 4B</span>
             </div>
             
             <div className="p-4 bg-surface-darker border border-white/5 rounded-2xl flex flex-col gap-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                <span className="text-xs font-bold tracking-wider text-blue-500 uppercase">11:00 AM - 12:30 PM</span>
                <span className="text-lg font-semibold text-white">Advanced Calculus</span>
                <span className="text-sm text-slate-400 flex items-center gap-1.5"><Clock className="w-4 h-4" /> Math Block, Hall A</span>
             </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
