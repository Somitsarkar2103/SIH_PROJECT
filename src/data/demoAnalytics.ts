export const DEMO_ANALYTICS = {
  accuracyMetrics: {
    precision: 95.4,
    recall: 92.1,
    f1Score: 93.7,
    iou: 88.6 // Intersection over Union
  },
  parcelBreakdown: {
    total: 1248,
    aiExtracted: 1196,
    verified: 1159,
    pendingReview: 37,
    rejected: 15
  },
  confidenceDistribution: [
    { range: '90–100%', count: 874, percentage: 70.0, color: '#10B981' },
    { range: '70–89%', count: 322, percentage: 25.8, color: '#F59E0B' },
    { range: '<70%', count: 52, percentage: 4.2, color: '#EF4444' }
  ],
  timeSaved: {
    manualHours: 42,
    aiHours: 11,
    reductionPercentage: 74,
    disclaimer: 'Demo / estimated metric based on benchmark urban cadastral field surveys.'
  },
  featureExtractionStats: {
    buildingsDetected: 438,
    roadSegments: 62,
    boundaryCandidates: 521,
    lowConfidenceRegions: 31,
    vegetationMaskAreaM2: 14280,
    openCourtyardCount: 118
  },
  processingTimeline: [
    { month: 'Oct', manual: 110, aiAssisted: 390 },
    { month: 'Nov', manual: 140, aiAssisted: 520 },
    { month: 'Dec', manual: 130, aiAssisted: 680 },
    { month: 'Jan', manual: 160, aiAssisted: 890 },
    { month: 'Feb', manual: 155, aiAssisted: 1040 },
    { month: 'Mar', manual: 170, aiAssisted: 1248 }
  ]
};
