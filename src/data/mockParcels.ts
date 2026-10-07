import { ParcelFeatureCollection, ParcelFeature } from '../types/parcel';

// Center: Bengaluru Urban Grid around [12.9716, 77.5946]
const BASE_LAT = 12.9716;
const BASE_LNG = 77.5946;

// Helper to generate realistic urban parcel polygons in a neat grid pattern
function generateParcels(): ParcelFeature[] {
  const parcels: ParcelFeature[] = [];
  const rows = 8;
  const cols = 8;
  const dLat = 0.0008;
  const dLng = 0.0011;

  let counter = 1000;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      counter++;
      const pId = `P-${counter}`;
      
      const latMin = BASE_LAT + (r - rows / 2) * dLat;
      const latMax = latMin + dLat * 0.88;
      const lngMin = BASE_LNG + (c - cols / 2) * dLng;
      const lngMax = lngMin + dLng * 0.88;

      // Add slight jitter for realistic organic cadastral shape
      const jitter1 = ((r * 13 + c * 7) % 10 - 5) * 0.00004;
      const jitter2 = ((r * 17 + c * 11) % 10 - 5) * 0.00004;

      const coords = [
        [lngMin, latMin],
        [lngMax + jitter1, latMin],
        [lngMax, latMax + jitter2],
        [lngMin + jitter1, latMax],
        [lngMin, latMin]
      ];

      const area = Math.round((120 + ((r * 31 + c * 19) % 160) + ((r + c) * 3.4)) * 10) / 10;
      const perimeter = Math.round((Math.sqrt(area) * 4 * 1.08) * 10) / 10;
      const centroid: [number, number] = [(latMin + latMax) / 2, (lngMin + lngMax) / 2];

      // Default distribution: mostly verified / candidate, some review, few anomaly
      let status: 'verified' | 'review' | 'candidate' | 'anomaly' = 'candidate';
      let boundaryConfidence = 91 + ((r * 5 + c * 3) % 8);
      let buildingConfidence = 94 + ((r * 7 + c * 2) % 6);
      let buildingDetected = true;
      let changeDetected = false;
      let changeType: any = undefined;

      if ((r + c) % 4 === 0) {
        status = 'verified';
        boundaryConfidence = 96;
      } else if ((r + c) % 5 === 0) {
        status = 'review';
        boundaryConfidence = 78;
      } else if (r === 3 && c === 2) {
        // Star Demo Parcel P-1024
        status = 'review';
        boundaryConfidence = 91;
        buildingConfidence = 97;
        changeDetected = true;
        changeType = 'expansion';
      } else if (r === 3 && c === 3) {
        // Low confidence parcel P-1025
        status = 'anomaly';
        boundaryConfidence = 64;
        buildingConfidence = 71;
        changeDetected = true;
        changeType = 'boundary_mismatch';
      } else if (r === 3 && c === 4) {
        // High confidence parcel P-1026
        status = 'verified';
        boundaryConfidence = 96;
        buildingConfidence = 98;
      } else if (r === 3 && c === 5) {
        status = 'review';
        boundaryConfidence = 78;
        buildingConfidence = 85;
      }

      parcels.push({
        type: 'Feature',
        id: pId,
        geometry: {
          type: 'Polygon',
          coordinates: [coords]
        },
        properties: {
          parcelId: pId,
          area: pId === 'P-1024' ? 148.6 : area,
          perimeter: pId === 'P-1024' ? 51.2 : perimeter,
          centroid,
          surveyDate: '2026-08-14',
          source: 'Drone Orthomosaic RGB-2.1cm',
          status,
          buildingDetected,
          buildingConfidence,
          boundaryConfidence,
          overallConfidence: Math.round((boundaryConfidence * 0.6 + buildingConfidence * 0.4)),
          changeDetected,
          changeType,
          verifiedBy: status === 'verified' ? 'Officer K. Sharma (Survey ID #4409)' : undefined,
          verifiedAt: status === 'verified' ? '2026-08-15 11:24:00 IST' : undefined,
          flagReason: status === 'review' 
            ? 'Minor boundary ambiguity near road setback'
            : status === 'anomaly' 
            ? 'Historical boundary conflict with existing fence wall'
            : undefined,
          explainability: [
            {
              label: 'Building edge detected',
              matched: true,
              score: buildingConfidence,
              description: 'Clear structural facade shadow segmentation'
            },
            {
              label: 'Road boundary corridor alignment',
              matched: true,
              score: 95,
              description: 'Conforms to 6.0m municipal road right-of-way buffer'
            },
            {
              label: 'Historical cadastral boundary agreement',
              matched: status !== 'anomaly',
              score: status === 'anomaly' ? 42 : 88,
              description: status === 'anomaly' ? '4.2m deviation from 2024 survey deed' : 'Concordant within 0.15m tolerance'
            },
            {
              label: 'Orthomosaic edge gradient strength',
              matched: boundaryConfidence > 70,
              score: boundaryConfidence,
              description: 'Sharp contrast between compound wall and adjacent lane'
            },
            {
              label: 'Occlusion & canopy interference',
              matched: true,
              score: 96,
              description: 'Less than 4% tree canopy obstruction across boundary perimeter'
            }
          ]
        }
      });
    }
  }

  return parcels;
}

export const mockParcelsList: ParcelFeature[] = generateParcels();

export const mockParcelsGeoJson: ParcelFeatureCollection = {
  type: 'FeatureCollection',
  features: mockParcelsList
};
