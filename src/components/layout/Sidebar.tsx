import { useState } from "react";
import { 
  ShieldAlert, 
  LayoutDashboard, 
  Users, 
  Activity, 
  FileText, 
  Settings,
  MessageSquare,
  BedDouble,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Radio,
  Hexagon,
  HeartPulse,
  Database,
  UserCheck,
  PieChart as pieChart
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

interface SidebarProps {
  role: "counselor" | "student" | "warden" | "faculty" | "admin" | "facility" | "socc";
}

export function Sidebar({ role }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const getNavItems = () => {
    switch(role) {
      case "counselor":
        return [
          { icon: ShieldAlert, label: "Risk Monitor", href: "/counselor" },
          { icon: Users, label: "Student Roster", href: "/counselor/roster" },
          { icon: MessageSquare, label: "CampusMind Logs", href: "/counselor/logs" },
          { icon: FileText, label: "Intervention Reports", href: "/counselor/reports" },
          { icon: Settings, label: "Settings", href: "/counselor/settings" },
        ];
      case "student":
        return [
          { icon: Activity, label: "Wellness Hub", href: "/student" },
          { icon: MessageSquare, label: "CampusMind", href: "/student/chat" },
          { icon: GraduationCap, label: "Academics", href: "/student/academics" },
          { icon: Settings, label: "Settings", href: "/student/settings" },
        ];
      case "faculty":
        return [
          { icon: LayoutDashboard, label: "Observation Deck", href: "/faculty" },
          { icon: Users, label: "My Classes", href: "/faculty/classes" },
          { icon: UserCheck, label: "Take Attendance", href: "/faculty/attendance" },
          { icon: FileText, label: "Academic Reports", href: "/faculty/reports" },
          { icon: Settings, label: "Settings", href: "/faculty/settings" },
        ];
      case "socc":
        return [
          { icon: ShieldAlert, label: "Operations Center", href: "/socc" },
          { icon: Radio, label: "Drone Feeds", href: "#" },
          { icon: Hexagon, label: "Virtual Fence", href: "#" },
          { icon: Settings, label: "Settings", href: "/socc/settings" },
        ];
      case "warden":
        return [
          { icon: Activity, label: "Hostel View", href: "/warden" },
          { icon: BedDouble, label: "Room Allocations", href: "/warden/allocation" },
          { icon: Settings, label: "Settings", href: "/warden/settings" },
        ];
      case "admin":
        return [
          { icon: Activity, label: "Command Center", href: "/admin" },
          { icon: ShieldAlert, label: "Security Feeds", href: "#" },
          { icon: Database, label: "Audit Logs", href: "#" },
          { icon: Users, label: "User Directory", href: "#" },
          { icon: Settings, label: "Settings", href: "/admin/settings" },
        ];
      default:
        return [
          { icon: LayoutDashboard, label: "Dashboard", href: `/${role}` },
          { icon: Settings, label: "Settings", href: `/${role}/settings` },
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <aside 
      className={clsx(
        "hidden md:flex flex-col h-screen sticky top-0 bg-surface-darker border-r border-white/5 transition-all duration-300 z-40",
        collapsed ? "w-[64px]" : "w-[240px]"
      )}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/5 shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-accent-teal" />
            <span className="font-heading font-semibold text-lg tracking-tight text-white">CampusGuard</span>
          </div>
        )}
        {collapsed && <ShieldAlert className="w-6 h-6 text-accent-teal mx-auto" />}
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item, idx) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={idx} 
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors group relative",
                isActive 
                  ? "bg-accent-teal/10 text-accent-teal" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={clsx("w-5 h-5 shrink-0", isActive ? "text-accent-teal" : "text-slate-400 group-hover:text-white")} />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              {isActive && !collapsed && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-accent-teal rounded-r-full" />
              )}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t border-white/5 shrink-0">
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center py-2 text-slate-400 hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <div className="flex items-center gap-2 text-sm font-medium"><ChevronLeft className="w-4 h-4" /> Collapse</div>}
        </button>
      </div>
      
      <div className="p-3 pb-6 shrink-0">
         <button 
           onClick={() => router.push('/login')}
           className={clsx(
            "flex items-center gap-3 px-3 py-2.5 w-full rounded-xl transition-colors text-slate-400 hover:text-alert-critical hover:bg-alert-critical/10",
            collapsed && "justify-center"
         )}>
           <LogOut className="w-5 h-5 shrink-0" />
           {!collapsed && <span className="text-sm font-medium">Sign Out</span>}
         </button>
      </div>
    </aside>
  );
}
