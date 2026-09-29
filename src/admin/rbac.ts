import { AdminModule, UserRole } from './types';

const ALL_MODULES: AdminModule[] = [
  'dashboard','agenda','leads','clients','quotes','contracts','services','execution',
  'quality','teams','staff','financial','documents','reports','sheets','communication',
  'notifications','audit','settings',
];

export const ROLE_MODULES: Record<UserRole, AdminModule[]> = {
  SUPER_ADMIN: ALL_MODULES,
  ADMINISTRADOR: ALL_MODULES,
  GERENTE: ['dashboard','agenda','leads','clients','quotes','contracts','services','quality','teams','staff','financial','documents','reports','communication','notifications'],
  ASSESSORIA: ['dashboard','agenda','clients','quotes','contracts','services','financial','documents','reports','sheets','communication','notifications','audit'],
  ATENDIMENTO: ['dashboard','agenda','leads','clients','quotes','services','communication','notifications'],
  SUPERVISOR: ['dashboard','agenda','services','quality','teams','staff','reports','notifications'],
  FINANCEIRO: ['dashboard','clients','contracts','financial','documents','reports','notifications'],
  COLABORADOR: ['execution','notifications'],
};

export const ROLE_LABELS: Record<UserRole, string> = {
  SUPER_ADMIN: 'Super Admin (Proprietário)',
  ADMINISTRADOR: 'Administrador',
  GERENTE: 'Gerência',
  ASSESSORIA: 'Assessoria ATR Studio',
  ATENDIMENTO: 'Atendimento / CRM',
  SUPERVISOR: 'Supervisão de Qualidade',
  FINANCEIRO: 'Financeiro',
  COLABORADOR: 'Colaborador Operacional',
};

export const canRoleAccessModule = (role: UserRole, module: AdminModule) =>
  ROLE_MODULES[role].includes(module);

export const defaultModuleForRole = (role: UserRole): AdminModule =>
  role === 'COLABORADOR' ? 'execution' : ROLE_MODULES[role][0] || 'dashboard';
