import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Plus,
  Search,
  CheckCircle2,
  FileCheck2,
  Share2,
  Download,
  Calendar,
  DollarSign,
  Printer,
  ChevronRight,
  Calculator,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { Quote, QuoteItem } from '../../types';

export const QuotesView: React.FC = () => {
  const { quotes, clients, addQuote, approveQuote, convertQuoteToContract, setActiveModule } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(quotes[0] || null);
  const [isNewQuoteModalOpen, setIsNewQuoteModalOpen] = useState(false);

  // New Quote Form State
  const [clientId, setClientId] = useState(clients[0]?.id || '');
  const [propertyType, setPropertyType] = useState('Comercial / Escritório');
  const [areaSqm, setAreaSqm] = useState(120);
  const [dirtLevel, setDirtLevel] = useState<'Leve' | 'Normal' | 'Pesada'>('Normal');
  const [frequency, setFrequency] = useState<'Avulso' | 'Semanal' | 'Quinzenal' | 'Mensal'>('Semanal');
  const [basePrice, setBasePrice] = useState(480);
  const [discount, setDiscount] = useState(0);

  const filteredQuotes = quotes.filter(
    (q) =>
      q.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find((c) => c.id === clientId);

    const items: QuoteItem[] = [
      {
        id: `it-${Date.now()}-1`,
        description: `Serviço de Limpeza Especializada (${frequency}) - Área aprox. ${areaSqm}m²`,
        quantity: 1,
        unitPrice: basePrice,
        total: basePrice,
      },
    ];

    addQuote({
      clientId,
      clientName: client ? client.name : 'Cliente',
      clientPhone: client ? client.phone : '(11) 93902-6928',
      clientEmail: client ? client.email : 'contato@cliente.com',
      serviceType: 'Limpeza Corporativa',
      propertyType,
      areaSqm,
      frequency,
      dirtLevel,
      items,
      subtotal: basePrice,
      discount,
      totalPrice: basePrice - discount,
      paymentTerms: 'PIX ou Boleto Bancário faturado quinzenalmente',
      validityDays: 10,
      status: 'Enviado',
      scopeChecklist: [
        'Higienização completa de pisos e rodapés',
        'Aspiração técnica de carpetes e estofados',
        'Sanitização profunda de sanitários com desinfetante hospitalar',
        'Limpeza de mesas, bancadas e equipamentos periféricos',
        'Remoção e descarte correto de resíduos',
      ],
      internalNotes: 'Proposta alinhada com as necessidades do gestor.',
    });

    setIsNewQuoteModalOpen(false);
  };

  const printProposal = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-black text-slate-900">
            Gerador & Gestor de Orçamentos Profissionais
          </h2>
          <p className="text-xs text-slate-600">
            Crie propostas comerciais completas com checklist de escopo, validade e aprovação em um clique.
          </p>
        </div>

        <button
          onClick={() => setIsNewQuoteModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Criar Orçamento</span>
        </button>
      </div>

      {/* Grid: Quotes List on Left, Interactive Proposal Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por proposta (#ORC) ou cliente..."
              className="w-full pl-10 pr-4 py-2 rounded-2xl border border-slate-200 bg-white text-xs text-slate-800 outline-none focus:border-cyan-500 shadow-xs"
            />
          </div>

          <div className="space-y-2 max-h-[75vh] overflow-y-auto pr-1">
            {filteredQuotes.map((q) => {
              const isSelected = selectedQuote?.id === q.id;

              return (
                <div
                  key={q.id}
                  onClick={() => setSelectedQuote(q)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-cyan-500 shadow-md ring-1 ring-cyan-500/30'
                      : 'bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded">
                      {q.code}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        q.status === 'Aprovado'
                          ? 'bg-emerald-100 text-emerald-800'
                          : q.status === 'Enviado'
                          ? 'bg-cyan-100 text-cyan-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {q.status}
                    </span>
                  </div>

                  <div className="font-extrabold text-sm text-slate-900 mt-2">{q.clientName}</div>

                  <div className="text-xs text-slate-600 mt-1">
                    {q.propertyType} • {q.frequency}
                  </div>

                  <div className="text-xs text-slate-900 font-extrabold mt-2 flex items-center justify-between">
                    <span className="text-slate-500 font-normal">Valor Total:</span>
                    <span className="text-emerald-700 font-black text-sm">
                      R$ {q.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Proposal Document Preview (7 cols) */}
        <div className="lg:col-span-7">
          {selectedQuote ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 print:m-0 print:border-none print:shadow-none">
              {/* Proposal Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-6 border-b border-slate-100 gap-4">
                <div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded">
                    Proposta Comercial de Limpeza
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-2">
                    Orçamento Oficial {selectedQuote.code}
                  </h3>
                  <div className="text-xs text-slate-600 mt-1">
                    Emitido em: {selectedQuote.createdAt} • Validade: {selectedQuote.validityDays} dias
                  </div>
                </div>

                {/* Print and Actions */}
                <div className="flex items-center gap-2 print:hidden">
                  <button
                    onClick={printProposal}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                    title="Imprimir / Salvar PDF"
                  >
                    <Printer className="w-4 h-4" />
                  </button>

                  {selectedQuote.status !== 'Aprovado' && (
                    <button
                      onClick={() => approveQuote(selectedQuote.id)}
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Aprovar</span>
                    </button>
                  )}

                  {selectedQuote.status === 'Aprovado' && (
                    <button
                      onClick={() => {
                        convertQuoteToContract(selectedQuote.id);
                        setActiveModule('contracts');
                      }}
                      className="px-3.5 py-2 rounded-xl bg-[#0a1e38] hover:bg-slate-800 text-amber-400 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <FileCheck2 className="w-4 h-4" />
                      <span>Gerar Contrato</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Client & Specs Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-slate-600 text-[10px] uppercase font-bold block">Cliente:</span>
                  <strong className="text-slate-900">{selectedQuote.clientName}</strong>
                </div>
                <div>
                  <span className="text-slate-600 text-[10px] uppercase font-bold block">Imóvel:</span>
                  <strong className="text-slate-900">{selectedQuote.propertyType}</strong>
                </div>
                <div>
                  <span className="text-slate-600 text-[10px] uppercase font-bold block">Metragem:</span>
                  <strong className="text-slate-900">{selectedQuote.areaSqm} m²</strong>
                </div>
                <div>
                  <span className="text-slate-600 text-[10px] uppercase font-bold block">Frequência:</span>
                  <strong className="text-cyan-700">{selectedQuote.frequency}</strong>
                </div>
              </div>

              {/* Scope of Work */}
              <div>
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 mb-3">
                  Escopo Detalhado dos Serviços Inclusos
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedQuote.scopeChecklist.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center gap-2 text-slate-700 font-medium"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items & Values Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Descrição do Serviço</th>
                      <th className="p-3 text-center">Qtd</th>
                      <th className="p-3 text-right">Valor Unitário</th>
                      <th className="p-3 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedQuote.items.map((it) => (
                      <tr key={it.id}>
                        <td className="p-3 font-semibold text-slate-900">{it.description}</td>
                        <td className="p-3 text-center">{it.quantity}</td>
                        <td className="p-3 text-right font-mono">R$ {it.unitPrice.toFixed(2)}</td>
                        <td className="p-3 text-right font-mono font-bold text-slate-900">
                          R$ {it.total.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-50 border-t border-slate-200 font-bold">
                    <tr>
                      <td colSpan={3} className="p-3 text-right text-slate-600">
                        Total Final da Proposta:
                      </td>
                      <td className="p-3 text-right text-base font-black text-emerald-700 font-mono">
                        R$ {selectedQuote.totalPrice.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Payment terms & validity */}
              <div className="p-3.5 rounded-2xl bg-cyan-50/60 border border-cyan-200 text-xs space-y-1">
                <strong className="text-cyan-950 block text-[10px] uppercase font-black">
                  Condições Comerciais & Pagamento:
                </strong>
                <p className="text-cyan-900">{selectedQuote.paymentTerms}</p>
                <p className="text-[11px] text-cyan-800">
                  Validade: Proposta válida por {selectedQuote.validityDays} dias a contar da emissão.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500 text-xs">
              Selecione um orçamento para visualizar.
            </div>
          )}
        </div>
      </div>

      {/* Modal: Novo Orçamento */}
      {isNewQuoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <Calculator className="w-4 h-4 text-cyan-600" />
                <span>Elaborar Nova Proposta de Orçamento</span>
              </h3>
              <button
                onClick={() => setIsNewQuoteModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateQuote} className="p-6 space-y-4 text-xs">
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
                  <label className="block font-bold text-slate-700 mb-1">Tipo de Imóvel</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Comercial / Escritório">Comercial / Escritório</option>
                    <option value="Residencial">Residencial</option>
                    <option value="Clínica / Consultório">Clínica / Consultório</option>
                    <option value="Pós-Obra">Pós-Obra</option>
                    <option value="Condomínio">Condomínio</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Área Estimada (m²)</label>
                  <input
                    type="number"
                    value={areaSqm}
                    onChange={(e) => {
                      const m2 = Number(e.target.value);
                      setAreaSqm(m2);
                      setBasePrice(Math.round(m2 * 3.8 + 150));
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Frequência do Atendimento</label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-semibold"
                  >
                    <option value="Avulso">Avulso (Diária Única)</option>
                    <option value="Semanal">Semanal (Recorrente)</option>
                    <option value="Quinzenal">Quinzenal</option>
                    <option value="Mensal">Mensal</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Grau de Sujeira</label>
                  <select
                    value={dirtLevel}
                    onChange={(e) => setDirtLevel(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-semibold"
                  >
                    <option value="Leve">Leve (Manutenção preventiva)</option>
                    <option value="Normal">Normal (Padrão corporativo)</option>
                    <option value="Pesada">Pesada (Gordura / Pós-obra)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Valor Calculado do Atendimento (R$)
                </label>
                <input
                  type="number"
                  value={basePrice}
                  onChange={(e) => setBasePrice(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-black text-slate-900 text-sm"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewQuoteModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold shadow-md"
                >
                  Salvar e Emitir Orçamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
