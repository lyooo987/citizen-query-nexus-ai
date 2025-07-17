
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Filter } from "lucide-react";
import { EnhancedInput } from "@/components/common/EnhancedInput";

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function SearchFilter({ searchTerm, onSearchChange }: SearchFilterProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <EnhancedInput
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Rechercher dans vos recherches sauvegardées..."
              context="search"
              enableVoice={true}
            />
          </div>
          <Button variant="outline" onClick={() => (window as any).actionHandlers?.handleFilter?.()}>
            <Filter className="w-4 h-4 mr-2" />
            Filtrer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
