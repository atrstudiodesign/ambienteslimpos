import React from 'react';
import { Home, Building2, Store, Sparkles, CheckCircle2 } from 'lucide-react';
import { analytics } from '../utils/analytics';

export const Positioning: React.FC = () => {
  const cards = [
    {
      id: 'residencia',
      title: 'RESIDÊNCIAS',
      subtitle: 'Casas e apartamentos.',
      description:
        'Higienização cuidadosa e detalhada para lares que prezam por conforto, saúde da família e tranquilidade após a rotina.',
      icon: Home,
      features: ['Apartamentos compactos e amplos', 'Casas e sobrados familiares', 'Organização leve e preservação'],
    },
    {
      id: 'empresa',
      title: 'EMPRESAS',
      subtitle: 'Pequenas, médias e grandes empresas.',
      description:
        'Ambientes corporativos higienizados para promover produtividade, saúde da equipe e causar a melhor impressão a clientes.',
      icon: Building2,
      features: ['Salas comerciais e escritórios', 'Consultórios e clínicas', 'Manutenção contínua ou periódica'],
    },
    {
      id: 'loja',
      title: 'LOJAS',
      subtitle: 'Ambientes comerciais, vitrines e áreas de atendimento.',
      description:
        'Espaços comerciais limpos e convidativos, com cuidado especial em vitrines, balcões e áreas de grande circulação.',
      icon: Store,
      features: ['Vitrines e fachadas de fácil acesso', 'Balcões e provadores higienizados', 'Pisos impecáveis para atendimento'],
    },
  ];

  return (
    <section id="posicionamento" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>Nosso Posicionamento</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0b1d3a] tracking-tight uppercase">
            LIMPEZA PROFISSIONAL PARA QUEM VALORIZA TEMPO E QUALIDADE
          </h2>

          <div className="space-y-2 text-slate-600 text-base sm:text-lg leading-relaxed">
            <p>
              Um ambiente limpo não é apenas uma questão de aparência. É organização, conforto, produtividade e tranquilidade.
            </p>
            <p className="text-slate-700 font-medium">
              Nossa equipe trabalha para entregar ambientes limpos, organizados e preparados para receber pessoas — com planejamento, cuidado e eficiência.
            </p>
          </div>
        </div>

        {/* 3 Interactive Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                id={`positioning-card-${card.id}`}
                onClick={() => analytics.track('service_view', `card_${card.id}`)}
                className="group relative rounded-2xl p-7 bg-slate-50 border border-slate-200 hover:border-cyan-400 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-[#0b1d3a] to-blue-700 text-white flex items-center justify-center mb-6 shadow-md group-hover:scale-105 transition-transform">
                    <Icon className="w-7 h-7 text-cyan-300" />
                  </div>

                  <h3 className="text-xl font-black text-[#0b1d3a] tracking-wide mb-1">
                    {card.title}
                  </h3>

                  <div className="text-sm font-semibold text-cyan-700 mb-3">
                    {card.subtitle}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 space-y-2">
                  {card.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
