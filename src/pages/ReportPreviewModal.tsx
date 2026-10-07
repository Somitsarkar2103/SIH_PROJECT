import React from 'react';
import {
  X,
  Printer,
  Download,
  ShieldCheck,
  FileCheck,
  Calendar,
  MapPin,
  Building,
  Layers,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ReportPreviewModal: React.FC = () => {
  const { isReportModalOpen, setIsReportModalOpen, selectedProject, parcels, addToast } = useApp();

  if (!isReportModalOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    addToast('success', 'PDF Document Generated', 'Official Cadastral Survey Draft Report rendered and downloaded.');
    setIsReportModalOpen(false);
  };

  const verifiedCount = parcels.filter(p => p.properties.status === 'verified').length;
  const pendingCount = parcels.filter(p => p.properties.status === 'review').length;
  const flaggedCount = parcels.filter(p => p.properties.status === 'anomaly').length;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-gis-border rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Top Bar */}
        <div className="p-4 border-b border-gis-border bg-gis-darkest/90 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-sm">
              Cadastral Survey Draft Report Preview
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Draft</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-lg shadow-emerald-950/50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Generate Official PDF</span>
            </button>

            <button
              onClick={() => setIsReportModalOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Document Body */}
        <div className="flex-1 overflow-y-auto p-8 bg-white text-slate-900 font-sans space-y-6">
          {/* Government Document Header */}
          <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
            <div className="w-12 h-12 mx-auto rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xl mb-1">
              🏛️
            </div>
            <h2 className="text-xl font-black uppercase tracking-wider text-slate-900">
              Government of Karnataka — Directorate of Urban Land Records
            </h2>
            <p className="text-xs text-slate-600 font-medium uppercase tracking-widest">
              AI-Assisted Drone Photogrammetry & Cadastral Verification Report
            </p>
            <p className="text-[11px] font-mono text-slate-500">
              Document No: CAD-BLR-2026-W112-DRAFT • Issued Date: 15-AUG-2026
            </p>
          </div>

          {/* Survey Metadata Table */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Project Name</span>
              <span className="font-bold text-slate-800">{selectedProject.name}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Survey Extent</span>
              <span className="font-bold text-slate-800 font-mono">{selectedProject.areaHectares} Hectares</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Surveying Officer</span>
              <span className="font-bold text-slate-800">{selectedProject.officer}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Spatial Reference</span>
              <span className="font-bold text-slate-800 font-mono text-[11px]">{selectedProject.crs}</span>
            </div>
          </div>

          {/* Metrics Summary Strip */}
          <div className="grid grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3 rounded border border-slate-200 bg-slate-50">
              <span className="text-slate-500 text-[10px] uppercase block font-semibold">Total Parcels</span>
              <span className="text-xl font-black font-mono text-slate-900">{selectedProject.parcelCount}</span>
            </div>
            <div className="p-3 rounded border border-emerald-200 bg-emerald-50">
              <span className="text-emerald-700 text-[10px] uppercase block font-semibold">Verified</span>
              <span className="text-xl font-black font-mono text-emerald-700">{selectedProject.verifiedCount}</span>
            </div>
            <div className="p-3 rounded border border-amber-200 bg-amber-50">
              <span className="text-amber-700 text-[10px] uppercase block font-semibold">Pending Review</span>
              <span className="text-xl font-black font-mono text-amber-700">{selectedProject.reviewCount}</span>
            </div>
            <div className="p-3 rounded border border-rose-200 bg-rose-50">
              <span className="text-rose-700 text-[10px] uppercase block font-semibold">Changes Flagged</span>
              <span className="text-xl font-black font-mono text-rose-700">{selectedProject.changesCount}</span>
            </div>
          </div>

          {/* Orthomosaic Map Preview Section */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <div className="p-2 bg-slate-100 border-b border-slate-200 text-xs font-bold uppercase text-slate-700 flex justify-between">
              <span>High-Resolution Cadastral Index Map Snapshot (2.1 cm GSD)</span>
              <span className="font-mono text-[11px] text-slate-500">Scale 1:500</span>
            </div>
            <div
              className="h-56 bg-cover bg-center relative"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1200&q=80')`
              }}
            >
              <div className="absolute inset-0 bg-slate-950/20" />
              <div className="absolute bottom-3 left-3 bg-white/90 px-3 py-1.5 rounded text-[11px] font-mono shadow">
                Center: 12.9716° N, 77.5946° E • Grid UTM Zone 43N
              </div>
            </div>
          </div>

          {/* Sample Parcel Schedule Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
              Audited Cadastral Parcels Schedule (Sample Excerpt):
            </h4>
            <table className="w-full text-left text-xs border border-slate-200 border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                  <th className="p-2">Parcel ID</th>
                  <th className="p-2">Area (m²)</th>
                  <th className="p-2">AI Confidence</th>
                  <th className="p-2">Building Detected</th>
                  <th className="p-2">Temporal Change</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {parcels.slice(0, 6).map(p => (
                  <tr key={p.properties.parcelId} className="hover:bg-slate-50 font-mono text-[11px]">
                    <td className="p-2 font-bold text-slate-900">{p.properties.parcelId}</td>
                    <td className="p-2">{p.properties.area} m²</td>
                    <td className="p-2">{p.properties.boundaryConfidence}%</td>
                    <td className="p-2">{p.properties.buildingDetected ? 'YES (97%)' : 'NO'}</td>
                    <td className="p-2 text-rose-600 font-sans">
                      {p.properties.changeDetected ? 'YES (Expansion)' : 'No Change'}
                    </td>
                    <td className="p-2 font-sans font-bold">
                      {p.properties.status === 'verified' ? (
                        <span className="text-emerald-700">✓ Verified</span>
                      ) : (
                        <span className="text-amber-700">⏳ Needs Review</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Official Surveyor Sign-Off Box */}
          <div className="pt-4 border-t-2 border-slate-900 grid grid-cols-2 gap-8 text-xs">
            <div>
              <p className="font-bold text-slate-800 mb-1">Statutory Legal Disclaimer:</p>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                This document constitutes a draft cadastral proposal synthesized by CadastraAI photogrammetric segmentation algorithms. Boundaries shown are subject to public notice and field verification under the Land Revenue Act.
              </p>
            </div>

            <div className="text-right space-y-1">
              <div className="h-10 border-b border-slate-400 w-48 ml-auto" />
              <p className="font-bold text-slate-800">Rajesh Rao, Survey Officer</p>
              <p className="text-[11px] text-slate-500">Directorate of Urban Land Records, Karnataka</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
