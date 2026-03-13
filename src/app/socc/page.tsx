"use client";

import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ShieldAlert, Crosshair, Hexagon, Radio, Mic, Activity } from "lucide-react";

export default function SOCCDashboard() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-semibold text-white tracking-tight flex items-center gap-3">
            <Radio className="w-8 h-8 text-alert-critical animate-pulse" /> Security Operations Center
          </h1>
          <p className="text-slate-400 mt-1">Cyber-Physical monitoring, drone coordination, and acoustic anomaly detection.</p>
        </div>
        <div className="flex items-center gap-3">
           <Badge variant="critical" className="animate-pulse">DEFCON 3</Badge>
           <Badge variant="info">Automated Patrol Active</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Cyber-Physical Alerts Feed */}
         <div className="space-y-6 lg:col-span-1">
            <h2 className="text-lg font-heading font-semibold text-white tracking-tight">Active Intercepts</h2>
            
            <Card className="border-alert-critical/40 bg-alert-critical/10 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1 h-full bg-alert-critical" />
               <CardHeader title="Medical Emergency" subtitle="Man Down Detected via CV" />
               <div className="mt-4 space-y-3">
                  <div className="p-3 bg-surface-darker/60 rounded-xl border border-alert-critical/20">
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-white flex items-center gap-1.5"><Activity className="w-4 h-4 text-alert-critical" /> Library Level 2</span>
                        <span className="text-xs text-alert-critical font-mono">14 secs ago</span>
                     </div>
                     <p className="text-xs text-slate-300">CV Model #4 detected sudden altitude change and lack of movement matching syncope/seizure profile.</p>
                     <div className="mt-3 flex gap-2">
                        <button className="flex-1 bg-alert-critical text-white font-medium py-1.5 rounded-lg text-xs">Dispatch Med-Team</button>
                        <button className="px-3 bg-surface-darker border border-white/10 text-white font-medium py-1.5 rounded-lg text-xs">Dismiss (False Alarm)</button>
                     </div>
                  </div>
               </div>
            </Card>

            <Card className="border-alert-warning/30 bg-alert-warning/5 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1 h-full bg-alert-warning" />
               <CardHeader title="Acoustic Anomaly" subtitle="Blind-spot audio parsing" />
               <div className="mt-4 space-y-3">
                  <div className="p-3 bg-surface-darker/60 rounded-xl border border-alert-warning/20">
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-white flex items-center gap-1.5"><Mic className="w-4 h-4 text-alert-warning" /> Block C Washroom</span>
                        <span className="text-xs text-alert-warning font-mono">2 mins ago</span>
                     </div>
                     <p className="text-xs text-slate-300">High-decibel spike matching "aggressive shouting" acoustic signature. Glass break probability: low.</p>
                     <div className="mt-3 flex gap-2">
                        <button className="flex-1 bg-alert-warning text-black font-semibold py-1.5 rounded-lg text-xs">Flag for Warden</button>
                     </div>
                  </div>
               </div>
            </Card>
         </div>

         {/* Drone & Fence Map */}
         <div className="lg:col-span-2 space-y-6">
            <h2 className="text-lg font-heading font-semibold text-white tracking-tight">Tactical Operations Map</h2>
            <Card className="h-[500px] flex flex-col p-0 overflow-hidden relative border-white/10">
               {/* Decorative Radar Background */}
               <div className="absolute inset-0 bg-[#0A0E1A] flex items-center justify-center opacity-80">
                  <div className="w-[800px] h-[800px] border border-accent-teal/10 rounded-full flex items-center justify-center animate-[spin_60s_linear_infinite]">
                     <div className="w-[600px] h-[600px] border border-accent-teal/20 rounded-full flex items-center justify-center">
                        <div className="w-[400px] h-[400px] border border-accent-teal/30 rounded-full flex items-center justify-center">
                           <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-accent-teal/50 to-transparent shadow-[0_0_15px_rgba(0,242,255,0.5)]" />
                        </div>
                     </div>
                  </div>
               </div>

               {/* Overlay Content */}
               <div className="relative z-10 p-6 flex flex-col h-full pointer-events-none">
                  <div className="flex justify-between items-start">
                     <div className="space-y-1 pointer-events-auto">
                        <div className="bg-surface-darker/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2">
                           <Crosshair className="w-4 h-4 text-accent-teal" />
                           <span className="text-xs font-mono text-white tracking-widest">DRONE-01 : PATROL ROUTE B</span>
                           <span className="w-2 h-2 bg-accent-teal rounded-full animate-pulse ml-2" />
                        </div>
                        <div className="bg-surface-darker/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2">
                           <ShieldAlert className="w-4 h-4 text-alert-critical" />
                           <span className="text-xs font-mono text-white tracking-widest">V-FENCE BREACH : SECTOR 7</span>
                        </div>
                     </div>
                  </div>

                  <div className="mt-auto pointer-events-auto flex justify-end gap-3">
                     <div className="bg-surface-darker/90 backdrop-blur-xl border border-white/10 rounded-xl p-4 w-64 shadow-2xl">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                           <Hexagon className="w-4 h-4" /> Virtual Fence Status
                        </h4>
                        <div className="space-y-2 text-sm">
                           <div className="flex justify-between items-center">
                              <span className="text-white font-medium">North Perimeter</span>
                              <span className="text-accent-teal">SECURE</span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-white font-medium">South Gate</span>
                              <span className="text-accent-teal">SECURE</span>
                           </div>
                           <div className="flex justify-between items-center border-t border-white/5 pt-2 mt-2">
                              <span className="text-alert-critical font-medium">Sector 7 Wall</span>
                              <span className="text-alert-critical font-bold animate-pulse">BREACH</span>
                           </div>
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
