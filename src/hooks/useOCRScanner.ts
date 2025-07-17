
import { useState, useCallback } from 'react';
import { createWorker } from 'tesseract.js';

interface OCRResult {
  text: string;
  confidence: number;
}

interface UseOCRScannerReturn {
  isProcessing: boolean;
  error: string | null;
  scanDocument: (file: File) => Promise<OCRResult | null>;
  scanFromCamera: () => Promise<OCRResult | null>;
  clearError: () => void;
}

export function useOCRScanner(): UseOCRScannerReturn {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convertPdfToImage = useCallback(async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          // Créer un canvas pour rendre la première page du PDF
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Pour cette implémentation, nous allons utiliser PDF.js via CDN
          const pdfjsLib = (window as any).pdfjsLib;
          if (!pdfjsLib) {
            // Charger PDF.js dynamiquement
            await loadPdfJs();
          }
          
          const loadingTask = pdfjsLib.getDocument({ data: e.target?.result });
          const pdf = await loadingTask.promise;
          const page = await pdf.getPage(1);
          
          const viewport = page.getViewport({ scale: 2.0 });
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          
          const renderContext = {
            canvasContext: ctx,
            viewport: viewport
          };
          
          await page.render(renderContext).promise;
          resolve(canvas.toDataURL());
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const loadPdfJs = useCallback(async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if ((window as any).pdfjsLib) {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.onload = () => {
        (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }, []);

  const processImage = useCallback(async (imageSource: File | string): Promise<OCRResult | null> => {
    try {
      setIsProcessing(true);
      setError(null);

      const worker = await createWorker('fra');
      const { data: { text, confidence } } = await worker.recognize(imageSource);
      await worker.terminate();

      return {
        text: text.trim(),
        confidence: Math.round(confidence)
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du traitement OCR';
      setError(errorMessage);
      console.error('OCR Error:', err);
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const scanDocument = useCallback(async (file: File): Promise<OCRResult | null> => {
    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      setError('Veuillez sélectionner un fichier image (JPG, PNG, etc.) ou PDF');
      return null;
    }

    try {
      let imageSource: File | string = file;
      
      // Convertir le PDF en image si nécessaire
      if (file.type === 'application/pdf') {
        imageSource = await convertPdfToImage(file);
      }
      
      return processImage(imageSource);
    } catch (err) {
      setError('Erreur lors du traitement du fichier PDF');
      console.error('PDF processing error:', err);
      return null;
    }
  }, [processImage, convertPdfToImage]);

  const scanFromCamera = useCallback(async (): Promise<OCRResult | null> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      return new Promise((resolve, reject) => {
        video.addEventListener('loadedmetadata', () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          
          ctx?.drawImage(video, 0, 0);
          
          stream.getTracks().forEach(track => track.stop());
          
          canvas.toBlob(async (blob) => {
            if (blob) {
              const file = new File([blob], 'camera-capture.jpg', {
                type: 'image/jpeg',
                lastModified: Date.now()
              });
              const result = await processImage(file);
              resolve(result);
            } else {
              reject(new Error('Impossible de capturer l\'image'));
            }
          }, 'image/jpeg', 0.8);
        });
      });
    } catch (err) {
      setError('Impossible d\'accéder à la caméra');
      return null;
    }
  }, [processImage]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isProcessing,
    error,
    scanDocument,
    scanFromCamera,
    clearError
  };
}
