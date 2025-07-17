
export type ModalSize = 'small' | 'medium' | 'large' | 'xl' | 'full';

export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
  className?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  preventClose?: boolean;
}

export interface ModalContentProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
}

export interface ModalErrorState {
  hasError: boolean;
  error?: string;
  retry?: () => void;
}

export interface ModalAnimationConfig {
  enter: string;
  exit: string;
  duration: number;
}

export interface ModalConfig {
  title: string;
  size?: ModalSize;
  preventClose?: boolean;
  loading?: boolean;
  loadingType?: 'default' | 'search' | 'upload' | 'download' | 'processing';
  loadingMessage?: string;
  renderContent: (modal: any, closeModal: (name: string) => void) => React.ReactNode;
  actions?: {
    primary?: {
      label: string;
      onClick: () => void;
      icon?: string;
      loading?: boolean;
      disabled?: boolean;
    };
    secondary?: Array<{
      label: string;
      onClick: () => void;
      variant?: 'default' | 'outline' | 'destructive' | 'secondary' | 'ghost';
      icon?: string;
    }>;
  };
}
