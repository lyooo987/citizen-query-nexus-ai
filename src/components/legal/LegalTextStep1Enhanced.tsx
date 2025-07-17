import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Building, Calendar, User, Scan } from "lucide-react";
import { OCRScanner } from '@/components/common/OCRScanner';

interface LegalTextStep1EnhancedProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function LegalTextStep1Enhanced({ data, onUpdate, onNext, onPrevious }: LegalTextStep1EnhancedProps) {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    category: "",
    authority: "",
    reference: "",
    publicationDate: "",
    description: "",
    language: "ar",
    ...data
  });

  const [showOCRScanner, setShowOCRScanner] = useState(false);

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const handleInputChange = (field: string, value: any) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
  };

  const handleOCRTextExtracted = (text: string) => {
    // Importer la fonction d'extraction
    import('@/utils/ocrFormFiller').then(({ extractLegalTextData }) => {
      const extractedData = extractLegalTextData(text);
      console.log('Données extraites:', extractedData);
      
      // Pré-remplir le formulaire avec les données extraites
      const updatedFormData = {
        ...formData,
        ...extractedData
      };
      setFormData(updatedFormData);
    });
    setShowOCRScanner(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const textTypes = [
    "Loi",
    "Décret exécutif",
    "Décret présidentiel",
    "Ordonnance",
    "Arrêté ministériel",
    "Arrêté interministériel",
    "Circulaire",
    "Instruction"
  ];

  const categories = [
    "Droit civil",
    "Droit commercial",
    "Droit pénal",
    "Droit administratif",
    "Droit du travail",
    "Droit fiscal",
    "Droit de l'urbanisme",
    "Droit de l'investissement"
  ];

  const authorities = [
    "Présidence de la République",
    "Gouvernement",
    "Ministère de la Justice",
    "Ministère de l'Intérieur",
    "Ministère des Finances",
    "Ministère du Commerce",
    "Ministère du Travail",
    "Conseil d'État"
  ];

  if (showOCRScanner) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Scanner un document juridique</h3>
          <Button 
            variant="outline" 
            onClick={() => setShowOCRScanner(false)}
          >
            Retour au formulaire
          </Button>
        </div>
        <OCRScanner
          title="Scanner pour pré-remplir le formulaire"
          onTextExtracted={handleOCRTextExtracted}
          onClose={() => setShowOCRScanner(false)}
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              Informations Générales - Texte Juridique Algérien
            </CardTitle>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowOCRScanner(true)}
              className="flex items-center gap-2"
            >
              <Scan className="w-4 h-4" />
              Scanner un document
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Titre du texte juridique *</Label>
            <Input
              id="title"
              placeholder="Ex: Loi relative à l'investissement..."
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
            />
          </div>

          {/* Type and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type de texte *</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le type" />
                </SelectTrigger>
                <SelectContent>
                  {textTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Catégorie juridique *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner la catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Authority */}
          <div className="space-y-2">
            <Label htmlFor="authority">Autorité émettrice *</Label>
            <Select value={formData.authority} onValueChange={(value) => handleInputChange("authority", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner l'autorité" />
              </SelectTrigger>
              <SelectContent>
                {authorities.map((authority) => (
                  <SelectItem key={authority} value={authority}>
                    {authority}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Reference and Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reference">Référence officielle</Label>
              <Input
                id="reference"
                placeholder="Ex: Loi n° 22-01 du 19 juillet 2022"
                value={formData.reference}
                onChange={(e) => handleInputChange("reference", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="publicationDate">Date de publication</Label>
              <Input
                id="publicationDate"
                type="date"
                value={formData.publicationDate}
                onChange={(e) => handleInputChange("publicationDate", e.target.value)}
              />
            </div>
          </div>

          {/* Language */}
          <div className="space-y-2">
            <Label htmlFor="language">Langue du texte</Label>
            <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner la langue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ar">Arabe</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="ar-fr">Arabe et Français</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description et objet du texte</Label>
            <Textarea
              id="description"
              placeholder="Décrivez brièvement l'objet et le contenu de ce texte juridique algérien..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onPrevious} disabled>
          Précédent
        </Button>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          Suivant
        </Button>
      </div>
    </form>
  );
}
