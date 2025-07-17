import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ClipboardList, Bot, Zap } from 'lucide-react';

export function DashboardActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-green-600" />
          Actions rapides
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-md transition-shadow cursor-pointer group" onClick={() => window.dispatchEvent(new CustomEvent('navigate-to-section', { detail: 'legal-enrichment' }))}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Ajouter un texte juridique</h3>
              <p className="text-sm text-gray-600">Enrichir la base de données juridique</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer group" onClick={() => window.dispatchEvent(new CustomEvent('navigate-to-section', { detail: 'procedures-enrichment' }))}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <ClipboardList className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Ajouter une procédure</h3>
              <p className="text-sm text-gray-600">Enrichir le catalogue des procédures</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer group" onClick={() => window.dispatchEvent(new CustomEvent('navigate-to-section', { detail: 'ai-search' }))}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Assistant IA Juridique</h3>
              <p className="text-sm text-gray-600">Poser des questions juridiques</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}