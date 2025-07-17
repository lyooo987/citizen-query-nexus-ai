
import React from 'react';
import { FeedbackModal } from '../FeedbackModal';
import { AIGenerationModal } from '../AIGenerationModal';

interface AIModalGroupProps {
  modals: any;
  closeModal: (modalName: string) => void;
}

export function AIModalGroup({ modals, closeModal }: AIModalGroupProps) {
  return (
    <>
      <FeedbackModal
        isOpen={modals.feedback.isOpen}
        onClose={() => closeModal('feedback')}
        type={modals.feedback.type}
        itemTitle={modals.feedback.itemTitle}
      />

      <AIGenerationModal
        isOpen={modals.aiGeneration.isOpen}
        onClose={() => closeModal('aiGeneration')}
        type={modals.aiGeneration.type}
        data={modals.aiGeneration.data}
      />
    </>
  );
}
