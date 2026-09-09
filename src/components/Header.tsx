import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Phone, ArrowRight, Heart, ShieldCheck, Lock } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brandConfig';
import { AmbientesLimposLogo } from './AmbientesLimposLogo';
import { analytics } from '../utils/analytics';

interface HeaderProps {
  onOpenQuote: () => void;
  onOpenContractModal?: () => void;
  onOpenAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuote, onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Planos', href: '#valores' },
    { label: 'Empresas', href: '#empresas' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Como Funciona', href: '#como-funciona' },
    { label: 'Quem Somos', href: '#quem-somos' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contato', href: '#contato' },
  ];

  const handleNavClick = (href: string, label: string) => {
    setMobileMenuOpen(false);
    analytics.track('cta_click', `nav_${label}`);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppNav = () => {
    analytics.track('whatsapp_click', 'header_whatsapp_icon');
    analytics.track('whatsapp_open', 'header');
    window.open(
      BRAND_CONFIG.getWhatsAppUrl('Olá! Gostaria de falar com a equipe da Ambientes Limpos e solicitar um orçamento.'),
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <header
      id="header-navigation"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a1e38]/95 backdrop-blur-md shadow-xl border-b border-amber-400/20 py-2.5'
          : 'bg-[#0a1e38] border-b border-white/10 py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo Fiel */}
        <a
          href="#inicio"
          id="brand-logo-link"
          className="flex items-center gap-3 text-white group cursor-pointer"
          onClick={() => analytics.track('cta_click', 'logo_home')}
        >
          <AmbientesLimposLogo variant="light" size="sm" showSlogan={false} />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5">
          {navLinks.map((link) => (
            <button
              key={link.label}
              id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => handleNavClick(link.href, link.label)}
              className="text-xs font-semibold uppercase tracking-wider text-slate-200 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Desktop Tagline from Flyer & CTA Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="hidden xl:flex flex-col text-right leading-tight pr-2">
            <span className="text-[10px] uppercase font-bold text-cyan-300 tracking-wider">Espaços Mais Limpos</span>
            <span className="text-[10px] uppercase font-semibold text-slate-300 flex items-center justify-end gap-1">
              Pessoas Mais Felizes <Heart className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
            </span>
          </div>

          <button
            id="header-admin-button"
            onClick={() => {
              analytics.track('cta_click', 'header_admin_button');
              if (onOpenAdmin) onOpenAdmin();
            }}
            className="px-3 py-2 rounded-lg text-xs font-bold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
            title="Acesso Administrativo ao Painel Operacional"
          >
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden xl:inline">Painel Admin</span>
          </button>

          <button
            id="header-quote-button"
            onClick={() => {
              analytics.track('cta_click', 'header_quote_button');
              analytics.track('quote_start', 'header_cta');
              window.open(
                BRAND_CONFIG.getWhatsAppUrl('Olá! Gostaria de solicitar um orçamento para limpeza com a Ambientes Limpos.'),
                '_blank',
                'noopener,noreferrer'
              );
            }}
            className="px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>Orçamento</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            id="header-whatsapp-button"
            onClick={handleWhatsAppNav}
            aria-label="Falar pelo WhatsApp (+55 11 93902-6928)"
            className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:scale-105 text-xs font-bold"
            title="WhatsApp: +55 11 93902-6928"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span className="hidden md:inline">(11) 93902-6928</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            id="header-mobile-quote-btn"
            onClick={() => {
              analytics.track('cta_click', 'header_mobile_quote');
              onOpenQuote();
            }}
            className="px-3.5 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide text-slate-900 bg-amber-400"
          >
            Orçamento
          </button>
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-lg bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Full-screen Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden fixed inset-x-0 top-[60px] bottom-0 bg-[#0b1d3a] z-50 flex flex-col justify-between p-6 border-t border-white/10 overflow-y-auto animate-in fade-in duration-200"
        >
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-2">
              Navegação
            </p>
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href, link.label)}
                className="w-full text-left py-2.5 px-3 rounded-lg text-base font-medium text-slate-200 hover:bg-white/5 hover:text-cyan-300 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3 mt-6">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenAdmin) onOpenAdmin();
              }}
              className="w-full py-3 rounded-xl text-center font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 shadow-sm text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Acessar Painel Administrativo</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                analytics.track('cta_click', 'mobile_menu_quote');
                onOpenQuote();
              }}
              className="w-full py-3.5 rounded-xl text-center font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 shadow-md text-sm uppercase tracking-wider"
            >
              Solicitar Orçamento
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsAppNav();
              }}
              className="w-full py-3.5 rounded-xl text-center font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md text-sm flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp: {BRAND_CONFIG.contacts.whatsappCommercial}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-300 pt-2">
              <Phone className="w-3.5 h-3.5 text-cyan-300" />
              <span>Assessoria: {BRAND_CONFIG.contacts.assessoria}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
