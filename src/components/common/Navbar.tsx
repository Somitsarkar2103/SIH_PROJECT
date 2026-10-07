import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Sparkles, 
  Cpu, 
  Radio, 
  User, 
  ChevronDown, 
  CheckCircle2, 
  AlertTriangle,
  Play,
  LogOut,
  MapPin,
  FileCheck
} from 'lucide-react';
import { ParcelFeature } from '../../types';

interface NavbarProps {
  parcels: ParcelFeature[];
  onSelectParcel: (parcel: ParcelFeature) => void;
  onOpenTour: () => void;
  onLogout: () => void;
  currentView: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  parcels,
  onSelectParcel,
  onOpenTour,
  onLogout,
  currentView
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Search matches
  const filteredParcels = searchQuery.trim()
    ? parcels.filter(p => 
        p.parcelId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.landUse.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.surveyOfficer && p.surveyOfficer.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  const notifications = [
    {
      id: '1',
      title: 'AI Extraction Completed',
      desc: '1,196 candidate parcels generated for Sector 4',
      time: '12m ago',
      type: 'success'
    },
    {
      id: '2',
      title: '37 Parcels Require Verification',
      desc: 'Low-confidence boundaries flagged in vegetation zones',
      time: '25m ago',
      type: 'warning'
    },
    {
      id: '3',
      title: 'Temporal Change Detection Finished',
      desc: '28 modifications detected vs 2024 survey baseline',
      time: '1h ago',
      type: 'info'
    },
    {
      id: '4',
      title: 'Cadastral GeoJSON Export Ready',
      desc: 'Clean topological shapefile & GeoJSON compiled',
      time: '2h ago',
      type: 'success'
    }
  ];

  return (
    <header className="h-16 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 px-4 flex items-center justify-between z-30 shrink-0 select-none">
      {/* Left: Brand & Tagline */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-900/30 border border-cyan-400/40">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-white tracking-tight">Cadastra<span className="text-cyan-400">AI</span></span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800 font-semibold">
                GovTech GeoAI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 -mt-0.5 hidden sm:block">
              From Drone Pixels to Verified Parcels
            </p>
          </div>
        </div>
      </div>

      {/* Center: Global Search (Section 22) */}
      <div className="relative max-w-md w-full mx-4 hidden md:block">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              setShowSearchResults(true);
            }}
            onFocus={() => setShowSearchResults(true)}
            placeholder="Search parcel ID (e.g. P-1024), project, location..."
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setShowSearchResults(false);
              }}
              className="absolute right-3 text-xs text-slate-500 hover:text-slate-300"
            >
              Clear
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {showSearchResults && searchQuery.trim() && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 text-xs">
            <div className="text-[10px] text-slate-400 uppercase font-semibold px-2 py-1">
              Matching Parcels ({filteredParcels.length})
            </div>
            {filteredParcels.length > 0 ? (
              filteredParcels.map(p => (
                <button
                  key={p.id}
                  onClick={() => {
                    onSelectParcel(p);
                    setShowSearchResults(false);
                    setSearchQuery('');
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-800 transition-colors text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-cyan-400">{p.parcelId}</span>
                    <span className="text-slate-300">{p.landUse}</span>
                    <span className="text-slate-500">({p.area} m²)</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                    p.status === 'verified'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : p.status === 'review'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    {p.status.toUpperCase()}
                  </span>
                </button>
              ))
            ) : (
              <div className="p-3 text-center text-slate-500 text-xs">
                No parcels matching "{searchQuery}"
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right: Telemetry & Actions */}
      <div className="flex items-center gap-3">
        {/* Judge Demo Tour Trigger */}
        <button
          onClick={onOpenTour}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-900/40 transition-all active:scale-95 border border-cyan-400/30"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span className="hidden sm:inline">Judge Demo Storyline</span>
        </button>

        {/* Live GNSS / GPU telemetry badge */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-lg text-[11px] text-slate-300 font-mono">
          <span className="flex items-center gap-1 text-emerald-400">
            <Radio className="w-3 h-3 animate-pulse" /> RTK Fixed
          </span>
          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1 text-cyan-400">
            <Cpu className="w-3 h-3" /> A100 GPU: Active
          </span>
        </div>

        {/* Notifications (Section 23) */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-slate-900" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-3 z-50 animate-fade-in text-xs space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-semibold text-white">Cadastral System Alerts</span>
                <span className="text-[10px] text-cyan-400">4 New</span>
              </div>
              <div className="space-y-2">
                {notifications.map(n => (
                  <div key={n.id} className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-200">{n.title}</span>
                      <span className="text-[10px] text-slate-500">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-400">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-800 transition-colors text-left"
          >
            <div className="w-7 h-7 rounded-full bg-cyan-900/60 border border-cyan-500/50 flex items-center justify-center text-cyan-300 font-bold text-xs">
              RV
            </div>
            <div className="hidden xl:block">
              <span className="text-xs font-semibold text-slate-200 block leading-tight">Off. Rajesh Varma</span>
              <span className="text-[10px] text-slate-400 block leading-tight">Chief Cadastral Surveyor</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 animate-fade-in text-xs space-y-1">
              <div className="p-2 border-b border-slate-800">
                <p className="font-semibold text-white">Off. Rajesh Varma</p>
                <p className="text-[10px] text-slate-400">rajesh.varma@revenue.kar.gov.in</p>
                <span className="mt-1 inline-block text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800">
                  Cadastral Warrant #KA-7721
                </span>
              </div>
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-rose-950/40 text-rose-300 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Exit to Login / Switch User</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
