
import { BusinessSetupData } from '@/pages/BusinessSetupCalculator';

interface CostBreakdown {
  licenseFee: number;
  visaCosts: number;
  officeCosts: number;
  additionalServices: number;
  governmentFees: number;
  total: number;
  timeline: string;
  included: string[];
}

const businessTypeCosts = {
  'trading': { license: 15000, govt: 5000, timeline: '7-10 days' },
  'consulting': { license: 12000, govt: 4000, timeline: '5-7 days' },
  'technology': { license: 18000, govt: 6000, timeline: '10-14 days' },
  'manufacturing': { license: 25000, govt: 8000, timeline: '15-21 days' },
  'restaurant': { license: 20000, govt: 7000, timeline: '14-21 days' },
  'retail': { license: 16000, govt: 5500, timeline: '7-10 days' },
  'real-estate': { license: 22000, govt: 7500, timeline: '10-14 days' },
  'healthcare': { license: 30000, govt: 10000, timeline: '21-30 days' },
  'education': { license: 25000, govt: 8500, timeline: '15-21 days' },
  'logistics': { license: 18000, govt: 6500, timeline: '10-14 days' }
};

const locationMultipliers = {
  'dubai-mainland': 1.0,
  'dubai-freezone': 1.2,
  'abu-dhabi-mainland': 0.9,
  'abu-dhabi-freezone': 1.1,
  'sharjah-mainland': 0.8,
  'sharjah-freezone': 0.9,
  'ajman': 0.7,
  'ras-al-khaimah': 0.75
};

const officeCosts = {
  'virtual': 3000,
  'co-working': 8000,
  'physical': 15000,
  'warehouse': 25000
};

const additionalServiceCosts = {
  'bank-account': 2500,
  'accounting': 4800,
  'vat-registration': 1500,
  'trademark': 3500,
  'digital-signature': 800,
  'immigration': 2000
};

const visaCostPerPerson = 3500;

export const calculateBusinessSetupCost = (data: BusinessSetupData): CostBreakdown => {
  const businessType = businessTypeCosts[data.businessType as keyof typeof businessTypeCosts];
  const locationMultiplier = locationMultipliers[data.location as keyof typeof locationMultipliers] || 1.0;
  
  const licenseFee = Math.round(businessType.license * locationMultiplier);
  const governmentFees = Math.round(businessType.govt * locationMultiplier);
  const visaCosts = data.visaCount * visaCostPerPerson;
  const officeCostAmount = officeCosts[data.officeType as keyof typeof officeCosts] || 0;
  
  const additionalServicesTotal = data.additionalServices.reduce((total, serviceId) => {
    return total + (additionalServiceCosts[serviceId as keyof typeof additionalServiceCosts] || 0);
  }, 0);

  const total = licenseFee + governmentFees + visaCosts + officeCostAmount + additionalServicesTotal;

  const included = [
    'Business license application and approval',
    'Initial approvals and permits',
    'Memorandum of Association (MOA)',
    'Share certificates preparation',
    'Chamber of Commerce registration',
    'Professional consultation throughout the process',
    'Document attestation assistance',
    'Initial legal compliance guidance'
  ];

  return {
    licenseFee,
    visaCosts,
    officeCosts: officeCostAmount,
    additionalServices: additionalServicesTotal,
    governmentFees,
    total,
    timeline: businessType.timeline,
    included
  };
};
