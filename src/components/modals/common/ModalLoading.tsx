
import React from 'react';
import { Loader2, FileText, Search, Download, Upload } from 'lucide-react';

interface ModalLoadingProps {
  type?: 'default' | 'search' | 'upload' | 'download' | 'processing';
  message?: string;
  progress?: number;
  className?: string;
}

const loadingConfigs = {
  default: {
    icon: Loader2,
    message: 'Chargement en cours...',
    className: 'text-blue-600'
  },
  search: {
    icon: Search,
    message: 'Recherche en cours...',
    className: 'text-green-600'
  },
  upload: {
    icon: Upload,
    message: 'Téléchargement en cours...',
    className: 'text-purple-600'
  },
  download: {
    icon: Download,
    message: 'Téléchargement en cours...',
    className: 'text-orange-600'
  },
  processing: {
    icon: FileText,
    message: 'Traitement en cours...',
    className: 'text-teal-600'
  }
};

export function ModalLoading({ 
  type = 'default', 
  message, 
  progress, 
  className = '' 
}: ModalLoadingProps) {
  const config = loadingConfigs[type];
  const Icon = config.icon;
  const displayMessage = message || config.message;

  return (
    <div className={`flex flex-col items-center justify-center py-8 ${className}`}>
      <div className={`mb-4 ${config.className}`}>
        <Icon className="h-12 w-12 animate-spin" />
      </div>
      
      <p className="text-gray-700 font-medium mb-2">{displayMessage}</p>
      
      {progress !== undefined && (
        <div className="w-full max-w-xs">
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${config.className.replace('text-', 'bg-')}`}
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-1 text-center">
            {Math.round(progress)}%
          </p>
        </div>
      )}
    </div>
  );
}
