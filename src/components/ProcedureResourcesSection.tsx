
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { SectionHeader } from './common/SectionHeader';

export function ProcedureResourcesSection() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Ressources Procédurales"
        description="Accédez aux formulaires et guides pour vos procédures administratives"
        icon={FileText}
        iconColor="text-blue-600"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="text-center pb-4">
            <Download className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <CardTitle>Formulaires Téléchargeables</CardTitle>
            <CardDescription>
              Accédez aux formulaires officiels téléchargeables pour vos procédures
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Voir formulaires
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="text-center pb-4">
            <FileText className="w-12 h-12 mx-auto text-emerald-600 mb-4" />
            <CardTitle>Guides pratiques</CardTitle>
            <CardDescription>
              Consultez les guides détaillés pour chaque procédure administrative
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
              <FileText className="w-4 h-4 mr-2" />
              Voir guides
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
