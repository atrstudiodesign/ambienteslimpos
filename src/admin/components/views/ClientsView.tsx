import React, { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  AlertCircle,
  FileCheck2,
  Calendar,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { Client, ClientLocation } from '../../types';

export const ClientsView: React.FC = () => {
  const { clients, addClient, setActiveModule } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(clients[0] || null);
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);

  // New Client Form State
  const [name, setName] = useState('');
  const [type, setType] = useState<'PF' | 'PJ'>('PJ');
  const [document, setDocument] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('São Paulo');
  const [state, setState] = useState('SP');
  const [cep, setCep] = useState('');
  const [accessInstructions, setAccessInstructions] = useState('');
  const [petNotice, setPetNotice] = useState('');
  const [specialRestrictions, setSpecialRestrictions] = useState('');

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.document.includes(searchTerm) ||
      c.phone.includes(searchTerm)
  );

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    const loc: ClientLocation = {
      id: `loc-${Date.now()}`,
      label: 'Sede Principal',
      address: `${street}, ${neighborhood}, ${city} - ${state}`,
      city,
      state,
      cep,
      propertyType: type === 'PJ' ? 'Empresarial' : 'Residencial',
      accessInstructions,
      petNotice: petNotice || undefined,
      specialRestrictions: specialRestrictions || undefined,
    };

    addClient({
      name,
      type,
      document,
      phone,
      email,
      status: 'Ativo',
      primaryContactName: name,
      locations: [loc],
      generalNotes: 'Cliente cadastrado no painel operacional.',
    });

    setIsNewClientModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-black text-slate-900">
            Gestão de Clientes & Locais de Atendimento
          </h2>
          <p className="text-xs text-slate-600">
            Cadastros detalhados com especificações técnicas do imóvel, pets, restrições e contratos.
          </p>
        </div>

        <button
          onClick={() => setIsNewClientModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Cliente</span>
        </button>
      </div>

      {/* Main Grid: Client List on left, Full Dossier on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: List & Search (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome, código, CNPJ ou telefone..."
              className="w-full pl-10 pr-4 py-2 rounded-2xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-cyan-500 shadow-xs"
            />
          </div>

          <div className="space-y-2 max-h-[75vh] overflow-y-auto pr-1">
            {filteredClients.map((client) => {
              const isSelected = selectedClient?.id === client.id;

              return (
                <div
                  key={client.id}
                  onClick={() => setSelectedClient(client)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-cyan-500 shadow-md ring-1 ring-cyan-500/30'
                      : 'bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded">
                      {client.code}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        client.status === 'Ativo'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {client.status}
                    </span>
                  </div>

                  <div className="font-extrabold text-sm text-slate-900 mt-2 flex items-center gap-1.5">
                    {client.type === 'PJ' ? (
                      <Building2 className="w-4 h-4 text-cyan-700 shrink-0" />
                    ) : (
                      <User className="w-4 h-4 text-amber-600 shrink-0" />
                    )}
                    <span className="truncate">{client.name}</span>
                  </div>

                  <div className="text-xs text-slate-600 mt-1 font-mono">
                    {client.document} • {client.phone}
                  </div>

                  <div className="text-xs text-slate-600 mt-1 flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{client.locations[0]?.address || 'Sem endereço'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Dossier (7 cols) */}
        <div className="lg:col-span-7">
          {selectedClient ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
              {/* Dossier Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded">
                      {selectedClient.code}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {selectedClient.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mt-1">
                    {selectedClient.name}
                  </h3>
                  <div className="text-xs text-slate-600 font-mono">
                    Tipo: {selectedClient.type} • Doc: {selectedClient.document}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveModule('quotes')}
                    className="px-3 py-1.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-800 text-xs font-bold transition-colors cursor-pointer"
                  >
                    + Orçamento
                  </button>
                  <button
                    onClick={() => setActiveModule('contracts')}
                    className="px-3 py-1.5 rounded-xl bg-[#0a1e38] hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Ver Contratos
                  </button>
                </div>
              </div>

              {/* Contacts info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-500 uppercase text-[10px]">Contato Principal</div>
                  <div className="font-extrabold text-slate-900">{selectedClient.primaryContactName}</div>
                  <div className="text-slate-600 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedClient.phone}</span>
                  </div>
                  <div className="text-slate-600 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedClient.email}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-500 uppercase text-[10px]">Dados Cadastrais</div>
                  <div className="text-slate-700 font-semibold">Cliente desde: 01/2026</div>
                  <div className="text-slate-700">Imóveis vinculados: {selectedClient.locations.length}</div>
                  <div className="text-slate-700">Região de Atendimento: Grande SP / Capital</div>
                </div>
              </div>

              {/* Registered Locations / Properties */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Locais & Endereços de Limpeza ({selectedClient.locations.length})</span>
                  </h4>
                </div>

                <div className="space-y-3">
                  {selectedClient.locations.map((loc) => (
                    <div
                      key={loc.id}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">{loc.label}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                          {loc.propertyType}
                        </span>
                      </div>

                      <div className="text-slate-700 font-medium">{loc.address}</div>

                      {/* Access instructions & pet alert */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-[11px]">
                        {loc.accessInstructions && (
                          <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                            <strong className="text-slate-900 block text-[10px] uppercase font-black">
                              Acesso & Portaria:
                            </strong>
                            <span className="text-slate-600">{loc.accessInstructions}</span>
                          </div>
                        )}
                        {loc.petNotice && (
                          <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                            <strong className="text-amber-950 block text-[10px] uppercase font-black">
                              Aviso de Pets:
                            </strong>
                            <span className="text-amber-800">{loc.petNotice}</span>
                          </div>
                        )}
                      </div>

                      {loc.specialRestrictions && (
                        <div className="bg-rose-50 p-2.5 rounded-xl border border-rose-200 text-rose-900 text-[11px] flex items-start gap-1.5">
                          <ShieldAlert className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                          <div>
                            <strong className="block text-[10px] uppercase font-black">
                              Restrição Operacional de Superfície:
                            </strong>
                            <span>{loc.specialRestrictions}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* General notes */}
              {selectedClient.generalNotes && (
                <div className="p-3.5 rounded-2xl bg-cyan-50/50 border border-cyan-200 text-xs text-cyan-950">
                  <span className="font-bold block text-[10px] uppercase tracking-wider">
                    Observações Internas da Empresa:
                  </span>
                  <p className="mt-0.5">{selectedClient.generalNotes}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500 text-xs">
              Selecione um cliente para visualizar o dossiê completo.
            </div>
          )}
        </div>
      </div>

      {/* Modal: Novo Cliente */}
      {isNewClientModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                Cadastrar Novo Cliente
              </h3>
              <button
                onClick={() => setIsNewClientModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateClient} className="p-6 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Nome / Razão Social</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Prime Tech Soluções"
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tipo</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold"
                  >
                    <option value="PJ">Pessoa Jurídica (PJ)</option>
                    <option value="PF">Pessoa Física (PF)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">CNPJ ou CPF</label>
                  <input
                    type="text"
                    required
                    value={document}
                    onChange={(e) => setDocument(e.target.value)}
                    placeholder="00.000.000/0000-00"
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-mono"
                  />
                </div>
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
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contato@cliente.com.br"
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-200">
                <h4 className="font-bold text-slate-900 mb-2">Endereço Principal</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="Rua / Avenida, Número e Complemento"
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      required
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      placeholder="Bairro"
                      className="p-2.5 rounded-xl border border-slate-300 bg-white"
                    />
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Cidade"
                      className="p-2.5 rounded-xl border border-slate-300 bg-white"
                    />
                    <input
                      type="text"
                      required
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                      placeholder="CEP"
                      className="p-2.5 rounded-xl border border-slate-300 bg-white font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900">Instruções Operacionais</h4>
                <input
                  type="text"
                  value={accessInstructions}
                  onChange={(e) => setAccessInstructions(e.target.value)}
                  placeholder="Ex: Anunciar na portaria bloco B, retirar chave na recepção"
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                />
                <input
                  type="text"
                  value={petNotice}
                  onChange={(e) => setPetNotice(e.target.value)}
                  placeholder="Ex: Cachorro dócil na área de serviço"
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                />
                <input
                  type="text"
                  value={specialRestrictions}
                  onChange={(e) => setSpecialRestrictions(e.target.value)}
                  placeholder="Ex: Piso de madeira nobre — não aplicar água em excesso"
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewClientModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold shadow-md"
                >
                  Salvar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
