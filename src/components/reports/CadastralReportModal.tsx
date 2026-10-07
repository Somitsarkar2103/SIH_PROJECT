import React from 'react';
import { ParcelFeature, SurveyProject } from '../../types';
import { 
  X, 
  Printer, 
  Download, 
  FileText, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  Layers,
  Building,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { showToast } from '../common/ToastContainer';

interface CadastralReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: SurveyProject;
  parcels: ParcelFeature[];
  activeParcel?: ParcelFeature | null;
}

export const CadastralReportModal: React.FC<CadastralReportModalProps> = ({
  isOpen,
  onClose,
  project,
  parcels,
  activeParcel
}) => {
  if (!isOpen) return null;

  const totalParcels = parcels.length;
  const verifiedCount = parcels.filter(p => p.status === 'verified').length;
  const reviewCount = parcels.filter(p => p.status === 'review').length;
  const mismatchCount = parcels.filter(p => p.status === 'mismatch').length;
  const avgConfidence = Math.round(parcels.reduce((acc, p) => acc + p.boundaryConfidence, 0) / (parcels.length || 1));

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    showToast('Cadastral Survey Draft Report PDF downloaded successfully.', 'success');
  };

  return (
    <div className="fixed inset-0 z-[9990] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-scale-up">
        {/* Modal Top Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h3 className="font-semibold text-white text-sm">
              Cadastral Survey Draft Report Preview
            </h3>
            <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
              Form 7-A (Draft)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
            >
              <Printer className="w-3.5 h-3.5" /> Print
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-lg shadow-cyan-950/50 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Download PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Paper */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-slate-950 text-slate-100 font-sans space-y-6">
          {/* Government Letterhead */}
          <div className="border-b-2 border-slate-700 pb-5 text-center space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-1">
              Government Land Records & Cadastral Demarcation Wing
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              CADASTRAL SURVEY DRAFT REPORT
            </h1>
            <p className="text-xs text-slate-400">
              High-Resolution UAV Orthomosaic Feature Extraction & Boundary Verification Record
            </p>
          </div>

          {/* Project Overview Table */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 text-[10px] block uppercase">Project Name</span>
              <span className="font-semibold text-white">{project?.name || 'Bengaluru Urban Survey'}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block uppercase">Jurisdiction</span>
              <span className="font-semibold text-white">Ward 151, Koramangala</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block uppercase">Survey Date</span>
              <span className="font-semibold text-white">08 March 2026</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block uppercase">Survey Officer</span>
              <span className="font-semibold text-cyan-400">{project?.surveyOfficer || 'Off. Rajesh Varma'}</span>
            </div>
          </div>

          {/* Summary Stat Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Parcels</span>
              <div className="text-2xl font-bold font-mono text-white mt-1">{totalParcels}</div>
              <span className="text-[10px] text-slate-400">Area: 12.4 ha</span>
            </div>

            <div className="bg-slate-900 p-3.5 rounded-xl border border-emerald-900/50">
              <span className="text-[10px] text-emerald-400 uppercase font-semibold">Verified Parcels</span>
              <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">{verifiedCount}</div>
              <span className="text-[10px] text-emerald-500">
                {Math.round((verifiedCount / (totalParcels || 1)) * 100)}% field approved
              </span>
            </div>

            <div className="bg-slate-900 p-3.5 rounded-xl border border-amber-900/50">
              <span className="text-[10px] text-amber-400 uppercase font-semibold">Pending Review</span>
              <div className="text-2xl font-bold font-mono text-amber-400 mt-1">{reviewCount}</div>
              <span className="text-[10px] text-amber-500">Human-in-the-loop</span>
            </div>

            <div className="bg-slate-900 p-3.5 rounded-xl border border-cyan-900/50">
              <span className="text-[10px] text-cyan-400 uppercase font-semibold">Avg AI Confidence</span>
              <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">{avgConfidence}%</div>
              <span className="text-[10px] text-cyan-500">ResNet-Swin v2.4</span>
            </div>
          </div>

          {/* Map Preview Plate */}
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" /> Cadastral Map Plate (Sector 4 Demarcation Grid)
              </span>
              <span className="font-mono text-[10px] text-slate-400">Scale: 1:1,000 | CRS: EPSG:32643</span>
            </div>

            {/* Schematic Plate */}
            <div className="h-44 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-center relative overflow-hidden">
              <div 
                className="absolute inset-0 opacity-40 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1200&q=80')`
                }}
              />
              <div className="relative z-10 text-center space-y-1 bg-slate-900/90 backdrop-blur-md p-3 rounded-lg border border-slate-700">
                <span className="text-xs font-semibold text-cyan-300">
                  UAV Orthomosaic Demarcation Overlay
                </span>
                <p className="text-[11px] text-slate-400">
                  {totalParcels} Candidate & Verified Polygons Indexed with Geodetic Vertex Coordinates
                </p>
              </div>
            </div>
          </div>

          {/* Sample Parcel Ledger Table */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">
                Parcel Attribute Ledger (Sample Excerpt)
              </span>
              <span className="text-[11px] text-slate-400">Showing top 6 priority parcels</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Parcel ID</th>
                    <th className="py-2.5 px-3 font-semibold">Area (m²)</th>
                    <th className="py-2.5 px-3 font-semibold">Perimeter</th>
                    <th className="py-2.5 px-3 font-semibold">AI Conf.</th>
                    <th className="py-2.5 px-3 font-semibold">Buildings</th>
                    <th className="py-2.5 px-3 font-semibold">Status</th>
                    <th className="py-2.5 px-3 font-semibold">2024 Change</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {parcels.slice(0, 6).map(p => (
                    <tr key={p.id} className="hover:bg-slate-850">
                      <td className="py-2.5 px-3 font-mono font-bold text-white">{p.parcelId}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-200">{p.area} m²</td>
                      <td className="py-2.5 px-3 font-mono text-slate-300">{p.perimeter} m</td>
                      <td className="py-2.5 px-3 font-mono text-cyan-400">{p.boundaryConfidence}%</td>
                      <td className="py-2.5 px-3 text-slate-300">{p.buildingCount}</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          p.status === 'verified'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : p.status === 'review'
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-rose-500/20 text-rose-400'
                        }`}>
                          {p.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-semibold">
                        {p.changeDetected ? (
                          <span className="text-amber-400">DETECTED</span>
                        ) : (
                          <span className="text-slate-500">NONE</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Official Signatures & Verification Certification */}
          <div className="pt-6 border-t border-slate-800 grid grid-cols-2 gap-8 text-xs">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">AI System Attestation</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Processed by CadastraAI Deep Learning Orthomosaic Engine v2.4. All boundaries are candidate proposals subject to field verification under Section 14 of the Land Survey Act.
                </p>
              </div>
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-[11px]">
                <ShieldCheck className="w-4 h-4" /> Cryptographic GeoAI Hash: #8F9A-4C21-99B1
              </div>
            </div>

            <div className="space-y-6 text-right">
              <div className="inline-block border-b border-slate-600 pb-1 w-48 text-center">
                <span className="font-mono text-xs text-white">Off. Rajesh Varma</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Chief Cadastral Survey Officer<br />
                Directorate of Survey & Land Records
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span>Generated by CadastraAI • Demo Report</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
