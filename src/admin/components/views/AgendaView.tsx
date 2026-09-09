import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Filter,
  Users,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  MapPin,
  Wrench,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { ServiceOrder, ServiceOrderStatus } from '../../types';

export const AgendaView: React.FC = () => {
  const {
    serviceOrders,
    teams,
    clients,
    addServiceOrder,
    setActiveModule,
  } = useAdmin();

  const [viewMode, setViewMode] = useState<'dia' | 'semana' | 'mes' | 'lista'>('dia');
  const [selectedDate, setSelectedDate] = useState('2026-09-09');
  const [selectedTeamFilter, setSelectedTeamFilter] = useState('TODAS');
  const [isNewServiceModalOpen, setIsNewServiceModalOpen] = useState(false);

  // New Service Modal Form State
  const [clientId, setClientId] = useState(clients[0]?.id || '');
  const [scheduledDate, setScheduledDate] = useState('2026-09-10');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('13:00');
  const [assignedTeamId, setAssignedTeamId] = useState(teams[0]?.id || '');
  const [serviceType, setServiceType] = useState<'Básica' | 'Soft / Completa' | 'Pesada'>('Soft / Completa');
  const [billingValue, setBillingValue] = useState(380);

  // Filter orders
  const filteredOrders = serviceOrders.filter((os) => {
    if (viewMode === 'dia' && os.scheduledDate !== selectedDate) return false;
    if (selectedTeamFilter !== 'TODAS' && os.assignedTeamId !== selectedTeamFilter) return false;
    return true;
  });

  // Conflict detection
  const detectConflicts = () => {
    const conflicts: string[] = [];
    const dateMap: Record<string, ServiceOrder[]> = {};

    serviceOrders.forEach((os) => {
      const key = `${os.scheduledDate}_${os.assignedTeamId}`;
      if (!os.assignedTeamId) return;
      if (!dateMap[key]) dateMap[key] = [];
      dateMap[key].push(os);
    });

    Object.entries(dateMap).forEach(([key, orders]) => {
      if (orders.length > 1) {
        // Check for time overlap
        for (let i = 0; i < orders.length; i++) {
          for (let j = i + 1; j < orders.length; j++) {
            const o1 = orders[i];
            const o2 = orders[j];
            if (o1.startTime === o2.startTime) {
              conflicts.push(
                `Conflito detectado: Equipe escalada simultaneamente para ${o1.clientName} e ${o2.clientName} em ${o1.scheduledDate} às ${o1.startTime}.`
              );
            }
          }
        }
      }
    });

    return conflicts;
  };

  const activeConflicts = detectConflicts();

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find((c) => c.id === clientId);
    const team = teams.find((t) => t.id === assignedTeamId);

    addServiceOrder({
      clientId,
      clientName: client ? client.name : 'Cliente Avulso',
      clientPhone: client ? client.phone : '(11) 93902-6928',
      locationId: client?.locations[0]?.id || '',
      locationAddress: client?.locations[0]?.address || 'São Paulo - SP',
      assignedTeamId,
      assignedStaffNames: team ? team.memberNames : [],
      scheduledDate,
      startTime,
      endTime,
      serviceType,
      billingValue,
      status: 'Confirmado',
      scopeSummary: `Serviço de limpeza ${serviceType} programado.`,
    });

    setIsNewServiceModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Controls Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Date Navigator & Views */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              onClick={() => setSelectedDate('2026-09-08')}
              className="p-1.5 rounded-xl hover:bg-white text-slate-700 transition-colors"
              title="Dia anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 text-xs font-black text-slate-900 font-mono">
              {selectedDate === '2026-09-09' ? 'Hoje, 09/09/2026' : selectedDate}
            </span>
            <button
              onClick={() => setSelectedDate('2026-09-10')}
              className="p-1.5 rounded-xl hover:bg-white text-slate-700 transition-colors"
              title="Próximo dia"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* View Mode Tabs */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
            {(['dia', 'semana', 'mes', 'lista'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1.5 rounded-xl uppercase tracking-wider text-[10px] transition-all cursor-pointer ${
                  viewMode === mode
                    ? 'bg-cyan-600 text-white shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Team Filter */}
          <div className="flex items-center gap-1 text-xs">
            <Users className="w-3.5 h-3.5 text-slate-400 ml-2" />
            <select
              value={selectedTeamFilter}
              onChange={(e) => setSelectedTeamFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 outline-none focus:border-cyan-500"
            >
              <option value="TODAS">Todas as Equipes</option>
              {teams.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right: New Service Button */}
        <button
          onClick={() => setIsNewServiceModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Agendar Serviço</span>
        </button>
      </div>

      {/* Conflict Warning if Any */}
      {activeConflicts.length > 0 && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-extrabold uppercase tracking-wide">Aviso de Conflito de Grade</div>
            <ul className="list-disc list-inside mt-1 space-y-0.5 text-rose-800">
              {activeConflicts.map((c, idx) => (
                <li key={idx}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Timeline Grid (08:00 às 20:00) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
              Grade Horária • {selectedDate}
            </h3>
            <p className="text-xs text-slate-500">
              {filteredOrders.length} atendimentos registrados para esta visualização.
            </p>
          </div>
          <div className="text-xs text-slate-400 font-mono">Status em Tempo Real</div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-xs">
            Nenhum serviço agendado para o filtro selecionado. Clique em "Agendar Serviço" para escalar uma equipe.
          </div>
        ) : (
          <div className="space-y-3">
            {filteredOrders.map((os) => {
              const team = teams.find((t) => t.id === os.assignedTeamId);

              return (
                <div
                  key={os.id}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-cyan-400 bg-slate-50/50 hover:bg-white transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-20 py-2 rounded-xl bg-[#0a1e38] text-white flex flex-col items-center justify-center shrink-0">
                      <span className="text-xs font-black text-amber-400">{os.startTime}</span>
                      <span className="text-[10px] text-slate-400">{os.endTime}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-sm text-slate-900">{os.clientName}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                          {os.status}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">{os.osNumber}</span>
                      </div>

                      <div className="text-xs text-slate-600 flex items-center gap-1.5 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{os.locationAddress}</span>
                      </div>

                      <div className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                        <span className="font-medium text-slate-700">Tipo: {os.serviceType}</span>
                        <span>•</span>
                        <span className="text-cyan-700 font-semibold">
                          Equipe: {team ? team.name : 'Sem Equipe Atribuída'}
                        </span>
                        <span>•</span>
                        <span className="text-slate-800 font-bold">R$ {os.billingValue.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => setActiveModule('services')}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                    >
                      Abrir OS
                    </button>
                    <button
                      onClick={() => setActiveModule('execution')}
                      className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-colors cursor-pointer"
                    >
                      Modo Execução
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal: Agendar Novo Serviço */}
      {isNewServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                Novo Agendamento de Serviço
              </h3>
              <button
                onClick={() => setIsNewServiceModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateService} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Cliente</label>
                <select
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium text-slate-800"
                >
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.type})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Data</label>
                  <input
                    type="date"
                    required
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Início</label>
                  <input
                    type="time"
                    required
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Término</label>
                  <input
                    type="time"
                    required
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Equipe Operacional</label>
                  <select
                    value={assignedTeamId}
                    onChange={(e) => setAssignedTeamId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium text-slate-800"
                  >
                    {teams.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tipo de Limpeza</label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium text-slate-800"
                  >
                    <option value="Básica">Básica</option>
                    <option value="Soft / Completa">Soft / Completa</option>
                    <option value="Pesada">Pesada</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Valor do Serviço (R$)</label>
                <input
                  type="number"
                  value={billingValue}
                  onChange={(e) => setBillingValue(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-900"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewServiceModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold shadow-md"
                >
                  Confirmar Agendamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
