import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Eye, Download, Edit, FileText, Copy, ExternalLink, Trash2 } from 'lucide-react';
import { useFormLibraryStore, SavedForm } from '@/stores/formLibraryStore';
import { useToast } from '@/hooks/use-toast';
import { FormField } from '@/components/configuration/form-generator/types';

interface CustomFormLibraryProps {
  onSelectForm: (form: SavedForm) => void;
  onAddToLegalTexts?: (form: SavedForm) => void;
  onAddToProcedures?: (form: SavedForm) => void;
}

export function CustomFormLibrary({ onSelectForm, onAddToLegalTexts, onAddToProcedures }: CustomFormLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { toast } = useToast();
  
  const { forms, removeForm } = useFormLibraryStore();

  const categories = Array.from(new Set(forms.map(f => f.category)));

  const filteredForms = forms.filter(form => {
    const matchesSearch = form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         form.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'all' || form.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredForms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedForms = filteredForms.slice(startIndex, startIndex + itemsPerPage);

  const handleUseForm = (form: SavedForm) => {
    onSelectForm(form);
    toast({
      title: "Formulaire sélectionné",
      description: `Le formulaire "${form.name}" a été sélectionné pour modification.`,
    });
  };

  const handleExportForm = (form: SavedForm) => {
    const exportData = {
      ...form,
      exportedAt: new Date().toISOString(),
      exportedFor: 'Administration algérienne'
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `formulaire_${form.name.replace(/\s+/g, '_').toLowerCase()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Formulaire exporté",
      description: `Le formulaire "${form.name}" a été exporté avec succès.`,
    });
  };

  const handleDeleteForm = (formId: string, formName: string) => {
    removeForm(formId);
    toast({
      title: "Formulaire supprimé",
      description: `Le formulaire "${formName}" a été supprimé de la bibliothèque.`,
    });
  };

  const handleAddToLegalTexts = (form: SavedForm) => {
    if (onAddToLegalTexts) {
      onAddToLegalTexts(form);
      toast({
        title: "Ajouté aux textes juridiques",
        description: `Le formulaire "${form.name}" a été ajouté au catalogue des textes juridiques.`,
      });
    }
  };

  const handleAddToProcedures = (form: SavedForm) => {
    if (onAddToProcedures) {
      onAddToProcedures(form);
      toast({
        title: "Ajouté aux procédures",
        description: `Le formulaire "${form.name}" a été ajouté au catalogue des procédures.`,
      });
    }
  };

  if (forms.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Aucun formulaire personnalisé</h3>
          <p className="text-gray-500">Créez votre premier formulaire dans l'onglet Générateur</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Mes Formulaires Personnalisés</h3>
        <Badge variant="outline">{forms.length} formulaire(s)</Badge>
      </div>

      {/* Filtres */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Rechercher un formulaire..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-64">
            <SelectValue placeholder="Toutes les catégories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les catégories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Liste des formulaires */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paginatedForms.map((form) => (
          <Card key={form.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                  <CardTitle className="text-lg">{form.name}</CardTitle>
                </div>
                <Badge variant="outline">{form.type}</Badge>
              </div>
              <CardDescription>{form.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Catégorie:</span> {form.category}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Champs:</span> {form.fields.length} configurés
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Créé le:</span> {new Date(form.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleUseForm(form)}
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Modifier
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleDeleteForm(form.id, form.name)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
                <div className="flex gap-1">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 text-xs"
                    onClick={() => handleAddToLegalTexts(form)}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Textes
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 text-xs"
                    onClick={() => handleAddToProcedures(form)}
                  >
                    <FileText className="w-3 h-3 mr-1" />
                    Procédures
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 text-xs"
                    onClick={() => handleExportForm(form)}
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Précédent
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} sur {totalPages} ({filteredForms.length} formulaires)
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Suivant
          </Button>
        </div>
      )}
    </div>
  );
}