import React from 'react';
import { MessageCircle, Phone, ArrowRight, Clock, MapPin, Mail } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brandConfig';
import { BRAND_IMAGES } from '../assets/images';
import { analytics } from '../utils/analytics';

interface ContactSectionProps {
  onOpenQuote: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenQuote }) => {
  const handleWhatsAppCommercial = () => {
    analytics.track('whatsapp_click', 'contact_section_wa');
    analytics.track('whatsapp_open', 'contact_section');
    window.open(
      BRAND_CONFIG.getWhatsAppUrl('Olá! Gostaria de falar com a equipe da Ambientes Limpos.'),
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handlePhoneAssessoria = () => {
    analytics.track('phone_click', 'contact_section_phone');
    window.open(`tel:${BRAND_CONFIG.contacts.assessoriaClean}`, '_self');
  };

  return (
    <section id="contato" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl bg-[#0b1d3a] text-white overflow-hidden shadow-2xl border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left Column: Visual with the team */}
            <div className="lg:col-span-5 h-80 lg:h-full min-h-[360px] relative overflow-hidden bg-slate-900">
              <img
                src={BRAND_IMAGES.twoGirlsPortrait}
                alt="Profissionais de limpeza da Ambientes Limpos uniformizadas e prontas para atender"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
                loading="lazy"
                width={500}
                height={500}
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0b1d3a] via-[#0b1d3a]/40 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#0b1d3a]/90 backdrop-blur-sm border border-amber-400/30">
                <span className="text-xs font-black text-amber-300 block uppercase">Equipe Profissional e Uniformizada</span>
                <span className="text-xs text-slate-200 font-medium">
                  Mais pessoas • Menos tempo • Mais resultado.
                </span>
              </div>
            </div>

            {/* Right Column: Contact info & actions */}
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-8">
              
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  Canais Diretos de Atendimento
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
                  FALE COM NOSSA EQUIPE
                </h2>
                <p className="text-slate-300 text-sm sm:text-base font-medium">
                  Atendimento direto para residências, comércios e empresas em São Paulo.
                </p>
              </div>

              {/* 2 Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* WhatsApp Comercial */}
                <div
                  onClick={handleWhatsAppCommercial}
                  className="p-5 rounded-2xl bg-white/5 border border-emerald-400/40 hover:border-emerald-400 hover:bg-emerald-500/10 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-semibold uppercase">WhatsApp Comercial</div>
                      <div className="text-base font-extrabold text-white">
                        {BRAND_CONFIG.contacts.whatsappCommercial}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-emerald-400 font-medium flex items-center gap-1 mt-2">
                    <span>Clique para iniciar conversa</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Assessoria */}
                <div
                  onClick={handlePhoneAssessoria}
                  className="p-5 rounded-2xl bg-white/5 border border-amber-400/40 hover:border-amber-400 hover:bg-amber-400/10 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-semibold uppercase">Assessoria / Contratos</div>
                      <div className="text-base font-extrabold text-white">
                        {BRAND_CONFIG.contacts.assessoria}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-amber-300 font-medium flex items-center gap-1 mt-2">
                    <span>Ligue para nossa assessoria</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  id="contact-section-quote-btn"
                  onClick={handleWhatsAppCommercial}
                  className="px-8 py-4 rounded-xl text-slate-950 font-black text-xs uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg cursor-pointer text-center flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Orçar pelo WhatsApp</span>
                </button>

                <button
                  id="contact-section-wa-btn"
                  onClick={handlePhoneAssessoria}
                  className="px-7 py-4 rounded-xl text-white font-bold text-xs uppercase tracking-wider bg-white/10 hover:bg-white/20 border border-white/20 shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Ligar para Assessoria</span>
                </button>
              </div>

              {/* Hours note */}
              <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Atendimento: Seg a Sex 08h-18h | Sáb 08h-13h</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
