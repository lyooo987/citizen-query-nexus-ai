
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Star, 
  Award, 
  UserCheck, 
  Search,
  Filter,
  MessageSquare,
  Calendar,
  BookOpen,
  Trophy,
  Target,
  TrendingUp
} from 'lucide-react';

export function ExpertEcosystem() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');

  const experts = [
    {
      id: 1,
      name: "Dr. Amina Benali",
      title: "Expert en Droit Commercial",
      rating: 4.9,
      reviews: 127,
      specialties: ["Droit des sociétés", "Contrats commerciaux", "Fusions-acquisitions"],
      certifications: ["Avocat certifié", "Expert OHADA", "Médiateur commercial"],
      availability: "Disponible",
      price: "150 DZD/heure",
      responseTime: "< 2h",
      successRate: 96
    },
    {
      id: 2,
      name: "Me. Karim Mokhtar",
      title: "Spécialiste Droit du Travail",
      rating: 4.8,
      reviews: 89,
      specialties: ["Relations sociales", "Contentieux prud'homal", "Négociation collective"],
      certifications: ["Avocat spécialisé", "Formateur agréé"],
      availability: "Occupé jusqu'au 15/01",
      price: "120 DZD/heure",
      responseTime: "4h",
      successRate: 94
    }
  ];

  const mentorshipPrograms = [
    {
      id: 1,
      title: "Programme Droit des Affaires",
      mentor: "Dr. Amina Benali",
      participants: 12,
      duration: "6 mois",
      nextSession: "20 janvier 2025",
      level: "Intermédiaire",
      topics: ["Analyse contractuelle", "Due diligence", "Négociation"]
    }
  ];

  const certifications = [
    {
      id: 1,
      name: "Expert Analytique Juridique",
      description: "Maîtrise de l'analyse approfondie des textes juridiques",
      requirements: ["50 analyses validées", "Note moyenne > 4.5", "Peer review positifs"],
      progress: 75,
      holders: 23
    },
    {
      id: 2,
      name: "Contributeur Expert",
      description: "Contribution significative à la base de connaissances",
      requirements: ["100 contributions", "20 validations par pairs", "Mentorat actif"],
      progress: 60,
      holders: 15
    }
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="marketplace" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="marketplace">Marketplace d'Expertise</TabsTrigger>
          <TabsTrigger value="peer-review">Peer Review</TabsTrigger>
          <TabsTrigger value="mentorship">Mentorat</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace" className="space-y-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher un expert..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtres
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {experts.map((expert) => (
              <Card key={expert.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {expert.name}
                        <Badge className="bg-green-100 text-green-800">{expert.availability}</Badge>
                      </CardTitle>
                      <p className="text-gray-600">{expert.title}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{expert.rating}</span>
                        <span className="text-gray-500">({expert.reviews})</span>
                      </div>
                      <div className="text-sm text-gray-600">{expert.price}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Spécialités</h4>
                    <div className="flex flex-wrap gap-2">
                      {expert.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline">{specialty}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Certifications</h4>
                    <div className="flex flex-wrap gap-2">
                      {expert.certifications.map((cert, index) => (
                        <Badge key={index} className="bg-blue-100 text-blue-800">
                          <Award className="w-3 h-3 mr-1" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Temps de réponse :</span>
                      <div className="font-medium">{expert.responseTime}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Taux de réussite :</span>
                      <div className="font-medium">{expert.successRate}%</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Consulter
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Calendar className="w-4 h-4 mr-2" />
                      Réserver
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="peer-review" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="w-5 h-5" />
                Système de Validation Croisée
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Soumettez vos analyses juridiques pour validation par vos pairs et validez celles des autres membres.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Target className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold">15</div>
                    <div className="text-sm text-gray-600">Analyses en attente</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold">89%</div>
                    <div className="text-sm text-gray-600">Taux d'approbation</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                    <div className="text-2xl font-bold">47</div>
                    <div className="text-sm text-gray-600">Reviews effectuées</div>
                  </CardContent>
                </Card>
              </div>
              <div className="flex gap-2 mt-4">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  Soumettre une analyse
                </Button>
                <Button variant="outline">
                  Valider des analyses
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mentorship" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mentorshipPrograms.map((program) => (
              <Card key={program.id}>
                <CardHeader>
                  <CardTitle>{program.title}</CardTitle>
                  <p className="text-gray-600">Mentoré par {program.mentor}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Participants :</span>
                      <div className="font-medium">{program.participants} membres</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Durée :</span>
                      <div className="font-medium">{program.duration}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Niveau :</span>
                      <div className="font-medium">{program.level}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Prochaine session :</span>
                      <div className="font-medium">{program.nextSession}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Thèmes abordés</h4>
                    <div className="flex flex-wrap gap-2">
                      {program.topics.map((topic, index) => (
                        <Badge key={index} variant="outline">{topic}</Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Rejoindre le programme
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {certifications.map((cert) => (
              <Card key={cert.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-600" />
                    {cert.name}
                  </CardTitle>
                  <p className="text-gray-600">{cert.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progression</span>
                      <span>{cert.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-emerald-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${cert.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Prérequis</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {cert.requirements.map((req, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-sm text-gray-500">
                    {cert.holders} membres certifiés
                  </div>

                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Commencer la certification
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
