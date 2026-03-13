"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Settings, Bell, Shield, Key } from "lucide-react";

export default function CounselorSettings() {
  return (
    <MainLayout role="counselor">
      <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-semibold text-white tracking-tight flex items-center gap-3">
            System Preferences <Badge variant="info">Counselor</Badge>
          </h1>
          <p className="text-slate-400 mt-1">Configure your alert thresholds and intervention communication settings.</p>
        </div>

        <Card>
          <CardHeader title="General Settings" />
          <div className="space-y-4 text-slate-300 text-sm">
            <p>Settings panel coming soon.</p>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
