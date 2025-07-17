
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  GitBranch, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  User,
  Calendar,
  FileText,
  MessageSquare,
  Plus,
  Search,
  Filter,
  ArrowRight,
  Eye,
  Edit,
  Users,
  Play
} from 'lucide-react';

export function CollaborativeWorkflow() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);

  const workflows = [
    {
      id: 1,
      name: "Validation des contrats commerciaux",
      description: "Processus de validation en 4 étapes pour les contrats commerciaux",
      status: "Actif",
      documents: 23,
      participants: ["Ahmed B.", "Fatima Z.", "Omar K.", "Leila M."],
      steps: [
        { name: "Rédaction initiale", status: "completed", assignee: "Ahmed B." },
        { name: "Révision juridique", status: "in-progress", assignee: "Fatima Z." },
        { name: "Validation managériale", status: "pending", assignee: "Omar K." },
        { name: "Approbation finale", status: "pending", assignee: "Leila M." }
      ],
      progress: 50,
      created: "15 janvier 2025",
      deadline: "30 janvier 2025"
    },
    {
      id: 2,
      name: "Approbation des textes réglementaires",
      description: "Workflow pour l'approbation des nouveaux textes réglementaires",
      status: "Actif",
      documents: 8,
      participants: ["Sarah M.", "Karim L.", "Nadia R.", "Hassan A."],
      steps: [
        { name: "Préparation", status: "completed", assignee: "Sarah M." },
        { name: "Examen technique", status: "completed", assignee: "Karim L." },
        { name: "Révision légale", status: "in-progress", assignee: "Nadia R." },
        { name: "Publication", status: "pending", assignee: "Hassan A." }
      ],
      progress: 75,
      created: "10 janvier 2025",
      deadline: "25 janvier 2025"
    },
    {
      id: 3,
      name: "Validation des procédures administratives",
      description: "Processus de validation des nouvelles procédures administratives",
      status: "En pause",
      documents: 15,
      participants: ["Mohamed A.", "Aicha B.", "Youssef K."],
      steps: [
        { name: "Documentation", status: "completed", assignee: "Mohamed A." },
        { name: "Test pilote", status: "in-progress", assignee: "Aicha B." },
        { name: "Ajustements", status: "pending", assignee: "Youssef K." },
        { name: "Déploiement", status: "pending", assignee: "Mohamed A." }
      ],
      progress: 25,
      created: "5 janvier 2025",
      deadline: "20 février 2025"
    }
  ];

  const getStepIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in-progress': return <Clock className="w-5 h-5 text-blue-600" />;
      case 'pending': return <AlertCircle className="w-5 h-5 text-gray-400" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Actif': return 'bg-green-100 text-green-800';
      case 'En pause': return 'bg-yellow-100 text-yellow-800';
      case 'Terminé': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const pendingTasks = [
    {
      id: 1,
      title: "Révision du contrat de partenariat Sonatrach",
      workflow: "Validation des contrats commerciaux",
      assignee: "Vous",
      deadline: "Dans 2 jours",
      priority: "Haute",
      step: "Révision juridique"
    },
    {
      id: 2,
      title: "Approbation du règlement intérieur",
      workflow: "Approbation des textes réglementaires",
      assignee: "Nadia R.",
      deadline: "Dans 5 jours",
      priority: "Moyenne",
      step: "Révision légale"
    },
    {
      id: 3,
      title: "Test de la procédure de dédouanement",
      workflow: "Validation des procédures administratives",
      assignee: "Aicha B.",
      deadline: "Dans 1 semaine",
      priority: "Basse",
      step: "Test pilote"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
          <GitBranch className="w-5 h-5 text-emerald-600" />
          Workflow de Validation Collaborative
        </h3>
        <p className="text-gray-600">
          Gérez les processus de validation et d'approbation en équipe
        </p>
      </div>

      <Tabs defaultValue="workflows" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="tasks">Tâches en Attente</TabsTrigger>
          <TabsTrigger value="analytics">Analytiques</TabsTrigger>
        </TabsList>

        <TabsContent value="workflows" className="space-y-6">
          <div className="flex gap-4 items-center justify-between">
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher des workflows..."
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
              Nouveau workflow
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {workflows.map((workflow) => (
              <Card key={workflow.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <GitBranch className="w-5 h-5 text-emerald-600" />
                        {workflow.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{workflow.description}</p>
                    </div>
                    <Badge className={getStatusColor(workflow.status)}>
                      {workflow.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progression</span>
                        <span>{workflow.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-emerald-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${workflow.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium mb-2">Étapes :</div>
                      {workflow.steps.map((step, index) => (
                        <div key={index} className="flex items-center gap-3 text-sm">
                          {getStepIcon(step.status)}
                          <span className={step.status === 'completed' ? 'line-through text-gray-500' : ''}>
                            {step.name}
                          </span>
                          <span className="text-xs text-gray-500">({step.assignee})</span>
                          {index < workflow.steps.length - 1 && (
                            <ArrowRight className="w-3 h-3 text-gray-300 ml-auto" />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium mb-1">
                          {workflow.documents} documents
                        </div>
                        <div className="flex -space-x-2">
                          {workflow.participants.slice(0, 4).map((participant, index) => (
                            <div 
                              key={index}
                              className="w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-medium border-2 border-white"
                            >
                              {participant.split(' ').map(n => n[0]).join('')}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-right text-xs text-gray-500">
                        <div>Échéance : {workflow.deadline}</div>
                        <div>Créé : {workflow.created}</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        Voir
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Edit className="w-4 h-4 mr-2" />
                        Modifier
                      </Button>
                      <Button variant="outline" size="sm">
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <div className="flex gap-4 items-center justify-between">
            <h4 className="text-lg font-semibold">Tâches nécessitant votre attention</h4>
            <Badge variant="outline">{pendingTasks.length} tâches en attente</Badge>
          </div>

          <div className="space-y-4">
            {pendingTasks.map((task) => (
              <Card key={task.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h5 className="font-semibold mb-1">{task.title}</h5>
                      <p className="text-sm text-gray-600 mb-2">{task.workflow}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {task.assignee}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {task.deadline}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {task.step}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={
                        task.priority === 'Haute' ? 'bg-red-100 text-red-800' :
                        task.priority === 'Moyenne' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }>
                        {task.priority}
                      </Badge>
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        Traiter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <GitBranch className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm text-gray-600">Workflows actifs</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold">34</div>
                  <div className="text-sm text-gray-600">Tâches en cours</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold">128</div>
                  <div className="text-sm text-gray-600">Tâches terminées</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-2xl font-bold">15</div>
                  <div className="text-sm text-gray-600">Collaborateurs</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance des Workflows</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Temps moyen de validation</span>
                    <span className="font-semibold">3.2 jours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Taux de respect des délais</span>
                    <span className="font-semibold text-green-600">87%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Workflows en retard</span>
                    <span className="font-semibold text-red-600">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Efficacité moyenne</span>
                    <span className="font-semibold text-blue-600">92%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
