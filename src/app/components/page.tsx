"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CampusMindBot } from "@/components/features/CampusMindBot";
import { SilentSOS } from "@/components/features/SilentSOS";
import { ShieldAlert, Activity, Users, Settings, BedDouble, ArrowUpRight, ArrowDownRight, Zap } from "lucide-react";

export default function ComponentsLibrary() {
  return (
    <MainLayout role="admin">
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-12">
        
        <div>
          <h1 className="text-3xl font-heading font-semibold text-white tracking-tight">Design System Library</h1>
          <p className="text-slate-400 mt-1">Core UI components showcasing the dark futuristic design language of CampusGuard AI.</p>
        </div>

        {/* Brand Colors */}
        <section>
           <h2 className="text-xl font-heading font-medium text-white mb-4 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-accent-teal" /> Brand Colors</h2>
           <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="space-y-2">
                 <div className="h-24 rounded-xl bg-[#0D1B3E] border border-white/10" />
                 <p className="text-xs text-slate-400 font-mono">bg-background (#0D1B3E)</p>
              </div>
              <div className="space-y-2">
                 <div className="h-24 rounded-xl bg-[#132040] border border-white/10" />
                 <p className="text-xs text-slate-400 font-mono">bg-surface-dark (#132040)</p>
              </div>
              <div className="space-y-2">
                 <div className="h-24 rounded-xl bg-accent-teal border border-white/10" />
                 <p className="text-xs text-slate-400 font-mono">accent-teal (#0D9488)</p>
              </div>
              <div className="space-y-2">
                 <div className="h-24 rounded-xl bg-accent-purple border border-white/10" />
                 <p className="text-xs text-slate-400 font-mono">accent-purple (#7C3AED)</p>
              </div>
              <div className="space-y-2">
                 <div className="h-24 rounded-xl bg-alert-critical border border-white/10" />
                 <p className="text-xs text-slate-400 font-mono">alert-critical (#EF4444)</p>
              </div>
              <div className="space-y-2">
                 <div className="h-24 rounded-xl bg-alert-warning border border-white/10" />
                 <p className="text-xs text-slate-400 font-mono">alert-warning (#F59E0B)</p>
              </div>
           </div>
        </section>

        {/* Metric Cards Structure */}
        <section>
           <h2 className="text-xl font-heading font-medium text-white mb-4 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-accent-teal" /> KPI Metric Cards</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <Card>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Standard Metric</p>
                    <h4 className="text-3xl font-bold text-white mt-2">1,024</h4>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-accent-teal/10 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-accent-teal" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-alert-normal text-sm font-medium">
                  <ArrowUpRight className="w-4 h-4" /> +12% nominal growth
                </div>
              </Card>

              <Card className="border-alert-warning/30 bg-alert-warning/5">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-medium text-alert-warning uppercase tracking-wider">Warning State</p>
                    <h4 className="text-3xl font-bold text-white mt-2 border-b border-alert-warning/30 border-dashed pb-1">Elevated</h4>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-alert-warning/20 flex items-center justify-center">
                    <div className="w-2 h-2 bg-alert-warning rounded-full animate-ping" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-alert-warning text-sm">
                   Subtle anomaly detected
                </div>
              </Card>

              <Card className="border-alert-critical/30 bg-alert-critical/5">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-medium text-alert-critical uppercase tracking-wider">Critical Alert</p>
                    <h4 className="text-3xl font-bold text-white mt-2">12 <span className="text-sm font-normal text-slate-400">cases</span></h4>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-alert-critical/20 flex items-center justify-center">
                    <ShieldAlert className="w-5 h-5 text-alert-critical" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-alert-critical text-sm font-medium">
                  <ArrowUpRight className="w-4 h-4" /> Action required
                </div>
              </Card>

           </div>
        </section>

        {/* UI Badges & Tags */}
        <section>
           <h2 className="text-xl font-heading font-medium text-white mb-4 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-accent-teal" /> Badges & Status Signals</h2>
           <Card>
              <div className="flex flex-wrap gap-4 items-center">
                 <Badge variant="normal">Healthy Pattern</Badge>
                 <Badge variant="warning">Anomaly Detected</Badge>
                 <Badge variant="critical">SOS Triggered</Badge>
                 <Badge variant="info">Visible to: Counselor</Badge>
                 <Badge variant="purple">AI Processed</Badge>
                 
                 <div className="w-px h-8 bg-white/10 mx-2" />
                 
                 <div className="flex items-center gap-2 bg-surface-darker px-3 py-1.5 rounded-full border border-white/10">
                    <div className="w-2 h-2 bg-accent-teal rounded-full animate-ping" />
                    <span className="text-[10px] uppercase tracking-wider text-accent-teal font-medium">System Live</span>
                 </div>
              </div>
           </Card>
        </section>

      </div>

      <CampusMindBot role="admin" />
      <SilentSOS />
    </MainLayout>
  );
}
