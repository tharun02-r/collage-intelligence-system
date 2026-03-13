"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Radio, Crosshair, Navigation, Battery, Zap, AlertTriangle } from "lucide-react";

export default function DroneFeeds() {
  return (
    <MainLayout role="socc">
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-semibold text-white tracking-tight flex items-center gap-3">
              Drone Surveillance <Badge variant="critical" className="animate-pulse">Live</Badge>
            </h1>
            <p className="text-slate-400 mt-1">Autonomous aerial telemetry and live video processing engine.</p>
          </div>
          <button className="bg-surface-dark border border-white/10 hover:bg-white/5 text-white py-2 px-6 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
             <Crosshair className="w-4 h-4" /> Recall All Drones
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           {/* Drone Alpha */}
           <Card className="p-0 overflow-hidden relative border-alert-warning/30">
              <div className="h-64 bg-surface-darker/90 flex flex-col items-center justify-center border-b border-white/5 relative">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10" />
                 
                 <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="warning" className="uppercase font-mono text-[10px]">Auto Pilot</Badge>
                 </div>
                 <div className="absolute top-4 right-4 flex items-center gap-2 text-white/50 text-xs font-mono">
                    <span className="animate-pulse text-alert-critical font-bold text-sm">REC</span>
                    00:45:12
                 </div>

                 <Radio className="w-16 h-16 text-alert-warning opacity-50 mb-4" />
                 <h3 className="font-mono font-bold text-white tracking-widest text-lg z-10">ALPHA-SCIENTIA</h3>
              </div>

              <div className="p-5 flex flex-col gap-4">
                 <div className="flex justify-between items-center text-sm border-b border-white/5 pb-4">
                    <div className="flex items-center gap-2 text-slate-300">
                       <Navigation className="w-4 h-4 text-accent-teal" /> Altitude
                    </div>
                    <span className="font-mono text-white">124 ft (Holding)</span>
                 </div>
                 <div className="flex justify-between items-center text-sm border-b border-white/5 pb-4">
                    <div className="flex items-center gap-2 text-slate-300">
                       <Battery className="w-4 h-4 text-alert-normal" /> Battery Life
                    </div>
                    <span className="font-mono text-alert-normal">78% (~45m rem)</span>
                 </div>
                 <div className="flex justify-between items-center text-sm pb-2">
                    <div className="flex items-center gap-2 text-slate-300">
                       <Zap className="w-4 h-4 text-accent-purple" /> Thermal Payload
                    </div>
                    <span className="font-mono text-white">Active</span>
                 </div>

                 <div className="mt-2 flex gap-2">
                    <button className="w-full py-2 rounded-lg bg-surface-darker border border-white/10 text-white text-xs font-semibold hover:bg-white/5 transition-colors">
                       Take Manual Control
                    </button>
                 </div>
              </div>
           </Card>

           {/* Drone Beta */}
           <Card className="p-0 overflow-hidden relative border-alert-critical/30">
              <div className="h-64 bg-alert-critical/5 flex flex-col items-center justify-center border-b border-white/5 relative">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10" />
                 <div className="absolute inset-0 border-[3px] border-alert-critical opacity-20 pointer-events-none" />
                 
                 <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="critical" className="uppercase font-mono text-[10px] animate-pulse">Engaging Target</Badge>
                 </div>
                 
                 <AlertTriangle className="w-16 h-16 text-alert-critical opacity-80 mb-4 animate-pulse" />
                 <h3 className="font-mono font-bold text-white tracking-widest text-lg z-10">BETA-LUMINA</h3>
                 <p className="text-alert-critical font-mono text-xs mt-2 relative z-10">Anomaly Detected: Sector 4</p>
              </div>

              <div className="p-5 flex flex-col gap-4">
                 <div className="flex justify-between items-center text-sm border-b border-white/5 pb-4">
                    <div className="flex items-center gap-2 text-slate-300">
                       <Navigation className="w-4 h-4 text-alert-warning" /> Altitude
                    </div>
                    <span className="font-mono text-alert-warning">45 ft (Descending)</span>
                 </div>
                 <div className="flex justify-between items-center text-sm border-b border-white/5 pb-4">
                    <div className="flex items-center gap-2 text-slate-300">
                       <Battery className="w-4 h-4 text-alert-normal" /> Battery Life
                    </div>
                    <span className="font-mono text-alert-normal">42% (~21m rem)</span>
                 </div>
                 <div className="flex justify-between items-center text-sm pb-2">
                    <div className="flex items-center gap-2 text-slate-300">
                       <Zap className="w-4 h-4 text-alert-critical" /> Facial Rec Tracker
                    </div>
                    <span className="font-mono text-alert-critical font-bold animate-pulse">LOCKED</span>
                 </div>

                 <div className="mt-2 flex gap-2">
                    <button className="w-full py-2 rounded-lg bg-alert-critical/20 hover:bg-alert-critical/40 border border-alert-critical/50 text-alert-critical text-xs font-bold transition-colors">
                       Stream to Command Center
                    </button>
                 </div>
              </div>
           </Card>
        </div>
      </div>
    </MainLayout>
  );
}
