export type ParcelStatus = 'verified' | 'review' | 'candidate' | 'anomaly';

export interface ExplainabilityFactor {
  label: string;
  matched: boolean;
  score: number;
  description: string;
}

export interface ParcelProperties {
  parcelId: string;
  area: number; // in m²
  perimeter: number; // in meters
  centroid: [number, number]; // [lat, lng]
  surveyDate: string;
  source: string;
  status: ParcelStatus;
  
  // AI Metrics
  buildingDetected: boolean;
  buildingConfidence: number; // percentage 0-100
  boundaryConfidence: number; // percentage 0-100
  overallConfidence: number;
  changeDetected: boolean;
  changeType?: 'expansion' | 'new_structure' | 'boundary_mismatch' | 'removed_structure';
  
  // Verification audit trail
  verifiedBy?: string;
  verifiedAt?: string;
  flagReason?: string;
  notes?: string;
  
  // Explainable AI factors
  explainability: ExplainabilityFactor[];
}

export interface ParcelFeature {
  type: 'Feature';
  id: string;
  geometry: {
    type: 'Polygon';
    coordinates: number[][][]; // [lng, lat]
  };
  properties: ParcelProperties;
}

export interface ParcelFeatureCollection {
  type: 'FeatureCollection';
  features: ParcelFeature[];
}
