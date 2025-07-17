import { create } from 'zustand';
import { FormField } from '@/components/configuration/form-generator/types';

export interface SavedForm {
  id: string;
  name: string;
  description: string;
  type: string;
  fields: FormField[];
  createdAt: string;
  category: string;
}

interface FormLibraryStore {
  forms: SavedForm[];
  addForm: (form: Omit<SavedForm, 'id' | 'createdAt'>) => void;
  removeForm: (id: string) => void;
  updateForm: (id: string, updates: Partial<SavedForm>) => void;
  getForm: (id: string) => SavedForm | undefined;
}

export const useFormLibraryStore = create<FormLibraryStore>((set, get) => ({
  forms: [],
  
  addForm: (formData) => {
    const newForm: SavedForm = {
      ...formData,
      id: `form_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    set((state) => ({
      forms: [...state.forms, newForm]
    }));
  },
  
  removeForm: (id) => {
    set((state) => ({
      forms: state.forms.filter(form => form.id !== id)
    }));
  },
  
  updateForm: (id, updates) => {
    set((state) => ({
      forms: state.forms.map(form => 
        form.id === id ? { ...form, ...updates } : form
      )
    }));
  },
  
  getForm: (id) => {
    return get().forms.find(form => form.id === id);
  }
}));