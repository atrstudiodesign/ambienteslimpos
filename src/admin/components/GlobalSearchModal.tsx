import React, { useState, useEffect } from 'react';
import { Search, X, Users, FileCheck2, Wrench, FileSpreadsheet, UserCheck, ArrowRight } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { AdminModule } from '../types';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    clients,
    contracts,
    serviceOrders,
    quotes,
    staff,
    setActiveModule,
  } = useAdmin();

  const [query, setQuery] = useState('');

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.trim().toLowerCase();

  const filteredClients = q
    ? clients.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q) ||
          c.document.includes(q) ||
          c.phone.includes(q)
      )
    : [];

  const filteredContracts = q
    ? contracts.filter(
        (c) =>
          c.contractNumber.toLowerCase().includes(q) ||
          c.clientName.toLowerCase().includes(q) ||
          c.serviceType.toLowerCase().includes(q)
      )
    : [];

  const filteredOS = q
    ? serviceOrders.filter(
        (o) =>
          o.osNumber.toLowerCase().includes(q) ||
          o.clientName.toLowerCase().includes(q) ||
          o.locationAddress.toLowerCase().includes(q)
      )
    : [];

  const filteredQuotes = q
    ? quotes.filter(
        (qt) =>
          qt.code.toLowerCase().includes(q) ||
          qt.clientName.toLowerCase().includes(q)
      )
    : [];

  const filteredStaff = q
    ? staff.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.code.toLowerCase().includes(q) ||
          s.specialties.some((sp) => sp.toLowerCase().includes(q))
      )
    : [];

  const hasResults =
    filteredClients.length > 0 ||
    filteredContracts.length > 0 ||
    filteredOS.length > 0 ||
    filteredQuotes.length > 0 ||
    filteredStaff.length > 0;

  const handleSelect = (module: AdminModule) => {
    setActiveModule(module);
    setIsSearchOpen(false);
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-cyan-600 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar clientes, contratos, OS, orçamentos, colaboradoras..."
            autoFocus
            className="flex-1 bg-transparent text-sm sm:text-base font-semibold text-slate-900 placeholder-slate-400 outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="w-8 h-8 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-xs font-bold cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
          {!q && (
            <div className="py-8 text-center text-slate-600 space-y-2">
              <p className="font-semibold">Digite para buscar qualquer registro da operação</p>
              <p className="text-xs text-slate-600">
                Atalhos: Clientes (nome, CNPJ) • Contratos (#CTR) • Ordens de Serviço (#OS) • Colaboradoras
              </p>
            </div>
          )}

          {q && !hasResults && (
            <div className="py-8 text-center text-slate-600">
              Nenhum registro encontrado para <strong className="text-slate-800">"{query}"</strong>.
            </div>
          )}

          {/* Clients */}
          {filteredClients.length > 0 && (
            <div>
              <div className="text-[11px] font-black uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-cyan-600" />
                <span>Clientes ({filteredClients.length})</span>
              </div>
              <div className="space-y-1">
                {filteredClients.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleSelect('clients')}
                    className="w-full text-left p-3 rounded-xl hover:bg-slate-50 border border-slate-100 flex items-center justify-between transition-colors cursor-pointer group"
                  >
                    <div>
                      <div className="font-bold text-slate-900">{c.name}</div>
                      <div className="text-xs text-slate-600 font-mono">
                        {c.code} • {c.document} • {c.phone}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Contracts */}
          {filteredContracts.length > 0 && (
            <div>
              <div className="text-[11px] font-black uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
                <FileCheck2 className="w-3.5 h-3.5 text-cyan-600" />
                <span>Contratos ({filteredContracts.length})</span>
              </div>
              <div className="space-y-1">
                {filteredContracts.map((ctr) => (
                  <button
                    key={ctr.id}
                    onClick={() => handleSelect('contracts')}
                    className="w-full text-left p-3 rounded-xl hover:bg-slate-50 border border-slate-100 flex items-center justify-between transition-colors cursor-pointer group"
                  >
                    <div>
                      <div className="font-bold text-slate-900">
                        {ctr.contractNumber} — {ctr.clientName}
                      </div>
                      <div className="text-xs text-slate-600">
                        R$ {ctr.monthlyValue.toFixed(2)}/mês • Status: {ctr.status}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Service Orders */}
          {filteredOS.length > 0 && (
            <div>
              <div className="text-[11px] font-black uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-cyan-600" />
                <span>Ordens de Serviço ({filteredOS.length})</span>
              </div>
              <div className="space-y-1">
                {filteredOS.map((os) => (
                  <button
                    key={os.id}
                    onClick={() => handleSelect('services')}
                    className="w-full text-left p-3 rounded-xl hover:bg-slate-50 border border-slate-100 flex items-center justify-between transition-colors cursor-pointer group"
                  >
                    <div>
                      <div className="font-bold text-slate-900">
                        {os.osNumber} — {os.clientName} ({os.scheduledDate} {os.startTime})
                      </div>
                      <div className="text-xs text-slate-600 truncate max-w-md">
                        {os.locationAddress} • {os.status}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quotes */}
          {filteredQuotes.length > 0 && (
            <div>
              <div className="text-[11px] font-black uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
                <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-600" />
                <span>Orçamentos ({filteredQuotes.length})</span>
              </div>
              <div className="space-y-1">
                {filteredQuotes.map((qItem) => (
                  <button
                    key={qItem.id}
                    onClick={() => handleSelect('quotes')}
                    className="w-full text-left p-3 rounded-xl hover:bg-slate-50 border border-slate-100 flex items-center justify-between transition-colors cursor-pointer group"
                  >
                    <div>
                      <div className="font-bold text-slate-900">
                        {qItem.code} — {qItem.clientName}
                      </div>
                      <div className="text-xs text-slate-600">
                        R$ {qItem.totalPrice.toFixed(2)} • {qItem.status}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Staff */}
          {filteredStaff.length > 0 && (
            <div>
              <div className="text-[11px] font-black uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-cyan-600" />
                <span>Colaboradoras ({filteredStaff.length})</span>
              </div>
              <div className="space-y-1">
                {filteredStaff.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSelect('staff')}
                    className="w-full text-left p-3 rounded-xl hover:bg-slate-50 border border-slate-100 flex items-center justify-between transition-colors cursor-pointer group"
                  >
                    <div>
                      <div className="font-bold text-slate-900">
                        {s.name} ({s.code})
                      </div>
                      <div className="text-xs text-slate-600">
                        {s.role} • {s.teamName || 'Sem equipe'} • Avaliação: {s.averageRating}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-600 flex items-center justify-between px-6">
          <span>Navegue com setas ou clique no item</span>
          <span>Pressione ESC para fechar</span>
        </div>
      </div>
    </div>
  );
};
