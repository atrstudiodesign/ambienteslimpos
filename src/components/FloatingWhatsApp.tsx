import React from 'react';
import { MessageCircle } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brandConfig';
import { analytics } from '../utils/analytics';

export const FloatingWhatsApp: React.FC = () => {
  const handleClick = () => {
    analytics.track('whatsapp_click', 'floating_button');
    analytics.track('whatsapp_open', 'floating');
    window.open(
      BRAND_CONFIG.getWhatsAppUrl('Olá! Gostaria de tirar dúvidas e solicitar um orçamento com a Ambientes Limpos.'),
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <button
      id="floating-whatsapp-btn"
      onClick={handleClick}
      aria-label="Falar pelo WhatsApp com a Ambientes Limpos"
      className="fixed bottom-6 right-6 z-40 p-3.5 sm:p-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-2xl hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 cursor-pointer group"
    >
      <MessageCircle className="w-6 h-6 fill-white text-emerald-500 group-hover:scale-110 transition-transform" />
      <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider pr-1">
        WhatsApp
      </span>
      
      {/* Subtle ping indicator */}
      <span className="absolute top-1 right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
      </span>
    </button>
  );
};
