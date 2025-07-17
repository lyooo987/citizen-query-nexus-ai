import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  HelpCircle, MessageSquare, Phone, Mail, Search, Plus, Filter, FileText
} from "lucide-react";
import { TechnicalSpecification } from "@/components/docs/TechnicalSpecification";
import { UserGuideSection } from "@/components/help/UserGuideSection";
import { AdminGuideSection } from "@/components/help/AdminGuideSection";
import { APIDocumentationSection } from "@/components/help/APIDocumentationSection";
import { VideoTutorialsSection } from "@/components/help/VideoTutorialsSection";

interface HelpSectionsProps {
  section: string;
  language?: string;
}

export function HelpSections({ section, language = "fr" }: HelpSectionsProps) {
  const [activeTab, setActiveTab] = useState("faq");

  const getText = (key: string) => {
    const translations = {
      fr: {
        aboutTitle: "À propos",
        aboutDesc: "Informations sur Dalil.dz",
        contactTitle: "Contact",
        contactDesc: "Nous contacter",
        supportTitle: "Support technique",
        supportDesc: "Assistance et support",
        faq: "FAQ",
        chatSupport: "Chat Support",
        helpCenter: "Centre d'aide",
        technicalSpec: "Fiche technique",
        userGuide: "Guide utilisateur",
        adminGuide: "Guide administrateur",
        apiDoc: "Documentation API",
        videoTutorials: "Tutoriels vidéo"
      },
      ar: {
        aboutTitle: "حول",
        aboutDesc: "معلومات حول Dalil.dz",
        contactTitle: "اتصل بنا",
        contactDesc: "تواصل معنا",
        supportTitle: "الدعم الفني",
        supportDesc: "المساعدة والدعم",
        faq: "الأسئلة الشائعة",
        chatSupport: "دعم المحادثة",
        helpCenter: "مركز المساعدة",
        technicalSpec: "المواصفات الفنية",
        userGuide: "دليل المستخدم",
        adminGuide: "دليل المدير",
        apiDoc: "وثائق API",
        videoTutorials: "دروس الفيديو"
      },
      en: {
        aboutTitle: "About",
        aboutDesc: "Information about Dalil.dz",
        contactTitle: "Contact",
        contactDesc: "Contact us",
        supportTitle: "Technical Support",
        supportDesc: "Assistance and support",
        faq: "FAQ",
        chatSupport: "Chat Support",
        helpCenter: "Help Center",
        technicalSpec: "Technical Specification",
        userGuide: "User Guide",
        adminGuide: "Admin Guide",
        apiDoc: "API Documentation",
        videoTutorials: "Video Tutorials"
      }
    };
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations['fr']] || key;
  };

  const getSectionContent = () => {
    switch (section) {
      case "about":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                <HelpCircle className="w-8 h-8 text-green-600" />
                {getText("aboutTitle")}
              </h2>
              <p className="text-gray-600 text-lg">{getText("aboutDesc")}</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>À propos de Dalil.dz</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Dalil.dz est la plateforme nationale de veille juridique et réglementaire de l'Algérie.
                    Elle offre un accès centralisé aux textes juridiques, procédures administratives et 
                    ressources juridiques du pays.
                  </p>
                  <p className="text-gray-600">
                    Notre mission est de faciliter l'accès à l'information juridique pour tous les 
                    professionnels du droit, les institutions et les citoyens.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                <Mail className="w-8 h-8 text-green-600" />
                {getText("contactTitle")}
              </h2>
              <p className="text-gray-600 text-lg">{getText("contactDesc")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-green-600" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">contact@dalil.dz</p>
                  <p className="text-gray-600">support@dalil.dz</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-green-600" />
                    Téléphone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">+213 21 XX XX XX</p>
                  <p className="text-gray-600">Lun-Ven: 8h-17h</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "technical-support":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                <MessageSquare className="w-8 h-8 text-green-600" />
                {getText("supportTitle")}
              </h2>
              <p className="text-gray-600 text-lg">{getText("supportDesc")}</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="faq" className="flex items-center gap-2 text-sm">
                  {getText("faq")}
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex items-center gap-2 text-sm">
                  {getText("chatSupport")}
                </TabsTrigger>
                <TabsTrigger value="help" className="flex items-center gap-2 text-sm">
                  {getText("helpCenter")}
                </TabsTrigger>
                <TabsTrigger value="user-guide" className="flex items-center gap-2 text-sm">
                  {getText("userGuide")}
                </TabsTrigger>
                <TabsTrigger value="admin-guide" className="flex items-center gap-2 text-sm">
                  {getText("adminGuide")}
                </TabsTrigger>
                <TabsTrigger value="api-doc" className="flex items-center gap-2 text-sm">
                  {getText("apiDoc")}
                </TabsTrigger>
                <TabsTrigger value="technical-doc" className="flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4" />
                  Documentation Technique
                </TabsTrigger>
              </TabsList>

              <TabsContent value="faq" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-green-600" />
                      Questions fréquemment posées
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input placeholder="Rechercher une question..." className="flex-1" />
                        <Button variant="outline">
                          <Search className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <Card className="border-l-4 border-l-green-600">
                          <CardContent className="pt-4">
                            <h4 className="font-semibold mb-2">Comment rechercher un texte juridique ?</h4>
                            <p className="text-gray-600 text-sm">
                              Utilisez la barre de recherche principale ou accédez au catalogue des textes juridiques 
                              pour une recherche avancée.
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="border-l-4 border-l-green-600">
                          <CardContent className="pt-4">
                            <h4 className="font-semibold mb-2">Comment créer un compte ?</h4>
                            <p className="text-gray-600 text-sm">
                              Cliquez sur "Créer un compte" et suivez les instructions. L'inscription est gratuite 
                              pour tous les utilisateurs.
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="chat" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-green-600" />
                      Support en ligne
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-600">Notre équipe de support est disponible pour vous aider.</p>
                      <Button className="bg-green-600 hover:bg-green-700">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Démarrer une conversation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="help" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-green-600" />
                      Centre d'aide
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-600">Consultez notre documentation complète et nos guides d'utilisation.</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline" onClick={() => setActiveTab("user-guide")}>
                          Guide utilisateur
                        </Button>
                        <Button variant="outline" onClick={() => setActiveTab("video-tutorials")}>
                          Tutoriels vidéo
                        </Button>
                        <Button variant="outline" onClick={() => setActiveTab("api-doc")}>
                          Documentation API
                        </Button>
                        <Button variant="outline" onClick={() => setActiveTab("admin-guide")}>
                          Guides administrateur
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="user-guide" className="space-y-4">
                <UserGuideSection />
              </TabsContent>

              <TabsContent value="admin-guide" className="space-y-4">
                <AdminGuideSection />
              </TabsContent>

              <TabsContent value="api-doc" className="space-y-4">
                <APIDocumentationSection />
              </TabsContent>

              <TabsContent value="video-tutorials" className="space-y-4">
                <VideoTutorialsSection />
              </TabsContent>

              <TabsContent value="technical-doc" className="space-y-4">
                <TechnicalSpecification />
              </TabsContent>
            </Tabs>
          </div>
        );

      default:
        return <div>Section non trouvée</div>;
    }
  };

  return getSectionContent();
}
