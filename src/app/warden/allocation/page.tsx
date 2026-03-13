"use client";

import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { BedDouble, CheckCircle2, Search, UserPlus, MapPin, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { clsx } from "clsx";

const B_BLOCK_FLOORS = [
  { floor: 1, capacity: 40, occupied: 38 },
  { floor: 2, capacity: 40, occupied: 39 },
  { floor: 3, capacity: 40, occupied: 37 },
];

export default function WardenAllocationPage() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [unallocatedStudents, setUnallocatedStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Real floor and room data could be fetched here, using mock structure for visual representation but true assignments will work.
  const [rooms, setRooms] = useState<any[]>([]);

  // Function to load initial data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [unallocatedRes, roomsRes] = await Promise.all([
        fetch('http://localhost:5000/api/hostel/unallocated'),
        fetch('http://localhost:5000/api/analytics/hostel')
      ]);

      if (unallocatedRes.ok) {
        setUnallocatedStudents(await unallocatedRes.json());
      }
      if (roomsRes.ok) {
        setRooms(await roomsRes.json());
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleAllocate = async () => {
    if (!selectedStudent || !selectedRoom) return;

    try {
      const res = await fetch('http://localhost:5000/api/hostel/allocate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: selectedStudent.id, room: selectedRoom, block: 'Block B' })
      });

      if (res.ok) {
        // Clear selection, refresh data
        setSelectedStudent(null);
        setSelectedRoom(null);
        await fetchData();
        // Give a little visual feedback (could replace with proper toast)
        alert('Allocation Successful!');
      } else {
        const error = await res.json();
        alert(`Allocation failed: ${error.error}`);
      }
    } catch (error) {
      console.log('Error allocating:', error);
    }
  };

  const handleVacate = async (roomNo: string) => {
    // Determine which user is in this room. In a real scenario, you'd fetch the specific allocation list to find the userId.
    // For this simulation given our current API limits without a dedicated get-room-occupants route, 
    // we'll ask the backend for all allocations to find the matching user ID for this room.
    
    try {
      const allocsRes = await fetch('http://localhost:5000/api/hostel/allocations');
      if (!allocsRes.ok) throw new Error("Could not fetch allocations");
      
      const allocations = await allocsRes.json();
      const occupant = allocations.find((a: any) => a.room === roomNo && a.block === 'Block B');
      
      if (!occupant) {
          alert('No specific student record found linked to this room.');
          return;
      }

      if(!confirm(`Are you sure you want to vacate ${occupant.user?.name} from room ${roomNo}?`)) return;

      const vacateRes = await fetch('http://localhost:5000/api/hostel/vacate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: occupant.userId })
      });

      if (vacateRes.ok) {
          setSelectedRoom(null);
          await fetchData();
          alert('Room successfully vacated!');
      } else {
          alert('Failed to vacate room.');
      }
    } catch (error) {
        console.error("Vacate Error:", error);
    }
  };

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
                  {isLoading ? (
                     <p className="text-sm text-slate-400 p-4">Loading students...</p>
                  ) : unallocatedStudents.length === 0 ? (
                     <p className="text-sm text-slate-400 p-4">All students are allocated.</p>
                  ) : (
                     unallocatedStudents.map((student, i) => (
                        <div key={i} className={clsx(
                              "p-3 border rounded-xl transition-colors cursor-pointer group",
                              selectedStudent?.id === student.id 
                                 ? "bg-accent-teal/10 border-accent-teal" 
                                 : "bg-surface-darker border-white/5 hover:border-accent-purple/30"
                           )}
                           onClick={() => setSelectedStudent(student)}
                        >
                           <div className="flex justify-between items-start mb-1">
                              <span className={clsx("font-semibold transition-colors", 
                                 selectedStudent?.id === student.id ? "text-accent-teal" : "text-white group-hover:text-accent-purple"
                              )}>
                                 {student.name}
                              </span>
                              <span className="text-xs font-mono text-slate-500">{student.id}</span>
                           </div>
                           <p className="text-xs text-slate-400 mb-3">{student.course}</p>
                           <div className="flex justify-between items-center">
                              <Badge variant={student.status.includes('Pending') ? 'warning' : 'info'} className="text-[10px] scale-90 origin-left border-transparent">
                                 {student.status}
                              </Badge>
                              <button 
                                 className={clsx(
                                    "text-xs font-medium px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5",
                                    selectedStudent?.id === student.id
                                       ? "bg-accent-teal text-surface-dark hover:bg-accent-teal/90"
                                       : "bg-surface-dark border border-white/10 hover:bg-accent-teal/20 hover:text-accent-teal text-slate-300"
                                 )}
                              >
                                 {selectedStudent?.id === student.id ? <CheckCircle2 className="w-3.5 h-3.5" /> : <UserPlus className="w-3.5 h-3.5" />} 
                                 {selectedStudent?.id === student.id ? 'Selected' : 'Assign'}
                              </button>
                           </div>
                        </div>
                     ))
                  )}
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
                           
                           // Using live room data if available
                           const roomData = rooms.find(r => r.roomNo === roomNumber && r.block === 'Block B');
                           
                           // If backend data is loaded, use it. Otherwise fallback to mock pattern
                           const isAvailable = roomData ? roomData.status === 'Available' : (idx === 3 || idx === 8);
                           const isSelected = selectedRoom === roomNumber;

                           return (
                              <button 
                                 key={idx}
                                 onClick={() => setSelectedRoom(roomNumber)}
                                 className={clsx(
                                    "h-16 rounded-xl border-2 flex flex-col items-center justify-center transition-all relative overflow-hidden group cursor-pointer",
                                    isAvailable ? "hover:scale-105" : "hover:border-rose-500/50",
                                    isSelected ? "bg-accent-teal/20 border-accent-teal shadow-[0_0_15px_rgba(13,148,136,0.2)]" : 
                                    isAvailable ? "bg-surface-dark border-accent-teal/50 hover:bg-accent-teal/10 hover:border-accent-teal" : 
                                    "bg-surface-darker border-white/5"
                                 )}
                              >
                                 {isSelected && isAvailable && <div className="absolute top-1 right-1"><CheckCircle2 className="w-3 h-3 text-accent-teal" /></div>}
                                 <span className={clsx(
                                    "font-mono font-medium",
                                    isSelected ? "text-accent-teal" : isAvailable ? "text-slate-300" : "text-slate-600 group-hover:text-rose-400"
                                 )}>
                                    {roomNumber}
                                 </span>
                                 
                                 {/* Hover action for occupied rooms */}
                                 {isSelected && !isAvailable && (
                                     <div className="absolute inset-0 bg-surface-darker/90 flex items-center justify-center backdrop-blur-sm">
                                         <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">Vacate</span>
                                     </div>
                                 )}
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
                        <span className="text-sm text-slate-400">
                            {(() => {
                                const roomData = rooms.find(r => r.roomNo === selectedRoom && r.block === 'Block B');
                                const isAvail = roomData ? roomData.status === 'Available' : true;
                                if (!isAvail) return "Room is currently occupied. You can vacate it.";
                                if (!selectedStudent) return "Select a student from the pending list to allocate.";
                                return `Ready to allocate ${selectedStudent.name}.`;
                            })()}
                        </span>
                     </div>
                  ) : (
                     <div className="flex items-center gap-2 text-sm text-amber-500">
                        <AlertCircle className="w-4 h-4" /> Please select a room from the map.
                     </div>
                  )}
                  {(() => {
                      const roomData = rooms.find(r => r.roomNo === selectedRoom && r.block === 'Block B');
                      const isAvail = roomData ? roomData.status === 'Available' : true;
                      
                      if (!isAvail && selectedRoom) {
                          return (
                            <button 
                                onClick={() => handleVacate(selectedRoom)}
                                className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500 hover:text-white shadow-none"
                            >
                                Vacate Room
                            </button>
                          );
                      }

                      return (
                         <button 
                            disabled={!selectedRoom || !selectedStudent}
                            onClick={handleAllocate}
                            className={clsx(
                               "px-6 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg",
                               selectedRoom && selectedStudent
                                  ? "bg-accent-teal text-surface-dark hover:bg-accent-teal/90 shadow-accent-teal/20 hover:shadow-accent-teal/40" 
                                  : "bg-surface-dark border border-white/10 text-slate-500 cursor-not-allowed shadow-none"
                            )}
                         >
                            Confirm Allocation
                         </button>
                      );
                  })()}
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}
