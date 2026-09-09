import React, { useState } from 'react';
import { MapPin, CheckCircle, Phone, ArrowRight, Instagram, Search, ShieldCheck } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brandConfig';
import { analytics } from '../utils/analytics';

interface LocalSEOProps {
  onOpenQuoteWithRegion?: (regionName: string) => void;
}

export const LocalSEOSection: React.FC<LocalSEOProps> = ({ onOpenQuoteWithRegion }) => {
  const [selectedRegionId, setSelectedRegionId] = useState(BRAND_CONFIG.localCoverage[0].id);

  const activeRegion =
    BRAND_CONFIG.localCoverage.find((r) => r.id === selectedRegionId) ||
    BRAND_CONFIG.localCoverage[0];

  return (
    <section id="cobertura-local" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-cyan-600" />
            <span>Atuação Geográfica Especializada</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0b1d3a] tracking-tight uppercase">
            ATENDIMENTO SÃO PAULO & ZONA LESTE
          </h2>

          <p className="text-slate-600 text-sm sm:text-base">
            Logística otimizada para deslocamento rápido e equipes dedicadas na Zona Leste de São Paulo e cidades vizinhas.
          </p>
        </div>

        {/* Region Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          {BRAND_CONFIG.localCoverage.map((region) => {
            const isSelected = region.id === selectedRegionId;
            return (
              <button
                key={region.id}
                id={`btn-region-${region.id}`}
                onClick={() => {
                  setSelectedRegionId(region.id);
                  analytics.track('service_view', `local_seo_${region.name}`);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#0b1d3a] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-300' : 'text-slate-400'}`} />
                <span>{region.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Region Detailed Card */}
        <div className="max-w-4xl mx-auto rounded-3xl p-6 sm:p-10 bg-slate-50 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-cyan-100 text-cyan-800 font-mono text-[11px] font-bold uppercase">
                {activeRegion.zone}
              </span>
              <span className="text-xs text-slate-500 font-medium">Disponibilidade Ativa</span>
            </div>

            <h3 className="text-2xl font-black text-[#0b1d3a] tracking-tight">
              Limpeza Profissional em {activeRegion.name}
            </h3>

            <p className="text-sm font-semibold text-cyan-800">
              {activeRegion.highlight}
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {activeRegion.description}
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Residencial & Comercial</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Equipe Uniformizada</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-center">
            <div className="text-xs uppercase font-bold text-slate-400">
              Orçamento para {activeRegion.name}
            </div>
            
            <button
              onClick={() => {
                analytics.track('cta_click', `quote_region_${activeRegion.name}`);
                window.open(
                  BRAND_CONFIG.getWhatsAppUrl(`Olá! Gostaria de consultar disponibilidade de atendimento na região de *${activeRegion.name}* com a Ambientes Limpos.`),
                  '_blank',
                  'noopener,noreferrer'
                );
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md cursor-pointer transition-all flex items-center justify-center gap-2"
            >
              <span>Consultar Vaga na Região</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                window.open(BRAND_CONFIG.getWhatsAppUrl(), '_blank', 'noopener,noreferrer');
              }}
              className="text-[11px] text-slate-600 hover:text-emerald-700 flex items-center justify-center gap-1 mx-auto cursor-pointer font-bold"
            >
              <Phone className="w-3 h-3 text-emerald-600" />
              <span>WhatsApp: {BRAND_CONFIG.contacts.whatsappCommercial}</span>
            </button>
          </div>

        </div>

        {/* Integration Hub: Google Business Profile & Instagram Preview Ready */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto pt-4">
          
          {/* Google Business Profile NAP Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                G
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase text-[#0b1d3a] tracking-wide">
                  Perfil Google Empresas (GBP)
                </h4>
                <p className="text-[11px] text-slate-500">Dados cadastrais consolidados (NAP)</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Consistência de dados entre website, rotas e assessoria comercial para agilidade nas buscas locais por faxina profissional e facilities em São Paulo.
            </p>
            <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg font-mono">
              São Paulo — SP • Zona Leste • Tel: {BRAND_CONFIG.contacts.whatsappCommercial}
            </div>
          </div>

          {/* Instagram Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center">
                <Instagram className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase text-[#0b1d3a] tracking-wide">
                  Canal Oficial no Instagram
                </h4>
                <p className="text-[11px] text-slate-500">Bastidores, dicas e rotina profissional</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Respeito absoluto à privacidade: nunca publicamos interiores ou rostos de clientes sem consentimento. Siga para acompanhar nosso padrão técnico.
            </p>
            <a
              href={BRAND_CONFIG.contacts.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => analytics.track('cta_click', 'instagram_channel')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-700 hover:text-pink-800"
            >
              <span>Acompanhe @ambienteslimpos.sp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
