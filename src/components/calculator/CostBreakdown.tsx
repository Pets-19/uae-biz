
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FileText, Calculator, CheckCircle, ArrowLeft } from 'lucide-react';
import { BusinessSetupData } from '@/pages/BusinessSetupCalculator';

interface CostBreakdownProps {
  breakdown: {
    licenseFee: number;
    visaCosts: number;
    officeCosts: number;
    additionalServices: number;
    governmentFees: number;
    total: number;
    timeline: string;
    included: string[];
  };
  businessData: BusinessSetupData;
  onGetQuote: () => void;
  onRecalculate: () => void;
}

export const CostBreakdown: React.FC<CostBreakdownProps> = ({ 
  breakdown, 
  businessData, 
  onGetQuote, 
  onRecalculate 
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const costItems = [
    { label: 'Business License Fee', amount: breakdown.licenseFee },
    { label: `Visa Costs (${businessData.visaCount} visas)`, amount: breakdown.visaCosts },
    { label: 'Office Setup Costs', amount: breakdown.officeCosts },
    { label: 'Government Fees & Approvals', amount: breakdown.governmentFees },
    { label: 'Additional Services', amount: breakdown.additionalServices },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Your Business Setup Cost Estimate
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                Based on your requirements for {businessData.businessType} business in {businessData.location}
              </p>
            </div>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {breakdown.timeline}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {costItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2">
                <span className="text-sm">{item.label}</span>
                <span className="font-medium">{formatCurrency(item.amount)}</span>
              </div>
            ))}
            
            <Separator />
            
            <div className="flex justify-between items-center py-3 text-lg font-bold">
              <span>Total Estimated Cost</span>
              <span className="text-primary">{formatCurrency(breakdown.total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              What's Included
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {breakdown.included.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Important Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-muted-foreground space-y-2">
              <p>• This is an estimated cost based on standard requirements</p>
              <p>• Actual costs may vary based on specific business activities</p>
              <p>• Free zone costs may include additional benefits</p>
              <p>• Government fees are subject to change</p>
              <p>• Professional consultation recommended for complex cases</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 justify-center">
        <Button variant="outline" onClick={onRecalculate} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Recalculate
        </Button>
        <Button onClick={onGetQuote} size="lg" className="px-8">
          Get Detailed Quote & Expert Consultation
        </Button>
      </div>

      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="font-bold text-lg mb-2">Ready to Start Your UAE Business?</h3>
            <p className="text-muted-foreground mb-4">
              Get a personalized consultation with our business setup experts. 
              We'll help you navigate the process step by step.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Expert Guidance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>End-to-End Support</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
