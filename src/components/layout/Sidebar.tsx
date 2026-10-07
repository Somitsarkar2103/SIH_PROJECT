import React, { useState } from 'react';
import {
  LayoutDashboard,
  Map as MapIcon,
  Plane,
  Cpu,
  Ruler,
  GitCompare,
  CheckSquare,
  BarChart3,
  Download,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  User,
  Activity,
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NavigationTab } from '../../types/common';

export const Sidebar: React.FC = () => {
  const { currentTab, setCurrentTab, selectedProject, parcels } = useApp();
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const pendingVerificationCount = parcels.filter(p => p.properties.status === 'review').length;
  const changeAnomaliesCount = parcels.filter(p => p.properties.changeDetected).length;

  const navItems: { id: NavigationTab; label: string; icon: React.FC<{ className?: string }>; badge?: number; badgeColor?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Survey Projects', icon: MapIcon },
    { id: 'drone-upload', label: 'Drone Imagery', icon: Plane },
    { id: 'processing', label: 'Processing Pipeline', icon: Activity },
    { id: 'ai-extraction', label: 'AI Extraction', icon: Cpu },
    { id: 'parcel-mapping', label: 'Parcel Mapping', icon: Ruler },
    { id: 'change-detection', label: 'Change Detection', icon: GitCompare, badge: changeAnomaliesCount, badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
    { id: 'verification', label: 'Verification Queue', icon: CheckSquare, badge: pendingVerificationCount, badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'exports', label: 'Exports & Reports', icon: Download },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className={`relative flex flex-col bg-gis-darkest border-r border-gis-border transition-all duration-300 z-30 select-none ${
        collapsed ? 'w-18 min-w-[72px]' : 'w-64 min-w-[256px]'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gis-border bg-gis-card/40">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-cyan-500/20 shrink-0">
            <Layers className="w-5 h-5 text-slate-950" />
          </div>
          {!collapsed && (
            <div className="truncate">
              <div className="flex items-center gap-1.5">
                <span className="font-bold tracking-tight text-white text-base">Cadastra<span className="text-cyan-400">AI</span></span>
                <span className="px-1.5 py-0.2 bg-cyan-950/80 border border-cyan-700/60 rounded text-[9px] font-mono text-cyan-300 uppercase">GovTech</span>
              </div>
              <p className="text-[10px] text-slate-400 truncate">From Drone Pixels to Parcels</p>
            </div>
          )}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Current Project Pill (when expanded) */}
      {!collapsed && (
        <div className="px-3 py-2.5 bg-gis-surface/60 border-b border-gis-border">
          <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 mb-1 flex items-center justify-between">
            <span>Active Survey</span>
            <span className="text-emerald-400 font-mono">LIVE</span>
          </div>
          <p className="text-xs font-medium text-slate-200 truncate" title={selectedProject.name}>
            {selectedProject.name}
          </p>
          <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
            <span>{selectedProject.location}</span>
            <span>•</span>
            <span className="font-mono text-cyan-300">{selectedProject.areaHectares} ha</span>
          </div>
        </div>
      )}

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors relative group ${
                isActive
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-gis-card/60 border border-transparent'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
                }`}
              />

              {!collapsed && (
                <span className="truncate flex-1 text-left">{item.label}</span>
              )}

              {item.badge !== undefined && item.badge > 0 && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full border ${
                    item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'
                  } ${collapsed ? 'absolute top-1 right-1' : ''}`}
                >
                  {item.badge}
                </span>
              )}

              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-cyan-400 rounded-r-full" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer / System Status & User Profile */}
      <div className="p-3 border-t border-gis-border bg-gis-card/30 space-y-2.5">
        {/* System Status */}
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          {!collapsed && (
            <div className="truncate flex items-center justify-between w-full">
              <span className="truncate">SegNet AI Cluster</span>
              <span className="font-mono text-[10px] text-emerald-400">Online</span>
            </div>
          )}
        </div>

        {/* User Card */}
        <div className="flex items-center gap-2.5 pt-2 border-t border-gis-border/60">
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0">
            <User className="w-4 h-4" />
          </div>
          {!collapsed && (
            <div className="truncate">
              <p className="text-xs font-medium text-slate-200 truncate">R. Sharma</p>
              <p className="text-[10px] text-slate-400 truncate">Govt. Survey Officer</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
