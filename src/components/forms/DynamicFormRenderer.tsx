import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { FormTemplate } from '@/data/formTemplates';

interface DynamicFormRendererProps {
  template: FormTemplate;
  formData: any;
  onFieldChange: (fieldName: string, value: any) => void;
  className?: string;
}

export function DynamicFormRenderer({ 
  template, 
  formData, 
  onFieldChange, 
  className = "" 
}: DynamicFormRendererProps) {
  
  const renderField = (field: any) => {
    const value = formData[field.name] || '';
    
    switch (field.type) {
      case 'text':
        return (
          <Input
            value={value}
            onChange={(e) => onFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder || `Entrez ${field.label.toLowerCase()}`}
            required={field.required}
          />
        );
        
      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => onFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder || `Entrez ${field.label.toLowerCase()}`}
            required={field.required}
            rows={4}
          />
        );
        
      case 'select':
        return (
          <Select value={value} onValueChange={(val) => onFieldChange(field.name, val)}>
            <SelectTrigger>
              <SelectValue placeholder={`Sélectionner ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option: string) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
        
      case 'date':
        return (
          <Input
            type="date"
            value={value}
            onChange={(e) => onFieldChange(field.name, e.target.value)}
            required={field.required}
          />
        );
        
      case 'number':
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => onFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder || `Entrez ${field.label.toLowerCase()}`}
            required={field.required}
          />
        );
        
      case 'file':
        return (
          <Input
            type="file"
            onChange={(e) => onFieldChange(field.name, e.target.files?.[0] || null)}
            accept=".pdf,.doc,.docx,.jpg,.png"
          />
        );
        
      default:
        return (
          <Input
            value={value}
            onChange={(e) => onFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder || `Entrez ${field.label.toLowerCase()}`}
            required={field.required}
          />
        );
    }
  };

  return (
    <Card className={`shadow-lg border-0 bg-white/80 backdrop-blur-sm ${className}`}>
      <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-emerald-50">
        <CardTitle className="text-xl text-gray-900">
          Formulaire : {template.name}
        </CardTitle>
        <p className="text-sm text-gray-600">{template.description}</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {template.fields.map((field, index) => (
            <div 
              key={field.name} 
              className={field.type === 'textarea' ? 'md:col-span-2' : ''}
            >
              <div className="space-y-2">
                <Label htmlFor={field.name} className="text-sm font-medium text-gray-700">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                {renderField(field)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}