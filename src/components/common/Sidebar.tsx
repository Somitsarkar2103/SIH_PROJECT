import React from 'react';
import { 
  Home, 
  Map, 
  Plane, 
  Cpu, 
  Layers, 
  GitCompare, 
  CheckSquare, 
  BarChart3, 
  Download, 
  Settings, 
  HelpCircle, 
  Activity, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onOpenSystemStatus: () => void;
  onOpenHelp: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  collapsed,
  onToggleCollapse,
  onOpenSystemStatus,
  onOpenHelp
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-4 h-4" /> },
    { id: 'projects', label: 'Survey Projects', icon: <Map className="w-4 h-4" /> },
    { id: 'drone-imagery', label: 'Drone Imagery', icon: <Plane className="w-4 h-4" /> },
    { id: 'ai-extraction', label: 'AI Extraction', icon: <Cpu className="w-4 h-4" /> },
    { id: 'parcel-mapping', label: 'Parcel Mapping', icon: <Layers className="w-4 h-4" /> },
    { id: 'change-detection', label: 'Change Detection', icon: <GitCompare className="w-4 h-4" /> },
    { id: 'verification', label: 'Verification Queue', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics & Accuracy', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'exports', label: 'GIS Export Center', icon: <Download className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <aside
      className={`bg-slate-950 border-r border-slate-800 flex flex-col justify-between transition-all duration-200 z-20 select-none ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Top Nav Items */}
      <div className="py-3 px-2 space-y-1 overflow-y-auto">
        {menuItems.map(item => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-semibold shadow-sm'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100 border border-transparent'
              } ${collapsed ? 'justify-center px-0' : ''}`}
            >
              <div className={isActive ? 'text-cyan-400' : 'text-slate-400'}>
                {item.icon}
              </div>
              {!collapsed && <span className="truncate">{item.label}</span>}
              {!collapsed && item.id === 'verification' && (
                <span className="ml-auto bg-amber-500/20 text-amber-400 text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold">
                  37
                </span>
              )}
              {!collapsed && item.id === 'change-detection' && (
                <span className="ml-auto bg-rose-500/20 text-rose-400 text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold">
                  28
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Nav: Status, Help, Profile, Collapse */}
      <div className="p-2 border-t border-slate-800/80 space-y-1 bg-slate-950/80">
        <button
          onClick={onOpenSystemStatus}
          title={collapsed ? 'System Status' : undefined}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-400 hover:bg-slate-900 hover:text-emerald-400 transition-colors ${
            collapsed ? 'justify-center px-0' : ''
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-400 shrink-0" />
          {!collapsed && (
            <div className="flex items-center justify-between w-full">
              <span>System Status</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          )}
        </button>

        <button
          onClick={onOpenHelp}
          title={collapsed ? 'Help & Cadastral Manual' : undefined}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-400 hover:bg-slate-900 hover:text-white transition-colors ${
            collapsed ? 'justify-center px-0' : ''
          }`}
        >
          <HelpCircle className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Help & Docs</span>}
        </button>

        {/* Collapse Button */}
        <button
          onClick={onToggleCollapse}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-500 hover:bg-slate-900 hover:text-slate-300 transition-colors ${
            collapsed ? 'justify-center px-0' : ''
          }`}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span>Collapse Sidebar</span>}
        </button>
      </div>
    </aside>
  );
};
