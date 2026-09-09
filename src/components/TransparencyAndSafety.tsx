import React from 'react';
import { XCircle, ShieldAlert, Package, Navigation, AlertTriangle, Lock } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brandConfig';

export const TransparencyAndSafety: React.FC = () => {
  const notIncludedItems = [
    'Produtos especiais não convencionais',
    'Serviços extras não contratados previamente',
    'Alimentação, quando aplicável ao período',
    'Serviços fora do escopo formalmente contratado',
    'Atividades que envolvam qualquer grau de risco físico',
    'Limpeza pesada de pós-obra (necessita equipe e maquinário especializado)',
    'Remoção de entulho ou descarte de materiais pesados',
    'Resíduos perigosos, químicos ou hospitalares',
    'Trabalhos em altura (fora do alcance manual seguro)',
    'Qualquer serviço que comprometa a segurança ou dignidade da equipe',
  ];

  const safetyForbiddenLocations = [
    'Telhados e lajes sem proteção',
    'Muros e parapeitos',
    'Estruturas instáveis ou frágeis',
    'Móveis altos utilizados como escada',
    'Locais sem iluminação ou segurança física',
    'Estruturas improvisadas (bancos, caixas, andaimes caseiros)',
    'Áreas de difícil acesso que apresentem risco de queda',
  ];

  // Regra de locomoção configurável a partir de BRAND_CONFIG.LOCOMOCAO_INCLUSA
  const getLocomocaoText = () => {
    if (BRAND_CONFIG.LOCOMOCAO_INCLUSA === 'definir_com_assessoria') {
      return 'A condição de locomoção deve ser definida no orçamento. Consulte com a assessoria conforme seu bairro e região.';
    }
    return BRAND_CONFIG.LOCOMOCAO_INCLUSA;
  };

  return (
    <section id="transparencia-seguranca" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section 1: O QUE NÃO ESTÁ INCLUSO */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold tracking-widest text-slate-500 uppercase bg-slate-200/70 px-3 py-1 rounded-full">
              Clareza Contratual
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0b1d3a] tracking-tight uppercase">
              O QUE NÃO ESTÁ INCLUSO
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-medium">
              Transparência antes de contratar. Não escondemos regras.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Exclusion list (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Não estão automaticamente incluídos no serviço básico:</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {notIncludedItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Cards: Produtos & Locomoção (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Card Produtos */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                  <Package className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#0b1d3a] uppercase tracking-wide">
                    PRODUTOS
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Produtos específicos solicitados ou necessários fora do escopo padrão poderão ser cobrados separadamente, conforme alinhamento prévio.
                  </p>
                </div>
              </div>

              {/* Card Locomoção */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Navigation className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#0b1d3a] uppercase tracking-wide">
                    LOCOMOÇÃO
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {getLocomocaoText()}
                  </p>
                  <div className="pt-2">
                    <span className="inline-block font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 border border-slate-200">
                      LOCOMOCAO_INCLUSA = {BRAND_CONFIG.LOCOMOCAO_INCLUSA}
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Section 2: REGRAS DE SEGURANÇA */}
        <div className="rounded-3xl bg-[#0b1d3a] text-white p-8 sm:p-12 border border-white/10 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-3 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider border border-rose-500/30">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Prioridade Absoluta</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
              NOSSA SEGURANÇA TAMBÉM É PRIORIDADE
            </h3>

            <p className="text-sm sm:text-base text-slate-300 font-medium">
              Não realizamos atividades que coloquem a equipe em risco. O bem-estar e integridade física de nossas colaboradoras são inegociáveis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Box 1: Onde não subimos */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h4 className="text-xs font-bold uppercase tracking-widest text-cyan-300 mb-3 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-400" />
                <span>Não subir em:</span>
              </h4>
              <ul className="space-y-2">
                {safetyForbiddenLocations.map((loc, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <span>{loc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Box 2: Diretrizes & Objetos de valor */}
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3.5">
                <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs sm:text-sm text-slate-200">
                  <span className="font-bold text-white block">Trabalhos sem Exposição a Riscos</span>
                  <p className="text-xs text-slate-300">
                    Não realizar trabalhos que exijam exposição desnecessária a risco físico, choque elétrico, produtos altamente tóxicos ou animais agressivos soltos no local.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3.5">
                <Lock className="w-5 h-5 text-cyan-300 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs sm:text-sm text-slate-200">
                  <span className="font-bold text-white block">Guarda de Objetos de Valor</span>
                  <p className="text-xs text-slate-300">
                    Objetos de valor, dinheiro, joias e documentos confidenciais devem estar devidamente guardados e trancados pelo contratante antes do início dos trabalhos.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
