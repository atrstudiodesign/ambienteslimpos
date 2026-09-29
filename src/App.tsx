/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustProof } from './components/TrustProof';
import { Positioning } from './components/Positioning';
import { Services } from './components/Services';
import { ExtraServices } from './components/ExtraServices';
import { PricingTables } from './components/PricingTables';
import { CorporateSolutions } from './components/CorporateSolutions';
import { TransparencyAndSafety } from './components/TransparencyAndSafety';
import { HoursAndHiring } from './components/HoursAndHiring';
import { QuoteForm } from './components/QuoteForm';
import { AboutAndManual } from './components/AboutAndManual';
import { LocalSEOSection } from './components/LocalSEOSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CookieBanner } from './components/CookieBanner';
import { LegalModals } from './components/LegalModals';
import { ActiveModal } from './types';
import { AdminProvider } from './admin/context/AdminContext';
import { AdminLayout } from './admin/AdminLayout';
import { ProductLanding } from './product/ProductLanding';

export default function App() {
  const [viewMode, setViewMode] = useState<'site' | 'admin' | 'product'>(() => window.location.pathname === '/sistema' ? 'product' : 'site');
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [quoteService, setQuoteService] = useState<string>('');
  const [quoteProperty, setQuoteProperty] = useState<string>('');
  const [quoteRegion, setQuoteRegion] = useState<string>('');

  useEffect(() => {
    // Resolve direct links for the public site, product landing page and admin.
    if (window.location.hash === '#admin') {
      setViewMode('admin');
    } else if (window.location.pathname === '/sistema') {
      setViewMode('product');
    }

    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setViewMode('admin');
      } else if (window.location.pathname === '/sistema') {
        setViewMode('product');
      } else if (window.location.hash === '#site' || window.location.hash === '#inicio') {
        setViewMode('site');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenAdmin = () => {
    setViewMode('admin');
    window.location.hash = '#admin';
  };

  const handleBackToSite = () => {
    setViewMode('site');
    window.history.pushState({}, '', '/#inicio');
  };

  const handleOpenProduct = () => {
    setViewMode('product');
    window.history.pushState({}, '', '/sistema');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToQuote = (service?: string, property?: string, region?: string) => {
    if (service) setQuoteService(service);
    if (property) setQuoteProperty(property);
    if (region) setQuoteRegion(region);

    const el = document.getElementById('orcamento');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AdminProvider>
      {viewMode === 'admin' ? (
        <AdminLayout onBackToSite={handleBackToSite} />
      ) : viewMode === 'product' ? (
        <ProductLanding onOpenDemo={handleOpenAdmin} onBackToSite={handleBackToSite} />
      ) : (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-cyan-500 selection:text-white antialiased">
          {/* 1. Header with navigation */}
          <Header
            onOpenQuote={() => scrollToQuote()}
            onOpenContractModal={() => setActiveModal('contract')}
            onOpenAdmin={handleOpenAdmin}
          />

          <main>
            {/* 2. Hero Section */}
            <Hero onOpenQuote={() => scrollToQuote()} />

            {/* 3. Prova de Confiança (4 Indicadores sem métricas inventadas) */}
            <TrustProof />

            {/* 4. Posicionamento (Residencial, Corporativo, Comercial) */}
            <Positioning onOpenQuote={(type) => scrollToQuote(type, type)} />

            {/* 5. Nossos Serviços (Básica, Soft/Completa, Pesada) */}
            <Services onSelectService={(serviceName) => scrollToQuote(serviceName)} />

            {/* 6. Serviços Adicionais (Checklist de extras) */}
            <ExtraServices onSelectExtra={(extraName) => scrollToQuote(undefined, undefined, undefined)} />

            {/* 7 & 8. Tabelas de Valores (Residencial/Comercial & Equipe Corporativa) */}
            <PricingTables
              onSelectPlan={(category, item) => scrollToQuote(category, item)}
            />

            {/* 9. Soluções para Empresas (Pequeno, Médio, Grande Porte + Assessoria) */}
            <CorporateSolutions onOpenQuote={(tier) => scrollToQuote(tier)} />

            {/* 10 & 11. O Que Não Está Incluso & Regras de Segurança */}
            <TransparencyAndSafety />

            {/* 12 & 13. Horários de Atendimento & Como Contratar */}
            <HoursAndHiring onOpenQuote={() => scrollToQuote()} />

            {/* 14. Formulário de Orçamento (LGPD) */}
            <QuoteForm
              initialService={quoteService}
              initialProperty={quoteProperty}
              initialRegion={quoteRegion}
              onOpenPrivacyModal={() => setActiveModal('privacy')}
            />

            {/* 16 & 17. Quem Somos & Manual do Colaborador (Padrão de Atendimento) */}
            <AboutAndManual
              onOpenManualModal={() => setActiveModal('manual')}
              onOpenQuote={() => scrollToQuote()}
            />

            {/* 25, 26, 27. SEO Local (São Paulo, Zona Leste, GBP, Instagram) */}
            <LocalSEOSection
              onOpenQuoteWithRegion={(reg) => scrollToQuote(undefined, undefined, reg)}
            />

            {/* 31. FAQ (Perguntas Frequentes) */}
            <FAQSection />

            {/* 23. Contato (Canais de Atendimento) */}
            <ContactSection onOpenQuote={() => scrollToQuote()} />

            {/* 24. CTA Final */}
            <FinalCTA onOpenQuote={() => scrollToQuote()} />
          </main>

          <section className="bg-slate-950 px-5 py-8 text-white">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-400">Tecnologia ATR Studio</div>
                <div className="mt-1 text-lg font-black">Conheça o sistema usado para organizar a operação.</div>
              </div>
              <button onClick={handleOpenProduct} className="rounded-xl bg-cyan-500 px-5 py-3 text-xs font-black text-slate-950 hover:bg-cyan-400">
                Conhecer o sistema
              </button>
            </div>
          </section>

          {/* Footer com Links Legais e NAP */}
          <Footer
            onOpenModal={(modal) => setActiveModal(modal)}
            onOpenAdmin={handleOpenAdmin}
          />

          {/* Floating Elements */}
          <FloatingWhatsApp />
          <CookieBanner onOpenPreferences={() => setActiveModal('cookiePrefs')} />

          {/* Modais Legais (Contrato, Termos, Privacidade, Aviso Legal, Manual, Cookies) */}
          <LegalModals activeModal={activeModal} onClose={() => setActiveModal(null)} />
        </div>
      )}
    </AdminProvider>
  );
}

