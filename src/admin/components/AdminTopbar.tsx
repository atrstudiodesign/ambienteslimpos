import React, { useState } from 'react';
import {
  Menu,
  Search,
  Bell,
  Sparkles,
  ShieldCheck,
  User,
  ChevronDown,
  RefreshCw,
  Database,
  ExternalLink,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { UserRole } from '../types';

interface AdminTopbarProps {
  onOpenMobileMenu: () => void;
  onBackToSite: () => void;
}

export const AdminTopbar: React.FC<AdminTopbarProps> = ({ onOpenMobileMenu, onBackToSite }) => {
  const {
    activeModule,
    currentUser,
    switchUserRole,
    isDemoMode,
    resetToDemoData,
    enterDemoMode,
    logout,
    setIsSearchOpen,
    notifications,
    unreadNotificationsCount,
    markAllNotificationsAsRead,
    setActiveModule,
  } = useAdmin();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);

  const roleOptions: { role: UserRole; label: string; desc: string }[] = [
    {
      role: 'SUPER_ADMIN',
      label: 'Super Admin (Proprietário)',
      desc: 'Acesso total, contratos e financeiro',
    },
    {
      role: 'ASSESSORIA',
      label: 'Assessoria ATR Studio',
      desc: 'Contratos, governança e financeiro',
    },
    {
      role: 'ATENDIMENTO',
      label: 'Atendimento / CRM',
      desc: 'Leads, clientes, agenda e orçamentos',
    },
    {
      role: 'SUPERVISOR',
      label: 'Supervisão de Qualidade',
      desc: 'Checklists, vistorias e equipes',
    },
    {
      role: 'COLABORADOR',
      label: 'Colaborador Operacional',
      desc: 'Visão simples de execução de serviço',
    },
  ];

  const getModuleTitle = (mod: string) => {
    switch (mod) {
      case 'dashboard':
        return 'Dashboard Geral';
      case 'agenda':
        return 'Agenda & Cronograma Operacional';
      case 'execution':
        return 'Modo Execução — Serviço de Hoje';
      case 'leads':
        return 'Funil de Oportunidades & Leads';
      case 'clients':
        return 'Gestão de Clientes & Locais';
      case 'quotes':
        return 'Gerador de Orçamentos Profissionais';
      case 'contracts':
        return 'Central de Contratos & Renovações';
      case 'services':
        return 'Ordens de Serviço (OS)';
      case 'teams':
        return 'Equipes Operacionais';
      case 'staff':
        return 'Cadastro de Colaboradores & RH';
      case 'quality':
        return 'Inspeção de Qualidade & Vistorias';
      case 'financial':
        return 'Controle Financeiro & Faturamento';
      case 'documents':
        return 'Central Documental (Contratos & Manuais)';
      case 'reports':
        return 'Centro de Relatórios & Métricas';
      case 'communication':
        return 'Modelos de Mensagens WhatsApp';
      case 'notifications':
        return 'Central de Notificações';
      case 'audit':
        return 'Trilha de Auditoria Inalterável';
      case 'settings':
        return 'Configurações do Sistema';
      default:
        return 'Painel Operacional';
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow-xs">
      {/* Left: Mobile trigger & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200"
          aria-label="Abrir Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
            <span>Ambientes Limpos</span>
            <span>/</span>
            <span className="text-cyan-800 font-bold uppercase tracking-wider">{activeModule}</span>
          </div>
          <h1 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight leading-tight">
            {getModuleTitle(activeModule)}
          </h1>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Global Search Trigger (Ctrl + K) */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 text-xs transition-colors cursor-pointer"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span>Pesquisar...</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono text-slate-600 shadow-xs">
            Ctrl K
          </kbd>
        </button>

        {/* Demo Data / Real Data Badge & Toggle */}
        <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => {
              if (isDemoMode) resetToDemoData();
              else enterDemoMode();
            }}
            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
              isDemoMode
                ? 'bg-amber-400 text-slate-950 shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
            title="Usar dados demonstrativos completos para apresentação"
          >
            Modo Demo
          </button>
          <button
            onClick={() => {
              if (isDemoMode) {
                if (window.confirm('Para entrar no Modo Real é obrigatório autenticar novamente com e-mail e senha. Continuar?')) logout();
              }
            }}
            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
              !isDemoMode
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
            title="Modo Real protegido por autenticação"
          >
            Modo Real
          </button>
        </div>

        {/* Quick RBAC Role Switcher */}
        <div className="relative">
          <button
            onClick={() => isDemoMode && setRoleMenuOpen(!roleMenuOpen)}
            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-bold transition-colors ${isDemoMode ? 'hover:bg-slate-100 cursor-pointer' : 'cursor-default opacity-80'}`}
            title={isDemoMode ? 'Simular Perfil de Acesso (RBAC)' : 'Perfil RBAC definido pelo usuário autenticado'}
          >
            <ShieldCheck className="w-4 h-4 text-cyan-700" />
            <span className="hidden md:inline font-mono">{currentUser.role}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
          </button>

          {roleMenuOpen && isDemoMode && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95">
              <div className="p-2 border-b border-slate-100 mb-1">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600">
                  {isDemoMode ? 'Simular Perfil de Acesso (RBAC)' : 'Perfil de Acesso (RBAC)'}
                </p>
                <p className="text-xs text-slate-600 mt-0.5">
                  Teste o comportamento de permissões em tempo real.
                </p>
              </div>

              <div className="space-y-1">
                {roleOptions.map((opt) => (
                  <button
                    key={opt.role}
                    onClick={() => {
                      switchUserRole(opt.role);
                      setRoleMenuOpen(false);
                      if (opt.role === 'COLABORADOR') {
                        setActiveModule('execution');
                      }
                    }}
                    className={`w-full text-left p-2 rounded-xl text-xs transition-colors flex items-start justify-between cursor-pointer ${
                      currentUser.role === opt.role
                        ? 'bg-cyan-50 text-cyan-900 font-bold border border-cyan-200'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold">{opt.label}</div>
                      <div className="text-[10px] text-slate-600">{opt.desc}</div>
                    </div>
                    {currentUser.role === opt.role && (
                      <Check className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setNotifMenuOpen(!notifMenuOpen)}
            className="relative w-9 h-9 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Notificações"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center animate-pulse">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {notifMenuOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Notificações da Operação</span>
                </div>
                {unreadNotificationsCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-[10px] font-bold text-cyan-600 hover:underline cursor-pointer"
                  >
                    Marcar todas lidas
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto py-2 space-y-2 divide-y divide-slate-100">
                {notifications.slice(0, 5).map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      if (n.targetModule) setActiveModule(n.targetModule);
                      setNotifMenuOpen(false);
                    }}
                    className={`pt-2 cursor-pointer transition-colors ${
                      !n.isRead ? 'bg-cyan-50/50 p-2 rounded-xl' : 'hover:bg-slate-50 p-2 rounded-xl'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900">{n.title}</span>
                      <span className="text-[10px] text-slate-600">{n.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-snug">{n.message}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100 mt-2 text-center">
                <button
                  onClick={() => {
                    setActiveModule('notifications');
                    setNotifMenuOpen(false);
                  }}
                  className="text-xs font-bold text-cyan-600 hover:underline cursor-pointer"
                >
                  Ver todas as notificações
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Return to Public Website */}
        <button
          onClick={onBackToSite}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0a1e38] hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
        >
          <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          <span>Site Público</span>
        </button>
      </div>
    </header>
  );
};
