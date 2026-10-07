export interface ChangeAnomaly {
  id: string;
  parcelId: string;
  changeType: 'Building Expansion' | 'New Structure' | 'Boundary Mismatch' | 'Removed Structure';
  severity: 'high' | 'medium' | 'low';
  estimatedAreaDelta: number; // m²
  confidence: number;
  coordinates: [number, number]; // [lat, lng]
  historicalSurveyDate: string;
  currentSurveyDate: string;
  status: 'pending' | 'reviewed' | 'resolved';
  description: string;
}
