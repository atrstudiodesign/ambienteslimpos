import React from 'react';
import { MessageCircle, Phone, ArrowRight, ShieldCheck, Heart, Sparkles, Star } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brandConfig';
import { BRAND_IMAGES } from '../assets/images';
import { AmbientesLimposLogo } from './AmbientesLimposLogo';
import { analytics } from '../utils/analytics';

interface HeroProps {
  onOpenQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote }) => {
  const handleWhatsApp = (context = 'hero_cta') => {
    analytics.track('whatsapp_click', context);
    analytics.track('whatsapp_open', 'hero');
    window.open(
      BRAND_CONFIG.getWhatsAppUrl('Olá! Gostaria de solicitar um orçamento para limpeza residencial/empresarial com a Ambientes Limpos.'),
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handlePhoneAssessoria = () => {
    analytics.track('phone_click', 'hero_assessoria');
    window.open(`tel:${BRAND_CONFIG.contacts.assessoriaClean}`, '_self');
  };

  return (
    <section
      id="inicio"
      className="relative pt-24 sm:pt-28 pb-14 sm:pb-20 bg-gradient-to-b from-[#08182f] via-[#0b2447] to-[#071933] text-white overflow-hidden"
    >
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Tagline Row from the Official Flyer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-6 sm:mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-300">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Padrão Oficial de Higienização e Cuidado</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 tracking-wider">
            <span className="text-white">ESPAÇOS MAIS LIMPOS</span>
            <span>•</span>
            <span className="text-cyan-300">PESSOAS MAIS FELIZES</span>
            <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Official Logo, Headlines & Direct CTA */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Logo oficial fiel à marca */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 inline-block shadow-xl">
              <AmbientesLimposLogo variant="light" size="lg" showSlogan={true} />
            </div>

            {/* Main Headline reproducing the flyer typography */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] uppercase">
                <span className="text-white block">{BRAND_CONFIG.headline.part1}</span>
                <span className="text-cyan-400 block drop-shadow-md">{BRAND_CONFIG.headline.part2}</span>
                <span className="text-white block">{BRAND_CONFIG.headline.highlight}</span>
              </h1>
            </div>

            {/* Subheadline & Description */}
            <div className="space-y-2 max-w-xl">
              <p className="text-lg sm:text-xl font-bold text-amber-300 tracking-wide">
                {BRAND_CONFIG.subheadline}
              </p>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Limpeza profissional com organização, eficiência e cuidado em cada detalhe. Mais pessoas, menos tempo e mais resultado no seu imóvel.
              </p>
            </div>

            {/* Action Buttons to +5511939026928 */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                id="hero-cta-quote"
                onClick={() => handleWhatsApp('hero_primary_orcamento')}
                className="px-8 py-4 rounded-xl text-slate-950 font-black text-sm uppercase tracking-wider bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/25 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-amber-300/40"
              >
                <span>SOLICITE SEU ORÇAMENTO</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-cta-whatsapp"
                onClick={() => handleWhatsApp('hero_whatsapp_btn')}
                className="px-7 py-4 rounded-xl font-bold text-sm tracking-wide text-white bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-lg shadow-emerald-900/30 border border-emerald-400/30"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>WhatsApp: (11) 93902-6928</span>
              </button>
            </div>

            {/* Quick Contact & Assessoria Badge */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => handleWhatsApp('hero_card_wa')}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-300 font-medium">WhatsApp Comercial</div>
                  <div className="text-sm font-extrabold text-white tracking-wide">
                    {BRAND_CONFIG.contacts.whatsappCommercial}
                  </div>
                </div>
              </div>

              <div
                onClick={handlePhoneAssessoria}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-300 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-300 font-medium">Assessoria ATR Studio</div>
                  <div className="text-sm font-extrabold text-white tracking-wide">
                    {BRAND_CONFIG.contacts.assessoria}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Exact Photography of the Two Specialists in Uniform */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Golden and Cyan Ambient Halo */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-500/30 via-amber-400/20 to-sky-400/30 rounded-3xl blur-xl opacity-75" />

              <div className="relative rounded-3xl overflow-hidden border-2 border-amber-400/40 bg-slate-900 shadow-2xl">
                <img
                  src={BRAND_IMAGES.heroTeam}
                  alt="Profissionais especialistas da Ambientes Limpos uniformizadas com avental oficial e luvas azuis"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover object-center transform hover:scale-102 transition-transform duration-500"
                  loading="eager"
                  width={600}
                  height={500}
                />

                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#08182f]/90 backdrop-blur-md border border-amber-400/30 shadow-xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0 border border-cyan-400/30">
                      <ShieldCheck className="w-6 h-6 text-cyan-300" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-white uppercase tracking-wider">
                        Equipe Oficial Ambientes Limpos
                      </div>
                      <p className="text-[11px] text-cyan-300 font-medium">
                        Uniformizadas • Luvas • Produtos Profissionais
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleWhatsApp('hero_image_badge_wa')}
                    className="shrink-0 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs uppercase cursor-pointer"
                  >
                    Chamar
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Sweeping Golden Wave Divider to mirror the banner */}
      <div className="relative w-full mt-10 -mb-2 overflow-hidden leading-none">
        <svg
          className="relative block w-full h-10 sm:h-14"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C300,90 900,90 1200,0 L1200,120 L0,120 Z"
            fill="#091b34"
          />
          <path
            d="M0,0 C300,90 900,90 1200,0"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3"
          />
        </svg>
      </div>
    </section>
  );
};
