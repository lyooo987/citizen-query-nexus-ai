
import { useState } from "react";
import { AdministrativeProcedure } from "@/types/legal";
import { ProceduresTabs } from "@/components/ProceduresTabs";
import { ProcedureSummaryModal } from "@/components/ProcedureSummaryModal.tsx";
import { ProcedureDetailView } from "@/components/procedures/ProcedureDetailView";
import { ProcedureFormView } from "@/components/procedures/ProcedureFormView";
import { ApprovalQueueModal } from "@/components/ApprovalQueueModal";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ClipboardList } from "lucide-react";
import { mockProcedures } from "@/components/procedures/mockData";

export function AdministrativeProcedures() {
  const [selectedProcedure, setSelectedProcedure] = useState<AdministrativeProcedure | null>(null);
  const [currentView, setCurrentView] = useState<'list' | 'detail' | 'form'>('list');
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showApprovalQueue, setShowApprovalQueue] = useState(false);
  const [lastAddedProcedure, setLastAddedProcedure] = useState<any>(null);

  const handleProcedureSubmit = (data: any) => {
    console.log('Procedure submitted:', data);
    setLastAddedProcedure(data);
    setCurrentView('list');
    setShowSummaryModal(true);
  };

  const handleAddAnotherProcedure = () => {
    setShowSummaryModal(false);
    setCurrentView('form');
  };

  const handleCloseSummary = () => {
    setShowSummaryModal(false);
    setLastAddedProcedure(null);
  };

  const handleOpenApprovalQueue = () => {
    console.log('Opening approval queue');
    setShowApprovalQueue(true);
  };

  const handleApproveFromQueue = (item: any, comment?: string) => {
    console.log('Approuvé depuis la file:', item, comment);
  };

  const handleRejectFromQueue = (item: any, reason: string) => {
    console.log('Rejeté depuis la file:', item, reason);
  };

  const handleViewFromQueue = (item: any) => {
    console.log('Examen depuis la file:', item);
    setShowApprovalQueue(false);
  };

  if (currentView === 'form') {
    return (
      <ProcedureFormView 
        onBack={() => setCurrentView('list')}
        onSubmit={handleProcedureSubmit}
      />
    );
  }

  if (currentView === 'detail' && selectedProcedure) {
    return (
      <ProcedureDetailView 
        procedure={selectedProcedure}
        onBack={() => {
          setSelectedProcedure(null);
          setCurrentView('list');
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Procédures Administratives"
        description="Gestion et consultation des procédures administratives algériennes"
        icon={ClipboardList}
        iconColor="text-blue-600"
      />
      
      <ProceduresTabs 
        section="procedures-catalog" 
        onAddProcedure={() => setCurrentView('form')}
        onOpenApprovalQueue={handleOpenApprovalQueue}
      />
      
      <ProcedureSummaryModal
        isOpen={showSummaryModal}
        onClose={handleCloseSummary}
        onAddAnother={handleAddAnotherProcedure}
        procedureData={lastAddedProcedure}
      />

      <ApprovalQueueModal
        isOpen={showApprovalQueue}
        onClose={() => setShowApprovalQueue(false)}
        onApproveItem={handleApproveFromQueue}
        onRejectItem={handleRejectFromQueue}
        onViewItem={handleViewFromQueue}
        filterType="procedure"
      />
    </div>
  );
}
