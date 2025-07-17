
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Clock,
  Pin,
  Star,
  User,
  Plus,
  Search,
  Filter,
  Eye,
  Reply
} from 'lucide-react';

export function DomainForums() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('droit-affaires');

  const legalDomains = [
    {
      id: 'droit-affaires',
      name: 'Droit des Affaires',
      description: 'Sociétés, contrats commerciaux, fusions-acquisitions',
      topics: 156,
      members: 2341,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'droit-travail',
      name: 'Droit du Travail',
      description: 'Relations employeur-employé, conventions collectives',
      topics: 203,
      members: 1876,
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 'droit-fiscal',
      name: 'Droit Fiscal',
      description: 'Fiscalité des entreprises et des particuliers',
      topics: 89,
      members: 1234,
      color: 'bg-purple-100 text-purple-800'
    },
    {
      id: 'droit-penal',
      name: 'Droit Pénal',
      description: 'Procédures pénales, infractions',
      topics: 134,
      members: 987,
      color: 'bg-red-100 text-red-800'
    },
    {
      id: 'droit-civil',
      name: 'Droit Civil',
      description: 'Contrats, responsabilité civile, biens',
      topics: 267,
      members: 3456,
      color: 'bg-orange-100 text-orange-800'
    },
    {
      id: 'droit-administratif',
      name: 'Droit Administratif',
      description: 'Marchés publics, contentieux administratif',
      topics: 178,
      members: 1567,
      color: 'bg-teal-100 text-teal-800'
    }
  ];

  const domainTopics = {
    'droit-affaires': [
      {
        id: 1,
        title: "Nouvelle réglementation sur les startups en Algérie",
        author: "Me. Karim Bencheikh",
        replies: 42,
        views: 1203,
        lastActivity: "Il y a 1 heure",
        isPinned: true,
        isHot: true,
        tags: ["startups", "réglementation", "investissement"]
      },
      {
        id: 2,
        title: "Contrats de partenariat public-privé : nouvelles modalités",
        author: "Dr. Amina Khelil",
        replies: 28,
        views: 876,
        lastActivity: "Il y a 3 heures",
        isPinned: false,
        isHot: true,
        tags: ["PPP", "contrats", "public"]
      }
    ]
  };

  const currentDomain = legalDomains.find(d => d.id === selectedDomain);
  const topics = domainTopics[selectedDomain] || [];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
          <MessageSquare className="w-5 h-5 text-emerald-600" />
          Forums de Discussion par Domaine Juridique
        </h3>
        <p className="text-gray-600">
          Échangez avec des experts spécialisés dans chaque domaine du droit
        </p>
      </div>

      <Tabs defaultValue="domains" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="domains">Domaines Juridiques</TabsTrigger>
          <TabsTrigger value="discussions">Discussions Active</TabsTrigger>
        </TabsList>

        <TabsContent value="domains" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {legalDomains.map((domain) => (
              <Card 
                key={domain.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedDomain === domain.id ? 'ring-2 ring-emerald-500' : ''
                }`}
                onClick={() => setSelectedDomain(domain.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{domain.name}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{domain.description}</p>
                    </div>
                    <Badge className={domain.color}>
                      {domain.topics} sujets
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {domain.members.toLocaleString()} membres
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDomain(domain.id);
                      }}
                    >
                      Rejoindre
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {currentDomain && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Badge className={currentDomain.color}>
                      {currentDomain.name}
                    </Badge>
                    Discussions récentes
                  </CardTitle>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau sujet
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topics.map((topic) => (
                    <div key={topic.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {topic.isPinned && <Pin className="w-4 h-4 text-red-500" />}
                            {topic.isHot && <Badge className="bg-red-100 text-red-800">🔥 Populaire</Badge>}
                            <h4 className="font-semibold text-gray-900">{topic.title}</h4>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {topic.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {topic.lastActivity}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            {topic.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Reply className="w-4 h-4" />
                              {topic.replies}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {topic.views}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="discussions">
          <div className="space-y-4">
            <div className="flex gap-4 items-center justify-between">
              <div className="flex gap-2 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Rechercher dans toutes les discussions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtres
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                  <div className="text-2xl font-bold">847</div>
                  <div className="text-sm text-gray-600">Discussions actives</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold">4,521</div>
                  <div className="text-sm text-gray-600">Experts connectés</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Star className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                  <div className="text-2xl font-bold">156</div>
                  <div className="text-sm text-gray-600">Sujets épinglés</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
