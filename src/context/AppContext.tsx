import React, { createContext, useContext, useState, useEffect } from 'react';
import { NavigationTab, ToastMessage, LayerState, BasemapType } from '../types/common';
import { ParcelFeature, ParcelStatus } from '../types/parcel';
import { SurveyProject } from '../types/survey';
import { mockParcelsList } from '../data/mockParcels';
import { mockSurveys } from '../data/mockSurveys';
import { parcelsService } from '../services/parcelsService';

interface AppContextType {
  isAuthenticated: boolean;
  loginDemo: () => void;
  logout: () => void;
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
  selectedProject: SurveyProject;
  setSelectedProject: (project: SurveyProject) => void;
  parcels: ParcelFeature[];
  selectedParcel: ParcelFeature | null;
  setSelectedParcel: (parcel: ParcelFeature | null) => void;
  verifyParcel: (parcelId: string, notes?: string) => Promise<void>;
  updateParcelGeometry: (parcelId: string, coords: number[][][]) => Promise<void>;
  activeLayers: LayerState;
  toggleLayer: (layer: keyof LayerState) => void;
  basemap: BasemapType;
  setBasemap: (b: BasemapType) => void;
  toasts: ToastMessage[];
  addToast: (type: 'success' | 'warning' | 'info' | 'error', title: string, message: string) => void;
  removeToast: (id: string) => void;
  demoStep: number;
  setDemoStep: (step: number) => void;
  advanceDemoStep: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isReportModalOpen: boolean;
  setIsReportModalOpen: (open: boolean) => void;
  resetDemoData: () => void;
}

const defaultLayers: LayerState = {
  droneOrthomosaic: true,
  aiBuildings: true,
  candidateParcels: true,
  verifiedParcels: true,
  roads: true,
  vegetation: false,
  historicalParcels: false,
  changeAreas: true
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [selectedProject, setSelectedProject] = useState<SurveyProject>(mockSurveys[0]);
  const [parcels, setParcels] = useState<ParcelFeature[]>(mockParcelsList);
  const [selectedParcel, setSelectedParcel] = useState<ParcelFeature | null>(
    mockParcelsList.find(p => p.properties.parcelId === 'P-1024') || null
  );
  const [activeLayers, setActiveLayers] = useState<LayerState>(defaultLayers);
  const [basemap, setBasemap] = useState<BasemapType>('satellite');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [demoStep, setDemoStep] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  const addToast = (type: 'success' | 'warning' | 'info' | 'error', title: string, message: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newToast: ToastMessage = {
      id,
      type,
      title,
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setToasts(prev => [newToast, ...prev.slice(0, 4)]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const loginDemo = () => {
    setIsAuthenticated(true);
    setCurrentTab('dashboard');
    addToast('success', 'Demo Session Initialized', 'Loaded Bengaluru Urban Ward 112 with 64 cadastral parcels.');
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const toggleLayer = (layer: keyof LayerState) => {
    setActiveLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  const verifyParcel = async (parcelId: string, notes?: string) => {
    try {
      const updated = await parcelsService.updateParcelStatus(parcelId, 'verified', notes);
      setParcels(prev => prev.map(p => p.properties.parcelId === parcelId ? updated : p));
      if (selectedParcel?.properties.parcelId === parcelId) {
        setSelectedParcel(updated);
      }
      addToast('success', 'Parcel Boundary Verified', `Parcel ${parcelId} marked as Verified by Survey Officer.`);
    } catch (err: any) {
      addToast('error', 'Verification Failed', err.message);
    }
  };

  const updateParcelGeometry = async (parcelId: string, coords: number[][][]) => {
    try {
      const updated = await parcelsService.updateParcelGeometry(parcelId, coords);
      setParcels(prev => prev.map(p => p.properties.parcelId === parcelId ? updated : p));
      if (selectedParcel?.properties.parcelId === parcelId) {
        setSelectedParcel(updated);
      }
      addToast('info', 'Boundary Vertices Updated', `Polygon coordinates adjusted for parcel ${parcelId}.`);
    } catch (err: any) {
      addToast('error', 'Edit Failed', err.message);
    }
  };

  const advanceDemoStep = () => {
    setDemoStep(prev => (prev < 12 ? prev + 1 : 1));
  };

  const resetDemoData = () => {
    const fresh = parcelsService.resetDemoParcels();
    setParcels(fresh);
    const starParcel = fresh.find(p => p.properties.parcelId === 'P-1024') || null;
    setSelectedParcel(starParcel);
    setDemoStep(1);
    addToast('info', 'Demo Reset', 'Dataset and workflow reset to initial state.');
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        loginDemo,
        logout,
        currentTab,
        setCurrentTab,
        selectedProject,
        setSelectedProject,
        parcels,
        selectedParcel,
        setSelectedParcel,
        verifyParcel,
        updateParcelGeometry,
        activeLayers,
        toggleLayer,
        basemap,
        setBasemap,
        toasts,
        addToast,
        removeToast,
        demoStep,
        setDemoStep,
        advanceDemoStep,
        searchQuery,
        setSearchQuery,
        isReportModalOpen,
        setIsReportModalOpen,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
