export type UserRole =
  | 'SUPER_ADMIN'
  | 'ADMINISTRADOR'
  | 'GERENTE'
  | 'ASSESSORIA'
  | 'SUPERVISOR'
  | 'ATENDIMENTO'
  | 'FINANCEIRO'
  | 'COLABORADOR';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  isVerifiedAdminEmail: boolean; // e.g. agtramposof@gmail.com, tramposshop@gmail.com or authorized domain
  isAuthenticated?: boolean;
  teamId?: string;
  assignedStaffId?: string;
}

export type AdminModule =
  | 'dashboard'
  | 'agenda'
  | 'leads'
  | 'clients'
  | 'quotes'
  | 'contracts'
  | 'services'
  | 'execution' // Colaborador execution mode
  | 'quality'
  | 'teams'
  | 'staff'
  | 'financial'
  | 'documents'
  | 'reports'
  | 'sheets' // Google Sheets integration
  | 'communication'
  | 'notifications'
  | 'audit'
  | 'settings';

export type LeadStage =
  | 'NOVO_LEAD'
  | 'CONTATO'
  | 'QUALIFICADO'
  | 'VISITA_AVALIACAO'
  | 'ORCAMENTO'
  | 'NEGOCIACAO'
  | 'APROVADO'
  | 'CONTRATO'
  | 'CLIENTE_ATIVO'
  | 'PERDIDO';

export interface Lead {
  id: string;
  code: string;
  clientName: string;
  companyName?: string;
  phone: string;
  email: string;
  source: 'WhatsApp' | 'Site' | 'Instagram' | 'Indicação' | 'Google' | 'Outro';
  serviceInterest: string;
  propertyType: 'Residencial' | 'Empresarial' | 'Comercial' | 'Condomínio';
  estimatedValue: number;
  stage: LeadStage;
  assignedTo: string;
  notes: string;
  createdAt: string;
  lastContactAt: string;
  nextAction: string;
}

export interface PropertyLocation {
  id: string;
  name?: string; // e.g. "Unidade Centro", "Sede Matriz", "Apartamento Moema"
  label?: string;
  address: string;
  neighborhood?: string;
  city: string;
  state?: string;
  cep: string;
  propertyType: 'Residencial' | 'Empresarial' | 'Comercial' | 'Condomínio';
  approximateAreaM2?: number;
  accessInstructions?: string;
  gateHouseRules?: string;
  preferredDays?: string;
  preferredHours?: string;
  responsibleContact?: string;
  responsiblePhone?: string;
  cleaningRestrictions?: string;
  petNotice?: string;
  specialRestrictions?: string;
}

export type ClientType = 'Residencial' | 'Empresa' | 'Loja' | 'Condomínio';
export type ClientStatus = 'Ativo' | 'Prospect' | 'Inativo' | 'Inadimplente';

export interface ClientContact {
  id: string;
  name: string;
  role: 'Responsável Geral' | 'Financeiro' | 'Operacional / Recepção';
  phone: string;
  email: string;
}

export interface ClientTimelineEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  author: string;
  type:
    | 'lead_created'
    | 'contact_made'
    | 'quote_sent'
    | 'quote_approved'
    | 'contract_created'
    | 'service_scheduled'
    | 'service_executed'
    | 'payment_received'
    | 'complaint'
    | 'adjustment'
    | 'renewal';
}

export interface Client {
  id: string;
  code: string;
  name: string;
  document: string; // CPF or CNPJ
  type: ClientType;
  phone: string;
  whatsapp: string;
  email: string;
  status: ClientStatus;
  locations: PropertyLocation[];
  contacts: ClientContact[];
  timeline: ClientTimelineEvent[];
  lastServiceDate?: string;
  nextServiceDate?: string;
  activeContractId?: string;
  monthlyValue: number;
  notes: string;
  createdAt: string;
}

export type CleaningType = 'Básica' | 'Soft / Completa' | 'Pesada' | 'Pós-Obra' | 'Higienização de Vidros';
export type QuoteStatus =
  | 'Rascunho'
  | 'Enviado'
  | 'Visualizado'
  | 'Negociação'
  | 'Aprovado'
  | 'Recusado'
  | 'Expirado';

export interface QuoteExtraItem {
  id: string;
  name?: string;
  description?: string;
  quantity?: number;
  unitPrice: number;
  total?: number;
  selected?: boolean;
}

export interface CleaningQuote {
  id: string;
  code: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  locationId: string;
  locationName: string;
  propertyType: 'Residencial' | 'Empresarial' | 'Comercial' | 'Condomínio';
  approximateAreaM2: number;
  cleaningType: CleaningType;
  frequency: 'Avulsa / Única' | 'Semanal' | 'Quinzenal' | 'Mensal Recorrente' | 'Diária (Seg-Sex)';
  staffCount: number;
  desiredDate: string;
  estimatedHours: number;
  productsIncluded: boolean;
  extras: QuoteExtraItem[];
  basePrice: number;
  discountValue: number;
  discountReason?: string;
  totalPrice: number;
  status: QuoteStatus;
  notes: string;
  validUntil: string;
  createdAt: string;
}

export type ContractStatus = 'Ativo' | 'A Vencer' | 'Vencido' | 'Em Renovação' | 'Suspenso' | 'Cancelado';

export interface Contract {
  id: string;
  contractNumber: string;
  clientId: string;
  clientName: string;
  clientDocument: string;
  locationId: string;
  locationAddress: string;
  serviceType: string;
  scope: string;
  frequency: string;
  scheduledDays: string;
  scheduledHours: string;
  assignedTeamId: string;
  monthlyValue: number;
  paymentMethod: 'Boleto Bancário' | 'PIX' | 'Cartão Corporativo' | 'Transferência';
  paymentDueDay: number;
  startDate: string;
  endDate: string;
  adjustmentIndex: 'IPCA' | 'IGP-M' | 'Fixo Contratual';
  nextAdjustmentDate: string;
  accountManager: string;
  status: ContractStatus;
  notes: string;
  slaTerms: string;
  renewalAlertSent?: boolean;
}

export type ServiceOrderStatus =
  | 'Agendado'
  | 'Confirmado'
  | 'Em deslocamento'
  | 'Em andamento'
  | 'Aguardando aprovação'
  | 'Concluído'
  | 'Cancelado'
  | 'Reagendado';

export interface ChecklistItem {
  id: string;
  room: 'Salas' | 'Banheiro' | 'Cozinha' | 'Quartos / Escritório' | 'Área de Serviço';
  task: string;
  completed: boolean;
  completedAt?: string;
  notes?: string;
}

export interface ServiceOrder {
  id: string;
  osNumber: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  locationId: string;
  locationAddress: string;
  contractId?: string;
  quoteId?: string;
  assignedTeamId: string;
  assignedStaffNames: string[];
  scheduledDate: string; // YYYY-MM-DD
  startTime: string; // e.g. "08:00"
  endTime: string; // e.g. "12:00"
  serviceType: CleaningType;
  scopeSummary: string;
  checklist: ChecklistItem[];
  productsProvided: string[];
  extrasRequested: string[];
  operationalNotes: string;
  accessGateCode?: string;
  status: ServiceOrderStatus;
  actualStartTime?: string;
  actualEndTime?: string;
  colaboradorNotes?: string;
  photosCount: number;
  billingValue: number;
  isBilled: boolean;
}

export interface QualityInspection {
  id: string;
  serviceOrderId: string;
  osNumber: string;
  clientId: string;
  clientName: string;
  supervisorName: string;
  inspectionDate: string;
  score: number; // 0-10
  criteria: {
    cleanliness: number; // 1-5
    organization: number; // 1-5
    punctuality: number; // 1-5
    uniformAndPresentation: number; // 1-5
    safetyCompliance: number; // 1-5
  };
  clientFeedback?: string;
  nonConformities: string[];
  actionTaken?: string;
  status: 'Aprovado' | 'Aprovado com Ressalva' | 'Reprovado / Reinspeção';
}

export interface StaffMember {
  id: string;
  code: string;
  name: string;
  phone: string;
  email?: string;
  role: 'Líder de Equipe' | 'Especialista em Higienização' | 'Supervisora' | 'Auxiliar de Limpeza';
  status: 'Ativo' | 'Férias' | 'Afastado' | 'Indisponível' | 'Inativo';
  teamId?: string;
  teamName?: string;
  admissionDate: string;
  assignedRegion: string;
  specialties: string[];
  averageRating: number;
  completedServicesCount: number;
  notes: string;
}

export interface OperationalTeam {
  id: string;
  code: string;
  name: string;
  leaderId: string;
  leaderName: string;
  memberIds: string[];
  memberNames: string[];
  vehiclePlate?: string;
  assignedRegion: string;
  activeOrdersCount: number;
  averageRating: number;
  color: string;
}

export type FinancialStatus = 'Pendente' | 'Enviado' | 'Pago' | 'Atrasado' | 'Cancelado';

export interface FinancialEntry {
  id: string;
  code: string;
  type: 'RECEIVABLE'; // Contas a receber
  clientId: string;
  clientName: string;
  contractId?: string;
  serviceOrderId?: string;
  description: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  paymentDate?: string;
  paymentMethod: 'PIX' | 'Boleto' | 'Cartão' | 'Transferência';
  status: FinancialStatus;
  receiptNumber?: string;
  notes?: string;
}

export type ExpenseCategory =
  | 'Produtos de Limpeza'
  | 'Transporte / Combustível'
  | 'Equipamentos e EPIs'
  | 'Uniformes'
  | 'Folha de Pagamento'
  | 'Marketing e Vendas'
  | 'Administrativo e Sistemas'
  | 'Outros';

export interface ExpenseEntry {
  id: string;
  code: string;
  type: 'EXPENSE';
  category: ExpenseCategory;
  description: string;
  supplier: string;
  amount: number;
  date: string;
  paymentMethod: string;
  isRecurring: boolean;
  status: 'Pago' | 'Pendente';
  receiptAttached: boolean;
}

export interface SmartAlert {
  id: string;
  severity: 'HIGH' | 'MEDIUM' | 'INFO';
  title: string;
  description: string;
  module: AdminModule;
  actionLabel: string;
  targetId?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userName: string;
  userEmail: string;
  userRole: UserRole;
  action: string;
  module: string;
  affectedRecord: string;
  details?: string;
  ipAddress?: string;
}

export interface SystemNotification {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  type: 'lead' | 'quote' | 'contract' | 'service' | 'financial' | 'quality' | 'alert' | 'warning' | 'info';
  isRead: boolean;
  targetModule?: AdminModule;
  targetId?: string;
}

// Aliases for unified view imports
export type ClientLocation = PropertyLocation;
export type FinancialReceivable = FinancialEntry & { invoiceNumber?: string };
export type Quote = CleaningQuote;
export type QuoteItem = QuoteExtraItem;
export type Team = OperationalTeam & {
  leaderName?: string;
  active?: boolean;
  vehicle?: string;
};

