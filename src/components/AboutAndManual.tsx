import React from 'react';
import { Sparkles, Check, Ban, BookOpen, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react';
import { BRAND_IMAGES } from '../assets/images';
import { BRAND_CONFIG } from '../config/brandConfig';
import { analytics } from '../utils/analytics';

interface AboutAndManualProps {
  onOpenManualModal: () => void;
  onOpenQuote: () => void;
}

export const AboutAndManual: React.FC<AboutAndManualProps> = ({
  onOpenManualModal,
  onOpenQuote,
}) => {
  const colaboradorDeve = [
    'Chegar dentro da janela combinada',
    'Apresentar postura profissional e cordial',
    'Utilizar uniforme adequado e identificação',
    'Manter higiene pessoal e cuidados sanitários',
    'Tratar clientes com o mais elevado respeito',
    'Preservar integralmente os objetos do cliente',
    'Seguir estritamente o escopo contratado',
    'Comunicar qualquer problema imediatamente',
    'Não discutir valores diretamente quando houver assessoria responsável',
    'Não alterar o serviço sem autorização prévia',
    'Não fotografar ambientes sem autorização',
    'Não divulgar qualquer informação do cliente',
  ];

  const colaboradorProibido = [
    'Consumir objetos ou alimentos sem expressa autorização',
    'Acessar gavetas ou pertences pessoais fora do escopo',
    'Divulgar ou compartilhar imagens do imóvel',
    'Comentar informações ou rotinas do cliente com terceiros',
    'Realizar serviços de risco físico ou em altura',
    'Executar atividades não autorizadas previamente',
    'Abandonar o serviço sem comunicação à coordenação',
  ];

  const handleWhatsApp = () => {
    analytics.track('whatsapp_click', 'quem_somos_wa');
    window.open(
      BRAND_CONFIG.getWhatsAppUrl('Olá! Gostaria de saber mais sobre o atendimento e solicitar orçamento com a Ambientes Limpos.'),
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section id="quem-somos" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* QUEM SOMOS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Photo of the Two Specialists */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-amber-400/40 bg-[#0a1e38]">
              <img
                src={BRAND_IMAGES.twoGirlsHero}
                alt="Equipe de especialistas da Ambientes Limpos com uniforme profissional"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover object-center"
                loading="lazy"
                width={500}
                height={500}
              />
              <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-[#0a1e38] via-[#0a1e38]/90 to-transparent text-white">
                <div className="text-sm font-black tracking-wide flex items-center gap-2 text-amber-300">
                  <ShieldCheck className="w-4 h-4 text-amber-300" />
                  <span>Ambientes Limpos Oficial</span>
                </div>
                <p className="text-xs text-slate-200 mt-0.5">
                  Profissionais treinadas, uniformizadas e dedicadas ao cuidado e excelência.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100/70 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              <span>Nossa Filosofia</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0a1e38] tracking-tight uppercase leading-tight">
              CUIDADO QUE TRANSFORMA AMBIENTES
            </h2>

            <div className="space-y-4 text-slate-600 text-base leading-relaxed">
              <p>
                Somos uma equipe dedicada à prestação de serviços de limpeza residencial e empresarial, com foco em organização, cuidado e eficiência.
              </p>
              <p>
                Nosso objetivo é proporcionar mais praticidade para quem precisa manter seus ambientes limpos sem abrir mão de profissionalismo e confiança.
              </p>
              <p className="font-bold text-[#0a1e38]">
                Mais pessoas • Menos tempo • Mais resultado. Atendemos residências, lojas e empresas em São Paulo.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={handleWhatsApp}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer shadow-md flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Solicitar no WhatsApp (11) 93902-6928</span>
              </button>
              
              <button
                onClick={() => {
                  analytics.track('cta_click', 'quem_somos_manual');
                  onOpenManualModal();
                }}
                className="px-6 py-3 rounded-xl bg-white border border-slate-300 hover:border-cyan-500 text-[#0a1e38] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-cyan-600" />
                <span>Ver Padrão de Atendimento</span>
              </button>
            </div>
          </div>

        </div>

        {/* MANUAL DO COLABORADOR */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200 shadow-sm space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-700 block mb-1">
                Conduta e Segurança do Cliente
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0a1e38] tracking-tight uppercase">
                NOSSO PADRÃO DE ATENDIMENTO
              </h3>
            </div>
            <button
              onClick={() => {
                analytics.track('cta_click', 'open_full_manual_btn');
                onOpenManualModal();
              }}
              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-center"
            >
              <span>Ver Manual Completo</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-700" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* O colaborador deve */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-800 uppercase tracking-wide bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                <span>O Colaborador Deve:</span>
              </div>
              <ul className="space-y-2.5">
                {colaboradorDeve.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* É proibido */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-rose-800 uppercase tracking-wide bg-rose-50 px-3.5 py-2 rounded-xl border border-rose-200">
                <Ban className="w-4 h-4 text-rose-600" />
                <span>É Estritamente Proibido:</span>
              </div>
              <ul className="space-y-2.5">
                {colaboradorProibido.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <div className="w-4 h-4 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Ban className="w-3 h-3" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
