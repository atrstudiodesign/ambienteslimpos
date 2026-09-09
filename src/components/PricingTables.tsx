import React from 'react';
import { Users, Info, ArrowUpRight, Check, HelpCircle, MessageCircle, Sparkles } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brandConfig';
import { analytics } from '../utils/analytics';

interface PricingTablesProps {
  onSelectPlan: (category: string, item: string) => void;
}

export const PricingTables: React.FC<PricingTablesProps> = ({ onSelectPlan }) => {
  const handleTeamPlanWhatsApp = (equipe: string, valor: string) => {
    analytics.track('pricing_click', `equipe_${equipe}`);
    window.open(
      BRAND_CONFIG.getWhatsAppUrl(`Olá! Gostaria de informações e contratar o plano da Ambientes Limpos: ${equipe} (${valor}).`),
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section id="valores" className="py-16 md:py-24 bg-gradient-to-b from-[#08182f] via-[#0b2447] to-[#071933] text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* SECTION 1: PLANOS POR EQUIPE (Cópia fiel do flyer) */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a1e38] border-2 border-amber-400 text-amber-300 text-xs font-black uppercase tracking-widest shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>PLANOS POR EQUIPE</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
              MAIS PESSOAS • MENOS TEMPO • MAIS RESULTADO
            </h2>
            <p className="text-cyan-300 text-sm sm:text-base font-semibold">
              Valores de referência por equipe profissional uniformizada e equipada.
            </p>
          </div>

          {/* 3 Standalone Cards from the Flyer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: 2 Profissionais */}
            <div
              onClick={() => handleTeamPlanWhatsApp('2 Profissionais', 'R$ 1.400')}
              className="rounded-2xl p-7 bg-[#0a1e38] border-2 border-cyan-400/50 hover:border-amber-400 transition-all duration-300 shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-4 text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-cyan-300 uppercase tracking-wide">
                    2 PROFISSIONAIS
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 font-medium">
                    Ideal para residências amplas ou lojas
                  </p>
                </div>

                <div className="py-3 border-y border-white/10">
                  <span className="text-xs text-slate-400 uppercase font-semibold block">A partir de</span>
                  <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">
                    R$ 1.400
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTeamPlanWhatsApp('2 Profissionais', 'R$ 1.400');
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Contratar no WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Card 2: 3 Profissionais (Destaque) */}
            <div
              onClick={() => handleTeamPlanWhatsApp('3 Profissionais', 'R$ 1.800')}
              className="rounded-2xl p-7 bg-[#0a1e38] border-2 border-amber-400 hover:border-amber-300 transition-all duration-300 shadow-2xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between relative group"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow">
                Mais Eficiente
              </div>

              <div className="space-y-4 text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-amber-300 uppercase tracking-wide">
                    3 PROFISSIONAIS
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 font-medium">
                    Máxima agilidade para escritórios e casas médias
                  </p>
                </div>

                <div className="py-3 border-y border-white/10">
                  <span className="text-xs text-slate-400 uppercase font-semibold block">A partir de</span>
                  <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">
                    R$ 1.800
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTeamPlanWhatsApp('3 Profissionais', 'R$ 1.800');
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Contratar no WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Card 3: 4 Colaboradores */}
            <div
              onClick={() => handleTeamPlanWhatsApp('4 Colaboradores', 'R$ 2.500')}
              className="rounded-2xl p-7 bg-[#0a1e38] border-2 border-cyan-400/50 hover:border-amber-400 transition-all duration-300 shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-4 text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-cyan-300 uppercase tracking-wide">
                    4 COLABORADORES
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 font-medium">
                    Operações corporativas, andares e eventos
                  </p>
                </div>

                <div className="py-3 border-y border-white/10">
                  <span className="text-xs text-slate-400 uppercase font-semibold block">A partir de</span>
                  <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">
                    R$ 2.500
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTeamPlanWhatsApp('4 Colaboradores', 'R$ 2.500');
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Contratar no WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-slate-300 italic">
            *Valores de referência por equipe. O orçamento definitivo é confirmado após alinhamento do ambiente e rotina desejada.
          </p>
        </div>

        {/* SECTION 2: TABELA RESIDENCIAL INDIVIDUAL */}
        <div className="pt-8 border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
              Atendimento Individual ou Pontual
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              TABELA RESIDENCIAL E COMERCIAL
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              Valores de referência por modalidade de limpeza (Básica, Soft/Completa e Pesada)
            </p>
          </div>

          <div className="bg-white text-slate-900 rounded-2xl border border-slate-200 shadow-xl overflow-hidden max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[480px]">
                <thead>
                  <tr className="border-b-2 border-slate-200 bg-slate-100 text-slate-800 text-xs font-black uppercase tracking-wider">
                    <th className="py-3.5 px-4">Tipo de Imóvel</th>
                    <th className="py-3.5 px-3 text-center text-slate-600">Básica</th>
                    <th className="py-3.5 px-3 text-center text-cyan-800 bg-cyan-100/60 font-black">Soft/Completa</th>
                    <th className="py-3.5 px-3 text-center text-amber-800">Pesada</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {BRAND_CONFIG.residentialPricing.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-cyan-50/50 transition-colors cursor-pointer group"
                      onClick={() => {
                        analytics.track('pricing_view', `${row.type}`);
                        window.open(
                          BRAND_CONFIG.getWhatsAppUrl(`Olá! Gostaria de consultar valores para ${row.type} com a Ambientes Limpos.`),
                          '_blank',
                          'noopener,noreferrer'
                        );
                      }}
                    >
                      <td className="py-3.5 px-4 font-bold text-slate-800 flex items-center justify-between">
                        <span>{row.type}</span>
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </td>
                      <td className="py-3.5 px-3 text-center font-bold text-slate-700">
                        {row.basica}
                      </td>
                      <td className="py-3.5 px-3 text-center font-black text-cyan-800 bg-cyan-50/50">
                        {row.soft}
                      </td>
                      <td className="py-3.5 px-3 text-center font-bold text-amber-800">
                        {row.pesada}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-cyan-700 shrink-0" />
                <span>Locomoção e escopo final alinhados previamente com a assessoria.</span>
              </div>
              <button
                onClick={() => {
                  analytics.track('cta_click', 'table_residential_quote_wa');
                  window.open(
                    BRAND_CONFIG.getWhatsAppUrl('Olá! Gostaria de calcular o orçamento para meu imóvel com a Ambientes Limpos.'),
                    '_blank',
                    'noopener,noreferrer'
                  );
                }}
                className="font-black text-cyan-800 hover:text-cyan-900 uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Falar no WhatsApp (11) 93902-6928</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
