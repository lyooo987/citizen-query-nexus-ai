
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CreateDebateModal } from '@/components/modals/CreateDebateModal';
import { 
  MessageSquare, 
  Eye,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

export function StructuredDebatesTab() {
  const [createDebateOpen, setCreateDebateOpen] = useState(false);

  const structuredDebates = [
    {
      id: 1,
      topic: "Réforme du droit des sociétés : Impact sur les PME",
      status: "En cours",
      participants: 12,
      arguments: {
        for: 8,
        against: 4
      },
      moderator: "Prof. Mohamed Cherif",
      deadline: "25 janvier 2025",
      phase: "Arguments initiaux"
    },
    {
      id: 2,
      topic: "Digitalisation des procédures judiciaires",
      status: "Vote final",
      participants: 18,
      arguments: {
        for: 14,
        against: 4
      },
      moderator: "Dr. Leila Mansouri",
      deadline: "20 janvier 2025",
      phase: "Synthèse finale"
    }
  ];

  const handleSaveDebate = (debateData: any) => {
    console.log('Nouveau débat créé:', debateData);
    // Ici on ajouterait la logique pour sauvegarder le débat
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {structuredDebates.map((debate) => (
          <Card key={debate.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{debate.topic}</CardTitle>
                  <p className="text-gray-600 mt-1">Modéré par {debate.moderator}</p>
                </div>
                <Badge className={
                  debate.status === 'En cours' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }>
                  {debate.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <ThumbsUp className="w-4 h-4 text-green-600" />
                    <span className="font-medium">Pour</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">{debate.arguments.for}</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <ThumbsDown className="w-4 h-4 text-red-600" />
                    <span className="font-medium">Contre</span>
                  </div>
                  <div className="text-2xl font-bold text-red-600">{debate.arguments.against}</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{debate.participants} participants</span>
                <span>Phase: {debate.phase}</span>
              </div>

              <div className="text-sm">
                <span className="text-gray-500">Échéance: </span>
                <span className="font-medium">{debate.deadline}</span>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Participer
                </Button>
                <Button variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  Observer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lancer un nouveau débat</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Sujet du débat..." />
          <Textarea placeholder="Description et contexte..." />
          <div className="flex gap-2">
            <Button 
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={() => setCreateDebateOpen(true)}
            >
              Créer le débat
            </Button>
            <Button variant="outline">
              Sauvegarder en brouillon
            </Button>
          </div>
        </CardContent>
      </Card>

      <CreateDebateModal
        isOpen={createDebateOpen}
        onClose={() => setCreateDebateOpen(false)}
        onSave={handleSaveDebate}
      />
    </div>
  );
}
