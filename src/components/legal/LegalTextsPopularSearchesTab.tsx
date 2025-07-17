import { Search, MapPin, Bot, Bookmark, TrendingUp } from "lucide-react";
import { SearchCard } from "../common/SearchCard";
import { SavedItemsList } from "../common/SavedItemsList";
import { PopularItemsList } from "../common/PopularItemsList";

export function LegalTextsPopularSearchesTab() {
  const searchCards = [
    {
      title: "Recherche avancée",
      description: "Outils de recherche avancée avec filtres par type de texte, date, autorité et domaine juridique",
      icon: Search,
      buttonText: "Recherche avancée",
      buttonColor: "blue" as const,
      transparent: true
    },
    {
      title: "Recherche par Géolocalisation", 
      description: "Trouvez des textes juridiques spécifiques à votre wilaya ou région en Algérie",
      icon: MapPin,
      buttonText: "Recherche géolocalisée",
      buttonColor: "emerald" as const,
      transparent: true
    },
    {
      title: "Recherche Intelligente",
      description: "Recherche avancée avec traitement automatique du langage naturel et analyse sémantique",
      icon: Bot,
      buttonText: "Recherche IA", 
      buttonColor: "purple" as const,
      transparent: true
    }
  ];

  const savedLegalSearches = [
    {
      id: 1,
      title: "Code civil algérien - Obligations et contrats",
      date: "12 jan 2025",
      results: 234,
      category: "Civil",
      lastAccessed: "Il y a 2 jours",
      authority: "Assemblée Populaire Nationale"
    },
    {
      id: 2,
      title: "Lois sur l'investissement - Secteur privé", 
      date: "10 jan 2025",
      results: 156,
      category: "Économique",
      lastAccessed: "Il y a 5 jours",
      authority: "Conseil des Ministres"
    },
    {
      id: 3,
      title: "Réglementation environnementale - Algérie",
      date: "8 jan 2025",
      results: 89, 
      category: "Environnement",
      lastAccessed: "Il y a 1 semaine",
      authority: "Ministère de l'Environnement"
    },
    {
      id: 4,
      title: "Code du travail - Relations collectives",
      date: "6 jan 2025",
      results: 198,
      category: "Social", 
      lastAccessed: "Il y a 3 jours",
      authority: "Ministère du Travail"
    }
  ];

  const popularItems = [
    {
      query: "Code civil algérien",
      count: "45,234 recherches",
      category: "Civil", 
      wilaya: "National",
      trend: "+12%",
      description: "Dispositions civiles et obligations"
    },
    {
      query: "Loi de finances",
      count: "38,567 recherches",
      category: "Fiscal",
      wilaya: "National", 
      trend: "+18%",
      description: "Budget et fiscalité de l'État"
    },
    {
      query: "Code pénal",
      count: "32,901 recherches", 
      category: "Pénal",
      wilaya: "National",
      trend: "+8%",
      description: "Infractions et sanctions pénales"
    },
    {
      query: "Code de commerce",
      count: "29,345 recherches",
      category: "Commercial",
      wilaya: "National",
      trend: "+15%", 
      description: "Activités commerciales et sociétés"
    },
    {
      query: "Code du travail",
      count: "25,876 recherches",
      category: "Social",
      wilaya: "National",
      trend: "+22%",
      description: "Relations de travail et emploi"
    },
    {
      query: "Code de la famille", 
      count: "23,234 recherches",
      category: "Personnel",
      wilaya: "National",
      trend: "+7%",
      description: "Statut personnel et famille"
    },
    {
      query: "Code de l'investissement",
      count: "18,456 recherches",
      category: "Économique",
      wilaya: "National", 
      trend: "+28%",
      description: "Promotion de l'investissement"
    },
    {
      query: "Code de procédure civile",
      count: "16,789 recherches",
      category: "Procédure",
      wilaya: "National",
      trend: "+11%",
      description: "Procédures judiciaires civiles"
    }
  ];

  const statistics = {
    monthlySearches: "1.2M",
    wilayas: "48", 
    procedures: "2,847",
    evolution: "+19%"
  };

  return (
    <div className="space-y-6">
      <PopularItemsList
        title="Recherches juridiques populaires"
        description="Les textes juridiques les plus consultés par les professionnels du droit"
        icon={TrendingUp}
        items={popularItems}
        statistics={statistics}
      />
    </div>
  );
}