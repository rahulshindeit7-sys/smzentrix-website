import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative">
      {/* Pre-footer CTA Band */}
      <section className="relative bg-gradient-to-r from-primary via-primary/95 to-accent overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground tracking-tight mb-2">
                Ready to transform your clinic?
              </h3>
              <p className="text-primary-foreground/80 text-base max-w-lg">
                Experience how SM Zentrix OPD simplifies your daily workflow.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" variant="secondary" className="h-12 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-smooth whitespace-nowrap">
                <Link to="/contact">
                  Request Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-6 rounded-xl font-semibold border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-smooth whitespace-nowrap backdrop-blur-sm">
                <a href="https://wa.me/919011589198" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <div className="bg-secondary text-secondary-foreground">
        {/* Trust badges strip */}
        <div className="border-b border-secondary-foreground/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-secondary-foreground/70">
              <span className="flex items-center gap-1.5">☁️ Cloud Hosted</span>
              <span className="hidden sm:inline text-secondary-foreground/30">•</span>
              <span className="flex items-center gap-1.5">🔒 Secure Platform</span>
              <span className="hidden sm:inline text-secondary-foreground/30">•</span>
              <span className="flex items-center gap-1.5">📱 Multi-Device</span>
              <span className="hidden sm:inline text-secondary-foreground/30">•</span>
              <span className="flex items-center gap-1.5">💬 WhatsApp Enabled</span>
              <span className="hidden sm:inline text-secondary-foreground/30">•</span>
              <span className="flex items-center gap-1.5">🇮🇳 Made in India</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Brand Column */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80">
                  <span className="text-xl font-bold text-primary-foreground">SZ</span>
                </div>
                <span className="text-xl font-bold">SM Zentrix</span>
              </div>
              <p className="text-sm text-secondary-foreground/70 max-w-xs leading-relaxed">
                Enterprise solutions for healthcare and retail. Reducing complexity, improving operations.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-secondary-foreground/50 mb-5 block">Quick Links</span>
              <ul className="space-y-3">
                <li>
                  <Link to="/products" className="text-sm text-secondary-foreground/70 hover:text-accent hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5">
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 transition-all" />
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm text-secondary-foreground/70 hover:text-accent hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-secondary-foreground/70 hover:text-accent hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-secondary-foreground/50 mb-5 block">Contact</span>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <Mail className="h-4 w-4 mt-0.5 flex-shrink-0 text-accent/70" />
                  <a href="mailto:contact@smzentrix.info" className="text-sm text-secondary-foreground/70 hover:text-accent transition-all duration-200">
                    contact@smzentrix.info
                  </a>
                </li>
                <li className="flex items-start space-x-3">
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0 text-accent/70" />
                  <a href="tel:+919011589198" className="text-sm text-secondary-foreground/70 hover:text-accent transition-all duration-200">
                    +91-9011589198 / +91-8976318505
                  </a>
                </li>
                <li className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-accent/70" />
                  <span className="text-sm text-secondary-foreground/70">
                    Flat No 8, Ajinkya Residency, Near Ankur Hospital, Kodoli, Satara - 415004
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="section-divider mt-10 mb-6" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-secondary-foreground/50">
              © {currentYear} SM Zentrix. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="#" className="text-xs text-secondary-foreground/50 hover:text-secondary-foreground/80 transition-all duration-200">
                Privacy Policy
              </Link>
              <Link to="#" className="text-xs text-secondary-foreground/50 hover:text-secondary-foreground/80 transition-all duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;