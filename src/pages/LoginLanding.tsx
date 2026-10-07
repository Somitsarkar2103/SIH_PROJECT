import React, { useState } from 'react';
import {
  Layers,
  ShieldCheck,
  Plane,
  Cpu,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  FileCheck,
  Building
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LoginLanding: React.FC = () => {
  const { loginDemo } = useApp();
  const [email, setEmail] = useState<string>('rajesh.sharma@cadastre.karnataka.gov.in');
  const [password, setPassword] = useState<string>('••••••••••••');
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginDemo();
  };

  return (
    <div className="min-h-screen w-full bg-gis-darkest flex flex-col lg:flex-row relative overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Geospatial Grid Pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Subtle Top-Left Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Left Column: Brand & GovTech GeoAI Identity */}
      <div className="flex-1 p-8 lg:p-16 flex flex-col justify-between z-10 border-b lg:border-b-0 lg:border-r border-gis-border bg-gradient-to-br from-gis-darkest via-gis-dark to-slate-950">
        <div>
          {/* Emblem & Brand */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-cyan-500/30">
              <Layers className="w-7 h-7 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold tracking-tight text-white">
                  Cadastra<span className="text-cyan-400">AI</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 text-[10px] font-mono uppercase font-semibold">
                  GovTech Platform
                </span>
              </div>
              <p className="text-xs text-slate-400">Department of Urban Land Records & Survey</p>
            </div>
          </div>

          {/* Hero Heading & Tagline */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Next-Gen Urban Cadastral Intelligence</span>
            </div>

            <h1 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              From Drone Pixels to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
                Verified Parcels.
              </span>
            </h1>

            <p className="mt-4 text-sm lg:text-base text-slate-300/90 leading-relaxed">
              AI-assisted urban cadastral mapping from high-resolution drone imagery. Synthesize candidate parcel boundaries, detect structural property changes, audit confidence scores, and empower authorized survey officers.
            </p>
          </div>

          {/* Key Pipeline Architecture Pills */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
            <div className="p-3.5 rounded-xl bg-gis-card/60 border border-gis-border flex items-start gap-3">
              <Plane className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">Drone Orthomosaics</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">2.1 cm/px GSD Nadir & Oblique photogrammetry</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-gis-card/60 border border-gis-border flex items-start gap-3">
              <Cpu className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">Cadastra-SegNet v3.2</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Deep building, wall & setback edge extraction</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-gis-card/60 border border-gis-border flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">Human-in-the-Loop</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Survey officer verification & CAD vertex editing</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-gis-card/60 border border-gis-border flex items-start gap-3">
              <FileCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">GIS-Ready Exports</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">RFC 7946 GeoJSON, Shapefiles, & Draft PDF Reports</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Authority Stamp */}
        <div className="mt-8 pt-6 border-t border-gis-border/60 flex items-center justify-between text-xs text-slate-400">
          <span>Official Urban Land Administration Suite</span>
          <span className="font-mono text-[11px] text-cyan-400">EPSG:32643 UTM</span>
        </div>
      </div>

      {/* Right Column: Authentication & Hackathon 1-Click Launch */}
      <div className="w-full lg:w-[480px] p-8 lg:p-12 flex flex-col justify-center bg-gis-darkest/95 z-10">
        <div className="max-w-sm w-full mx-auto space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold text-white">Surveyor Sign In</h2>
            <p className="text-xs text-slate-400 mt-1">
              Authorized personnel credentials for municipal cadastre
            </p>
          </div>

          {/* Hackathon 1-Click Demo Launcher Card (Top Priority) */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/70 to-blue-950/40 border-2 border-cyan-500/50 shadow-xl shadow-cyan-950/40">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-200">
                Hackathon Evaluator Fast-Track
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Pre-load 64 Bengaluru urban parcels with real AI confidence scores, vertex editing, and change detection.
            </p>
            <button
              onClick={loginDemo}
              className="w-full py-3 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <span>⚡ Launch Interactive Demo Mode</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-gis-border w-full" />
            <span className="bg-gis-darkest px-3 text-[11px] text-slate-400 uppercase font-mono tracking-wider">
              Or Government SSO
            </span>
          </div>

          {/* Standard Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Government Officer Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-gis-card/80 border border-gis-border rounded-lg text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Security Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-gis-card/80 border border-gis-border rounded-lg text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="rounded border-gis-border bg-gis-card text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0"
                />
                <span>Remember this terminal</span>
              </label>
              <a href="#help" onClick={(e) => { e.preventDefault(); loginDemo(); }} className="text-cyan-400 hover:underline">
                Demo credentials
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Authenticate Session</span>
            </button>
          </form>

          {/* Official Disclaimer */}
          <div className="pt-4 border-t border-gis-border/50 text-[10px] text-slate-400 text-center leading-relaxed">
            CadastraAI operates in accordance with National Geospatial Policy guidelines. AI boundaries are advisory and require field verification.
          </div>
        </div>
      </div>
    </div>
  );
};
