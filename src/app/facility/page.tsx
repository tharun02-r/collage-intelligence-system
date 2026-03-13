"use client";

import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Zap, Thermometer, Building2, Wind, Activity, ArrowUpRight, ArrowDownRight, Settings } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const energyData = [
  { block: "Block A", current: 420, baseline: 500 },
  { block: "Block B", current: 380, baseline: 450 },
  { block: "Block C", current: 520, baseline: 490 },
  { block: "Library", current: 850, baseline: 900 },
  { block: "Mess Hall", current: 920, baseline: 1100 },
];

export default function FacilityDashboard() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-semibold text-white tracking-tight flex items-center gap-3">
            Campus Resource Control
          </h1>
          <p className="text-slate-400 mt-1">IoT sensor grid monitoring occupancy, climate, and energy across 8 blocks.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-surface-dark border border-white/10 hover:bg-white/5 text-white px-4 py-2 rounded-xl transition-colors font-medium flex items-center gap-2">
            <Settings className="w-4 h-4" /> Optimization Settings
          </button>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Campus Occupancy</p>
              <h4 className="text-3xl font-bold text-white mt-2">68%</h4>
            </div>
            <div className="w-10 h-10 rounded-full bg-accent-teal/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-accent-teal" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
             <div className="flex items-center gap-1.5 text-alert-normal text-sm font-medium">
               <ArrowDownRight className="w-4 h-4" /> -12% vs avg
             </div>
             <Badge variant="info">Visible to: Admin</Badge>
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Energy Saved (Today)</p>
              <h4 className="text-3xl font-bold text-white mt-2">142<span className="text-sm font-normal text-slate-500 ml-1">kWh</span></h4>
            </div>
            <div className="w-10 h-10 rounded-full bg-alert-normal/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-alert-normal" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-slate-400 text-xs">
             Equivalent to 12 trees saved this month
          </div>
        </Card>

        <Card className="border-alert-warning/30 bg-alert-warning/5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-alert-warning uppercase tracking-wider">HVAC Anomalies</p>
              <h4 className="text-3xl font-bold text-white mt-2">2</h4>
            </div>
            <div className="w-10 h-10 rounded-full bg-alert-warning/20 flex items-center justify-center">
               <Thermometer className="w-5 h-5 text-alert-warning" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-alert-warning text-sm">
             Library 2nd Floor, Block C
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Sensor Grid Status</p>
              <h4 className="text-3xl font-bold text-white mt-2">99.8%</h4>
            </div>
            <div className="w-10 h-10 rounded-full bg-accent-purple/10 flex items-center justify-center">
              <Wind className="w-5 h-5 text-accent-purple relative z-10" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
             <div className="flex items-center gap-1.5 text-accent-teal text-sm">
                <div className="w-2 h-2 rounded-full bg-accent-teal animate-ping" /> Live
             </div>
             <Badge variant="purple">4,208 Active</Badge>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        
        {/* IoT Occupancy Heatmap Container (Mock UI Simulation) */}
        <div className="lg:col-span-2 space-y-6">
           <Card className="flex flex-col overflow-hidden">
             <CardHeader 
                title="Live Occupancy Heatmap" 
                subtitle="Data fused from BLE beacons, Wi-Fi probes, and RFID."
                action={<Badge variant="info">Refreshes every 30s</Badge>}
             />
             
             {/* Abstract Heatmap Grid representation */}
             <div className="h-80 w-full mt-4 bg-surface-darker rounded-xl border border-white/5 relative p-4 grid grid-cols-4 gap-2">
                 {/* Empty Rooms */}
                 {Array.from({length: 4}).map((_, i) => (
                    <div key={`empty-${i}`} className="bg-white/5 rounded-lg flex flex-col items-center justify-center relative overflow-hidden group">
                       <span className="text-xs font-bold text-slate-500 mb-1">C-{100+i}</span>
                       <span className="text-[10px] text-slate-600">0 occupants</span>
                       {/* Auto shutoff badge */}
                       {i % 2 === 0 && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-alert-normal" title="Auto HVAC Shut-off Active" />}
                    </div>
                 ))}
                 
                 {/* Moderate Rooms */}
                 {Array.from({length: 8}).map((_, i) => (
                    <div key={`mod-${i}`} className="bg-accent-teal/10 border border-accent-teal/20 rounded-lg flex flex-col items-center justify-center relative overflow-hidden">
                       <span className="text-xs font-bold text-accent-teal mb-1">C-{200+i}</span>
                       <span className="text-[10px] text-accent-teal/70">2-4 occupants</span>
                       <div className="absolute inset-0 bg-gradient-to-t from-accent-teal/5 to-transparent pointer-events-none" />
                    </div>
                 ))}

                 {/* High Density Rooms */}
                 {Array.from({length: 4}).map((_, i) => (
                    <div key={`high-${i}`} className="bg-alert-warning/10 border border-alert-warning/30 rounded-lg flex flex-col items-center justify-center relative overflow-hidden">
                       <span className="text-xs font-bold text-alert-warning mb-1">LIB-{i+1}</span>
                       <span className="text-[10px] text-alert-warning/70">40+ occupants</span>
                       <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-alert-warning animate-pulse" />
                    </div>
                 ))}
             </div>
           </Card>
        </div>

        {/* Energy Optimization Panel */}
        <div className="lg:col-span-1 space-y-6">
           <Card className="h-full flex flex-col">
              <CardHeader 
                 title="Energy Optimization" 
                 subtitle="Consumption vs Baseline (kWh)"
              />
              <div className="flex-1 mt-4 relative min-h-[250px]">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={energyData} layout="vertical" margin={{ top: 0, right: 0, left: 20, bottom: 0 }}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={true} vertical={false} />
                     <XAxis type="number" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                     <YAxis dataKey="block" type="category" stroke="#94a3b8" fontSize={11} axisLine={false} tickLine={false} />
                     <Tooltip 
                       contentStyle={{ backgroundColor: '#1F2937', borderColor: '#ffffff20', borderRadius: '12px' }}
                       itemStyle={{ color: '#fff' }}
                       cursor={{fill: '#ffffff05'}}
                     />
                     <Bar dataKey="baseline" fill="#334155" radius={[0, 4, 4, 0]} barSize={12} name="Baseline" />
                     <Bar dataKey="current" fill="#0D9488" radius={[0, 4, 4, 0]} barSize={12} name="Current Usage" />
                   </BarChart>
                 </ResponsiveContainer>
              </div>

              <div className="mt-6 space-y-3">
                 <div className="bg-alert-normal/10 border border-alert-normal/30 rounded-xl p-3 flex gap-3 items-start">
                    <Zap className="w-5 h-5 text-alert-normal shrink-0" />
                    <div>
                       <h5 className="text-sm font-medium text-white">Auto-Shutoff Ready</h5>
                       <p className="text-xs text-slate-400 mt-1">24 empty rooms detected for &gt;2hrs. Shutting off HVAC would save ~45kWh today.</p>
                       <button className="mt-2 text-xs font-bold text-alert-normal hover:text-white transition-colors">Apply Optimization &rarr;</button>
                    </div>
                 </div>
              </div>
           </Card>
        </div>

      </div>
    </div>
  );
}
