import React from 'react';
import { Briefcase, Building, Building2, PhoneCall, ArrowRight, ShieldCheck, MessageCircle } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brandConfig';
import { analytics } from '../utils/analytics';

interface CorporateSolutionsProps {
  onOpenQuote: (type: string) => void;
}

export const CorporateSolutions: React.FC<CorporateSolutionsProps> = ({ onOpenQuote }) => {
  const tiers = [
    {
      id: 'pequeno',
      title: 'PEQ. PORTE',
      desc: 'Orçamento conforme metragem e rotina',
      icon: Briefcase,
      points: [
        'Salas comerciais, consultórios e lojas',
        'Frequência semanal, quinzenal ou avulsa',
        'Equipe ágil de 1 a 2 profissionais',
        'Materiais e cronograma personalizados',
      ],
    },
    {
      id: 'medio',
      title: 'MÉDIO PORTE',
      desc: 'Equipe definida conforme demanda',
      icon: Building,
      popular: true,
      points: [
        'Escritórios corporativos e andares comerciais',
        'Cronograma flexível (manhã ou tarde)',
        'Equipe coordenada com supervisão técnica',
        'Emissão de Nota Fiscal de Serviços',
      ],
    },
    {
      id: 'grande',
      title: 'GRANDE PORTE',
      desc: 'Atendimento sob avaliação técnica',
      icon: Building2,
      points: [
        'Sedes empresariais, galpões e showrooms',
        'Equipes de 4 ou mais colaboradoras',
        'Planejamento de rotinas e SLA prioritário',
        'Contrato corporativo via ATR Studio Assessoria',
      ],
    },
  ];

  const handleWhatsApp = (tierTitle: string) => {
    analytics.track('whatsapp_click', `corporate_${tierTitle}`);
    window.open(
      BRAND_CONFIG.getWhatsAppUrl(`Olá! Gostaria de consultar assessoria para o plano EMPRESAS (${tierTitle}) da Ambientes Limpos.`),
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleAssessoriaCall = () => {
    analytics.track('phone_click', 'corporate_assessoria');
    window.open(`tel:${BRAND_CONFIG.contacts.assessoriaClean}`, '_self');
  };

  return (
    <section id="empresas" className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching the flyer styling */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-black uppercase tracking-wider">
            <span>Facilities & Atendimento Corporativo</span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <span className="h-[2px] w-12 bg-amber-400" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0a1e38] tracking-tight uppercase">
              EMPRESAS
            </h2>
            <span className="h-[2px] w-12 bg-amber-400" />
          </div>

          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Estrutura sob medida para comércios, escritórios e grandes ambientes corporativos em São Paulo.
          </p>
        </div>

        {/* 3 cards with golden highlight frame from flyer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.id}
                id={`tier-card-${tier.id}`}
                className={`rounded-2xl p-7 border-2 transition-all duration-300 flex flex-col justify-between relative ${
                  tier.popular
                    ? 'bg-[#0a1e38] text-white border-amber-400 shadow-xl'
                    : 'bg-white border-slate-200 hover:border-amber-400/70 hover:shadow-lg'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow">
                    Mais Solicitado
                  </div>
                )}

                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                    tier.popular ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30' : 'bg-[#0a1e38] text-cyan-300'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className={`text-xl font-black tracking-wide mb-1 uppercase ${
                    tier.popular ? 'text-amber-300' : 'text-[#0a1e38]'
                  }`}>
                    {tier.title}
                  </h3>

                  <p className={`text-sm font-semibold mb-6 ${
                    tier.popular ? 'text-slate-200' : 'text-slate-700'
                  }`}>
                    {tier.desc}
                  </p>

                  <div className={`space-y-2.5 border-t pt-5 ${
                    tier.popular ? 'border-white/10' : 'border-slate-100'
                  }`}>
                    {tier.points.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        <ShieldCheck className={`w-4 h-4 shrink-0 mt-0.5 ${
                          tier.popular ? 'text-cyan-400' : 'text-cyan-600'
                        }`} />
                        <span className={tier.popular ? 'text-slate-300' : 'text-slate-600'}>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    onClick={() => handleWhatsApp(tier.title)}
                    className={`w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm ${
                      tier.popular
                        ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                        : 'bg-[#0a1e38] hover:bg-[#0e2c54] text-white'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Falar no WhatsApp</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navy banner pill from the flyer */}
        <div className="rounded-2xl bg-[#0a1e38] text-white p-5 sm:p-6 border-2 border-amber-400/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 border border-cyan-400/30">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-cyan-300 font-bold">
                Atendimento Corporativo Personalizado
              </p>
              <h4 className="text-base sm:text-lg font-black text-white">
                Para mais informações consulte assessoria <span className="text-amber-300">(11) 93902-6928</span>
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => handleWhatsApp('banner_assessoria')}
              className="flex-1 sm:flex-none px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chamar no WhatsApp</span>
            </button>
            <button
              onClick={handleAssessoriaCall}
              className="flex-1 sm:flex-none px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Ligar</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
