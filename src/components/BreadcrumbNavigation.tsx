import { Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbNavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  language?: string;
}

export function BreadcrumbNavigation({ currentSection, onSectionChange, language = "fr" }: BreadcrumbNavigationProps) {
  if (currentSection === "dashboard") {
    return null; // No breadcrumb for home page
  }

  const getText = (key: string) => {
    const translations = {
      fr: {
        legalTexts: "Textes Juridiques",
        procedures: "Procédures Administratives",
        analysisReports: "Analyse & Rapports",
        collaboration: "Collaboration",
        newsReferences: "Actualités & Références",
        configuration: "Configuration",
        help: "Aide",
        
        "legal-catalog": "Catalogue des textes juridiques",
        "legal-enrichment": "Alimentation de la Banque de Données",
        "legal-search": "Recherche",
        "procedures-catalog": "Catalogue des procédures administratives",
        "procedures-enrichment": "Alimentation de la Banque de Données",
        "procedures-search": "Recherche",
        "procedures-resources": "Ressources",
        "dashboards": "Tableaux de Bord",
        "analysis": "Analyse",
        "reports": "Rapport",
        "assisted-writing": "Rédaction assistée",
        "information-sharing": "Partage d'information",
        "collaborative-workspace": "Espace de travail collaboratif",
        "user-contributions": "Contribution des utilisateurs",
        "collaboration-resources": "Ressources",
        "forum": "Forum",
        "shared-resources": "Ressources Partagées",
        "news": "Actualités & Activités juridiques",
        "library": "Bibliothèque",
        "dictionaries": "Dictionnaires",
        "directories": "Annuaires",
        "nomenclature": "Nomenclature",
        "complementary-resources": "Ressources Complémentaires",
        "data-management": "Gestion des données",
        "alerts-notifications": "Alertes & Notifications",
        "user-management": "Gestion des utilisateurs",
        "about": "À propos",
        "contact": "Contact",
        "technical-support": "Support technique"
      },
      ar: {
        legalTexts: "النصوص القانونية",
        procedures: "الإجراءات الإدارية",
        analysisReports: "التحليل والتقارير",
        collaboration: "التعاون",
        newsReferences: "الأخبار والمراجع",
        configuration: "الإعدادات",
        help: "المساعدة",
        
        "legal-catalog": "كتالوج النصوص القانونية",
        "legal-enrichment": "إثراء قاعدة البيانات",
        "legal-search": "البحث",
        "procedures-catalog": "كتالوج الإجراءات الإدارية",
        "procedures-enrichment": "إثراء قاعدة البيانات",
        "procedures-search": "البحث",
        "procedures-resources": "الموارد",
        "dashboards": "لوحات المعلومات",
        "analysis": "التحليل",
        "reports": "التقرير",
        "assisted-writing": "الكتابة المساعدة",
        "information-sharing": "مشاركة المعلومات",
        "collaborative-workspace": "مساحة العمل التعاونية",
        "user-contributions": "مساهمات المستخدمين",
        "collaboration-resources": "الموارد",
        "forum": "المنتدى",
        "shared-resources": "الموارد المشتركة",
        "news": "الأخبار والأنشطة القانونية",
        "library": "المكتبة",
        "dictionaries": "القواميس",
        "directories": "الأدلة",
        "nomenclature": "التسمية",
        "complementary-resources": "الموارد التكميلية",
        "data-management": "إدارة البيانات",
        "alerts-notifications": "التنبيهات والإشعارات",
        "user-management": "إدارة المستخدمين",
        "about": "حول",
        "contact": "اتصل بنا",
        "technical-support": "الدعم الفني"
      },
      en: {
        legalTexts: "Legal Texts",
        procedures: "Administrative Procedures",
        analysisReports: "Analysis & Reports",
        collaboration: "Collaboration",
        newsReferences: "News & References",
        configuration: "Configuration",
        help: "Help",
        
        "legal-catalog": "Legal texts catalog",
        "legal-enrichment": "Database enrichment",
        "legal-search": "Search",
        "procedures-catalog": "Administrative procedures catalog",
        "procedures-enrichment": "Database enrichment",
        "procedures-search": "Search",
        "procedures-resources": "Resources",
        "dashboards": "Dashboards",
        "analysis": "Analysis",
        "reports": "Reports",
        "assisted-writing": "Assisted writing",
        "information-sharing": "Information sharing",
        "collaborative-workspace": "Collaborative workspace",
        "user-contributions": "User contributions",
        "collaboration-resources": "Resources",
        "forum": "Forum",
        "shared-resources": "Shared Resources",
        "news": "News & Legal Activities",
        "library": "Library",
        "dictionaries": "Dictionaries",
        "directories": "Directories",
        "nomenclature": "Nomenclature",
        "complementary-resources": "Complementary resources",
        "data-management": "Data management",
        "alerts-notifications": "Alerts & Notifications",
        "user-management": "User management",
        "about": "About",
        "contact": "Contact",
        "technical-support": "Technical support"
      }
    };
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations['fr']] || key;
  };

  const getParentSection = (section: string) => {
    if (section.startsWith("legal-")) return "legalTexts";
    if (section.startsWith("procedures-")) return "procedures";
    if (["dashboards", "analysis", "reports", "assisted-writing"].includes(section)) return "analysisReports";
    if (["forum", "information-sharing", "collaborative-workspace", "user-contributions", "collaboration-resources", "shared-resources"].includes(section)) return "collaboration";
    if (["news", "library", "dictionaries", "directories"].includes(section)) return "newsReferences";
    if (["nomenclature", "complementary-resources", "data-management", "alerts-notifications", "user-management"].includes(section)) return "configuration";
    if (["about", "contact", "technical-support"].includes(section)) return "help";
    return null;
  };

  const parentSection = getParentSection(currentSection);

  return (
    <div className="bg-gray-50 border-b border-gray-200 px-4 sm:px-6 py-2">
      <div className="container mx-auto max-w-7xl">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink 
                onClick={() => onSectionChange("dashboard")}
                className="flex items-center gap-1 cursor-pointer hover:text-green-600"
              >
                <Home className="w-4 h-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            
            {parentSection && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink className="cursor-pointer hover:text-green-600">
                    {getText(parentSection)}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-green-600 font-medium">
                {getText(currentSection)}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
