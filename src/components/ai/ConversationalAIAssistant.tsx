
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Send, Bot, User, Mic, MicOff, FileText, Lightbulb, Brain, Shield, TrendingUp, Zap } from 'lucide-react';
import { SmartAutocomplete } from '@/components/common/SmartAutocomplete';
import { useAdvancedAI, LegalEntity, RiskAssessment, PredictiveAnalysis, SentimentAnalysis } from '@/hooks/useAdvancedAI';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  metadata?: {
    confidence?: number;
    sources?: string[];
    suggestions?: string[];
    legalEntities?: LegalEntity[];
    riskAssessment?: RiskAssessment;
    predictiveAnalysis?: PredictiveAnalysis;
    sentimentAnalysis?: SentimentAnalysis;
  };
}

export function ConversationalAIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [activeAnalysisTab, setActiveAnalysisTab] = useState('entities');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { extractLegalEntities, assessRisk, predictOutcome, analyzeSentiment, isAnalyzing } = useAdvancedAI();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    // Analyse avancée avec les nouvelles fonctionnalités
    try {
      const [entities, risk, prediction, sentiment] = await Promise.all([
        extractLegalEntities(currentInput),
        assessRisk(currentInput),
        predictOutcome(currentInput),
        analyzeSentiment(currentInput)
      ]);

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(currentInput),
        timestamp: new Date(),
        metadata: {
          confidence: 0.92,
          sources: ['Code civil', 'Jurisprudence CE 2023'],
          suggestions: [
            'Voulez-vous en savoir plus sur les exceptions ?',
            'Consulter la jurisprudence récente ?',
            'Voir des cas similaires ?'
          ],
          legalEntities: entities,
          riskAssessment: risk,
          predictiveAnalysis: prediction,
          sentimentAnalysis: sentiment
        }
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Erreur lors de l\'analyse avancée:', error);
      // Fallback à la réponse simple
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(currentInput),
        timestamp: new Date(),
        metadata: {
          confidence: 0.92,
          sources: ['Code civil', 'Jurisprudence CE 2023'],
          suggestions: [
            'Voulez-vous en savoir plus sur les exceptions ?',
            'Consulter la jurisprudence récente ?',
            'Voir des cas similaires ?'
          ]
        }
      };
      setMessages(prev => [...prev, aiResponse]);
    }
    
    setIsLoading(false);
  };

  const generateAIResponse = (question: string): string => {
    if (question.toLowerCase().includes('contrat')) {
      return "Concernant les contrats, selon l'article 1101 du Code civil, \"Le contrat est un accord de volontés entre deux ou plusieurs personnes destiné à créer, modifier, transmettre ou éteindre des obligations.\" Les éléments essentiels sont le consentement, la capacité, et un objet certain et licite.";
    }
    if (question.toLowerCase().includes('responsabilité')) {
      return "La responsabilité civile est régie par les articles 1240 et suivants du Code civil. Elle peut être contractuelle ou délictuelle. Pour engager la responsabilité, il faut prouver trois éléments : un fait générateur (faute, fait des choses, fait d'autrui), un dommage, et un lien de causalité.";
    }
    return "Je comprends votre question juridique. Basé sur l'analyse des textes en vigueur et de la jurisprudence récente, voici les éléments pertinents à considérer...";
  };

  const startVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'fr-FR';
      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.start();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-blue-600" />
            Assistant IA Juridique
            <Badge variant="secondary" className="ml-2">Version Beta</Badge>
          </CardTitle>
          <p className="text-sm text-gray-600">
            Posez vos questions juridiques en langage naturel
          </p>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-96">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium mb-2">Commencez une conversation</h3>
                <p className="text-gray-600 mb-4">
                  Exemples de questions :
                </p>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInput("Quelles sont les conditions de validité d'un contrat ?")}
                  >
                    Validité des contrats
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInput("Comment engager la responsabilité civile ?")}
                  >
                    Responsabilité civile
                  </Button>
                </div>
              </div>
            )}

            {messages.map((message) => (
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
                  <div className="flex items-start gap-2">
                    {message.type === 'ai' && <Bot className="w-4 h-4 mt-1 flex-shrink-0" />}
                    {message.type === 'user' && <User className="w-4 h-4 mt-1 flex-shrink-0" />}
                    <div className="flex-1">
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      {message.metadata && (
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center gap-2 text-xs opacity-75">
                            <span>Confiance: {Math.round(message.metadata.confidence! * 100)}%</span>
                            {message.metadata.sources && (
                              <span>Sources: {message.metadata.sources.join(', ')}</span>
                            )}
                          </div>
                          {message.metadata.suggestions && (
                            <div className="space-y-1">
                              {message.metadata.suggestions.map((suggestion, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  size="sm"
                                  className="w-full text-left justify-start text-xs bg-white hover:bg-gray-50"
                                  onClick={() => setInput(suggestion)}
                                >
                                  <Lightbulb className="w-3 h-3 mr-2" />
                                  {suggestion}
                                </Button>
                              ))}
                            </div>
                          )}
                          
                          {/* Nouvelle section d'analyse avancée */}
                          {(message.metadata.legalEntities || message.metadata.riskAssessment || 
                            message.metadata.predictiveAnalysis || message.metadata.sentimentAnalysis) && (
                            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                              <h4 className="text-xs font-semibold mb-2 flex items-center gap-1">
                                <Brain className="w-3 h-3" />
                                Analyse IA Avancée
                              </h4>
                              
                              <Tabs value={activeAnalysisTab} onValueChange={setActiveAnalysisTab} className="w-full">
                                <TabsList className="grid w-full grid-cols-4 h-6">
                                  <TabsTrigger value="entities" className="text-xs py-1">
                                    <Zap className="w-2 h-2 mr-1" />
                                    Entités
                                  </TabsTrigger>
                                  <TabsTrigger value="risk" className="text-xs py-1">
                                    <Shield className="w-2 h-2 mr-1" />
                                    Risque
                                  </TabsTrigger>
                                  <TabsTrigger value="prediction" className="text-xs py-1">
                                    <TrendingUp className="w-2 h-2 mr-1" />
                                    Prédiction
                                  </TabsTrigger>
                                  <TabsTrigger value="sentiment" className="text-xs py-1">
                                    <Brain className="w-2 h-2 mr-1" />
                                    Sentiment
                                  </TabsTrigger>
                                </TabsList>
                                
                                <TabsContent value="entities" className="mt-2">
                                  {message.metadata.legalEntities && message.metadata.legalEntities.length > 0 ? (
                                    <div className="space-y-1">
                                      {message.metadata.legalEntities.map((entity, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-xs">
                                          <Badge variant="outline" className="text-xs py-0">
                                            {entity.type === 'legal_reference' ? 'Référence' :
                                             entity.type === 'date' ? 'Date' :
                                             entity.type === 'amount' ? 'Montant' :
                                             entity.type === 'person' ? 'Personne' :
                                             entity.type === 'company' ? 'Société' : 'Juridiction'}
                                          </Badge>
                                          <span className="font-medium">{entity.value}</span>
                                          <span className="text-gray-500">({Math.round(entity.confidence * 100)}%)</span>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-xs text-gray-500">Aucune entité détectée</p>
                                  )}
                                </TabsContent>
                                
                                <TabsContent value="risk" className="mt-2">
                                  {message.metadata.riskAssessment && (
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2">
                                        <Badge className={`text-xs ${
                                          message.metadata.riskAssessment.riskLevel === 'critical' ? 'bg-red-500' :
                                          message.metadata.riskAssessment.riskLevel === 'high' ? 'bg-orange-500' :
                                          message.metadata.riskAssessment.riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                                        }`}>
                                          {message.metadata.riskAssessment.riskLevel.toUpperCase()}
                                        </Badge>
                                        <span className="text-xs">{Math.round(message.metadata.riskAssessment.score * 100)}% de risque</span>
                                      </div>
                                      {message.metadata.riskAssessment.recommendations.map((rec, idx) => (
                                        <p key={idx} className="text-xs text-gray-700">• {rec}</p>
                                      ))}
                                    </div>
                                  )}
                                </TabsContent>
                                
                                <TabsContent value="prediction" className="mt-2">
                                  {message.metadata.predictiveAnalysis && (
                                    <div className="space-y-2">
                                      <div className="text-xs">
                                        <span className="font-medium">{message.metadata.predictiveAnalysis.outcome}</span>
                                        <span className="text-gray-500 ml-2">({Math.round(message.metadata.predictiveAnalysis.probability * 100)}%)</span>
                                      </div>
                                      {message.metadata.predictiveAnalysis.reasoning.map((reason, idx) => (
                                        <p key={idx} className="text-xs text-gray-700">• {reason}</p>
                                      ))}
                                    </div>
                                  )}
                                </TabsContent>
                                
                                <TabsContent value="sentiment" className="mt-2">
                                  {message.metadata.sentimentAnalysis && (
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2">
                                        <Badge className={`text-xs ${
                                          message.metadata.sentimentAnalysis.sentiment === 'positive' ? 'bg-green-500' :
                                          message.metadata.sentimentAnalysis.sentiment === 'negative' ? 'bg-red-500' : 'bg-gray-500'
                                        }`}>
                                          {message.metadata.sentimentAnalysis.sentiment.toUpperCase()}
                                        </Badge>
                                        <span className="text-xs">{Math.round(message.metadata.sentimentAnalysis.confidence * 100)}% de confiance</span>
                                      </div>
                                      {message.metadata.sentimentAnalysis.keyPoints.map((point, idx) => (
                                        <p key={idx} className="text-xs text-gray-700">• {point}</p>
                                      ))}
                                    </div>
                                  )}
                                </TabsContent>
                              </Tabs>
                            </div>
                          )}
                        </div>
                      )}
                      <div className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 animate-pulse" />
                    <span className="text-sm">L'IA analyse votre question...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2">
            <SmartAutocomplete
              value={input}
              onChange={setInput}
              placeholder="Posez votre question juridique..."
              context="legal"
              className="flex-1"
              onKeyPress={handleKeyPress}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={startVoiceRecognition}
              disabled={isListening}
            >
              {isListening ? (
                <MicOff className="w-4 h-4 animate-pulse text-red-500" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </Button>
            <Button onClick={handleSendMessage} disabled={isLoading || isAnalyzing || !input.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
