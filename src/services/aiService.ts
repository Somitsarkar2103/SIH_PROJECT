export interface ExtractionParameters {
  buildings: boolean;
  roads: boolean;
  boundaryIndicators: boolean;
  vegetation: boolean;
  openAreas: boolean;
  confidenceThreshold: number; // 0-100
}

export interface ExtractionResult {
  buildingsCount: number;
  roadSegmentsCount: number;
  boundaryCandidatesCount: number;
  lowConfidenceRegionsCount: number;
  processingTimeMs: number;
  gpuMemoryUsedGb: number;
  detectedFeaturesGeoJson: any;
}

export const aiService = {
  runFeatureExtraction: async (params: ExtractionParameters): Promise<ExtractionResult> => {
    // Realistic AI inference latency simulation
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
      buildingsCount: params.buildings ? 438 : 0,
      roadSegmentsCount: params.roads ? 62 : 0,
      boundaryCandidatesCount: params.boundaryIndicators ? 521 : 0,
      lowConfidenceRegionsCount: 31,
      processingTimeMs: 1420,
      gpuMemoryUsedGb: 14.8,
      detectedFeaturesGeoJson: {}
    };
  }
};
