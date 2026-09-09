import React, { useState } from 'react';
import {
  Users2,
  UserCheck,
  Plus,
  Star,
  Phone,
  Mail,
  ShieldCheck,
  Truck,
  MapPin,
  Calendar,
  CheckCircle2,
  Award,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { StaffMember, Team } from '../../types';

export const TeamsStaffView: React.FC = () => {
  const { teams, staff, addStaff, addTeam, currentUser } = useAdmin();
  const [tab, setTab] = useState<'teams' | 'staff'>('teams');

  const [isNewStaffModalOpen, setIsNewStaffModalOpen] = useState(false);
  const [isNewTeamModalOpen, setIsNewTeamModalOpen] = useState(false);

  // New Staff state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'Líder de Equipe' | 'Especialista em Limpeza' | 'Auxiliar'>('Especialista em Limpeza');
  const [pixKey, setPixKey] = useState('');
  const [specialtiesStr, setSpecialtiesStr] = useState('Pisos, Vidros, Sanitização');

  // New Team state
  const [teamName, setTeamName] = useState('');
  const [leaderId, setLeaderId] = useState(staff[0]?.id || '');
  const [vehicle, setVehicle] = useState('Fiorino Branca - Placa ABC-1234');
  const [region, setRegion] = useState('Zona Sul / Faria Lima / Brooklin');
  const [teamColor, setTeamColor] = useState('#06b6d4');

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    addStaff({
      name,
      document: '000.000.000-00',
      phone,
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@ambienteslimpos.com.br`,
      role,
      status: 'Ativo',
      hireDate: '2026-09-01',
      averageRating: 5.0,
      totalServicesCompleted: 0,
      specialties: specialtiesStr.split(',').map((s) => s.trim()),
      pixKey,
      notes: 'Cadastrado no painel operacional.',
    });
    setIsNewStaffModalOpen(false);
  };

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    const leader = staff.find((s) => s.id === leaderId);
    addTeam({
      name: teamName,
      color: teamColor,
      leaderId,
      leaderName: leader ? leader.name : 'Líder',
      memberIds: [leaderId],
      memberNames: leader ? [leader.name] : [],
      assignedRegion: region,
      vehicle,
      active: true,
      averageRating: 5.0,
    });
    setIsNewTeamModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-black text-slate-900">
            Equipes Operacionais & Corpo Técnico
          </h2>
          <p className="text-xs text-slate-600">
            Escala de profissionais qualificadas, veículos, especialidades técnicas e avaliação de qualidade.
          </p>
        </div>

        {/* Tab switcher and creation */}
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setTab('teams')}
              className={`px-3 py-1.5 rounded-xl uppercase tracking-wider text-[10px] transition-all cursor-pointer ${
                tab === 'teams' ? 'bg-cyan-600 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              Equipes ({teams.length})
            </button>
            <button
              onClick={() => setTab('staff')}
              className={`px-3 py-1.5 rounded-xl uppercase tracking-wider text-[10px] transition-all cursor-pointer ${
                tab === 'staff' ? 'bg-cyan-600 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              Colaboradoras ({staff.length})
            </button>
          </div>

          {tab === 'teams' ? (
            <button
              onClick={() => setIsNewTeamModalOpen(true)}
              className="px-3 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nova Equipe</span>
            </button>
          ) : (
            <button
              onClick={() => setIsNewStaffModalOpen(true)}
              className="px-3 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nova Colaboradora</span>
            </button>
          )}
        </div>
      </div>

      {/* Content based on active tab */}
      {tab === 'teams' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((t) => (
            <div
              key={t.id}
              className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-cyan-400 shadow-xs hover:shadow-md transition-all space-y-4"
            >
              {/* Top info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full ring-2 ring-white shadow-xs"
                    style={{ backgroundColor: t.color }}
                  />
                  <h3 className="font-extrabold text-sm text-slate-900">{t.name}</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                  <span>{t.averageRating}</span>
                </span>
              </div>

              {/* Leader & Members */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 uppercase text-[10px] font-bold">Líder:</span>
                  <strong className="text-slate-900">{t.leaderName}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 uppercase text-[10px] font-bold">Efetivo:</span>
                  <span className="text-slate-700 font-semibold">{t.memberNames.length} profissionais</span>
                </div>
                <div className="pt-1.5 border-t border-slate-200 text-[11px] text-slate-600 flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{t.vehicle}</span>
                </div>
              </div>

              {/* Members pills */}
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                  Integrantes da Equipe:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {t.memberNames.map((name, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-800 text-[11px] font-medium"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 truncate max-w-[200px]">
                  <MapPin className="w-3 h-3 text-cyan-600 shrink-0" />
                  <span className="truncate">{t.assignedRegion}</span>
                </span>
                <span className="text-emerald-600 font-bold">Pronta para escala</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {staff.map((s) => (
            <div
              key={s.id}
              className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-cyan-400 shadow-xs hover:shadow-md transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded">
                  {s.code}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  {s.status}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-sm text-slate-900">{s.name}</h3>
                <div className="text-xs text-slate-500 mt-0.5 font-medium flex items-center justify-between">
                  <span>{s.role}</span>
                  <span className="font-bold text-amber-700 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>{s.averageRating} ({s.totalServicesCompleted} OS)</span>
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                <div className="text-slate-600 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{s.phone}</span>
                </div>
                <div className="text-slate-600 flex items-center gap-1.5">
                  <Users2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{s.teamName || 'Sem equipe fixa'}</span>
                </div>
              </div>

              {/* Specialties */}
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                  Especialidades Técnicas:
                </span>
                <div className="flex flex-wrap gap-1">
                  {s.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-cyan-50 text-cyan-800 text-[10px] font-bold border border-cyan-100"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Nova Colaboradora */}
      {isNewStaffModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                Cadastrar Nova Colaboradora
              </h3>
              <button
                onClick={() => setIsNewStaffModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateStaff} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Luciana Ferreira"
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Telefone WhatsApp</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(11) 98888-8888"
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Função</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold"
                  >
                    <option value="Líder de Equipe">Líder de Equipe</option>
                    <option value="Especialista em Limpeza">Especialista em Limpeza</option>
                    <option value="Auxiliar">Auxiliar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Especialidades (separadas por vírgula)</label>
                <input
                  type="text"
                  value={specialtiesStr}
                  onChange={(e) => setSpecialtiesStr(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Chave PIX para Remuneração</label>
                <input
                  type="text"
                  value={pixKey}
                  onChange={(e) => setPixKey(e.target.value)}
                  placeholder="CPF ou Chave Celular"
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-mono"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewStaffModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold shadow-md"
                >
                  Salvar Colaboradora
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Nova Equipe */}
      {isNewTeamModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                Formar Nova Equipe Operacional
              </h3>
              <button
                onClick={() => setIsNewTeamModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTeam} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nome da Equipe</label>
                <input
                  type="text"
                  required
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Ex: Equipe Delta (Pós-Obra)"
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Líder da Equipe</label>
                  <select
                    value={leaderId}
                    onChange={(e) => setLeaderId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium"
                  >
                    {staff.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.role})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Cor Identificadora</label>
                  <input
                    type="color"
                    value={teamColor}
                    onChange={(e) => setTeamColor(e.target.value)}
                    className="w-full h-10 p-1 rounded-xl border border-slate-300 bg-white cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Região Principal</label>
                <input
                  type="text"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Veículo / Transporte</label>
                <input
                  type="text"
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewTeamModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold shadow-md"
                >
                  Criar Equipe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
