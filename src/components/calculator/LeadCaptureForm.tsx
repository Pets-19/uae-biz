
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Mail, MessageCircle, ArrowLeft, CheckCircle } from 'lucide-react';
import { BusinessSetupData } from '@/pages/BusinessSetupCalculator';
import { useToast } from '@/hooks/use-toast';

interface LeadCaptureFormProps {
  businessData: BusinessSetupData;
  estimatedCost: number;
  onBack: () => void;
}

export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({ 
  businessData, 
  estimatedCost, 
  onBack 
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    nationality: '',
    preferredContact: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Lead captured:', {
      ...formData,
      businessData,
      estimatedCost,
      timestamp: new Date().toISOString()
    });

    toast({
      title: "Request Submitted Successfully!",
      description: "Our business setup expert will contact you within 24 hours.",
    });

    setIsSubmitting(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Almost There!</h2>
            <p className="text-muted-foreground mb-4">
              Your estimated setup cost is <strong>{formatCurrency(estimatedCost)}</strong>
            </p>
            <p className="text-sm text-muted-foreground">
              Fill out your details below to get a detailed quote and free consultation
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Get Your Detailed Quote & Free Consultation</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+971 50 123 4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  value={formData.nationality}
                  onChange={(e) => setFormData(prev => ({ ...prev, nationality: e.target.value }))}
                  placeholder="Your nationality"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredContact">Preferred Contact Method</Label>
              <Select value={formData.preferredContact} onValueChange={(value) => setFormData(prev => ({ ...prev, preferredContact: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="How would you like us to contact you?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="phone">Phone Call</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="meeting">In-Person Meeting</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Additional Requirements or Questions</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Tell us about any specific requirements, timeline, or questions you have..."
                rows={4}
              />
            </div>

            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={onBack} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Results
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? 'Submitting...' : 'Get My Detailed Quote'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="text-center p-4">
          <Phone className="h-8 w-8 text-primary mx-auto mb-2" />
          <h4 className="font-semibold mb-1">Phone Support</h4>
          <p className="text-sm text-muted-foreground">+971 4 123 4567</p>
          <p className="text-xs text-muted-foreground">9 AM - 6 PM (UAE Time)</p>
        </Card>

        <Card className="text-center p-4">
          <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <h4 className="font-semibold mb-1">WhatsApp</h4>
          <p className="text-sm text-muted-foreground">+971 50 123 4567</p>
          <p className="text-xs text-muted-foreground">Instant responses</p>
        </Card>

        <Card className="text-center p-4">
          <Mail className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <h4 className="font-semibold mb-1">Email</h4>
          <p className="text-sm text-muted-foreground">info@uaebizsetup.com</p>
          <p className="text-xs text-muted-foreground">24/7 inquiries</p>
        </Card>
      </div>
    </div>
  );
};
