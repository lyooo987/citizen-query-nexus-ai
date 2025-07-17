
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExpertEcosystem } from './ExpertEcosystem';
import { AdvancedCollaborativeTools } from './AdvancedCollaborativeTools';
import { 
  Users, 
  MessageSquare, 
  Share2, 
  Settings,
  Brain,
  Network,
  Award,
  Target
} from 'lucide-react';

export function AdvancedCollaborationTools() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <Brain className="w-6 h-6 text-emerald-600" />
          Collaboration Avancée & Social Learning
        </h3>
        <p className="text-gray-600">
          Écosystème collaboratif expert avec outils avancés de co-création et partage de connaissances
        </p>
      </div>

      <Tabs defaultValue="ecosystem" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ecosystem" className="gap-2">
            <Award className="w-4 h-4" />
            Écosystème Collaboratif Expert
          </TabsTrigger>
          <TabsTrigger value="tools" className="gap-2">
            <Network className="w-4 h-4" />
            Outils Collaboratifs Avancés
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ecosystem">
          <ExpertEcosystem />
        </TabsContent>

        <TabsContent value="tools">
          <AdvancedCollaborativeTools />
        </TabsContent>
      </Tabs>

      {/* Aperçu des statistiques globales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Vue d'ensemble de la collaboration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold">1,245</div>
              <div className="text-sm text-gray-600">Experts actifs</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold">2,156</div>
              <div className="text-sm text-gray-600">Collaborations</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Network className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold">45</div>
              <div className="text-sm text-gray-600">Knowledge Graphs</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Award className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
              <div className="text-2xl font-bold">328</div>
              <div className="text-sm text-gray-600">Certifications</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
