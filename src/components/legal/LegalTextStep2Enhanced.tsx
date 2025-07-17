import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X, FileText, BookOpen } from "lucide-react";

interface LegalTextStep2EnhancedProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function LegalTextStep2Enhanced({ data, onUpdate, onNext, onPrevious }: LegalTextStep2EnhancedProps) {
  const [formData, setFormData] = useState({
    content: "",
    structure: "chapters",
    chapters: [],
    articles: [],
    annexes: [],
    modifications: "",
    abrogations: "",
    ...data
  });

  const [newChapter, setNewChapter] = useState("");
  const [newArticle, setNewArticle] = useState("");
  const [newAnnex, setNewAnnex] = useState("");

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const handleInputChange = (field: string, value: any) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
  };

  const addChapter = () => {
    if (newChapter.trim() && !formData.chapters.includes(newChapter.trim())) {
      const updatedChapters = [...formData.chapters, newChapter.trim()];
      handleInputChange("chapters", updatedChapters);
      setNewChapter("");
    }
  };

  const removeChapter = (chapterToRemove: string) => {
    const updatedChapters = formData.chapters.filter((chapter: string) => chapter !== chapterToRemove);
    handleInputChange("chapters", updatedChapters);
  };

  const addArticle = () => {
    if (newArticle.trim() && !formData.articles.includes(newArticle.trim())) {
      const updatedArticles = [...formData.articles, newArticle.trim()];
      handleInputChange("articles", updatedArticles);
      setNewArticle("");
    }
  };

  const removeArticle = (articleToRemove: string) => {
    const updatedArticles = formData.articles.filter((article: string) => article !== articleToRemove);
    handleInputChange("articles", updatedArticles);
  };

  const addAnnex = () => {
    if (newAnnex.trim() && !formData.annexes.includes(newAnnex.trim())) {
      const updatedAnnexes = [...formData.annexes, newAnnex.trim()];
      handleInputChange("annexes", updatedAnnexes);
      setNewAnnex("");
    }
  };

  const removeAnnex = (annexToRemove: string) => {
    const updatedAnnexes = formData.annexes.filter((annex: string) => annex !== annexToRemove);
    handleInputChange("annexes", updatedAnnexes);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            Contenu et Structure - Texte Juridique Algérien
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Contenu principal du texte *</Label>
            <Textarea
              id="content"
              placeholder="Saisissez le contenu complet du texte juridique algérien..."
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              rows={12}
              className="font-mono text-sm"
              required
            />
          </div>

          {/* Structure Type */}
          <div className="space-y-2">
            <Label htmlFor="structure">Type de structure</Label>
            <Select value={formData.structure} onValueChange={(value) => handleInputChange("structure", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner la structure" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chapters">Chapitres et Articles</SelectItem>
                <SelectItem value="titles">Titres et Sections</SelectItem>
                <SelectItem value="parts">Parties et Sous-parties</SelectItem>
                <SelectItem value="articles">Articles uniquement</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Chapters */}
          <div className="space-y-2">
            <Label>Chapitres</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Ajouter un chapitre..."
                value={newChapter}
                onChange={(e) => setNewChapter(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addChapter())}
              />
              <Button type="button" variant="outline" onClick={addChapter}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {formData.chapters.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.chapters.map((chapter: string) => (
                  <Badge key={chapter} className="bg-emerald-100 text-emerald-800">
                    {chapter}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-4 w-4 p-0"
                      onClick={() => removeChapter(chapter)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Articles */}
          <div className="space-y-2">
            <Label>Articles principaux</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Ex: Article 1er - Définitions..."
                value={newArticle}
                onChange={(e) => setNewArticle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addArticle())}
              />
              <Button type="button" variant="outline" onClick={addArticle}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {formData.articles.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.articles.map((article: string) => (
                  <Badge key={article} className="bg-blue-100 text-blue-800">
                    {article}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-4 w-4 p-0"
                      onClick={() => removeArticle(article)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Annexes */}
          <div className="space-y-2">
            <Label>Annexes</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Ajouter une annexe..."
                value={newAnnex}
                onChange={(e) => setNewAnnex(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAnnex())}
              />
              <Button type="button" variant="outline" onClick={addAnnex}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {formData.annexes.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.annexes.map((annex: string) => (
                  <Badge key={annex} className="bg-purple-100 text-purple-800">
                    {annex}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-4 w-4 p-0"
                      onClick={() => removeAnnex(annex)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Modifications */}
          <div className="space-y-2">
            <Label htmlFor="modifications">Modifications apportées</Label>
            <Textarea
              id="modifications"
              placeholder="Décrivez les modifications apportées aux textes existants..."
              value={formData.modifications}
              onChange={(e) => handleInputChange("modifications", e.target.value)}
              rows={3}
            />
          </div>

          {/* Abrogations */}
          <div className="space-y-2">
            <Label htmlFor="abrogations">Dispositions abrogées</Label>
            <Textarea
              id="abrogations"
              placeholder="Listez les dispositions abrogées par ce texte..."
              value={formData.abrogations}
              onChange={(e) => handleInputChange("abrogations", e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Précédent
        </Button>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          Suivant
        </Button>
      </div>
    </form>
  );
}