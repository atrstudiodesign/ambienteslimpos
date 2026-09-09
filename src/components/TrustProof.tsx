import React from 'react';
import { Clock, ShieldCheck, Sparkles, CheckCircle2, FileText, Heart } from 'lucide-react';

export const TrustProof: React.FC = () => {
  const badges = [
    {
      title: 'Agilidade e pontualidade',
      desc: 'Cumprimento rigoroso dos horários e janelas acordadas.',
      icon: Clock,
    },
    {
      title: 'Profissionais treinadas',
      desc: 'Equipe uniformizada, capacitada e com postura profissional.',
      icon: ShieldCheck,
    },
    {
      title: 'Qualidade e organização',
      desc: 'Cuidado em cada detalhe, ambiente limpo e acolhedor.',
      icon: Sparkles,
    },
    {
      title: 'Serviços com eficiência e confiança',
      desc: 'Metodologia testada para residências e empresas.',
      icon: CheckCircle2,
    },
    {
      title: 'Emitimos nota fiscal de serviços',
      desc: '100% regularizada via assessoria ATR Studio (CNPJ).',
      icon: FileText,
    },
  ];

  return (
    <section id="confianca" className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* 5 Badges bar directly from the flyer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-white hover:shadow-md transition-all text-center flex flex-col items-center justify-center group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0a1e38] text-amber-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-black text-[#0a1e38] uppercase tracking-tight mb-1">
                  {badge.title}
                </h3>
                <p className="text-[11px] text-slate-600 leading-snug">
                  {badge.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Tagline ribbon from the bottom of the flyer */}
        <div className="rounded-2xl bg-gradient-to-r from-[#0a1e38] via-[#0e2c54] to-[#0a1e38] text-white py-4 px-6 text-center border-2 border-amber-400/40 shadow-lg flex items-center justify-center gap-2">
          <Heart className="w-5 h-5 text-red-400 fill-red-400 shrink-0" />
          <span className="text-sm sm:text-base font-black tracking-wide text-white">
            Mais tempo para você, nós cuidamos do seu ambiente!
          </span>
          <Sparkles className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0" />
        </div>

      </div>
    </section>
  );
};
