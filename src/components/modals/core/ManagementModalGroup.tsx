
import React from 'react';
import { ManagementModal } from '../ManagementModal';
import { UserManagementModal } from '../UserManagementModal';
import { AlertManagementModal } from '../AlertManagementModal';
import { SessionManagementModal } from '../SessionManagementModal';
import { TemplateManagerModal } from '../TemplateManagerModal';
import { ProjectManagerModal } from '../ProjectManagerModal';
import { TagManagerModal } from '../TagManagerModal';
import { WorkflowManagerModal } from '../WorkflowManagerModal';

interface ManagementModalGroupProps {
  modals: any;
  closeModal: (modalName: string) => void;
}

export function ManagementModalGroup({ modals, closeModal }: ManagementModalGroupProps) {
  return (
    <>
      <ManagementModal
        isOpen={modals.management.isOpen}
        onClose={() => closeModal('management')}
        type={modals.management.type}
        onSave={(data) => {
          console.log('Management save:', data);
          closeModal('management');
        }}
      />

      <UserManagementModal
        isOpen={modals.userManagement.isOpen}
        onClose={() => closeModal('userManagement')}
        action={modals.userManagement.action}
        user={modals.userManagement.user}
        onSave={(userData) => {
          console.log('User management save:', userData);
          closeModal('userManagement');
        }}
      />

      <AlertManagementModal
        isOpen={modals.alertManagement.isOpen}
        onClose={() => closeModal('alertManagement')}
        alert={modals.alertManagement.alert}
        onSave={(alertData) => {
          console.log('Alert management save:', alertData);
          closeModal('alertManagement');
        }}
      />

      <SessionManagementModal
        isOpen={modals.sessionManagement.isOpen}
        onClose={() => closeModal('sessionManagement')}
        data={modals.sessionManagement.data}
        onAction={(action, data) => {
          console.log('Session management action:', action, data);
          closeModal('sessionManagement');
        }}
      />

      <TemplateManagerModal
        isOpen={modals.templateManager.isOpen}
        onClose={() => closeModal('templateManager')}
        template={modals.templateManager.template}
        onSave={(templateData) => {
          console.log('Template save:', templateData);
          closeModal('templateManager');
        }}
      />

      <ProjectManagerModal
        isOpen={modals.projectManager.isOpen}
        onClose={() => closeModal('projectManager')}
        project={modals.projectManager.project}
        onSave={(projectData) => {
          console.log('Project save:', projectData);
          closeModal('projectManager');
        }}
      />

      <TagManagerModal
        isOpen={modals.tagManager.isOpen}
        onClose={() => closeModal('tagManager')}
        tag={modals.tagManager.tag}
        onSave={(tagData) => {
          console.log('Tag save:', tagData);
          closeModal('tagManager');
        }}
      />

      <WorkflowManagerModal
        isOpen={modals.workflowManager.isOpen}
        onClose={() => closeModal('workflowManager')}
        workflow={modals.workflowManager.workflow}
        onSave={(workflowData) => {
          console.log('Workflow save:', workflowData);
          closeModal('workflowManager');
        }}
      />
    </>
  );
}
