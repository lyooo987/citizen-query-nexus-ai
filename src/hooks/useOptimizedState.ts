
import { useState, useCallback, useMemo } from 'react';
import { useGlobalStore } from '@/store/globalStore';

export function useOptimizedState<T>(initialState: T) {
  const [state, setState] = useState<T>(initialState);
  
  const updateState = useCallback((newState: Partial<T> | ((prev: T) => T)) => {
    setState(prev => 
      typeof newState === 'function' 
        ? newState(prev)
        : { ...prev, ...newState }
    );
  }, []);
  
  const resetState = useCallback(() => {
    setState(initialState);
  }, [initialState]);
  
  return useMemo(() => ({
    state,
    updateState,
    resetState
  }), [state, updateState, resetState]);
}

export function useAccessibleFocus() {
  const { accessibilitySettings } = useGlobalStore();
  
  const focusProps = useMemo(() => ({
    tabIndex: 0,
    role: 'button',
    'aria-describedby': accessibilitySettings.screenReader ? 'screen-reader-description' : undefined,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        (e.target as HTMLElement).click();
      }
    }
  }), [accessibilitySettings.screenReader]);
  
  return focusProps;
}
