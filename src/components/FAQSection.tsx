import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brandConfig';
import { analytics } from '../utils/analytics';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Vocês atendem apartamentos?',
      a: 'Sim. Atendemos apartamentos de todas as metragens, desde unidades compactas até coberturas e condomínios fechados.',
    },
    {
      q: 'Atendem empresas?',
      a: 'Sim, desde pequenas empresas até operações maiores, conforme avaliação prévia da demanda e alinhamento de equipe.',
    },
    {
      q: 'Atendem lojas?',
      a: 'Sim. Atendemos lojas, comércios de rua, galerias, vitrines e áreas de atendimento ao público.',
    },
    {
      q: 'Fazem limpeza pesada?',
      a: 'Sim, mediante avaliação prévia detalhada para estipular o tempo necessário, dimensionamento de colaboradoras e valor justo.',
    },
    {
      q: 'Vocês sobem em escadas?',
      a: 'Não. Atividades que envolvam risco físico ou trabalho em altura não são realizadas por razões de segurança e integridade da equipe.',
    },
    {
      q: 'Posso contratar serviços extras?',
      a: 'Sim. Serviços como lavagem de roupas, passar roupas, limpeza interna de fornos/geladeiras e outros são avaliados e orçados separadamente.',
    },
    {
      q: 'Vocês fornecem produtos?',
      a: 'A condição deve ser definida no momento do orçamento. Produtos específicos solicitados fora do escopo padrão podem ser cobrados separadamente.',
    },
    {
      q: 'Atendem aos sábados?',
      a: 'Sim, aos sábados atendemos das 08h às 13h, conforme disponibilidade de agenda prévia.',
    },
    {
      q: 'Atendem domingos e feriados?',
      a: 'Mediante disponibilidade da equipe e com condições e valores diferenciados alinhados previamente com a assessoria.',
    },
    {
      q: 'Como recebo o orçamento?',
      a: 'Diretamente pelo WhatsApp comercial ou pelo canal de contato informado no formulário do site com agilidade.',
    },
  ];

  const toggle = (idx: number) => {
    const isOpening = openIndex !== idx;
    setOpenIndex(isOpening ? idx : null);
    if (isOpening) {
      analytics.track('service_view', `faq_${faqs[idx].q}`);
    }
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center space-y-3">
          <span className="text-xs font-bold tracking-widest text-cyan-700 uppercase bg-cyan-100/70 px-3 py-1 rounded-full border border-cyan-200">
            Dúvidas Frequentes
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b1d3a] tracking-tight uppercase">
            PERGUNTAS E RESPOSTAS
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Esclareça as principais dúvidas sobre atendimento, produtos, segurança e formas de contratação.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-white border-cyan-400 shadow-md ring-1 ring-cyan-400/20'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  id={`faq-toggle-${idx}`}
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-[#0b1d3a]">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-cyan-50 text-cyan-600' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Extra direct question block */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#0a1e38] to-[#122b4d] text-white border border-cyan-500/30 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-extrabold text-base text-white">
              Ainda tem alguma dúvida específica?
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              Fale agora com nossa coordenação comercial e tire suas dúvidas em minutos.
            </p>
          </div>
          <button
            onClick={() => {
              analytics.track('whatsapp_click', 'faq_bottom_btn');
              window.open(
                BRAND_CONFIG.getWhatsAppUrl('Olá! Tenho uma dúvida sobre os serviços da Ambientes Limpos e gostaria de falar com vocês.'),
                '_blank',
                'noopener,noreferrer'
              );
            }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-md shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Tirar Dúvidas no WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
