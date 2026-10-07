import React, { useState } from 'react';
import {
  Search,
  Bell,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Cpu,
  Layers,
  Sparkles,
  HelpCircle,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    parcels,
    setSelectedParcel,
    setCurrentTab,
    demoStep,
    advanceDemoStep,
    setIsReportModalOpen
  } = useApp();

  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  const [searchResultsOpen, setSearchResultsOpen] = useState<boolean>(false);

  const notifications = [
    {
      id: 'n1',
      title: 'AI Extraction Completed',
      time: '2m ago',
      icon: Cpu,
      color: 'text-cyan-400',
      description: '1,196 candidate boundaries extracted for Ward 112'
    },
    {
      id: 'n2',
      title: 'Verification Queue Action',
      time: '12m ago',
      icon: AlertTriangle,
      color: 'text-amber-400',
      description: '37 parcels require manual officer sign-off'
    },
    {
      id: 'n3',
      title: 'Change Detection Anomaly',
      time: '25m ago',
      icon: Layers,
      color: 'text-rose-400',
      description: 'New building expansion detected on Parcel P-1024'
    },
    {
      id: 'n4',
      title: 'Export Package Ready',
      time: '1h ago',
      icon: FileCheck,
      color: 'text-emerald-400',
      description: 'Cadastral GeoJSON & Draft Report generated'
    }
  ];

  const filteredParcels = searchQuery.trim()
    ? parcels.filter(
        p =>
          p.properties.parcelId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.properties.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.properties.source.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSelectSearchResult = (parcel: any) => {
    setSelectedParcel(parcel);
    setCurrentTab('dashboard');
    setSearchResultsOpen(false);
    setSearchQuery('');
  };

  return (
    <header className="h-16 border-b border-gis-border bg-gis-darkest/95 px-4 flex items-center justify-between gap-4 z-20">
      {/* Global Search Bar */}
      <div className="relative flex-1 max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              setSearchResultsOpen(true);
            }}
            onFocus={() => setSearchResultsOpen(true)}
            placeholder="Search parcel ID (e.g. P-1024), project, location..."
            className="w-full pl-9 pr-4 py-2 bg-gis-card/80 border border-gis-border rounded-lg text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-all font-mono"
          />
        </div>

        {/* Search Results Dropdown */}
        {searchResultsOpen && searchQuery.trim() && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-gis-card border border-gis-border rounded-lg shadow-xl overflow-hidden z-50">
            <div className="p-2 border-b border-gis-border text-[10px] uppercase font-semibold text-slate-400 flex justify-between">
              <span>Matching Parcels ({filteredParcels.length})</span>
              <button
                onClick={() => setSearchResultsOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>
            {filteredParcels.length > 0 ? (
              <div className="divide-y divide-gis-border/60">
                {filteredParcels.map(p => (
                  <div
                    key={p.properties.parcelId}
                    onClick={() => handleSelectSearchResult(p)}
                    className="p-2.5 hover:bg-slate-800/80 cursor-pointer flex items-center justify-between text-xs transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white">
                          {p.properties.parcelId}
                        </span>
                        <span
                          className={`px-1.5 py-0.2 rounded text-[10px] uppercase font-mono ${
                            p.properties.status === 'verified'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : p.properties.status === 'review'
                              ? 'bg-amber-950 text-amber-300 border border-amber-800'
                              : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                          }`}
                        >
                          {p.properties.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Area: {p.properties.area} m² • Conf: {p.properties.boundaryConfidence}%
                      </p>
                    </div>
                    <span className="text-cyan-400 text-xs hover:underline">View Map →</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-xs text-slate-400">
                No parcels matched &ldquo;{searchQuery}&rdquo;. Try searching <span className="text-cyan-400 font-mono">P-1024</span> or <span className="text-cyan-400 font-mono">P-1025</span>.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Controls & Demo Pill */}
      <div className="flex items-center gap-3">
        {/* Hackathon Demo Flow Quick Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/40 text-xs">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="text-cyan-200 font-medium">Demo Flow:</span>
          <span className="font-mono text-cyan-400 font-bold">Step {demoStep}/12</span>
          <button
            onClick={advanceDemoStep}
            className="ml-1 px-2 py-0.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded text-[11px] transition-colors"
          >
            Next Step →
          </button>
        </div>

        {/* Cadastral Draft Report Quick Button */}
        <button
          onClick={() => setIsReportModalOpen(true)}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gis-card hover:bg-gis-surface border border-gis-border text-slate-200 hover:text-white rounded-lg text-xs font-medium transition-colors"
        >
          <FileCheck className="w-4 h-4 text-emerald-400" />
          <span>Cadastral Report</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-lg bg-gis-card hover:bg-gis-surface border border-gis-border text-slate-300 hover:text-white transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-500" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-gis-card border border-gis-border rounded-xl shadow-2xl overflow-hidden z-50">
              <div className="p-3 border-b border-gis-border bg-gis-darkest/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    System Alerts & Tasks
                  </span>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  4 unread
                </span>
              </div>

              <div className="divide-y divide-gis-border/60 max-h-80 overflow-y-auto">
                {notifications.map(n => {
                  const Icon = n.icon;
                  return (
                    <div
                      key={n.id}
                      className="p-3 hover:bg-slate-800/60 transition-colors flex items-start gap-3 cursor-pointer"
                      onClick={() => setNotificationsOpen(false)}
                    >
                      <div className={`p-1.5 rounded-lg bg-gis-darkest border border-gis-border shrink-0 ${n.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-slate-200 truncate">{n.title}</p>
                          <span className="text-[10px] text-slate-400 shrink-0 font-mono">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{n.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-2 border-t border-gis-border bg-gis-darkest/40 text-center">
                <button
                  onClick={() => {
                    setNotificationsOpen(false);
                    setCurrentTab('verification');
                  }}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  View Verification Queue →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
