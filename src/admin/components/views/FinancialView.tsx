import React, { useState } from 'react';
import {
  CircleDollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Search,
  Printer,
  Calendar,
  Building2,
  FileCheck2,
  DollarSign,
  FileSpreadsheet,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { FinancialReceivable } from '../../types';

export const FinancialView: React.FC = () => {
  const {
    financialReceivables,
    contracts,
    markReceivableAsPaid,
    canViewFinancials,
    setActiveModule,
  } = useAdmin();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'TODOS' | 'Pago' | 'Pendente' | 'Atrasado'>('TODOS');

  if (!canViewFinancials) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500 text-xs">
        Seu perfil de acesso não possui autorização para visualização de faturamento e dados financeiros.
      </div>
    );
  }

  const totalBilling = financialReceivables.reduce((acc, f) => acc + f.amount, 0);
  const totalPaid = financialReceivables
    .filter((f) => f.status === 'Pago')
    .reduce((acc, f) => acc + f.amount, 0);
  const totalPending = financialReceivables
    .filter((f) => f.status === 'Pendente')
    .reduce((acc, f) => acc + f.amount, 0);
  const totalOverdue = financialReceivables
    .filter((f) => f.status === 'Atrasado')
    .reduce((acc, f) => acc + f.amount, 0);

  const filteredReceivables = financialReceivables.filter((f) => {
    if (statusFilter !== 'TODOS' && f.status !== statusFilter) return false;
    if (
      searchTerm &&
      !f.clientName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !f.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-black text-slate-900">
            Controle Financeiro, Faturamento & Inadimplência
          </h2>
          <p className="text-xs text-slate-600">
            Gestão unificada de mensalidades de contratos e cobranças de serviços avulsos.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveModule('sheets')}
            className="px-3.5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs border border-emerald-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Exportar faturamento para o Google Sheets"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Google Sheets</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Relatório Financeiro</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Faturamento */}
        <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider">Faturamento Total</span>
            <CircleDollarSign className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            R$ {totalBilling.toLocaleString('pt-BR')}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Lançado no período</p>
        </div>

        {/* Recebido */}
        <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider">Recebido / Liquidado</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-600">
            R$ {totalPaid.toLocaleString('pt-BR')}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">PIX, Transferência e Boleto</p>
        </div>

        {/* Pendente */}
        <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider">A Vencer</span>
            <Clock className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="text-2xl font-black text-slate-700">
            R$ {totalPending.toLocaleString('pt-BR')}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Dentro do prazo de vencimento</p>
        </div>

        {/* Atrasado / Inadimplência */}
        <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider">Inadimplência</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-rose-600">
            R$ {totalOverdue.toLocaleString('pt-BR')}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Requer acionamento amigável</p>
        </div>
      </div>

      {/* Receivables Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
              Lançamentos a Receber ({filteredReceivables.length})
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter Pills */}
            <div className="flex bg-slate-100 p-1 rounded-2xl text-[11px] font-bold">
              {(['TODOS', 'Pago', 'Pendente', 'Atrasado'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-xl uppercase tracking-wider text-[10px] cursor-pointer transition-all ${
                    statusFilter === st ? 'bg-cyan-600 text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar cliente / fatura..."
                className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
              />
            </div>
          </div>
        </div>

        {filteredReceivables.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-xs">
            Nenhum lançamento encontrado para os filtros selecionados.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Fatura / Título</th>
                  <th className="p-3">Cliente</th>
                  <th className="p-3">Descrição</th>
                  <th className="p-3">Vencimento</th>
                  <th className="p-3">Forma</th>
                  <th className="p-3 text-right">Valor</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredReceivables.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3 font-mono font-bold text-cyan-700">{f.invoiceNumber}</td>
                    <td className="p-3 font-bold text-slate-900">{f.clientName}</td>
                    <td className="p-3 text-slate-600 truncate max-w-xs">{f.description}</td>
                    <td className="p-3 font-mono text-slate-800">{f.dueDate}</td>
                    <td className="p-3 text-slate-600">{f.paymentMethod}</td>
                    <td className="p-3 text-right font-black font-mono text-slate-900">
                      R$ {f.amount.toFixed(2)}
                    </td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          f.status === 'Pago'
                            ? 'bg-emerald-100 text-emerald-800'
                            : f.status === 'Atrasado'
                            ? 'bg-rose-100 text-rose-800 font-extrabold'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {f.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {f.status !== 'Pago' ? (
                        <button
                          onClick={() => markReceivableAsPaid(f.id)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow-xs cursor-pointer transition-colors"
                        >
                          Baixar Pago
                        </button>
                      ) : (
                        <span className="text-emerald-700 font-bold text-[10px] flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Liquidado
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
