
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';  
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, Search, Clock, FileText, BarChart3, Users, Sparkles, History, Brain, Zap, Target } from 'lucide-react';
import { UnifiedSectionHeader } from './common/UnifiedSectionHeader';
import { TabFormField } from './common/TabFormField';
import { ConversationalAIAssistant } from './ai/ConversationalAIAssistant';
import { EnhancedContextualRecommendations } from './ai/EnhancedContextualRecommendations';

export function AILegalAssistant() {
  const [activeTab, setActiveTab] = useState('assistant');

  useEffect(() => {
  }, [activeTab]);

  const recentSearches = [
    { query: "Procédure de divorce", time: "Il y a 2 heures", results: 15 },
    { query: "Code du commerce article 544", time: "Hier", results: 8 },
    { query: "Loi sur l'investissement 2023", time: "Il y a 2 jours", results: 23 }
  ];

  const insights = [
    {
      icon: <BarChart3 className="w-5 h-5 text-blue-600" />,
      title: "Tendance détectée",
      description: "Augmentation des recherches sur les marchés publics (+45% cette semaine)"
    },
    {
      icon: <Sparkles className="w-5 h-5 text-purple-600" />,
      title: "Nouveau texte pertinent",
      description: "Décret exécutif n° 24-15 pourrait intéresser vos recherches récentes"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <UnifiedSectionHeader
        icon={() => (
          <img 
            src="/lovable-uploads/17a3312c-89cc-4b02-9346-e04916bc112a.png" 
            alt="IA" 
            className="w-12 h-12"
          />
        )}
        title="Assistant IA Juridique Avancé"
        description="Suite complète d'outils d'intelligence artificielle pour l'analyse juridique"
        iconColor="text-green-600"
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="assistant" className="gap-2">
            <Bot className="w-4 h-4" />
            Assistant IA
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="gap-2">
            <Target className="w-4 h-4" />
            Recommandations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="assistant" className="space-y-6">
          <TabFormField
            placeholder="Poser une question à l'assistant IA juridique..."
            onSearch={(query) => console.log('Question IA:', query)}
            onAdd={() => console.log('Nouvelle conversation')}
            onFilter={() => console.log('Filtrer conversations')}
            onSort={() => console.log('Trier conversations')}
            onExport={() => console.log('Exporter conversation')}
            onRefresh={() => console.log('Actualiser IA')}
            showActions={true}
          />

          <ConversationalAIAssistant />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Recherches Récentes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentSearches.map((search, index) => (
                  <div key={index} className="space-y-2">
                    <div className="font-medium text-sm cursor-pointer hover:text-green-600">
                      {search.query}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{search.time}</span>
                      <Badge variant="secondary" className="text-xs">
                        {search.results} résultats
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Insights IA
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {insights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {insight.icon}
                    </div>
                    <div className="space-y-1">
                      <div className="font-medium text-sm">{insight.title}</div>
                      <div className="text-xs text-gray-600">{insight.description}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <TabFormField
            placeholder="Explorer les recommandations contextuelles..."
            onSearch={(query) => console.log('Recherche recommandations:', query)}
            onAdd={() => console.log('Nouvelle recommandation')}
            onFilter={() => console.log('Filtrer recommandations')}
            onSort={() => console.log('Trier recommandations')}
            onExport={() => console.log('Exporter recommandations')}
            onRefresh={() => console.log('Actualiser recommandations')}
            showActions={true}
          />
          <EnhancedContextualRecommendations />
        </TabsContent>
      </Tabs>
    </div>
  );
}
