"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { ReactNode } from "react";
import { Activity, MessageSquare, ShieldAlert, FileText, User, Bell, Radio, Map, HeartPulse, GraduationCap, Database } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface MainLayoutProps {
  children: ReactNode;
  role: "counselor" | "student" | "warden" | "faculty" | "admin" | "facility" | "socc";
  alertCount?: number;
}

export function MainLayout({ children, role, alertCount = 0 }: MainLayoutProps) {
  const pathname = usePathname();

  // Define tab navigation based on role
  const getMobileTabs = () => {
    switch (role) {
      case "student":
        return [
          { icon: Activity, label: "Hub", href: "/student" },
          { icon: MessageSquare, label: "Chat", href: "/student/chat" },
          { icon: Bell, label: "Academics", href: "/student/academics", badge: alertCount },
          { icon: User, label: "Settings", href: "/student/settings" },
        ];
      case "counselor":
        return [
          { icon: ShieldAlert, label: "Monitor", href: "/counselor" },
          { icon: FileText, label: "Reports", href: "/counselor/reports" },
          { icon: Bell, label: "Logs", href: "/counselor/logs", badge: alertCount },
          { icon: User, label: "Roster", href: "/counselor/roster" },
        ];
      case "facility":
         return [
            { icon: Activity, label: "Control", href: "/facility" },
            { icon: FileText, label: "Reports", href: "/counselor/reports" }, // Using counselor placeholder
            { icon: Bell, label: "Alerts", href: "#", badge: alertCount },
            { icon: User, label: "Profile", href: "#" },
         ];
      case "socc":
        return [
          { icon: Radio, label: "Ops", href: "/socc" },
          { icon: ShieldAlert, label: "Intercepts", href: "#", badge: alertCount },
          { icon: Map, label: "Map", href: "#" },
        ];
      case "admin":
        return [
           { icon: Activity, label: "Command", href: "/admin" },
           { icon: ShieldAlert, label: "Security", href: "#", badge: alertCount },
           { icon: Database, label: "Data", href: "#" },
           { icon: User, label: "Users", href: "#" },
        ];
      case "warden":
        return [
           { icon: Activity, label: "Hostel", href: "/warden" },
           { icon: Map, label: "Allocations", href: "/warden/allocation" },
           { icon: Bell, label: "Alerts", href: "#", badge: alertCount },
           { icon: User, label: "Profile", href: "#" },
        ];
      default:
        return [
          { icon: Activity, label: "Home", href: `/${role}` },
          { icon: Bell, label: "Academics", href: "/faculty/classes", badge: alertCount },
          { icon: FileText, label: "Reports", href: "/faculty/reports" },
        ];
    }
  };

  const tabs = getMobileTabs();

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden selection:bg-accent-teal selection:text-white pb-16 md:pb-0">
      <Sidebar role={role} />
      
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <TopBar role={role} alertCount={alertCount} />
        
        <main className="flex-1 overflow-y-auto w-full">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Tab Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface-darker/90 backdrop-blur-md border-t border-white/5 flex items-center justify-around z-40 px-2 pb-safe">
        {tabs.map((tab, idx) => {
          const isActive = pathname === tab.href;
          return (
            <Link 
              key={idx} 
              href={tab.href}
              className={clsx(
                "flex flex-col items-center justify-center w-full h-full space-y-1 relative",
                isActive ? "text-white" : "text-slate-500 hover:text-slate-300"
              )}
            >
              <div className="relative">
                 <tab.icon className={clsx("w-5 h-5", isActive && "text-accent-teal")} />
                 {tab.badge && tab.badge > 0 && (
                    <span className="absolute -top-1 -right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-alert-critical text-[8px] font-bold text-white ring-2 ring-surface-darker">
                      {tab.badge > 99 ? '99+' : tab.badge}
                    </span>
                 )}
              </div>
              <span className="text-[10px] font-medium">{tab.label}</span>
              {isActive && (
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-accent-teal rounded-b-full shadow-[0_0_10px_rgba(13,148,136,0.5)]" />
              )}
            </Link>
          )
        })}
      </nav>
    </div>
  );
}
