"use client";

import { Card, CardHeader } from "@/components/ui/Card";
import { Settings as SettingsIcon, Bell, Lock, Shield, User, Smartphone } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-semibold text-white tracking-tight flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 text-slate-400" /> Account Settings
        </h1>
        <p className="text-slate-400 mt-1">Manage your preferences, privacy, and security settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-2">
           <button className="w-full text-left px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-medium flex items-center gap-3">
              <User className="w-5 h-5 text-accent-teal" /> Profile Information
           </button>
           <button className="w-full text-left px-4 py-3 hover:bg-white/5 text-slate-400 hover:text-white transition-colors rounded-xl font-medium flex items-center gap-3">
              <Shield className="w-5 h-5" /> Privacy & Consent
           </button>
           <button className="w-full text-left px-4 py-3 hover:bg-white/5 text-slate-400 hover:text-white transition-colors rounded-xl font-medium flex items-center gap-3">
              <Bell className="w-5 h-5" /> Notifications
           </button>
           <button className="w-full text-left px-4 py-3 hover:bg-white/5 text-slate-400 hover:text-white transition-colors rounded-xl font-medium flex items-center gap-3">
              <Lock className="w-5 h-5" /> Security
           </button>
        </div>

        <div className="lg:col-span-2 space-y-6">
           <Card>
              <CardHeader title="Profile Information" subtitle="Update your personal details" />
              <div className="mt-6 space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                       <label className="text-xs font-medium text-slate-400 uppercase tracking-widest">First Name</label>
                       <input type="text" defaultValue="Alex" className="w-full bg-surface-darker border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-teal transition-colors" />
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-xs font-medium text-slate-400 uppercase tracking-widest">Last Name</label>
                       <input type="text" defaultValue="Mercer" className="w-full bg-surface-darker border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-teal transition-colors" />
                    </div>
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-400 uppercase tracking-widest">Campus ID</label>
                    <input type="text" defaultValue="S-19042" disabled className="w-full bg-surface-darker border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-500 opacity-70 cursor-not-allowed" />
                 </div>
                 <button className="bg-white text-black font-semibold px-6 py-2.5 rounded-xl hover:bg-slate-200 transition-colors mt-4">Save Changes</button>
              </div>
           </Card>

           <Card className="border-accent-teal/20 bg-accent-teal/5">
              <CardHeader title="Device Sessions" subtitle="Manage your active logins" />
              <div className="mt-4 space-y-3">
                 <div className="flex items-center justify-between p-3 bg-surface-darker rounded-xl border border-white/5">
                    <div className="flex items-center gap-3">
                       <Smartphone className="w-5 h-5 text-accent-teal" />
                       <div>
                          <p className="text-sm font-medium text-white">iPhone 14 Pro Max &middot; Campus App</p>
                          <p className="text-xs text-slate-400">Current Session</p>
                       </div>
                    </div>
                    <span className="text-xs font-bold text-accent-teal uppercase tracking-widest">Active</span>
                 </div>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
