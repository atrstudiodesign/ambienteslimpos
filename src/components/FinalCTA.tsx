import React from 'react';
import { ArrowRight, MessageCircle, Phone, Sparkles, Heart } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brandConfig';
import { AmbientesLimposLogo } from './AmbientesLimposLogo';
import { analytics } from '../utils/analytics';

interface FinalCTAProps {
  onOpenQuote: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenQuote }) => {
  const handleWhatsApp = (context = 'final_cta') => {
    analytics.track('whatsapp_click', context);
    analytics.track('whatsapp_open', 'final_cta');
    window.open(
      BRAND_CONFIG.getWhatsAppUrl('Olá! Gostaria de solicitar um orçamento para o meu ambiente com a Ambientes Limpos.'),
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handlePhoneAssessoria = () => {
    analytics.track('phone_click', 'final_cta_assessoria');
    window.open(`tel:${BRAND_CONFIG.contacts.assessoriaClean}`, '_self');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#08182f] via-[#0a1e38] to-[#061426] text-white relative overflow-hidden border-t-2 border-amber-400/30">
      {/* Background ambient accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.15),transparent_50%)]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        {/* Logo oficial fiel */}
        <div className="flex justify-center">
          <AmbientesLimposLogo variant="light" size="lg" showSlogan={true} />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-400/30 shadow-md">
          <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>Mais tempo para você, nós cuidamos do seu ambiente!</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-tight">
          SEU AMBIENTE MERECE MAIS CUIDADO.
        </h2>

        <div className="text-lg sm:text-xl md:text-2xl text-slate-200 font-bold space-y-1">
          <p>Mais pessoas • Menos tempo • <span className="text-cyan-400">Mais resultado.</span></p>
        </div>

        {/* CTA Buttons to +5511939026928 */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="final-cta-solicitar-orcamento"
            onClick={() => handleWhatsApp('final_cta_primary')}
            className="w-full sm:w-auto px-10 py-4 rounded-xl text-slate-950 font-black uppercase text-xs sm:text-sm tracking-wider bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-2xl shadow-amber-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-300/40"
          >
            <span>SOLICITE SEU ORÇAMENTO NO WHATSAPP</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="final-cta-whatsapp-btn"
            onClick={() => handleWhatsApp('final_cta_wa_btn')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-white font-bold uppercase text-xs sm:text-sm tracking-wider bg-emerald-600 hover:bg-emerald-500 shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 border border-emerald-400/30"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Falar no WhatsApp: (11) 93902-6928</span>
          </button>
        </div>

        {/* Phone details */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">WhatsApp Direto:</span>
            <button
              onClick={() => handleWhatsApp('footer_link_wa')}
              className="text-cyan-300 hover:underline font-mono font-bold text-sm cursor-pointer"
            >
              (11) 93902-6928
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Assessoria ATR Studio:</span>
            <button
              onClick={handlePhoneAssessoria}
              className="text-amber-300 hover:underline font-mono font-bold text-sm cursor-pointer"
            >
              (11) 93902-6928
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
