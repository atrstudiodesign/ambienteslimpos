import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  Lock,
  Clock,
  User,
  Activity,
  FileCheck2,
  Calendar,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const AuditView: React.FC = () => {
  const { auditLogs } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = auditLogs.filter(
    (log) =>
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.module.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              Trilha de Auditoria & Registro Inalterável
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-slate-900 text-cyan-400 font-mono">
              LOGS BLINDADOS
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            Histórico imutável de todas as ações sensíveis, aprovações de contratos, exclusões e acessos.
          </p>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filtrar por usuário, ação ou módulo..."
            className="pl-8 pr-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 outline-none w-64"
          />
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Data / Hora</th>
                <th className="p-3.5">Usuário Responsável</th>
                <th className="p-3.5">Módulo</th>
                <th className="p-3.5">Ação Registrada</th>
                <th className="p-3.5">Detalhes da Transação</th>
                <th className="p-3.5 font-mono text-slate-400">IP de Origem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 font-mono text-slate-600 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900">{log.userName}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{log.userEmail}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 uppercase font-mono">
                      {log.module}
                    </span>
                  </td>
                  <td className="p-3.5 font-bold text-slate-900">{log.action}</td>
                  <td className="p-3.5 text-slate-600 max-w-sm">{log.details}</td>
                  <td className="p-3.5 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                    {log.ipAddress}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
