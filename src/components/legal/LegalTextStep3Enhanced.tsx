import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Scale, Users, Building } from "lucide-react";

interface LegalTextStep3EnhancedProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function LegalTextStep3Enhanced({ data, onUpdate, onNext, onPrevious }: LegalTextStep3EnhancedProps) {
  const [formData, setFormData] = useState({
    applicableEntities: [],
    geographicScope: "national",
    temporalScope: "permanent",
    effectiveDate: "",
    expirationDate: "",
    conditions: "",
    exceptions: [],
    sanctions: "",
    implementationMeasures: "",
    responsibleAuthorities: [],
    ...data
  });

  const [newEntity, setNewEntity] = useState("");
  const [newException, setNewException] = useState("");
  const [newAuthority, setNewAuthority] = useState("");

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const handleInputChange = (field: string, value: any) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
  };

  const addEntity = () => {
    if (newEntity.trim() && !formData.applicableEntities.includes(newEntity.trim())) {
      const updatedEntities = [...formData.applicableEntities, newEntity.trim()];
      handleInputChange("applicableEntities", updatedEntities);
      setNewEntity("");
    }
  };

  const removeEntity = (entityToRemove: string) => {
    const updatedEntities = formData.applicableEntities.filter((entity: string) => entity !== entityToRemove);
    handleInputChange("applicableEntities", updatedEntities);
  };

  const addException = () => {
    if (newException.trim() && !formData.exceptions.includes(newException.trim())) {
      const updatedExceptions = [...formData.exceptions, newException.trim()];
      handleInputChange("exceptions", updatedExceptions);
      setNewException("");
    }
  };

  const removeException = (exceptionToRemove: string) => {
    const updatedExceptions = formData.exceptions.filter((exception: string) => exception !== exceptionToRemove);
    handleInputChange("exceptions", updatedExceptions);
  };

  const addAuthority = () => {
    if (newAuthority.trim() && !formData.responsibleAuthorities.includes(newAuthority.trim())) {
      const updatedAuthorities = [...formData.responsibleAuthorities, newAuthority.trim()];
      handleInputChange("responsibleAuthorities", updatedAuthorities);
      setNewAuthority("");
    }
  };

  const removeAuthority = (authorityToRemove: string) => {
    const updatedAuthorities = formData.responsibleAuthorities.filter((authority: string) => authority !== authorityToRemove);
    handleInputChange("responsibleAuthorities", updatedAuthorities);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const suggestedEntities = [
    "Administrations publiques",
    "Entreprises privées",
    "Associations",
    "Collectivités locales",
    "Établissements publics",
    "Particuliers",
    "Professionnels libéraux"
  ];

  const suggestedAuthorities = [
    "Ministère de la Justice",
    "Ministère de l'Intérieur",
    "Walis",
    "Préfets",
    "Maires",
    "Directeurs exécutifs",
    "Inspections générales"
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-600" />
            Champ d'Application - Texte Juridique Algérien
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Applicable Entities */}
          <div className="space-y-2">
            <Label>Entités concernées</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Ajouter une entité..."
                value={newEntity}
                onChange={(e) => setNewEntity(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addEntity())}
              />
              <Button type="button" variant="outline" onClick={addEntity}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Suggested Entities */}
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">Suggestions :</Label>
              <div className="flex flex-wrap gap-1">
                {suggestedEntities.map((entity) => (
                  <Badge
                    key={entity}
                    variant="outline"
                    className="cursor-pointer hover:bg-emerald-50"
                    onClick={() => {
                      if (!formData.applicableEntities.includes(entity)) {
                        handleInputChange("applicableEntities", [...formData.applicableEntities, entity]);
                      }
                    }}
                  >
                    {entity}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Current Entities */}
            {formData.applicableEntities.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.applicableEntities.map((entity: string) => (
                  <Badge key={entity} className="bg-emerald-100 text-emerald-800">
                    {entity}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-4 w-4 p-0"
                      onClick={() => removeEntity(entity)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Geographic and Temporal Scope */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="geographicScope">Champ géographique</Label>
              <Select value={formData.geographicScope} onValueChange={(value) => handleInputChange("geographicScope", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le champ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="national">National</SelectItem>
                  <SelectItem value="regional">Régional</SelectItem>
                  <SelectItem value="wilaya">Wilaya</SelectItem>
                  <SelectItem value="commune">Communal</SelectItem>
                  <SelectItem value="sectorial">Sectoriel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="temporalScope">Champ temporel</Label>
              <Select value={formData.temporalScope} onValueChange={(value) => handleInputChange("temporalScope", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner la durée" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="permanent">Permanent</SelectItem>
                  <SelectItem value="temporary">Temporaire</SelectItem>
                  <SelectItem value="experimental">Expérimental</SelectItem>
                  <SelectItem value="transitional">Transitoire</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="effectiveDate">Date d'entrée en vigueur</Label>
              <Input
                id="effectiveDate"
                type="date"
                value={formData.effectiveDate}
                onChange={(e) => handleInputChange("effectiveDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expirationDate">Date d'expiration (si applicable)</Label>
              <Input
                id="expirationDate"
                type="date"
                value={formData.expirationDate}
                onChange={(e) => handleInputChange("expirationDate", e.target.value)}
              />
            </div>
          </div>

          {/* Conditions */}
          <div className="space-y-2">
            <Label htmlFor="conditions">Conditions d'application</Label>
            <Textarea
              id="conditions"
              placeholder="Décrivez les conditions spécifiques d'application de ce texte..."
              value={formData.conditions}
              onChange={(e) => handleInputChange("conditions", e.target.value)}
              rows={4}
            />
          </div>

          {/* Exceptions */}
          <div className="space-y-2">
            <Label>Exceptions et dérogations</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Ajouter une exception..."
                value={newException}
                onChange={(e) => setNewException(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addException())}
              />
              <Button type="button" variant="outline" onClick={addException}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {formData.exceptions.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.exceptions.map((exception: string) => (
                  <Badge key={exception} className="bg-orange-100 text-orange-800">
                    {exception}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-4 w-4 p-0"
                      onClick={() => removeException(exception)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Sanctions */}
          <div className="space-y-2">
            <Label htmlFor="sanctions">Sanctions et pénalités</Label>
            <Textarea
              id="sanctions"
              placeholder="Décrivez les sanctions prévues en cas de non-respect..."
              value={formData.sanctions}
              onChange={(e) => handleInputChange("sanctions", e.target.value)}
              rows={3}
            />
          </div>

          {/* Implementation Measures */}
          <div className="space-y-2">
            <Label htmlFor="implementationMeasures">Mesures d'application</Label>
            <Textarea
              id="implementationMeasures"
              placeholder="Décrivez les mesures nécessaires à la mise en œuvre..."
              value={formData.implementationMeasures}
              onChange={(e) => handleInputChange("implementationMeasures", e.target.value)}
              rows={3}
            />
          </div>

          {/* Responsible Authorities */}
          <div className="space-y-2">
            <Label>Autorités responsables</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Ajouter une autorité..."
                value={newAuthority}
                onChange={(e) => setNewAuthority(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAuthority())}
              />
              <Button type="button" variant="outline" onClick={addAuthority}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Suggested Authorities */}
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">Autorités fréquentes :</Label>
              <div className="flex flex-wrap gap-1">
                {suggestedAuthorities.map((authority) => (
                  <Badge
                    key={authority}
                    variant="outline"
                    className="cursor-pointer hover:bg-blue-50"
                    onClick={() => {
                      if (!formData.responsibleAuthorities.includes(authority)) {
                        handleInputChange("responsibleAuthorities", [...formData.responsibleAuthorities, authority]);
                      }
                    }}
                  >
                    {authority}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Current Authorities */}
            {formData.responsibleAuthorities.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.responsibleAuthorities.map((authority: string) => (
                  <Badge key={authority} className="bg-blue-100 text-blue-800">
                    {authority}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-4 w-4 p-0"
                      onClick={() => removeAuthority(authority)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
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