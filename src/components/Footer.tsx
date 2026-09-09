import React from 'react';
import { Sparkles, Instagram, Phone, MapPin, ShieldCheck, Heart, MessageCircle } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brandConfig';
import { AmbientesLimposLogo } from './AmbientesLimposLogo';
import { ActiveModal } from '../types';
import { analytics } from '../utils/analytics';

interface FooterProps {
  onOpenModal: (modal: ActiveModal) => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenModal, onOpenAdmin }) => {
  const handleWhatsApp = () => {
    analytics.track('whatsapp_click', 'footer_phone_click');
    window.open(BRAND_CONFIG.getWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-[#08182f] text-slate-300 border-t-2 border-amber-400/30 pt-16 pb-24 sm:pb-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-white">
              <AmbientesLimposLogo variant="light" size="md" showSlogan={true} />
            </div>

            <p className="text-slate-300 leading-relaxed max-w-sm pt-2">
              Serviços de limpeza profissional residencial e empresarial. Mais pessoas, menos tempo e mais resultado para seu ambiente em São Paulo.
            </p>

            <div className="space-y-2 text-slate-300 pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>São Paulo — SP • Preferência Zona Leste (Itaim Paulista, São Miguel, Guaianases, Ferraz e imediações)</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <button
                  onClick={handleWhatsApp}
                  className="text-white hover:text-emerald-300 font-bold transition-colors cursor-pointer"
                >
                  WhatsApp Comercial: <span className="underline">{BRAND_CONFIG.contacts.whatsappCommercial}</span>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Assessoria & Contratos: <strong>{BRAND_CONFIG.contacts.assessoriaEmpresa}</strong> • CNPJ: <strong className="text-amber-300">{BRAND_CONFIG.contacts.cnpj}</strong></span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={BRAND_CONFIG.contacts.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analytics.track('cta_click', 'footer_instagram')}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-pink-600/80 text-white flex items-center justify-center transition-colors"
                title="Instagram Oficial"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <span className="text-[11px] text-slate-400 font-mono">
                @ambienteslimpos.sp
              </span>
            </div>
          </div>

          {/* Navegação Rápida (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              Navegação
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="hover:text-cyan-300 transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-cyan-300 transition-colors">
                  Nossos Serviços
                </a>
              </li>
              <li>
                <a href="#empresas" className="hover:text-cyan-300 transition-colors">
                  Soluções para Empresas
                </a>
              </li>
              <li>
                <a href="#valores" className="hover:text-cyan-300 transition-colors">
                  Tabela de Valores
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="hover:text-cyan-300 transition-colors">
                  Como Contratar
                </a>
              </li>
              <li>
                <a href="#quem-somos" className="hover:text-cyan-300 transition-colors">
                  Quem Somos
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-cyan-300 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-cyan-300 transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Documentos Legais & Compliance (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Termos & Conformidade</span>
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button
                  onClick={() => {
                    analytics.track('cta_click', 'footer_open_terms');
                    onOpenModal('terms');
                  }}
                  className="hover:text-cyan-300 text-left transition-colors cursor-pointer"
                >
                  Termos de Serviço
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    analytics.track('cta_click', 'footer_open_privacy');
                    onOpenModal('privacy');
                  }}
                  className="hover:text-cyan-300 text-left transition-colors cursor-pointer"
                >
                  Política de Privacidade (LGPD)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    analytics.track('cta_click', 'footer_open_legal');
                    onOpenModal('legal');
                  }}
                  className="hover:text-cyan-300 text-left transition-colors cursor-pointer"
                >
                  Aviso Legal
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    analytics.track('cta_click', 'footer_open_cookie_prefs');
                    onOpenModal('cookiePrefs');
                  }}
                  className="hover:text-cyan-300 text-left transition-colors cursor-pointer"
                >
                  Preferências de Cookies
                </button>
              </li>
              <li className="pt-2 border-t border-white/10">
                <button
                  onClick={() => {
                    analytics.track('cta_click', 'footer_open_admin');
                    if (onOpenAdmin) onOpenAdmin();
                  }}
                  className="text-amber-400 hover:text-amber-300 font-bold text-left transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Acesso Painel Operacional ERP</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Disclaimer Box with Assessoria and CNPJ */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-[11px] leading-relaxed space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
            <span className="font-semibold text-slate-200">
              Assessoria Comercial & Contratual: {BRAND_CONFIG.contacts.assessoriaEmpresa}
            </span>
            <span className="font-mono text-cyan-300 font-bold">
              CNPJ: {BRAND_CONFIG.contacts.cnpj}
            </span>
          </div>
          <p>
            Prestação de serviços profissionais de higienização e organização predial sob modelo operacional da marca Ambientes Limpos. Gestão operacional, assessoria e formalização contratual realizadas por <strong>{BRAND_CONFIG.contacts.assessoriaEmpresa}</strong> (CNPJ: {BRAND_CONFIG.contacts.cnpj}). Atendimento direto via telefone e WhatsApp: <strong>{BRAND_CONFIG.contacts.whatsappCommercial}</strong>.
          </p>
          <p className="text-slate-500 text-[10px]">
            Valores publicados no site são referenciais e sujeitos a confirmação após alinhamento do imóvel, metragens e necessidades específicas.
          </p>
        </div>

        {/* Copyright & NAP */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Ambientes Limpos • {BRAND_CONFIG.contacts.assessoriaEmpresa} (CNPJ: {BRAND_CONFIG.contacts.cnpj}). Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span>São Paulo — SP</span>
            <span>•</span>
            <span>Zona Leste</span>
            <span>•</span>
            <span>Facilities & Higienização</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
