import { ChangeRecord } from '../types';

export const DEMO_CHANGES: ChangeRecord[] = [
  {
    id: 'CH-028',
    parcelId: 'P-1024',
    changeType: 'Building Expansion',
    affectedArea: 18.4,
    confidence: 93,
    coordinates: [12.93405, 77.62118],
    previousSurveyYear: 2024,
    currentSurveyYear: 2026,
    description: 'Eastern masonry extension added to ground floor. Footprint increased from 82.2 m² to 100.6 m².',
    severity: 'medium',
    status: 'Pending'
  },
  {
    id: 'CH-027',
    parcelId: 'P-1025',
    changeType: 'Boundary Mismatch',
    affectedArea: 14.1,
    confidence: 78,
    coordinates: [12.93410, 77.62158],
    previousSurveyYear: 2024,
    currentSurveyYear: 2026,
    description: 'North perimeter compound wall shifted 1.2m outward toward adjacent pathway easement.',
    severity: 'high',
    status: 'Pending'
  },
  {
    id: 'CH-026',
    parcelId: 'P-1028',
    changeType: 'Boundary Mismatch',
    affectedArea: 22.8,
    confidence: 89,
    coordinates: [12.93404, 77.62279],
    previousSurveyYear: 2024,
    currentSurveyYear: 2026,
    description: 'Commercial shed roof extends into public road statutory setback corridor.',
    severity: 'high',
    status: 'Flagged'
  },
  {
    id: 'CH-025',
    parcelId: 'P-1031',
    changeType: 'New Structure',
    affectedArea: 44.5,
    confidence: 96,
    coordinates: [12.93380, 77.62176],
    previousSurveyYear: 2024,
    currentSurveyYear: 2026,
    description: 'New RCC 2-storey residential building erected on previously vacant sub-parcel.',
    severity: 'high',
    status: 'Pending'
  },
  {
    id: 'CH-024',
    parcelId: 'P-1035',
    changeType: 'Building Expansion',
    affectedArea: 12.0,
    confidence: 91,
    coordinates: [12.93380, 77.62328],
    previousSurveyYear: 2024,
    currentSurveyYear: 2026,
    description: 'Rear cantilever balcony enclosure constructed without updated municipal sanction record.',
    severity: 'medium',
    status: 'Pending'
  },
  {
    id: 'CH-023',
    parcelId: 'P-1040',
    changeType: 'Removed Structure',
    affectedArea: 35.0,
    confidence: 95,
    coordinates: [12.93344, 77.62138],
    previousSurveyYear: 2024,
    currentSurveyYear: 2026,
    description: 'Old tin-roof temporary workshop demolished. Parcel cleared for redevelopment.',
    severity: 'low',
    status: 'Approved'
  },
  {
    id: 'CH-022',
    parcelId: 'P-1044',
    changeType: 'New Structure',
    affectedArea: 68.2,
    confidence: 98,
    coordinates: [12.93344, 77.62290],
    previousSurveyYear: 2024,
    currentSurveyYear: 2026,
    description: 'New commercial retail annex built with direct street frontage.',
    severity: 'high',
    status: 'Pending'
  },
  {
    id: 'CH-021',
    parcelId: 'P-1047',
    changeType: 'Building Expansion',
    affectedArea: 9.6,
    confidence: 86,
    coordinates: [12.93308, 77.62176],
    previousSurveyYear: 2024,
    currentSurveyYear: 2026,
    description: 'Side porch converted into permanent enclosed utility space.',
    severity: 'low',
    status: 'Pending'
  },
  {
    id: 'CH-020',
    parcelId: 'P-1051',
    changeType: 'New Structure',
    affectedArea: 52.0,
    confidence: 94,
    coordinates: [12.93308, 77.62328],
    previousSurveyYear: 2024,
    currentSurveyYear: 2026,
    description: 'New duplex residential unit detected on formerly barren land parcel.',
    severity: 'high',
    status: 'Pending'
  },
  {
    id: 'CH-019',
    parcelId: 'P-1055',
    changeType: 'Removed Structure',
    affectedArea: 28.5,
    confidence: 92,
    coordinates: [12.93272, 77.62214],
    previousSurveyYear: 2024,
    currentSurveyYear: 2026,
    description: 'Dilapidated outhouse structure cleared. Open courtyard restored.',
    severity: 'low',
    status: 'Approved'
  },
  {
    id: 'CH-018',
    parcelId: 'P-1058',
    changeType: 'Boundary Mismatch',
    affectedArea: 8.3,
    confidence: 79,
    coordinates: [12.93272, 77.62328],
    previousSurveyYear: 2024,
    currentSurveyYear: 2026,
    description: 'Barbed wire boundary replaced with masonry wall, realigning shared parcel boundary by 45cm.',
    severity: 'medium',
    status: 'Pending'
  },
  {
    id: 'CH-017',
    parcelId: 'P-1062',
    changeType: 'New Structure',
    affectedArea: 76.4,
    confidence: 97,
    coordinates: [12.93236, 77.62176],
    previousSurveyYear: 2024,
    currentSurveyYear: 2026,
    description: 'Substantial commercial warehouse structure completed in late 2025.',
    severity: 'high',
    status: 'Pending'
  },
  // Additional changes to total exactly 28:
  ...Array.from({ length: 16 }).map((_, idx) => {
    const changeIdNum = 16 - idx;
    const pNum = 1063 + idx;
    const types: ChangeRecord['changeType'][] = [
      'New Structure',
      'New Structure',
      'Building Expansion',
      'New Structure',
      'Boundary Mismatch',
      'Building Expansion',
      'New Structure',
      'Removed Structure',
      'New Structure',
      'Building Expansion',
      'New Structure',
      'New Structure',
      'Building Expansion',
      'New Structure',
      'New Structure',
      'Building Expansion'
    ];
    const type = types[idx % types.length];
    return {
      id: `CH-${String(changeIdNum).padStart(3, '0')}`,
      parcelId: `P-${pNum}`,
      changeType: type,
      affectedArea: Math.round((10 + (idx * 3.7)) * 10) / 10,
      confidence: 85 + (idx % 12),
      coordinates: [12.9320 - (idx * 0.0001), 77.6215 + (idx * 0.00015)] as [number, number],
      previousSurveyYear: 2024,
      currentSurveyYear: 2026,
      description: `${type} identified via multi-temporal orthomosaic diff analysis.`,
      severity: (idx % 3 === 0 ? 'high' : idx % 3 === 1 ? 'medium' : 'low') as 'high' | 'medium' | 'low',
      status: (idx % 4 === 0 ? 'Approved' : idx % 7 === 0 ? 'Flagged' : 'Pending') as 'Pending' | 'Approved' | 'Flagged'
    };
  })
];

export const CHANGE_STATS = {
  total: 28,
  newStructures: 14,
  buildingExpansions: 7,
  boundaryMismatches: 4,
  removedStructures: 3
};
