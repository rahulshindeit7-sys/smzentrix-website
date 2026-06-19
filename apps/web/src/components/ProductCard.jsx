import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

function ProductCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <Card className="h-full flex flex-col shadow-premium hover:shadow-premium-hover hover:-translate-y-2 transition-smooth border border-border/50 bg-card/80 backdrop-blur-sm group overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-smooth" />
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary" className="bg-secondary/20 text-secondary-foreground hover:bg-secondary/30 transition-smooth px-3 py-1 rounded-full">
              {product.category}
            </Badge>
            {product.icon && (
              <div className="p-2 rounded-xl bg-primary/5 group-hover:bg-primary/10 group-hover:scale-110 transition-smooth">
                <product.icon className="h-6 w-6 text-primary" />
              </div>
            )}
          </div>
          <CardTitle className="text-2xl tracking-tight group-hover:text-primary transition-smooth">{product.name}</CardTitle>
          <CardDescription className="text-base mt-2 leading-relaxed">{product.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="space-y-6">
            {product.features && (
              <div className="bg-muted/30 p-5 rounded-2xl border border-border/40">
                <p className="font-bold mb-3 text-sm uppercase tracking-wider text-foreground/80">Key Features</p>
                <ul className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-sm">
                      <div className="mt-0.5 bg-primary/10 p-1 rounded-full">
                        <Check className="h-3 w-3 text-primary flex-shrink-0" />
                      </div>
                      <span className="text-foreground/80 leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {product.benefits && (
              <div>
                <p className="font-bold mb-2 text-sm uppercase tracking-wider text-foreground/80">Benefits</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{product.benefits}</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="mt-auto pt-6">
          <Button className="w-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-smooth rounded-xl h-12 text-base font-semibold group-hover:bg-primary/90">
            Learn More
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default ProductCard;