import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Calendar, 
  Search,
  Plus,
  Edit,
  Trash2,
  Settings,
  Clock,
  AlertTriangle,
  Eye,
  Target,
  TrendingUp,
  Filter,
  Users,
  Building,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  History,
  Volume2,
  Zap
} from "lucide-react";

// Import des modals
import { NewAlertModal } from '../modals/NewAlertModal';
import { NewPersonalizedAlertModal } from '../modals/NewPersonalizedAlertModal';
import { NewDeadlineModal } from '../modals/NewDeadlineModal';
import { NewAlertTypeModal } from '../modals/NewAlertTypeModal';
import { NewChannelModal } from '../modals/NewChannelModal';
import { AlertManagementModal } from '../modals/AlertManagementModal';
import { NotificationModal } from '../modals/NotificationModal';
import { AlertsConfigurationModal } from '../modals/AlertsConfigurationModal';

interface AlertsNotificationsSectionProps {
  language?: string;
}

export function AlertsNotificationsSection({ language = "fr" }: AlertsNotificationsSectionProps) {
  const [alertsFilter, setAlertsFilter] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedAlertType, setSelectedAlertType] = useState("all");
  const [selectedChannel, setSelectedChannel] = useState("all");

  // États pour les modals
  const [isNewAlertModalOpen, setIsNewAlertModalOpen] = useState(false);
  const [isNewPersonalizedAlertModalOpen, setIsNewPersonalizedAlertModalOpen] = useState(false);
  const [isNewDeadlineModalOpen, setIsNewDeadlineModalOpen] = useState(false);
  const [isNewAlertTypeModalOpen, setIsNewAlertTypeModalOpen] = useState(false);
  const [isNewChannelModalOpen, setIsNewChannelModalOpen] = useState(false);
  const [isAlertManagementModalOpen, setIsAlertManagementModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isAlertsConfigurationModalOpen, setIsAlertsConfigurationModalOpen] = useState(false);

  // Alertes générales
  const generalAlerts = [
    { id: 1, title: "Nouveau décret sur le télétravail", type: "law", priority: "high", date: "2025-01-06", status: "active", channels: ["Email", "Push"] },
    { id: 2, title: "Arrêté ministériel - Sécurité routière", type: "regulation", priority: "medium", date: "2025-01-05", status: "active", channels: ["Email"] },
    { id: 3, title: "Circulaire fiscale 2025", type: "circular", priority: "high", date: "2025-01-04", status: "sent", channels: ["Email", "Teams"] },
    { id: 4, title: "Jurisprudence Conseil d'État", type: "jurisprudence", priority: "low", date: "2025-01-03", status: "scheduled", channels: ["Push"] },
    { id: 5, title: "Nouvelle réglementation RGPD", type: "law", priority: "high", date: "2025-01-02", status: "active", channels: ["Email", "SMS"] }
  ];

  // Alertes personnalisées par domaine juridique
  const personalizedAlerts = [
    { id: 1, name: "Droit du Travail", domain: "travail", keywords: ["salaire", "congé", "licenciement"], active: true, notifications: 45 },
    { id: 2, name: "Droit Commercial", domain: "commercial", keywords: ["contrat", "société", "commerce"], active: true, notifications: 23 },
    { id: 3, name: "Droit Fiscal", domain: "fiscal", keywords: ["impôt", "taxe", "TVA"], active: false, notifications: 12 },
    { id: 4, name: "Droit de l'Environnement", domain: "environnement", keywords: ["pollution", "énergie", "déchets"], active: true, notifications: 8 },
    { id: 5, name: "Marchés Publics", domain: "marches", keywords: ["appel d'offres", "marché", "concession"], active: true, notifications: 34 }
  ].filter(alert => 
    (selectedDomain === "all" || alert.domain === selectedDomain) &&
    alert.name.toLowerCase().includes(alertsFilter.toLowerCase())
  );

  // Notifications push
  const pushNotifications = [
    { id: 1, title: "Nouveau décret sur le télétravail", type: "law", priority: "high", time: "Il y a 2h", read: false },
    { id: 2, title: "Arrêté ministériel - Sécurité routière", type: "regulation", priority: "medium", time: "Il y a 4h", read: false },
    { id: 3, title: "Circulaire fiscale 2025", type: "circular", priority: "high", time: "Il y a 6h", read: true },
    { id: 4, title: "Jurisprudence Conseil d'État", type: "jurisprudence", priority: "low", time: "Hier", read: true },
    { id: 5, title: "Nouvelle réglementation RGPD", type: "law", priority: "high", time: "Il y a 1j", read: false }
  ].filter(notif => 
    selectedPriority === "all" || notif.priority === selectedPriority
  );

  // Calendrier des échéances réglementaires
  const regulatoryDeadlines = [
    { id: 1, title: "Déclaration TVA", date: "2025-01-15", priority: "high", status: "pending", category: "Fiscal" },
    { id: 2, title: "Rapport annuel RSE", date: "2025-01-20", priority: "medium", status: "in-progress", category: "Environnement" },
    { id: 3, title: "Élections professionnelles", date: "2025-01-25", priority: "high", status: "pending", category: "Travail" },
    { id: 4, title: "Audit sécurité", date: "2025-02-01", priority: "medium", status: "scheduled", category: "Sécurité" },
    { id: 5, title: "Renouvellement licences", date: "2025-02-10", priority: "low", status: "pending", category: "Commercial" }
  ];

  // Types d'alertes pour configuration
  const alertTypes = [
    { id: "1", name: "Textes juridiques", description: "Lois, décrets, arrêtés", active: true, frequency: "Immédiat" },
    { id: "2", name: "Jurisprudence", description: "Décisions de justice", active: true, frequency: "Quotidien" },
    { id: "3", name: "Réglementations", description: "Nouvelles réglementations", active: false, frequency: "Hebdomadaire" },
    { id: "4", name: "Circulaires", description: "Circulaires ministérielles", active: true, frequency: "Immédiat" },
    { id: "5", name: "Échéances", description: "Dates limites réglementaires", active: true, frequency: "3 jours avant" }
  ];

  // Canaux d'alertes
  const alertChannels = [
    { id: "1", name: "Email", icon: Mail, active: true, settings: "ahmed.benali@justice.gov.dz" },
    { id: "2", name: "Push Browser", icon: Bell, active: true, settings: "Activé pour ce navigateur" },
    { id: "3", name: "SMS", icon: Smartphone, active: false, settings: "Non configuré" },
    { id: "4", name: "Teams", icon: MessageSquare, active: true, settings: "Canal #veille-juridique" },
    { id: "5", name: "Slack", icon: MessageSquare, active: false, settings: "Non configuré" }
  ];

  // Historique des alertes
  const alertHistory = [
    { id: 1, title: "Décret n°25-01 sur le télétravail", type: "law", date: "2025-01-06 14:30", channel: "Email", status: "delivered" },
    { id: 2, title: "Arrêt Cour de Cassation - Droit du travail", type: "jurisprudence", date: "2025-01-06 09:15", channel: "Push", status: "delivered" },
    { id: 3, title: "Circulaire fiscale 2025-DGI-001", type: "circular", date: "2025-01-05 16:45", channel: "Teams", status: "delivered" },
    { id: 4, title: "Échéance déclaration TVA", type: "deadline", date: "2025-01-05 08:00", channel: "Email", status: "delivered" },
    { id: 5, title: "Nouvelle réglementation RGPD", type: "law", date: "2025-01-04 11:20", channel: "Push", status: "failed" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Alertes & Veille Proactive</h1>
          <p className="text-gray-600 mt-2">Restez informé des évolutions juridiques et réglementaires</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsAlertsConfigurationModalOpen(true)}>
            <Settings className="w-4 h-4 mr-2" />
            Configuration
          </Button>
        </div>
      </div>

      <Tabs defaultValue="alerts" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="alerts">Alertes</TabsTrigger>
          <TabsTrigger value="personalized-alerts">Alertes Personnalisées</TabsTrigger>
          <TabsTrigger value="push-notifications">Notifications Push</TabsTrigger>
          <TabsTrigger value="regulatory-calendar">Calendrier Réglementaire</TabsTrigger>
          <TabsTrigger value="alert-types">Types d'Alertes</TabsTrigger>
          <TabsTrigger value="alert-channels">Canaux d'Alertes</TabsTrigger>
        </TabsList>

        {/* Nouvel onglet Alertes */}
        <TabsContent value="alerts" className="space-y-4">
          <div className="flex justify-between items-center gap-4">
            <div className="flex gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher une alerte..."
                  className="pl-10"
                  value={alertsFilter}
                  onChange={(e) => setAlertsFilter(e.target.value)}
                />
              </div>
              <Select value={selectedAlertType} onValueChange={setSelectedAlertType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Type d'alerte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="law">Lois</SelectItem>
                  <SelectItem value="regulation">Réglementations</SelectItem>
                  <SelectItem value="circular">Circulaires</SelectItem>
                  <SelectItem value="jurisprudence">Jurisprudence</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => setIsNewAlertModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Alerte
            </Button>
          </div>
          
          <div className="space-y-3">
            {generalAlerts.map((alert) => (
              <Card key={alert.id}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {alert.type === 'law' && <FileText className="w-5 h-5 text-blue-600" />}
                        {alert.type === 'regulation' && <Settings className="w-5 h-5 text-green-600" />}
                        {alert.type === 'circular' && <MessageSquare className="w-5 h-5 text-purple-600" />}
                        {alert.type === 'jurisprudence' && <Users className="w-5 h-5 text-orange-600" />}
                        <div>
                          <h4 className="font-semibold">{alert.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>{alert.date}</span>
                            <span>•</span>
                            <span>Canaux: {alert.channels.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(alert.priority)}>
                        {alert.priority}
                      </Badge>
                      <Badge className={getStatusColor(alert.status)}>
                        {alert.status === 'active' ? 'Actif' : 
                         alert.status === 'sent' ? 'Envoyé' : 
                         alert.status === 'scheduled' ? 'Planifié' : alert.status}
                      </Badge>
                      <Button variant="outline" className="text-xs">
                        <Edit className="w-3 h-3 mr-1" />
                        Modifier
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Alertes personnalisées par domaine juridique */}
        <TabsContent value="personalized-alerts" className="space-y-4">
          <div className="flex justify-between items-center gap-4">
            <div className="flex gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher une alerte..."
                  className="pl-10"
                  value={alertsFilter}
                  onChange={(e) => setAlertsFilter(e.target.value)}
                />
              </div>
              <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Domaine juridique" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les domaines</SelectItem>
                  <SelectItem value="travail">Droit du Travail</SelectItem>
                  <SelectItem value="commercial">Droit Commercial</SelectItem>
                  <SelectItem value="fiscal">Droit Fiscal</SelectItem>
                  <SelectItem value="environnement">Environnement</SelectItem>
                  <SelectItem value="marches">Marchés Publics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => setIsNewPersonalizedAlertModalOpen(true)}>
              <Target className="w-4 h-4 mr-2" />
              Nouvelle Alerte Personnalisée
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {personalizedAlerts.map((alert) => (
              <Card key={alert.id}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{alert.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Switch checked={alert.active} />
                      <Badge variant="outline">{alert.notifications} notifications</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Mots-clés surveillés :</p>
                      <div className="flex flex-wrap gap-1">
                        {alert.keywords.map((keyword, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" className="text-xs">
                        <Edit className="w-3 h-3 mr-1" />
                        Modifier
                      </Button>
                      <Button variant="outline" className="text-xs">
                        <Eye className="w-3 h-3 mr-1" />
                        Voir alertes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Notifications push */}
        <TabsContent value="push-notifications" className="space-y-4">
          <div className="flex justify-between items-center gap-4">
            <div className="flex gap-4">
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Priorité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes priorités</SelectItem>
                  <SelectItem value="high">Priorité élevée</SelectItem>
                  <SelectItem value="medium">Priorité moyenne</SelectItem>
                  <SelectItem value="low">Priorité faible</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtres avancés
              </Button>
              <Button variant="outline">
                Marquer tout lu
              </Button>
            </div>
          </div>
          
          <div className="space-y-3">
            {pushNotifications.map((notification) => (
              <Card key={notification.id} className={cn(
                "transition-all cursor-pointer hover:shadow-md",
                !notification.read && "border-l-4 border-l-blue-500 bg-blue-50/30"
              )}>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {notification.type === 'law' && <FileText className="w-4 h-4 text-blue-600" />}
                        {notification.type === 'regulation' && <Settings className="w-4 h-4 text-green-600" />}
                        {notification.type === 'circular' && <MessageSquare className="w-4 h-4 text-purple-600" />}
                        {notification.type === 'jurisprudence' && <Users className="w-4 h-4 text-orange-600" />}
                        <h4 className={cn(
                          "font-semibold",
                          !notification.read && "text-blue-900"
                        )}>{notification.title}</h4>
                        <Badge className={getPriorityColor(notification.priority)}>
                          {notification.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{notification.time}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                      <Button variant="ghost" className="p-2">
                        <Bell className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Calendrier des échéances réglementaires */}
        <TabsContent value="regulatory-calendar" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Échéances Réglementaires</h3>
              <p className="text-sm text-gray-600">Planifiez et suivez vos obligations réglementaires</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Vue Calendrier
              </Button>
              <Button onClick={() => setIsNewDeadlineModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle Échéance
              </Button>
            </div>
          </div>
          
          <div className="space-y-3">
            {regulatoryDeadlines.map((deadline) => (
              <Card key={deadline.id}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <div>
                          <h4 className="font-semibold">{deadline.title}</h4>
                          <p className="text-sm text-gray-600">{deadline.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{deadline.category}</Badge>
                        <Badge className={getPriorityColor(deadline.priority)}>
                          {deadline.priority}
                        </Badge>
                        <Badge className={getStatusColor(deadline.status)}>
                          {deadline.status === 'pending' && 'En attente'}
                          {deadline.status === 'in-progress' && 'En cours'}
                          {deadline.status === 'scheduled' && 'Planifié'}
                          {deadline.status === 'completed' && 'Terminé'}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {deadline.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : deadline.priority === 'high' ? (
                        <AlertCircle className="w-5 h-5 text-red-600" />
                      ) : (
                        <Clock className="w-5 h-5 text-orange-600" />
                      )}
                      <Button variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Configuration des types d'alertes */}
        <TabsContent value="alert-types" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Configuration des Types d'Alertes</h3>
              <p className="text-sm text-gray-600">Gérez les types d'alertes et leur fréquence</p>
            </div>
            <Button onClick={() => setIsNewAlertTypeModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Type
            </Button>
          </div>

          <div className="space-y-3">
            {alertTypes.map((type) => (
              <Card key={type.id}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Switch checked={type.active} />
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-orange-600" />
                        <div>
                          <h4 className="font-semibold">{type.name}</h4>
                          <p className="text-sm text-gray-600">{type.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        Fréquence: {type.frequency}
                      </Badge>
                      <Button variant="outline" className="text-xs">
                        <Settings className="w-3 h-3 mr-1" />
                        Configurer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Configuration des canaux d'alertes */}
        <TabsContent value="alert-channels" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Configuration des Canaux d'Alertes</h3>
              <p className="text-sm text-gray-600">Gérez vos canaux de notification</p>
            </div>
            <Button onClick={() => setIsNewChannelModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Canal
            </Button>
          </div>

          <div className="space-y-3">
            {alertChannels.map((channel) => (
              <Card key={channel.id}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Switch checked={channel.active} />
                      <div className="flex items-center gap-2">
                        <channel.icon className="w-5 h-5 text-blue-600" />
                        <div>
                          <h4 className="font-semibold">{channel.name}</h4>
                          <p className="text-sm text-gray-600">{channel.settings}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={channel.active ? "default" : "secondary"} className="text-xs">
                        {channel.active ? "Activé" : "Inactif"}
                      </Badge>
                      <Button variant="outline" className="text-xs">
                        <Settings className="w-3 h-3 mr-1" />
                        Configurer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <NewAlertModal
        isOpen={isNewAlertModalOpen}
        onClose={() => setIsNewAlertModalOpen(false)}
        alertTypes={alertTypes}
        alertChannels={alertChannels}
        onSave={(alertData) => {
          console.log('Nouvelle alerte créée:', alertData);
          // Ici vous pourriez ajouter la logique pour sauvegarder l'alerte
        }}
      />

      <NewPersonalizedAlertModal
        isOpen={isNewPersonalizedAlertModalOpen}
        onClose={() => setIsNewPersonalizedAlertModalOpen(false)}
        onSave={(alertData) => {
          console.log('Nouvelle alerte personnalisée créée:', alertData);
        }}
      />

      <NewDeadlineModal
        isOpen={isNewDeadlineModalOpen}
        onClose={() => setIsNewDeadlineModalOpen(false)}
        onSave={(deadlineData) => {
          console.log('Nouvelle échéance créée:', deadlineData);
        }}
      />

      <NewAlertTypeModal
        isOpen={isNewAlertTypeModalOpen}
        onClose={() => setIsNewAlertTypeModalOpen(false)}
        onSave={(typeData) => {
          console.log('Nouveau type d\'alerte créé:', typeData);
        }}
      />

      <NewChannelModal
        isOpen={isNewChannelModalOpen}
        onClose={() => setIsNewChannelModalOpen(false)}
        onSave={(channelData) => {
          console.log('Nouveau canal créé:', channelData);
        }}
      />

      <AlertsConfigurationModal
        isOpen={isAlertsConfigurationModalOpen}
        onClose={() => setIsAlertsConfigurationModalOpen(false)}
      />
    </div>
  );
}
