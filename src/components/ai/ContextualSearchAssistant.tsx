
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Brain, Search, Lightbulb, HelpCircle, ArrowRight } from 'lucide-react';
import { SmartAutocomplete } from '@/components/common/SmartAutocomplete';

interface SearchContext {
  userIntent: string;
  suggestedQueries: string[];
  relatedTopics: string[];
  contextualTips: string[];
  confidenceScore: number;
}

interface ConversationMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  searchResults?: number;
  suggestions?: string[];
}

export function ContextualSearchAssistant() {
  const [query, setQuery] = useState('');
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [searchContext, setSearchContext] = useState<SearchContext | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeSearchIntent = async (userQuery: string) => {
    setIsAnalyzing(true);
    
    // Simulation d'analyse contextuelle
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const contexts: Record<string, SearchContext> = {
      'création entreprise': {
        userIntent: 'Procédures de création d\'entreprise',
        suggestedQueries: [
          'Quels documents pour créer une SARL ?',
          'Délais de création d\'une entreprise individuelle',
          'Coût de création d\'une SAS',
          'Procédure d\'immatriculation au registre du commerce'
        ],
        relatedTopics: ['Statuts juridiques', 'Capital social', 'Registre du commerce', 'CFE'],
        contextualTips: [
          'Pensez à choisir le statut juridique adapté à votre activité',
          'Vérifiez la disponibilité de votre dénomination sociale',
          'Préparez tous les documents requis avant de commencer'
        ],
        confidenceScore: 0.92
      },
      'permis construire': {
        userIntent: 'Procédures d\'urbanisme et permis de construire',
        suggestedQueries: [
          'Surface nécessitant un permis de construire',
          'Délai d\'instruction d\'un permis de construire',
          'Recours contre un refus de permis',
          'Modificatif d\'un permis accordé'
        ],
        relatedTopics: ['PLU', 'Règles d\'urbanisme', 'Déclaration préalable', 'Certificat d\'urbanisme'],
        contextualTips: [
          'Consultez le PLU de votre commune avant de déposer',
          'Un architecte est obligatoire au-delà de 150m²',
          'Respectez les délais de recours des tiers'
        ],
        confidenceScore: 0.88
      },
      'marché public': {
        userIntent: 'Réglementation des marchés publics',
        suggestedQueries: [
          'Seuils des marchés publics 2024',
          'Procédure d\'appel d\'offres ouvert',
          'Critères d\'attribution d\'un marché',
          'Recours en référé pré-contractuel'
        ],
        relatedTopics: ['Code des marchés publics', 'BOAMP', 'Mémoire technique', 'Caution'],
        contextualTips: [
          'Vérifiez les seuils européens pour les procédures',
          'Préparez soigneusement votre mémoire technique',
          'Respectez impérativement les délais de remise'
        ],
        confidenceScore: 0.85
      }
    };

    const matchedContext = Object.keys(contexts).find(key => 
      userQuery.toLowerCase().includes(key.toLowerCase())
    );

    const context = matchedContext ? contexts[matchedContext] : {
      userIntent: 'Recherche juridique générale',
      suggestedQueries: [
        'Puis-je reformuler votre question ?',
        'Dans quel domaine juridique recherchez-vous ?',
        'Avez-vous une situation particulière ?'
      ],
      relatedTopics: ['Droit administratif', 'Droit civil', 'Droit des affaires'],
      contextualTips: [
        'Soyez précis dans votre demande pour de meilleurs résultats',
        'Mentionnez le contexte de votre situation'
      ],
      confidenceScore: 0.45
    };

    setSearchContext(context);
    setIsAnalyzing(false);

    // Ajouter la réponse de l'assistant
    const assistantMessage: ConversationMessage = {
      id: Date.now().toString(),
      type: 'assistant',
      content: `J'ai analysé votre demande et je pense que vous recherchez des informations sur : **${context.userIntent}**\n\nVoici ce que je peux vous suggérer :`,
      timestamp: new Date(),
      suggestions: context.suggestedQueries
    };

    setConversation(prev => [...prev, assistantMessage]);
  };

  const handleSendMessage = async () => {
    if (!query.trim()) return;

    // Ajouter le message utilisateur
    const userMessage: ConversationMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: query,
      timestamp: new Date()
    };

    setConversation(prev => [...prev, userMessage]);
    
    // Analyser l'intention
    await analyzeSearchIntent(query);
    
    setQuery('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-blue-600" />
            Assistant de Recherche Contextuel
          </CardTitle>
          <p className="text-gray-600">
            Décrivez votre situation en langage naturel, l'IA comprendra votre contexte et vous guidera
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <SmartAutocomplete
                value={query}
                onChange={setQuery}
                placeholder="Décrivez votre situation ou posez votre question..."
                context="legal"
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={isAnalyzing || !query.trim()}
              >
                {isAnalyzing ? (
                  <Brain className="w-4 h-4 animate-pulse" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </Button>
            </div>

            {conversation.length === 0 && (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium mb-2">Posez votre question</h3>
                <p className="text-gray-600 mb-4">
                  Exemples : "Je veux créer une entreprise", "Comment obtenir un permis de construire ?"
                </p>
                <div className="flex gap-2 justify-center flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuery("Je veux créer une SARL, quelles sont les étapes ?")}
                  >
                    Création d'entreprise
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuery("Comment déposer un permis de construire ?")}
                  >
                    Permis de construire
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuery("Seuils des marchés publics en 2024")}
                  >
                    Marchés publics
                  </Button>
                </div>
              </div>
            )}

            {conversation.length > 0 && (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {conversation.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      {message.suggestions && (
                        <div className="mt-3 space-y-2">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="w-full text-left justify-start text-xs bg-white hover:bg-gray-50"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              <HelpCircle className="w-3 h-3 mr-2" />
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                      <div className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {searchContext && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              Analyse Contextuelle
              <Badge className="ml-2">
                {Math.round(searchContext.confidenceScore * 100)}% de confiance
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="suggestions" className="w-full">
              <TabsList>
                <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                <TabsTrigger value="topics">Sujets liés</TabsTrigger>
                <TabsTrigger value="tips">Conseils</TabsTrigger>
              </TabsList>

              <TabsContent value="suggestions" className="mt-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Questions suggérées :</h4>
                  {searchContext.suggestedQueries.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left justify-start"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <Search className="w-4 h-4 mr-2" />
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="topics" className="mt-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Sujets connexes :</h4>
                  <div className="flex gap-2 flex-wrap">
                    {searchContext.relatedTopics.map((topic, index) => (
                      <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-gray-200">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tips" className="mt-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Conseils contextuels :</h4>
                  {searchContext.contextualTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
                      <Lightbulb className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{tip}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
