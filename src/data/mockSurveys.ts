import { SurveyProject, ProcessingStep } from '../types/survey';

export const mockSurveys: SurveyProject[] = [
  {
    id: 'SURV-BLR-2026-04',
    name: 'Bengaluru Urban Survey — Ward 112',
    location: 'Indiranagar / Halasuru, Bengaluru',
    state: 'Karnataka',
    areaHectares: 12.4,
    parcelCount: 1248,
    verifiedCount: 1196,
    reviewCount: 37,
    changesCount: 28,
    status: 'Processing',
    surveyDate: '2026-08-14',
    officer: 'Senior Survey Officer Rajesh Rao',
    crs: 'EPSG:32643 (WGS 84 / UTM zone 43N)',
    gsdCm: 2.1,
    imageCount: 428
  },
  {
    id: 'SURV-MYS-2026-01',
    name: 'Mysuru Heritage & Municipal Survey',
    location: 'Chamundi Foothills, Mysuru',
    state: 'Karnataka',
    areaHectares: 8.2,
    parcelCount: 732,
    verifiedCount: 732,
    reviewCount: 0,
    changesCount: 11,
    status: 'Completed',
    surveyDate: '2026-07-22',
    officer: 'Survey Officer Priya Nair',
    crs: 'EPSG:32643 (WGS 84 / UTM zone 43N)',
    gsdCm: 2.5,
    imageCount: 310
  },
  {
    id: 'SURV-WFD-2026-09',
    name: 'Whitefield Industrial Corridor Phase 2',
    location: 'EPIP Zone, Bengaluru',
    state: 'Karnataka',
    areaHectares: 24.1,
    parcelCount: 2410,
    verifiedCount: 2180,
    reviewCount: 142,
    changesCount: 54,
    status: 'Pending Review',
    surveyDate: '2026-08-02',
    officer: 'Survey Officer Anand Kulkarni',
    crs: 'EPSG:32643 (WGS 84 / UTM zone 43N)',
    gsdCm: 1.8,
    imageCount: 890
  }
];

export const mockProcessingSteps: ProcessingStep[] = [
  {
    id: 'step-1',
    name: 'Drone imagery uploaded',
    status: 'completed',
    details: '428 Nadir & Oblique RAW frames ingested (1.84 GB)',
    timestamp: '14:20:11'
  },
  {
    id: 'step-2',
    name: 'Orthomosaic validated & georeferenced',
    status: 'completed',
    details: 'High-res orthomosaic generated (GSD: 2.1 cm/pixel, RMSE 1.4cm)',
    timestamp: '14:22:45'
  },
  {
    id: 'step-3',
    name: 'Coordinate system aligned',
    status: 'completed',
    details: 'Reprojected to EPSG:32643 (WGS 84 / UTM Zone 43N)',
    timestamp: '14:23:10'
  },
  {
    id: 'step-4',
    name: 'AI feature extraction in progress',
    status: 'in-progress',
    details: 'Cadastra-SegNet v3.2 semantic inference running on 4 tiles',
    timestamp: '14:24:02'
  },
  {
    id: 'step-5',
    name: 'Parcel boundary candidate generation',
    status: 'pending',
    details: 'Geometric polygon polygonizer & edge regularizer pending',
    timestamp: 'Upcoming'
  },
  {
    id: 'step-6',
    name: 'Quality assessment & confidence audit',
    status: 'pending',
    details: 'Topology validation, overlap detection & ground truth matching',
    timestamp: 'Upcoming'
  }
];
