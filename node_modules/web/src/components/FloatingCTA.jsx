import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ArrowRight, X } from 'lucide-react';

function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.8 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
        >
          {/* Expandable demo request pill */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3 bg-card border border-border/60 shadow-premium rounded-2xl px-5 py-3 backdrop-blur-md"
              >
                <div className="text-sm">
                  <p className="font-bold text-foreground">Request a Free Demo</p>
                  <p className="text-xs text-muted-foreground">See SM Zentrix OPD in action</p>
                </div>
                <a
                  href="/contact"
                  className="flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-bold px-4 py-2 rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-smooth whitespace-nowrap"
                >
                  Book Demo
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <button
                  onClick={() => setDismissed(true)}
                  className="text-muted-foreground hover:text-foreground transition-smooth p-1"
                  aria-label="Dismiss"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* WhatsApp FAB */}
          <div className="relative">
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-full bg-emerald-500/30 animate-pulse-ring" />
            <button
              onClick={() => setExpanded(!expanded)}
              onMouseEnter={() => setExpanded(true)}
              className="relative flex items-center justify-center h-14 w-14 rounded-full bg-emerald-500 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-smooth"
              aria-label="Contact us on WhatsApp"
            >
              <MessageCircle className="h-6 w-6 fill-white/20" />
            </button>
          </div>

          {/* Quick WhatsApp link on mobile */}
          <a
            href="https://wa.me/919011589198"
            target="_blank"
            rel="noopener noreferrer"
            className="sr-only sm:not-sr-only absolute -left-2 bottom-0 flex items-center gap-2 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md opacity-0 sm:group-hover:opacity-100 transition-smooth pointer-events-none sm:pointer-events-auto"
          >
            WhatsApp
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FloatingCTA;
