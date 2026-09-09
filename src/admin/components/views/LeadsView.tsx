import React, { useState } from 'react';
import {
  Filter,
  Plus,
  ArrowRight,
  User,
  Phone,
  Calendar,
  CircleDollarSign,
  CheckCircle2,
  FileSpreadsheet,
  FileCheck2,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { Lead, LeadStage } from '../../types';

export const LeadsView: React.FC = () => {
  const {
    leads,
    addLead,
    updateLeadStage,
    convertLeadToClient,
    setActiveModule,
  } = useAdmin();

  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);

  // New Lead Form State
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [source, setSource] = useState<Lead['source']>('WhatsApp');
  const [serviceInterest, setServiceInterest] = useState('Limpeza Corporativa Semanal');
  const [propertyType, setPropertyType] = useState<Lead['propertyType']>('Empresarial');
  const [estimatedValue, setEstimatedValue] = useState(1500);
  const [notes, setNotes] = useState('');
  const [nextAction, setNextAction] = useState('Ligar para qualificação e envio de proposta');

  const pipelineStages: { stage: LeadStage; label: string; color: string }[] = [
    { stage: 'NOVO_LEAD', label: 'Novo Lead', color: 'border-slate-400 bg-slate-50' },
    { stage: 'CONTATO', label: 'Contato Feito', color: 'border-blue-400 bg-blue-50/50' },
    { stage: 'QUALIFICADO', label: 'Qualificado', color: 'border-cyan-400 bg-cyan-50/50' },
    { stage: 'VISITA_AVALIACAO', label: 'Visita / Vistoria', color: 'border-indigo-400 bg-indigo-50/50' },
    { stage: 'ORCAMENTO', label: 'Orçamento Enviado', color: 'border-amber-400 bg-amber-50/50' },
    { stage: 'NEGOCIACAO', label: 'Negociação', color: 'border-purple-400 bg-purple-50/50' },
    { stage: 'APROVADO', label: 'Aprovado', color: 'border-emerald-400 bg-emerald-50/50' },
    { stage: 'CONTRATO', label: 'Contrato Formalizado', color: 'border-emerald-600 bg-emerald-100/50' },
    { stage: 'CLIENTE_ATIVO', label: 'Cliente Ativo', color: 'border-emerald-700 bg-emerald-200/50' },
  ];

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    addLead({
      clientName,
      companyName: companyName || undefined,
      phone,
      email,
      source,
      serviceInterest,
      propertyType,
      estimatedValue,
      stage: 'NOVO_LEAD',
      assignedTo: 'Camila Rocha (Atendimento)',
      notes,
      nextAction,
    });

    // Reset
    setClientName('');
    setCompanyName('');
    setPhone('');
    setEmail('');
    setIsNewLeadModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-black text-slate-900">
            Pipeline de Oportunidades & Leads
          </h2>
          <p className="text-xs text-slate-600">
            Acompanhe o funil de vendas desde a chegada pelo WhatsApp até o fechamento de contrato.
          </p>
        </div>

        <button
          onClick={() => setIsNewLeadModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Lead</span>
        </button>
      </div>

      {/* Kanban Board / Pipeline Columns */}
      <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-slate-300">
        {pipelineStages.map((stg) => {
          const stageLeads = leads.filter((l) => l.stage === stg.stage);

          return (
            <div
              key={stg.stage}
              className="min-w-[280px] w-[280px] shrink-0 bg-slate-100/70 rounded-3xl p-3 border border-slate-200 flex flex-col max-h-[75vh]"
            >
              {/* Column Header */}
              <div className="p-2 flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-800 truncate">
                  {stg.label}
                </span>
                <span className="w-5 h-5 rounded-full bg-white text-slate-700 font-bold text-[10px] flex items-center justify-center border border-slate-200 shadow-xs">
                  {stageLeads.length}
                </span>
              </div>

              {/* Cards List */}
              <div className="space-y-3 overflow-y-auto pr-1 flex-1">
                {stageLeads.length === 0 ? (
                  <div className="p-6 text-center text-slate-600 text-[11px] border border-dashed border-slate-300 rounded-2xl">
                    Sem leads nesta etapa
                  </div>
                ) : (
                  stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-cyan-400 shadow-xs hover:shadow-md transition-all text-xs space-y-2.5"
                    >
                      {/* Top Code & Source */}
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded font-bold">
                          {lead.code}
                        </span>
                        <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          {lead.source}
                        </span>
                      </div>

                      {/* Lead Title & Details */}
                      <div>
                        <div className="font-extrabold text-sm text-slate-900 leading-tight">
                          {lead.companyName || lead.clientName}
                        </div>
                        {lead.companyName && (
                          <div className="text-[11px] text-slate-600">{lead.clientName}</div>
                        )}
                        <div className="text-xs text-slate-600 mt-1 flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{lead.phone}</span>
                        </div>
                      </div>

                      {/* Service & Value */}
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-[11px] space-y-1">
                        <div className="text-slate-700 font-medium truncate">{lead.serviceInterest}</div>
                        <div className="font-bold text-slate-900 flex items-center justify-between">
                          <span>Est.:</span>
                          <span className="text-emerald-700">R$ {lead.estimatedValue.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Next Action */}
                      <div className="text-[11px] text-slate-600 bg-amber-50/70 p-2 rounded-xl border border-amber-200/60">
                        <strong className="text-amber-900 block text-[10px] uppercase">Próxima Ação:</strong>
                        {lead.nextAction}
                      </div>

                      {/* Stage Advance Action Controls */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                        {lead.stage === 'APROVADO' ? (
                          <button
                            onClick={() => {
                              convertLeadToClient(lead.id);
                              setActiveModule('clients');
                            }}
                            className="w-full py-1.5 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer transition-colors"
                          >
                            <FileCheck2 className="w-3 h-3" />
                            <span>Criar Contrato</span>
                          </button>
                        ) : lead.stage === 'CLIENTE_ATIVO' ? (
                          <span className="text-[10px] text-emerald-800 font-bold flex items-center gap-1 mx-auto">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Cliente Ativo</span>
                          </span>
                        ) : (
                          <>
                            {lead.stage === 'VISITA_AVALIACAO' && (
                              <button
                                onClick={() => {
                                  updateLeadStage(lead.id, 'ORCAMENTO');
                                  setActiveModule('quotes');
                                }}
                                className="text-[10px] font-bold text-cyan-700 hover:underline"
                              >
                                Gerar Orçamento
                              </button>
                            )}
                            <button
                              onClick={() => {
                                const currentIndex = pipelineStages.findIndex((s) => s.stage === lead.stage);
                                if (currentIndex < pipelineStages.length - 1) {
                                  updateLeadStage(lead.id, pipelineStages[currentIndex + 1].stage);
                                }
                              }}
                              className="ml-auto py-1 px-2.5 rounded-lg bg-slate-100 hover:bg-cyan-600 hover:text-white text-slate-700 font-bold text-[10px] uppercase flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <span>Avançar</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Novo Lead */}
      {isNewLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                Cadastrar Nova Oportunidade / Lead
              </h3>
              <button
                onClick={() => setIsNewLeadModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nome do Contato</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ex: Dra. Mariana Costa"
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Empresa (Opcional)</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Ex: Clínica Sorriso"
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Telefone / WhatsApp</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">E-mail</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contato@cliente.com"
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Origem</label>
                  <select
                    value={source}
                    onChange={(e) => setSource(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Site">Site</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Google">Google</option>
                    <option value="Indicação">Indicação</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tipo de Imóvel</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Residencial">Residencial</option>
                    <option value="Empresarial">Empresarial</option>
                    <option value="Comercial">Comercial</option>
                    <option value="Condomínio">Condomínio</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Valor Estimado (R$)</label>
                  <input
                    type="number"
                    value={estimatedValue}
                    onChange={(e) => setEstimatedValue(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Interesse / Serviço Solicitado</label>
                <input
                  type="text"
                  value={serviceInterest}
                  onChange={(e) => setServiceInterest(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Próxima Ação do Atendimento</label>
                <input
                  type="text"
                  value={nextAction}
                  onChange={(e) => setNextAction(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewLeadModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold shadow-md"
                >
                  Salvar Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
