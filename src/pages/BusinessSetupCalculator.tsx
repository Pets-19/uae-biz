
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, Building2, Users, FileText, Phone } from 'lucide-react';
import { BusinessFormStep } from '@/components/calculator/BusinessFormStep';
import { CostBreakdown } from '@/components/calculator/CostBreakdown';
import { LeadCaptureForm } from '@/components/calculator/LeadCaptureForm';
import { calculateBusinessSetupCost } from '@/utils/costCalculator';

export interface BusinessSetupData {
  businessType: string;
  location: string;
  visaCount: number;
  officeType: string;
  additionalServices: string[];
}

const BusinessSetupCalculator = () => {
  const [currentStep, setCurrentStep] = useState<'form' | 'results' | 'contact'>('form');
  const [businessData, setBusinessData] = useState<BusinessSetupData>({
    businessType: '',
    location: '',
    visaCount: 1,
    officeType: '',
    additionalServices: []
  });
  const [costBreakdown, setCostBreakdown] = useState<any>(null);

  const handleFormSubmit = (data: BusinessSetupData) => {
    setBusinessData(data);
    const costs = calculateBusinessSetupCost(data);
    setCostBreakdown(costs);
    setCurrentStep('results');
  };

  const handleGetQuote = () => {
    setCurrentStep('contact');
  };

  const resetCalculator = () => {
    setCurrentStep('form');
    setBusinessData({
      businessType: '',
      location: '',
      visaCount: 1,
      officeType: '',
      additionalServices: []
    });
    setCostBreakdown(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="h-12 w-12" />
            <h1 className="text-4xl font-bold">UAE Business Setup Cost Calculator</h1>
          </div>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Get instant cost estimates for setting up your business in UAE. 
            Free, accurate, and tailored to your requirements.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Indicators */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${currentStep === 'form' ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'form' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <Building2 className="h-4 w-4" />
                </div>
                <span>Business Details</span>
              </div>
              
              <div className="w-8 h-px bg-muted-foreground/30"></div>
              
              <div className={`flex items-center space-x-2 ${currentStep === 'results' ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'results' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <FileText className="h-4 w-4" />
                </div>
                <span>Cost Breakdown</span>
              </div>
              
              <div className="w-8 h-px bg-muted-foreground/30"></div>
              
              <div className={`flex items-center space-x-2 ${currentStep === 'contact' ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'contact' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <Phone className="h-4 w-4" />
                </div>
                <span>Get Quote</span>
              </div>
            </div>
          </div>

          {/* Step Content */}
          {currentStep === 'form' && (
            <BusinessFormStep onSubmit={handleFormSubmit} />
          )}

          {currentStep === 'results' && costBreakdown && (
            <CostBreakdown 
              breakdown={costBreakdown} 
              businessData={businessData}
              onGetQuote={handleGetQuote}
              onRecalculate={resetCalculator}
            />
          )}

          {currentStep === 'contact' && (
            <LeadCaptureForm 
              businessData={businessData}
              estimatedCost={costBreakdown?.total}
              onBack={() => setCurrentStep('results')}
            />
          )}
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Trusted by 1000+ Businesses</h3>
            <p className="text-muted-foreground">Join successful entrepreneurs who chose UAE for their business</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Companies Established</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">48hrs</div>
              <div className="text-sm text-muted-foreground">Average Setup Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">99%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSetupCalculator;
