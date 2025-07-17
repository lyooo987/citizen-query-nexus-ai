
import React from 'react';
import { BaseModal } from './BaseModal';
import { ModalActions } from '../common/ModalActions';
import { ModalLoading } from '../common/ModalLoading';
import { ModalErrorState } from '@/types/modalTypes';

interface OptimizedModalGroupProps {
  modals: any;
  closeModal: (modalName: string) => void;
  modalConfigs: Record<string, any>;
}

export function OptimizedModalGroup({ modals, closeModal, modalConfigs }: OptimizedModalGroupProps) {
  const renderModal = (modalName: string, config: any) => {
    const modal = modals[modalName];
    if (!modal?.isOpen) return null;

    return (
      <BaseModal
        key={modalName}
        isOpen={modal.isOpen}
        onClose={() => closeModal(modalName)}
        title={config.title}
        size={config.size || 'medium'}
        preventClose={config.preventClose}
      >
        {config.loading ? (
          <ModalLoading type={config.loadingType} message={config.loadingMessage} />
        ) : (
          config.renderContent(modal, closeModal)
        )}
        
        {config.actions && (
          <ModalActions
            primaryAction={config.actions.primary}
            secondaryActions={config.actions.secondary}
            cancelAction={{
              label: 'Annuler',
              onClick: () => closeModal(modalName),
              icon: 'cancel'
            }}
          />
        )}
      </BaseModal>
    );
  };

  return (
    <>
      {Object.entries(modalConfigs).map(([modalName, config]) => 
        renderModal(modalName, config)
      )}
    </>
  );
}
