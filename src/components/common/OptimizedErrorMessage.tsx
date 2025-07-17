
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, XCircle, Info, CheckCircle } from "lucide-react";

interface OptimizedErrorMessageProps {
  type?: "error" | "warning" | "info" | "success";
  title?: string;
  message: string;
  onDismiss?: () => void;
}

export function OptimizedErrorMessage({ 
  type = "error", 
  title, 
  message, 
  onDismiss 
}: OptimizedErrorMessageProps) {
  const getIcon = () => {
    switch (type) {
      case "error": return <XCircle className="h-4 w-4" />;
      case "warning": return <AlertTriangle className="h-4 w-4" />;
      case "success": return <CheckCircle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getVariant = () => {
    switch (type) {
      case "error": return "destructive";
      default: return "default";
    }
  };

  return (
    <Alert variant={getVariant()} className="relative">
      {getIcon()}
      <AlertDescription>
        {title && <div className="font-semibold mb-1">{title}</div>}
        <div>{message}</div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <XCircle className="h-4 w-4" />
          </button>
        )}
      </AlertDescription>
    </Alert>
  );
}
