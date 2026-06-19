import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function FeatureCard({ feature, index }) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <Card className="h-full shadow-premium hover:shadow-premium-hover hover:-translate-y-2 transition-smooth border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
        <CardHeader className="relative z-10 pb-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-smooth shadow-sm">
              <Icon className="h-7 w-7" />
            </div>
          </div>
          <CardTitle className="text-2xl tracking-tight group-hover:text-primary transition-smooth">{feature.title}</CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <CardDescription className="text-base leading-relaxed text-muted-foreground/90">
            {feature.description}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default FeatureCard;