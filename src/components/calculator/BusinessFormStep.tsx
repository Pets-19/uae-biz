
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { BusinessSetupData } from '@/pages/BusinessSetupCalculator';

interface BusinessFormStepProps {
  onSubmit: (data: BusinessSetupData) => void;
}

const businessTypes = [
  { value: 'trading', label: 'Trading Company' },
  { value: 'consulting', label: 'Consulting Services' },
  { value: 'technology', label: 'Technology/IT Services' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'restaurant', label: 'Restaurant/F&B' },
  { value: 'retail', label: 'Retail Business' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'healthcare', label: 'Healthcare Services' },
  { value: 'education', label: 'Education/Training' },
  { value: 'logistics', label: 'Logistics/Transport' }
];

const locations = [
  { value: 'dubai-mainland', label: 'Dubai Mainland' },
  { value: 'dubai-freezone', label: 'Dubai Free Zone (DMCC, JAFZA, etc.)' },
  { value: 'abu-dhabi-mainland', label: 'Abu Dhabi Mainland' },
  { value: 'abu-dhabi-freezone', label: 'Abu Dhabi Free Zone (ADGM, Masdar)' },
  { value: 'sharjah-mainland', label: 'Sharjah Mainland' },
  { value: 'sharjah-freezone', label: 'Sharjah Free Zone (SAIF)' },
  { value: 'ajman', label: 'Ajman' },
  { value: 'ras-al-khaimah', label: 'Ras Al Khaimah (RAK)' }
];

const officeTypes = [
  { value: 'physical', label: 'Physical Office Space' },
  { value: 'virtual', label: 'Virtual Office' },
  { value: 'co-working', label: 'Co-working Space' },
  { value: 'warehouse', label: 'Warehouse/Industrial Space' }
];

const additionalServices = [
  { id: 'bank-account', label: 'Bank Account Opening Assistance' },
  { id: 'accounting', label: 'Accounting & Bookkeeping Setup' },
  { id: 'vat-registration', label: 'VAT Registration' },
  { id: 'trademark', label: 'Trademark Registration' },
  { id: 'digital-signature', label: 'Digital Signature Certificate' },
  { id: 'immigration', label: 'Immigration Services' }
];

export const BusinessFormStep: React.FC<BusinessFormStepProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<BusinessSetupData>({
    businessType: '',
    location: '',
    visaCount: 1,
    officeType: '',
    additionalServices: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleAdditionalServiceChange = (serviceId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      additionalServices: checked 
        ? [...prev.additionalServices, serviceId]
        : prev.additionalServices.filter(id => id !== serviceId)
    }));
  };

  const isFormValid = formData.businessType && formData.location && formData.officeType;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tell us about your business requirements</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type *</Label>
              <Select value={formData.businessType} onValueChange={(value) => setFormData(prev => ({ ...prev, businessType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your business type" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Preferred Location *</Label>
              <Select value={formData.location} onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location.value} value={location.value}>
                      {location.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="visaCount">Number of Visas Required</Label>
              <Input
                type="number"
                min="1"
                max="20"
                value={formData.visaCount}
                onChange={(e) => setFormData(prev => ({ ...prev, visaCount: parseInt(e.target.value) || 1 }))}
                placeholder="Enter number of visas"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="officeType">Office Type *</Label>
              <Select value={formData.officeType} onValueChange={(value) => setFormData(prev => ({ ...prev, officeType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select office type" />
                </SelectTrigger>
                <SelectContent>
                  {officeTypes.map(office => (
                    <SelectItem key={office.value} value={office.value}>
                      {office.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Additional Services (Optional)</Label>
            <div className="grid md:grid-cols-2 gap-3">
              {additionalServices.map(service => (
                <div key={service.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={service.id}
                    checked={formData.additionalServices.includes(service.id)}
                    onCheckedChange={(checked) => handleAdditionalServiceChange(service.id, checked as boolean)}
                  />
                  <Label htmlFor={service.id} className="text-sm">
                    {service.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={!isFormValid}
          >
            Calculate Setup Costs
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
