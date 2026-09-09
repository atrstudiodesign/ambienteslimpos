import React, { useState } from 'react';
import { Send, CheckCircle2, MessageCircle, ShieldCheck, Lock, AlertCircle } from 'lucide-react';
import { QuoteFormData } from '../types';
import { BRAND_CONFIG } from '../config/brandConfig';
import { analytics } from '../utils/analytics';

interface QuoteFormProps {
  initialService?: string;
  initialProperty?: string;
  initialRegion?: string;
  onOpenPrivacyModal: () => void;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({
  initialService = '',
  initialProperty = '',
  initialRegion = '',
  onOpenPrivacyModal,
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    whatsapp: '',
    propertyType: initialProperty || 'Apartamento',
    serviceType: initialService || 'Limpeza Soft / Completa',
    cityRegion: initialRegion || 'Itaim Paulista',
    approxSize: 'Até 50m²',
    roomsCount: '1 a 3 ambientes',
    frequency: 'Avulso / Pontual',
    desiredDate: '',
    notes: '',
    acceptedPrivacy: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isStarted, setIsStarted] = useState(false);

  const handleFieldFocus = () => {
    if (!isStarted) {
      setIsStarted(true);
      analytics.track('quote_start', 'form_interaction');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.whatsapp.trim()) {
      setErrorMsg('Por favor, preencha seu nome e número de WhatsApp para contato.');
      return;
    }

    if (!formData.acceptedPrivacy) {
      setErrorMsg('É necessário concordar com a Política de Privacidade para autorizar o contato.');
      return;
    }

    // Analytics: track specific granular events
    analytics.track('quote_submit', 'form_button');
    analytics.track('lead_saved', formData.serviceType);
    analytics.track('form_submit', formData.propertyType);

    setSubmitted(true);

    // Build formatted message for WhatsApp
    const message = `*SOLICITAÇÃO DE ORÇAMENTO — AMBIENTES LIMPOS*
----------------------------------------
*Nome:* ${formData.name}
*WhatsApp:* ${formData.whatsapp}
*Tipo de Imóvel:* ${formData.propertyType}
*Serviço Desejado:* ${formData.serviceType}
*Região/Bairro:* ${formData.cityRegion}
*Tamanho Aprox.:* ${formData.approxSize}
*Ambientes:* ${formData.roomsCount}
*Frequência:* ${formData.frequency}
*Data Desejada:* ${formData.desiredDate || 'A combinar'}
*Observações:* ${formData.notes || 'Nenhuma'}
----------------------------------------
_Enviado via formulário do site oficial Ambientes Limpos._`;

    // Open WhatsApp
    analytics.track('whatsapp_open', 'quote_form_auto');
    const waUrl = BRAND_CONFIG.getWhatsAppUrl(message);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="orcamento" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
            <span>Transparência & LGPD</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0b1d3a] tracking-tight uppercase">
            SOLICITE SEU ORÇAMENTO
          </h2>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Preencha os dados essenciais do seu ambiente. Nossa equipe avaliará a metragem e responderá com uma proposta sob medida.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          {submitted ? (
            <div className="text-center py-10 space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#0b1d3a]">
                Solicitação Enviada com Sucesso!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                O resumo do seu orçamento foi gerado e encaminhado para o WhatsApp comercial da Ambientes Limpos. Nossa equipe entrará em contato em breve.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                >
                  Novo Orçamento
                </button>
                <a
                  href={BRAND_CONFIG.getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Abrir WhatsApp Novamente</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Grid 1: Nome & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="quote-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Nome Completo *
                  </label>
                  <input
                    id="quote-name"
                    type="text"
                    required
                    placeholder="Seu nome ou da sua empresa"
                    value={formData.name}
                    onFocus={handleFieldFocus}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label htmlFor="quote-whatsapp" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    WhatsApp (com DDD) *
                  </label>
                  <input
                    id="quote-whatsapp"
                    type="tel"
                    required
                    placeholder="Ex: (11) 99999-9999"
                    value={formData.whatsapp}
                    onFocus={handleFieldFocus}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Grid 2: Tipo de Imóvel & Tipo de Serviço */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="quote-property" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Tipo de Imóvel
                  </label>
                  <select
                    id="quote-property"
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="Apartamento">Apartamento</option>
                    <option value="Casa / Sobrado">Casa / Sobrado</option>
                    <option value="Loja / Comércio">Loja / Comércio</option>
                    <option value="Sala Comercial / Escritório">Sala Comercial / Escritório</option>
                    <option value="Empresa / Galpão">Empresa / Galpão</option>
                    <option value="Outro Imóvel">Outro Imóvel</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="quote-service" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Tipo de Serviço
                  </label>
                  <select
                    id="quote-service"
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="Limpeza Básica">Limpeza Básica (Manutenção)</option>
                    <option value="Limpeza Soft / Completa">Limpeza Soft / Completa</option>
                    <option value="Limpeza Pesada">Limpeza Pesada (Avaliação Prévia)</option>
                    <option value="Equipe Corporativa">Equipe Corporativa (2 a 4 profissionais)</option>
                  </select>
                </div>
              </div>

              {/* Grid 3: Cidade/Região & Tamanho */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="quote-region" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Cidade / Bairro (Região)
                  </label>
                  <input
                    id="quote-region"
                    type="text"
                    placeholder="Ex: Itaim Paulista, São Miguel, Guaianases..."
                    value={formData.cityRegion}
                    onChange={(e) => setFormData({ ...formData, cityRegion: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label htmlFor="quote-size" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Tamanho Aproximado
                  </label>
                  <select
                    id="quote-size"
                    value={formData.approxSize}
                    onChange={(e) => setFormData({ ...formData, approxSize: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="Até 50m²">Até 50m²</option>
                    <option value="51 a 70m²">51 a 70m²</option>
                    <option value="71 a 100m²">71 a 100m²</option>
                    <option value="101 a 150m²">101 a 150m²</option>
                    <option value="Acima de 150m²">Acima de 150m²</option>
                  </select>
                </div>
              </div>

              {/* Grid 4: Ambientes, Frequência & Data */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label htmlFor="quote-rooms" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Quantidade de Ambientes
                  </label>
                  <select
                    id="quote-rooms"
                    value={formData.roomsCount}
                    onChange={(e) => setFormData({ ...formData, roomsCount: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="1 a 2 cômodos">1 a 2 cômodos</option>
                    <option value="3 a 4 cômodos">3 a 4 cômodos</option>
                    <option value="5 ou mais cômodos">5 ou mais cômodos</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="quote-frequency" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Frequência Desejada
                  </label>
                  <select
                    id="quote-frequency"
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="Avulso / Pontual">Avulso / Pontual</option>
                    <option value="Semanal">Semanal (Recorrente)</option>
                    <option value="Quinzenal">Quinzenal</option>
                    <option value="Mensal">Mensal</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="quote-date" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Data Pretendida
                  </label>
                  <input
                    id="quote-date"
                    type="date"
                    value={formData.desiredDate}
                    onChange={(e) => setFormData({ ...formData, desiredDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              {/* Observações */}
              <div>
                <label htmlFor="quote-notes" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Observações ou Serviços Extras
                </label>
                <textarea
                  id="quote-notes"
                  rows={3}
                  placeholder="Ex: Preciso também de limpeza interna de forno, lavar roupas ou tenho pet no local."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              {/* Checkbox LGPD */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    id="quote-lgpd-checkbox"
                    type="checkbox"
                    checked={formData.acceptedPrivacy}
                    onChange={(e) => setFormData({ ...formData, acceptedPrivacy: e.target.checked })}
                    className="w-5 h-5 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 mt-0.5"
                  />
                  <span className="text-xs text-slate-600 leading-relaxed">
                    Li e concordo com a{' '}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        analytics.track('cta_click', 'open_privacy_from_form');
                        onOpenPrivacyModal();
                      }}
                      className="text-cyan-700 underline font-semibold hover:text-cyan-800 inline"
                    >
                      Política de Privacidade
                    </button>{' '}
                    e autorizo o contato para atendimento da minha solicitação de orçamento, ciente de que meus dados serão utilizados exclusivamente para esta finalidade (LGPD).
                  </span>
                </label>
              </div>

              {/* Submit button */}
              <div className="pt-3">
                <button
                  id="quote-form-submit-btn"
                  type="submit"
                  className="w-full py-4 rounded-xl text-slate-950 font-black uppercase text-xs sm:text-sm tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Solicitação de Orçamento</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Seus dados são confidenciais e protegidos conforme a LGPD.</span>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
