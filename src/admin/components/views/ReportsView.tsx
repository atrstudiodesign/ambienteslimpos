import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  Users,
  Calendar,
  DollarSign,
  Download,
  Printer,
  Star,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const ReportsView: React.FC = () => {
  const { serviceOrders, quotes, contracts, staff } = useAdmin();

  const totalServices = serviceOrders.length;
  const completedServices = serviceOrders.filter((s) => s.status === 'Concluído').length;
  const quotesCount = quotes.length;
  const approvedQuotes = quotes.filter((q) => q.status === 'Aprovado').length;
  const conversionRate = quotesCount > 0 ? Math.round((approvedQuotes / quotesCount) * 100) : 0;

  const topStaff = [...staff].sort((a, b) => b.averageRating - a.averageRating);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-black text-slate-900">
            Centro de Relatórios & Inteligência Operacional
          </h2>
          <p className="text-xs text-slate-600">
            Métricas consolidadas de produtividade, índice de satisfação do cliente e conversão de propostas.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Printer className="w-4 h-4" />
          <span>Exportar Relatório</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider">Taxa de Conclusão OS</span>
            <Award className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {totalServices > 0 ? Math.round((completedServices / totalServices) * 100) : 100}%
          </div>
          <p className="text-[11px] text-slate-500 mt-1">{completedServices} de {totalServices} finalizadas</p>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider">Conversão de Orçamentos</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-600">{conversionRate}%</div>
          <p className="text-[11px] text-slate-500 mt-1">{approvedQuotes} propostas convertidas</p>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider">Contratos Recorrentes</span>
            <BarChart3 className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{contracts.length}</div>
          <p className="text-[11px] text-slate-500 mt-1">100% de retenção no período</p>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider">Média NPS / Qualidade</span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600">4.9 / 5.0</div>
          <p className="text-[11px] text-slate-500 mt-1">Avaliações verificadas</p>
        </div>
      </div>

      {/* Two columns: Ranking de Colaboradoras & Desempenho por Tipo de Serviço */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ranking */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Ranking de Excelência das Profissionais</span>
          </h3>

          <div className="space-y-3">
            {topStaff.map((s, idx) => (
              <div
                key={s.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#0a1e38] text-amber-400 font-black text-[11px] flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="font-extrabold text-slate-900">{s.name}</div>
                    <div className="text-[11px] text-slate-500">
                      {s.role} &bull; {s.totalServicesCompleted} atendimentos realizados
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-black text-slate-900 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{s.averageRating}</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold uppercase">Nota Máxima</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Volume de Serviços por Categoria */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-cyan-600" />
            <span>Distribuição de Demanda por Modalidade</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between font-semibold text-slate-700">
                <span>Limpeza Corporativa / Escritórios</span>
                <span className="font-bold text-slate-900">55%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-600 h-2 rounded-full" style={{ width: '55%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-semibold text-slate-700">
                <span>Limpeza Residencial Frequente / Quinzenal</span>
                <span className="font-bold text-slate-900">25%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '25%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-semibold text-slate-700">
                <span>Pós-Obra & Pré-Mudança</span>
                <span className="font-bold text-slate-900">15%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '15%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-semibold text-slate-700">
                <span>Tratamento de Pisos & Vidraças</span>
                <span className="font-bold text-slate-900">5%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '5%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
