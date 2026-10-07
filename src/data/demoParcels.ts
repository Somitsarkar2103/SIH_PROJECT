import { ParcelFeature } from '../types';

// Anchor around Bengaluru Urban Sector (approx 12.9340 N, 77.6200 E)
const BASE_LAT = 12.9342;
const BASE_LNG = 77.6210;

// Helper to create grid-like realistic cadastral parcel polygons
function generateParcels(): ParcelFeature[] {
  const parcels: ParcelFeature[] = [];
  
  // Specific required parcels:
  // 1. P-1024 (Hero Demo Parcel)
  parcels.push({
    id: 'parcel-1024',
    parcelId: 'P-1024',
    coordinates: [
      [BASE_LAT, BASE_LNG],
      [BASE_LAT, BASE_LNG + 0.00035],
      [BASE_LAT - 0.00032, BASE_LNG + 0.00035],
      [BASE_LAT - 0.00032, BASE_LNG]
    ],
    area: 148.6,
    perimeter: 54.2,
    center: [BASE_LAT - 0.00016, BASE_LNG + 0.000175],
    boundaryConfidence: 91,
    buildingConfidence: 97,
    buildingDetected: true,
    buildingCount: 1,
    status: 'review',
    changeDetected: true,
    surveyDate: '2026-03-08',
    source: 'High-Res UAV Orthomosaic (1.8cm GSD)',
    landUse: 'Residential',
    surveyOfficer: 'Off. Rajesh Varma',
    evidence: {
      buildingEdge: true,
      roadBoundary: true,
      historicalAlignment: true,
      strongImageEdge: true,
      noMajorOcclusion: true,
      notes: 'South boundary aligned with masonry wall; East wall expanded by 3.2m beyond 2024 record.'
    }
  });

  // 2. P-1025 (Low Confidence Parcel for Step 6/7 Demo)
  parcels.push({
    id: 'parcel-1025',
    parcelId: 'P-1025',
    coordinates: [
      [BASE_LAT, BASE_LNG + 0.00038],
      [BASE_LAT + 0.00005, BASE_LNG + 0.00075],
      [BASE_LAT - 0.00030, BASE_LNG + 0.00078],
      [BASE_LAT - 0.00032, BASE_LNG + 0.00038]
    ],
    area: 182.4,
    perimeter: 62.8,
    center: [BASE_LAT - 0.00014, BASE_LNG + 0.00058],
    boundaryConfidence: 64,
    buildingConfidence: 82,
    buildingDetected: true,
    buildingCount: 2,
    status: 'review',
    changeDetected: true,
    surveyDate: '2026-03-08',
    source: 'High-Res UAV Orthomosaic (1.8cm GSD)',
    landUse: 'Mixed Use',
    surveyOfficer: 'Off. Rajesh Varma',
    flagReason: 'Dense tree canopy occludes north-eastern corner. Manual vertex adjustment suggested.',
    evidence: {
      buildingEdge: true,
      roadBoundary: false,
      historicalAlignment: false,
      strongImageEdge: false,
      noMajorOcclusion: false,
      notes: 'Vegetation interference (NDVI > 0.65). Boundary candidate interpolated from neighboring offsets.'
    }
  });

  // 3. P-1026 (Verified High-Confidence Parcel)
  parcels.push({
    id: 'parcel-1026',
    parcelId: 'P-1026',
    coordinates: [
      [BASE_LAT, BASE_LNG + 0.00081],
      [BASE_LAT, BASE_LNG + 0.00120],
      [BASE_LAT - 0.00032, BASE_LNG + 0.00120],
      [BASE_LAT - 0.00032, BASE_LNG + 0.00081]
    ],
    area: 215.0,
    perimeter: 68.4,
    center: [BASE_LAT - 0.00016, BASE_LNG + 0.001005],
    boundaryConfidence: 96,
    buildingConfidence: 98,
    buildingDetected: true,
    buildingCount: 1,
    status: 'verified',
    changeDetected: false,
    surveyDate: '2026-03-08',
    source: 'High-Res UAV Orthomosaic (1.8cm GSD)',
    landUse: 'Residential',
    surveyOfficer: 'Off. Rajesh Varma',
    verifiedAt: '2026-03-08 11:20 AM',
    evidence: {
      buildingEdge: true,
      roadBoundary: true,
      historicalAlignment: true,
      strongImageEdge: true,
      noMajorOcclusion: true,
      notes: 'Perimeter concrete compound wall distinctly segmented. 100% agreement with cadastral grid.'
    }
  });

  // 4. P-1027 (Review Parcel)
  parcels.push({
    id: 'parcel-1027',
    parcelId: 'P-1027',
    coordinates: [
      [BASE_LAT, BASE_LNG + 0.00123],
      [BASE_LAT, BASE_LNG + 0.00158],
      [BASE_LAT - 0.00032, BASE_LNG + 0.00158],
      [BASE_LAT - 0.00032, BASE_LNG + 0.00123]
    ],
    area: 164.2,
    perimeter: 56.1,
    center: [BASE_LAT - 0.00016, BASE_LNG + 0.001405],
    boundaryConfidence: 78,
    buildingConfidence: 89,
    buildingDetected: true,
    buildingCount: 1,
    status: 'review',
    changeDetected: false,
    surveyDate: '2026-03-08',
    source: 'High-Res UAV Orthomosaic (1.8cm GSD)',
    landUse: 'Residential',
    evidence: {
      buildingEdge: true,
      roadBoundary: true,
      historicalAlignment: false,
      strongImageEdge: true,
      noMajorOcclusion: true,
      notes: 'Minor fence offset from 2024 boundary record. Survey verification pending.'
    }
  });

  // 5. P-1028 (Mismatch / Anomaly Parcel)
  parcels.push({
    id: 'parcel-1028',
    parcelId: 'P-1028',
    coordinates: [
      [BASE_LAT, BASE_LNG + 0.00161],
      [BASE_LAT, BASE_LNG + 0.00198],
      [BASE_LAT - 0.00032, BASE_LNG + 0.00198],
      [BASE_LAT - 0.00032, BASE_LNG + 0.00161]
    ],
    area: 172.5,
    perimeter: 58.6,
    center: [BASE_LAT - 0.00016, BASE_LNG + 0.001795],
    boundaryConfidence: 58,
    buildingConfidence: 94,
    buildingDetected: true,
    buildingCount: 2,
    status: 'mismatch',
    changeDetected: true,
    surveyDate: '2026-03-08',
    source: 'High-Res UAV Orthomosaic (1.8cm GSD)',
    landUse: 'Commercial',
    flagReason: 'Significant boundary protrusion into public road right-of-way (ROW).',
    evidence: {
      buildingEdge: true,
      roadBoundary: false,
      historicalAlignment: false,
      strongImageEdge: true,
      noMajorOcclusion: true,
      notes: 'New commercial canopy encroaches 1.9m onto adjacent arterial road corridor.'
    }
  });

  // Generate 55 more contiguous parcels in 6 rows x 10 cols grid around this sector
  const rows = 6;
  const cols = 10;
  const latStep = 0.00036;
  const lngStep = 0.00038;

  let parcelNum = 1029;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Skip cells occupied by hero parcels
      if (r === 0 && c < 5) continue;

      const pLat = BASE_LAT - (r * latStep);
      const pLng = BASE_LNG + (c * lngStep);
      
      const width = lngStep * (0.88 + (Math.sin(r + c) * 0.05));
      const height = latStep * (0.86 + (Math.cos(r * c) * 0.05));

      // Deterministic pseudo-random confidence and status
      const seed = (r * 13 + c * 29) % 100;
      let status: ParcelFeature['status'] = 'verified';
      let boundaryConfidence = 92 + (seed % 7);
      let changeDetected = false;

      if (seed < 8) {
        status = 'mismatch';
        boundaryConfidence = 62 + (seed % 8);
        changeDetected = true;
      } else if (seed < 22) {
        status = 'review';
        boundaryConfidence = 74 + (seed % 12);
        changeDetected = seed % 2 === 0;
      } else if (seed < 30) {
        status = 'ai_candidate';
        boundaryConfidence = 88 + (seed % 8);
      }

      const pId = `P-${parcelNum}`;
      const area = Math.round((120 + ((r * 17 + c * 23) % 110)) * 10) / 10;

      parcels.push({
        id: `parcel-${parcelNum}`,
        parcelId: pId,
        coordinates: [
          [pLat, pLng],
          [pLat, pLng + width],
          [pLat - height, pLng + width],
          [pLat - height, pLng]
        ],
        area,
        perimeter: Math.round(Math.sqrt(area) * 4.2 * 10) / 10,
        center: [pLat - (height / 2), pLng + (width / 2)],
        boundaryConfidence,
        buildingConfidence: Math.min(99, boundaryConfidence + 5),
        buildingDetected: seed > 5,
        buildingCount: seed > 80 ? 2 : (seed > 10 ? 1 : 0),
        status,
        changeDetected,
        surveyDate: '2026-03-08',
        source: 'High-Res UAV Orthomosaic (1.8cm GSD)',
        landUse: r === 0 ? 'Commercial' : (seed > 75 ? 'Mixed Use' : 'Residential'),
        surveyOfficer: status === 'verified' ? 'Off. Rajesh Varma' : undefined,
        verifiedAt: status === 'verified' ? '2026-03-08' : undefined,
        evidence: {
          buildingEdge: true,
          roadBoundary: true,
          historicalAlignment: status === 'verified',
          strongImageEdge: boundaryConfidence > 75,
          noMajorOcclusion: boundaryConfidence > 70,
          notes: status === 'verified' 
            ? 'Clear boundary markers identified. Aligned with sub-division records.'
            : 'Candidate generated from semantic segmentation edge probability.'
        }
      });

      parcelNum++;
    }
  }

  return parcels;
}

export const INITIAL_PARCELS: ParcelFeature[] = generateParcels();

// Road network segments for GIS layer
export const ROAD_SEGMENTS = [
  // Arterial road running East-West above row 0
  [
    [BASE_LAT + 0.0001, BASE_LNG - 0.0005],
    [BASE_LAT + 0.0001, BASE_LNG + 0.0045]
  ],
  // Collector road running North-South
  [
    [BASE_LAT + 0.0005, BASE_LNG + 0.0020],
    [BASE_LAT - 0.0025, BASE_LNG + 0.0020]
  ],
  // Secondary street between row 2 and 3
  [
    [BASE_LAT - 0.0010, BASE_LNG - 0.0002],
    [BASE_LAT - 0.0010, BASE_LNG + 0.0042]
  ]
];
