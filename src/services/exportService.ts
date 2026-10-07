import { ParcelFeature } from '../types/parcel';

export const exportService = {
  exportGeoJson: (parcels: ParcelFeature[], filename = 'cadastra_bengaluru_parcels.geojson') => {
    const geojson = {
      type: 'FeatureCollection',
      name: 'CadastraAI_Candidate_Parcels_Export',
      crs: {
        type: 'name',
        properties: { name: 'urn:ogc:def:crs:EPSG::32643' }
      },
      metadata: {
        exportedAt: new Date().toISOString(),
        author: 'CadastraAI GovTech Urban Survey Suite',
        disclaimer: 'AI-assisted cadastral boundary proposal. Subject to authorized field surveyor certification.'
      },
      features: parcels
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(geojson, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  },

  exportCsv: (parcels: ParcelFeature[], filename = 'cadastra_parcels_inventory.csv') => {
    const headers = [
      'Parcel_ID',
      'Area_Sqm',
      'Perimeter_M',
      'Status',
      'Boundary_Confidence_Pct',
      'Building_Confidence_Pct',
      'Building_Detected',
      'Change_Detected',
      'Centroid_Lat',
      'Centroid_Lng',
      'Verified_By',
      'Verified_At'
    ];

    const rows = parcels.map(p => {
      const prop = p.properties;
      return [
        prop.parcelId,
        prop.area,
        prop.perimeter,
        prop.status,
        prop.boundaryConfidence,
        prop.buildingConfidence,
        prop.buildingDetected ? 'YES' : 'NO',
        prop.changeDetected ? 'YES' : 'NO',
        prop.centroid[0].toFixed(6),
        prop.centroid[1].toFixed(6),
        `"${prop.verifiedBy || 'Pending'}"`,
        `"${prop.verifiedAt || 'N/A'}"`
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent([headers.join(','), ...rows].join('\n'));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', csvContent);
    downloadAnchor.setAttribute('download', filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  },

  exportShapefileBundle: (filename = 'cadastra_shp_bundle.zip') => {
    // Simulated shapefile bundle download
    const dummyContent = 'CadastraAI ESRI Shapefile Package (SHP, SHX, DBF, PRJ EPSG:32643)';
    const blob = new Blob([dummyContent], { type: 'application/zip' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
};
