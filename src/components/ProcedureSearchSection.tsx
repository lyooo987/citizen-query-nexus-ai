
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  MapPin, 
  Bot, 
  Bookmark,
  TrendingUp,
  History
} from "lucide-react";
import { SavedSearchesEnhanced } from "./SavedSearchesEnhanced";
import { SearchCard } from "./common/SearchCard";
import { SavedItemsList } from "./common/SavedItemsList";
import { PopularItemsList } from "./common/PopularItemsList";
import { ProcedureSearchHistoryTab } from "./procedures/ProcedureSearchHistoryTab";

export function ProcedureSearchSection() {
  const searchCards = [
    {
      title: "Recherche avancée",
      description: "Outils de recherche avancée avec filtres multiples et critères spécifiques",
      icon: Search,
      buttonText: "Recherche avancée",
      buttonColor: "blue" as const,
      transparent: true
    },
    {
      title: "Recherche par Géolocalisation", 
      description: "Trouvez des procédures spécifiques à votre wilaya en Algérie",
      icon: MapPin,
      buttonText: "Recherche géolocalisée",
      buttonColor: "emerald" as const,
      transparent: true
    },
    {
      title: "Recherche Intelligente",
      description: "Recherche avancée avec traitement automatique du langage naturel et IA",
      icon: Bot,
      buttonText: "Recherche IA", 
      buttonColor: "purple" as const,
      transparent: true
    }
  ];

  const savedProcedureSearches = [
    {
      id: 1,
      title: "Passeport biométrique algérien - Consulat de France",
      date: "12 jan 2025",
      results: 45,
      category: "Identité",
      lastAccessed: "Il y a 2 jours",
      wilaya: "Alger"
    },
    {
      id: 2,
      title: "Création EURL Algérie - CNRC Oran", 
      date: "10 jan 2025",
      results: 67,
      category: "Commercial",
      lastAccessed: "Il y a 5 jours",
      wilaya: "Oran"
    },
    {
      id: 3,
      title: "Permis de conduire catégorie B - Wilaya Constantine",
      date: "8 jan 2025",
      results: 89, 
      category: "Transport",
      lastAccessed: "Il y a 1 semaine",
      wilaya: "Constantine"
    },
    {
      id: 4,
      title: "Acte de naissance - État civil Tizi Ouzou",
      date: "6 jan 2025",
      results: 34,
      category: "État civil", 
      lastAccessed: "Il y a 3 jours",
      wilaya: "Tizi Ouzou"
    }
  ];

  const popularItems = [
    {
      query: "Passeport biométrique",
      count: "15,234 recherches",
      category: "État civil", 
      wilaya: "National",
      trend: "+12%",
      description: "Nouveau passeport électronique algérien"
    },
    {
      query: "Création d'entreprise EURL",
      count: "12,567 recherches",
      category: "Commercial",
      wilaya: "Alger", 
      trend: "+18%",
      description: "Procédure simplifiée CNRC"
    },
    {
      query: "Permis de conduire",
      count: "18,901 recherches", 
      category: "Transport",
      wilaya: "National",
      trend: "+8%",
      description: "Permis biométrique catégories A, B, C"
    },
    {
      query: "Carte d'identité nationale",
      count: "22,345 recherches",
      category: "État civil",
      wilaya: "National",
      trend: "+5%", 
      description: "CIN biométrique avec puce électronique"
    },
    {
      query: "Inscription universitaire",
      count: "9,876 recherches",
      category: "Éducation",
      wilaya: "National",
      trend: "+25%",
      description: "Orientation et inscription MESRS"
    },
    {
      query: "Certificat de résidence", 
      count: "8,234 recherches",
      category: "Administration",
      wilaya: "Communal",
      trend: "+7%",
      description: "Attestation domicile APC"
    },
    {
      query: "Agrément d'importation",
      count: "7,456 recherches",
      category: "Commercial",
      wilaya: "National", 
      trend: "+22%",
      description: "Licence d'importation CNIS"
    },
    {
      query: "Certificat médical",
      count: "6,789 recherches",
      category: "Santé",
      wilaya: "National",
      trend: "+15%",
      description: "Aptitude physique et mentale"
    }
  ];

  const statistics = {
    monthlySearches: "247k",
    wilayas: "48", 
    procedures: "156",
    evolution: "+14%"
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="search" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="search" className="text-sm">
            Recherche
          </TabsTrigger>
          <TabsTrigger value="history" className="text-sm">
            Historique des recherches
          </TabsTrigger>
          <TabsTrigger value="saved-searches" className="text-sm">
            Recherches sauvegardées
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="search" className="mt-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {searchCards.map((card, index) => (
                <SearchCard key={index} {...card} />
              ))}
            </div>

            <SavedItemsList
              title="Recherches sauvegardées"
              description="Vos dernières recherches de procédures administratives algériennes"
              icon={Bookmark}
              items={savedProcedureSearches}
              onViewAll={() => {}}
            />

            <PopularItemsList
              title="Recherches populaires en Algérie"
              description="Les procédures les plus recherchées par les citoyens algériens"
              icon={TrendingUp}
              items={popularItems}
              statistics={statistics}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <ProcedureSearchHistoryTab />
        </TabsContent>
        
        <TabsContent value="saved-searches" className="mt-6">
          <SavedSearchesEnhanced />
        </TabsContent>
      </Tabs>
    </div>
  );
}
