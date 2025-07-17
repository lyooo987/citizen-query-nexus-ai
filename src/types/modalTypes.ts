
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

export interface ModalConfig {
  title: string;
  icon?: React.ReactNode;
  size?: ModalSize;
  preventClose?: boolean;
}
