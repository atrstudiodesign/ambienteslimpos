import React from 'react';
import {
  Calendar,
  Clock,
  Wrench,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  FileSpreadsheet,
  CircleDollarSign,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  MapPin,
  Users2,
  Play,
  Check,
  ChevronRight,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { ServiceOrderStatus } from '../../types';

export const DashboardView: React.FC = () => {
  const {
    currentUser,
    serviceOrders,
    contracts,
    quotes,
    financialReceivables,
    teams,
    smartAlerts,
    setActiveModule,
    startServiceOrder,
    completeServiceOrder,
    canViewFinancials,
  } = useAdmin();

  const todayStr = '2026-09-09';
  const todayOrders = serviceOrders.filter((o) => o.scheduledDate === todayStr);

  const inProgressCount = todayOrders.filter((o) => o.status === 'Em andamento').length;
  const completedCount = todayOrders.filter((o) => o.status === 'Concluído').length;
  const pendingCount = todayOrders.filter(
    (o) => o.status === 'Agendado' || o.status === 'Confirmado'
  ).length;

  const openQuotesCount = quotes.filter(
    (q) => q.status === 'Enviado' || q.status === 'Negociação'
  ).length;

  const activeContractsCount = contracts.filter((c) => c.status === 'Ativo').length;

  // Financials
  const receivablePendingTotal = financialReceivables
    .filter((f) => f.status === 'Pendente' || f.status === 'Atrasado')
    .reduce((acc, f) => acc + f.amount, 0);

  const receivablePaidTotal = financialReceivables
    .filter((f) => f.status === 'Pago')
    .reduce((acc, f) => acc + f.amount, 0);

  const getStatusBadge = (status: ServiceOrderStatus) => {
    switch (status) {
      case 'Concluído':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Em andamento':
        return 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse';
      case 'Confirmado':
        return 'bg-cyan-100 text-cyan-800 border-cyan-300';
      case 'Agendado':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      case 'Cancelado':
        return 'bg-rose-100 text-rose-700 border-rose-300';
      case 'Aguardando aprovação':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Greeting */}
      <div className="bg-gradient-to-r from-[#0a1e38] via-[#0d284d] to-[#0a1e38] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold mb-3 border border-cyan-500/30">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Operação em Tempo Real • Terça-feira, 09 de Setembro</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Bom dia, {currentUser.name.split(' ')[0]}!
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1.5 leading-relaxed">
            Veja o que está acontecendo na sua operação hoje. Todas as equipes, ordens de serviço, contratos e recebimentos estão sincronizados no ERP.
          </p>
        </div>
      </div>

      {/* 8 Metric Cards per User Specification */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* 1. Serviços Hoje */}
        <div
          onClick={() => setActiveModule('services')}
          className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-cyan-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-600 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider">Serviços Hoje</span>
            <Calendar className="w-4 h-4 text-cyan-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{todayOrders.length}</div>
          <p className="text-[11px] text-slate-600 mt-1">Escalados para o dia</p>
        </div>

        {/* 2. Em Andamento */}
        <div
          onClick={() => setActiveModule('services')}
          className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-amber-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-600 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider">Em Andamento</span>
            <Clock className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600">{inProgressCount}</div>
          <p className="text-[11px] text-slate-600 mt-1">Equipes em execução</p>
        </div>

        {/* 3. Concluídos */}
        <div
          onClick={() => setActiveModule('services')}
          className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-600 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider">Concluídos</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600">{completedCount}</div>
          <p className="text-[11px] text-slate-600 mt-1">Finalizados com checklist</p>
        </div>

        {/* 4. Pendentes */}
        <div
          onClick={() => setActiveModule('services')}
          className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-cyan-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-600 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider">Pendentes</span>
            <Wrench className="w-4 h-4 text-slate-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-700">{pendingCount}</div>
          <p className="text-[11px] text-slate-600 mt-1">A iniciar no dia</p>
        </div>

        {/* 5. Orçamentos Abertos */}
        <div
          onClick={() => setActiveModule('quotes')}
          className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-cyan-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-600 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider">Orçamentos Abertos</span>
            <FileSpreadsheet className="w-4 h-4 text-cyan-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{openQuotesCount}</div>
          <p className="text-[11px] text-slate-600 mt-1">Em negociação/enviados</p>
        </div>

        {/* 6. Contratos Ativos */}
        <div
          onClick={() => setActiveModule('contracts')}
          className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-cyan-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-600 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider">Contratos Ativos</span>
            <FileCheck2 className="w-4 h-4 text-cyan-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{activeContractsCount}</div>
          <p className="text-[11px] text-slate-600 mt-1">Receita mensal recorrente</p>
        </div>

        {/* 7. Valor a Receber */}
        <div
          onClick={() => canViewFinancials && setActiveModule('financial')}
          className={`p-4 rounded-2xl bg-white border border-slate-200 shadow-xs transition-all ${
            canViewFinancials ? 'hover:border-amber-400 cursor-pointer group' : 'opacity-70'
          }`}
        >
          <div className="flex items-center justify-between text-slate-600 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider">A Receber</span>
            <CircleDollarSign className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900">
            {canViewFinancials ? `R$ ${receivablePendingTotal.toLocaleString('pt-BR')}` : 'Restrito'}
          </div>
          <p className="text-[11px] text-slate-600 mt-1">Faturas pendentes/atrasadas</p>
        </div>

        {/* 8. Valor Recebido */}
        <div
          onClick={() => canViewFinancials && setActiveModule('financial')}
          className={`p-4 rounded-2xl bg-white border border-slate-200 shadow-xs transition-all ${
            canViewFinancials ? 'hover:border-emerald-400 cursor-pointer group' : 'opacity-70'
          }`}
        >
          <div className="flex items-center justify-between text-slate-600 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider">Recebido Mês</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-600">
            {canViewFinancials ? `R$ ${receivablePaidTotal.toLocaleString('pt-BR')}` : 'Restrito'}
          </div>
          <p className="text-[11px] text-slate-600 mt-1">Liquidado em Setembro</p>
        </div>
      </div>

      {/* 6. Intelligent Alerts Block ("ATENÇÃO") */}
      {smartAlerts.length > 0 && (
        <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-wide text-amber-950">
                  Atenção Operacional ({smartAlerts.length} itens requerem ação)
                </h3>
                <p className="text-xs text-amber-800">
                  Alertas em tempo real com ações imediatas para a liderança.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {smartAlerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs flex items-center justify-between gap-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-xs text-slate-900">{alert.title}</div>
                  <div className="text-[11px] text-slate-600 mt-0.5 line-clamp-2">
                    {alert.description}
                  </div>
                </div>
                <button
                  onClick={() => setActiveModule(alert.module)}
                  className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                >
                  <span>{alert.actionLabel}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Agenda de Hoje — Timeline (08:00, 09:30, 11:00, 13:00, 15:00, 17:00) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Agenda & Timeline de Hoje
            </h3>
            <p className="text-xs text-slate-600">
              Cronograma operacional de limpeza com equipes e status em tempo real.
            </p>
          </div>
          <button
            onClick={() => setActiveModule('agenda')}
            className="text-xs font-bold text-cyan-800 hover:text-cyan-900 flex items-center gap-1 cursor-pointer"
          >
            <span>Ver Grade Completa</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {todayOrders.length === 0 ? (
          <div className="py-12 text-center text-slate-600 text-xs">
            Nenhum serviço programado para hoje na base de dados.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {todayOrders.map((os) => {
              const team = teams.find((t) => t.id === os.assignedTeamId);

              return (
                <div
                  key={os.id}
                  className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/80 px-2 rounded-2xl transition-colors"
                >
                  {/* Left: Time & Client */}
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-14 rounded-2xl bg-[#0a1e38] text-white flex flex-col items-center justify-center shrink-0 border border-slate-800">
                      <span className="text-xs font-black text-amber-400">{os.startTime}</span>
                      <span className="text-[10px] text-slate-400">{os.endTime}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-sm text-slate-900">{os.clientName}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(
                            os.status
                          )}`}
                        >
                          {os.status}
                        </span>
                        <span className="text-xs font-mono text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded">
                          {os.osNumber}
                        </span>
                      </div>

                      <div className="text-xs text-slate-600 flex items-center gap-1.5 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate max-w-md">{os.locationAddress}</span>
                      </div>

                      <div className="text-xs text-slate-600 mt-1 flex items-center gap-3">
                        <span className="font-semibold text-slate-700">Tipo: {os.serviceType}</span>
                        <span>•</span>
                        <span className="text-cyan-800 font-medium">
                          Equipe: {team ? team.name : 'Não Atribuída'}
                        </span>
                        {os.billingValue > 0 && (
                          <>
                            <span>•</span>
                            <span className="font-bold text-slate-900">
                              R$ {os.billingValue.toFixed(2)}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Quick Action Buttons */}
                  <div className="flex items-center gap-2 self-end md:self-center">
                    {os.status === 'Confirmado' && (
                      <button
                        onClick={() => startServiceOrder(os.id)}
                        className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Iniciar</span>
                      </button>
                    )}

                    {os.status === 'Em andamento' && (
                      <button
                        onClick={() => completeServiceOrder(os.id, 'Finalizado via dashboard')}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Concluir</span>
                      </button>
                    )}

                    <button
                      onClick={() => setActiveModule('services')}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                    >
                      Ver OS
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Row: Equipes em Campo & Pipeline Resumido */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Equipes Operacionais */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Users2 className="w-4 h-4 text-cyan-600" />
              <span>Equipes em Campo</span>
            </h4>
            <button
              onClick={() => setActiveModule('teams')}
              className="text-xs font-bold text-cyan-800 hover:underline cursor-pointer"
            >
              Gerenciar Equipes
            </button>
          </div>

          <div className="space-y-2.5">
            {teams.map((t) => (
              <div
                key={t.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-xs text-slate-900 flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: t.color }}
                    />
                    <span>{t.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5">
                    Líder: {t.leaderName} • {t.memberNames.length} profissionais
                  </div>
                  <div className="text-[10px] text-slate-600 font-mono">
                    Região: {t.assignedRegion}
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-black">
                    ⭐ {t.averageRating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-3">
          <h4 className="font-bold text-sm text-slate-900">Ações Rápidas de Gestão</h4>
          <p className="text-xs text-slate-600">
            Acesse rapidamente os fluxos essenciais de abertura e formalização.
          </p>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <button
              onClick={() => setActiveModule('quotes')}
              className="p-3 rounded-2xl bg-slate-50 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-300 text-left transition-colors cursor-pointer group"
            >
              <FileSpreadsheet className="w-4 h-4 text-cyan-600 mb-1.5" />
              <div className="font-bold text-xs text-slate-900">Novo Orçamento</div>
              <div className="text-[10px] text-slate-600">Calcular proposta para cliente</div>
            </button>

            <button
              onClick={() => setActiveModule('agenda')}
              className="p-3 rounded-2xl bg-slate-50 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-300 text-left transition-colors cursor-pointer group"
            >
              <Calendar className="w-4 h-4 text-cyan-600 mb-1.5" />
              <div className="font-bold text-xs text-slate-900">Novo Agendamento</div>
              <div className="text-[10px] text-slate-600">Escalar serviço e equipe</div>
            </button>

            <button
              onClick={() => setActiveModule('clients')}
              className="p-3 rounded-2xl bg-slate-50 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-300 text-left transition-colors cursor-pointer group"
            >
              <MapPin className="w-4 h-4 text-cyan-600 mb-1.5" />
              <div className="font-bold text-xs text-slate-900">Cadastrar Cliente</div>
              <div className="text-[10px] text-slate-600">Ficha completa com locais</div>
            </button>

            <button
              onClick={() => setActiveModule('communication')}
              className="p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-left transition-colors cursor-pointer group"
            >
              <Clock className="w-4 h-4 text-emerald-600 mb-1.5" />
              <div className="font-bold text-xs text-slate-900">Disparo WhatsApp</div>
              <div className="text-[10px] text-slate-600">Modelos pré-formatados</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
