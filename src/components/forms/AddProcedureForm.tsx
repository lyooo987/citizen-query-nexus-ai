import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface AddProcedureFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddProcedureForm({ isOpen, onClose }: AddProcedureFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    procedureType: '',
    name: '',
    description: '',
    sectorAdministration: '',
    steps: '',
    serviceConditions: '',
    requiredDocuments: '',
    requiredDocumentsType: 'text',
    additionalDocuments: '',
    additionalDocumentsType: 'text',
    targetCategory: '',
    submissionLocation: '',
    validityType: 'periodic',
    validityStartDate: '',
    validityEndDate: '',
    processingDuration: '',
    feeType: 'gratuit',
    feeAmount: '',
    digitization: false,
    digitizationDate: '',
    electronicPortalLink: '',
    mobileAppLink: '',
    thirdPartySubmission: false,
    withdrawalTime: '',
    withdrawalMethod: '',
    documentValidity: '',
    hasAppeal: false,
    appealLocation: '',
    appealDeadline: '',
    appealFees: '',
    legalAnchor: '',
    userGuide: '',
    downloadableForm: '',
    faq: '',
    contactAddress: '',
    contactPhone: '',
    contactGreenNumber: '',
    contactEmail: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nouvelle procédure administrative:', formData);
    toast({
      title: "Procédure ajoutée",
      description: `La procédure "${formData.name}" a été ajoutée avec succès.`,
    });
    onClose();
    // Reset form
    setFormData({
      procedureType: '',
      name: '',
      description: '',
      sectorAdministration: '',
      steps: '',
      serviceConditions: '',
      requiredDocuments: '',
      requiredDocumentsType: 'text',
      additionalDocuments: '',
      additionalDocumentsType: 'text',
      targetCategory: '',
      submissionLocation: '',
      validityType: 'periodic',
      validityStartDate: '',
      validityEndDate: '',
      processingDuration: '',
      feeType: 'gratuit',
      feeAmount: '',
      digitization: false,
      digitizationDate: '',
      electronicPortalLink: '',
      mobileAppLink: '',
      thirdPartySubmission: false,
      withdrawalTime: '',
      withdrawalMethod: '',
      documentValidity: '',
      hasAppeal: false,
      appealLocation: '',
      appealDeadline: '',
      appealFees: '',
      legalAnchor: '',
      userGuide: '',
      downloadableForm: '',
      faq: '',
      contactAddress: '',
      contactPhone: '',
      contactGreenNumber: '',
      contactEmail: ''
    });
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle procédure administrative</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations de base */}
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="procedureType">Type de procédure</Label>
                  <Input
                    id="procedureType"
                    value={formData.procedureType}
                    onChange={(e) => updateField('procedureType', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="name">Nom de la procédure</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="sectorAdministration">Secteur et/ou administration</Label>
                <Input
                  id="sectorAdministration"
                  value={formData.sectorAdministration}
                  onChange={(e) => updateField('sectorAdministration', e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Détails de la procédure */}
          <Card>
            <CardHeader>
              <CardTitle>Détails de la procédure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="steps">Étapes (avec démonstration si disponible)</Label>
                <Textarea
                  id="steps"
                  value={formData.steps}
                  onChange={(e) => updateField('steps', e.target.value)}
                  rows={3}
                  placeholder="Décrire les étapes de la procédure..."
                />
              </div>

              <div>
                <Label htmlFor="serviceConditions">Conditions d'utilisation du service</Label>
                <Textarea
                  id="serviceConditions"
                  value={formData.serviceConditions}
                  onChange={(e) => updateField('serviceConditions', e.target.value)}
                  rows={3}
                  placeholder="Conditions d'utilisation..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Documents requis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Documents demandés</Label>
                <RadioGroup
                  value={formData.requiredDocumentsType}
                  onValueChange={(value) => updateField('requiredDocumentsType', value)}
                  className="mb-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="existing" id="existing-docs" />
                    <Label htmlFor="existing-docs">Sélection pour les procédures existantes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="text" id="new-docs" />
                    <Label htmlFor="new-docs">Texte pour les nouveaux</Label>
                  </div>
                </RadioGroup>
                <Textarea
                  value={formData.requiredDocuments}
                  onChange={(e) => updateField('requiredDocuments', e.target.value)}
                  rows={3}
                  placeholder="Lister les documents requis..."
                />
              </div>

              <div>
                <Label>Documents Complémentaires (si nécessaire après validation)</Label>
                <RadioGroup
                  value={formData.additionalDocumentsType}
                  onValueChange={(value) => updateField('additionalDocumentsType', value)}
                  className="mb-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="existing" id="existing-additional" />
                    <Label htmlFor="existing-additional">Sélection pour les procédures existantes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="text" id="new-additional" />
                    <Label htmlFor="new-additional">Texte pour les nouveaux</Label>
                  </div>
                </RadioGroup>
                <Textarea
                  value={formData.additionalDocuments}
                  onChange={(e) => updateField('additionalDocuments', e.target.value)}
                  rows={3}
                  placeholder="Documents complémentaires..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Modalités */}
          <Card>
            <CardHeader>
              <CardTitle>Modalités de la procédure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="targetCategory">Catégorie Ciblée</Label>
                <Select onValueChange={(value) => updateField('targetCategory', value)} value={formData.targetCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner la catégorie ciblée" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="citoyen">Citoyen</SelectItem>
                    <SelectItem value="administration">Administration</SelectItem>
                    <SelectItem value="entreprises">Entreprises</SelectItem>
                    <SelectItem value="investisseur">Investisseur</SelectItem>
                    <SelectItem value="associations">Associations</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="submissionLocation">Où déposer le dossier - Administration concernée</Label>
                <Input
                  id="submissionLocation"
                  value={formData.submissionLocation}
                  onChange={(e) => updateField('submissionLocation', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label>Validité de la procédure</Label>
                <RadioGroup
                  value={formData.validityType}
                  onValueChange={(value) => updateField('validityType', value)}
                  className="mb-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="periodic" id="periodic" />
                    <Label htmlFor="periodic">Périodique</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="open" id="open" />
                    <Label htmlFor="open">Ouverte</Label>
                  </div>
                </RadioGroup>
                {formData.validityType === 'periodic' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="validityStartDate">Du</Label>
                      <Input
                        id="validityStartDate"
                        type="date"
                        value={formData.validityStartDate}
                        onChange={(e) => updateField('validityStartDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="validityEndDate">Au</Label>
                      <Input
                        id="validityEndDate"
                        type="date"
                        value={formData.validityEndDate}
                        onChange={(e) => updateField('validityEndDate', e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="processingDuration">Durée du traitement (jours)</Label>
                  <Input
                    id="processingDuration"
                    type="number"
                    value={formData.processingDuration}
                    onChange={(e) => updateField('processingDuration', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>Frais</Label>
                  <RadioGroup
                    value={formData.feeType}
                    onValueChange={(value) => updateField('feeType', value)}
                    className="mb-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="gratuit" id="gratuit" />
                      <Label htmlFor="gratuit">Gratuit</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="payant" id="payant" />
                      <Label htmlFor="payant">Payant</Label>
                    </div>
                  </RadioGroup>
                  {formData.feeType === 'payant' && (
                    <Input
                      placeholder="Montant en DA"
                      value={formData.feeAmount}
                      onChange={(e) => updateField('feeAmount', e.target.value)}
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Numérisation */}
          <Card>
            <CardHeader>
              <CardTitle>Numérisation de la procédure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="digitization"
                  checked={formData.digitization}
                  onCheckedChange={(checked) => updateField('digitization', checked)}
                />
                <Label htmlFor="digitization">Numérisation de la procédure</Label>
              </div>

              {formData.digitization && (
                <div className="space-y-4 pl-6 border-l-2 border-muted">
                  <div>
                    <Label htmlFor="digitizationDate">Date de la numérisation</Label>
                    <Input
                      id="digitizationDate"
                      type="date"
                      value={formData.digitizationDate}
                      onChange={(e) => updateField('digitizationDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="electronicPortalLink">Lien du portail électronique</Label>
                    <Input
                      id="electronicPortalLink"
                      type="url"
                      value={formData.electronicPortalLink}
                      onChange={(e) => updateField('electronicPortalLink', e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="mobileAppLink">Lien de l'application mobile (si elle existe)</Label>
                    <Input
                      id="mobileAppLink"
                      type="url"
                      value={formData.mobileAppLink}
                      onChange={(e) => updateField('mobileAppLink', e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Modalités de retrait */}
          <Card>
            <CardHeader>
              <CardTitle>Modalités de retrait et validité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="thirdPartySubmission"
                  checked={formData.thirdPartySubmission}
                  onCheckedChange={(checked) => updateField('thirdPartySubmission', checked)}
                />
                <Label htmlFor="thirdPartySubmission">Dépôt par une tierce personne</Label>
              </div>

              <div>
                <Label htmlFor="withdrawalTime">Quand retirer l'acte ou le service administratif demandé</Label>
                <Input
                  id="withdrawalTime"
                  value={formData.withdrawalTime}
                  onChange={(e) => updateField('withdrawalTime', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="withdrawalMethod">Comment retirer l'acte ou le service administratif demandé</Label>
                <Textarea
                  id="withdrawalMethod"
                  value={formData.withdrawalMethod}
                  onChange={(e) => updateField('withdrawalMethod', e.target.value)}
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="documentValidity">Validité de l'acte ou du service administratif demandé</Label>
                <Input
                  id="documentValidity"
                  value={formData.documentValidity}
                  onChange={(e) => updateField('documentValidity', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Recours */}
          <Card>
            <CardHeader>
              <CardTitle>Recours</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="hasAppeal"
                  checked={formData.hasAppeal}
                  onCheckedChange={(checked) => updateField('hasAppeal', checked)}
                />
                <Label htmlFor="hasAppeal">Recours disponible</Label>
              </div>

              {formData.hasAppeal && (
                <div className="space-y-4 pl-6 border-l-2 border-muted">
                  <div>
                    <Label htmlFor="appealLocation">Où déposer</Label>
                    <Input
                      id="appealLocation"
                      value={formData.appealLocation}
                      onChange={(e) => updateField('appealLocation', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="appealDeadline">Les délais</Label>
                    <Input
                      id="appealDeadline"
                      value={formData.appealDeadline}
                      onChange={(e) => updateField('appealDeadline', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="appealFees">Les frais</Label>
                    <Input
                      id="appealFees"
                      value={formData.appealFees}
                      onChange={(e) => updateField('appealFees', e.target.value)}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Informations complémentaires */}
          <Card>
            <CardHeader>
              <CardTitle>Informations complémentaires</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="legalAnchor">Ancrage juridique</Label>
                <Textarea
                  id="legalAnchor"
                  value={formData.legalAnchor}
                  onChange={(e) => updateField('legalAnchor', e.target.value)}
                  rows={3}
                  placeholder="Références légales et réglementaires..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="userGuide">Guide d'utilisation à télécharger</Label>
                  <Input
                    id="userGuide"
                    value={formData.userGuide}
                    onChange={(e) => updateField('userGuide', e.target.value)}
                    placeholder="Lien vers le guide..."
                  />
                </div>
                <div>
                  <Label htmlFor="downloadableForm">Formulaire à télécharger</Label>
                  <Input
                    id="downloadableForm"
                    value={formData.downloadableForm}
                    onChange={(e) => updateField('downloadableForm', e.target.value)}
                    placeholder="Lien vers le formulaire..."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="faq">Questions fréquemment posées</Label>
                <Textarea
                  id="faq"
                  value={formData.faq}
                  onChange={(e) => updateField('faq', e.target.value)}
                  rows={3}
                  placeholder="FAQ sur la procédure..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contactAddress">Adresse</Label>
                <Textarea
                  id="contactAddress"
                  value={formData.contactAddress}
                  onChange={(e) => updateField('contactAddress', e.target.value)}
                  rows={2}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactPhone">N° Téléphone</Label>
                  <Input
                    id="contactPhone"
                    value={formData.contactPhone}
                    onChange={(e) => updateField('contactPhone', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="contactGreenNumber">N° Vert</Label>
                  <Input
                    id="contactGreenNumber"
                    value={formData.contactGreenNumber}
                    onChange={(e) => updateField('contactGreenNumber', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="contactEmail">E-mail</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => updateField('contactEmail', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2 pt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Ajouter la procédure administrative
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}