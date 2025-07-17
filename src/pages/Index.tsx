
import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainNavigation } from "@/components/MainNavigation";
import { Footer } from "@/components/Footer";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";
import { GovernmentHeader } from "@/components/layout/GovernmentHeader";
import { MainHeader } from "@/components/layout/MainHeader";
import { ContentRenderer } from "@/components/layout/ContentRenderer";
import { SecurityProvider } from "@/components/security/SecurityProvider";

const VALID_SECTIONS = new Set([
  "dashboard", "legal-catalog", "legal-enrichment", "legal-search",
  "procedures-catalog", "procedures-enrichment", "procedures-search", "procedures-resources",
  "dashboards", "analytics-dashboards", "analysis", "reports", "assisted-writing",
  "forum", "collaborative-workspace", "shared-resources",
  "news", "library", "dictionaries", "directories",
  "nomenclature", "complementary-resources", "data-management", "alerts-notifications", "user-management",
  "security", "performance-scalability", "integrations-interoperability", "accessibility-settings", "offline-mode", "mobile-app",
  "about", "contact", "technical-support", "ai-search", "ai-advanced", "favorites",
  "data-extraction", "document-templates", "advanced-search", "saved-searches",
  "ai-assistant", "ai-comprehensive-test", "admin"
]);

const Index = () => {
  const { section } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(section || "dashboard");
  const [language, setLanguage] = useState("fr");

  // Sync activeSection with URL
  useEffect(() => {
    const urlSection = section || "dashboard";
    if (VALID_SECTIONS.has(urlSection) && urlSection !== activeSection) {
      setActiveSection(urlSection);
    }
  }, [section, activeSection]);

  // Navigation with browser history
  const handleSectionChange = useCallback((newSection: string) => {
    console.log('Attempting to navigate to section:', newSection);
    if (VALID_SECTIONS.has(newSection)) {
      setActiveSection(newSection);
      if (newSection === "dashboard") {
        navigate("/", { replace: false });
      } else {
        navigate(`/${newSection}`, { replace: false });
      }
      console.log('Successfully navigated to section:', newSection);
    } else {
      console.warn(`Section invalide tentée: ${newSection}`);
    }
  }, [navigate]);

  useEffect(() => {
    const handleNavigateToSection = (event: CustomEvent) => {
      console.log('Navigation event received:', event.detail);
      const targetSection = event.detail;
      
      if (typeof targetSection === 'string' && VALID_SECTIONS.has(targetSection)) {
        handleSectionChange(targetSection);
        
        // Amélioration de l'accessibilité - annoncer le changement de section
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `Navigation vers la section: ${targetSection}`;
        document.body.appendChild(announcement);
        
        // Nettoyer l'annonce après un délai
        setTimeout(() => {
          if (document.body.contains(announcement)) {
            document.body.removeChild(announcement);
          }
        }, 1000);
      } else {
        console.warn(`Section invalide reçue via événement: ${targetSection}`);
      }
    };

    window.addEventListener('navigate-to-section', handleNavigateToSection as EventListener);

    return () => {
      window.removeEventListener('navigate-to-section', handleNavigateToSection as EventListener);
    };
  }, [handleSectionChange]);

  // Gestionnaire de changement de langue mémorisé
  const handleLanguageChange = useCallback((newLanguage: string) => {
    setLanguage(newLanguage);
  }, []);

  // Props mémorisées pour éviter les re-rendus inutiles
  const headerProps = useMemo(() => ({
    language,
    activeSection,
    onLanguageChange: handleLanguageChange,
    onSectionChange: handleSectionChange
  }), [language, activeSection, handleLanguageChange, handleSectionChange]);

  const navigationProps = useMemo(() => ({
    onSectionChange: handleSectionChange,
    activeSection,
    language
  }), [handleSectionChange, activeSection, language]);

  const breadcrumbProps = useMemo(() => ({
    currentSection: activeSection,
    onSectionChange: handleSectionChange,
    language
  }), [activeSection, handleSectionChange, language]);

  return (
    <SecurityProvider>
      <div className="min-h-screen w-full algerian-green-bg flex flex-col">
        {/* Skip to main content link pour l'accessibilité */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50"
        >
          Aller au contenu principal
        </a>

        {/* Header gouvernemental */}
        <GovernmentHeader language={language} onLanguageChange={handleLanguageChange} />

        {/* Header principal */}
        <MainHeader {...headerProps} />

        {/* Menu de navigation principal - Hidden on mobile */}
        <div className="hidden md:block">
          <MainNavigation {...navigationProps} />
        </div>

        <BreadcrumbNavigation {...breadcrumbProps} />

        {/* Main Content avec landmark ARIA */}
        <main id="main-content" className="flex-grow bg-gray-50" role="main" aria-label="Contenu principal">
          <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-7xl">
            <ContentRenderer activeSection={activeSection} language={language} />
          </div>
        </main>

        {/* Footer */}
        <Footer onSectionChange={handleSectionChange} />
      </div>
    </SecurityProvider>
  );
};

export default Index;
