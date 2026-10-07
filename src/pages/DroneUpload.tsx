import React, { useState } from 'react';
import {
  Upload,
  Plane,
  FileCheck,
  CheckCircle2,
  FolderOpen,
  ArrowRight,
  Sparkles,
  AlertCircle,
  FileArchive,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DroneUpload: React.FC = () => {
  const { setCurrentTab, addToast } = useApp();
  const [step, setStep] = useState<1 | 2>(1);

  // Form State
  const [projectName, setProjectName] = useState<string>('Bengaluru Urban Survey — Sector 4');
  const [location, setLocation] = useState<string>('Indiranagar Ward 112, Bengaluru');
  const [surveyDate, setSurveyDate] = useState<string>('2026-08-14');
  const [surveyOfficer, setSurveyOfficer] = useState<string>('Senior Survey Officer Rajesh Rao');
  const [crs, setCrs] = useState<string>('EPSG:32643 (WGS 84 / UTM zone 43N)');

  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleUseDemoDataset = () => {
    setUploadedFiles([
      'BLR_UAV_Flight04_Nadir_428Images.zip (1.84 GB)',
      'GCP_GroundControlPoints_SurveyLog.csv (14.2 KB)',
      'FlightTrajectory_IMU_RINEX.nav (84.1 KB)'
    ]);
    addToast('success', 'Demo Drone Flight Ingested', 'Loaded 428 high-res photogrammetry frames (GSD 2.1cm).');
    setTimeout(() => {
      setCurrentTab('processing');
    }, 600);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setUploadedFiles([
      'Drone_Orthomosaic_Sector4_RAW.tif (1.62 GB)',
      'Camera_Calibration_SonyA7R.xml (4.8 KB)'
    ]);
    addToast('info', 'File Staged', 'GeoTIFF staged for radiometric & geometric calibration.');
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-8 bg-gis-darkest max-w-4xl mx-auto w-full space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <Plane className="w-5 h-5 text-cyan-400" />
          <h1 className="text-xl font-bold text-white tracking-tight">
            Ingest Drone Orthomosaic & Flight Imagery
          </h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Upload photogrammetric drone survey imagery or georeferenced GeoTIFF orthomosaics
        </p>
      </div>

      {/* Stepper Header */}
      <div className="grid grid-cols-2 gap-4 pb-2 border-b border-gis-border">
        <div
          onClick={() => setStep(1)}
          className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
            step === 1
              ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-200'
              : 'bg-gis-card/60 border-gis-border text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center font-bold text-xs text-cyan-300">
            1
          </div>
          <div>
            <div className="text-xs font-bold text-white">Project Metadata</div>
            <div className="text-[10px] text-slate-400">Jurisdiction & CRS parameters</div>
          </div>
        </div>

        <div
          onClick={() => setStep(2)}
          className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
            step === 2
              ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-200'
              : 'bg-gis-card/60 border-gis-border text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center font-bold text-xs text-blue-300">
            2
          </div>
          <div>
            <div className="text-xs font-bold text-white">Upload Imagery</div>
            <div className="text-[10px] text-slate-400">GeoTIFF, JPG, ZIP photogrammetry</div>
          </div>
        </div>
      </div>

      {/* Step 1: Project Details */}
      {step === 1 && (
        <div className="bg-gis-card/90 border border-gis-border rounded-xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Step 1 — Survey Metadata
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 uppercase tracking-wider">
                Project Name
              </label>
              <input
                type="text"
                value={projectName}
                onChange={e => setProjectName(e.target.value)}
                className="w-full px-3 py-2.5 bg-gis-darkest/90 border border-gis-border rounded-lg text-slate-200 font-mono focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 uppercase tracking-wider">
                Survey Location / Ward
              </label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full px-3 py-2.5 bg-gis-darkest/90 border border-gis-border rounded-lg text-slate-200 font-mono focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 uppercase tracking-wider">
                Drone Flight Survey Date
              </label>
              <input
                type="date"
                value={surveyDate}
                onChange={e => setSurveyDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-gis-darkest/90 border border-gis-border rounded-lg text-slate-200 font-mono focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 uppercase tracking-wider">
                Authorized Survey Officer
              </label>
              <input
                type="text"
                value={surveyOfficer}
                onChange={e => setSurveyOfficer(e.target.value)}
                className="w-full px-3 py-2.5 bg-gis-darkest/90 border border-gis-border rounded-lg text-slate-200 font-mono focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1.5 uppercase tracking-wider">
                Coordinate Reference System (CRS)
              </label>
              <select
                value={crs}
                onChange={e => setCrs(e.target.value)}
                className="w-full px-3 py-2.5 bg-gis-darkest/90 border border-gis-border rounded-lg text-slate-200 font-mono focus:border-cyan-500 focus:outline-none"
              >
                <option value="EPSG:32643 (WGS 84 / UTM zone 43N)">EPSG:32643 (WGS 84 / UTM zone 43N) — Recommended for Karnataka</option>
                <option value="EPSG:4326 (WGS 84 Geographic Latitude/Longitude)">EPSG:4326 (WGS 84 Geographic Latitude/Longitude)</option>
                <option value="EPSG:3857 (WGS 84 / Pseudo-Mercator)">EPSG:3857 (WGS 84 / Pseudo-Mercator)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-gis-border flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-cyan-500/20"
            >
              <span>Continue to Drone Upload</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Upload Drone Data */}
      {step === 2 && (
        <div className="bg-gis-card/90 border border-gis-border rounded-xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Step 2 — Ingest Drone Photogrammetry
            </h3>

            {/* 1-Click Demo Shortcut */}
            <button
              onClick={handleUseDemoDataset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Use Demo Dataset (428 Drone Images)</span>
            </button>
          </div>

          {/* Drag and Drop Zone */}
          <div
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
              isDragging
                ? 'border-cyan-400 bg-cyan-950/30 scale-[1.01]'
                : 'border-gis-border hover:border-slate-500 bg-gis-darkest/70'
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-cyan-950/60 border border-cyan-700/60 text-cyan-400 flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Plane className="w-7 h-7" />
            </div>

            <h4 className="text-sm font-bold text-white mb-1">
              Drop high-resolution drone imagery here
            </h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
              Supported formats: <span className="text-cyan-300 font-mono">GeoTIFF, JPG, PNG, ZIP</span>. Maximum flight archive: 2 GB.
            </p>

            <button
              onClick={handleUseDemoDataset}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 text-xs font-semibold transition-colors"
            >
              Browse Local Files...
            </button>
          </div>

          {/* Staged Files List */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-gis-border">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Staged Drone Files for Pipeline:
              </span>
              {uploadedFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-gis-darkest/90 border border-gis-border text-xs font-mono"
                >
                  <div className="flex items-center gap-2 text-cyan-300">
                    <FileArchive className="w-4 h-4 text-cyan-400" />
                    <span>{file}</span>
                  </div>
                  <span className="text-emerald-400 font-sans text-[11px] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Ready
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gis-border">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 rounded-lg border border-gis-border text-slate-300 hover:text-white text-xs"
            >
              ← Back to Step 1
            </button>

            <button
              onClick={() => setCurrentTab('processing')}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-cyan-500/20"
            >
              <span>Start AI Photogrammetry Pipeline</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
