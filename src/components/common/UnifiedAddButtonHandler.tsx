
import React, { useState } from 'react';
import { AddLegalTextForm } from '@/components/forms/AddLegalTextForm';
import { AddProcedureForm } from '@/components/forms/AddProcedureForm';
import { AddNewsForm } from '@/components/forms/AddNewsForm';

interface UnifiedAddButtonHandlerProps {
  children: (handlers: {
    openLegalTextForm: () => void;
    openProcedureForm: () => void;
    openNewsForm: () => void;
  }) => React.ReactNode;
}

export function UnifiedAddButtonHandler({ children }: UnifiedAddButtonHandlerProps) {
  const [legalTextFormOpen, setLegalTextFormOpen] = useState(false);
  const [procedureFormOpen, setProcedureFormOpen] = useState(false);
  const [newsFormOpen, setNewsFormOpen] = useState(false);

  const handlers = {
    openLegalTextForm: () => setLegalTextFormOpen(true),
    openProcedureForm: () => setProcedureFormOpen(true),
    openNewsForm: () => setNewsFormOpen(true)
  };

  return (
    <>
      {children(handlers)}
      
      <AddLegalTextForm 
        isOpen={legalTextFormOpen} 
        onClose={() => setLegalTextFormOpen(false)} 
      />
      
      <AddProcedureForm 
        isOpen={procedureFormOpen} 
        onClose={() => setProcedureFormOpen(false)} 
      />
      
      <AddNewsForm 
        isOpen={newsFormOpen} 
        onClose={() => setNewsFormOpen(false)} 
      />
    </>
  );
}
