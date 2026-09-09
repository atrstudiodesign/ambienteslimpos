import React, { useState, useEffect } from 'react';
import {
  FileSpreadsheet,
  Download,
  Upload,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Plus,
  Users,
  DollarSign,
  Calendar,
  Layers,
  Search,
  Table,
  Eye,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import {
  signInWithGoogle,
  signOutGoogle,
  getGoogleAccessToken,
  listGoogleSpreadsheets,
  createGoogleSpreadsheet,
  writeGoogleSheetValues,
  readGoogleSheetValues,
} from '../../../services/googleSheetsService';
import { User } from 'firebase/auth';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  affectedSummary: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  description,
  affectedSummary,
  onConfirm,
  onCancel,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">{title}</h3>
            <p className="text-xs text-slate-500">Confirmação de operação no Google Sheets</p>
          </div>
        </div>

        <p className="text-sm text-slate-600 mb-3">{description}</p>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 mb-6 text-xs text-slate-700 font-medium">
          {affectedSummary}
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            {isLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
            <span>Confirmar e Exportar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const GoogleSheetsView: React.FC = () => {
  const { clients, financialReceivables, serviceOrders, leads, addAuditLog, notify } = useAdmin();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(getGoogleAccessToken());
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Spreadsheets listing
  const [driveSheets, setDriveSheets] = useState<Array<{ id: string; name: string; modifiedTime: string }>>([]);
  const [isLoadingSheets, setIsLoadingSheets] = useState(false);
  const [searchDriveQuery, setSearchDriveQuery] = useState('');

  // Sheet data viewer
  const [selectedSheetId, setSelectedSheetId] = useState<string | null>(null);
  const [selectedSheetName, setSelectedSheetName] = useState<string>('');
  const [sheetRows, setSheetRows] = useState<any[][]>([]);
  const [isLoadingRows, setIsLoadingRows] = useState(false);

  // Export confirmation modal state
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: 'clients' | 'financial' | 'orders' | 'leads';
    title: string;
    description: string;
    affectedSummary: string;
  }>({
    isOpen: false,
    type: 'clients',
    title: '',
    description: '',
    affectedSummary: '',
  });
  const [isExporting, setIsExporting] = useState(false);
  const [lastExportedUrl, setLastExportedUrl] = useState<string | null>(null);

  // New Custom Sheet Modal
  const [newSheetTitle, setNewSheetTitle] = useState('');
  const [isCreatingCustom, setIsCreatingCustom] = useState(false);

  // Load drive sheets when access token is available
  useEffect(() => {
    if (accessToken) {
      loadSpreadsheets(accessToken);
    }
  }, [accessToken]);

  const loadSpreadsheets = async (token: string) => {
    setIsLoadingSheets(true);
    try {
      const files = await listGoogleSpreadsheets(token);
      setDriveSheets(files);
    } catch (err: any) {
      console.error('Erro ao listar planilhas:', err);
      notify({
        title: 'Google Sheets',
        message: 'Não foi possível carregar a lista de planilhas do Google Drive.',
        type: 'warning',
      });
    } finally {
      setIsLoadingSheets(false);
    }
  };

  const handleSignIn = async () => {
    setIsAuthenticating(true);
    setAuthError(null);
    try {
      const { user, accessToken: token } = await signInWithGoogle();
      setCurrentUser(user);
      setAccessToken(token);
      notify({
        title: 'Google Workspace Conectado',
        message: `Conectado com sucesso como ${user.email}`,
        type: 'financial',
      });
      addAuditLog('Conexão Google Workspace', 'Google Sheets', `Usuário ${user.email} autenticado`);
    } catch (err: any) {
      console.error('Erro de autenticação:', err);
      setAuthError(err.message || 'Erro ao autenticar com o Google.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSignOut = async () => {
    await signOutGoogle();
    setCurrentUser(null);
    setAccessToken(null);
    setDriveSheets([]);
    setSelectedSheetId(null);
    setSheetRows([]);
    notify({
      title: 'Google Workspace',
      message: 'Desconectado da conta Google com sucesso.',
      type: 'info',
    });
  };

  // Trigger export confirmation modal
  const requestExport = (type: 'clients' | 'financial' | 'orders' | 'leads') => {
    if (!accessToken) {
      notify({
        title: 'Autenticação Necessária',
        message: 'Faça login com sua conta Google para exportar planilhas.',
        type: 'warning',
      });
      return;
    }

    if (type === 'clients') {
      setConfirmModal({
        isOpen: true,
        type: 'clients',
        title: 'Exportar Base de Clientes para o Google Sheets',
        description:
          'Uma nova planilha será criada no seu Google Drive com todos os dados cadastrais, unidades, contratos e históricos dos clientes da Ambientes Limpos.',
        affectedSummary: `Serão exportados ${clients.length} cliente(s) ativos e cadastrados no sistema.`,
      });
    } else if (type === 'financial') {
      setConfirmModal({
        isOpen: true,
        type: 'financial',
        title: 'Exportar Faturamento & Recebíveis para o Google Sheets',
        description:
          'Uma nova planilha financeira será gerada no seu Google Drive com todas as faturas, vencimentos, métodos de pagamento e status.',
        affectedSummary: `Serão exportadas ${financialReceivables.length} faturas e movimentações financeiras.`,
      });
    } else if (type === 'orders') {
      setConfirmModal({
        isOpen: true,
        type: 'orders',
        title: 'Exportar Agenda & Ordens de Serviço',
        description:
          'Uma nova planilha de escala operacional será gerada no Google Drive contendo todas as OS, equipes designadas e endereços.',
        affectedSummary: `Serão exportadas ${serviceOrders.length} ordens de serviço programadas.`,
      });
    } else if (type === 'leads') {
      setConfirmModal({
        isOpen: true,
        type: 'leads',
        title: 'Exportar Pipeline de Leads Comerciais',
        description:
          'Uma nova planilha de prospecção será criada com os contatos, interesses e valores estimados dos novos clientes.',
        affectedSummary: `Serão exportados ${leads.length} lead(s) do funil comercial.`,
      });
    }
  };

  // Execute confirmed export operation
  const executeExport = async () => {
    if (!accessToken) return;
    setIsExporting(true);

    try {
      const now = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');

      if (confirmModal.type === 'clients') {
        const title = `Ambientes Limpos - Clientes & Unidades (${now})`;
        const sheet = await createGoogleSpreadsheet(accessToken, title, 'Clientes');

        const headers = [
          'Código',
          'Nome do Cliente',
          'Tipo',
          'Documento (CPF/CNPJ)',
          'Telefone',
          'WhatsApp',
          'E-mail',
          'Endereço Principal',
          'Status',
          'Valor Mensal (R$)',
          'Observações',
        ];

        const rows = clients.map((c) => [
          c.code,
          c.name,
          c.type,
          c.document,
          c.phone,
          c.whatsapp,
          c.email,
          c.locations[0] ? `${c.locations[0].address} - ${c.locations[0].city}` : 'Não informado',
          c.status,
          c.monthlyValue || 0,
          c.notes || '',
        ]);

        await writeGoogleSheetValues(accessToken, sheet.spreadsheetId, 'Clientes!A1:K' + (rows.length + 1), [
          headers,
          ...rows,
        ]);

        setLastExportedUrl(sheet.spreadsheetUrl);
        notify({
          title: 'Planilha Criada com Sucesso',
          message: `Planilha "${title}" sincronizada no Google Sheets.`,
          type: 'financial',
        });
        addAuditLog('Exportação Google Sheets', 'Clientes', `Planilha ${title} gerada no Google Drive`);
      } else if (confirmModal.type === 'financial') {
        const title = `Ambientes Limpos - Financeiro & Recebíveis (${now})`;
        const sheet = await createGoogleSpreadsheet(accessToken, title, 'Financeiro');

        const headers = [
          'Código Fatura',
          'Cliente',
          'Descrição do Serviço',
          'Valor (R$)',
          'Data de Emissão',
          'Vencimento',
          'Data Pagamento',
          'Método',
          'Status',
          'Observações',
        ];

        const rows = financialReceivables.map((f) => [
          f.code,
          f.clientName,
          f.description,
          f.amount,
          f.issueDate,
          f.dueDate,
          f.paymentDate || 'Pendente',
          f.paymentMethod,
          f.status,
          f.notes || '',
        ]);

        await writeGoogleSheetValues(accessToken, sheet.spreadsheetId, 'Financeiro!A1:J' + (rows.length + 1), [
          headers,
          ...rows,
        ]);

        setLastExportedUrl(sheet.spreadsheetUrl);
        notify({
          title: 'Planilha Financeira Criada',
          message: `Planilha "${title}" sincronizada no Google Sheets.`,
          type: 'financial',
        });
        addAuditLog('Exportação Google Sheets', 'Financeiro', `Planilha ${title} gerada no Google Drive`);
      } else if (confirmModal.type === 'orders') {
        const title = `Ambientes Limpos - Ordens de Serviço & Escala (${now})`;
        const sheet = await createGoogleSpreadsheet(accessToken, title, 'Ordens de Serviço');

        const headers = [
          'Nº OS',
          'Data Agendada',
          'Horário',
          'Cliente',
          'Endereço do Local',
          'Tipo de Limpeza',
          'Equipe / Colaboradoras',
          'Status',
          'Valor da OS (R$)',
        ];

        const rows = serviceOrders.map((o) => [
          o.osNumber,
          o.scheduledDate,
          `${o.startTime} - ${o.endTime}`,
          o.clientName,
          o.locationAddress,
          o.serviceType,
          o.assignedStaffNames.join(', '),
          o.status,
          o.billingValue,
        ]);

        await writeGoogleSheetValues(
          accessToken,
          sheet.spreadsheetId,
          'Ordens de Serviço!A1:I' + (rows.length + 1),
          [headers, ...rows]
        );

        setLastExportedUrl(sheet.spreadsheetUrl);
        notify({
          title: 'Planilha de Escala Criada',
          message: `Planilha "${title}" sincronizada no Google Sheets.`,
          type: 'financial',
        });
        addAuditLog('Exportação Google Sheets', 'Agenda', `Planilha ${title} gerada no Google Drive`);
      } else if (confirmModal.type === 'leads') {
        const title = `Ambientes Limpos - Leads & Prospecção (${now})`;
        const sheet = await createGoogleSpreadsheet(accessToken, title, 'Leads');

        const headers = [
          'Código',
          'Nome do Lead',
          'Telefone',
          'E-mail',
          'Origem',
          'Interesse',
          'Tipo de Imóvel',
          'Valor Estimado (R$)',
          'Estágio Funil',
          'Próxima Ação',
        ];

        const rows = leads.map((l) => [
          l.code,
          l.clientName,
          l.phone,
          l.email,
          l.source,
          l.serviceInterest,
          l.propertyType,
          l.estimatedValue,
          l.stage,
          l.nextAction,
        ]);

        await writeGoogleSheetValues(accessToken, sheet.spreadsheetId, 'Leads!A1:J' + (rows.length + 1), [
          headers,
          ...rows,
        ]);

        setLastExportedUrl(sheet.spreadsheetUrl);
        notify({
          title: 'Planilha de Leads Criada',
          message: `Planilha "${title}" sincronizada no Google Sheets.`,
          type: 'financial',
        });
        addAuditLog('Exportação Google Sheets', 'Leads', `Planilha ${title} gerada no Google Drive`);
      }

      // Refresh drive list
      loadSpreadsheets(accessToken);
    } catch (err: any) {
      console.error('Erro na exportação:', err);
      notify({
        title: 'Erro na Exportação',
        message: err.message || 'Falha ao comunicar com o Google Sheets.',
        type: 'warning',
      });
    } finally {
      setIsExporting(false);
      setConfirmModal({ ...confirmModal, isOpen: false });
    }
  };

  // Preview selected spreadsheet
  const handlePreviewSheet = async (sheetId: string, sheetName: string) => {
    if (!accessToken) return;
    setSelectedSheetId(sheetId);
    setSelectedSheetName(sheetName);
    setIsLoadingRows(true);

    try {
      // Read top 30 rows of the first sheet
      const rows = await readGoogleSheetValues(accessToken, sheetId, 'A1:Z35');
      setSheetRows(rows);
    } catch (err: any) {
      console.error('Erro ao ler planilha:', err);
      notify({
        title: 'Google Sheets',
        message: 'Não foi possível ler as linhas desta planilha.',
        type: 'warning',
      });
      setSheetRows([]);
    } finally {
      setIsLoadingRows(false);
    }
  };

  // Create custom blank sheet
  const handleCreateCustomSheet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken || !newSheetTitle.trim()) return;

    setIsCreatingCustom(true);
    try {
      const sheet = await createGoogleSpreadsheet(accessToken, newSheetTitle.trim(), 'Anotações');
      setLastExportedUrl(sheet.spreadsheetUrl);
      setNewSheetTitle('');
      notify({
        title: 'Planilha Criada',
        message: `Planilha "${newSheetTitle}" criada no Google Drive com sucesso.`,
        type: 'financial',
      });
      loadSpreadsheets(accessToken);
    } catch (err: any) {
      notify({
        title: 'Erro',
        message: err.message || 'Erro ao criar nova planilha.',
        type: 'warning',
      });
    } finally {
      setIsCreatingCustom(false);
    }
  };

  const filteredDriveSheets = driveSheets.filter((s) =>
    s.name.toLowerCase().includes(searchDriveQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0d2240] to-[#08182f] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-full bg-emerald-500/10 rounded-l-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold border border-emerald-500/30">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Integração Oficial Google Workspace</span>
            </div>
            <h1 className="text-2xl font-black text-white">Google Sheets & Google Drive</h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Sincronize clientes, contratos, faturamento e ordens de serviço diretamente com planilhas no Google Sheets. Acesse e visualize seus dados corporativos em tempo real com a permissão do usuário.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            {accessToken ? (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-sm">
                  {currentUser?.displayName ? currentUser.displayName[0].toUpperCase() : 'G'}
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Conectado ao Google</span>
                  </div>
                  <div className="text-[11px] text-slate-300 truncate max-w-[160px]">
                    {currentUser?.email || 'Conta Google'}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  title="Desconectar da conta Google"
                  className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSignIn}
                disabled={isAuthenticating}
                className="gsi-material-button bg-white text-slate-800 hover:bg-slate-50 font-bold px-5 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-3 cursor-pointer text-sm"
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                    <path fill="none" d="M0 0h48v48H0z" />
                  </svg>
                </div>
                <span>{isAuthenticating ? 'Conectando...' : 'Conectar com Google'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {authError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs flex items-center gap-3">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{authError}</span>
        </div>
      )}

      {lastExportedUrl && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-xs font-bold text-emerald-900">Planilha pronta no Google Sheets</p>
              <p className="text-[11px] text-emerald-700">Sua planilha foi gerada e está pronta para edição ou compartilhamento.</p>
            </div>
          </div>
          <a
            href={lastExportedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shrink-0 shadow-sm"
          >
            <span>Abrir Planilha</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* 4 Quick Export Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Exportação Rápida para Google Sheets</h2>
            <p className="text-xs text-slate-500">Gera uma planilha formatada no Google Drive com atualização de cabeçalhos e congelamento de linhas.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Clientes */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Base de Clientes</h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Exporta {clients.length} clientes com CNPJ/CPF, endereços, contatos e mensalidades.
              </p>
            </div>
            <button
              type="button"
              onClick={() => requestExport('clients')}
              className="w-full py-2.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar Clientes</span>
            </button>
          </div>

          {/* 2. Financeiro */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Fluxo Financeiro</h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Exporta {financialReceivables.length} títulos, faturas, valores, vencimentos e liquidações.
              </p>
            </div>
            <button
              type="button"
              onClick={() => requestExport('financial')}
              className="w-full py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar Financeiro</span>
            </button>
          </div>

          {/* 3. Ordens de Serviço */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Escala & Ordens (OS)</h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Exporta {serviceOrders.length} ordens de serviço com horários, equipes e checklists.
              </p>
            </div>
            <button
              type="button"
              onClick={() => requestExport('orders')}
              className="w-full py-2.5 px-3 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar Agenda</span>
            </button>
          </div>

          {/* 4. Leads Comerciais */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Leads & Prospecção</h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Exporta {leads.length} contatos comerciais com interesse, metragem e valores.
              </p>
            </div>
            <button
              type="button"
              onClick={() => requestExport('leads')}
              className="w-full py-2.5 px-3 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar Leads</span>
            </button>
          </div>
        </div>
      </div>

      {/* Drive Explorer & Live Preview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Google Drive Spreadsheets List */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold text-slate-900">Planilhas no seu Google Drive</h2>
            </div>
            {accessToken && (
              <button
                type="button"
                onClick={() => loadSpreadsheets(accessToken)}
                disabled={isLoadingSheets}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
                title="Recarregar planilhas"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingSheets ? 'animate-spin' : ''}`} />
              </button>
            )}
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Buscar planilhas no Drive..."
              value={searchDriveQuery}
              onChange={(e) => setSearchDriveQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          {/* Create custom sheet inline */}
          <form onSubmit={handleCreateCustomSheet} className="flex gap-2">
            <input
              type="text"
              placeholder="Nova planilha personalizada..."
              value={newSheetTitle}
              onChange={(e) => setNewSheetTitle(e.target.value)}
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
            <button
              type="submit"
              disabled={isCreatingCustom || !newSheetTitle.trim() || !accessToken}
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-1 shrink-0 shadow-sm"
              title="Criar nova planilha"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Criar</span>
            </button>
          </form>

          {/* List of sheets */}
          {!accessToken ? (
            <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <FileSpreadsheet className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-600 mb-1">Google Workspace não conectado</p>
              <p className="text-[11px] text-slate-400 mb-3">Conecte sua conta Google para listar e abrir suas planilhas.</p>
              <button
                type="button"
                onClick={handleSignIn}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Conectar Conta
              </button>
            </div>
          ) : isLoadingSheets ? (
            <div className="py-8 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
              <span>Buscando planilhas no Google Drive...</span>
            </div>
          ) : filteredDriveSheets.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-xl">
              Nenhuma planilha encontrada no Google Drive.
            </div>
          ) : (
            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {filteredDriveSheets.map((sheet) => {
                const isSelected = selectedSheetId === sheet.id;
                return (
                  <div
                    key={sheet.id}
                    className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 truncate" title={sheet.name}>
                        {sheet.name}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {sheet.modifiedTime ? new Date(sheet.modifiedTime).toLocaleDateString('pt-BR') : 'Google Sheets'}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handlePreviewSheet(sheet.id, sheet.name)}
                        className="p-1.5 text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
                        title="Visualizar dados na tela"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <a
                        href={`https://docs.google.com/spreadsheets/d/${sheet.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Abrir no Google Sheets (nova aba)"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Live Data Preview Viewer */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Table className="w-4 h-4 text-emerald-600" />
                <h2 className="text-sm font-bold text-slate-900">
                  {selectedSheetName ? `Visualização: ${selectedSheetName}` : 'Visualizador de Dados da Planilha'}
                </h2>
              </div>
              {selectedSheetId && (
                <a
                  href={`https://docs.google.com/spreadsheets/d/${selectedSheetId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1"
                >
                  <span>Abrir no Google Sheets</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {isLoadingRows ? (
              <div className="py-24 text-center text-xs text-slate-400 flex flex-col items-center justify-center gap-3">
                <RefreshCw className="w-6 h-6 animate-spin text-emerald-600" />
                <span>Carregando linhas da planilha do Google Sheets...</span>
              </div>
            ) : sheetRows.length > 0 ? (
              <div className="border border-slate-200 rounded-xl overflow-x-auto max-h-[360px] overflow-y-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700 sticky top-0">
                      {sheetRows[0]?.map((col: any, idx: number) => (
                        <th key={idx} className="p-2.5 border-r border-slate-200 whitespace-nowrap">
                          {col || `Coluna ${idx + 1}`}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sheetRows.slice(1).map((row: any[], rIdx: number) => (
                      <tr key={rIdx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        {sheetRows[0]?.map((_: any, cIdx: number) => (
                          <td key={cIdx} className="p-2.5 border-r border-slate-100 whitespace-nowrap text-slate-600">
                            {row[cIdx] !== undefined && row[cIdx] !== null ? String(row[cIdx]) : '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-24 text-center text-xs text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <FileSpreadsheet className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="font-bold text-slate-600 mb-1">Nenhuma planilha selecionada</p>
                <p className="text-slate-400 max-w-sm mx-auto">
                  Clique no ícone de visualização (<Eye className="w-3 h-3 inline mx-1" />) ao lado de qualquer planilha da lista ao lado para carregar e inspecionar suas linhas diretamente nesta tela.
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Conexão direta com Google Sheets API v4 e Drive API v3</span>
            <span>Permissões: drive.file, spreadsheets, drive.readonly</span>
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Destructive/Write operations as required by SKILL.md */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        description={confirmModal.description}
        affectedSummary={confirmModal.affectedSummary}
        onConfirm={executeExport}
        onCancel={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        isLoading={isExporting}
      />
    </div>
  );
};
