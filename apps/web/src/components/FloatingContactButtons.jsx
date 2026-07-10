import React from 'react';
import { MessageCircle, PhoneCall } from 'lucide-react';

function FloatingContactButtons() {
  return (
    <div className="fixed bottom-5 right-4 z-[70] flex flex-col gap-3">
      <a
        href="https://wa.me/919011589198?text=Hi%20SM%20Zentrix%2C%20I%20want%20a%20demo"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/40 transition-transform duration-200 hover:scale-105 hover:bg-emerald-600"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      <a
        href="tel:+919011589198"
        aria-label="Call SM Zentrix"
        className="group flex h-12 w-12 items-center justify-center rounded-full bg-sky-600 text-white shadow-lg shadow-sky-600/40 transition-transform duration-200 hover:scale-105 hover:bg-sky-700"
      >
        <PhoneCall className="h-6 w-6" />
      </a>
    </div>
  );
}

export default FloatingContactButtons;