"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ShieldCheck, Video, Radio, Activity, AlertTriangle } from "lucide-react";

export default function SecurityFeeds() {
  return (
    <MainLayout role="admin">
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-semibold text-white tracking-tight flex items-center gap-3">
            Security Feeds <Badge variant="critical" className="animate-pulse">Live</Badge>
          </h1>
          <p className="text-slate-400 mt-1">Real-time IoT and camera feeds from campus access points.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           {/* Feed 1 */}
           <Card className="overflow-hidden p-0 relative group">
              <div className="h-48 bg-surface-darker/80 flex items-center justify-center border-b border-white/5 relative">
                 <Video className="w-12 h-12 text-slate-600 group-hover:text-accent-teal transition-colors" />
                 <div className="absolute top-3 left-3 flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-alert-critical rounded-full animate-pulse" />
                    <span className="text-xs font-mono font-medium text-white mix-blend-difference">CAM-01: Main Gate</span>
                 </div>
              </div>
              <div className="p-4 flex justify-between items-center">
                 <div>
                    <h4 className="text-sm font-semibold text-white">Status: Active</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Bandwidth: 4.2 MB/s</p>
                 </div>
                 <Badge variant="normal">Secure</Badge>
              </div>
           </Card>

           {/* Feed 2 */}
           <Card className="overflow-hidden p-0 relative group">
              <div className="h-48 bg-surface-darker/80 flex items-center justify-center border-b border-white/5 relative">
                 <Radio className="w-12 h-12 text-slate-600 group-hover:text-alert-warning transition-colors" />
                 <div className="absolute top-3 left-3 flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-alert-critical rounded-full animate-pulse" />
                    <span className="text-xs font-mono font-medium text-white mix-blend-difference">DRONE-A: Perimeter Patrol</span>
                 </div>
              </div>
              <div className="p-4 flex justify-between items-center bg-alert-warning/5">
                 <div>
                    <h4 className="text-sm font-semibold text-alert-warning">Status: Analyzing Object</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Altitude: 120ft</p>
                 </div>
                 <Badge variant="warning">Scanning</Badge>
              </div>
           </Card>

           {/* Feed 3 */}
           <Card className="overflow-hidden p-0 relative group border-alert-critical/30">
              <div className="h-48 bg-alert-critical/5 flex items-center justify-center border-b border-alert-critical/20 relative">
                 <AlertTriangle className="w-12 h-12 text-alert-critical animate-pulse" />
                 <div className="absolute top-3 left-3 flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-alert-critical rounded-full" />
                    <span className="text-xs font-mono font-medium text-white mix-blend-difference">CAM-14: Engineering Block B</span>
                 </div>
              </div>
              <div className="p-4 flex justify-between items-center bg-alert-critical/10">
                 <div>
                    <h4 className="text-sm font-bold text-alert-critical">Status: Motion Detected</h4>
                    <p className="text-xs text-alert-critical mt-0.5">After-hours access attempted</p>
                 </div>
                 <Badge variant="critical">Alert</Badge>
              </div>
           </Card>
        </div>
      </div>
    </MainLayout>
  );
}
