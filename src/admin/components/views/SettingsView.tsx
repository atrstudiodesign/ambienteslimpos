import React, { useState } from 'react';
import {
  Settings,
  Building2,
  Phone,
  Mail,
  ShieldCheck,
  Database,
  RefreshCw,
  Download,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { BRAND_CONFIG } from '../../../config/brandConfig';

export const SettingsView: React.FC = () => {
  const {
    isDemoMode,
    setIsDemoMode,
    resetToDemoData,
    clearAllData,
    currentUser,
    clients,
    contracts,
    serviceOrders,
  } = useAdmin();

  const [savedSuccess, setSavedSuccess] = useState(false);

  const exportAllData = () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      user: currentUser.email,
      clients,
      contracts,
      serviceOrders,
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ambientes-limpos-backup-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-black text-slate-900">
            Configurações Gerais & Parâmetros do ERP
          </h2>
          <p className="text-xs text-slate-600">
            Gerenciamento de dados corporativos, backups operacionais e governança de dados.
          </p>
        </div>
      </div>

      {/* Company Info Box */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-cyan-600" />
          <span>Dados Institucionais Cadastrados</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-600 uppercase text-[10px] mb-1">
              Nome Fantasia
            </label>
            <input
              type="text"
              readOnly
              value={BRAND_CONFIG.name}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-600 uppercase text-[10px] mb-1">
              CNPJ
            </label>
            <input
              type="text"
              readOnly
              value={BRAND_CONFIG.contacts.cnpj}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono text-slate-900"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-600 uppercase text-[10px] mb-1">
              Telefone / WhatsApp Oficial do Sistema
            </label>
            <input
              type="text"
              readOnly
              value={BRAND_CONFIG.contacts.whatsappCommercial}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-600 uppercase text-[10px] mb-1">
              Assessoria Especializada ATR Studio
            </label>
            <input
              type="text"
              readOnly
              value={BRAND_CONFIG.contacts.assessoria}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
            />
          </div>
        </div>
      </div>

      {/* Backup and Data Engine */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
          <Database className="w-4 h-4 text-cyan-600" />
          <span>Segurança de Dados & Backups</span>
        </h3>
        <p className="text-xs text-slate-600">
          Você pode gerar cópias de segurança de todos os clientes, contratos, orçamentos e ordens de serviço a qualquer instante.
        </p>

        <div className="flex flex-wrap gap-3 pt-1">
          <button
            onClick={exportAllData}
            className="px-4 py-2.5 rounded-xl bg-[#0a1e38] hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Exportar Cópia Completa (JSON)</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Recarregar os dados de demonstração da empresa?')) {
                resetToDemoData();
                alert('Dados demonstrativos restaurados com sucesso.');
              }
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-cyan-600" />
            <span>Restaurar Base Demonstrativa</span>
          </button>
        </div>
      </div>

      {/* Sensitive Admin Area */}
      <div className="bg-rose-50/60 rounded-3xl border border-rose-200 p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-rose-900">
          <AlertTriangle className="w-4 h-4 text-rose-600" />
          <h3 className="font-extrabold text-sm">Zona de Reinicialização de Dados</h3>
        </div>
        <p className="text-xs text-rose-800">
          Utilize esta opção apenas quando for iniciar o uso 100% produtivo da empresa em Modo Real sem registros demonstrativos prévios.
        </p>

        <button
          onClick={() => {
            if (
              window.confirm(
                'ATENÇÃO: Deseja realmente zerar todos os dados para início produtivo? Esta ação é irreversível.'
              )
            ) {
              clearAllData();
              alert('Base zerada com sucesso para início produtivo.');
            }
          }}
          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs uppercase tracking-wider transition-colors cursor-pointer"
        >
          Limpar Todos os Dados e Iniciar do Zero
        </button>
      </div>
    </div>
  );
};
