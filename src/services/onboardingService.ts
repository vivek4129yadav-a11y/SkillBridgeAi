import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';

export interface StudentOnboardingData {
  full_name: string;
  age: number;
  gender: string;
  state: string;
  city: string;
  education_level: string;
  stream: string;
  college_name?: string;
  career_interests: string[];
  preferred_location: string;
  languages: string[];
}

export interface BlueCollarOnboardingData {
  full_name: string;
  age: number;
  gender: string;
  state: string;
  city: string;
  village_district?: string;
  primary_trade: string;
  secondary_skills: string[];
  years_experience: string;
  currently_employed: string;
  work_radius: string;
  languages: string[];
  owns_smartphone: boolean;
}

export interface InformalWorkerOnboardingData {
  full_name: string;
  age: number;
  gender: string;
  state: string;
  city_village: string;
  work_type: string;
  monthly_income: string;
  digital_literacy: string;
  owns_smartphone: boolean;
  languages: string[];
  goals: string[];
}

export interface EmployerOnboardingData {
  contact_name: string;
  designation: string;
  company_name: string;
  industry: string;
  company_size: string;
  state: string;
  city: string;
  hiring_roles: string[];
  candidate_skills: string[];
  work_type: string;
}

export interface NgoOnboardingData {
  org_name: string;
  reg_number?: string;
  focus_sectors: string[];
  coverage_areas: string[];
  beneficiary_types: string[];
  contact_name: string;
  contact_designation: string;
}

export interface GovtOnboardingData {
  full_name: string;
  designation: string;
  department: string;
  state_jurisdiction: string;
  district_jurisdiction: string[];
  access_level: string;
}

export const onboardingService = {
  submitStudentOnboarding: async (data: StudentOnboardingData) => {
    // Send data as is, backend handles mapping
    const response = await api.post(`/onboarding/student?step=5`, data);
    const result = response.data.data;

    if (result?.onboarding_done) {
      const { user } = useAuthStore.getState();
      if (user) {
        useAuthStore.setState({ user: { ...user, onboarding_done: true } });
      }
    }
    
    return result;
  },

  submitBlueCollarOnboarding: async (data: BlueCollarOnboardingData) => {
    const response = await api.post(`/onboarding/blue_collar?step=5`, data);
    const result = response.data.data;
    
    if (result?.onboarding_done) {
      const { user } = useAuthStore.getState();
      if (user) {
        useAuthStore.setState({ user: { ...user, onboarding_done: true } });
      }
    }
    
    return result;
  },

  submitInformalWorkerOnboarding: async (data: InformalWorkerOnboardingData) => {
    const response = await api.post(`/onboarding/informal_worker`, data);
    const result = response.data.data;
    
    if (result?.onboarding_done) {
      const { user } = useAuthStore.getState();
      if (user) {
        useAuthStore.setState({ user: { ...user, onboarding_done: true } });
      }
    }
    
    return result;
  },

  submitEmployerOnboarding: async (data: EmployerOnboardingData) => {
    const response = await api.post(`/onboarding/employer`, data);
    const result = response.data.data;
    
    if (result?.onboarding_done) {
      const { user } = useAuthStore.getState();
      if (user) {
        useAuthStore.setState({ user: { ...user, onboarding_done: true } });
      }
    }
    
    return result;
  },

  submitNgoOnboarding: async (data: NgoOnboardingData) => {
    const response = await api.post(`/onboarding/ngo`, data);
    const result = response.data.data;
    
    if (result?.onboarding_done) {
      const { user } = useAuthStore.getState();
      if (user) {
        useAuthStore.setState({ user: { ...user, onboarding_done: true } });
      }
    }
    
    return result;
  },

  submitGovtOnboarding: async (data: GovtOnboardingData) => {
    const response = await api.post(`/onboarding/government`, data);
    const result = response.data.data;
    
    if (result?.onboarding_done) {
      const { user } = useAuthStore.getState();
      if (user) {
        useAuthStore.setState({ user: { ...user, onboarding_done: true } });
      }
    }
    
    return result;
  },

  getOnboardingState: async () => {
    const response = await api.get('/onboarding/state');
    return response.data.data;
  }
};
