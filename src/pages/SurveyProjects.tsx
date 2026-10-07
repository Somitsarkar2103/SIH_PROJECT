import React, { useState } from 'react';
import {
  Map as MapIcon,
  Plus,
  ArrowUpRight,
  Plane,
  Clock,
  Layers,
  CheckCircle2,
  Calendar,
  MapPin,
  FileCheck,
  Search,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockSurveys } from '../data/mockSurveys';
import { SurveyProject } from '../types/survey';

export const SurveyProjects: React.FC = () => {
  const { setSelectedProject, setCurrentTab } = useApp();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredSurveys = mockSurveys.filter(
    s =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenProject = (project: SurveyProject) => {
    setSelectedProject(project);
    setCurrentTab('dashboard');
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-8 bg-gis-darkest space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gis-border">
        <div>
          <div className="flex items-center gap-2">
            <MapIcon className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">
              Cadastral Survey Projects
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Municipal jurisdiction orthomosaics, AI feature datasets, and verification registries
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Filter projects..."
              className="pl-9 pr-3 py-1.5 bg-gis-card/80 border border-gis-border rounded-lg text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <button
            onClick={() => setCurrentTab('drone-upload')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>+ New Survey Project</span>
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-gis-card/90 border border-gis-border rounded-xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gis-darkest/90 border-b border-gis-border text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">Project & Jurisdiction</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4 text-right">Survey Area</th>
                <th className="py-3.5 px-4 text-right">Parcels</th>
                <th className="py-3.5 px-4">Resolution (GSD)</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gis-border/60">
              {filteredSurveys.map(project => {
                const isProcessing = project.status === 'Processing';
                const isCompleted = project.status === 'Completed';

                return (
                  <tr
                    key={project.id}
                    className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                    onClick={() => handleOpenProject(project)}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-900 border border-gis-border flex items-center justify-center text-cyan-400 shrink-0">
                          <Plane className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {project.name}
                          </div>
                          <div className="font-mono text-[10px] text-slate-400 mt-0.5">
                            ID: {project.id} • Officer: {project.officer.split(' ').slice(0, 3).join(' ')}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{project.location}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{project.state}</span>
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-semibold text-slate-200">
                      {project.areaHectares} ha
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <span className="font-mono font-bold text-white">
                        {project.parcelCount.toLocaleString()}
                      </span>
                      <div className="text-[10px] text-slate-400">
                        {project.verifiedCount} verified
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-cyan-300 text-xs">
                      {project.gsdCm} cm/px
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                          isProcessing
                            ? 'bg-cyan-950/80 text-cyan-300 border-cyan-800'
                            : isCompleted
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                            : 'bg-amber-950/80 text-amber-300 border-amber-800'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isProcessing
                              ? 'bg-cyan-400 animate-ping'
                              : isCompleted
                              ? 'bg-emerald-400'
                              : 'bg-amber-400'
                          }`}
                        />
                        {project.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => handleOpenProject(project)}
                          className="px-2.5 py-1.5 rounded-md bg-gis-surface hover:bg-gis-card border border-gis-border text-slate-200 hover:text-white font-medium text-xs transition-colors"
                        >
                          View Map
                        </button>
                        <button
                          onClick={() => setCurrentTab('ai-extraction')}
                          className="px-2.5 py-1.5 rounded-md bg-cyan-950/80 hover:bg-cyan-900/80 border border-cyan-800 text-cyan-300 font-medium text-xs transition-colors"
                        >
                          Process
                        </button>
                        <button
                          onClick={() => setCurrentTab('exports')}
                          className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                          title="Export Survey"
                        >
                          <FileCheck className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
