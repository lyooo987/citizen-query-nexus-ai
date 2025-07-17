
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface ActionCard {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  buttonColor: string;
  onClick: () => void;
  disabled?: boolean;
}

interface UnifiedActionCardsProps {
  cards: ActionCard[];
  columns?: number;
}

export function UnifiedActionCards({ cards, columns = 4 }: UnifiedActionCardsProps) {
  const gridCols = columns === 2 ? 'grid-cols-2' : 
                   columns === 3 ? 'grid-cols-3' : 'grid-cols-4';

  return (
    <div className={`grid grid-cols-1 md:${gridCols} gap-6`}>
      {cards.map((card, index) => (
        <Card 
          key={index} 
          className="hover:shadow-md transition-shadow cursor-pointer"
          onClick={!card.disabled ? card.onClick : undefined}
        >
          <CardHeader className="text-center">
            <card.icon className={`w-12 h-12 mx-auto mb-4 ${card.buttonColor.replace('bg-', 'text-').replace('hover:bg-', '')}`} />
            <CardTitle className="text-lg">{card.title}</CardTitle>
            <CardDescription className="text-sm">
              {card.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className={`w-full ${card.buttonColor}`}
              onClick={card.onClick}
              disabled={card.disabled}
            >
              <card.icon className="w-4 h-4 mr-2" />
              {card.buttonText}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
