import React, { useState } from 'react';
import {
  Wrench,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  Camera,
  Signature,
  Star,
  Printer,
  Calendar,
  Play,
  Check,
  AlertCircle,
  Users,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { ServiceOrder } from '../../types';

export const ServicesOSView: React.FC = () => {
  const {
    serviceOrders,
    teams,
    startServiceOrder,
    completeServiceOrder,
    toggleChecklistItem,
    setActiveModule,
  } = useAdmin();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOS, setSelectedOS] = useState<ServiceOrder | null>(
    serviceOrders[0] || null
  );

  const filteredOrders = serviceOrders.filter(
    (os) =>
      os.osNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      os.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      os.locationAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-black text-slate-900">
            Ordens de Serviço (OS) & Execução Técnica
          </h2>
          <p className="text-xs text-slate-600">
            Controle de cada atendimento em campo com checklists específicos por ambiente, fotos e assinatura.
          </p>
        </div>

        <button
          onClick={() => setActiveModule('execution')}
          className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <span>Abrir Modo Execução (Equipe)</span>
        </button>
      </div>

      {/* Grid: OS List on Left, Detail Dossier on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por #OS, cliente ou endereço..."
              className="w-full pl-10 pr-4 py-2 rounded-2xl border border-slate-200 bg-white text-xs text-slate-800 outline-none focus:border-cyan-500 shadow-xs"
            />
          </div>

          <div className="space-y-2 max-h-[75vh] overflow-y-auto pr-1">
            {filteredOrders.map((os) => {
              const isSelected = selectedOS?.id === os.id;
              const team = teams.find((t) => t.id === os.assignedTeamId);

              return (
                <div
                  key={os.id}
                  onClick={() => setSelectedOS(os)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-cyan-500 shadow-md ring-1 ring-cyan-500/30'
                      : 'bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded">
                      {os.osNumber}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        os.status === 'Concluído'
                          ? 'bg-emerald-100 text-emerald-800'
                          : os.status === 'Em andamento'
                          ? 'bg-amber-100 text-amber-800 animate-pulse'
                          : 'bg-cyan-100 text-cyan-800'
                      }`}
                    >
                      {os.status}
                    </span>
                  </div>

                  <div className="font-extrabold text-sm text-slate-900 mt-2">{os.clientName}</div>

                  <div className="text-xs text-slate-600 mt-1 flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{os.locationAddress}</span>
                  </div>

                  <div className="text-xs text-slate-500 mt-2 flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-800">
                      {os.scheduledDate} ({os.startTime} - {os.endTime})
                    </span>
                    <span className="text-cyan-700 font-semibold">{team ? team.name : 'Sem equipe'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed OS View (7 cols) */}
        <div className="lg:col-span-7">
          {selectedOS ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-4 border-b border-slate-100 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded">
                      {selectedOS.osNumber}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-100 text-cyan-800">
                      {selectedOS.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mt-1">
                    {selectedOS.clientName}
                  </h3>
                  <div className="text-xs text-slate-600 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{selectedOS.locationAddress}</span>
                  </div>
                </div>

                {/* Print & Action */}
                <div className="flex items-center gap-2 print:hidden">
                  <button
                    onClick={() => window.print()}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                    title="Imprimir OS"
                  >
                    <Printer className="w-4 h-4" />
                  </button>

                  {selectedOS.status === 'Confirmado' && (
                    <button
                      onClick={() => startServiceOrder(selectedOS.id)}
                      className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Play className="w-4 h-4" />
                      <span>Iniciar OS</span>
                    </button>
                  )}

                  {selectedOS.status === 'Em andamento' && (
                    <button
                      onClick={() => completeServiceOrder(selectedOS.id, 'Checklist aprovado pelo cliente.')}
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Check className="w-4 h-4" />
                      <span>Concluir OS</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Timing & Team Details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Data Prevista:</span>
                  <strong className="text-slate-900">{selectedOS.scheduledDate}</strong>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Horário:</span>
                  <strong className="text-slate-900 font-mono">
                    {selectedOS.startTime} às {selectedOS.endTime}
                  </strong>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Serviço:</span>
                  <strong className="text-cyan-700">{selectedOS.serviceType}</strong>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Faturamento:</span>
                  <strong className="text-emerald-700 font-black">
                    R$ {selectedOS.billingValue.toFixed(2)}
                  </strong>
                </div>
              </div>

              {/* Assigned Staff */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                  Profissionais em Campo Escaladas:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedOS.assignedStaffNames.map((name, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold flex items-center gap-1.5 shadow-xs"
                    >
                      <Users className="w-3.5 h-3.5 text-cyan-600" />
                      <span>{name}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Checklist Interativo por Ambiente */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 flex items-center justify-between">
                  <span>Checklist Operacional por Ambiente ({selectedOS.checklist.length} itens)</span>
                  <span className="text-cyan-700 font-mono text-[11px]">
                    {selectedOS.checklist.filter((c) => c.done).length} de {selectedOS.checklist.length} concluídos
                  </span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedOS.checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(selectedOS.id, item.id)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                        item.done
                          ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-semibold'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-cyan-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.done}
                        onChange={() => {}}
                        className="mt-0.5 rounded text-cyan-600 focus:ring-0 cursor-pointer"
                      />
                      <div>
                        <div className="font-bold">{item.task}</div>
                        <div className="text-[10px] text-slate-600 uppercase font-mono">
                          {item.area}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sign-off & Quality verification */}
              {selectedOS.status === 'Concluído' && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Ordem de Serviço Finalizada & Validada</span>
                    </span>
                    {selectedOS.clientRating && (
                      <span className="font-bold text-amber-700 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>Avaliação do Cliente: {selectedOS.clientRating} / 5</span>
                      </span>
                    )}
                  </div>
                  {selectedOS.clientFeedback && (
                    <p className="text-slate-700 italic">"{selectedOS.clientFeedback}"</p>
                  )}
                  {selectedOS.signatureUrl && (
                    <div className="text-[10px] text-emerald-800 font-mono">
                      Assinatura digital coletada no encerramento: {selectedOS.signatureUrl}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500 text-xs">
              Selecione uma ordem de serviço para visualizar.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
