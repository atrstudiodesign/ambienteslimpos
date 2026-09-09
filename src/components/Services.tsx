import React from 'react';
import { Sparkles, Check, AlertCircle, ShieldAlert, Layers, Flame, ArrowRight, MessageCircle } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brandConfig';
import { analytics } from '../utils/analytics';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const serviceList = [
    {
      id: 'basica',
      name: 'LIMPEZA BÁSICA',
      tagline: 'Para manutenção frequente.',
      badge: 'Manutenção Periódica',
      icon: Layers,
      accentColor: 'from-blue-600 to-sky-600',
      items: [
        'Varrer e passar pano',
        'Tirar pó de superfícies acessíveis',
        'Limpeza externa de móveis',
        'Banheiros (louças e pias)',
        'Pia e bancada de cozinha',
        'Fogão por fora',
        'Espelhos e vidros decorativos',
        'Retirada e descarte de lixo',
        'Organização leve dos espaços',
        'Limpeza superficial das áreas utilizadas',
      ],
      idealFor: 'Manutenção semanal ou quinzenal de imóveis já conservados.',
    },
    {
      id: 'soft',
      name: 'LIMPEZA SOFT / COMPLETA',
      tagline: 'Para uma limpeza mais detalhada.',
      badge: 'Mais Solicitada',
      isPopular: true,
      icon: Sparkles,
      accentColor: 'from-cyan-600 to-teal-500',
      items: [
        'Tudo incluso na Limpeza Básica',
        'Rodapés de todos os cômodos',
        'Portas e maçanetas higienizadas',
        'Azulejos de banheiros e cozinha',
        'Banheiros detalhados e desinfetados',
        'Box de vidro higienizado',
        'Frente e puxadores de armários',
        'Eletrodomésticos externamente',
        'Cantos e áreas menos acessadas',
        'Janelas de fácil acesso (vidros internos)',
        'Organização leve com cuidado especial',
      ],
      idealFor: 'Imóveis residenciais ou comerciais que necessitam de revitalização completa.',
    },
    {
      id: 'pesada',
      name: 'LIMPEZA PESADA',
      tagline: 'Para ambientes com maior acúmulo de sujeira.',
      badge: 'Avaliação Prévia',
      icon: Flame,
      accentColor: 'from-amber-600 to-amber-700',
      items: [
        'Pisos com acúmulo ou manchas',
        'Gordura acumulada em cozinhas',
        'Banheiros encardidos e rejuntes',
        'Azulejos em toda extensão',
        'Rodapés e soleiras detalhados',
        'Portas, batentes e marcos',
        'Janelas acessíveis e esquadrias',
        'Cantos com sujidade persistente',
        'Cozinha detalhada e desengordurada',
        'Móveis externamente detalhados',
        'Eletrodomésticos externamente detalhados',
      ],
      idealFor: 'Ambientes fechados há muito tempo, pós-locação ou acúmulo severo.',
      notice: 'Limpezas pesadas são avaliadas previamente para definição de equipe, tempo e valor.',
    },
  ];

  return (
    <section id="servicos" className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold tracking-widest text-cyan-700 uppercase bg-cyan-100/60 px-3 py-1 rounded-full border border-cyan-200">
            Escopo Transparente
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b1d3a] tracking-tight uppercase">
            NOSSOS SERVIÇOS
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Cada modalidade possui um escopo claro e detalhado para garantir previsibilidade, organização e o melhor padrão de higienização.
          </p>
        </div>

        {/* 3 Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {serviceList.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                id={`service-card-${srv.id}`}
                className={`relative rounded-2xl bg-white border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl ${
                  srv.isPopular
                    ? 'border-cyan-500 ring-2 ring-cyan-500/20 shadow-cyan-900/5 lg:-translate-y-2'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Popular Ribbon */}
                {srv.isPopular && (
                  <div className="bg-gradient-to-r from-cyan-600 to-sky-600 text-white text-[11px] font-bold uppercase tracking-wider text-center py-1.5 px-4 shadow-sm">
                    {srv.badge}
                  </div>
                )}

                <div className="p-6 sm:p-8">
                  {/* Title & Badge */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="text-xs font-semibold text-slate-500 block mb-1">
                        {srv.tagline}
                      </span>
                      <h3 className="text-xl font-extrabold text-[#0b1d3a] tracking-tight">
                        {srv.name}
                      </h3>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 text-[#0b1d3a]">
                      <Icon className="w-5 h-5 text-cyan-600" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 mb-6 font-medium">
                    {srv.idealFor}
                  </p>

                  <div className="border-t border-slate-100 pt-5 mb-6">
                    <div className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-3">
                      O que está incluso:
                    </div>
                    <ul className="space-y-2.5">
                      {srv.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                          <div className="w-4 h-4 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {srv.notice && (
                    <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5 mb-4">
                      <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{srv.notice}</span>
                    </div>
                  )}
                </div>

                <div className="p-6 sm:p-8 pt-0 mt-auto">
                  <button
                    id={`btn-select-service-${srv.id}`}
                    onClick={() => {
                      analytics.track('service_view', srv.name);
                      analytics.track('cta_click', `select_${srv.id}`);
                      window.open(
                        BRAND_CONFIG.getWhatsAppUrl(`Olá! Gostaria de solicitar um orçamento para o serviço *${srv.name}* com a Ambientes Limpos.`),
                        '_blank',
                        'noopener,noreferrer'
                      );
                    }}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      srv.isPopular
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-md'
                        : 'bg-[#0a1e38] hover:bg-slate-800 text-white'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Solicitar Este Serviço</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global disclaimer on heavy cleaning */}
        <div className="mt-10 p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-3 text-xs text-slate-600 max-w-2xl mx-auto">
          <AlertCircle className="w-5 h-5 text-cyan-600 shrink-0" />
          <span>
            <strong>Aviso de Avaliação:</strong> Limpezas pesadas são avaliadas previamente para definição de equipe, tempo estimado e valor justo.
          </span>
        </div>

      </div>
    </section>
  );
};
