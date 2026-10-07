import { SurveyProject, ProcessingStep } from '../types/survey';
import { mockSurveys, mockProcessingSteps } from '../data/mockSurveys';

let localSurveys = [...mockSurveys];

export const surveyService = {
  getSurveys: async (): Promise<SurveyProject[]> => {
    return [...localSurveys];
  },

  getSurveyById: async (id: string): Promise<SurveyProject | undefined> => {
    return localSurveys.find(s => s.id === id);
  },

  createSurvey: async (project: Omit<SurveyProject, 'id'>): Promise<SurveyProject> => {
    const newSurvey: SurveyProject = {
      ...project,
      id: `SURV-NEW-${Date.now().toString().slice(-4)}`
    };
    localSurveys = [newSurvey, ...localSurveys];
    return newSurvey;
  },

  getProcessingPipeline: async (): Promise<ProcessingStep[]> => {
    return [...mockProcessingSteps];
  }
};
