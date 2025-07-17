
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BaseModal } from '../core/BaseModal';
import { useModalContext } from '../context/ModalProvider';

interface ExampleEnhancedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
}

export function ExampleEnhancedModal({ 
  isOpen, 
  onClose, 
  onSave 
}: ExampleEnhancedModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { handleError, error, clearError } = useModalContext();

  const handleSave = async () => {
    try {
      setIsLoading(true);
      clearError();
      
      // Validation simple
      if (!formData.name || !formData.email) {
        throw new Error('Tous les champs sont requis');
      }

      // Simulation d'une opération async
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave?.(formData);
      onClose();
    } catch (err) {
      handleError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
    } finally {
      setIsLoading(false);
    }
  };

  const footer = (
    <div className="flex gap-2 justify-end">
      <Button variant="outline" onClick={onClose} disabled={isLoading}>
        Annuler
      </Button>
      <Button onClick={handleSave} disabled={isLoading}>
        {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
      </Button>
    </div>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Exemple de Modal Unifiée"
      size="medium"
      error={error}
      preventClose={isLoading}
      footer={footer}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nom</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Entrez votre nom"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="Entrez votre email"
          />
        </div>
      </div>
    </BaseModal>
  );
}
