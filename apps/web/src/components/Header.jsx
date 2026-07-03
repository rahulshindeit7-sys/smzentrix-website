import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Home, Package, Briefcase, Info, PhoneCall, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from './ThemeToggle';

function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/', hash: '', description: 'Welcome to our enterprise platform', icon: Home },
    { name: 'Products', path: '/products', description: 'Explore our modular systems', icon: Package },
    { name: 'Services', path: '/', hash: '#services', description: 'Custom web services and automation', icon: Briefcase },
    { name: 'About', path: '/about', description: 'Our story, values, and leadership', icon: Info },
    { name: 'Contact', path: '/contact', description: 'Get in touch with our team', icon: PhoneCall }
  ];

  const isActive = (link) => {
    if (typeof link.hash !== 'undefined') {
      return location.pathname === link.path && location.hash === link.hash;
    }
    return location.pathname === link.path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 glass-panel transition-smooth">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 group-hover:scale-105 transition-smooth">
              <span className="text-xl font-bold text-primary-foreground">SZ</span>
            </div>
            <span className="text-xl font-bold tracking-tight group-hover:text-primary transition-smooth">SM Zentrix</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={`${link.path}${link.hash || ''}`}
                to={link.hash ? `${link.path}${link.hash}` : link.path}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-smooth hover:scale-105 ${
                  isActive(link)
                    ? 'text-primary bg-primary/10 shadow-sm'
                    : 'text-foreground/80 hover:text-primary hover:bg-muted/80'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button asChild className="shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5 transition-smooth rounded-lg px-6">
              <Link to="/contact">Get Started</Link>
            </Button>
          </div>

          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-muted/80 transition-smooth">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] sm:w-[400px] glass-panel border-l border-border/40 flex flex-col h-full justify-between p-6">
                <div className="flex flex-col space-y-6 mt-8 overflow-y-auto pr-2">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <span className="font-bold text-sm">SZ</span>
                    </div>
                    <span className="text-lg font-bold tracking-tight">SM Zentrix</span>
                  </div>
                  <nav className="flex flex-col space-y-3">
                    {navLinks.map((link) => {
                      const LinkIcon = link.icon;
                      return (
                        <Link
                          key={`${link.path}${link.hash || ''}`}
                          to={link.hash ? `${link.path}${link.hash}` : link.path}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-start space-x-4 p-4 rounded-2xl transition-smooth ${
                            isActive(link)
                              ? 'bg-primary/10 text-primary shadow-sm border border-primary/10'
                              : 'text-foreground/80 hover:text-primary hover:bg-muted/80 hover:translate-x-1 border border-transparent'
                          }`}
                        >
                          <div className={`p-2 rounded-xl ${isActive(link) ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                            <LinkIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="block font-semibold text-base">{link.name}</span>
                            <span className="block text-xs text-muted-foreground mt-0.5 leading-snug">{link.description}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </nav>
                </div>
                
                <div className="border-t border-border/40 pt-6 mt-auto space-y-6">
                  <div className="space-y-3">
                    <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Get in touch</p>
                    <div className="space-y-2.5">
                      <a href="mailto:contact@smzentrix.info" className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary transition-smooth p-1.5 hover:bg-muted/50 rounded-lg">
                        <Mail className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">contact@smzentrix.info</span>
                      </a>
                      <a href="tel:+919011589198" className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary transition-smooth p-1.5 hover:bg-muted/50 rounded-lg">
                        <Phone className="h-4 w-4 flex-shrink-0" />
                        <span>+91-9011589198</span>
                      </a>
                    </div>
                  </div>
                  <Button asChild className="w-full shadow-premium rounded-xl h-12 text-base">
                    <Link to="/contact" onClick={() => setIsOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;