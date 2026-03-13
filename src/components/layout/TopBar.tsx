import { Bell, Search, User, Menu, ShieldAlert } from "lucide-react";

interface TopBarProps {
  role: string;
  alertCount: number;
}

export function TopBar({ role, alertCount }: TopBarProps) {
  return (
    <header className="h-16 bg-surface-darker/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button className="md:hidden text-slate-400 hover:text-white">
          <Menu className="w-6 h-6" />
        </button>
        
        {/* Mobile Title */}
        <div className="md:hidden font-heading font-semibold text-lg tracking-tight text-white flex items-center gap-2">
          <span className="text-accent-teal">/</span> CampusGuard
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center bg-surface-dark rounded-full px-4 py-1.5 border border-white/5 focus-within:border-accent-teal/50 transition-colors w-64 lg:w-96">
          <Search className="w-4 h-4 text-slate-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search students, alerts, or queries..." 
            className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 lg:gap-6">
        
        {/* Privacy Consent Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-alert-normal/10 border border-alert-normal/20 rounded-full cursor-pointer hover:bg-alert-normal/20 transition-colors group relative">
           <ShieldAlert className="w-4 h-4 text-alert-normal" />
           <span className="text-[10px] font-bold text-alert-normal uppercase tracking-widest hidden md:block">Consent Active</span>
        </div>

        <button className="relative text-slate-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          {alertCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-alert-critical text-[9px] font-bold text-white ring-2 ring-surface-darker">
              {alertCount > 99 ? '99+' : alertCount}
            </span>
          )}
        </button>

        <div className="h-8 w-[1px] bg-white/10 hidden md:block"></div>

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium text-white group-hover:text-accent-teal transition-colors">
              {role === 'counselor' ? 'Dr. Sarah Chen' : 'Alex Mercer'}
            </div>
            <div className="text-[11px] uppercase tracking-wider text-slate-500">
              {role}
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-accent-teal to-accent-purple flex items-center justify-center ring-2 ring-surface-darker group-hover:ring-accent-teal/50 transition-all">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}
