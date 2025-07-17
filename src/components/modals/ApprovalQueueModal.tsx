
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Eye, Check, AlertTriangle } from 'lucide-react';

// Interface pour les éléments en attente d'approbation
interface ApprovalItem {
  id: string;
  title: string;
  type: 'texte' | 'procedure';
  category: string;
  submittedBy: string;
  submittedDate: string;
  priority: 'urgent' | 'normal' | 'low';
  status: 'pending' | 'reviewed';
}

// Données d'exemple pour la file d'approbation
const mockApprovalQueue: ApprovalItem[] = [
  {
    id: '1',
    title: 'Décret exécutif relatif à la protection de l\'environnement',
    type: 'texte',
    category: 'Environnement',
    submittedBy: 'Dr. Ahmed Benali',
    submittedDate: '15/01/2024',
    priority: 'urgent',
    status: 'pending'
  },
  {
    id: '2',
    title: 'Procédure d\'obtention du permis de construire',
    type: 'procedure',
    category: 'Urbanisme',
    submittedBy: 'Mme. Fatima Khedim',
    submittedDate: '14/01/2024',
    priority: 'normal',
    status: 'pending'
  },
  {
    id: '3',
    title: 'Loi de finances complémentaire 2024',
    type: 'texte',
    category: 'Finance',
    submittedBy: 'M. Karim Mahdjoub',
    submittedDate: '13/01/2024',
    priority: 'urgent',
    status: 'reviewed'
  }
];

interface ApprovalQueueModalProps {
  isOpen: boolean;
  onClose: () => void;
  filterType?: 'all' | 'legal-text' | 'procedure';
}

export function ApprovalQueueModal({ 
  isOpen, 
  onClose,
  filterType = 'all'
}: ApprovalQueueModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes les catégories');
  const [selectedPriority, setSelectedPriority] = useState('Toutes les priorités');
  const [activeTab, setActiveTab] = useState('Tout');

  const handleApprove = (id: string) => {
    console.log('Approuver l\'élément:', id);
    // Logique d'approbation
  };

  const handleReject = (id: string) => {
    console.log('Rejeter l\'élément:', id);
    // Logique de rejet
  };

  const handleExamine = (id: string) => {
    console.log('Examiner l\'élément:', id);
    // Logique d'examen
  };

  // Filtrage des éléments
  const filteredItems = mockApprovalQueue.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Toutes les catégories' || item.category === selectedCategory;
    const matchesPriority = selectedPriority === 'Toutes les priorités' || item.priority === selectedPriority;
    const matchesType = filterType === 'all' || 
      (filterType === 'legal-text' && item.type === 'texte') ||
      (filterType === 'procedure' && item.type === 'procedure');
    const matchesTab = activeTab === 'Tout' || 
      (activeTab === 'Textes juridiques' && item.type === 'texte') ||
      (activeTab === 'Procédures' && item.type === 'procedure');
    
    return matchesSearch && matchesCategory && matchesPriority && matchesType && matchesTab;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-700 border-red-200';
      case 'normal': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return <AlertTriangle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getTotalCount = (type?: string) => {
    if (!type) return mockApprovalQueue.length;
    return mockApprovalQueue.filter(item => 
      type === 'texte' ? item.type === 'texte' : item.type === 'procedure'
    ).length;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-amber-600" />
            {filterType === 'legal-text' ? 'File d\'attente d\'approbation - Textes Juridiques' :
             filterType === 'procedure' ? 'File d\'attente d\'approbation - Procédures Administratives' :
             'File d\'attente d\'approbation'}
            <Badge variant="outline" className="ml-2">
              {mockApprovalQueue.filter(item => item.status === 'pending').length} éléments en attente
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Filtres */}
          <Card>
            <CardContent className="pt-4">
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Rechercher par titre ou auteur..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Toutes les catégories">Toutes les catégories</SelectItem>
                      <SelectItem value="Environnement">Environnement</SelectItem>
                      <SelectItem value="Urbanisme">Urbanisme</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Toutes les priorités">Toutes les priorités</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="low">Faible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Onglets - seulement si pas de filtre spécifique */}
                {filterType === 'all' && (
                  <div className="flex gap-2">
                    <Button
                      variant={activeTab === 'Tout' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveTab('Tout')}
                      className="gap-2"
                    >
                      Tout ({getTotalCount()})
                    </Button>
                    <Button
                      variant={activeTab === 'Textes juridiques' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveTab('Textes juridiques')}
                      className="gap-2"
                    >
                      Textes juridiques ({getTotalCount('texte')})
                    </Button>
                    <Button
                      variant={activeTab === 'Procédures' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveTab('Procédures')}
                      className="gap-2"
                    >
                      Procédures ({getTotalCount('procedure')})
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Liste des éléments */}
          <div className="max-h-96 overflow-y-auto space-y-3">
            {filteredItems.map((item) => (
              <Card key={item.id} className="border-l-4 border-l-amber-400">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-gray-900">{item.title}</h4>
                          <p className="text-xs text-gray-600">
                            Soumis par {item.submittedBy} • {item.submittedDate}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {item.category}
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getPriorityColor(item.priority)} flex items-center gap-1`}
                          >
                            {getPriorityIcon(item.priority)}
                            {item.priority === 'urgent' ? 'Urgent' : 
                             item.priority === 'normal' ? 'Normal' : 'Faible'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleExamine(item.id)}
                      className="text-xs h-7"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Examiner
                    </Button>
                    <Button 
                      size="sm" 
                      variant="default" 
                      onClick={() => handleApprove(item.id)}
                      className="text-xs h-7 bg-green-600 hover:bg-green-700"
                    >
                      <Check className="w-3 h-3 mr-1" />
                      Approuver
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={() => handleReject(item.id)}
                      className="text-xs h-7"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Rejeter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredItems.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Eye className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Aucun élément trouvé dans la file d'approbation</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
