
import { ConsolidatedSectionLayout } from "@/components/common/ConsolidatedSectionLayout";
import { BookOpen } from "lucide-react";

export function OptimizedConsolidatedTextsSection() {
  const consolidatedTexts = [
    {
      id: 1,
      title: "Code civil algérien consolidé",
      type: "Code",
      category: "Droit Civil",
      lastUpdate: "15 janvier 2024",
      status: "À jour",
      metrics: [
        { label: "Articles", value: "1200", color: "text-teal-600" },
        { label: "Modifications", value: "15", color: "text-blue-600" },
        { label: "Année", value: "2024", color: "text-purple-600" },
        { label: "Format", value: "PDF", color: "text-orange-600" }
      ]
    },
    {
      id: 2,
      title: "Code de procédure civile et administrative",
      type: "Code",
      category: "Procédure",
      lastUpdate: "08 janvier 2024",
      status: "À jour",
      metrics: [
        { label: "Articles", value: "850", color: "text-teal-600" },
        { label: "Modifications", value: "8", color: "text-blue-600" },
        { label: "Année", value: "2024", color: "text-purple-600" },
        { label: "Format", value: "PDF", color: "text-orange-600" }
      ]
    }
  ];

  const statistics = [
    { value: "24", label: "Textes consolidés", color: "text-teal-600" },
    { value: "156", label: "Mises à jour ce mois", color: "text-blue-600" },
    { value: "95%", label: "Textes à jour", color: "text-purple-600" },
    { value: "2.4k", label: "Consultations mensuelles", color: "text-orange-600" }
  ];

  return (
    <ConsolidatedSectionLayout
      title="Textes juridiques consolidés"
      description="Accédez aux versions consolidées et mises à jour des textes juridiques algériens"
      icon={<BookOpen className="w-8 h-8" />}
      iconColor="text-teal-600"
      searchPlaceholder="Rechercher dans les textes consolidés..."
      items={consolidatedTexts}
      statistics={statistics}
      onSearch={(query) => console.log('Search:', query)}
      onFilter={() => console.log('Filter clicked')}
      onItemAction={(itemId, action) => console.log('Action:', action, 'on item:', itemId)}
    />
  );
}
