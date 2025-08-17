
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Building2, Users, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              UAE Business Setup Made Simple
            </h1>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Your trusted partner for business setup services in UAE. 
              Get instant cost estimates, expert guidance, and end-to-end support.
            </p>
            <Link to="/calculator">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-3">
                <Calculator className="mr-2 h-5 w-5" />
                Get Free Cost Estimate
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Features Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Business Setup Services?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We've helped over 500 businesses establish themselves successfully in the UAE
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Expert Guidance</CardTitle>
              <CardDescription>
                Professional consultation from licensed business setup experts with 10+ years experience
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>End-to-End Support</CardTitle>
              <CardDescription>
                Complete assistance from business registration to bank account opening and beyond
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Fast Processing</CardTitle>
              <CardDescription>
                Quick turnaround times with our streamlined processes and government connections
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardContent className="p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your UAE Business?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Use our free cost calculator to get an instant estimate for your business setup requirements. 
                No hidden fees, transparent pricing.
              </p>
              <div className="flex items-center justify-center gap-6 mb-6">
                {['Free Consultation', 'Transparent Pricing', 'Expert Support', '500+ Success Stories'].map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <Link to="/calculator">
                <Button size="lg" className="px-8">
                  Calculate Setup Costs Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 mt-16 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-sm text-muted-foreground">Companies Established</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">48hrs</div>
            <div className="text-sm text-muted-foreground">Average Setup Time</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">99%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Customer Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
