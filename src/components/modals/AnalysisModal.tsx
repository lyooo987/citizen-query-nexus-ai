
import React from 'react';
import { BaseModal } from './core/BaseModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, LineChart, TrendingUp, PieChart } from 'lucide-react';

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'comparative' | 'performance' | 'trends';
  data: any[];
}

export function AnalysisModal({ isOpen, onClose, type, data }: AnalysisModalProps) {
  const getAnalysisTitle = () => {
    switch (type) {
      case 'comparative': return 'Analyse comparative';
      case 'performance': return 'Analyse de performance';
      case 'trends': return 'Analyse des tendances';
      default: return 'Analyse';
    }
  };

  const getAnalysisIcon = () => {
    switch (type) {
      case 'comparative': return <BarChart className="w-5 h-5" />;
      case 'performance': return <PieChart className="w-5 h-5" />;
      case 'trends': return <TrendingUp className="w-5 h-5" />;
      default: return <LineChart className="w-5 h-5" />;
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={getAnalysisTitle()}
      size="xl"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
          {getAnalysisIcon()}
          <div>
            <h3 className="font-semibold text-blue-900">{getAnalysisTitle()}</h3>
            <p className="text-sm text-blue-600">
              Analyse basée sur {data.length} élément(s)
            </p>
          </div>
        </div>

        {type === 'comparative' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Comparaison des volumes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Textes actifs</span>
                    <Badge variant="default">245</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Textes archivés</span>
                    <Badge variant="secondary">89</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">En révision</span>
                    <Badge variant="outline">12</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Répartition par domaine</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Droit civil</span>
                    <span className="text-sm font-medium">35%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Droit commercial</span>
                    <span className="text-sm font-medium">28%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Droit pénal</span>
                    <span className="text-sm font-medium">22%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Autres</span>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {type === 'performance' && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Métriques de performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">98.5%</div>
                    <div className="text-xs text-gray-600">Disponibilité</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">1.2s</div>
                    <div className="text-xs text-gray-600">Temps de réponse</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">2.4k</div>
                    <div className="text-xs text-gray-600">Requêtes/jour</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">99.1%</div>
                    <div className="text-xs text-gray-600">Précision</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {type === 'trends' && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Tendances récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Recherches juridiques</span>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-green-600">+15.3%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Consultations de textes</span>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-green-600">+8.7%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Téléchargements</span>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
                      <span className="text-sm font-medium text-red-600">-2.1%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </BaseModal>
  );
}
