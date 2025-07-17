
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { GitCompareArrows, FileText } from 'lucide-react';

interface Procedure {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
}

const mockProcedures: Procedure[] = [
  {
    id: '1',
    title: 'Procédure 1',
    description: 'Description de la procédure administrative 1',
    category: 'Civil',
    status: 'Active'
  },
  {
    id: '2',
    title: 'Procédure 2',
    description: 'Description de la procédure administrative 2',
    category: 'Commercial',
    status: 'Active'
  },
  {
    id: '3',
    title: 'Procédure 3',
    description: 'Description de la procédure administrative 3',
    category: 'Fiscal',
    status: 'Active'
  },
  {
    id: '4',
    title: 'Procédure 4',
    description: 'Description de la procédure administrative 4',
    category: 'Social',
    status: 'Active'
  }
];

export function ProcedureComparisonSection() {
  const [selectedProcedures, setSelectedProcedures] = useState<string[]>([]);

  const handleProcedureSelection = (procedureId: string, checked: boolean) => {
    if (checked) {
      setSelectedProcedures([...selectedProcedures, procedureId]);
    } else {
      setSelectedProcedures(selectedProcedures.filter(id => id !== procedureId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <GitCompareArrows className="w-16 h-16 mx-auto text-emerald-600" />
        <div>
          <h2 className="text-2xl font-bold">Comparaison des procédures</h2>
          <p className="text-gray-600 mt-2">
            Sélectionnez les procédures à comparer pour identifier les similitudes, différences et optimiser vos processus administratifs.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-3">Sélectionner les procédures à comparer</h3>
          <p className="text-sm text-gray-600 mb-4">Choisissez au moins 2 procédures pour commencer la comparaison</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockProcedures.map((procedure) => (
            <Card key={procedure.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    checked={selectedProcedures.includes(procedure.id)}
                    onCheckedChange={(checked) => 
                      handleProcedureSelection(procedure.id, checked as boolean)
                    }
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-lg">{procedure.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {procedure.description}
                    </CardDescription>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">Catégorie: {procedure.category}</Badge>
                      <Badge variant="outline">Statut: {procedure.status}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <span className="text-sm text-gray-600">
            {selectedProcedures.length} procédure(s) sélectionnée(s)
          </span>
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700"
            disabled={selectedProcedures.length < 2}
          >
            <GitCompareArrows className="w-4 h-4 mr-2" />
            Comparer les procédures
          </Button>
        </div>
      </div>
    </div>
  );
}
