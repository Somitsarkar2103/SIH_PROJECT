import React from 'react';
import { useApp } from './context/AppContext';
import { LoginLanding } from './pages/LoginLanding';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { ToastContainer } from './components/layout/ToastContainer';
import { DemoStorylineGuide } from './components/demo/DemoStorylineGuide';
import { ReportPreviewModal } from './pages/ReportPreviewModal';

// Pages
import { Dashboard } from './pages/Dashboard';
import { SurveyProjects } from './pages/SurveyProjects';
import { DroneUpload } from './pages/DroneUpload';
import { ProcessingPipeline } from './pages/ProcessingPipeline';
import { AiExtraction } from './pages/AiExtraction';
import { ParcelMapping } from './pages/ParcelMapping';
import { VerificationQueue } from './pages/VerificationQueue';
import { ChangeDetection } from './pages/ChangeDetection';
import { Analytics } from './pages/Analytics';
import { ExportCenter } from './pages/ExportCenter';
import { Settings } from './pages/Settings';

export const App: React.FC = () => {
  const { isAuthenticated, currentTab } = useApp();

  if (!isAuthenticated) {
    return (
      <>
        <LoginLanding />
        <ToastContainer />
      </>
    );
  }

  const renderActiveScreen = () => {
    switch (currentTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        return <SurveyProjects />;
      case 'drone-upload':
        return <DroneUpload />;
      case 'processing':
        return <ProcessingPipeline />;
      case 'ai-extraction':
        return <AiExtraction />;
      case 'parcel-mapping':
        return <ParcelMapping />;
      case 'verification':
        return <VerificationQueue />;
      case 'change-detection':
        return <ChangeDetection />;
      case 'analytics':
        return <Analytics />;
      case 'exports':
        return <ExportCenter />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gis-darkest text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 10-Item Collapsible GIS Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        <Header />
        
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          {renderActiveScreen()}
        </main>
      </div>

      {/* Interactive Toast Notifications */}
      <ToastContainer />

      {/* Hackathon Evaluator 12-Step Floating Guide */}
      <DemoStorylineGuide />

      {/* Official Cadastral Survey Draft Report Modal */}
      <ReportPreviewModal />
    </div>
  );
};
