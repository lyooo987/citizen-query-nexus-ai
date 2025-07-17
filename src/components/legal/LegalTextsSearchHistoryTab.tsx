import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  History, 
  Search, 
  Filter, 
  Eye, 
  Download, 
  GitCompare, 
  Calendar, 
  User, 
  FileText,
  Clock,
  AlertCircle,
  CheckCircle,
  Edit,
  Archive,
  RefreshCw,
  Building,
  MapPin,
  Star,
  Users,
  Scale
} from 'lucide-react';

interface LegalTextSearchVersion {
  id: string;
  searchQuery: string;
  version: string;
  date: string;
  author: string;
  institution: string;
  type: 'Recherche' | 'Modification' | 'Sauvegarde' | 'Partage' | 'Export' | 'Analyse';
  changes: string;
  status: 'Actuelle' | 'Archivée' | 'Partagée' | 'Privée' | 'En cours';
  category: string;
  authority: string;
  resultsCount: number;
  filtersUsed: number;
  impact: 'Majeur' | 'Mineur' | 'Standard';
  validatedBy?: string;
  comments?: string;
  searchDuration?: string;
  lastAccessed?: string;
}

const mockLegalTextSearchVersions: LegalTextSearchVersion[] = [
  {
    id: '1',
    searchQuery: 'Code civil algérien - Obligations et contrats',
    version: 'v1.3',
    date: '15/01/2024',
    author: 'Maître Benali',
    institution: 'Barreau d\'Alger',
    type: 'Recherche',
    changes: 'Recherche avancée sur les obligations contractuelles avec filtres par date et type de contrat',
    status: 'Actuelle',
    category: 'Civil',
    authority: 'Assemblée Populaire Nationale',
    resultsCount: 234,
    filtersUsed: 8,
    impact: 'Majeur',
    validatedBy: 'Service Juridique',
    comments: 'Recherche complète avec tous les critères de validité',
    searchDuration: '2.1s',
    lastAccessed: 'Il y a 2 heures'
  },
  {
    id: '2',
    searchQuery: 'Lois sur l\'investissement - Secteur privé',
    version: 'v2.1',
    date: '12/01/2024',
    author: 'Dr. Kaddour',
    institution: 'Ministère de l\'Industrie',
    type: 'Modification',
    changes: 'Mise à jour des critères de recherche pour inclure les nouvelles lois sur l\'investissement 2024',
    status: 'Partagée',
    category: 'Économique',
    authority: 'Conseil des Ministres',
    resultsCount: 156,
    filtersUsed: 12,
    impact: 'Majeur',
    validatedBy: 'Direction Juridique',
    comments: 'Intégration des nouvelles dispositions législatives',
    searchDuration: '1.8s',
    lastAccessed: 'Il y a 5 heures'
  },
  {
    id: '3',
    searchQuery: 'Code pénal - Infractions économiques',
    version: 'v1.7',
    date: '10/01/2024',
    author: 'Procureur Boudjedra',
    institution: 'Parquet d\'Oran',
    type: 'Sauvegarde',
    changes: 'Sauvegarde automatique de la recherche avec paramètres personnalisés pour les infractions économiques',
    status: 'Privée',
    category: 'Pénal',
    authority: 'Ministère de la Justice',
    resultsCount: 89,
    filtersUsed: 6,
    impact: 'Standard',
    validatedBy: 'Auto-validation',
    comments: 'Recherche sauvegardée pour usage récurrent dans les dossiers',
    searchDuration: '3.1s',
    lastAccessed: 'Il y a 1 jour'
  },
  {
    id: '4',
    searchQuery: 'Code du travail - Relations collectives',
    version: 'v1.2',
    date: '08/01/2024',
    author: 'Inspecteur Amrani',
    institution: 'Inspection du Travail',
    type: 'Export',
    changes: 'Export des résultats de recherche en format PDF avec annotations juridiques',
    status: 'Archivée',
    category: 'Social',
    authority: 'Ministère du Travail',
    resultsCount: 198,
    filtersUsed: 4,
    impact: 'Mineur',
    validatedBy: 'Service Inspection',
    comments: 'Export complet pour archivage et référence',
    searchDuration: '1.5s',
    lastAccessed: 'Il y a 3 jours'
  },
  {
    id: '5',
    searchQuery: 'Code de commerce - Sociétés commerciales',
    version: 'v1.0',
    date: '05/01/2024',
    author: 'Conseiller Benabbas',
    institution: 'CNRC',
    type: 'Analyse',
    changes: 'Analyse approfondie des dispositions sur les sociétés avec statistiques détaillées',
    status: 'En cours',
    category: 'Commercial',
    authority: 'Ministère du Commerce',
    resultsCount: 145,
    filtersUsed: 10,
    impact: 'Standard',
    validatedBy: 'En cours de validation',
    comments: 'Analyse en cours pour mise à jour du guide commercial',
    searchDuration: '4.2s',
    lastAccessed: 'Il y a 6 heures'
  }
];

export function LegalTextsSearchHistoryTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedAuthority, setSelectedAuthority] = useState('');
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);

  const categories = ['Tous', 'Civil', 'Pénal', 'Commercial', 'Social', 'Économique', 'Administratif', 'Constitutionnel'];
  const types = ['Tous', 'Recherche', 'Modification', 'Sauvegarde', 'Partage', 'Export', 'Analyse'];
  const statuses = ['Tous', 'Actuelle', 'Archivée', 'Partagée', 'Privée', 'En cours'];
  const authorities = ['Tous', 'Assemblée Populaire Nationale', 'Conseil des Ministres', 'Ministère de la Justice', 'Ministère du Travail', 'Ministère du Commerce'];

  const filteredVersions = mockLegalTextSearchVersions.filter(version => {
    const matchesSearch = version.searchQuery.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         version.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         version.changes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'Tous' || version.category === selectedCategory;
    const matchesType = !selectedType || selectedType === 'Tous' || version.type === selectedType;
    const matchesStatus = !selectedStatus || selectedStatus === 'Tous' || version.status === selectedStatus;
    const matchesAuthority = !selectedAuthority || selectedAuthority === 'Tous' || version.authority === selectedAuthority;
    
    return matchesSearch && matchesCategory && matchesType && matchesStatus && matchesAuthority;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Recherche': return 'bg-blue-100 text-blue-800';
      case 'Modification': return 'bg-orange-100 text-orange-800';
      case 'Sauvegarde': return 'bg-green-100 text-green-800';
      case 'Partage': return 'bg-purple-100 text-purple-800';
      case 'Export': return 'bg-cyan-100 text-cyan-800';
      case 'Analyse': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Actuelle': return 'bg-green-100 text-green-800';
      case 'Archivée': return 'bg-gray-100 text-gray-800';
      case 'Partagée': return 'bg-blue-100 text-blue-800';
      case 'Privée': return 'bg-red-100 text-red-800';
      case 'En cours': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Majeur': return 'bg-red-100 text-red-800';
      case 'Standard': return 'bg-orange-100 text-orange-800';
      case 'Mineur': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Actuelle': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Archivée': return <Archive className="w-4 h-4 text-gray-600" />;
      case 'Partagée': return <Users className="w-4 h-4 text-blue-600" />;
      case 'Privée': return <User className="w-4 h-4 text-red-600" />;
      case 'En cours': return <RefreshCw className="w-4 h-4 text-yellow-600" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleVersionSelection = (versionId: string, checked: boolean) => {
    if (checked) {
      setSelectedVersions([...selectedVersions, versionId]);
    } else {
      setSelectedVersions(selectedVersions.filter(id => id !== versionId));
    }
  };

  const handleCompareVersions = () => {
    if (selectedVersions.length >= 2) {
      console.log('Comparaison des recherches juridiques:', selectedVersions);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filtres et recherche */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-emerald-600" />
            Filtres et recherche avancée
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Type d'action" />
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedAuthority} onValueChange={setSelectedAuthority}>
              <SelectTrigger>
                <SelectValue placeholder="Autorité" />
              </SelectTrigger>
              <SelectContent>
                {authorities.map((authority) => (
                  <SelectItem key={authority} value={authority}>{authority}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                setSelectedType('');
                setSelectedStatus('');
                setSelectedAuthority('');
              }}
            >
              Réinitialiser
            </Button>
          </div>

          {selectedVersions.length >= 2 && (
            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <span className="text-emerald-800 font-medium">
                {selectedVersions.length} recherches sélectionnées pour comparaison
              </span>
              <Button 
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={handleCompareVersions}
              >
                <GitCompare className="w-4 h-4 mr-2" />
                Comparer les recherches
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Scale className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{filteredVersions.length}</p>
            <p className="text-sm text-gray-600">Recherches trouvées</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">
              {filteredVersions.filter(v => v.status === 'Actuelle').length}
            </p>
            <p className="text-sm text-gray-600">Actuelles</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">
              {filteredVersions.filter(v => v.status === 'Partagée').length}
            </p>
            <p className="text-sm text-gray-600">Partagées</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Archive className="w-8 h-8 text-gray-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">
              {filteredVersions.filter(v => v.status === 'Archivée').length}
            </p>
            <p className="text-sm text-gray-600">Archivées</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">
              {filteredVersions.filter(v => v.impact === 'Majeur').length}
            </p>
            <p className="text-sm text-gray-600">Impact majeur</p>
          </CardContent>
        </Card>
      </div>

      {/* Liste des recherches */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-600" />
            Historique des recherches juridiques ({filteredVersions.length} résultats)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredVersions.map((version) => (
              <div key={version.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <input
                      type="checkbox"
                      checked={selectedVersions.includes(version.id)}
                      onChange={(e) => handleVersionSelection(version.id, e.target.checked)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Scale className="w-4 h-4 text-blue-600" />
                        <h4 className="font-semibold text-lg text-gray-900">{version.searchQuery}</h4>
                        <Badge variant="outline" className="text-xs">
                          {version.version}
                        </Badge>
                        <Badge className={getTypeColor(version.type)}>
                          {version.type}
                        </Badge>
                        <Badge className={getImpactColor(version.impact)}>
                          Impact {version.impact}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{version.changes}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm mb-3">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">Auteur:</span>
                          <span className="font-medium">{version.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">Institution:</span>
                          <span className="font-medium">{version.institution}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">Date:</span>
                          <span className="font-medium">{version.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Scale className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">Autorité:</span>
                          <span className="font-medium">{version.authority}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">Résultats:</span>
                          <span className="font-medium">{version.resultsCount}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Filter className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">Filtres:</span>
                          <span className="font-medium">{version.filtersUsed}</span>
                        </div>
                      </div>

                      {version.searchDuration && (
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Durée: {version.searchDuration}
                          </span>
                          <span>Dernier accès: {version.lastAccessed}</span>
                        </div>
                      )}

                      {version.validatedBy && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-gray-600">Validé par:</span>
                            <span className="font-medium">{version.validatedBy}</span>
                          </div>
                          {version.comments && (
                            <p className="text-sm text-gray-600 mt-2">{version.comments}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(version.status)}
                      <Badge className={getStatusColor(version.status)}>
                        {version.status}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Voir
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Exporter
                      </Button>
                      <Button variant="ghost" size="sm">
                        <GitCompare className="w-4 h-4 mr-1" />
                        Comparer
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredVersions.length === 0 && (
            <div className="text-center py-12">
              <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-500 mb-2">Aucune recherche trouvée</h3>
              <p className="text-gray-400">Essayez de modifier vos critères de recherche</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
