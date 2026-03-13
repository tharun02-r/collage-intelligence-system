"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Filter, Search, AlertTriangle, ShieldAlert, MessageSquare, Clock, Loader2 } from "lucide-react";

const mockLogs = [
  {
    id: "LOG-88219",
    timestamp: "10 mins ago",
    risk: "Critical",
    trigger: "Suicide Ideation",
    excerpt: "I just can't do this anymore. What's the point of trying if I'm going to fail anyway? I just want everything to stop.",
    tags: ["Academic Stress", "Hopelessness"],
    patientId: "S-10492"
  },
  {
    id: "LOG-88218",
    timestamp: "1 hour ago",
    risk: "Elevated",
    trigger: "Severe Anxiety",
    excerpt: "My chest is so tight I can't breathe. The midterm is tomorrow and I haven't slept in two days. I'm going to disappoint everyone.",
    tags: ["Sleep Deprivation", "Performance Anxiety"],
    patientId: "ANONYMIZED"
  },
  {
    id: "LOG-88217",
    timestamp: "3 hours ago",
    risk: "Elevated",
    trigger: "Isolation",
    excerpt: "I haven't talked to anyone all week. It feels like nobody would even notice if I just disappeared from campus.",
    tags: ["Social Isolation", "Depression"],
    patientId: "ANONYMIZED"
  }
];

export default function CounselorLogsPage() {
  const [logs, setLogs] = useState<any[]>(mockLogs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/counselor/logs')
      .then(res => res.json())
      .then(data => {
        if(data && data.length > 0) {
           setLogs(data.map((log: any) => ({
             id: log.id,
             timestamp: new Date(log.date).toLocaleTimeString(),
             risk: log.sentiment === 'Critical' ? 'Critical' : 'Elevated',
             trigger: 'System Intercept',
             excerpt: log.content,
             tags: [log.sentiment],
             patientId: log.userId
           })));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
           <h1 className="text-2xl md:text-3xl font-heading font-semibold text-white tracking-tight flex items-center gap-3">
             NLP Intercept Logs <Badge variant="info">Counselor View</Badge>
           </h1>
           <p className="text-slate-400 mt-1">Review flagged, anonymized transcripts from the CampusMind student chatbot.</p>
         </div>
         <div className="flex gap-3">
           <button className="bg-surface-dark border border-white/10 hover:bg-white/5 text-white px-4 py-2 rounded-xl transition-colors font-medium flex items-center gap-2 text-sm">
             <ShieldAlert className="w-4 h-4 text-alert-critical" /> Export Critical Logs
           </button>
         </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
             <Card className="p-0 overflow-hidden">
                <div className="p-4 border-b border-white/5 bg-surface-darker/50">
                   <div className="relative">
                     <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                     <input type="text" placeholder="Search transcripts..." className="w-full bg-surface-dark border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-accent-purple/50" />
                   </div>
                </div>
                <div className="divide-y divide-white/5 h-[600px] overflow-y-auto">
                   {loading ? (
                      <div className="p-8 text-center text-slate-400 flex flex-col items-center">
                         <Loader2 className="w-5 h-5 animate-spin mb-2 text-accent-teal" />
                         Syncing Logs...
                      </div>
                   ) : logs.map((log, idx) => (
                      <div key={log.id} className={`p-4 cursor-pointer transition-colors ${idx === 0 ? 'bg-white/5 border-l-2 border-l-alert-critical' : 'hover:bg-white/[0.02] border-l-2 border-l-transparent'}`}>
                         <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-mono text-slate-500">{log.id}</span>
                            <span className="text-[10px] text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {log.timestamp}</span>
                         </div>
                         <h4 className="text-sm font-medium text-white mb-1 flex items-center gap-2">
                            {idx === 0 && <AlertTriangle className="w-3.5 h-3.5 text-alert-critical" />}
                            {log.trigger}
                         </h4>
                         <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">"{log.excerpt}"</p>
                      </div>
                   ))}
                </div>
             </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
             <Card className="h-full flex flex-col border-alert-critical/20">
                <div className="flex justify-between items-start p-6 border-b border-white/5 bg-alert-critical/5 rounded-t-xl">
                   <div>
                      <div className="flex items-center gap-3 mb-2">
                         <Badge variant="critical" className="animate-pulse">Active SOS Protocol</Badge>
                         <span className="text-sm text-slate-400 font-mono">ID: LOG-88219</span>
                      </div>
                      <h2 className="text-xl font-semibold text-white">NLP Trigger: High-Risk Suicide Ideation</h2>
                   </div>
                   <div className="text-right">
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Identity Revealed</p>
                      <button className="text-sm font-medium text-accent-teal hover:underline font-mono">Student: S-10492</button>
                   </div>
                </div>
                
                <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-surface-darker/30">
                   <div className="flex flex-col gap-1 max-w-[80%]">
                      <span className="text-[10px] text-slate-500 ml-4 font-mono">14:02 - User S-10492</span>
                      <div className="bg-surface-dark border border-alert-critical/30 text-slate-200 p-4 rounded-2xl rounded-tl-sm text-sm leading-relaxed">
                         I just can't do this anymore. <span className="bg-alert-critical/20 text-alert-critical font-medium px-1 rounded">What's the point of trying if I'm going to fail anyway?</span> I just want everything to stop.
                      </div>
                   </div>

                   <div className="flex flex-col gap-1 max-w-[80%] self-end items-end ml-auto">
                      <span className="text-[10px] text-accent-purple ml-4 font-mono">14:02 - CampusMind AI</span>
                      <div className="bg-accent-purple/10 border border-accent-purple/20 text-accent-purple p-4 rounded-2xl rounded-tr-sm text-sm leading-relaxed">
                         I hear how incredibly overwhelmed and exhausted you are right now. You are not alone in this, and I am here with you. Because I care about your safety, I'm connecting us with a human counselor immediately. Can you stay on this chat with me?
                      </div>
                   </div>
                   
                   <div className="flex items-center justify-center gap-4 my-8">
                      <div className="h-px bg-white/10 flex-1" />
                      <span className="text-xs text-alert-critical font-medium bg-alert-critical/10 px-3 py-1 rounded-full border border-alert-critical/20">
                         Emergency Protocol Initiated
                      </span>
                      <div className="h-px bg-white/10 flex-1" />
                   </div>
                </div>

                <div className="p-4 border-t border-white/5 bg-surface-darker/80 mt-auto rounded-b-xl">
                   <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">NLP Extracted Risk Tags</h4>
                   <div className="flex gap-2">
                      <Badge variant="warning" className="bg-transparent border-white/10 text-slate-300">Academic Stress</Badge>
                      <Badge variant="warning" className="bg-transparent border-white/10 text-slate-300">Hopelessness</Badge>
                      <Badge variant="warning" className="bg-transparent border-white/10 text-slate-300">Lethargy</Badge>
                   </div>
                   
                   <div className="mt-6 flex justify-end gap-3">
                      <button className="bg-surface-dark border border-white/10 hover:bg-white/5 text-white px-6 py-2 rounded-lg transition-colors text-sm font-medium">
                         Mark False Positive
                      </button>
                      <button className="bg-alert-critical hover:bg-alert-critical/80 text-white px-6 py-2 rounded-lg transition-colors text-sm font-medium shadow-lg shadow-alert-critical/20">
                         Take Over Chat
                      </button>
                   </div>
                </div>
             </Card>
          </div>
       </div>
    </div>
  );
}
