
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'juriste' | 'citoyen';
  name: string;
}

interface GlobalState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  
  // UI state
  notifications: Array<{
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    message: string;
    timestamp: Date;
    read: boolean;
  }>;
  unreadNotifications: number;
  
  // Search filters
  globalFilters: {
    domain: string[];
    institution: string[];
    type: string[];
    status: string[];
    dateRange: { start?: Date; end?: Date };
  };
  
  // Accessibility preferences
  accessibilitySettings: {
    highContrast: boolean;
    fontSize: 'small' | 'medium' | 'large';
    reducedMotion: boolean;
    screenReader: boolean;
  };
  
  // Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  addNotification: (notification: Omit<GlobalState['notifications'][0], 'id' | 'timestamp'>) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  updateGlobalFilters: (filters: Partial<GlobalState['globalFilters']>) => void;
  resetGlobalFilters: () => void;
  updateAccessibilitySettings: (settings: Partial<GlobalState['accessibilitySettings']>) => void;
}

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      notifications: [],
      unreadNotifications: 0,
      globalFilters: {
        domain: [],
        institution: [],
        type: [],
        status: [],
        dateRange: {}
      },
      accessibilitySettings: {
        highContrast: false,
        fontSize: 'medium',
        reducedMotion: false,
        screenReader: false
      },
      
      // Actions
      setUser: (user) => set({ user }),
      setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
      
      addNotification: (notification) => {
        const newNotification = {
          ...notification,
          id: Date.now().toString(),
          timestamp: new Date(),
          read: false
        };
        set((state) => ({
          notifications: [newNotification, ...state.notifications].slice(0, 50), // Keep only last 50
          unreadNotifications: state.unreadNotifications + 1
        }));
      },
      
      markNotificationAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map(n => 
            n.id === id ? { ...n, read: true } : n
          ),
          unreadNotifications: Math.max(0, state.unreadNotifications - 1)
        }));
      },
      
      clearNotifications: () => set({ notifications: [], unreadNotifications: 0 }),
      
      updateGlobalFilters: (filters) => {
        set((state) => ({
          globalFilters: { ...state.globalFilters, ...filters }
        }));
      },
      
      resetGlobalFilters: () => {
        set({
          globalFilters: {
            domain: [],
            institution: [],
            type: [],
            status: [],
            dateRange: {}
          }
        });
      },
      
      updateAccessibilitySettings: (settings) => {
        set((state) => ({
          accessibilitySettings: { ...state.accessibilitySettings, ...settings }
        }));
      }
    }),
    {
      name: 'dalil-global-store',
      partialize: (state) => ({
        accessibilitySettings: state.accessibilitySettings,
        globalFilters: state.globalFilters
      })
    }
  )
);
