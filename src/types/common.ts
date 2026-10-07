export type NavigationTab = 
  | 'dashboard'
  | 'projects'
  | 'drone-upload'
  | 'processing'
  | 'ai-extraction'
  | 'parcel-mapping'
  | 'verification'
  | 'change-detection'
  | 'analytics'
  | 'exports'
  | 'settings';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: string;
}

export interface LayerState {
  droneOrthomosaic: boolean;
  aiBuildings: boolean;
  candidateParcels: boolean;
  verifiedParcels: boolean;
  roads: boolean;
  vegetation: boolean;
  historicalParcels: boolean;
  changeAreas: boolean;
}

export type BasemapType = 'satellite' | 'streets' | 'dark' | 'topo';
