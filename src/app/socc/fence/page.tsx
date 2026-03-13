"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Hexagon, Lock, Unlock, AlertOctagon, MapPin } from "lucide-react";
import { useState } from "react";

const SECTORS = [
  { id: "S1", name: "Main Campus Gate", status: "Secure", locked: false },
  { id: "S2", name: "Engineering Block B", status: "Alert", locked: true },
  { id: "S3", name: "North Woods Boundry", status: "Secure", locked: true },
  { id: "S4", name: "South Chemistry Lab", status: "Secure", locked: false },
];

const RECENT_BREACHES = [
  { id: "BR-921", time: "10 mins ago", sector: "Engineering Block B", identity: "Unknown Subject", threat: "High" },
  { id: "BR-920", time: "2 hours ago", sector: "North Woods Boundry", identity: "Wildlife Detected", threat: "Low" },
];

export default function VirtualFence() {
  const [sectors, setSectors] = useState(SECTORS);

  const toggleLock = (index: number) => {
    const updated = [...sectors];
    updated[index].locked = !updated[index].locked;
    setSectors(updated);
  };

  return (
    <MainLayout role="socc">
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-semibold text-white tracking-tight flex items-center gap-3">
            Geospatial Virtual Fence <Badge variant="info">Matrix</Badge>
          </h1>
          <p className="text-slate-400 mt-1">Manage invisible perimeter boundaries and automated lockdown zones.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sector Controls */}
          <div className="lg:col-span-2 space-y-4">
             <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <Hexagon className="w-5 h-5 text-accent-purple" /> Active Sectors
             </h2>
             
             {sectors.map((sector, idx) => (
                <Card key={sector.id} className={`flex items-center justify-between transition-all ${sector.status === 'Alert' ? 'border-alert-critical/50 bg-alert-critical/5 shadow-[0_0_20px_rgba(239,68,68,0.1)]' : ''}`}>
                   <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${sector.status === 'Alert' ? 'bg-alert-critical/20 text-alert-critical animate-pulse' : 'bg-surface-darker text-slate-400'}`}>
                         <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                         <h3 className="font-semibold text-white flex items-center gap-2">
                            {sector.name} 
                            {sector.status === 'Alert' && <Badge variant="critical" className="text-[10px] py-0">Breach</Badge>}
                         </h3>
                         <p className="text-xs text-slate-400 mt-1 font-mono">Sector ID: {sector.id}</p>
                      </div>
                   </div>

                   <div className="flex items-center gap-6">
                      <div className="text-right hidden sm:block">
                         <div className="text-xs text-slate-400 mb-1 uppercase tracking-wide">Status</div>
                         <div className={`text-sm font-semibold ${sector.status === 'Alert' ? 'text-alert-critical' : 'text-accent-teal'}`}>
                            {sector.status}
                         </div>
                      </div>
                      
                      <button 
                         onClick={() => toggleLock(idx)}
                         className={`relative w-16 h-8 rounded-full transition-colors flex items-center px-1 ${sector.locked ? 'bg-alert-critical/80' : 'bg-surface-dark border border-white/10'}`}
                      >
                         <div className={`w-6 h-6 rounded-full bg-white flex items-center justify-center transition-transform ${sector.locked ? 'translate-x-8' : 'translate-x-0'}`}>
                            {sector.locked ? <Lock className="w-3.5 h-3.5 text-alert-critical" /> : <Unlock className="w-3.5 h-3.5 text-slate-600" />}
                         </div>
                      </button>
                   </div>
                </Card>
             ))}
          </div>

          {/* Alert Stream */}
          <div className="lg:col-span-1">
             <Card className="h-full border-alert-warning/20">
                <CardHeader title="Live Incident Stream" subtitle="Crossings & perimeter anomalies" />
                <div className="mt-6 flex flex-col gap-4">
                   {RECENT_BREACHES.map(breach => (
                      <div key={breach.id} className="p-3 bg-surface-darker/80 border border-white/5 rounded-xl border-l-4 border-l-alert-critical shadow-sm">
                         <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-mono text-slate-400">{breach.id}</span>
                            <span className="text-xs font-medium text-slate-500">{breach.time}</span>
                         </div>
                         <h4 className="text-sm font-bold text-white flex items-center gap-2">
                            <AlertOctagon className="w-4 h-4 text-alert-critical" /> {breach.sector}
                         </h4>
                         <div className="mt-2 text-xs flex justify-between">
                            <span className="text-slate-300">Target: <span className="text-white font-medium">{breach.identity}</span></span>
                            <span className="text-slate-300">Threat: {breach.threat === 'High' ? <span className="text-alert-critical font-bold">HIGH</span> : <span className="text-alert-normal font-bold">LOW</span>}</span>
                         </div>
                      </div>
                   ))}

                   <button className="mt-4 w-full py-2 border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg text-sm transition-colors text-center">
                      View Historical Archive
                   </button>
                </div>
             </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
