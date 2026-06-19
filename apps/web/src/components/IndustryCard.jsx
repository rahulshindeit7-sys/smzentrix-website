import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

function IndustryCard({ industry, index, imageUrl }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="mb-24 group"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
        {index % 2 === 0 ? (
          <>
            <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-premium group-hover:shadow-premium-hover transition-smooth">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                src={imageUrl}
                alt={industry.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <Badge className="mb-3 bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border-none px-4 py-1.5 text-sm rounded-full transition-smooth">
                  {industry.category}
                </Badge>
                <h3 className="text-4xl font-bold text-white tracking-tight">{industry.name}</h3>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-card/50 backdrop-blur-sm p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-md transition-smooth">
                <p className="font-bold text-lg mb-4 flex items-center text-foreground/90">
                  <span className="w-8 h-1 bg-destructive/60 rounded-full mr-3"></span>
                  Challenges
                </p>
                <ul className="space-y-3">
                  {industry.challenges.map((challenge, idx) => (
                    <li key={idx} className="text-muted-foreground leading-relaxed">{challenge}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10 shadow-sm hover:shadow-md transition-smooth">
                <p className="font-bold text-lg mb-4 flex items-center text-primary">
                  <span className="w-8 h-1 bg-primary rounded-full mr-3"></span>
                  Our Solutions
                </p>
                <ul className="space-y-4">
                  {industry.solutions.map((solution, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <div className="mt-1 bg-primary/20 p-1 rounded-full">
                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      </div>
                      <span className="text-foreground/90 font-medium leading-relaxed">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-2">Key Benefits</p>
                <p className="text-lg text-foreground/80 leading-relaxed border-l-4 border-accent pl-4 py-1">{industry.benefits}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="order-2 md:order-1 space-y-8">
              <div className="bg-card/50 backdrop-blur-sm p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-md transition-smooth">
                <p className="font-bold text-lg mb-4 flex items-center text-foreground/90">
                  <span className="w-8 h-1 bg-destructive/60 rounded-full mr-3"></span>
                  Challenges
                </p>
                <ul className="space-y-3">
                  {industry.challenges.map((challenge, idx) => (
                    <li key={idx} className="text-muted-foreground leading-relaxed">{challenge}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10 shadow-sm hover:shadow-md transition-smooth">
                <p className="font-bold text-lg mb-4 flex items-center text-primary">
                  <span className="w-8 h-1 bg-primary rounded-full mr-3"></span>
                  Our Solutions
                </p>
                <ul className="space-y-4">
                  {industry.solutions.map((solution, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <div className="mt-1 bg-primary/20 p-1 rounded-full">
                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      </div>
                      <span className="text-foreground/90 font-medium leading-relaxed">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-2">Key Benefits</p>
                <p className="text-lg text-foreground/80 leading-relaxed border-l-4 border-accent pl-4 py-1">{industry.benefits}</p>
              </div>
            </div>
            <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-premium group-hover:shadow-premium-hover transition-smooth order-1 md:order-2">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                src={imageUrl}
                alt={industry.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <Badge className="mb-3 bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border-none px-4 py-1.5 text-sm rounded-full transition-smooth">
                  {industry.category}
                </Badge>
                <h3 className="text-4xl font-bold text-white tracking-tight">{industry.name}</h3>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default IndustryCard;