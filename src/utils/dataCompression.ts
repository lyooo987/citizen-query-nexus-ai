
/**
 * Système de compression des données pour optimiser le stockage
 */

interface CompressionResult {
  compressed: string;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
}

class DataCompressor {
  // Compression simple basée sur la répétition de motifs
  compress(data: string): CompressionResult {
    const originalSize = data.length;
    
    // Dictionnaire des motifs fréquents
    const patterns: Record<string, string> = {};
    let patternIndex = 0;
    
    // Identifier les motifs répétés (minimum 3 caractères)
    let compressed = data;
    const minPatternLength = 3;
    const maxPatternLength = 50;
    
    for (let length = maxPatternLength; length >= minPatternLength; length--) {
      const patternCounts: Record<string, number> = {};
      
      // Compter les occurrences de chaque motif
      for (let i = 0; i <= compressed.length - length; i++) {
        const pattern = compressed.substr(i, length);
        patternCounts[pattern] = (patternCounts[pattern] || 0) + 1;
      }
      
      // Remplacer les motifs fréquents (au moins 2 occurrences)
      for (const [pattern, count] of Object.entries(patternCounts)) {
        if (count >= 2 && pattern.trim().length > 2) {
          const replacement = `§${patternIndex}§`;
          patterns[replacement] = pattern;
          compressed = compressed.split(pattern).join(replacement);
          patternIndex++;
        }
      }
    }
    
    // Ajouter le dictionnaire au début
    const dictionary = JSON.stringify(patterns);
    const finalCompressed = `${dictionary}|${compressed}`;
    
    return {
      compressed: finalCompressed,
      originalSize,
      compressedSize: finalCompressed.length,
      compressionRatio: originalSize > 0 ? (originalSize - finalCompressed.length) / originalSize : 0
    };
  }

  decompress(compressedData: string): string {
    try {
      const separatorIndex = compressedData.indexOf('|');
      if (separatorIndex === -1) return compressedData;
      
      const dictionaryStr = compressedData.substring(0, separatorIndex);
      const compressed = compressedData.substring(separatorIndex + 1);
      
      const patterns = JSON.parse(dictionaryStr);
      let decompressed = compressed;
      
      // Remplacer les motifs compressés par leur valeur originale
      for (const [replacement, original] of Object.entries(patterns)) {
        decompressed = decompressed.split(replacement).join(original as string);
      }
      
      return decompressed;
    } catch (error) {
      console.error('Erreur lors de la décompression:', error);
      return compressedData;
    }
  }

  // Compression JSON spécialisée
  compressJSON(obj: any): CompressionResult {
    const jsonString = JSON.stringify(obj);
    return this.compress(jsonString);
  }

  decompressJSON<T>(compressedData: string): T | null {
    try {
      const decompressed = this.decompress(compressedData);
      return JSON.parse(decompressed);
    } catch (error) {
      console.error('Erreur lors de la décompression JSON:', error);
      return null;
    }
  }

  // Analyse de l'efficacité de compression
  analyzeCompression(data: string): {
    originalSize: number;
    patternCount: number;
    estimatedCompression: number;
    shouldCompress: boolean;
  } {
    const originalSize = data.length;
    const patterns: Record<string, number> = {};
    
    // Analyser les motifs potentiels
    for (let length = 3; length <= 20; length++) {
      for (let i = 0; i <= data.length - length; i++) {
        const pattern = data.substr(i, length);
        if (pattern.trim().length > 2) {
          patterns[pattern] = (patterns[pattern] || 0) + 1;
        }
      }
    }
    
    const frequentPatterns = Object.entries(patterns).filter(([, count]) => count >= 2);
    const estimatedSavings = frequentPatterns.reduce((sum, [pattern, count]) => {
      return sum + (pattern.length - 5) * (count - 1); // §n§ = 5 chars
    }, 0);
    
    const estimatedCompression = Math.max(0, estimatedSavings / originalSize);
    
    return {
      originalSize,
      patternCount: frequentPatterns.length,
      estimatedCompression,
      shouldCompress: estimatedCompression > 0.1 && originalSize > 100
    };
  }
}

export const dataCompressor = new DataCompressor();

// Hook React pour la compression automatique
import { useMemo } from 'react';

export function useCompressedData<T>(data: T, shouldCompress = true) {
  const compressed = useMemo(() => {
    if (!shouldCompress || !data) return null;
    
    try {
      const result = dataCompressor.compressJSON(data);
      return result.compressionRatio > 0.1 ? result : null;
    } catch (error) {
      console.error('Erreur lors de la compression:', error);
      return null;
    }
  }, [data, shouldCompress]);

  const decompress = useMemo(() => {
    return (compressedData: string): T | null => {
      return dataCompressor.decompressJSON<T>(compressedData);
    };
  }, []);

  return {
    originalData: data,
    compressedData: compressed,
    decompress,
    isCompressed: compressed !== null,
    compressionRatio: compressed?.compressionRatio || 0
  };
}
