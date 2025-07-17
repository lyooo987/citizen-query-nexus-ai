
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  MessageCircle, 
  Users, 
  Highlighter,
  User,
  Calendar,
  Eye,
  Plus,
  Search,
  Filter,
  Edit3,
  Share2,
  Download,
  Tag
} from 'lucide-react';

export function CollaborativeAnnotations() {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [newAnnotation, setNewAnnotation] = useState('');
  const [annotationType, setAnnotationType] = useState('comment');

  const documents = [
    {
      id: 1,
      title: "Projet de loi sur la digitalisation des entreprises",
      type: "PDF",
      size: "2.4 MB",
      annotations: 23,
      collaborators: ["Ahmed B.", "Fatima Z.", "Omar K.", "Leila M."],
      lastModified: "Il y a 2 heures",
      status: "En révision",
      progress: 75
    },
    {
      id: 2,
      title: "Contrat de partenariat stratégique",
      type: "DOCX",
      size: "856 KB",
      annotations: 15,
      collaborators: ["Sarah M.", "Karim L.", "Nadia R."],
      lastModified: "Il y a 4 heures",
      status: "Finalisation",
      progress: 90
    },
    {
      id: 3,
      title: "Analyse jurisprudentielle - Cour Suprême 2024",
      type: "PDF",
      size: "5.1 MB",
      annotations: 42,
      collaborators: ["Mohamed A.", "Aicha B.", "Youssef K.", "Amina L.", "Hassan R."],
      lastModified: "Il y a 1 jour",
      status: "Annotation",
      progress: 60
    }
  ];

  const annotations = [
    {
      id: 1,
      author: "Ahmed Benali",
      content: "Cette clause nécessite une clarification concernant les modalités d'application.",
      type: "comment",
      page: 5,
      position: "Ligne 23-25",
      timestamp: "Il y a 1 heure",
      replies: 3,
      resolved: false
    },
    {
      id: 2,
      author: "Fatima Zahra",
      content: "Suggestion : Ajouter une référence à l'article 124 du Code civil.",
      type: "suggestion",
      page: 8,
      position: "Paragraphe 3",
      timestamp: "Il y a 2 heures",
      replies: 1,
      resolved: true
    },
    {
      id: 3,
      author: "Omar Khelil",
      content: "Attention : Cette formulation pourrait être ambiguë en cas de litige.",
      type: "warning",
      page: 12,
      position: "Article 6.2",
      timestamp: "Il y a 3 heures",
      replies: 5,
      resolved: false
    }
  ];

  const getAnnotationColor = (type) => {
    switch (type) {
      case 'comment': return 'bg-blue-100 text-blue-800';
      case 'suggestion': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-orange-100 text-orange-800';
      case 'question': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
          <Highlighter className="w-5 h-5 text-emerald-600" />
          Annotations Collaboratives sur les Documents
        </h3>
        <p className="text-gray-600">
          Annotez et commentez les documents en temps réel avec votre équipe
        </p>
      </div>

      <Tabs defaultValue="documents" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="annotations">Toutes les Annotations</TabsTrigger>
          <TabsTrigger value="activity">Activité Récente</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-6">
          <div className="flex gap-4 items-center justify-between">
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher des documents..."
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtres
              </Button>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau document
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {documents.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="w-5 h-5 text-emerald-600" />
                        {doc.title}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                        <span>{doc.type}</span>
                        <span>{doc.size}</span>
                        <Badge className={
                          doc.status === 'En révision' ? 'bg-blue-100 text-blue-800' :
                          doc.status === 'Finalisation' ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
                        }>
                          {doc.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progression des annotations</span>
                        <span>{doc.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-emerald-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${doc.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium mb-1">
                          {doc.annotations} annotations
                        </div>
                        <div className="flex -space-x-2">
                          {doc.collaborators.slice(0, 4).map((collaborator, index) => (
                            <div 
                              key={index}
                              className="w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-medium border-2 border-white"
                            >
                              {collaborator.split(' ').map(n => n[0]).join('')}
                            </div>
                          ))}
                          {doc.collaborators.length > 4 && (
                            <div className="w-6 h-6 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-xs font-medium border-2 border-white">
                              +{doc.collaborators.length - 4}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <div>Modifié</div>
                        <div>{doc.lastModified}</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        Consulter
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Edit3 className="w-4 h-4 mr-2" />
                        Annoter
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="annotations" className="space-y-6">
          <div className="flex gap-4 items-center justify-between">
            <div className="flex gap-2">
              <Input placeholder="Rechercher dans les annotations..." className="w-64" />
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtrer par type
              </Button>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline">23 en attente</Badge>
              <Badge variant="outline">15 résolues</Badge>
            </div>
          </div>

          <div className="space-y-4">
            {annotations.map((annotation) => (
              <Card key={annotation.id} className={`border-l-4 ${
                annotation.resolved ? 'border-l-green-500' : 'border-l-orange-500'
              }`}>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-medium">
                        {annotation.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium">{annotation.author}</div>
                        <div className="text-sm text-gray-500">{annotation.timestamp}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getAnnotationColor(annotation.type)}>
                        {annotation.type}
                      </Badge>
                      <Badge variant="outline">
                        Page {annotation.page}
                      </Badge>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-gray-700 mb-2">{annotation.content}</p>
                    <div className="text-sm text-gray-500">
                      Position : {annotation.position}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {annotation.replies} réponses
                      </span>
                      {annotation.resolved && (
                        <Badge className="bg-green-100 text-green-800">✓ Résolu</Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        Répondre
                      </Button>
                      {!annotation.resolved && (
                        <Button variant="ghost" size="sm">
                          Marquer comme résolu
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <MessageCircle className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold">156</div>
                  <div className="text-sm text-gray-600">Annotations aujourd'hui</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold">23</div>
                  <div className="text-sm text-gray-600">Collaborateurs actifs</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm text-gray-600">Documents annotés</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
