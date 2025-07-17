
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Eye, Download, Share, Trash2, FileText, Scale } from 'lucide-react';

export function FavoritesSection() {
  const [searchTerm, setSearchTerm] = useState('');

  const favorites = [
    {
      id: 1,
      type: 'Code',
      title: 'Code du travail - Article 87',
      subtitle: 'Dispositions relatives aux congés payés',
      tags: ['Code', 'Droit du travail', 'Congés', 'Travail', 'Social'],
      addedDate: '2024-01-15',
      viewedDate: '2024-01-20',
      category: 'codes'
    },
    {
      id: 2,
      type: 'Loi',
      title: 'Loi n° 23-12 sur l\'investissement',
      subtitle: 'Nouveau cadre juridique pour l\'investissement',
      tags: ['Loi', 'Investissement', 'Économie', 'Nouveau'],
      addedDate: '2024-01-10',
      viewedDate: '2024-01-18',
      category: 'lois'
    }
  ];

  const procedures = [
    {
      id: 1,
      title: 'Création d\'entreprise SARL',
      description: 'Procédure complète pour créer une société à responsabilité limitée',
      category: 'Commercial',
      difficulty: 'Moyenne',
      duration: '15-30 jours'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mes Favoris</h1>
          <p className="text-muted-foreground mt-2">
            Gérez vos documents et procédures favoris
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filtrer
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Rechercher dans mes favoris..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="tous" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tous">Tous (3)</TabsTrigger>
          <TabsTrigger value="codes">Codes</TabsTrigger>
          <TabsTrigger value="lois">Lois</TabsTrigger>
          <TabsTrigger value="procedures">Procédures</TabsTrigger>
        </TabsList>

        <TabsContent value="tous" className="space-y-4 mt-6">
          {favorites.map((item) => (
            <Card key={item.id} className="border-l-4 border-l-emerald-500">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-5 h-5 text-gray-600" />
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-3">{item.subtitle}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant={index === 0 ? "default" : "secondary"}
                          className={index === 0 ? "bg-blue-100 text-blue-800" : ""}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Ajouté le {new Date(item.addedDate).toLocaleDateString('fr-FR')}</span>
                      <span>Vu le {new Date(item.viewedDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="w-4 h-4" />
                      Consulter
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      Télécharger
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {procedures.map((procedure) => (
            <Card key={procedure.id} className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Scale className="w-5 h-5 text-gray-600" />
                      <h3 className="text-lg font-semibold">{procedure.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-3">{procedure.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <Badge variant="outline">{procedure.category}</Badge>
                      <Badge variant="secondary">{procedure.difficulty}</Badge>
                      <span className="text-gray-500">{procedure.duration}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="w-4 h-4" />
                      Consulter
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="codes" className="space-y-4 mt-6">
          {favorites.filter(item => item.category === 'codes').map((item) => (
            <Card key={item.id} className="border-l-4 border-l-emerald-500">
              {/* Same content as above */}
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="lois" className="space-y-4 mt-6">
          {favorites.filter(item => item.category === 'lois').map((item) => (
            <Card key={item.id} className="border-l-4 border-l-emerald-500">
              {/* Same content as above */}
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="procedures" className="space-y-4 mt-6">
          {procedures.map((procedure) => (
            <Card key={procedure.id} className="border-l-4 border-l-blue-500">
              {/* Same content as above */}
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
