
export enum SubscriptionType {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM'
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  unlocked: boolean;
  description: string;
}

export interface ChecklistItem {
  id: string;
  task: string;
  done: boolean;
}

export interface UserProgress {
  points: number;
  completedModules: string[];
  achievements: Achievement[];
  dailyChecklist: ChecklistItem[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  subscription: SubscriptionType;
  progress: UserProgress;
  nationalLanguage: string;
  financialProfile?: 'Conservador' | 'Moderado' | 'Arrojado';
}

export interface Module {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
  videoUrl?: string;
  isPremium: boolean;
  isProfileQuiz?: boolean;
  quiz: {
    question: string;
    options: string[];
    answer: number;
    weight?: number[]; // Para o perfil financeiro
  }[];
}

export interface SimulationResult {
  id: string;
  date: string;
  type: 'INVESTMENT' | 'CASHFLOW';
  total: number;
}
