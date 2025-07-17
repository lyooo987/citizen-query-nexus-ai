
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { LegalTextFormHeader } from './legal/LegalTextFormHeader';
import { LegalTextFormInputMethodSelector } from './legal/LegalTextFormInputMethodSelector';
import { LegalTextFormOCRSection } from './legal/LegalTextFormOCRSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FileText, Save, ArrowLeft, Wand2 } from 'lucide-react';
import { getLegalTextTemplate, ALL_LEGAL_TEXT_TEMPLATES } from '@/data/legalTextTemplates';
import { LegalTextDynamicFieldRenderer } from './legal/LegalTextDynamicFieldRenderer';
import { useNomenclatureData } from '@/hooks/useNomenclatureData';

interface LegalTextFormEnhancedProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialOCRText?: string;
  initialInputMethod?: 'manual' | 'ocr';
}

export function LegalTextFormEnhanced({ 
  onClose, 
  onSubmit, 
  initialOCRText,
  initialInputMethod = 'manual'
}: LegalTextFormEnhancedProps) {
  const { toast } = useToast();
  const { nomenclatureData, mapOCRDataToForm } = useNomenclatureData();
  const [inputMethod, setInputMethod] = useState<'manual' | 'ocr'>(initialInputMethod);
  const [showOCRScanner, setShowOCRScanner] = useState(false);
  const [selectedTextType, setSelectedTextType] = useState<string>('');
  const [formData, setFormData] = useState<any>({});

  const handleOCRFormDataExtracted = (data: { documentType: 'legal' | 'procedure', formData: Record<string, any> }) => {
    console.log('🎯 [LegalTextForm] Réception des données OCR:', data);
    console.log('📋 [LegalTextForm] Nombre de champs reçus:', Object.keys(data.formData).length);
    
    // Mapper et distribuer TOUS les champs OCR vers le formulaire de texte juridique
    const mappedData: any = mapOCRDataToForm(data.formData, 'legal');
    
    // Mapper les champs spécifiques selon le type de document détecté
    const content = (data.formData.contenu || data.formData.content || '').toLowerCase();
    const title = (data.formData.titre || data.formData.title || '').toLowerCase();
    
    // Détecter automatiquement le type de texte juridique avec plus de précision
    let detectedType = 'loi'; // Type par défaut
    
    if (content.includes('décret') || title.includes('décret') || data.formData.type === 'decret-executif') {
      detectedType = 'decret-executif';
    } else if (content.includes('arrêté') || title.includes('arrêté') || data.formData.type === 'arrete-ministeriel') {
      detectedType = 'arrete-ministeriel';
    } else if (content.includes('loi') || title.includes('loi') || data.formData.type === 'loi') {
      detectedType = 'loi';
    } else if (content.includes('ordonnance') || title.includes('ordonnance') || data.formData.type === 'ordonnance') {
      detectedType = 'ordonnance';
    } else if (content.includes('circulaire') || title.includes('circulaire')) {
      detectedType = 'circulaire';
    } else if (content.includes('instruction') || title.includes('instruction')) {
      detectedType = 'instruction';
    }
    
    // Mapping intelligent des champs selon le type
    if (mappedData.reference) {
      mappedData.numero_texte = mappedData.reference;
    }
    if (mappedData.numero) {
      mappedData.numero_texte = mappedData.numero;
    }
    
    if (mappedData.date_journal || mappedData.publicationDate) {
      mappedData.date_promulgation = mappedData.date_journal || mappedData.publicationDate;
      mappedData.date_signature = mappedData.date_journal || mappedData.publicationDate;
    }
    
    if (mappedData.authority || mappedData.ministere) {
      mappedData.organisation = mappedData.authority || mappedData.ministere;
    }
    
    if (mappedData.signataire) {
      mappedData.autorite_signataire = mappedData.signataire;
    }
    
    // Distribuer le contenu dans les champs appropriés
    if (mappedData.contenu || mappedData.content) {
      const contentText = mappedData.contenu || mappedData.content;
      
      // Rechercher des articles spécifiques
      const articleMatch = contentText.match(/article\s+(?:premier|1er|1)\s*:?\s*([^\.]{50,300})/i);
      if (articleMatch && !mappedData.article_1) {
        mappedData.article_1 = articleMatch[1].trim();
      }
      
      // Rechercher des considérants
      const considerantMatch = contentText.match(/considérant\s+(?:que\s+)?([^\.]{50,200})/i);
      if (considerantMatch && !mappedData.considerants) {
        mappedData.considerants = considerantMatch[1].trim();
      }
      
      // Rechercher les dispositions finales
      const finalMatch = contentText.match(/(?:article\s+(?:final|dernier)|dispositions?\s+finales?)\s*:?\s*([^\.]{30,200})/i);
      if (finalMatch && !mappedData.dispositions_finales) {
        mappedData.dispositions_finales = finalMatch[1].trim();
      }
      
      // Si le contenu est très long, le raccourcir pour certains champs
      if (!mappedData.objet && contentText.length > 100) {
        const firstSentence = contentText.split('.')[0];
        if (firstSentence.length > 20 && firstSentence.length < 200) {
          mappedData.objet = firstSentence.trim();
        }
      }
      
      // Assurer que le contenu est présent
      mappedData.content = contentText;
    }
    
    // Assurer la correspondance du titre
    if (mappedData.titre || mappedData.title) {
      mappedData.title = mappedData.titre || mappedData.title;
    }
    
    // Auto-compléter les champs manquants selon le type détecté
    if (detectedType === 'decret-executif') {
      mappedData.type_texte = 'Décret';
      mappedData.niveau_publication = 'National';
    } else if (detectedType === 'arrete-ministeriel') {
      mappedData.type_texte = 'Arrêté';
      mappedData.niveau_publication = mappedData.ministere ? 'Ministériel' : 'Local';
    } else if (detectedType === 'loi') {
      mappedData.type_texte = 'Loi';
      mappedData.niveau_publication = 'National';
    }
    
    // S'assurer que les champs obligatoires sont remplis
    if (!mappedData.statut) {
      mappedData.statut = 'Publié';
    }
    
    if (!mappedData.domaine_juridique) {
      // Détecter le domaine basé sur le contenu
      if (content.includes('commercial') || content.includes('entreprise')) {
        mappedData.domaine_juridique = 'Droit commercial';
      } else if (content.includes('civil') || content.includes('famille')) {
        mappedData.domaine_juridique = 'Droit civil';
      } else if (content.includes('pénal') || content.includes('criminel')) {
        mappedData.domaine_juridique = 'Droit pénal';
      } else if (content.includes('fiscal') || content.includes('impôt')) {
        mappedData.domaine_juridique = 'Droit fiscal';
      } else if (content.includes('administratif') || content.includes('administration')) {
        mappedData.domaine_juridique = 'Droit administratif';
      } else {
        mappedData.domaine_juridique = 'Droit administratif';
      }
    }
    
    console.log('🔄 [LegalTextForm] Données mappées finales:', mappedData);
    console.log('🎯 [LegalTextForm] Type détecté:', detectedType);
    
    // CRITICAL: Mise à jour immédiate et synchrone des états avec debugging
    console.log('🔄 [DEBUG] État actuel de formData avant mise à jour:', formData);
    console.log('🔄 [DEBUG] Données à appliquer:', mappedData);
    console.log('🔄 [DEBUG] Type sélectionné:', detectedType);
    
    setShowOCRScanner(false);
    setInputMethod('manual');
    setSelectedTextType(detectedType);
    
    // Force la mise à jour du formulaire avec useEffect pour garantir la synchronisation
    setTimeout(() => {
      setFormData(prev => {
        const newFormData = { ...prev, ...mappedData };
        console.log('🔄 [DEBUG] FormData après mise à jour:', newFormData);
        return newFormData;
      });
    }, 50);
    
    // Afficher la notification de succès
    toast({
      title: "Formulaire automatiquement rempli ✓",
      description: `Le formulaire de texte juridique (${detectedType}) a été rempli avec ${Object.keys(mappedData).length} champs identifiés.`,
    });
  };

  useEffect(() => {
    if (initialOCRText) {
      import('@/utils/ocrFormFiller').then(({ extractLegalTextData }) => {
        const extractedData = extractLegalTextData(initialOCRText);
        console.log('Pré-remplissage avec OCR:', extractedData);
        setFormData(extractedData);
      }).catch(() => {
        setFormData({ content: initialOCRText });
      });
    }
  }, [initialOCRText]);

  const handleOCRTextExtracted = (extractedText: string) => {
    console.log('Texte OCR reçu:', extractedText.substring(0, 200) + '...');
    
    import('@/utils/ocrFormFiller').then(({ extractLegalTextData }) => {
      const extractedData = extractLegalTextData(extractedText);
      console.log('Données extraites par OCR:', extractedData);
      
      // Auto-fill form based on extracted data
      setFormData(prev => ({ ...prev, ...extractedData }));
      
      // Auto-select text type if detected
      if (extractedData.type) {
        console.log('Auto-sélection du type:', extractedData.type);
        setSelectedTextType(extractedData.type);
      }
    }).catch(error => {
      console.error('Erreur lors de l\'extraction OCR:', error);
      setFormData(prev => ({ ...prev, content: extractedText }));
    });
    
    setShowOCRScanner(false);
    setInputMethod('manual');
  };

  const handleAutoFill = () => {
    const event = new CustomEvent('open-ai-autofill', {
      detail: { context: 'legal-text' }
    });
    window.dispatchEvent(event);
  };

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = { ...formData, textType: selectedTextType };
    console.log('Données finales du formulaire:', finalData);
    onSubmit(finalData);
    toast({
      title: "Texte juridique ajouté",
      description: `Le texte juridique "${selectedTextType}" a été ajouté avec succès.`,
    });
  };

  const selectedTemplate = selectedTextType ? getLegalTextTemplate(selectedTextType) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onClose} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <FileText className="w-8 h-8 text-emerald-600" />
                Ajout d'un Texte Juridique Algérien
              </h1>
              <p className="text-gray-600 mt-1">Saisie complète d'un texte juridique avec formulaire adapté</p>
            </div>
          </div>
          <Button onClick={handleAutoFill} variant="outline" className="gap-2 bg-purple-50 border-purple-200 hover:bg-purple-100">
            <Wand2 className="w-4 h-4 text-purple-600" />
            Auto-remplissage IA
          </Button>
        </div>
        
        <LegalTextFormInputMethodSelector 
          inputMethod={inputMethod}
          onInputMethodChange={setInputMethod}
        />

        {inputMethod === 'ocr' && (
          <LegalTextFormOCRSection
            showOCRScanner={showOCRScanner}
            onShowOCRScanner={setShowOCRScanner}
            onOCRFormDataExtracted={handleOCRFormDataExtracted}
          />
        )}

        {inputMethod === 'manual' && (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Sélection du type de texte juridique */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-blue-50">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  Type de Texte Juridique
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <Label htmlFor="text-type" className="text-sm font-medium text-gray-700">
                    Sélectionnez le type de texte juridique *
                  </Label>
                  <Select value={selectedTextType} onValueChange={setSelectedTextType}>
                    <SelectTrigger className="border-gray-200 focus:border-emerald-500">
                      <SelectValue placeholder="Choisir un type de texte juridique" />
                    </SelectTrigger>
                    <SelectContent>
                      {ALL_LEGAL_TEXT_TEMPLATES.map((template) => (
                        <SelectItem key={template.type} value={template.type}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Formulaire dynamique adapté au type */}
            {selectedTemplate && (
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-emerald-50">
                  <CardTitle className="text-xl text-gray-900">
                    Formulaire : {selectedTemplate.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Remplissez les champs spécifiques à ce type de texte juridique
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedTemplate.fields.map((field) => (
                      <div 
                        key={field.name} 
                        className={field.type === 'textarea' || field.type === 'dynamic-list' ? 'md:col-span-2' : ''}
                      >
                        <LegalTextDynamicFieldRenderer
                          field={field}
                          value={formData[field.name]}
                          onChange={(value) => handleFieldChange(field.name, value)}
                          formData={formData}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-6">
              <Button type="button" variant="outline" onClick={onClose} className="px-8">
                Annuler
              </Button>
              <Button 
                type="submit" 
                className="px-8 bg-emerald-600 hover:bg-emerald-700 gap-2"
                disabled={!selectedTextType}
              >
                <Save className="w-4 h-4" />
                Enregistrer le texte juridique
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
