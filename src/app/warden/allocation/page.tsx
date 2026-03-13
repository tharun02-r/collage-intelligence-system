"use client";

import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { BedDouble, CheckCircle2, Search, UserPlus, MapPin, AlertCircle } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";

const B_BLOCK_FLOORS = [
  { floor: 1, capacity: 40, occupied: 38 },
  { floor: 2, capacity: 40, occupied: 39 },
  { floor: 3, capacity: 40, occupied: 37 },
];

const mockUnallocatedStudents = [
  { id: "S-20199", name: "Ravi Shankar", course: "B.Tech Year 1", status: "Pending Allocation" },
  { id: "S-20551", name: "Ananya Gupta", course: "B.Sc Physics", status: "Transfer Requested" },
  { id: "S-20882", name: "Mohammed Ali", course: "M.Tech", status: "Waitlisted" }
];

export default function WardenAllocationPage() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
           <h1 className="text-2xl md:text-3xl font-heading font-semibold text-white tracking-tight flex items-center gap-3">
             Hostel Allocation Engine <Badge variant="warning">Warden View</Badge>
           </h1>
           <p className="text-slate-400 mt-1">Manage Block B room assignments and process pending student accommodations.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Allocation Command Column */}
         <div className="lg:col-span-1 space-y-6">
            <Card className="border-accent-teal/20 bg-accent-teal/5">
               <CardHeader title="Allocation Overview" />
               <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="bg-surface-darker rounded-xl p-3 border border-white/5 text-center">
                     <p className="text-2xl font-bold text-white">114</p>
                     <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Occupied</p>
                  </div>
                  <div className="bg-surface-darker rounded-xl p-3 border border-accent-teal/30 text-center relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-8 h-8 bg-accent-teal/10 rounded-bl-full flex justify-end items-start p-1.5"><BedDouble className="w-3 h-3 text-accent-teal" /></div>
                     <p className="text-2xl font-bold text-accent-teal">6</p>
                     <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Available</p>
                  </div>
               </div>
               
               <div className="mt-6 space-y-3">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Floor Breakdown (Block B)</h4>
                  {B_BLOCK_FLOORS.map((f, i) => (
                     <div key={i} className="flex items-center justify-between text-sm p-2 bg-surface-darker/50 rounded-lg border border-white/5">
                        <span className="text-slate-300 font-medium flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-slate-500" /> Floor {f.floor}</span>
                        <div className="flex items-center gap-2">
                           <div className="w-24 h-1.5 bg-surface-dark rounded-full overflow-hidden">
                              <div className={clsx("h-full rounded-full", (f.occupied/f.capacity) > 0.95 ? "bg-amber-500" : "bg-accent-teal")} style={{ width: `${(f.occupied/f.capacity) * 100}%` }} />
                           </div>
                           <span className="text-xs text-slate-400 font-mono">{f.occupied}/{f.capacity}</span>
                        </div>
                     </div>
                  ))}
               </div>
            </Card>

            <Card>
               <CardHeader title="Pending Allocations" subtitle="Students awaiting room assignment" />
               <div className="mt-4 space-y-2">
                  {mockUnallocatedStudents.map((student, i) => (
                     <div key={i} className="p-3 bg-surface-darker border border-white/5 rounded-xl hover:border-accent-purple/30 transition-colors cursor-pointer group">
                        <div className="flex justify-between items-start mb-1">
                           <span className="font-semibold text-white group-hover:text-accent-purple transition-colors">{student.name}</span>
                           <span className="text-xs font-mono text-slate-500">{student.id}</span>
                        </div>
                        <p className="text-xs text-slate-400 mb-3">{student.course}</p>
                        <div className="flex justify-between items-center">
                           <Badge variant={student.status.includes('Pending') ? 'warning' : 'info'} className="text-[10px] scale-90 origin-left border-transparent">
                              {student.status}
                           </Badge>
                           <button className="text-xs font-medium bg-surface-dark border border-white/10 hover:bg-accent-teal/20 hover:text-accent-teal text-slate-300 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5">
                              <UserPlus className="w-3.5 h-3.5" /> Assign
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            </Card>
         </div>

         {/* Interactive Map Column */}
         <div className="lg:col-span-2 space-y-6">
            <Card className="h-full flex flex-col">
               <div className="flex justify-between items-center p-4 border-b border-white/5">
                  <CardHeader title="Interactive Floor Map" subtitle="Select an available room to complete an assignment." />
                  <div className="flex gap-4 text-xs font-medium text-slate-400">
                     <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-accent-teal/80 shadow-[0_0_8px_rgba(13,148,136,0.3)]"></span> Available</span>
                     <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-surface-dark border border-white/10"></span> Occupied</span>
                  </div>
               </div>
               
               <div className="flex-1 p-6 relative">
                  {/* Mock Visual representation of a floor plan */}
                  <div className="w-full h-full min-h-[500px] border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center bg-surface-darker relative overflow-hidden group">
                     
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />
                     
                     <div className="grid grid-cols-2 gap-x-24 gap-y-4 z-10 w-full max-w-lg">
                        {/* Corridor logic */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-16 bg-surface-dark border-x border-white/5 flex flex-col justify-center items-center gap-20">
                           <span className="px-2 py-8 text-xs font-bold text-slate-600 uppercase tracking-widest" style={{ writingMode: 'vertical-rl'}}>Main Corridor</span>
                           <span className="px-2 py-8 text-xs font-bold text-slate-600 uppercase tracking-widest" style={{ writingMode: 'vertical-rl'}}>Main Corridor</span>
                        </div>

                        {/* Room generation map */}
                        {Array.from({length: 12}).map((_, idx) => {
                           const roomNumber = `30${idx + 1}`;
                           const isAvailable = idx === 3 || idx === 8;
                           const isSelected = selectedRoom === roomNumber;

                           return (
                              <button 
                                 key={idx}
                                 onClick={() => isAvailable && setSelectedRoom(roomNumber)}
                                 disabled={!isAvailable}
                                 className={clsx(
                                    "h-16 rounded-xl border-2 flex items-center justify-center transition-all relative overflow-hidden",
                                    isAvailable ? "hover:scale-105 cursor-pointer" : "opacity-50 cursor-not-allowed",
                                    isSelected ? "bg-accent-teal/20 border-accent-teal shadow-[0_0_15px_rgba(13,148,136,0.2)]" : 
                                    isAvailable ? "bg-surface-dark border-accent-teal/50 hover:bg-accent-teal/10 hover:border-accent-teal" : 
                                    "bg-surface-darker border-white/5"
                                 )}
                              >
                                 {isSelected && <div className="absolute top-1 right-1"><CheckCircle2 className="w-3 h-3 text-accent-teal" /></div>}
                                 <span className={clsx(
                                    "font-mono font-medium",
                                    isSelected ? "text-accent-teal" : isAvailable ? "text-slate-300" : "text-slate-600"
                                 )}>
                                    {roomNumber}
                                 </span>
                              </button>
                           );
                        })}
                     </div>
                  </div>
               </div>

               <div className="p-4 border-t border-white/5 bg-surface-darker/60 flex justify-between items-center rounded-b-2xl">
                  {selectedRoom ? (
                     <div className="flex items-center gap-3">
                        <Badge variant="normal">Room {selectedRoom} Selected</Badge>
                        <span className="text-sm text-slate-400">Ready for allocation workflow.</span>
                     </div>
                  ) : (
                     <div className="flex items-center gap-2 text-sm text-amber-500">
                        <AlertCircle className="w-4 h-4" /> Please select an available room from the map.
                     </div>
                  )}
                  <button 
                     disabled={!selectedRoom}
                     className={clsx(
                        "px-6 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg",
                        selectedRoom 
                           ? "bg-accent-teal text-surface-dark hover:bg-accent-teal/90 shadow-accent-teal/20 hover:shadow-accent-teal/40" 
                           : "bg-surface-dark border border-white/10 text-slate-500 cursor-not-allowed shadow-none"
                     )}
                  >
                     Confirm Allocation
                  </button>
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}
