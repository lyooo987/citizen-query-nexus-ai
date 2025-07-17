
import { useState } from 'react';
import { getTabsConfig } from './procedures/config/tabsConfig';
import { useOCRHandler } from './procedures/hooks/useOCRHandler';
import { ProcedureActionHandlers } from './procedures/handlers/ProcedureActionHandlers';
import { ProcedureTabsLayout } from './procedures/layout/ProcedureTabsLayout';

interface ProceduresTabsProps {
  section: string;
  onAddProcedure?: () => void;
  onOpenApprovalQueue?: () => void;
}

export function ProceduresTabs({ section, onAddProcedure, onOpenApprovalQueue }: ProceduresTabsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const { ocrExtractedText, handleOCRTextExtracted } = useOCRHandler({ onAddProcedure });

  return (
    <ProcedureActionHandlers 
      onAddProcedure={onAddProcedure}
      onOpenApprovalQueue={onOpenApprovalQueue}
    >
      {({ handleAddClick, handleOpenApprovalQueue }) => {
        const tabsConfig = getTabsConfig({
          section,
          searchTerm,
          setSearchTerm,
          onAddProcedure: handleAddClick,
          onOpenApprovalQueue: handleOpenApprovalQueue,
          onOCRTextExtracted: handleOCRTextExtracted
        });

        return (
          <ProcedureTabsLayout 
            defaultValue={tabsConfig.defaultValue}
            tabs={tabsConfig.tabs}
          />
        );
      }}
    </ProcedureActionHandlers>
  );
}
