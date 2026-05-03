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
  focus_sector: string;
  coverage_areas: string[];
  beneficiary_type: string;
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
    // Map frontend fields to backend schema expectations
    const locationMap: Record<string, string> = {
      'same city': 'Same City',
      'same state': 'State',
      'anywhere': 'Anywhere'
    };

    const backendData = {
      full_name: data.full_name,
      age: data.age,
      gender: data.gender,
      state: data.state,
      city: data.city,
      preferred_job_location: locationMap[data.preferred_location] || 'Anywhere',
      education_level: data.education_level,
      stream: data.stream,
      institution_name: data.college_name,
      career_interests: data.career_interests,
      languages_known: data.languages
    };
    
    // Using step=4 to indicate final step for student onboarding
    const response = await api.post(`/onboarding/student?step=4`, backendData);
    
    if (response.data) {
      useAuthStore.setState((state) => ({
        user: state.user ? { ...state.user, onboarding_done: true } : null,
      }));
    }
    
    return response.data;
  },

  submitBlueCollarOnboarding: async (data: BlueCollarOnboardingData) => {
    // Map frontend fields to backend schema expectations
    const backendData = {
      full_name: data.full_name,
      age: data.age,
      gender: data.gender,
      state: data.state,
      city: data.city,
      village_district: data.village_district,
      primary_trade: data.primary_trade,
      secondary_skills: data.secondary_skills,
      years_experience: data.years_experience,
      is_currently_employed: data.currently_employed,
      preferred_work_radius: data.work_radius,
      languages_known: data.languages,
      owns_smartphone: data.owns_smartphone
    };

    // Using step=5 to indicate final step for blue collar onboarding
    const response = await api.post(`/onboarding/blue_collar?step=5`, backendData);
    
    if (response.data) {
      useAuthStore.setState((state) => ({
        user: state.user ? { ...state.user, onboarding_done: true } : null,
      }));
    }
    
    return response.data;
  },

  submitInformalWorkerOnboarding: async (data: InformalWorkerOnboardingData) => {
    // Map frontend fields to backend schema expectations
    const backendData = {
      full_name: data.full_name,
      age: data.age,
      gender: data.gender,
      state: data.state,
      city_village: data.city_village,
      current_work_type: data.work_type,
      monthly_income: data.monthly_income,
      digital_literacy: data.digital_literacy,
      owns_smartphone: data.owns_smartphone,
      languages_known: data.languages,
      interests: data.goals
    };

    const response = await api.post(`/onboarding/informal_worker`, backendData);
    
    if (response.data) {
      useAuthStore.setState((state) => ({
        user: state.user ? { ...state.user, onboarding_done: true } : null,
      }));
    }
    
    return response.data;
  },

  submitEmployerOnboarding: async (data: EmployerOnboardingData) => {
    const response = await api.post(`/onboarding/employer`, data);
    
    if (response.data) {
      useAuthStore.setState((state) => ({
        user: state.user ? { ...state.user, onboarding_done: true } : null,
      }));
    }
    
    return response.data;
  },

  submitNgoOnboarding: async (data: NgoOnboardingData) => {
    const response = await api.post(`/onboarding/ngo`, data);
    
    if (response.data) {
      useAuthStore.setState((state) => ({
        user: state.user ? { ...state.user, onboarding_done: true } : null,
      }));
    }
    
    return response.data;
  },

  submitGovtOnboarding: async (data: GovtOnboardingData) => {
    const response = await api.post(`/onboarding/government`, data);
    
    if (response.data) {
      useAuthStore.setState((state) => ({
        user: state.user ? { ...state.user, onboarding_done: true } : null,
      }));
    }
    
    return response.data;
  },
};
