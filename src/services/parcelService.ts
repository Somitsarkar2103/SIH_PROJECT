import { ParcelFeature, ParcelStatus } from '../types';
import { INITIAL_PARCELS } from '../data/demoParcels';

class ParcelService {
  private parcels: ParcelFeature[] = [...INITIAL_PARCELS];
  private listeners: (() => void)[] = [];

  public getAll(): ParcelFeature[] {
    return this.parcels;
  }

  public getById(idOrParcelId: string): ParcelFeature | undefined {
    return this.parcels.find(p => p.id === idOrParcelId || p.parcelId === idOrParcelId);
  }

  public updateStatus(parcelId: string, status: ParcelStatus, officer = 'Off. Rajesh Varma', reason?: string): ParcelFeature | null {
    const idx = this.parcels.findIndex(p => p.parcelId === parcelId || p.id === parcelId);
    if (idx === -1) return null;

    const updated = {
      ...this.parcels[idx],
      status,
      surveyOfficer: officer,
      verifiedAt: status === 'verified' ? new Date().toISOString().replace('T', ' ').substring(0, 19) : undefined,
      flagReason: reason || this.parcels[idx].flagReason
    };

    this.parcels[idx] = updated;
    this.notify();
    return updated;
  }

  public updateCoordinates(parcelId: string, newCoordinates: [number, number][]): ParcelFeature | null {
    const idx = this.parcels.findIndex(p => p.parcelId === parcelId || p.id === parcelId);
    if (idx === -1) return null;

    // Recalculate center roughly
    const lats = newCoordinates.map(c => c[0]);
    const lngs = newCoordinates.map(c => c[1]);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    const updated = {
      ...this.parcels[idx],
      coordinates: newCoordinates,
      center: [(minLat + maxLat) / 2, (minLng + maxLng) / 2] as [number, number],
      boundaryConfidence: Math.min(99, Math.max(90, this.parcels[idx].boundaryConfidence + 15)), // boost confidence after manual correction
      evidence: {
        ...this.parcels[idx].evidence,
        notes: 'Boundary manually adjusted and snapped by Survey Officer.'
      }
    };

    this.parcels[idx] = updated;
    this.notify();
    return updated;
  }

  public subscribe(callback: () => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  private notify() {
    this.listeners.forEach(cb => cb());
  }

  public resetDemoData() {
    this.parcels = [...INITIAL_PARCELS];
    this.notify();
  }
}

export const parcelService = new ParcelService();
