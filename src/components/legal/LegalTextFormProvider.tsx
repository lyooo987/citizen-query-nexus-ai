
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FormData {
  title: string;
  type: string;
  domain: string;
  reference: string;
  date: string;
  content: string;
  source: string;
  keywords: string;
  description: string;
  status: string;
}

interface LegalTextFormContextType {
  formData: FormData;
  updateFormData: (field: string, value: string) => void;
  resetForm: () => void;
}

const LegalTextFormContext = createContext<LegalTextFormContextType | undefined>(undefined);

const initialFormData: FormData = {
  title: '',
  type: '',
  domain: '',
  reference: '',
  date: '',
  content: '',
  source: '',
  keywords: '',
  description: '',
  status: 'draft'
};

interface LegalTextFormProviderProps {
  children: ReactNode;
  initialData?: Partial<FormData>;
}

export function LegalTextFormProvider({ children, initialData }: LegalTextFormProviderProps) {
  const [formData, setFormData] = useState<FormData>({
    ...initialFormData,
    ...initialData
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return (
    <LegalTextFormContext.Provider value={{ formData, updateFormData, resetForm }}>
      {children}
    </LegalTextFormContext.Provider>
  );
}

export function useLegalTextForm() {
  const context = useContext(LegalTextFormContext);
  if (context === undefined) {
    throw new Error('useLegalTextForm must be used within a LegalTextFormProvider');
  }
  return context;
}
