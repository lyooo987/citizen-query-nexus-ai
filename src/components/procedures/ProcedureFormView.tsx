
import { ProcedureForm } from "@/components/ProcedureForm";

interface ProcedureFormViewProps {
  onBack: () => void;
  onSubmit: (data: any) => void;
}

export function ProcedureFormView({ onBack, onSubmit }: ProcedureFormViewProps) {
  return (
    <div className="space-y-6">
      <ProcedureForm 
        onClose={onBack} 
        onSubmit={onSubmit}
      />
    </div>
  );
}
