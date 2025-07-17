
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { EnhancedInput } from '@/components/common/EnhancedInput';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Search, Navigation, Target } from 'lucide-react';

interface GeolocationSearchModalProps {
  trigger?: React.ReactNode;
  onLocationSelect?: (location: any) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function GeolocationSearchModal({ 
  trigger, 
  onLocationSelect,
  isOpen = false,
  onClose
}: GeolocationSearchModalProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState('');
  const [selectedCommune, setSelectedCommune] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Sync external isOpen prop with internal state
  useEffect(() => {
    if (isOpen !== undefined) {
      setInternalIsOpen(isOpen);
    }
  }, [isOpen]);

  const wilayas = [
    'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar',
    'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Alger',
    'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma',
    'Constantine', 'Médéa', 'Mostaganem', 'MSila', 'Mascara', 'Ouargla', 'Oran', 'El Bayadh',
    'Illizi', 'Bordj Bou Arréridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued',
    'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent',
    'Ghardaïa', 'Relizane'
  ];

  const handleSearch = () => {
    // Simulation de recherche géolocalisée
    const mockResults = [
      {
        id: 1,
        name: searchQuery || 'Tribunal de première instance',
        address: selectedWilaya ? `${selectedWilaya}, ${selectedCommune || 'Centre-ville'}` : 'Alger, Centre-ville',
        type: 'Institution judiciaire',
        distance: '2.5 km',
        coordinates: { lat: 36.7538, lng: 3.0588 }
      },
      {
        id: 2,
        name: searchQuery || 'Mairie',
        address: selectedWilaya ? `${selectedWilaya}, ${selectedCommune || 'Centre-ville'}` : 'Alger, Centre-ville',
        type: 'Administration',
        distance: '1.8 km',
        coordinates: { lat: 36.7538, lng: 3.0588 }
      }
    ];
    setSearchResults(mockResults);
  };

  const handleLocationSelect = (location: any) => {
    onLocationSelect?.(location);
    if (onClose) {
      onClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setInternalIsOpen(open);
    if (!open && onClose) {
      onClose();
    }
  };

  const modalContent = (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Recherche par géolocalisation
        </DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6">
        {/* Recherche textuelle */}
        <div>
          <Label htmlFor="geo-search">Rechercher un lieu ou une institution</Label>
          <EnhancedInput
            id="geo-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ex: tribunal, mairie, préfecture..."
            context="search"
            enableVoice={true}
          />
        </div>

        {/* Sélection de wilaya */}
        <div>
          <Label>Wilaya</Label>
          <Select value={selectedWilaya} onValueChange={setSelectedWilaya}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une wilaya" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Toutes les wilayas</SelectItem>
              {wilayas.map(wilaya => (
                <SelectItem key={wilaya} value={wilaya}>
                  {wilaya}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Commune (si wilaya sélectionnée) */}
        {selectedWilaya && (
          <div>
            <Label htmlFor="commune">Commune</Label>
            <EnhancedInput
              id="commune"
              value={selectedCommune}
              onChange={(e) => setSelectedCommune(e.target.value)}
              placeholder="Nom de la commune..."
              context="general"
              enableVoice={true}
            />
          </div>
        )}

        {/* Boutons d'action */}
        <div className="flex gap-3">
          <Button onClick={handleSearch} className="flex-1">
            <Search className="w-4 h-4 mr-2" />
            Rechercher
          </Button>
          <Button variant="outline">
            <Navigation className="w-4 h-4 mr-2" />
            Ma position
          </Button>
        </div>

        {/* Résultats */}
        {searchResults.length > 0 && (
          <div className="space-y-3">
            <Label>Résultats trouvés</Label>
            {searchResults.map((result) => (
              <Card key={result.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4" onClick={() => handleLocationSelect(result)}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        {result.name}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">{result.address}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{result.type}</Badge>
                        <Badge variant="secondary">{result.distance}</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DialogContent>
  );

  // If using external control (isOpen/onClose), render without trigger
  if (isOpen !== undefined && onClose) {
    return (
      <Dialog open={internalIsOpen} onOpenChange={handleOpenChange}>
        {modalContent}
      </Dialog>
    );
  }

  // Default trigger-based usage
  return (
    <Dialog open={internalIsOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <MapPin className="w-4 h-4" />
            Recherche géolocalisée
          </Button>
        )}
      </DialogTrigger>
      {modalContent}
    </Dialog>
  );
}
