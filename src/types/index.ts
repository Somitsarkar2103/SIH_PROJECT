export type ParcelStatus = 'verified' | 'review' | 'mismatch' | 'ai_candidate' | 'rejected';

export interface LatLng {
  lat: number;
  lng: number;
}

export interface ParcelEvidence {
  buildingEdge: boolean;
  roadBoundary: boolean;
  historicalAlignment: boolean;
  strongImageEdge: boolean;
  noMajorOcclusion: boolean;
  notes?: string;
}

export interface ParcelFeature {
  id: string;
  parcelId: string;
  coordinates: [number, number][]; // [lat, lng] for Leaflet polygon
  area: number; // m²
  perimeter: number; // m
  center: [number, number]; // [lat, lng]
  boundaryConfidence: number; // 0-100%
  buildingConfidence: number; // 0-100%
  buildingDetected: boolean;
  buildingCount: number;
  status: ParcelStatus;
  changeDetected: boolean;
  surveyDate: string;
  source: string;
  evidence: ParcelEvidence;
  landUse: 'Residential' | 'Commercial' | 'Mixed Use' | 'Vacant' | 'Public Utility';
  surveyOfficer?: string;
  verifiedAt?: string;
  flagReason?: string;
}

export interface SurveyProject {
  id: string;
  name: string;
  location: string;
  district: string;
  state: string;
  areaHa: number;
  totalParcels: number;
  aiExtracted: number;
  verifiedParcels: number;
  pendingReview: number;
  changesDetected: number;
  highConfidencePct: number;
  status: 'Processing' | 'Completed' | 'In Review' | 'Draft';
  createdAt: string;
  updatedAt: string;
  surveyOfficer: string;
  crs: string; // e.g., EPSG:4326 (WGS 84)
  gsdCm: number; // Ground sampling distance e.g. 1.8 cm/px
  imageryBands: string[];
  thumbnailUrl?: string;
}

export interface ChangeRecord {
  id: string;
  parcelId: string;
  changeType: 'Building Expansion' | 'New Structure' | 'Boundary Mismatch' | 'Removed Structure';
  affectedArea: number; // m²
  confidence: number; // 0-100%
  coordinates: [number, number];
  previousSurveyYear: number;
  currentSurveyYear: number;
  description: string;
  severity: 'low' | 'medium' | 'high';
  status: 'Pending' | 'Approved' | 'Flagged';
}

export interface ProcessingPipelineStep {
  id: string;
  name: string;
  status: 'completed' | 'in-progress' | 'pending';
  timestamp?: string;
  detail?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'success' | 'warning' | 'info' | 'error';
  targetParcelId?: string;
  targetView?: string;
}

export interface AppSettings {
  aiModel: string;
  modelVersion: string;
  confidenceThreshold: number; // 0-100
  autoApproveThreshold: number; // 0-100
  manualReviewThreshold: number; // 0-100
  crs: string;
  distanceUnit: 'meters' | 'feet';
  areaUnit: 'm²' | 'sqft' | 'hectares';
  defaultBasemap: 'satellite' | 'ortho' | 'streets' | 'dark';
}
