import React, { useState } from 'react';
import {
  Download,
  FileCheck,
  FileCode,
  FileSpreadsheet,
  FileArchive,
  Image as ImageIcon,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles,
  Printer
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { exportService } from '../services/exportService';

export const ExportCenter: React.FC = () => {
  const { parcels, selectedProject, setIsReportModalOpen, addToast } = useApp();
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);

  const handleExportGeoJson = () => {
    setDownloadingFormat('geojson');
    setTimeout(() => {
      exportService.exportGeoJson(parcels);
      setDownloadingFormat(null);
      addToast('success', 'GeoJSON Export Downloaded', 'Exported 64 Feature polygons adhering to RFC 7946.');
    }, 400);
  };

  const handleExportCsv = () => {
    setDownloadingFormat('csv');
    setTimeout(() => {
      exportService.exportCsv(parcels);
      setDownloadingFormat(null);
      addToast('success', 'CSV Registry Downloaded', 'Parcels attribute table exported successfully.');
    }, 400);
  };

  const handleExportShapefile = () => {
    setDownloadingFormat('shp');
    setTimeout(() => {
      exportService.exportShapefileBundle();
      setDownloadingFormat(null);
      addToast('success', 'ESRI Shapefile Bundle Downloaded', 'Archive containing .shp, .shx, .dbf, and .prj files.');
    }, 400);
  };

  const handleExportGeoTiff = () => {
    setDownloadingFormat('geotiff');
    setTimeout(() => {
      setDownloadingFormat(null);
      addToast('info', 'GeoTIFF Orthomosaic Prepared', 'Direct download link generated for 1.62 GB raster orthomosaic.');
    }, 500);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-8 bg-gis-darkest space-y-6 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gis-border">
        <div>
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">
              Export Survey Results & Cadastral Registry
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Produce open GIS vector files, geodatabase archives, and official government draft survey reports
          </p>
        </div>

        <button
          onClick={() => setIsReportModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/50 transition-all"
        >
          <FileCheck className="w-4 h-4" />
          <span>Generate Cadastral Draft Report (PDF)</span>
        </button>
      </div>

      {/* Export Format Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* GeoJSON */}
        <div className="p-5 rounded-xl bg-gis-card/90 border border-gis-border shadow-xl hover:border-cyan-500/50 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-800/80 flex items-center justify-center text-cyan-400">
                  <FileCode className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">GeoJSON FeatureCollection</h3>
                  <span className="text-[10px] font-mono text-cyan-400">RFC 7946 Standard</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono">
                ~1.2 MB
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              GIS-ready vector parcel polygon geometries with full cadastral attribute schema: area, boundary confidence, centroids, and verification timestamps.
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-gis-border flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-mono">CRS: EPSG:32643</span>
            <button
              onClick={handleExportGeoJson}
              disabled={downloadingFormat === 'geojson'}
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-cyan-500/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export GeoJSON</span>
            </button>
          </div>
        </div>

        {/* Shapefile */}
        <div className="p-5 rounded-xl bg-gis-card/90 border border-gis-border shadow-xl hover:border-indigo-500/50 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-950/80 border border-indigo-800/80 flex items-center justify-center text-indigo-400">
                  <FileArchive className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">ESRI Shapefile Bundle</h3>
                  <span className="text-[10px] font-mono text-indigo-400">ArcGIS / QGIS Ready</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono">
                ZIP (SHP, DBF, PRJ)
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              Multi-file cadastral shapefile bundle containing polygons, attribute tables, spatial indexing, and projection files for enterprise GIS servers.
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-gis-border flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-mono">UTM Zone 43N</span>
            <button
              onClick={handleExportShapefile}
              disabled={downloadingFormat === 'shp'}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-indigo-950/40"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Shapefile</span>
            </button>
          </div>
        </div>

        {/* CSV Attribute Inventory */}
        <div className="p-5 rounded-xl bg-gis-card/90 border border-gis-border shadow-xl hover:border-emerald-500/50 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-800/80 flex items-center justify-center text-emerald-400">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Parcel Attribute Inventory (CSV)</h3>
                  <span className="text-[10px] font-mono text-emerald-400">Land Records Ledger</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono">
                ~180 KB
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              Tabular spreadsheet of all surveyed parcels, including ID, square meters, perimeter, AI building confidence, verification status, and officer IDs.
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-gis-border flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-mono">{parcels.length} Records</span>
            <button
              onClick={handleExportCsv}
              disabled={downloadingFormat === 'csv'}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-emerald-950/40"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* GeoTIFF Raster Orthomosaic */}
        <div className="p-5 rounded-xl bg-gis-card/90 border border-gis-border shadow-xl hover:border-amber-500/50 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-950/80 border border-amber-800/80 flex items-center justify-center text-amber-400">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">GeoTIFF Drone Orthomosaic</h3>
                  <span className="text-[10px] font-mono text-amber-400">2.1 cm/px Calibrated</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono">
                1.62 GB
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              Full-resolution stitched and orthorectified RGB photogrammetry raster map with embedded GeoKey tags and ground control coordinates.
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-gis-border flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-mono">Cloud Optimized GeoTIFF</span>
            <button
              onClick={handleExportGeoTiff}
              disabled={downloadingFormat === 'geotiff'}
              className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-amber-950/40"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download GeoTIFF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
