
import { ModalAnimationConfig } from '@/components/modals/types/modalTypes';

export const modalAnimations: Record<string, ModalAnimationConfig> = {
  default: {
    enter: 'animate-scale-in animate-fade-in',
    exit: 'animate-scale-out animate-fade-out',
    duration: 200
  },
  slideUp: {
    enter: 'animate-slide-in-up animate-fade-in',
    exit: 'animate-slide-out-down animate-fade-out',
    duration: 300
  },
  slideRight: {
    enter: 'animate-slide-in-right animate-fade-in',
    exit: 'animate-slide-out-right animate-fade-out',
    duration: 300
  }
};

export const getModalAnimation = (type: keyof typeof modalAnimations = 'default') => {
  return modalAnimations[type];
};
