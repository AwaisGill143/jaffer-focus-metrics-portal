

import { UserProp } from './user';

export interface OKRData {
  department: string;
  jobTitle: string;
  goalDescription: string;
  keyResult: string;
  managersGoal: string;
  dueDate: string;
}

export interface AWResultsProps {
  okrData: OKRData;
  aiResult?: any;
}


export interface OKRFormProps {
  onSubmit: (data: OKRData) => void;
  isLoading?: boolean;
  user?: UserProp;
}


export interface SmartGoalResultsProps {
  okrData: OKRData;
  aiResult?: any;
  isFallback?: boolean;
}

export interface OKRContainerProps {
  onSubmit: (data: OKRData, aiResult?: any, isFallback?: boolean) => void;
  user?: UserProp;
}