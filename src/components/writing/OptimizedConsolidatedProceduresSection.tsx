
import { ConsolidatedSectionLayout } from "@/components/common/ConsolidatedSectionLayout";
import { ClipboardList } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";

export function OptimizedConsolidatedProceduresSection() {
  const consolidatedProcedures = [
    {
      id: 1,
      title: "Création d'entreprise SARL - Procédure complète",
      type: "Procédure",
      category: "Commerce et Investissement",
      lastUpdate: "10 janvier 2024",
      status: "Validée",
      metrics: [
        { label: "Étapes", value: "12", color: "text-teal-600" },
        { label: "Documents", value: "8", color: "text-blue-600" },
        { label: "Délai", value: "15-30j", color: "text-purple-600" },
        { label: "Réussite", value: "92%", color: "text-green-600" }
      ]
    },
    {
      id: 2,
      title: "Demande de passeport biométrique",
      type: "Procédure", 
      category: "Documents d'identité",
      lastUpdate: "15 janvier 2024",
      status: "Validée",
      metrics: [
        { label: "Étapes", value: "6", color: "text-teal-600" },
        { label: "Documents", value: "5", color: "text-blue-600" },
        { label: "Délai", value: "7-14j", color: "text-purple-600" },
        { label: "Réussite", value: "98%", color: "text-green-600" }
      ]
    }
  ];

  const statistics = [
    { value: "48", label: "Procédures consolidées", color: "text-teal-600" },
    { value: "89%", label: "Taux de réussite moyen", color: "text-blue-600" },
    { value: "32", label: "Mises à jour ce mois", color: "text-purple-600" },
    { value: "1.8k", label: "Procédures démarrées", color: "text-orange-600" }
  ];

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Procédures administratives consolidées"
        description="Guides complets et mis à jour des procédures administratives algériennes"
        icon={ClipboardList}
        iconColor="text-teal-600"
      />
      
      <ConsolidatedSectionLayout
        title=""
        description=""
        icon={<ClipboardList className="w-8 h-8" />}
        iconColor="text-teal-600"
        searchPlaceholder="Rechercher dans les procédures consolidées..."
        items={consolidatedProcedures}
        statistics={statistics}
        onSearch={(query) => console.log('Search:', query)}
        onFilter={() => console.log('Filter clicked')}
        onItemAction={(itemId, action) => console.log('Action:', action, 'on item:', itemId)}
      />
    </div>
  );
}
