import React from 'react';
import { PlusCircle, AlertCircle, Sparkles } from 'lucide-react';
import { BRAND_IMAGES } from '../assets/images';
import { analytics } from '../utils/analytics';

interface ExtraServicesProps {
  onAddExtraToQuote?: (service: string) => void;
}

export const ExtraServices: React.FC<ExtraServicesProps> = ({ onAddExtraToQuote }) => {
  const extras = [
    'Lavar roupas',
    'Passar roupas',
    'Limpeza interna de geladeira',
    'Limpeza interna de forno',
    'Limpeza interna de armários',
    'Lavagem de janelas e vidraças acessíveis',
    'Preparação de café',
    'Preparação de almoço',
    'Limpeza de áreas externas e quintais',
    'Outros serviços previamente combinados',
  ];

  return (
    <section id="servicos-extras" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl bg-slate-50 border border-slate-200 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Visual Photography Column */}
            <div className="lg:col-span-5 h-64 sm:h-80 lg:h-full relative overflow-hidden bg-slate-900">
              <img
                src={BRAND_IMAGES.cleaningCaddy}
                alt="Materiais e produtos organizados profissionalmente para limpeza de ambientes"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
                loading="lazy"
                width={500}
                height={400}
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/40 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-white/90 backdrop-blur-sm border border-white/40 text-slate-800 text-xs">
                <span className="font-bold block text-[#0b1d3a]">Materiais de Apoio Profissionais</span>
                <span className="text-slate-600">Equipamentos e panos de microfibra organizados por setor</span>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-6">
              
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Personalização Sob Demanda</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0b1d3a] tracking-tight uppercase">
                  PRECISA DE MAIS?
                </h3>
                <p className="text-sm sm:text-base text-slate-600 mt-1">
                  Serviços extras podem ser contratados conforme disponibilidade:
                </p>
              </div>

              {/* 2-column checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {extras.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      analytics.track('cta_click', `extra_${item}`);
                      if (onAddExtraToQuote) onAddExtraToQuote(item);
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-slate-200/80 hover:border-cyan-400 hover:shadow-sm transition-all cursor-pointer group"
                  >
                    <div className="w-6 h-6 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                      <PlusCircle className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-700 group-hover:text-slate-900">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Mandatory Rule Card */}
              <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 flex items-start gap-3 text-xs sm:text-sm text-amber-950">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold uppercase tracking-wide text-amber-900 block text-xs">
                    Regra Transparente
                  </span>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    Serviços extras não estão automaticamente incluídos no valor padrão da limpeza. Devem ser solicitados e orçados separadamente de acordo com o tempo e esforço necessários.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
