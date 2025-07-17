
import { useState, useMemo } from 'react';

export interface LegalText {
  id: number;
  title: string;
  type: string;
  category: string;
  publishDate: string;
  status: string;
  description: string;
  authority: string;
  joNumber: string;
}

export interface LegalTextsFilters {
  type?: string;
  status?: string;
}

export function useLegalTextsData() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<LegalTextsFilters>({});

  const legalTexts: LegalText[] = [
    {
      id: 1,
      title: "Loi n° 08-09 du 25 février 2008 portant code de procédure civile et administrative",
      type: "Loi",
      category: "Procédure",
      publishDate: "25 février 2008",
      status: "En vigueur",
      description: "Code régissant les procédures civiles et administratives en Algérie",
      authority: "Assemblée Populaire Nationale",
      joNumber: "J.O. n° 21 du 23 avril 2008"
    },
    {
      id: 2,
      title: "Ordonnance n° 75-58 du 26 septembre 1975 portant code civil",
      type: "Ordonnance",
      category: "Civil",
      publishDate: "26 septembre 1975",
      status: "En vigueur",
      description: "Code civil algérien régissant les relations entre particuliers",
      authority: "Conseil de la Révolution",
      joNumber: "J.O. n° 78 du 30 septembre 1975"
    },
    {
      id: 3,
      title: "Loi n° 90-11 du 21 avril 1990 relative aux relations de travail",
      type: "Loi",
      category: "Travail",
      publishDate: "21 avril 1990",
      status: "En vigueur",
      description: "Loi régissant les relations de travail en Algérie",
      authority: "Assemblée Populaire Nationale",
      joNumber: "J.O. n° 17 du 25 avril 1990"
    },
    {
      id: 4,
      title: "Loi n° 18-05 du 10 mai 2018 relative au commerce électronique",
      type: "Loi",
      category: "Commercial",
      publishDate: "10 mai 2018",
      status: "En vigueur",
      description: "Cadre juridique pour le commerce électronique en Algérie",
      authority: "Assemblée Populaire Nationale",
      joNumber: "J.O. n° 28 du 16 mai 2018"
    },
    {
      id: 5,
      title: "Décret exécutif n° 20-123 du 15 mars 2020 relatif aux mesures d'urgence",
      type: "Décret",
      category: "Administratif",
      publishDate: "15 mars 2020",
      status: "Suspendu",
      description: "Mesures d'urgence sanitaire temporaires",
      authority: "Gouvernement",
      joNumber: "J.O. n° 15 du 18 mars 2020"
    }
  ];

  const filteredTexts = useMemo(() => {
    return legalTexts.filter((text) => {
      // Filtre par terme de recherche
      const matchesSearch = searchTerm === '' || 
        text.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        text.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        text.category.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtre par type
      const matchesType = !filters.type || text.type === filters.type;

      // Filtre par statut
      const matchesStatus = !filters.status || text.status === filters.status;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [legalTexts, searchTerm, filters]);

  return {
    legalTexts,
    filteredTexts,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters
  };
}
