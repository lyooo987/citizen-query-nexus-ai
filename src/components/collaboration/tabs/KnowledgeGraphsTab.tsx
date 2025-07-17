
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ContributeModal } from '@/components/modals/ContributeModal';
import { 
  Network,
  Edit3
} from 'lucide-react';

export function KnowledgeGraphsTab() {
  const [contributeOpen, setContributeOpen] = useState(false);

  const knowledgeGraphs = [
    {
      id: 1,
      title: "Réforme du Code de Commerce 2024-2025",
      contributors: 15,
      nodes: 156,
      connections: 234,
      lastUpdate: "Il y a 1 heure",
      completeness: 78,
      domains: ["Commerce", "Sociétés", "Contrats"]
    },
    {
      id: 2,
      title: "Jurisprudence Administrative Récente",
      contributors: 8,
      nodes: 89,
      connections: 145,
      lastUpdate: "Il y a 3 heures",
      completeness: 65,
      domains: ["Administratif", "Contentieux", "Procédures"]
    }
  ];

  const handleSaveContribution = (contributionData: any) => {
    console.log('Nouvelle contribution:', contributionData);
    // Ici on ajouterait la logique pour sauvegarder la contribution
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {knowledgeGraphs.map((graph) => (
          <Card key={graph.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="w-5 h-5 text-purple-600" />
                {graph.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Contributeurs :</span>
                  <div className="font-medium">{graph.contributors}</div>
                </div>
                <div>
                  <span className="text-gray-500">Noeuds :</span>
                  <div className="font-medium">{graph.nodes}</div>
                </div>
                <div>
                  <span className="text-gray-500">Connexions :</span>
                  <div className="font-medium">{graph.connections}</div>
                </div>
                <div>
                  <span className="text-gray-500">Complétude :</span>
                  <div className="font-medium">{graph.completeness}%</div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progression</span>
                  <span>{graph.completeness}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${graph.completeness}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <span className="text-gray-500 text-sm">Domaines :</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {graph.domains.map((domain, index) => (
                    <Badge key={index} variant="outline">{domain}</Badge>
                  ))}
                </div>
              </div>

              <div className="text-sm text-gray-500">
                Dernière mise à jour : {graph.lastUpdate}
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                  <Network className="w-4 h-4 mr-2" />
                  Explorer
                </Button>
                <Button variant="outline" className="flex-1">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Contribuer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-6">
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          onClick={() => setContributeOpen(true)}
        >
          <Network className="w-4 h-4 mr-2" />
          Contribuer au Knowledge Graph
        </Button>
      </div>

      <ContributeModal
        isOpen={contributeOpen}
        onClose={() => setContributeOpen(false)}
        onSave={handleSaveContribution}
      />
    </div>
  );
}
