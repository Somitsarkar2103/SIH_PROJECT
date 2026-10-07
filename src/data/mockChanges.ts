import { ChangeAnomaly } from '../types/change';

export const mockChanges: ChangeAnomaly[] = [
  {
    id: 'CH-028',
    parcelId: 'P-1024',
    changeType: 'Building Expansion',
    severity: 'medium',
    estimatedAreaDelta: 18.4,
    confidence: 93,
    coordinates: [12.9716, 77.5946],
    historicalSurveyDate: '2024-03-12',
    currentSurveyDate: '2026-08-14',
    status: 'pending',
    description: 'Rear patio cantilever roof & extension detected outside 2024 sanctioned building footprint (+18.4 m²).'
  },
  {
    id: 'CH-014',
    parcelId: 'P-1025',
    changeType: 'Boundary Mismatch',
    severity: 'high',
    estimatedAreaDelta: 24.8,
    confidence: 88,
    coordinates: [12.9724, 77.5957],
    historicalSurveyDate: '2024-03-12',
    currentSurveyDate: '2026-08-14',
    status: 'pending',
    description: 'Newly constructed perimeter masonry wall encroaches 1.8m into eastern access road setback.'
  },
  {
    id: 'CH-003',
    parcelId: 'P-1011',
    changeType: 'New Structure',
    severity: 'high',
    estimatedAreaDelta: 82.5,
    confidence: 96,
    coordinates: [12.9708, 77.5935],
    historicalSurveyDate: '2024-03-12',
    currentSurveyDate: '2026-08-14',
    status: 'reviewed',
    description: 'G+2 commercial showroom constructed on previously vacant parcel lot.'
  },
  {
    id: 'CH-019',
    parcelId: 'P-1033',
    changeType: 'Removed Structure',
    severity: 'low',
    estimatedAreaDelta: 35.0,
    confidence: 91,
    coordinates: [12.9732, 77.5968],
    historicalSurveyDate: '2024-03-12',
    currentSurveyDate: '2026-08-14',
    status: 'reviewed',
    description: 'Temporary asbestos shed demolished in readiness for road widening alignment.'
  },
  {
    id: 'CH-022',
    parcelId: 'P-1048',
    changeType: 'Building Expansion',
    severity: 'medium',
    estimatedAreaDelta: 12.6,
    confidence: 89,
    coordinates: [12.9701, 77.5924],
    historicalSurveyDate: '2024-03-12',
    currentSurveyDate: '2026-08-14',
    status: 'pending',
    description: 'Side terrace enclosed with RCC slab and brick masonry.'
  }
];
