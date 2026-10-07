export interface ModelMetrics {
  precision: number;
  recall: number;
  f1: number;
  iou: number;
  totalParcels: number;
  verified: number;
  pending: number;
  rejected: number;
  manualHours: number;
  aiHours: number;
  timeReductionPct: number;
  confidenceBuckets: {
    range: string;
    count: number;
    percentage: number;
    color: string;
  }[];
}

export const mockAnalyticsData: ModelMetrics = {
  precision: 95.8,
  recall: 93.4,
  f1: 94.6,
  iou: 88.2,
  totalParcels: 1248,
  verified: 1196,
  pending: 37,
  rejected: 15,
  manualHours: 42,
  aiHours: 11,
  timeReductionPct: 74,
  confidenceBuckets: [
    { range: '90–100%', count: 1023, percentage: 82, color: '#10B981' },
    { range: '70–90%', count: 187, percentage: 15, color: '#F59E0B' },
    { range: '<70%', count: 38, percentage: 3, color: '#EF4444' }
  ]
};
