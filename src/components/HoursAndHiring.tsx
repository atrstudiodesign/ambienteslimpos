import React from 'react';
import { Clock, Calendar, MessageSquare, Send, Calculator, CalendarCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brandConfig';
import { analytics } from '../utils/analytics';

interface HoursAndHiringProps {
  onOpenQuote: () => void;
}

export const HoursAndHiring: React.FC<HoursAndHiringProps> = ({ onOpenQuote }) => {
  const steps = [
    {
      num: '01',
      title: 'FALE CONOSCO',
      desc: 'Entre em contato diretamente pelo WhatsApp ou pelo formulário do site.',
      icon: MessageSquare,
    },
    {
      num: '02',
      title: 'ENVIE AS INFORMAÇÕES',
      desc: 'Informe tipo de imóvel, localização, tamanho aproximado, quantidade de ambientes, tipo de limpeza, frequência e necessidades especiais.',
      icon: Send,
    },
    {
      num: '03',
      title: 'RECEBA O ORÇAMENTO',
      desc: 'A equipe analisa detalhadamente a sua demanda e informa o valor justo e transparente.',
      icon: Calculator,
    },
    {
      num: '04',
      title: 'AGENDE',
      desc: 'Após aprovação mútua, é definido e reservado o dia e a janela de horário do atendimento.',
      icon: CalendarCheck,
    },
  ];

  return (
    <section id="como-funciona" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Sub-section: HORÁRIOS DE ATENDIMENTO */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="text-xs font-bold tracking-widest text-cyan-700 uppercase bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
              Disponibilidade e Janelas
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b1d3a] tracking-tight uppercase">
              HORÁRIOS DE ATENDIMENTO
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Organizamos nossa logística para pontualidade e respeito à rotina do cliente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card Segunda a Sexta */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-cyan-800 font-bold text-sm uppercase tracking-wide mb-3">
                  <Calendar className="w-4 h-4 text-cyan-600" />
                  <span>Segunda a Sexta</span>
                </div>
                <div className="space-y-1 text-slate-800 font-extrabold text-lg">
                  <div>08h às 12h</div>
                  <div>13h às 17h</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-4 border-t border-slate-200 pt-3">
                Atendimento padrão comercial e residencial contínuo.
              </p>
            </div>

            {/* Card Sábados */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-cyan-800 font-bold text-sm uppercase tracking-wide mb-3">
                  <Calendar className="w-4 h-4 text-cyan-600" />
                  <span>Sábados</span>
                </div>
                <div className="text-slate-800 font-extrabold text-2xl">
                  08h às 13h
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-4 border-t border-slate-200 pt-3">
                Horário concentrado para manutenções de final de semana.
              </p>
            </div>

            {/* Card Domingos e Feriados */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-amber-800 font-bold text-sm uppercase tracking-wide mb-3">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Domingos e Feriados</span>
                </div>
                <div className="text-slate-800 font-bold text-sm leading-relaxed">
                  Somente mediante disponibilidade e com possibilidade de valor diferenciado.
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-4 border-t border-slate-200 pt-3">
                Consulte a assessoria previamente para checar escala.
              </p>
            </div>

          </div>

          {/* Janelas de Entrada & Aviso */}
          <div className="mt-6 p-5 rounded-2xl bg-cyan-50/70 border border-cyan-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-cyan-950">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-cyan-700 shrink-0" />
              <div>
                <strong className="block text-cyan-900 font-bold">Janelas de Entrada Flexíveis:</strong>
                <span>Manhã: entrada entre 08h e 09h • Tarde: entrada entre 13h e 14h</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-cyan-800 bg-white/80 px-3 py-1.5 rounded-lg border border-cyan-200 shrink-0">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Nunca prometemos horário exato antes da confirmação da agenda.</span>
            </div>
          </div>
        </div>

        {/* Sub-section: COMO CONTRATAR */}
        <div className="pt-8 border-t border-slate-200">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold tracking-widest text-cyan-700 uppercase bg-cyan-100/70 px-3 py-1 rounded-full border border-cyan-200">
              Passo a Passo Simples
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b1d3a] tracking-tight uppercase">
              COMO CONTRATAR
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Processo simples, rápido e transparente em 4 etapas estruturadas:
            </p>
          </div>

          {/* 4 Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-cyan-500 hover:shadow-md transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-black text-cyan-600">
                        {step.num}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#0b1d3a]">
                        <Icon className="w-5 h-5 text-cyan-600" />
                      </div>
                    </div>

                    <h3 className="text-base font-extrabold text-[#0b1d3a] uppercase tracking-wide mb-2">
                      {step.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              id="btn-como-contratar-quote"
              onClick={() => {
                analytics.track('cta_click', 'como_contratar_btn');
                window.open(
                  BRAND_CONFIG.getWhatsAppUrl('Olá! Gostaria de agendar um atendimento e solicitar orçamento com a Ambientes Limpos.'),
                  '_blank',
                  'noopener,noreferrer'
                );
              }}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 font-black text-sm uppercase tracking-wider shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              <span>Quero Solicitar um Orçamento no WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
