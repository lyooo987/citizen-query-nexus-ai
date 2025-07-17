
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface AddLegalTextFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddLegalTextForm({ isOpen, onClose }: AddLegalTextFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    domain: '',
    content: '',
    reference: '',
    date: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nouveau texte juridique:', formData);
    toast({
      title: "Texte juridique ajouté",
      description: `Le texte "${formData.title}" a été ajouté avec succès.`,
    });
    onClose();
    setFormData({ title: '', type: '', domain: '', content: '', reference: '', date: '' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau texte juridique</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Titre du texte</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="reference">Référence</Label>
              <Input
                id="reference"
                value={formData.reference}
                onChange={(e) => setFormData({...formData, reference: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Type de texte</Label>
              <Select onValueChange={(value) => setFormData({...formData, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="loi">Loi</SelectItem>
                  <SelectItem value="decret">Décret</SelectItem>
                  <SelectItem value="arrete">Arrêté</SelectItem>
                  <SelectItem value="ordonnance">Ordonnance</SelectItem>
                  <SelectItem value="circulaire">Circulaire</SelectItem>
                  <SelectItem value="fonction-publique">Fonction publique</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="domain">Domaine</Label>
              <Select onValueChange={(value) => setFormData({...formData, domain: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le domaine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="civil">Droit civil</SelectItem>
                  <SelectItem value="penal">Droit pénal</SelectItem>
                  <SelectItem value="commercial">Droit commercial</SelectItem>
                  <SelectItem value="administratif">Droit administratif</SelectItem>
                  <SelectItem value="travail">Droit du travail</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="date">Date de publication</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
            />
          </div>

          <div>
            <Label htmlFor="content">Contenu du texte</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              rows={6}
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Ajouter le texte
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
