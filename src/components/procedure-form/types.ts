import { UseFormReturn } from 'react-hook-form';

export interface ProcedureStep {
  id: string;
  title: string;
  description: string;
  conditions?: string;
}

export interface FormStepProps {
  form: UseFormReturn<any>;
  procedureSteps?: ProcedureStep[];
  setProcedureSteps?: (steps: ProcedureStep[]) => void;
  requiredDocs?: string[];
  setRequiredDocs?: (docs: string[]) => void;
  complementaryDocs?: string[];
  setComplementaryDocs?: (docs: string[]) => void;
}

export const defaultFormValues = {
  // Step 1
  title: '',
  description: '',
  targetAudience: '',
  category: '',
  institution: '',
  
  // Step 2
  conditions: '',
  
  // Step 3
  requiredDocuments: '',
  complementaryDocuments: '',
  
  // Step 4
  processingTime: '',
  cost: '',
  paymentMethods: '',
  
  // Step 5
  digitalProcedure: false,
  thirdPartySubmission: false,
  withdrawalConditions: '',
  withdrawalMethods: '',
  validityDuration: '',
  appealPossible: false,
  
  // Step 6
  legalBasis: '',
  frequentQuestions: '',
  contactAddress: '',
  phoneNumber: '',
  email: '',
  greenNumber: ''
};

export const targetCategories = [
  'Citoyens',
  'Entreprises',
  'Administrations',
  'Associations'
];

export const procedureTypes = [
  'Demande',
  'Déclaration',
  'Autorisation',
  'Certificat'
];