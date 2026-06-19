import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

function TestimonialCard({ testimonial, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="break-inside-avoid mb-8"
    >
      <Card className="shadow-premium hover:shadow-premium-hover hover:-translate-y-2 transition-smooth border border-border/50 bg-card/80 backdrop-blur-sm group">
        <CardContent className="pt-8 pb-8 px-8">
          <Quote className="h-10 w-10 text-primary/20 mb-6 group-hover:text-primary/40 group-hover:scale-110 transition-smooth origin-top-left" />
          <p className="text-lg leading-relaxed mb-8 italic text-foreground/90">
            "{testimonial.quote}"
          </p>
          <div className="flex items-center justify-between pt-6 border-t border-border/50">
            <div>
              <p className="font-bold text-foreground">{testimonial.author}</p>
              <p className="text-sm font-medium text-primary/80">{testimonial.role}</p>
              <p className="text-sm text-muted-foreground">{testimonial.company}</p>
            </div>
            {testimonial.metric && (
              <div className="text-right bg-primary/5 px-4 py-2 rounded-xl group-hover:bg-primary/10 transition-smooth">
                <p className="text-2xl font-extrabold text-primary">{testimonial.metric}</p>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{testimonial.metricLabel}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default TestimonialCard;