
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Users, Calendar, FileText, AlertCircle } from "lucide-react";

interface LegalTextStep4EnhancedProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function LegalTextStep4Enhanced({ data, onUpdate, onNext, onPrevious }: LegalTextStep4EnhancedProps) {
  const [formData, setFormData] = useState({
    workflowStatus: "draft",
    assignedReviewer: "",
    reviewDeadline: "",
    priority: "normal",
    tags: [],
    comments: "",
    relatedTexts: [],
    publicationDate: "",
    effectiveDate: "",
    ...data
  });

  const [newTag, setNewTag] = useState("");
  const [newRelatedText, setNewRelatedText] = useState("");

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const handleInputChange = (field: string, value: any) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      const updatedTags = [...formData.tags, newTag.trim()];
      handleInputChange("tags", updatedTags);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = formData.tags.filter((tag: string) => tag !== tagToRemove);
    handleInputChange("tags", updatedTags);
  };

  const addRelatedText = () => {
    if (newRelatedText.trim() && !formData.relatedTexts.includes(newRelatedText.trim())) {
      const updatedTexts = [...formData.relatedTexts, newRelatedText.trim()];
      handleInputChange("relatedTexts", updatedTexts);
      setNewRelatedText("");
    }
  };

  const removeRelatedText = (textToRemove: string) => {
    const updatedTexts = formData.relatedTexts.filter((text: string) => text !== textToRemove);
    handleInputChange("relatedTexts", updatedTexts);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulaire soumis avec les données:', formData);
    onNext();
  };

  const reviewers = [
    "Me Benaissa Ahmed - Avocat à la Cour Suprême",
    "Prof. Dr. Khelifi Fatima - Université d'Alger 1",
    "Me Boudjelal Rachid - Conseil d'État",
    "Dr. Meziani Sarah - Direction Générale de la Fonction Publique"
  ];

  const suggestedTags = [
    "Code civil algérien", "Droit commercial", "Procédure pénale", "Droit administratif",
    "Loi de finances", "Code du travail", "Urbanisme", "Investissement"
  ];

  const relatedTextsAlgeriens = [
    "Constitution algérienne de 2020",
    "Code civil - Ordonnance 75-58",
    "Code de procédure civile et administrative",
    "Loi sur l'investissement 22-01",
    "Code du travail - Loi 90-11"
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            Workflow et Publication - Texte Juridique Algérien
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Workflow Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="workflowStatus">Statut du workflow</Label>
              <Select value={formData.workflowStatus} onValueChange={(value) => handleInputChange("workflowStatus", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Brouillon</SelectItem>
                  <SelectItem value="review">En révision</SelectItem>
                  <SelectItem value="approved">Approuvé</SelectItem>
                  <SelectItem value="published">Publié au Journal Officiel</SelectItem>
                  <SelectItem value="archived">Archivé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priorité</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner la priorité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Faible</SelectItem>
                  <SelectItem value="normal">Normale</SelectItem>
                  <SelectItem value="high">Élevée</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reviewer Assignment */}
          <div className="space-y-2">
            <Label htmlFor="assignedReviewer">Réviseur assigné</Label>
            <Select value={formData.assignedReviewer} onValueChange={(value) => handleInputChange("assignedReviewer", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un réviseur" />
              </SelectTrigger>
              <SelectContent>
                {reviewers.map((reviewer) => (
                  <SelectItem key={reviewer} value={reviewer}>
                    {reviewer}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reviewDeadline">Échéance de révision</Label>
              <Input
                id="reviewDeadline"
                type="date"
                value={formData.reviewDeadline}
                onChange={(e) => handleInputChange("reviewDeadline", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="publicationDate">Date de publication prévue</Label>
              <Input
                id="publicationDate"
                type="date"
                value={formData.publicationDate}
                onChange={(e) => handleInputChange("publicationDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="effectiveDate">Date d'entrée en vigueur</Label>
              <Input
                id="effectiveDate"
                type="date"
                value={formData.effectiveDate}
                onChange={(e) => handleInputChange("effectiveDate", e.target.value)}
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Mots-clés juridiques</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Ajouter un mot-clé..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" variant="outline" onClick={addTag}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Suggested Tags */}
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">Suggestions :</Label>
              <div className="flex flex-wrap gap-1">
                {suggestedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-emerald-50"
                    onClick={() => {
                      if (!formData.tags.includes(tag)) {
                        handleInputChange("tags", [...formData.tags, tag]);
                      }
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Current Tags */}
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag: string) => (
                  <Badge key={tag} className="bg-emerald-100 text-emerald-800">
                    {tag}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-4 w-4 p-0"
                      onClick={() => removeTag(tag)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Related Texts */}
          <div className="space-y-2">
            <Label>Textes juridiques connexes</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Référence du texte connexe..."
                value={newRelatedText}
                onChange={(e) => setNewRelatedText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRelatedText())}
              />
              <Button type="button" variant="outline" onClick={addRelatedText}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Suggested Related Texts */}
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">Textes fréquemment liés :</Label>
              <div className="flex flex-wrap gap-1">
                {relatedTextsAlgeriens.map((text) => (
                  <Badge
                    key={text}
                    variant="outline"
                    className="cursor-pointer hover:bg-blue-50"
                    onClick={() => {
                      if (!formData.relatedTexts.includes(text)) {
                        handleInputChange("relatedTexts", [...formData.relatedTexts, text]);
                      }
                    }}
                  >
                    {text}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Current Related Texts */}
            {formData.relatedTexts.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.relatedTexts.map((text: string) => (
                  <Badge key={text} className="bg-blue-100 text-blue-800">
                    {text}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-4 w-4 p-0"
                      onClick={() => removeRelatedText(text)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Comments */}
          <div className="space-y-2">
            <Label htmlFor="comments">Commentaires et notes</Label>
            <Textarea
              id="comments"
              placeholder="Ajoutez des commentaires sur ce texte juridique algérien..."
              value={formData.comments}
              onChange={(e) => handleInputChange("comments", e.target.value)}
              rows={4}
            />
          </div>

          {/* Status Alert */}
          {formData.workflowStatus === "review" && (
            <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800">Texte en cours de révision</p>
                <p className="text-sm text-yellow-700">
                  Assigné à {formData.assignedReviewer} - Échéance : {formData.reviewDeadline}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Précédent
        </Button>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          Finaliser le texte juridique
        </Button>
      </div>
    </form>
  );
}
