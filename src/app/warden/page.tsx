"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { BedDouble, AlertTriangle, Moon, Coffee, Phone, MapPin, CheckCircle2, Search, Loader2 } from "lucide-react";

export default function WardenDashboard() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [allocations, setAllocations] = useState<any[]>([]);
  const [reallocateModalOpen, setReallocateModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [newRoomNo, setNewRoomNo] = useState("");

  const fetchHostelData = () => {
    // 1. Fetch Room Totals/Occupancy
    fetch('http://localhost:5000/api/analytics/hostel')
      .then(res => res.json())
      .then(data => {
        setRooms(data);
      })
      .catch(err => console.error("Failed to fetch hostel data:", err));

    // 2. Fetch Live Student Allocations
    fetch('http://localhost:5000/api/hostel/allocations')
      .then(res => res.json())
      .then(data => {
        setAllocations(data);
        setLoading(false);
      })
      .catch(err => console.error("Failed to fetch allocations data:", err));
  };

  useEffect(() => {
    fetchHostelData();
  }, []);

  const handleReallocate = async () => {
    if (!selectedStudent || !newRoomNo) return;
    
    try {
      const res = await fetch('http://localhost:5000/api/hostel/reallocate', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: selectedStudent.userId,
          newRoomBlock: 'Block B',
          newRoomNo: newRoomNo
        })
      });

      if (res.ok) {
        setReallocateModalOpen(false);
        setNewRoomNo("");
        fetchHostelData(); // Refresh table & KPIs
      } else {
         console.error("Reallocation failed.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Calculate generic occupancy stats for the dashboard
  const blockBRooms = rooms.filter(r => r.block === 'Block B');
  const totalRooms = blockBRooms.length || 100; // prevent div/0 textually
  const occupiedRooms = blockBRooms.filter(r => r.occupancy > 0).length;
  const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100);
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-semibold text-white tracking-tight flex items-center gap-3">
          Hostel Well-being View <Badge variant="warning">Block B</Badge>
        </h1>
        <p className="text-slate-400 mt-1">Operational view of Block B occupancy, night distress, and live student roster.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-alert-critical/30 bg-alert-critical/5">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-xs font-medium text-alert-critical uppercase tracking-wider">Active SOS</p>
               <h4 className="text-3xl font-bold text-white mt-2">1</h4>
             </div>
             <div className="w-10 h-10 rounded-full bg-alert-critical/20 flex items-center justify-center">
               <AlertTriangle className="w-5 h-5 text-alert-critical" />
             </div>
           </div>
           <p className="text-sm mt-4 text-alert-critical font-medium">Room 302 - Unresolved</p>
        </Card>

        <Card className="border-alert-warning/30 bg-alert-warning/5">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-xs font-medium text-alert-warning uppercase tracking-wider">Night Distress</p>
               <h4 className="text-3xl font-bold text-white mt-2">4</h4>
             </div>
             <div className="w-10 h-10 rounded-full bg-alert-warning/20 flex items-center justify-center">
               <Moon className="w-5 h-5 text-alert-warning" />
             </div>
           </div>
           <p className="text-sm mt-4 text-alert-warning">11pm–4am anomalies</p>
        </Card>

        <Card>
           <div className="flex justify-between items-start">
             <div>
               <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Mess Absence</p>
               <h4 className="text-3xl font-bold text-white mt-2">12</h4>
             </div>
             <div className="w-10 h-10 rounded-full bg-accent-teal/10 flex items-center justify-center">
               <Coffee className="w-5 h-5 text-accent-teal" />
             </div>
           </div>
           <p className="text-sm mt-4 text-slate-400">&gt;3 consecutive days</p>
        </Card>

        <Card>
           <div className="flex justify-between items-start">
             <div>
               <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Occupancy</p>
               <h4 className="text-3xl font-bold text-white mt-2">
                 {loading ? <Loader2 className="w-6 h-6 animate-spin text-blue-500" /> : `${occupancyRate || 0}%`}
               </h4>
             </div>
             <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
               <BedDouble className="w-5 h-5 text-blue-500" />
             </div>
           </div>
           
           <div className="mt-4 flex flex-col gap-1">
             <div className="flex justify-between items-center text-xs">
               <span className="text-slate-400">Filled Rooms:</span>
               <span className="text-white font-mono">{loading ? '--' : occupiedRooms}</span>
             </div>
             <div className="flex justify-between items-center text-xs">
               <span className="text-slate-400">Vacant Rooms:</span>
               <span className="text-accent-teal font-mono font-bold">{loading ? '--' : totalRooms - occupiedRooms}</span>
             </div>
             <div className="w-full bg-surface-darker rounded-full h-1.5 mt-1 border border-white/5">
                <div 
                  className="bg-blue-500 h-1.5 rounded-full" 
                  style={{ width: `${occupancyRate}%` }} 
                />
             </div>
           </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <Card className="h-96">
            <CardHeader title="Block Floor-plan Heatmap" subtitle="Live occupancy based on Wi-Fi and door logs" />
            <div className="mt-4 h-64 bg-surface-darker rounded-xl border border-white/5 flex items-center justify-center relative overflow-hidden">
               {/* Decorative Heatmap placeholder */}
               <div className="grid grid-cols-4 gap-2 p-4 w-full h-full opacity-60">
                 {Array.from({length: 16}).map((_, i) => (
                    <div key={i} className={`rounded-lg ${i === 5 || i === 10 ? 'bg-alert-warning/50' : i === 2 ? 'bg-alert-critical/50 pulse' : 'bg-accent-teal/20'}`} />
                 ))}
               </div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <Badge variant="info">Floor 3 Focus Active</Badge>
               </div>
            </div>
         </Card>

         <div className="space-y-6">
            <Card className="border-alert-critical/20 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1 h-full bg-alert-critical animate-pulse" />
               <CardHeader title="Silent SOS Feed" />
               <div className="mt-4 p-3 bg-surface-darker border border-alert-critical/30 rounded-xl">
                  <div className="flex justify-between items-center mb-1">
                     <span className="font-bold text-alert-critical text-sm">Room 302</span>
                     <span className="text-xs text-slate-400">2 mins ago</span>
                  </div>
                  <p className="text-sm text-slate-300">Triggered by Student #1042. nearest counselor notified.</p>
                  <button className="mt-3 w-full bg-alert-critical text-white py-2 rounded-lg text-sm font-bold">Acknowledge & Respond</button>
               </div>
            </Card>

            <Card>
               <CardHeader title="Night Distress Log" subtitle="11pm - 4am anomalies" />
               <div className="mt-4 space-y-3">
                 <div className="flex items-center justify-between p-3 bg-surface-darker/50 rounded-xl border border-white/5">
                   <div>
                     <p className="text-sm text-white font-medium">Room 114</p>
                     <p className="text-xs text-slate-400">Wi-Fi inactive, Motion absent</p>
                   </div>
                   <Badge variant="warning">3rd Night</Badge>
                 </div>
                 <div className="flex items-center justify-between p-3 bg-surface-darker/50 rounded-xl border border-white/5">
                   <div>
                     <p className="text-sm text-white font-medium">Room 208</p>
                     <p className="text-xs text-slate-400">Late night entry (3:15 AM)</p>
                   </div>
                   <Badge variant="normal">Log</Badge>
                 </div>
               </div>
            </Card>
         </div>
      </div>

      {/* Hostel Roster Table */}
      <Card className="overflow-hidden flex flex-col">
         <div className="flex justify-between items-center mb-4">
            <CardHeader title="Live Hostel Roster - Block B" subtitle={`Current status of ${allocations.length} signed occupants`} />
            <div className="relative w-64 pr-4">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-[10px] text-slate-500" />
              <input type="text" placeholder="Search Room or ID..." className="w-full bg-surface-dark border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-sm text-white focus:outline-none focus:border-amber-500/50" />
            </div>
         </div>
         <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
               <thead>
                  <tr className="border-y border-white/5 bg-surface-darker/50 text-xs uppercase tracking-wider text-slate-500">
                     <th className="px-4 py-3 font-medium">Room</th>
                     <th className="px-4 py-3 font-medium">Student Name</th>
                     <th className="px-4 py-3 font-medium">Campus ID</th>
                     <th className="px-4 py-3 font-medium">Status / Location</th>
                     <th className="px-4 py-3 font-medium text-right relative right-2">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5 text-sm">
                  {loading ? (
                    <tr><td colSpan={5} className="p-4 text-center text-slate-400">Loading roster...</td></tr>
                  ) : allocations.map((allocation) => (
                     <tr key={allocation.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-4 py-3 font-mono font-medium text-amber-500">{allocation.room}</td>
                        <td className="px-4 py-3 font-medium text-white">{allocation.user?.name}</td>
                        <td className="px-4 py-3 text-slate-400 font-mono text-xs">{allocation.userId}</td>
                        <td className="px-4 py-3">
                           <div className="flex items-center gap-2">
                              {allocation.user?.status === 'Active' ? (
                                <><CheckCircle2 className="w-4 h-4 text-accent-teal" /><span className="text-slate-300 text-xs">Present (In Block)</span></>
                              ) : (
                                <><MapPin className="w-4 h-4 text-slate-500" /><span className="text-slate-400 text-xs text-italic">Away</span></>
                              )}
                           </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                           <button 
                             onClick={() => {
                               setSelectedStudent(allocation);
                               setReallocateModalOpen(true);
                             }}
                             className="text-xs bg-surface-dark border border-white/10 hover:border-amber-500/50 text-slate-300 px-3 py-1.5 rounded-md transition-colors mr-2"
                           >
                              Reallocate
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </Card>

      {/* Reallocation Modal */}
      {reallocateModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <Card className="w-full max-w-md border-amber-500/30 p-6 animate-in zoom-in-95 duration-200">
             <h3 className="text-xl font-heading font-semibold text-white mb-2">Reallocate Student</h3>
             <p className="text-sm text-slate-400 mb-6">
                Move <strong className="text-white">{selectedStudent.user?.name}</strong> ({selectedStudent.userId}) from Room {selectedStudent.room} to a new available room.
             </p>
             
             <div className="space-y-4">
               <div>
                  <label className="text-xs font-medium text-slate-400 uppercase">Target Block</label>
                  <input type="text" value="Block B" disabled className="mt-1 w-full bg-surface-dark border border-white/5 rounded-lg px-3 py-2 text-sm text-slate-500" />
               </div>
               <div>
                  <label className="text-xs font-medium text-accent-teal uppercase">New Room No.</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 104"
                    value={newRoomNo}
                    onChange={(e) => setNewRoomNo(e.target.value)}
                    className="mt-1 w-full bg-surface-dark border border-accent-teal/30 focus:border-accent-teal rounded-lg px-3 py-2 text-sm text-white focus:outline-none" 
                  />
                  <p className="text-[10px] text-slate-500 mt-1 pl-1">Input exactly the 3-digit room number to assign.</p>
               </div>
               
               <div className="pt-4 flex gap-3">
                  <button 
                    onClick={() => setReallocateModalOpen(false)}
                    className="flex-1 bg-surface-dark hover:bg-white/5 border border-white/10 text-slate-300 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleReallocate}
                    disabled={!newRoomNo}
                    className="flex-1 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-500 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm Move
                  </button>
               </div>
             </div>
          </Card>
        </div>
      )}

    </div>
  );
}
