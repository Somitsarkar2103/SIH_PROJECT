export interface SurveyProject {
  id: string;
  name: string;
  location: string;
  state: string;
  areaHectares: number;
  parcelCount: number;
  verifiedCount: number;
  reviewCount: number;
  changesCount: number;
  status: 'Processing' | 'Completed' | 'Pending Review' | 'Draft';
  surveyDate: string;
  officer: string;
  crs: string; // e.g. 'EPSG:32643 (UTM 43N)'
  gsdCm: number; // Ground sampling distance in cm
  imageCount: number;
  thumbnailUrl?: string;
}

export interface ProcessingStep {
  id: string;
  name: string;
  status: 'completed' | 'in-progress' | 'pending' | 'failed';
  details: string;
  timestamp?: string;
}
