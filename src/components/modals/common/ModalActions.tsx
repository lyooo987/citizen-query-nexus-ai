
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Save, X, Check, Download, Upload, Share, Edit } from 'lucide-react';

interface ActionButton {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'outline' | 'destructive' | 'secondary' | 'ghost';
  icon?: 'save' | 'cancel' | 'check' | 'download' | 'upload' | 'share' | 'edit' | 'close';
  loading?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'default' | 'lg';
}

interface ModalActionsProps {
  primaryAction?: ActionButton;
  secondaryActions?: ActionButton[];
  cancelAction?: ActionButton;
  alignment?: 'left' | 'center' | 'right' | 'between';
  className?: string;
}

const iconMap = {
  save: Save,
  cancel: X,
  check: Check,
  download: Download,
  upload: Upload,
  share: Share,
  edit: Edit,
  close: X
};

export function ModalActions({
  primaryAction,
  secondaryActions = [],
  cancelAction,
  alignment = 'right',
  className = ''
}: ModalActionsProps) {
  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between'
  };

  const renderButton = (action: ActionButton, isPrimary = false) => {
    const Icon = action.icon ? iconMap[action.icon] : null;
    
    return (
      <Button
        key={action.label}
        variant={action.variant || (isPrimary ? 'default' : 'outline')}
        size={action.size || 'default'}
        onClick={action.onClick}
        disabled={action.disabled || action.loading}
        className="gap-2"
      >
        {action.loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          Icon && <Icon className="h-4 w-4" />
        )}
        {action.label}
      </Button>
    );
  };

  return (
    <div className={`flex gap-2 ${alignmentClasses[alignment]} ${className}`}>
      {alignment === 'between' && cancelAction && renderButton(cancelAction)}
      
      <div className="flex gap-2">
        {secondaryActions.map(action => renderButton(action))}
        {primaryAction && renderButton(primaryAction, true)}
        {alignment !== 'between' && cancelAction && renderButton(cancelAction)}
      </div>
    </div>
  );
}
