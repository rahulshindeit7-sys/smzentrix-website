import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

function PricingSection() {
  const pricingTiers = [{
    name: 'Starter',
    price: '$89',
    period: '/month',
    description: 'Perfect for small clinics and retail stores',
    features: ['Up to 100 patients/customers per month', 'Basic reporting and analytics', 'Email support', 'Mobile app access', '2 user accounts', 'Data backup weekly'],
    cta: 'Start free trial',
    variant: 'outline'
  }, {
    name: 'Professional',
    price: '$247',
    period: '/month',
    description: 'Ideal for growing healthcare and retail businesses',
    features: ['Unlimited patients/customers', 'Advanced analytics and insights', 'Priority support (24/7)', 'Mobile and web access', 'Unlimited user accounts', 'Daily data backup', 'Custom integrations', 'API access', 'Dedicated account manager'],
    cta: 'Get started',
    variant: 'default',
    highlighted: true,
    badge: 'Most Popular'
  }, {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Tailored solutions for large organizations',
    features: ['Everything in Professional', 'Custom feature development', 'On-premise deployment option', 'Advanced security features', 'SLA guarantee', 'White-label options', 'Training and onboarding', 'Dedicated support team'],
    cta: 'Contact sales',
    variant: 'outline'
  }];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Simple, transparent pricing</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Choose the plan that fits your business needs. All plans include core features and dedicated support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {pricingTiers.map((tier, index) => (
            <motion.div 
              key={tier.name} 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-50px" }} 
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }} 
              className={`h-full ${tier.highlighted ? 'md:-mt-8 md:mb-8 relative z-10' : ''}`}
            >
              <Card className={`h-full flex flex-col transition-smooth border-border/50 bg-card/80 backdrop-blur-sm group ${
                tier.highlighted 
                  ? 'ring-2 ring-primary shadow-premium-hover scale-105' 
                  : 'shadow-premium hover:shadow-premium-hover hover:-translate-y-2'
              }`}>
                {tier.highlighted && (
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-accent rounded-t-xl" />
                )}
                <CardHeader className="pb-8 pt-8">
                  {tier.badge && (
                    <Badge className="w-fit mb-4 bg-primary/10 text-primary hover:bg-primary/20 transition-smooth px-3 py-1 rounded-full border-none">
                      {tier.badge}
                    </Badge>
                  )}
                  <CardTitle className="text-2xl tracking-tight">{tier.name}</CardTitle>
                  <CardDescription className="text-base mt-2">{tier.description}</CardDescription>
                  <div className="mt-6 flex items-baseline">
                    <span className="text-5xl font-extrabold tracking-tight text-foreground">{tier.price}</span>
                    {tier.period && <span className="text-lg text-muted-foreground ml-2 font-medium">{tier.period}</span>}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-4">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <div className={`mt-0.5 p-1 rounded-full ${tier.highlighted ? 'bg-primary/20' : 'bg-muted'}`}>
                          <Check className={`h-4 w-4 flex-shrink-0 ${tier.highlighted ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        <span className="text-foreground/80 leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto pt-8 pb-8">
                  <Button 
                    className={`w-full h-14 text-lg font-semibold rounded-xl transition-smooth shadow-md hover:shadow-lg hover:-translate-y-0.5 ${
                      tier.highlighted ? 'bg-primary hover:bg-primary/90' : ''
                    }`} 
                    variant={tier.highlighted ? 'default' : tier.variant}
                  >
                    {tier.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;