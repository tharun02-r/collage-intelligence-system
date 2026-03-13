"use client";

import { useState } from "react";
import { ShieldAlert, Activity, Users, Settings, BedDouble, ArrowRight, Lock, User, HelpCircle, HeartPulse, Radio } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { Card } from "@/components/ui/Card";
import { motion, AnimatePresence } from "framer-motion";

type Role = "student" | "counselor" | "warden" | "faculty" | "admin" | "socc";

const roles: { id: Role, label: string, icon: any, color: string, href: string, glow: string }[] = [
  { id: "student", label: "Student", icon: Activity, color: "text-accent-teal", href: "/student", glow: "rgba(13,148,136,0.3)" },
  { id: "counselor", label: "Counselor", icon: Users, color: "text-accent-purple", href: "/counselor", glow: "rgba(139,92,246,0.3)" },
  { id: "faculty", label: "Faculty", icon: Settings, color: "text-blue-500", href: "/faculty", glow: "rgba(59,130,246,0.3)" },
  { id: "warden", label: "Warden", icon: BedDouble, color: "text-amber-500", href: "/warden", glow: "rgba(245,158,11,0.3)" },
  { id: "admin", label: "Admin", icon: ShieldAlert, color: "text-yellow-500", href: "/admin", glow: "rgba(234,179,8,0.3)" },
  { id: "socc", label: "SOCC Team", icon: Radio, color: "text-alert-critical", href: "/socc", glow: "rgba(239,68,68,0.3)" },
];

export default function Login() {
  const [activeRole, setActiveRole] = useState<Role>("student");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const activeRoleData = roles.find(r => r.id === activeRole)!;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate OAuth / JWT auth delay
    setTimeout(() => {
      router.push(activeRoleData.href);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-white flex flex-col selection:bg-accent-teal selection:text-white relative overflow-hidden">
      
      {/* Background ambient glow based on active role */}
      <AnimatePresence mode="wait">
        <motion.div 
           key={activeRole}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.5 }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none opacity-20"
           style={{ background: `radial-gradient(circle, ${activeRoleData.glow} 0%, transparent 70%)` }}
        />
      </AnimatePresence>

      <div className="flex-1 flex items-center justify-center p-4 relative z-10 w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 w-full items-center">
          
          {/* Left Hero Branging */}
          <div className="hidden lg:flex flex-col space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-surface-dark border border-white/10 flex items-center justify-center relative">
                 <ShieldAlert className="w-7 h-7 text-accent-teal" />
                 <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
              </div>
              <h1 className="text-3xl font-heading font-bold tracking-tight">CampusGuard <span className="text-accent-purple">AI</span></h1>
            </div>
            
            <h2 className="text-5xl font-heading font-bold leading-tight">Intelligent Protection.<br/>Compassionate Care.</h2>
            <p className="text-lg text-slate-400 max-w-md">
              A unified behavioral analytics platform ensuring safety, well-being, and operational excellence across the campus.
            </p>
            
            <div className="pt-8 grid grid-cols-2 gap-4">
               <div className="bg-surface-darker border border-white/5 p-4 rounded-2xl flex items-center gap-4">
                  <div className="bg-white/5 p-2 rounded-lg text-accent-teal"><Activity className="w-5 h-5"/></div>
                  <div>
                    <h4 className="font-semibold text-sm">Real-time MSRS</h4>
                    <p className="text-xs text-slate-500">Anomaly detection</p>
                  </div>
               </div>
               <div className="bg-surface-darker border border-white/5 p-4 rounded-2xl flex items-center gap-4">
                  <div className="bg-white/5 p-2 rounded-lg text-accent-purple"><User className="w-5 h-5"/></div>
                  <div>
                    <h4 className="font-semibold text-sm">Role-Based Access</h4>
                    <p className="text-xs text-slate-500">Zero-trust privacy</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Login Widget */}
          <div className="w-full max-w-md mx-auto">
             
             {/* Role Selector Tabs */}
             <div className="flex gap-1 mb-6 bg-surface-dark p-1 rounded-2xl border border-white/5 overflow-x-auto no-scrollbar">
               {roles.map((r) => (
                 <button 
                   key={r.id}
                   onClick={() => setActiveRole(r.id)}
                   className={clsx(
                     "flex items-center gap-2 py-2 px-3 lg:px-4 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
                     activeRole === r.id 
                       ? `bg-surface-darker shadow-sm border border-white/10 text-white` 
                       : "text-slate-400 hover:text-white hover:bg-white/5"
                   )}
                 >
                   <r.icon className={clsx("w-4 h-4", activeRole === r.id ? r.color : "text-slate-500")} />
                   {r.label}
                 </button>
               ))}
             </div>

             {/* Login Form Card */}
             <Card className="shadow-2xl shadow-black/50 border-white/10 bg-surface-dark/90 backdrop-blur-xl">
               <div className="mb-8">
                 <h3 className="text-2xl font-heading font-semibold text-white">Sign In</h3>
                 <p className="text-slate-400 text-sm mt-1">Accessing secure portal as <strong className={activeRoleData.color}>{activeRoleData.label}</strong></p>
               </div>

               <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-1.5">
                     <label className="text-xs font-medium text-slate-400 uppercase tracking-widest">Campus ID / Email</label>
                     <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                          type="text" 
                          required
                          placeholder={activeRole === 'student' ? 'e.g. S-19042' : 'name@university.edu'} 
                          className="w-full bg-surface-darker border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-white/30 transition-colors"
                        />
                     </div>
                  </div>

                  <div className="space-y-1.5">
                     <div className="flex items-center justify-between">
                       <label className="text-xs font-medium text-slate-400 uppercase tracking-widest">Password</label>
                       <a href="#" className="text-xs text-accent-teal hover:underline transition-all">Forgot password?</a>
                     </div>
                     <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                          type="password" 
                          required
                          placeholder="••••••••" 
                          className="w-full bg-surface-darker border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-white/30 transition-colors"
                        />
                     </div>
                  </div>

                  <button 
                    disabled={isLoading}
                    type="submit" 
                    className={clsx(
                      "w-full py-3 mt-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg",
                      isLoading ? "opacity-70 cursor-not-allowed bg-surface-darker border border-white/10 text-slate-400" : "bg-white text-black hover:bg-slate-200"
                    )}
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>Authenticate Securely <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
               </form>

               <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center">
                  <button className="text-xs text-slate-500 hover:text-white transition-colors flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" /> Contact IT Support
                  </button>
               </div>
             </Card>

             {/* Dynamic Privacy Notice */}
             <div className="mt-6 text-center">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                  CampusGuard AI uses AES-256 Encryption & Strict RBAC Policies.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
