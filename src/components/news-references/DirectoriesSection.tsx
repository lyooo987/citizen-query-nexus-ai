
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building, MapPin, Phone, Mail, Globe, Users, Gavel, Scale, Plus, Upload } from 'lucide-react';

export function DirectoriesSection() {
  const institutionsData = [
    {
      id: 1,
      name: "Conseil d'État",
      type: "Institution judiciaire",
      address: "Rue Docteur Saadane, Alger",
      phone: "+213 21 73 59 22",
      email: "contact@conseil-etat.dz",
      website: "www.conseil-etat.dz",
      description: "Haute juridiction administrative algérienne",
      icon: <Scale className="w-8 h-8 text-blue-600" />
    },
    {
      id: 2,
      name: "Ministère de la Justice",
      type: "Ministère",
      address: "8, Place Bir Hakem, Alger",
      phone: "+213 21 60 57 57",
      email: "contact@mjustice.dz",
      website: "www.mjustice.dz",
      description: "Ministère de la Justice, Garde des Sceaux",
      icon: <Building className="w-8 h-8 text-purple-600" />
    },
    {
      id: 3,
      name: "Cour Suprême",
      type: "Institution judiciaire",
      address: "Place Emir Abdelkader, Alger",
      phone: "+213 21 73 40 12",
      email: "contact@cour-supreme.dz",
      website: "www.cour-supreme.dz",
      description: "Plus haute juridiction de l'ordre judiciaire",
      icon: <Scale className="w-8 h-8 text-red-600" />
    },
    {
      id: 4,
      name: "Tribunal Administratif d'Alger",
      type: "Tribunal",
      address: "Rue Ahmed Boudraa, Alger",
      phone: "+213 21 65 78 90",
      email: "contact@ta-alger.dz",
      website: "www.ta-alger.dz",
      description: "Tribunal administratif de première instance",
      icon: <Gavel className="w-8 h-8 text-green-600" />
    }
  ];

  const facultesData = [
    {
      id: 1,
      name: "Faculté de Droit - Université d'Alger 1",
      type: "Faculté de Droit",
      address: "2, Rue Didouche Mourad, Alger",
      phone: "+213 21 73 56 08",
      email: "contact@fdroit-alger.dz",
      website: "www.fdroit-alger.dz",
      description: "Formation juridique supérieure et recherche",
      icon: <Building className="w-8 h-8 text-green-600" />
    },
    {
      id: 2,
      name: "Faculté de Droit - Université d'Oran",
      type: "Faculté de Droit",
      address: "Avenue Es-Senia, Oran",
      phone: "+213 41 56 78 12",
      email: "contact@fdroit-oran.dz",
      website: "www.fdroit-oran.dz",
      description: "Centre de formation juridique de l'Ouest",
      icon: <Building className="w-8 h-8 text-blue-600" />
    },
    {
      id: 3,
      name: "Faculté de Droit - Université de Constantine",
      type: "Faculté de Droit",
      address: "Route Ain El Bey, Constantine",
      phone: "+213 31 81 23 45",
      email: "contact@fdroit-constantine.dz",
      website: "www.fdroit-constantine.dz",
      description: "Faculté de droit et sciences politiques",
      icon: <Building className="w-8 h-8 text-purple-600" />
    },
    {
      id: 4,
      name: "Institut de Droit - Université de Tizi Ouzou",
      type: "Institut de Droit",
      address: "Route de Hasnaoua, Tizi Ouzou",
      phone: "+213 26 21 67 89",
      email: "contact@idroit-tiziouzou.dz",
      website: "www.idroit-tiziouzou.dz",
      description: "Institut spécialisé en droit berbère",
      icon: <Building className="w-8 h-8 text-orange-600" />
    }
  ];

  const professionnelsData = [
    {
      id: 1,
      name: "Ordre des Avocats d'Alger",
      type: "Ordre professionnel",
      address: "13, Rue Larbi Ben M'hidi, Alger",
      phone: "+213 21 63 42 18",
      email: "contact@barreau-alger.dz",
      website: "www.barreau-alger.dz",
      description: "Ordre des avocats de la région d'Alger",
      icon: <Gavel className="w-8 h-8 text-red-600" />
    },
    {
      id: 2,
      name: "Ordre des Avocats d'Oran",
      type: "Ordre professionnel",
      address: "Place du 1er Novembre, Oran",
      phone: "+213 41 33 45 67",
      email: "contact@barreau-oran.dz",
      website: "www.barreau-oran.dz",
      description: "Ordre des avocats de l'Ouest algérien",
      icon: <Gavel className="w-8 h-8 text-blue-600" />
    },
    {
      id: 3,
      name: "Syndic National des Huissiers de Justice",
      type: "Syndicat professionnel",
      address: "Rue Mohamed Belouizdad, Alger",
      phone: "+213 21 59 34 12",
      email: "contact@huissiers-dz.org",
      website: "www.huissiers-dz.org",
      description: "Organisation nationale des huissiers",
      icon: <Users className="w-8 h-8 text-green-600" />
    },
    {
      id: 4,
      name: "Ordre des Experts Comptables",
      type: "Ordre professionnel",
      address: "Avenue Pasteur, Alger",
      phone: "+213 21 74 56 23",
      email: "contact@oeca.dz",
      website: "www.oeca.dz",
      description: "Ordre des experts comptables et commissaires",
      icon: <Building className="w-8 h-8 text-purple-600" />
    }
  ];

  const organismesData = [
    {
      id: 1,
      name: "Chambre Nationale des Notaires",
      type: "Organisme professionnel",
      address: "Rue Ben Kateb, Alger",
      phone: "+213 21 67 89 34",
      email: "contact@notaires.dz",
      website: "www.notaires.dz",
      description: "Organisation nationale des notaires",
      icon: <Users className="w-8 h-8 text-orange-600" />
    },
    {
      id: 2,
      name: "Centre National du Registre du Commerce",
      type: "Organisme public",
      address: "Rue Hassiba Ben Bouali, Alger",
      phone: "+213 21 23 45 67",
      email: "contact@cnrc.dz",
      website: "www.cnrc.dz",
      description: "Registre national du commerce et des sociétés",
      icon: <Building className="w-8 h-8 text-blue-600" />
    },
    {
      id: 3,
      name: "Direction Générale de la Fonction Publique",
      type: "Administration",
      address: "Avenue Ahmed Ghermoul, Alger",
      phone: "+213 21 45 67 89",
      email: "contact@dgfp.gov.dz",
      website: "www.dgfp.gov.dz",
      description: "Gestion de la fonction publique",
      icon: <Users className="w-8 h-8 text-green-600" />
    },
    {
      id: 4,
      name: "Agence Nationale de l'Emploi",
      type: "Organisme public",
      address: "Avenue Souidani Boudjemaa, Alger",
      phone: "+213 21 78 90 12",
      email: "contact@anem.dz",
      website: "www.anem.dz",
      description: "Promotion de l'emploi et lutte contre le chômage",
      icon: <Building className="w-8 h-8 text-purple-600" />
    },
    {
      id: 5,
      name: "Conseil National des Droits de l'Homme",
      type: "Institution indépendante",
      address: "Villa n°17, Dély Ibrahim, Alger",
      phone: "+213 21 91 12 34",
      email: "contact@cndh.dz",
      website: "www.cndh.dz",
      description: "Protection et promotion des droits humains",
      icon: <Scale className="w-8 h-8 text-red-600" />
    }
  ];

  const handleAdd = (type: string) => {
    console.log(`Opening add form for: ${type}`);
    
    const event = new CustomEvent('open-library-form', {
      detail: { resourceType: 'directory', category: type }
    });
    window.dispatchEvent(event);
  };

  const handleEnrich = (type: string) => {
    console.log(`Opening enrichment for: ${type}`);
    
    const event = new CustomEvent('open-modal', {
      detail: {
        type: 'import',
        title: 'Enrichir les données',
        data: { acceptedTypes: ['.pdf', '.doc', '.docx', '.csv', '.xlsx'], category: type }
      }
    });
    window.dispatchEvent(event);
  };

  const handleEmailClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handleWebsiteClick = (website: string) => {
    window.open(`https://${website}`, '_blank');
  };

  const handlePhoneClick = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const renderDirectoryCards = (data: any[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((directory) => (
        <Card key={directory.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {directory.icon}
                <div>
                  <CardTitle className="text-lg">{directory.name}</CardTitle>
                  <Badge variant="secondary" className="mt-1">
                    {directory.type}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <CardDescription>{directory.description}</CardDescription>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{directory.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <button 
                  onClick={() => handlePhoneClick(directory.phone)}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  {directory.phone}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <button 
                  onClick={() => handleEmailClick(directory.email)}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  {directory.email}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <button 
                  onClick={() => handleWebsiteClick(directory.website)}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  {directory.website}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderTabButtons = (tabType: string) => (
    <div className="flex justify-center gap-3 mb-6">
      <Button 
        className="gap-2 bg-teal-600 hover:bg-teal-700" 
        onClick={() => handleAdd(tabType)}
      >
        <Plus className="w-4 h-4" />
        Ajouter
      </Button>
      <Button 
        variant="outline" 
        className="gap-2 border-teal-200 text-teal-700 hover:bg-teal-50" 
        onClick={() => handleEnrich(tabType)}
      >
        <Upload className="w-4 h-4" />
        Enrichir
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <Tabs defaultValue="institutions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="institutions">Institutions</TabsTrigger>
          <TabsTrigger value="facultes">Facultés de droit</TabsTrigger>
          <TabsTrigger value="professionnels">Professionnels du droit</TabsTrigger>
          <TabsTrigger value="organismes">Organismes juridiques</TabsTrigger>
        </TabsList>

        <TabsContent value="institutions" className="mt-6">
          {renderTabButtons('institutions')}
          {renderDirectoryCards(institutionsData)}
        </TabsContent>

        <TabsContent value="facultes" className="mt-6">
          {renderTabButtons('facultes')}
          {renderDirectoryCards(facultesData)}
        </TabsContent>

        <TabsContent value="professionnels" className="mt-6">
          {renderTabButtons('professionnels')}
          {renderDirectoryCards(professionnelsData)}
        </TabsContent>

        <TabsContent value="organismes" className="mt-6">
          {renderTabButtons('organismes')}
          {renderDirectoryCards(organismesData)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
