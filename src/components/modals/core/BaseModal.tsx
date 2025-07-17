
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, AlertCircle, RefreshCw } from 'lucide-react';
import { BaseModalProps, ModalContentProps, ModalErrorState } from '@/types/modalTypes';
import { cn } from '@/lib/utils';

interface UnifiedModalProps extends BaseModalProps, ModalContentProps {
  error?: ModalErrorState;
}

const sizeClasses = {
  small: 'max-w-sm',
  medium: 'max-w-md',
  large: 'max-w-lg',
  xl: 'max-w-2xl',
  full: 'max-w-6xl max-h-[90vh]'
};

export function BaseModal({
  isOpen,
  onClose,
  title,
  size = 'medium',
  className,
  showCloseButton = true,
  closeOnOverlayClick = true,
  preventClose = false,
  children,
  footer,
  header,
  error
}: UnifiedModalProps) {
  const handleClose = () => {
    if (!preventClose) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={preventClose ? undefined : handleClose}>
      <DialogContent 
        className={cn(
          sizeClasses[size],
          'animate-fade-in overflow-hidden',
          className
        )}
      >
        {(title || header) && (
          <DialogHeader className="border-b pb-4">
            {header || (title && <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>)}
          </DialogHeader>
        )}

        <div className="flex-1 overflow-auto py-4">
          {error?.hasError ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Une erreur s'est produite
              </h3>
              <p className="text-gray-600 mb-4">
                {error.error || 'Une erreur inattendue s\'est produite'}
              </p>
              {error.retry && (
                <Button onClick={error.retry} variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Réessayer
                </Button>
              )}
            </div>
          ) : (
            children
          )}
        </div>

        {footer && (
          <div className="border-t pt-4 mt-4">
            {footer}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
