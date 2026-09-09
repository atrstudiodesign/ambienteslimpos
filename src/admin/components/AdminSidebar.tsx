import React from 'react';
import {
  LayoutDashboard,
  Calendar,
  Filter,
  Users,
  FileSpreadsheet,
  FileCheck2,
  Wrench,
  Smartphone,
  Award,
  Users2,
  UserCheck,
  CircleDollarSign,
  FileText,
  BarChart3,
  Bell,
  ShieldAlert,
  Settings,
  LogOut,
  ExternalLink,
  Lock,
  ChevronRight,
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { AdminModule } from '../types';
import { AmbientesLimposLogo } from '../../components/AmbientesLimposLogo';

interface AdminSidebarProps {
  onBackToSite: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  onBackToSite,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const {
    activeModule,
    setActiveModule,
    currentUser,
    logout,
    smartAlerts,
    unreadNotificationsCount,
    canAccessRestrictedDocs,
    canViewFinancials,
  } = useAdmin();

  const navGroups: {
    title: string;
    items: {
      id: AdminModule;
      label: string;
      icon: React.ElementType;
      badge?: string | number;
      restricted?: boolean;
      colaboradorPrimary?: boolean;
    }[];
  }[] = [
    {
      title: 'OPERAÇÃO CENTRAL',
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: LayoutDashboard,
        },
        {
          id: 'agenda',
          label: 'Agenda',
          icon: Calendar,
        },
        {
          id: 'execution',
          label: 'Serviço de Hoje',
          icon: Smartphone,
          badge: currentUser.role === 'COLABORADOR' ? 'Ativo' : undefined,
          colaboradorPrimary: true,
        },
        {
          id: 'services',
          label: 'Serviços / OS',
          icon: Wrench,
        },
      ],
    },
    {
      title: 'COMERCIAL & CRM',
      items: [
        {
          id: 'leads',
          label: 'Leads & Pipeline',
          icon: Filter,
        },
        {
          id: 'clients',
          label: 'Clientes',
          icon: Users,
        },
        {
          id: 'quotes',
          label: 'Orçamentos',
          icon: FileSpreadsheet,
        },
        {
          id: 'contracts',
          label: 'Contratos',
          icon: FileCheck2,
          badge: smartAlerts.some((a) => a.module === 'contracts') ? '!' : undefined,
        },
      ],
    },
    {
      title: 'EQUIPES & QUALIDADE',
      items: [
        {
          id: 'teams',
          label: 'Equipes',
          icon: Users2,
        },
        {
          id: 'staff',
          label: 'Colaboradores',
          icon: UserCheck,
        },
        {
          id: 'quality',
          label: 'Qualidade / Vistorias',
          icon: Award,
        },
      ],
    },
    {
      title: 'GESTÃO & AUDITORIA',
      items: [
        ...(canViewFinancials
          ? [
              {
                id: 'financial' as AdminModule,
                label: 'Financeiro',
                icon: CircleDollarSign,
                badge: smartAlerts.some((a) => a.module === 'financial') ? 'Atrasos' : undefined,
              },
            ]
          : []),
        {
          id: 'documents',
          label: 'Documentos',
          icon: FileText,
          restricted: !canAccessRestrictedDocs,
        },
        {
          id: 'reports',
          label: 'Relatórios',
          icon: BarChart3,
        },
        {
          id: 'sheets',
          label: 'Google Sheets',
          icon: FileSpreadsheet,
          badge: 'Cloud',
        },
        {
          id: 'communication',
          label: 'Mensagens WhatsApp',
          icon: ExternalLink,
        },
        {
          id: 'notifications',
          label: 'Notificações',
          icon: Bell,
          badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : undefined,
        },
        {
          id: 'audit',
          label: 'Auditoria',
          icon: ShieldAlert,
        },
        {
          id: 'settings',
          label: 'Configurações',
          icon: Settings,
        },
      ],
    },
  ];

  const handleSelectModule = (moduleId: AdminModule) => {
    setActiveModule(moduleId);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="lg:hidden fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm animate-in fade-in"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#08182f] text-slate-300 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-5 border-b border-slate-800 bg-[#061427]">
          <div className="flex items-center justify-between">
            <div className="scale-90 origin-left">
              <AmbientesLimposLogo variant="light" size="sm" showSlogan={false} />
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-cyan-950 text-cyan-400 border border-cyan-800">
              ERP
            </span>
          </div>
          <div className="mt-2 text-[10px] uppercase font-bold tracking-widest text-slate-400">
            Painel Operacional Integrado
          </div>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-700">
          {navGroups.map((group) => (
            <div key={group.title} className="space-y-1">
              <p className="px-3 text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">
                {group.title}
              </p>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeModule === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectModule(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer group ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white shadow-md shadow-cyan-900/40 font-bold'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    } ${item.colaboradorPrimary && currentUser.role === 'COLABORADOR' ? 'ring-1 ring-amber-400/40 bg-amber-950/20' : ''}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-cyan-400'
                        }`}
                      />
                      <span>{item.label}</span>
                      {item.restricted && (
                        <Lock className="w-3 h-3 text-amber-400/70" title="Acesso Restrito ao Administrador" />
                      )}
                    </div>

                    {item.badge && (
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isActive
                            ? 'bg-white text-cyan-800'
                            : 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* User Card & Footer Controls */}
        <div className="p-3 border-t border-slate-800 bg-[#061427] space-y-2.5">
          {/* User Profile Badge */}
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 flex items-center justify-center font-black text-xs">
              {currentUser.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
              <div className="text-[10px] text-cyan-400 truncate flex items-center gap-1 font-mono">
                <span>{currentUser.role}</span>
                {currentUser.isVerifiedAdminEmail && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Admin Verificado" />
                )}
              </div>
            </div>
          </div>

          {/* Site Public Button */}
          <button
            onClick={onBackToSite}
            className="w-full py-2 px-3 rounded-lg text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span>Ver Site Público</span>
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full py-1.5 px-3 rounded-lg text-[11px] font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3 h-3" />
            <span>Sair do Sistema</span>
          </button>
        </div>
      </aside>
    </>
  );
};
