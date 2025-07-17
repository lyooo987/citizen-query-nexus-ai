import { Dashboard } from "@/components/Dashboard";
import { LegalTextsSections } from "@/components/LegalTextsSections";
import { AdministrativeProcedures } from "@/components/AdministrativeProcedures";
import { ProceduresSections } from "@/components/ProceduresSections";
import { AnalysisReportsSections } from "@/components/AnalysisReportsSections";
import { EnhancedAssistedWritingSection } from "@/components/EnhancedAssistedWritingSection";
import { CollaborationSections } from "@/components/CollaborationSections";
import { NewsReferencesSections } from "@/components/NewsReferencesSections";
import { ConfigurationSections } from "@/components/ConfigurationSections";
import { HelpSections } from "@/components/HelpSections";
import { AISearchSection } from "@/components/AISearchSection";
import { FavoritesSection } from "@/components/FavoritesSection";
import { DataExtractionSection } from "@/components/DataExtractionSection";
import { DocumentTemplatesSection } from "@/components/DocumentTemplatesSection";
import { AdvancedSearchSection } from "@/components/AdvancedSearchSection";
import { SavedSearchesEnhanced } from "@/components/SavedSearchesEnhanced";
import { AccessibilitySettings } from "@/components/configuration/AccessibilitySettings";
import { EnhancedAccessibilitySettings } from "@/components/configuration/EnhancedAccessibilitySettings";
import { OfflineMode } from "@/components/configuration/OfflineMode";
import { SecuritySection } from "@/components/configuration/SecuritySection";
import { MobileAppSection } from "@/components/configuration/MobileAppSection";
import { ActionButtonsDemo } from "@/components/examples/ActionButtonsDemo";
import { AIAdvancedSection } from "@/components/ai/AIAdvancedSection";
import { AnalyticsDashboardsSection } from "@/components/analytics/AnalyticsDashboardsSection";

// NextGenSearchSection intégré dans les onglets de recherche
import { EnhancedAILegalAssistant } from "@/components/ai/EnhancedAILegalAssistant";
import { AILegalAssistant } from "@/components/AILegalAssistant";
import { AdminPanel } from "@/components/admin/AdminPanel";

interface ContentRendererProps {
  activeSection: string;
  language: string;
}

export function ContentRenderer({ activeSection, language }: ContentRendererProps) {
  switch (activeSection) {
    case "dashboard":
      return (
        <div className="space-y-8">
          <Dashboard language={language} />
          <div>
            <h2 className="text-2xl font-bold mb-4">Démonstration des Actions</h2>
            <ActionButtonsDemo />
          </div>
        </div>
      );
    
    // Legal Texts sections
    case "legal-catalog":
    case "legal-enrichment":
    case "legal-search":
      return <LegalTextsSections section={activeSection} language={language} />;
    
    // Administrative Procedures sections
    case "procedures-catalog":
      return <AdministrativeProcedures />;
    case "procedures-enrichment":
    case "procedures-search":
    case "procedures-resources":
      return <ProceduresSections section={activeSection} language={language} />;
    
    // Analysis & Reports sections
    case "dashboards":
    case "analysis":
    case "reports":
      return <AnalysisReportsSections section={activeSection} language={language} />;
    case "analytics-dashboards":
      return <AnalyticsDashboardsSection language={language} />;
    case "assisted-writing":
      return <EnhancedAssistedWritingSection />;
    
    // Collaboration sections
    case "forum":
    case "collaborative-workspace":
    case "shared-resources":
      return <CollaborationSections section={activeSection} language={language} />;
    
    // News & References sections
    case "news":
    case "library":
    case "dictionaries":
    case "directories":
      return <NewsReferencesSections section={activeSection} language={language} />;
    
    // Configuration sections
    case "nomenclature":
    case "complementary-resources":
    case "data-management":
    case "alerts-notifications":
    case "user-management":
    case "integrations-interoperability":
    case "performance-scalability":
      return <ConfigurationSections section={activeSection} language={language} />;
    
    // New security section
    case "security":
      return <SecuritySection language={language} />;
    
    // New mobile app section
    case "mobile-app":
      return <MobileAppSection language={language} />;
    
    // New configuration sections
    case "accessibility-settings":
      return <EnhancedAccessibilitySettings language={language} />;
    case "offline-mode":
      return <OfflineMode language={language} />;
    
    // Help sections
    case "about":
    case "contact":
    case "technical-support":
      return <HelpSections section={activeSection} language={language} />;

    // AI sections
    case "ai-assistant":
      return <EnhancedAILegalAssistant />;
    case "ai-advanced":
      return <AIAdvancedSection />;
    // ai-search désormais intégré dans les onglets de recherche
    
    // Admin section
    case "admin":
      return <AdminPanel />;
    
    // Other sections
    case "favorites":
      return <FavoritesSection />;
    case "data-extraction":
      return <DataExtractionSection />;
    case "document-templates":
      return <DocumentTemplatesSection />;
    case "advanced-search":
      return <AdvancedSearchSection />;
    case "saved-searches":
      return <SavedSearchesEnhanced />;
    
    
    default:
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Section en cours de développement</h3>
            <p className="text-muted-foreground">Cette fonctionnalité sera disponible prochainement.</p>
          </div>
        </div>
      );
  }
}
