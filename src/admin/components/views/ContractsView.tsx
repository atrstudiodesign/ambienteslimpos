import React, { useState } from 'react';
import {
  FileCheck2,
  Plus,
  Search,
  CheckCircle2,
  AlertTriangle,
  Printer,
  Calendar,
  DollarSign,
  ShieldCheck,
  Lock,
  RefreshCw,
  Building2,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { Contract } from '../../types';

export const ContractsView: React.FC = () => {
  const {
    contracts,
    clients,
    addContract,
    canAccessRestrictedDocs,
    currentUser,
    setActiveModule,
  } = useAdmin();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContract, setSelectedContract] = useState<Contract | null>(
    contracts[0] || null
  );
  const [isNewContractModalOpen, setIsNewContractModalOpen] = useState(false);

  // New Contract Form State
  const [clientId, setClientId] = useState(clients[0]?.id || '');
  const [serviceType, setServiceType] = useState('Limpeza Corporativa Contínua');
  const [startDate, setStartDate] = useState('2026-09-01');
  const [endDate, setEndDate] = useState('2027-08-31');
  const [monthlyValue, setMonthlyValue] = useState(2400);
  const [paymentDueDay, setPaymentDueDay] = useState(10);
  const [frequency, setFrequency] = useState('Segunda, Quarta e Sexta (3x/semana)');

  const filteredContracts = contracts.filter(
    (c) =>
      (c.contractNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.clientName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getContractClauses = (contract: Contract): string[] => [
    `Objeto: ${contract.scope || contract.serviceType || 'Prestação de serviços de limpeza profissional.'}`,
    `Frequência e jornada: ${contract.frequency || 'Conforme programação'} — ${contract.scheduledDays || 'dias a definir'}, ${contract.scheduledHours || 'horário a definir'}.`,
    `Pagamento: R$ ${Number(contract.monthlyValue || 0).toFixed(2)} por mês via ${contract.paymentMethod || 'meio acordado'}, com vencimento no dia ${contract.paymentDueDay || 10}.`,
    `SLA operacional: ${contract.slaTerms || 'Conforme condições operacionais acordadas entre as partes.'}`,
    `Reajuste: ${contract.adjustmentIndex || 'conforme contrato'}, com próxima referência em ${contract.nextAdjustmentDate || 'data a definir'}.`,
  ];

  const handleCreateContract = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find((c) => c.id === clientId);

    const location = client?.locations?.[0];

    const created = addContract({
      clientId,
      clientName: client ? client.name : 'Cliente Contratante',
      clientDocument: client?.document || '',
      locationId: location?.id || '',
      locationAddress: location?.address || 'São Paulo - SP',
      serviceType,
      scope: `Prestação contínua de ${serviceType.toLowerCase()} conforme escopo aprovado pelo cliente.`,
      startDate,
      endDate,
      monthlyValue,
      paymentDueDay,
      frequency,
      scheduledDays: frequency,
      scheduledHours: location?.preferredHours || 'A combinar',
      paymentMethod: 'Boleto Bancário',
      status: 'Ativo',
      adjustmentIndex: 'IPCA',
      nextAdjustmentDate: endDate,
      slaTerms: 'Em caso de ausência operacional comunicada, a equipe responsável providenciará reposição conforme disponibilidade e condições contratuais.',
    });

    setSelectedContract(created);

    setIsNewContractModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              Central de Contratos & Faturamento Recorrente
            </h2>
            {canAccessRestrictedDocs && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-amber-700" />
                <span>Admin Verificado: {currentUser.email}</span>
              </span>
            )}
          </div>
          <p className="text-xs text-slate-600">
            Acompanhe vigência, SLA de reposição, datas de reajuste e garantias jurídicas.
          </p>
        </div>

        {canAccessRestrictedDocs && (
          <button
            onClick={() => setIsNewContractModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Contrato</span>
          </button>
        )}
      </div>

      {/* Grid: Contracts List on Left, Document Viewer on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar contrato (#CTR) ou cliente..."
              className="w-full pl-10 pr-4 py-2 rounded-2xl border border-slate-200 bg-white text-xs text-slate-800 outline-none focus:border-cyan-500 shadow-xs"
            />
          </div>

          <div className="space-y-2 max-h-[75vh] overflow-y-auto pr-1">
            {filteredContracts.map((ctr) => {
              const isSelected = selectedContract?.id === ctr.id;

              return (
                <div
                  key={ctr.id}
                  onClick={() => setSelectedContract(ctr)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-cyan-500 shadow-md ring-1 ring-cyan-500/30'
                      : 'bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded">
                      {ctr.contractNumber}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        ctr.status === 'Ativo'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ctr.status === 'Em Renovação'
                          ? 'bg-amber-100 text-amber-800 animate-pulse'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {ctr.status}
                    </span>
                  </div>

                  <div className="font-extrabold text-sm text-slate-900 mt-2 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-cyan-700 shrink-0" />
                    <span className="truncate">{ctr.clientName}</span>
                  </div>

                  <div className="text-xs text-slate-600 mt-1">{ctr.frequency}</div>

                  <div className="text-xs text-slate-900 font-extrabold mt-2 flex items-center justify-between">
                    <span className="text-slate-500 font-normal">Valor Mensal:</span>
                    <span className="text-emerald-700 font-black text-sm">
                      R$ {ctr.monthlyValue.toFixed(2)}/mês
                    </span>
                  </div>

                  <div className="text-[10px] text-slate-500 font-mono mt-1">
                    Vigência até: {ctr.endDate} (Venc. todo dia {ctr.paymentDueDay})
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Contract Dossier & Clauses (7 cols) */}
        <div className="lg:col-span-7">
          {selectedContract ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-4 border-b border-slate-100 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded">
                      {selectedContract.contractNumber}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {selectedContract.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mt-1">
                    {selectedContract.clientName}
                  </h3>
                  <div className="text-xs text-slate-600 font-medium">
                    {selectedContract.serviceType} &bull; {selectedContract.frequency}
                  </div>
                </div>

                <div className="flex items-center gap-2 print:hidden">
                  <button
                    onClick={() => window.print()}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                    title="Imprimir Contrato"
                  >
                    <Printer className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setActiveModule('financial')}
                    className="px-3 py-1.5 rounded-xl bg-[#0a1e38] hover:bg-slate-800 text-amber-400 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Ver Faturamento
                  </button>
                </div>
              </div>

              {/* Terms Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    Mensalidade:
                  </span>
                  <strong className="text-emerald-700 text-sm font-black">
                    R$ {selectedContract.monthlyValue.toFixed(2)}
                  </strong>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    Dia Vencimento:
                  </span>
                  <strong className="text-slate-900 text-sm font-black">
                    Todo dia {selectedContract.paymentDueDay}
                  </strong>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    Início:
                  </span>
                  <strong className="text-slate-900 text-xs font-bold">
                    {selectedContract.startDate}
                  </strong>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    Término / Renovação:
                  </span>
                  <strong className="text-slate-900 text-xs font-bold">
                    {selectedContract.endDate}
                  </strong>
                </div>
              </div>

              {/* Adjustment index & SLA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-cyan-50/50 border border-cyan-200">
                  <strong className="text-cyan-950 text-[10px] uppercase font-black block">
                    Reajuste e Governança:
                  </strong>
                  <div className="text-cyan-900 mt-1">
                    Índice: {selectedContract.adjustmentIndex} • Próximo reajuste:{' '}
                    {selectedContract.nextAdjustmentDate || 'A definir'}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200">
                  <strong className="text-amber-950 text-[10px] uppercase font-black block">
                    Garantia Operacional (SLA):
                  </strong>
                  <div className="text-amber-900 mt-1">
                    Reposição emergencial de faltas em até 2 horas por equipe de backup.
                  </div>
                </div>
              </div>

              {/* Clauses Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-600" />
                    <span>Cláusulas Contratuais Resumidas</span>
                  </h4>
                  {!canAccessRestrictedDocs && (
                    <span className="text-[11px] text-amber-700 flex items-center gap-1 font-bold">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Minuta integral restrita ao Admin</span>
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-xs">
                  {getContractClauses(selectedContract).map((clause, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed font-medium"
                    >
                      <strong className="text-slate-900 font-bold block mb-0.5">
                        Cláusula {idx + 1}:
                      </strong>
                      {clause}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500 text-xs">
              Selecione um contrato para visualizar.
            </div>
          )}
        </div>
      </div>

      {/* Modal: Novo Contrato */}
      {isNewContractModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                Cadastrar Novo Contrato Corporativo
              </h3>
              <button
                onClick={() => setIsNewContractModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateContract} className="p-6 space-y-4 text-xs">
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Valor Mensal (R$)</label>
                  <input
                    type="number"
                    required
                    value={monthlyValue}
                    onChange={(e) => setMonthlyValue(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-black text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Dia de Vencimento</label>
                  <input
                    type="number"
                    min={1}
                    max={31}
                    value={paymentDueDay}
                    onChange={(e) => setPaymentDueDay(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Data de Início</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Data de Término</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Frequência e Dias</label>
                <input
                  type="text"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  placeholder="Ex: Segundas e Quintas das 08h às 12h"
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewContractModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold shadow-md"
                >
                  Salvar Contrato
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
