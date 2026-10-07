import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useApp } from '../../context/AppContext';
import { ParcelFeature, ParcelStatus } from '../../types/parcel';
import { MapControls } from './MapControls';

interface GisMapProps {
  onSelectParcel?: (parcel: ParcelFeature) => void;
  isEditing?: boolean;
  onVertexUpdated?: (newCoords: number[][][]) => void;
}

export const GisMap: React.FC<GisMapProps> = ({
  onSelectParcel,
  isEditing = false,
  onVertexUpdated
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const geoJsonLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const editingMarkersRef = useRef<L.Marker[]>([]);
  const measureLayerGroupRef = useRef<L.LayerGroup | null>(null);

  const {
    parcels,
    selectedParcel,
    setSelectedParcel,
    activeLayers,
    basemap,
    updateParcelGeometry
  } = useApp();

  const [isMeasuring, setIsMeasuring] = useState<boolean>(false);
  const [measurePoints, setMeasurePoints] = useState<L.LatLng[]>([]);

  // Style helper based on user's exact semantic rules
  const getParcelStyle = (feature: ParcelFeature, isSelected: boolean) => {
    const status: ParcelStatus = feature.properties.status;
    let strokeColor = '#3B82F6'; // Blue candidate
    let fillColor = '#3B82F6';

    if (status === 'verified') {
      strokeColor = '#10B981'; // Green verified
      fillColor = '#10B981';
    } else if (status === 'review') {
      strokeColor = '#F59E0B'; // Yellow review
      fillColor = '#F59E0B';
    } else if (status === 'anomaly') {
      strokeColor = '#EF4444'; // Red mismatch
      fillColor = '#EF4444';
    }

    if (isSelected) {
      return {
        color: '#38BDF8', // High-tech highlight cyan
        weight: 3.5,
        opacity: 1,
        fillColor: strokeColor,
        fillOpacity: 0.35,
        dashArray: undefined
      };
    }

    return {
      color: strokeColor,
      weight: 2,
      opacity: 0.9,
      fillColor: fillColor,
      fillOpacity: 0.18,
      dashArray: status === 'candidate' ? '4, 4' : undefined
    };
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center on Bengaluru Urban Grid [12.9716, 77.5946]
    const map = L.map(mapContainerRef.current, {
      center: [12.9716, 77.5946],
      zoom: 17,
      zoomControl: false,
      attributionControl: false
    });

    mapInstanceRef.current = map;
    geoJsonLayerGroupRef.current = L.layerGroup().addTo(map);
    measureLayerGroupRef.current = L.layerGroup().addTo(map);

    // Initial tile layer
    updateTileLayer(map, basemap);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Basemap Tiles
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const updateTileLayer = (map: L.Map, currentBasemap: string) => {
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    let url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    let maxZoom = 19;

    if (currentBasemap === 'streets') {
      url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    } else if (currentBasemap === 'dark') {
      url = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
      maxZoom = 20;
    }

    const newLayer = L.tileLayer(url, {
      maxZoom,
      subdomains: ['a', 'b', 'c']
    }).addTo(map);

    tileLayerRef.current = newLayer;
  };

  useEffect(() => {
    if (mapInstanceRef.current) {
      updateTileLayer(mapInstanceRef.current, basemap);
    }
  }, [basemap]);

  // Render Polygons and Click Handlers
  useEffect(() => {
    const map = mapInstanceRef.current;
    const group = geoJsonLayerGroupRef.current;
    if (!map || !group) return;

    group.clearLayers();

    if (!activeLayers.candidateParcels && !activeLayers.verifiedParcels) return;

    parcels.forEach(feature => {
      const isVerified = feature.properties.status === 'verified';
      if (isVerified && !activeLayers.verifiedParcels) return;
      if (!isVerified && !activeLayers.candidateParcels) return;

      const isSelected = selectedParcel?.properties.parcelId === feature.properties.parcelId;
      const coords = feature.geometry.coordinates[0].map(c => [c[1], c[0]] as [number, number]);

      const polygon = L.polygon(coords, getParcelStyle(feature, isSelected));

      // Tooltip
      const prop = feature.properties;
      const tooltipContent = `
        <div style="font-family: 'Inter', sans-serif; padding: 2px;">
          <div style="font-weight: 700; font-family: monospace; color: #38bdf8; font-size: 12px;">${prop.parcelId}</div>
          <div style="font-size: 11px; color: #cbd5e1; margin-top: 2px;">Area: <b>${prop.area} m²</b></div>
          <div style="font-size: 11px; color: #94a3b8;">AI Confidence: <b style="color: ${prop.boundaryConfidence >= 90 ? '#34d399' : '#fbbf24'}">${prop.boundaryConfidence}%</b></div>
          <div style="font-size: 10px; text-transform: uppercase; margin-top: 3px; font-weight: 600; color: ${prop.status === 'verified' ? '#34d399' : prop.status === 'review' ? '#fbbf24' : '#60a5fa'}">Status: ${prop.status}</div>
        </div>
      `;

      polygon.bindTooltip(tooltipContent, {
        sticky: true,
        className: 'custom-gis-tooltip',
        direction: 'top'
      });

      polygon.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        setSelectedParcel(feature);
        if (onSelectParcel) onSelectParcel(feature);
      });

      group.addLayer(polygon);
    });

    // If roads layer is enabled, render road corridor lines
    if (activeLayers.roads) {
      const roadLine1 = L.polyline(
        [[12.968, 77.590], [12.975, 77.599]],
        { color: '#f59e0b', weight: 4, opacity: 0.6, dashArray: '6, 6' }
      );
      roadLine1.bindTooltip('6.0m Municipal Road Corridor', { sticky: true });
      group.addLayer(roadLine1);
    }
  }, [parcels, selectedParcel, activeLayers]);

  // Vertex Editing Mode for Selected Parcel
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear previous editing markers
    editingMarkersRef.current.forEach(m => map.removeLayer(m));
    editingMarkersRef.current = [];

    if (isEditing && selectedParcel) {
      const coords = selectedParcel.geometry.coordinates[0];
      const markers: L.Marker[] = [];

      coords.forEach((coord, index) => {
        // Skip duplicate closing point
        if (index === coords.length - 1) return;

        const latLng: [number, number] = [coord[1], coord[0]];
        const customIcon = L.divIcon({
          className: 'custom-vertex-marker',
          html: `<div style="width: 14px; height: 14px; background: #38bdf8; border: 2px solid #ffffff; border-radius: 50%; box-shadow: 0 0 10px rgba(56, 189, 248, 0.8); cursor: grab;"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7]
        });

        const marker = L.marker(latLng, {
          draggable: true,
          icon: customIcon
        }).addTo(map);

        marker.on('dragend', () => {
          const newPos = marker.getLatLng();
          const newCoordinates = JSON.parse(JSON.stringify(selectedParcel.geometry.coordinates));
          newCoordinates[0][index] = [newPos.lng, newPos.lat];
          if (index === 0) {
            newCoordinates[0][coords.length - 1] = [newPos.lng, newPos.lat];
          }

          updateParcelGeometry(selectedParcel.properties.parcelId, newCoordinates);
          if (onVertexUpdated) {
            onVertexUpdated(newCoordinates);
          }
        });

        markers.push(marker);
      });

      editingMarkersRef.current = markers;
    }

    return () => {
      editingMarkersRef.current.forEach(m => map.removeLayer(m));
      editingMarkersRef.current = [];
    };
  }, [isEditing, selectedParcel]);

  // Handle GIS Measurement Click Tool
  useEffect(() => {
    const map = mapInstanceRef.current;
    const group = measureLayerGroupRef.current;
    if (!map || !group) return;

    if (!isMeasuring) {
      group.clearLayers();
      setMeasurePoints([]);
      return;
    }

    const handleMapClick = (e: L.LeafletMouseEvent) => {
      const newPts = [...measurePoints, e.latlng];
      setMeasurePoints(newPts);

      group.clearLayers();

      newPts.forEach(pt => {
        L.circleMarker(pt, { radius: 5, color: '#06b6d4', fillColor: '#ffffff', fillOpacity: 1 }).addTo(group);
      });

      if (newPts.length >= 2) {
        let totalDistMeters = 0;
        for (let i = 0; i < newPts.length - 1; i++) {
          totalDistMeters += newPts[i].distanceTo(newPts[i + 1]);
        }

        const poly = L.polyline(newPts, { color: '#06b6d4', weight: 3, dashArray: '4, 4' }).addTo(group);
        poly.bindTooltip(`Distance: ${totalDistMeters.toFixed(1)} m`, { permanent: true, direction: 'center' }).openTooltip();
      }
    };

    map.on('click', handleMapClick);

    return () => {
      map.off('click', handleMapClick);
    };
  }, [isMeasuring, measurePoints]);

  return (
    <div className="relative w-full h-full min-h-[420px] overflow-hidden select-none">
      {/* Leaflet container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Professional GIS Map Controls */}
      <MapControls
        onZoomIn={() => mapInstanceRef.current?.zoomIn()}
        onZoomOut={() => mapInstanceRef.current?.zoomOut()}
        onResetView={() => mapInstanceRef.current?.setView([12.9716, 77.5946], 17)}
        onToggleMeasure={() => setIsMeasuring(!isMeasuring)}
        isMeasuring={isMeasuring}
      />

      {/* Edit Mode Alert Banner */}
      {isEditing && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[500] px-4 py-2 rounded-xl bg-cyan-950/90 border border-cyan-500/50 shadow-2xl backdrop-blur-md flex items-center gap-2.5 text-xs text-cyan-200">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-bold">CAD/GIS Boundary Editing Mode Active:</span>
          <span>Drag circular nodes on the map to adjust parcel vertices. Area auto-recalculates.</span>
        </div>
      )}

      {/* Measurement Banner */}
      {isMeasuring && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[500] px-4 py-2 rounded-xl bg-slate-900/90 border border-gis-border shadow-2xl backdrop-blur-md flex items-center gap-3 text-xs text-slate-200">
          <span className="font-semibold text-cyan-400">📏 Measurement Mode:</span>
          <span>Click on the map to measure linear distances between survey points.</span>
          <button
            onClick={() => {
              setIsMeasuring(false);
              setMeasurePoints([]);
            }}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
          >
            Clear / Exit
          </button>
        </div>
      )}

      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-[500] bg-gis-card/90 border border-gis-border rounded-xl p-2.5 shadow-xl backdrop-blur-md flex items-center gap-3 text-[11px]">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm border-2 border-blue-500 bg-blue-500/30" />
          <span className="text-slate-300">Candidate (AI)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm border-2 border-emerald-500 bg-emerald-500/30" />
          <span className="text-slate-300">Verified</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm border-2 border-amber-500 bg-amber-500/30" />
          <span className="text-slate-300">Review Req.</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm border-2 border-rose-500 bg-rose-500/30" />
          <span className="text-slate-300">Anomaly/Mismatch</span>
        </div>
      </div>
    </div>
  );
};
