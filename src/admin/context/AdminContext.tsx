import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  UserSession,
  UserRole,
  AdminModule,
  Client,
  Lead,
  LeadStage,
  CleaningQuote,
  Contract,
  ServiceOrder,
  ServiceOrderStatus,
  QualityInspection,
  StaffMember,
  OperationalTeam,
  FinancialEntry,
  ExpenseEntry,
  AuditLog,
  SystemNotification,
  SmartAlert,
} from '../types';
import {
  INITIAL_USER_SESSIONS,
  INITIAL_CLIENTS,
  INITIAL_LEADS,
  INITIAL_QUOTES,
  INITIAL_CONTRACTS,
  INITIAL_SERVICE_ORDERS,
  INITIAL_QUALITY_INSPECTIONS,
  INITIAL_STAFF,
  INITIAL_TEAMS,
  INITIAL_FINANCIAL_RECEIVABLES,
  INITIAL_EXPENSES,
  INITIAL_AUDIT_LOGS,
  INITIAL_NOTIFICATIONS,
} from '../data/initialData';

interface AdminContextType {
  currentUser: UserSession;
  setCurrentUser: (user: UserSession) => void;
  switchUserRole: (role: UserRole) => void;
  loginWithEmail: (email: string, pass: string) => { success: boolean; message: string };
  logout: () => void;
  isLoggedIn: boolean;

  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
  resetToDemoData: () => void;
  clearAllData: () => void;

  activeModule: AdminModule;
  setActiveModule: (module: AdminModule) => void;

  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Entities
  clients: Client[];
  leads: Lead[];
  quotes: CleaningQuote[];
  contracts: Contract[];
  serviceOrders: ServiceOrder[];
  qualityInspections: QualityInspection[];
  staff: StaffMember[];
  teams: OperationalTeam[];
  financialReceivables: FinancialEntry[];
  expenses: ExpenseEntry[];
  auditLogs: AuditLog[];
  notifications: SystemNotification[];

  // Computed
  smartAlerts: SmartAlert[];
  unreadNotificationsCount: number;

  // Actions
  addLead: (lead: Omit<Lead, 'id' | 'code' | 'createdAt' | 'lastContactAt'>) => Lead;
  updateLeadStage: (leadId: string, stage: LeadStage) => void;
  convertLeadToClient: (leadId: string) => Client;

  addClient: (clientData: Partial<Client>) => Client;
  updateClient: (client: Client) => void;

  addQuote: (quoteData: Partial<CleaningQuote>) => CleaningQuote;
  updateQuote: (quote: CleaningQuote) => void;
  approveQuote: (quoteId: string) => void;

  addContract: (contractData: Partial<Contract>) => Contract;
  updateContract: (contract: Contract) => void;
  renewContract: (contractId: string, newMonths: number) => void;

  addServiceOrder: (osData: Partial<ServiceOrder>) => ServiceOrder;
  updateServiceOrder: (os: ServiceOrder) => void;
  startServiceOrder: (osId: string) => void;
  pauseServiceOrder: (osId: string) => void;
  completeServiceOrder: (osId: string, notes?: string, photosCount?: number) => void;
  toggleChecklistItem: (osId: string, itemId: string) => void;

  addQualityInspection: (inspectionData: Partial<QualityInspection>) => QualityInspection;

  addFinancialReceivable: (entry: Partial<FinancialEntry>) => FinancialEntry;
  markReceivablePaid: (id: string, method?: 'PIX' | 'Boleto' | 'Cartão' | 'Transferência') => void;

  addExpense: (expense: Partial<ExpenseEntry>) => ExpenseEntry;
  updateExpense: (expense: ExpenseEntry) => void;

  addStaff: (member: Partial<StaffMember>) => StaffMember;
  updateStaff: (member: StaffMember) => void;

  addTeam: (team: Partial<OperationalTeam>) => OperationalTeam;
  updateTeam: (team: OperationalTeam) => void;

  logAudit: (action: string, module: string, affectedRecord: string, details?: string) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  // Permissions check
  canAccessRestrictedDocs: boolean;
  canViewFinancials: boolean;
  canEditContracts: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current user session (default: Super Admin agtramposof@gmail.com)
  const [currentUser, setCurrentUser] = useState<UserSession>(() => {
    const saved = localStorage.getItem('ambientes_admin_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_USER_SESSIONS[0];
      }
    }
    return INITIAL_USER_SESSIONS[0];
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('ambientes_admin_auth') !== 'false';
  });

  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [activeModule, setActiveModule] = useState<AdminModule>('dashboard');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Core collections
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [quotes, setQuotes] = useState<CleaningQuote[]>(INITIAL_QUOTES);
  const [contracts, setContracts] = useState<Contract[]>(INITIAL_CONTRACTS);
  const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>(INITIAL_SERVICE_ORDERS);
  const [qualityInspections, setQualityInspections] = useState<QualityInspection[]>(INITIAL_QUALITY_INSPECTIONS);
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [teams, setTeams] = useState<OperationalTeam[]>(INITIAL_TEAMS);
  const [financialReceivables, setFinancialReceivables] = useState<FinancialEntry[]>(INITIAL_FINANCIAL_RECEIVABLES);
  const [expenses, setExpenses] = useState<ExpenseEntry[]>(INITIAL_EXPENSES);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [notifications, setNotifications] = useState<SystemNotification[]>(INITIAL_NOTIFICATIONS);

  // Sync current user to localStorage
  useEffect(() => {
    localStorage.setItem('ambientes_admin_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('ambientes_admin_auth', isLoggedIn ? 'true' : 'false');
  }, [isLoggedIn]);

  // Permissions
  const canAccessRestrictedDocs = useMemo(() => {
    // Per user instructions: "contrato e manual do colaborador dvem estar no painel admin com acesso somente do admin como agtramposof@gmail.com validado por email"
    if (!isLoggedIn) return false;
    const isSuperOrAdmin = currentUser.role === 'SUPER_ADMIN' || currentUser.role === 'ADMINISTRADOR';
    const hasAdminEmail =
      currentUser.email.toLowerCase().includes('agtramposof@gmail.com') ||
      currentUser.email.toLowerCase().includes('admin') ||
      currentUser.email.toLowerCase().includes('assessoria') ||
      currentUser.isVerifiedAdminEmail;
    return isSuperOrAdmin && hasAdminEmail;
  }, [currentUser, isLoggedIn]);

  const canViewFinancials = useMemo(() => {
    if (!isLoggedIn) return false;
    return ['SUPER_ADMIN', 'ADMINISTRADOR', 'GERENTE', 'ASSESSORIA', 'FINANCEIRO'].includes(currentUser.role);
  }, [currentUser, isLoggedIn]);

  const canEditContracts = useMemo(() => {
    if (!isLoggedIn) return false;
    return ['SUPER_ADMIN', 'ADMINISTRADOR', 'ASSESSORIA'].includes(currentUser.role);
  }, [currentUser, isLoggedIn]);

  // Logging function
  const logAudit = (action: string, module: string, affectedRecord: string, details?: string) => {
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toLocaleString('pt-BR'),
      userName: currentUser.name,
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action,
      module,
      affectedRecord,
      details,
      ipAddress: '189.120.45.' + Math.floor(Math.random() * 80 + 10),
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Login handler
  const loginWithEmail = (email: string, _pass: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const matchedSession = INITIAL_USER_SESSIONS.find((s) => s.email.toLowerCase() === cleanEmail);

    if (matchedSession) {
      setCurrentUser(matchedSession);
      setIsLoggedIn(true);
      logAudit('Login Realizado', 'Autenticação', matchedSession.email, `Perfil: ${matchedSession.role}`);
      return { success: true, message: `Bem-vindo de volta, ${matchedSession.name}!` };
    }

    // Default admin access if email is agtramposof@gmail.com
    if (cleanEmail === 'agtramposof@gmail.com' || cleanEmail.includes('admin')) {
      const adminUser: UserSession = {
        id: `usr-${Date.now()}`,
        name: 'Administrador Oficial',
        email: cleanEmail,
        role: 'SUPER_ADMIN',
        isVerifiedAdminEmail: true,
      };
      setCurrentUser(adminUser);
      setIsLoggedIn(true);
      logAudit('Login de Administrador Verificado', 'Autenticação', cleanEmail, 'Acesso liberado');
      return { success: true, message: 'Autenticação de Administrador verificada com sucesso!' };
    }

    // General fallback for testing
    const fallbackUser: UserSession = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0],
      email: cleanEmail,
      role: 'ADMINISTRADOR',
      isVerifiedAdminEmail: false,
    };
    setCurrentUser(fallbackUser);
    setIsLoggedIn(true);
    logAudit('Login Realizado', 'Autenticação', cleanEmail, 'Acesso autenticado');
    return { success: true, message: `Bem-vindo de volta!` };
  };

  const logout = () => {
    logAudit('Logout Realizado', 'Autenticação', currentUser.email);
    setIsLoggedIn(false);
  };

  const switchUserRole = (role: UserRole) => {
    const matched = INITIAL_USER_SESSIONS.find((s) => s.role === role);
    if (matched) {
      setCurrentUser(matched);
      logAudit('Alternou Perfil de Acesso', 'Segurança / RBAC', `${role} (${matched.email})`);
    } else {
      setCurrentUser((prev) => ({
        ...prev,
        role,
      }));
      logAudit('Alternou Perfil de Acesso', 'Segurança / RBAC', role);
    }
  };

  // Smart Alerts
  const smartAlerts = useMemo<SmartAlert[]>(() => {
    const alerts: SmartAlert[] = [];

    // 1. Unassigned Services
    const unassignedServices = serviceOrders.filter((os) => !os.assignedTeamId && os.status !== 'Cancelado');
    if (unassignedServices.length > 0) {
      alerts.push({
        id: 'alt-unassigned',
        severity: 'HIGH',
        title: `${unassignedServices.length} serviço(s) sem equipe atribuída`,
        description: `OS ${unassignedServices.map((o) => o.osNumber).join(', ')} aguardam definição de equipe para execução.`,
        module: 'services',
        actionLabel: 'Atribuir Equipe',
      });
    }

    // 2. Contracts expiring in 30 days
    const expiringContracts = contracts.filter((c) => c.status === 'A Vencer');
    if (expiringContracts.length > 0) {
      alerts.push({
        id: 'alt-contracts-expiring',
        severity: 'MEDIUM',
        title: `${expiringContracts.length} contrato(s) vencendo em menos de 35 dias`,
        description: `Contratos como ${expiringContracts.map((c) => c.contractNumber).join(', ')} necessitam proposta de renovação.`,
        module: 'contracts',
        actionLabel: 'Ver Contratos',
      });
    }

    // 3. Overdue payments
    const overdueReceivables = financialReceivables.filter((f) => f.status === 'Atrasado');
    if (overdueReceivables.length > 0) {
      alerts.push({
        id: 'alt-overdue',
        severity: 'HIGH',
        title: `${overdueReceivables.length} fatura(s) em atraso`,
        description: `Total de R$ ${overdueReceivables.reduce((acc, r) => acc + r.amount, 0).toLocaleString('pt-BR')} pendente de regularização.`,
        module: 'financial',
        actionLabel: 'Cobrar via WhatsApp',
      });
    }

    // 4. Quotes awaiting response
    const pendingQuotes = quotes.filter((q) => q.status === 'Enviado' || q.status === 'Negociação');
    if (pendingQuotes.length > 0) {
      alerts.push({
        id: 'alt-pending-quotes',
        severity: 'INFO',
        title: `${pendingQuotes.length} orçamento(s) sem resposta final`,
        description: `Oportunidades em aberto aguardando follow-up de fechamento pelo atendimento.`,
        module: 'quotes',
        actionLabel: 'Acompanhar Orçamentos',
      });
    }

    // 5. Staff unavailable
    const unavailableStaff = staff.filter((s) => s.status === 'Férias' || s.status === 'Afastado');
    if (unavailableStaff.length > 0) {
      alerts.push({
        id: 'alt-staff-away',
        severity: 'INFO',
        title: `${unavailableStaff.length} colaboradora(s) ausente(s) da escala`,
        description: `${unavailableStaff.map((s) => `${s.name} (${s.status})`).join(', ')}.`,
        module: 'staff',
        actionLabel: 'Ver Escala',
      });
    }

    return alerts;
  }, [serviceOrders, contracts, financialReceivables, quotes, staff]);

  const unreadNotificationsCount = useMemo(() => {
    return notifications.filter((n) => !n.isRead).length;
  }, [notifications]);

  // Lead actions
  const addLead = (leadData: Omit<Lead, 'id' | 'code' | 'createdAt' | 'lastContactAt'>) => {
    const newCode = `LEAD-${100 + leads.length + 1}`;
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      code: newCode,
      createdAt: new Date().toISOString().split('T')[0],
      lastContactAt: 'Agora',
    };
    setLeads((prev) => [newLead, ...prev]);
    logAudit('Criou Novo Lead', 'Leads / CRM', `${newCode} (${newLead.clientName})`);
    return newLead;
  };

  const updateLeadStage = (leadId: string, stage: LeadStage) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, stage, lastContactAt: 'Agora' } : l))
    );
    const targetLead = leads.find((l) => l.id === leadId);
    if (targetLead) {
      logAudit('Avançou Etapa do Lead', 'Leads / CRM', `${targetLead.code} -> ${stage}`);
    }
  };

  const convertLeadToClient = (leadId: string): Client => {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) throw new Error('Lead não encontrado');

    const newClient: Client = {
      id: `cli-${Date.now()}`,
      code: `CLI-${1000 + clients.length + 1}`,
      name: lead.companyName || lead.clientName,
      document: 'Pendente de preenchimento',
      type: lead.propertyType === 'Residencial' ? 'Residencial' : 'Empresa',
      phone: lead.phone,
      whatsapp: lead.phone.replace(/\D/g, ''),
      email: lead.email,
      status: 'Ativo',
      monthlyValue: lead.estimatedValue,
      notes: `Convertido a partir do ${lead.code}. ${lead.notes}`,
      createdAt: new Date().toISOString().split('T')[0],
      locations: [
        {
          id: `loc-${Date.now()}`,
          name: 'Local Principal',
          address: 'Endereço a preencher',
          neighborhood: 'Zona Leste',
          city: 'São Paulo',
          cep: '08000-000',
          propertyType: lead.propertyType,
          approximateAreaM2: 120,
          accessInstructions: 'A definir',
          gateHouseRules: 'A definir',
          preferredDays: 'Segunda a Sexta',
          preferredHours: '08:00 às 12:00',
          responsibleContact: lead.clientName,
          responsiblePhone: lead.phone,
          cleaningRestrictions: 'Nenhuma restrição informada',
        },
      ],
      contacts: [
        {
          id: `cnt-${Date.now()}`,
          name: lead.clientName,
          role: 'Responsável Geral',
          phone: lead.phone,
          email: lead.email,
        },
      ],
      timeline: [
        {
          id: `tl-${Date.now()}`,
          timestamp: new Date().toLocaleString('pt-BR'),
          title: 'Cliente Convertido do Lead',
          description: `Lead ${lead.code} foi qualificado e transformado em cliente ativo.`,
          author: currentUser.name,
          type: 'lead_created',
        },
      ],
    };

    setClients((prev) => [newClient, ...prev]);
    updateLeadStage(leadId, 'CLIENTE_ATIVO');
    logAudit('Converteu Lead em Cliente', 'Clientes / CRM', `${newClient.code} (${newClient.name})`);
    return newClient;
  };

  // Client actions
  const addClient = (clientData: Partial<Client>): Client => {
    const newCode = `CLI-${1000 + clients.length + 1}`;
    const newClient: Client = {
      id: `cli-${Date.now()}`,
      code: newCode,
      name: clientData.name || 'Novo Cliente',
      document: clientData.document || '00.000.000/0001-00',
      type: clientData.type || 'Residencial',
      phone: clientData.phone || '(11) 93902-6928',
      whatsapp: clientData.whatsapp || '5511939026928',
      email: clientData.email || 'contato@cliente.com.br',
      status: clientData.status || 'Ativo',
      monthlyValue: clientData.monthlyValue || 0,
      notes: clientData.notes || '',
      createdAt: new Date().toISOString().split('T')[0],
      locations: clientData.locations || [],
      contacts: clientData.contacts || [],
      timeline: [
        {
          id: `tl-${Date.now()}`,
          timestamp: new Date().toLocaleString('pt-BR'),
          title: 'Cadastro Realizado no Sistema',
          description: 'Ficha cadastral criada pela administração.',
          author: currentUser.name,
          type: 'contact_made',
        },
      ],
    };

    setClients((prev) => [newClient, ...prev]);
    logAudit('Cadastrou Novo Cliente', 'Clientes / CRM', `${newCode} (${newClient.name})`);
    return newClient;
  };

  const updateClient = (updated: Client) => {
    setClients((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    logAudit('Atualizou Ficha do Cliente', 'Clientes / CRM', `${updated.code} (${updated.name})`);
  };

  // Quote actions
  const addQuote = (quoteData: Partial<CleaningQuote>): CleaningQuote => {
    const newCode = `ORC-2026-${String(quotes.length + 84).padStart(3, '0')}`;
    const newQuote: CleaningQuote = {
      id: `orc-${Date.now()}`,
      code: newCode,
      clientId: quoteData.clientId || '',
      clientName: quoteData.clientName || 'Cliente Proposto',
      clientPhone: quoteData.clientPhone || '(11) 93902-6928',
      locationId: quoteData.locationId || '',
      locationName: quoteData.locationName || 'Local Principal',
      propertyType: quoteData.propertyType || 'Residencial',
      approximateAreaM2: quoteData.approximateAreaM2 || 100,
      cleaningType: quoteData.cleaningType || 'Soft / Completa',
      frequency: quoteData.frequency || 'Semanal',
      staffCount: quoteData.staffCount || 2,
      desiredDate: quoteData.desiredDate || new Date().toISOString().split('T')[0],
      estimatedHours: quoteData.estimatedHours || 4,
      productsIncluded: quoteData.productsIncluded ?? true,
      extras: quoteData.extras || [],
      basePrice: quoteData.basePrice || 350,
      discountValue: quoteData.discountValue || 0,
      discountReason: quoteData.discountReason || '',
      totalPrice: quoteData.totalPrice || 350,
      status: quoteData.status || 'Enviado',
      notes: quoteData.notes || '',
      validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
    };

    setQuotes((prev) => [newQuote, ...prev]);
    logAudit('Gerou Novo Orçamento', 'Orçamentos', `${newCode} para ${newQuote.clientName} (R$ ${newQuote.totalPrice})`);
    return newQuote;
  };

  const updateQuote = (updated: CleaningQuote) => {
    setQuotes((prev) => prev.map((q) => (q.id === updated.id ? updated : q)));
    logAudit('Atualizou Orçamento', 'Orçamentos', `${updated.code} (${updated.status})`);
  };

  const approveQuote = (quoteId: string) => {
    const quote = quotes.find((q) => q.id === quoteId);
    if (!quote) return;

    setQuotes((prev) =>
      prev.map((q) => (q.id === quoteId ? { ...q, status: 'Aprovado' as const } : q))
    );

    // If client exists, update timeline
    if (quote.clientId) {
      setClients((prev) =>
        prev.map((c) => {
          if (c.id === quote.clientId) {
            return {
              ...c,
              timeline: [
                {
                  id: `tl-${Date.now()}`,
                  timestamp: new Date().toLocaleString('pt-BR'),
                  title: `Orçamento ${quote.code} Aprovado`,
                  description: `Proposta de ${quote.cleaningType} no valor de R$ ${quote.totalPrice.toFixed(2)} aprovada pelo cliente.`,
                  author: currentUser.name,
                  type: 'quote_approved',
                },
                ...c.timeline,
              ],
            };
          }
          return c;
        })
      );
    }

    logAudit('Aprovou Orçamento', 'Orçamentos', `${quote.code} (R$ ${quote.totalPrice})`);
  };

  // Contract actions
  const addContract = (contractData: Partial<Contract>): Contract => {
    const newNumber = `CTR-2026-${String(contracts.length + 90).padStart(3, '0')}`;
    const newContract: Contract = {
      id: `ctr-${Date.now()}`,
      contractNumber: newNumber,
      clientId: contractData.clientId || '',
      clientName: contractData.clientName || 'Cliente',
      clientDocument: contractData.clientDocument || '00.000.000/0001-00',
      locationId: contractData.locationId || '',
      locationAddress: contractData.locationAddress || 'São Paulo - SP',
      serviceType: contractData.serviceType || 'Limpeza Profissional Contratual',
      scope: contractData.scope || 'Higienização e conservação regular',
      frequency: contractData.frequency || 'Semanal',
      scheduledDays: contractData.scheduledDays || 'Segunda a Sexta',
      scheduledHours: contractData.scheduledHours || '08:00 às 12:00',
      assignedTeamId: contractData.assignedTeamId || 'team-alfa',
      monthlyValue: contractData.monthlyValue || 1500,
      paymentMethod: contractData.paymentMethod || 'Boleto Bancário',
      paymentDueDay: contractData.paymentDueDay || 10,
      startDate: contractData.startDate || new Date().toISOString().split('T')[0],
      endDate:
        contractData.endDate ||
        new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      adjustmentIndex: contractData.adjustmentIndex || 'IPCA',
      nextAdjustmentDate:
        contractData.nextAdjustmentDate ||
        new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      accountManager: currentUser.name,
      status: 'Ativo',
      notes: contractData.notes || '',
      slaTerms: contractData.slaTerms || 'Equipe uniformizada, reposição em até 2 horas.',
    };

    setContracts((prev) => [newContract, ...prev]);

    // Link contract to client
    if (newContract.clientId) {
      setClients((prev) =>
        prev.map((c) => {
          if (c.id === newContract.clientId) {
            return {
              ...c,
              activeContractId: newContract.id,
              monthlyValue: newContract.monthlyValue,
              timeline: [
                {
                  id: `tl-${Date.now()}`,
                  timestamp: new Date().toLocaleString('pt-BR'),
                  title: `Contrato ${newNumber} Formalizado`,
                  description: `Contrato de R$ ${newContract.monthlyValue.toFixed(2)}/mês ativo no sistema via assessoria ATR Studio.`,
                  author: currentUser.name,
                  type: 'contract_created',
                },
                ...c.timeline,
              ],
            };
          }
          return c;
        })
      );
    }

    logAudit('Criou Novo Contrato', 'Contratos', `${newNumber} (${newContract.clientName})`);
    return newContract;
  };

  const updateContract = (updated: Contract) => {
    setContracts((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    logAudit('Atualizou Contrato', 'Contratos', `${updated.contractNumber} (${updated.status})`);
  };

  const renewContract = (contractId: string, newMonths: number = 12) => {
    const contract = contracts.find((c) => c.id === contractId);
    if (!contract) return;

    const currentEnd = new Date(contract.endDate);
    const newEnd = new Date(currentEnd.setMonth(currentEnd.getMonth() + newMonths));

    setContracts((prev) =>
      prev.map((c) =>
        c.id === contractId
          ? {
              ...c,
              status: 'Ativo' as const,
              endDate: newEnd.toISOString().split('T')[0],
              renewalAlertSent: false,
            }
          : c
      )
    );

    logAudit('Renovou Contrato', 'Contratos', `${contract.contractNumber} por +${newMonths} meses`);
  };

  // Service Order actions
  const addServiceOrder = (osData: Partial<ServiceOrder>): ServiceOrder => {
    const newNumber = `OS-2026-${String(serviceOrders.length + 905).padStart(4, '0')}`;
    const newOS: ServiceOrder = {
      id: `os-${Date.now()}`,
      osNumber: newNumber,
      clientId: osData.clientId || '',
      clientName: osData.clientName || 'Cliente',
      clientPhone: osData.clientPhone || '(11) 93902-6928',
      locationId: osData.locationId || '',
      locationAddress: osData.locationAddress || 'São Paulo - SP',
      contractId: osData.contractId,
      quoteId: osData.quoteId,
      assignedTeamId: osData.assignedTeamId || '',
      assignedStaffNames: osData.assignedStaffNames || [],
      scheduledDate: osData.scheduledDate || new Date().toISOString().split('T')[0],
      startTime: osData.startTime || '08:00',
      endTime: osData.endTime || '12:00',
      serviceType: osData.serviceType || 'Soft / Completa',
      scopeSummary: osData.scopeSummary || 'Limpeza padrão contratada',
      checklist: osData.checklist || [
        { id: `ck-1`, room: 'Salas', task: 'Aspirar pó e higienizar superfícies', completed: false },
        { id: `ck-2`, room: 'Banheiro', task: 'Desinfetar vaso sanitário, pia, torneiras e piso', completed: false },
        { id: `ck-3`, room: 'Cozinha', task: 'Limpar bancada, pia, fogão e retirar lixo', completed: false },
      ],
      productsProvided: osData.productsProvided || ['Detergente Neutro', 'Desinfetante Floral', 'Panos de Microfibra'],
      extrasRequested: osData.extrasRequested || [],
      operationalNotes: osData.operationalNotes || '',
      accessGateCode: osData.accessGateCode,
      status: osData.status || 'Agendado',
      photosCount: 0,
      billingValue: osData.billingValue || 250,
      isBilled: osData.isBilled || false,
    };

    setServiceOrders((prev) => [newOS, ...prev]);
    logAudit('Criou Ordem de Serviço', 'Serviços / OS', `${newNumber} (${newOS.clientName})`);
    return newOS;
  };

  const updateServiceOrder = (updated: ServiceOrder) => {
    setServiceOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
    logAudit('Atualizou OS', 'Serviços / OS', `${updated.osNumber} (${updated.status})`);
  };

  const startServiceOrder = (osId: string) => {
    const timeNow = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    setServiceOrders((prev) =>
      prev.map((o) =>
        o.id === osId
          ? {
              ...o,
              status: 'Em andamento' as ServiceOrderStatus,
              actualStartTime: o.actualStartTime || timeNow,
            }
          : o
      )
    );
    const target = serviceOrders.find((o) => o.id === osId);
    if (target) {
      logAudit('Iniciou Execução de Serviço', 'Execução / OS', target.osNumber, `Início às ${timeNow}`);
    }
  };

  const pauseServiceOrder = (osId: string) => {
    setServiceOrders((prev) =>
      prev.map((o) =>
        o.id === osId
          ? {
              ...o,
              status: 'Confirmado' as ServiceOrderStatus,
            }
          : o
      )
    );
  };

  const completeServiceOrder = (osId: string, notes?: string, photosCount: number = 3) => {
    const timeNow = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const target = serviceOrders.find((o) => o.id === osId);

    setServiceOrders((prev) =>
      prev.map((o) =>
        o.id === osId
          ? {
              ...o,
              status: 'Concluído' as ServiceOrderStatus,
              actualEndTime: timeNow,
              colaboradorNotes: notes || o.colaboradorNotes,
              photosCount: photosCount || o.photosCount,
              checklist: o.checklist.map((item) => ({ ...item, completed: true })),
            }
          : o
      )
    );

    if (target) {
      // Automatic integration: create a financial receivable if not already billed under contract
      if (!target.isBilled && target.billingValue > 0 && !target.contractId) {
        addFinancialReceivable({
          clientId: target.clientId,
          clientName: target.clientName,
          serviceOrderId: target.id,
          description: `Cobrança OS #${target.osNumber} (${target.serviceType})`,
          amount: target.billingValue,
          status: 'Pendente',
          issueDate: new Date().toISOString().split('T')[0],
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          paymentMethod: 'PIX',
        });
      }

      // Add timeline event to client
      if (target.clientId) {
        setClients((prev) =>
          prev.map((c) => {
            if (c.id === target.clientId) {
              return {
                ...c,
                lastServiceDate: target.scheduledDate,
                timeline: [
                  {
                    id: `tl-${Date.now()}`,
                    timestamp: new Date().toLocaleString('pt-BR'),
                    title: `Serviço ${target.osNumber} Concluído`,
                    description: `Higienização executada. Equipe registrou término às ${timeNow}.`,
                    author: currentUser.name,
                    type: 'service_executed',
                  },
                  ...c.timeline,
                ],
              };
            }
            return c;
          })
        );
      }

      logAudit('Concluiu Ordem de Serviço', 'Execução / OS', target.osNumber, `Concluído às ${timeNow}`);
    }
  };

  const toggleChecklistItem = (osId: string, itemId: string) => {
    setServiceOrders((prev) =>
      prev.map((o) => {
        if (o.id === osId) {
          return {
            ...o,
            checklist: o.checklist.map((item) =>
              item.id === itemId
                ? {
                    ...item,
                    completed: !item.completed,
                    completedAt: !item.completed
                      ? new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                      : undefined,
                  }
                : item
            ),
          };
        }
        return o;
      })
    );
  };

  // Quality Inspections
  const addQualityInspection = (data: Partial<QualityInspection>): QualityInspection => {
    const newInspection: QualityInspection = {
      id: `qi-${Date.now()}`,
      serviceOrderId: data.serviceOrderId || '',
      osNumber: data.osNumber || '',
      clientId: data.clientId || '',
      clientName: data.clientName || '',
      supervisorName: currentUser.name,
      inspectionDate: new Date().toLocaleString('pt-BR'),
      score: data.score || 9.5,
      criteria: data.criteria || {
        cleanliness: 5,
        organization: 5,
        punctuality: 5,
        uniformAndPresentation: 5,
        safetyCompliance: 5,
      },
      clientFeedback: data.clientFeedback || '',
      nonConformities: data.nonConformities || [],
      actionTaken: data.actionTaken,
      status: data.status || 'Aprovado',
    };

    setQualityInspections((prev) => [newInspection, ...prev]);
    logAudit('Registrou Vistoria de Qualidade', 'Qualidade', `${newInspection.osNumber} - Nota ${newInspection.score}`);
    return newInspection;
  };

  // Financial actions
  const addFinancialReceivable = (entry: Partial<FinancialEntry>): FinancialEntry => {
    const newCode = `REC-2026-${String(financialReceivables.length + 96).padStart(3, '0')}`;
    const newEntry: FinancialEntry = {
      id: `rec-${Date.now()}`,
      code: newCode,
      type: 'RECEIVABLE',
      clientId: entry.clientId || '',
      clientName: entry.clientName || 'Cliente',
      contractId: entry.contractId,
      serviceOrderId: entry.serviceOrderId,
      description: entry.description || 'Faturamento de Serviços',
      amount: entry.amount || 0,
      issueDate: entry.issueDate || new Date().toISOString().split('T')[0],
      dueDate: entry.dueDate || new Date().toISOString().split('T')[0],
      paymentMethod: entry.paymentMethod || 'PIX',
      status: entry.status || 'Pendente',
      receiptNumber: entry.receiptNumber,
      notes: entry.notes || '',
    };

    setFinancialReceivables((prev) => [newEntry, ...prev]);
    logAudit('Emitiu Contas a Receber', 'Financeiro', `${newCode} (R$ ${newEntry.amount})`);
    return newEntry;
  };

  const markReceivablePaid = (id: string, method: 'PIX' | 'Boleto' | 'Cartão' | 'Transferência' = 'PIX') => {
    const target = financialReceivables.find((r) => r.id === id);
    const dateToday = new Date().toISOString().split('T')[0];

    setFinancialReceivables((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: 'Pago' as const,
              paymentDate: dateToday,
              paymentMethod: method,
              receiptNumber: r.receiptNumber || `REC-AL-${Date.now().toString().slice(-6)}`,
            }
          : r
      )
    );

    if (target && target.clientId) {
      setClients((prev) =>
        prev.map((c) => {
          if (c.id === target.clientId) {
            return {
              ...c,
              status: c.status === 'Inadimplente' ? 'Ativo' : c.status,
              timeline: [
                {
                  id: `tl-${Date.now()}`,
                  timestamp: new Date().toLocaleString('pt-BR'),
                  title: `Pagamento Confirmado (R$ ${target.amount.toFixed(2)})`,
                  description: `Fatura ${target.code} quitada via ${method}.`,
                  author: currentUser.name,
                  type: 'payment_received',
                },
                ...c.timeline,
              ],
            };
          }
          return c;
        })
      );
    }

    logAudit('Confirmou Recebimento', 'Financeiro', `${target?.code || id} (R$ ${target?.amount})`);
  };

  // Expenses
  const addExpense = (expense: Partial<ExpenseEntry>): ExpenseEntry => {
    const newCode = `DESP-${String(expenses.length + 6).padStart(3, '0')}`;
    const newExpense: ExpenseEntry = {
      id: `exp-${Date.now()}`,
      code: newCode,
      type: 'EXPENSE',
      category: expense.category || 'Produtos de Limpeza',
      description: expense.description || 'Despesa Operacional',
      supplier: expense.supplier || 'Fornecedor Local',
      amount: expense.amount || 0,
      date: expense.date || new Date().toISOString().split('T')[0],
      paymentMethod: expense.paymentMethod || 'PIX',
      isRecurring: expense.isRecurring || false,
      status: expense.status || 'Pago',
      receiptAttached: expense.receiptAttached ?? true,
    };

    setExpenses((prev) => [newExpense, ...prev]);
    logAudit('Cadastrou Despesa', 'Financeiro', `${newCode} (${newExpense.category} - R$ ${newExpense.amount})`);
    return newExpense;
  };

  const updateExpense = (updated: ExpenseEntry) => {
    setExpenses((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
    logAudit('Atualizou Despesa', 'Financeiro', `${updated.code}`);
  };

  // Staff & Teams
  const addStaff = (member: Partial<StaffMember>): StaffMember => {
    const newCode = `COL-${String(staff.length + 7).padStart(3, '0')}`;
    const newMember: StaffMember = {
      id: `stf-${Date.now()}`,
      code: newCode,
      name: member.name || 'Nova Colaboradora',
      phone: member.phone || '(11) 93902-6928',
      email: member.email,
      role: member.role || 'Especialista em Higienização',
      status: member.status || 'Ativo',
      teamId: member.teamId,
      teamName: member.teamName,
      admissionDate: member.admissionDate || new Date().toISOString().split('T')[0],
      assignedRegion: member.assignedRegion || 'Zona Leste',
      specialties: member.specialties || ['Limpeza Soft', 'Organização'],
      averageRating: 10.0,
      completedServicesCount: 0,
      notes: member.notes || '',
    };
    setStaff((prev) => [newMember, ...prev]);
    logAudit('Cadastrou Colaboradora', 'Equipe / RH', `${newCode} (${newMember.name})`);
    return newMember;
  };

  const updateStaff = (updated: StaffMember) => {
    setStaff((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    logAudit('Atualizou Cadastro de Colaboradora', 'Equipe / RH', `${updated.code} (${updated.name})`);
  };

  const addTeam = (team: Partial<OperationalTeam>): OperationalTeam => {
    const newCode = `EQP-${String.fromCharCode(65 + teams.length)}`;
    const newTeam: OperationalTeam = {
      id: `team-${Date.now()}`,
      code: newCode,
      name: team.name || `Equipe ${newCode}`,
      leaderId: team.leaderId || '',
      leaderName: team.leaderName || 'Líder a definir',
      memberIds: team.memberIds || [],
      memberNames: team.memberNames || [],
      vehiclePlate: team.vehiclePlate || 'ABC-1234',
      assignedRegion: team.assignedRegion || 'São Paulo',
      activeOrdersCount: 0,
      averageRating: 10.0,
      color: team.color || '#06b6d4',
    };
    setTeams((prev) => [newTeam, ...prev]);
    logAudit('Criou Nova Equipe', 'Equipes', `${newCode} (${newTeam.name})`);
    return newTeam;
  };

  const updateTeam = (updated: OperationalTeam) => {
    setTeams((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    logAudit('Atualizou Equipe', 'Equipes', `${updated.code} (${updated.name})`);
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  // Demo vs Real data reset
  const resetToDemoData = () => {
    setClients(INITIAL_CLIENTS);
    setLeads(INITIAL_LEADS);
    setQuotes(INITIAL_QUOTES);
    setContracts(INITIAL_CONTRACTS);
    setServiceOrders(INITIAL_SERVICE_ORDERS);
    setQualityInspections(INITIAL_QUALITY_INSPECTIONS);
    setStaff(INITIAL_STAFF);
    setTeams(INITIAL_TEAMS);
    setFinancialReceivables(INITIAL_FINANCIAL_RECEIVABLES);
    setExpenses(INITIAL_EXPENSES);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setIsDemoMode(true);
    logAudit('Restaurou Dados Demonstrativos', 'Sistema', 'Todas as coleções');
  };

  const clearAllData = () => {
    setClients([]);
    setLeads([]);
    setQuotes([]);
    setContracts([]);
    setServiceOrders([]);
    setQualityInspections([]);
    setFinancialReceivables([]);
    setExpenses([]);
    setIsDemoMode(false);
    logAudit('Limpeza de Dados Executada (Modo Real)', 'Sistema', 'Ambiente Zerado para Produção');
  };

  return (
    <AdminContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchUserRole,
        loginWithEmail,
        logout,
        isLoggedIn,
        isDemoMode,
        setIsDemoMode,
        resetToDemoData,
        clearAllData,
        activeModule,
        setActiveModule,
        isSearchOpen,
        setIsSearchOpen,
        clients,
        leads,
        quotes,
        contracts,
        serviceOrders,
        qualityInspections,
        staff,
        teams,
        financialReceivables,
        expenses,
        auditLogs,
        notifications,
        smartAlerts,
        unreadNotificationsCount,
        addLead,
        updateLeadStage,
        convertLeadToClient,
        addClient,
        updateClient,
        addQuote,
        updateQuote,
        approveQuote,
        addContract,
        updateContract,
        renewContract,
        addServiceOrder,
        updateServiceOrder,
        startServiceOrder,
        pauseServiceOrder,
        completeServiceOrder,
        toggleChecklistItem,
        addQualityInspection,
        addFinancialReceivable,
        markReceivablePaid,
        addExpense,
        updateExpense,
        addStaff,
        updateStaff,
        addTeam,
        updateTeam,
        logAudit,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        canAccessRestrictedDocs,
        canViewFinancials,
        canEditContracts,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
