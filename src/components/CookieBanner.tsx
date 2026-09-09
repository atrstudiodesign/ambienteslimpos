import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck } from 'lucide-react';
import { analytics } from '../utils/analytics';

interface CookieBannerProps {
  onOpenPreferences: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenPreferences }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('ambientes_limpos_cookie_consent');
    if (!consent) {
      // Delay slightly for smooth entering
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('ambientes_limpos_cookie_consent', 'accepted');
    setVisible(false);
    analytics.track('cta_click', 'cookie_accept');
  };

  const handleDecline = () => {
    localStorage.setItem('ambientes_limpos_cookie_consent', 'declined');
    setVisible(false);
    analytics.track('cta_click', 'cookie_decline');
  };

  const handlePreferences = () => {
    analytics.track('cta_click', 'cookie_preferences');
    onOpenPreferences();
  };

  if (!visible) return null;

  return (
    <div
      id="cookie-consent-banner"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-40 p-5 rounded-2xl bg-[#0b1d3a] text-white shadow-2xl border border-white/15 animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
          <Cookie className="w-4 h-4" />
        </div>
        <div className="text-xs text-slate-200 leading-relaxed">
          Este site utiliza cookies para melhorar sua experiência e, quando aplicável, analisar o uso da página com total segurança e respeito à sua privacidade (LGPD).
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <button
          id="cookie-accept-btn"
          onClick={handleAccept}
          className="flex-1 py-2 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[11px] uppercase tracking-wider transition-colors cursor-pointer text-center"
        >
          Aceitar
        </button>

        <button
          id="cookie-decline-btn"
          onClick={handleDecline}
          className="flex-1 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-[11px] uppercase tracking-wider transition-colors cursor-pointer text-center"
        >
          Recusar
        </button>

        <button
          id="cookie-prefs-btn"
          onClick={handlePreferences}
          className="py-2 px-2.5 rounded-lg text-slate-400 hover:text-white text-[11px] font-medium transition-colors cursor-pointer"
        >
          Preferências
        </button>
      </div>
    </div>
  );
};
