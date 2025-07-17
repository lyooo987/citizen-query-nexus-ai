
import React, { useState, useEffect } from 'react';
import { AddLibraryResourceForm } from '@/components/forms/AddLibraryResourceForm';

export function LibraryFormHandler() {
  const [isOpen, setIsOpen] = useState(false);
  const [resourceType, setResourceType] = useState<'ouvrage' | 'revue' | 'journal' | 'article' | 'video' | 'directory'>('ouvrage');

  useEffect(() => {
    const handleOpenLibraryForm = (event: CustomEvent) => {
      console.log('Ouverture formulaire bibliothèque:', event.detail);
      setResourceType(event.detail.resourceType);
      setIsOpen(true);
    };

    window.addEventListener('open-library-form', handleOpenLibraryForm as EventListener);

    return () => {
      window.removeEventListener('open-library-form', handleOpenLibraryForm as EventListener);
    };
  }, []);

  return (
    <AddLibraryResourceForm
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      resourceType={resourceType}
    />
  );
}
