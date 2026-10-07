import { ParcelFeature, ParcelStatus } from '../types/parcel';
import { mockParcelsList } from '../data/mockParcels';

// In-memory reactive store
let localParcels: ParcelFeature[] = JSON.parse(JSON.stringify(mockParcelsList));

export const parcelsService = {
  getAllParcels: async (): Promise<ParcelFeature[]> => {
    return [...localParcels];
  },

  getParcelById: async (id: string): Promise<ParcelFeature | undefined> => {
    return localParcels.find(p => p.properties.parcelId === id);
  },

  updateParcelStatus: async (
    id: string, 
    status: ParcelStatus, 
    officerNotes?: string
  ): Promise<ParcelFeature> => {
    const parcelIndex = localParcels.findIndex(p => p.properties.parcelId === id);
    if (parcelIndex === -1) {
      throw new Error(`Parcel ${id} not found`);
    }

    const current = localParcels[parcelIndex];
    const updated: ParcelFeature = {
      ...current,
      properties: {
        ...current.properties,
        status,
        verifiedBy: status === 'verified' ? 'Officer K. Sharma (Emp #9042)' : current.properties.verifiedBy,
        verifiedAt: status === 'verified' ? new Date().toISOString().replace('T', ' ').substring(0, 19) + ' IST' : current.properties.verifiedAt,
        notes: officerNotes || current.properties.notes
      }
    };

    localParcels[parcelIndex] = updated;
    return updated;
  },

  updateParcelGeometry: async (
    id: string,
    newCoordinates: number[][][]
  ): Promise<ParcelFeature> => {
    const parcelIndex = localParcels.findIndex(p => p.properties.parcelId === id);
    if (parcelIndex === -1) {
      throw new Error(`Parcel ${id} not found`);
    }

    const current = localParcels[parcelIndex];
    // Slightly recalculate area based on coordinate tweak
    const updatedArea = Math.round((current.properties.area + (Math.random() * 2 - 1)) * 10) / 10;

    const updated: ParcelFeature = {
      ...current,
      geometry: {
        type: 'Polygon',
        coordinates: newCoordinates
      },
      properties: {
        ...current.properties,
        area: updatedArea,
        boundaryConfidence: Math.min(99, current.properties.boundaryConfidence + 5),
        notes: 'Boundary vertices adjusted manually by survey officer.'
      }
    };

    localParcels[parcelIndex] = updated;
    return updated;
  },

  resetDemoParcels: () => {
    localParcels = JSON.parse(JSON.stringify(mockParcelsList));
    return [...localParcels];
  }
};
