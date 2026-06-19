import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-xl font-bold text-primary-foreground">SZ</span>
              </div>
              <span className="text-xl font-bold">SM Zentrix</span>
            </div>
            <p className="text-sm opacity-90 max-w-xs">
              Enterprise solutions for healthcare and retail. Reducing complexity, improving operations.
            </p>
          </div>

          <div>
            <span className="text-sm font-semibold tracking-wide uppercase mb-4 block">Quick Links</span>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-sm opacity-90 hover:opacity-100 hover:text-accent transition-all duration-200">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm opacity-90 hover:opacity-100 hover:text-accent transition-all duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm opacity-90 hover:opacity-100 hover:text-accent transition-all duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-sm font-semibold tracking-wide uppercase mb-4 block">Contact</span>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a href="mailto:contact@smzentrix.info" className="text-sm opacity-90 hover:opacity-100 hover:text-accent transition-all duration-200">
                  contact@smzentrix.info
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a href="tel:+919011589198" className="text-sm opacity-90 hover:opacity-100 hover:text-accent transition-all duration-200">
                  +91-9011589198 / +91-8976318505
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm opacity-90">
                  Flat No 8, Ajinkya Residency, Near Ankur Hospital, Kodoli, Satara - 415004
                </span>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-sm font-semibold tracking-wide uppercase mb-4 block">Follow Us</span>
            <div className="flex space-x-4">
              <a href="#" className="opacity-90 hover:opacity-100 hover:text-accent transition-all duration-200" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="opacity-90 hover:opacity-100 hover:text-accent transition-all duration-200" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="opacity-90 hover:opacity-100 hover:text-accent transition-all duration-200" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-80">
            © {currentYear} SM Zentrix. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="text-sm opacity-80 hover:opacity-100 transition-all duration-200">
              Privacy Policy
            </Link>
            <Link to="#" className="text-sm opacity-80 hover:opacity-100 transition-all duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;