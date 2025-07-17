
import { Button } from "@/components/ui/button";

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface SectionTabsNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function SectionTabsNavigation({ tabs, activeTab, onTabChange, className = "" }: SectionTabsNavigationProps) {
  return (
    <div className={`flex gap-2 mb-6 ${className}`}>
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? "default" : "outline"}
          onClick={() => onTabChange(tab.id)}
          className="gap-2"
        >
          {tab.label}
          {tab.count && (
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
              {tab.count}
            </span>
          )}
        </Button>
      ))}
    </div>
  );
}
