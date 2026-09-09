import React, { useState } from 'react';
import { useAdmin } from './context/AdminContext';
import { AdminSidebar } from './components/AdminSidebar';
import { AdminTopbar } from './components/AdminTopbar';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { LoginScreen } from './components/LoginScreen';

// Views
import { DashboardView } from './components/views/DashboardView';
import { AgendaView } from './components/views/AgendaView';
import { ExecutionModeView } from './components/views/ExecutionModeView';
import { LeadsView } from './components/views/LeadsView';
import { ClientsView } from './components/views/ClientsView';
import { QuotesView } from './components/views/QuotesView';
import { ContractsView } from './components/views/ContractsView';
import { ServicesOSView } from './components/views/ServicesOSView';
import { TeamsStaffView } from './components/views/TeamsStaffView';
import { QualityView } from './components/views/QualityView';
import { FinancialView } from './components/views/FinancialView';
import { DocumentsRestrictedView } from './components/views/DocumentsRestrictedView';
import { ReportsView } from './components/views/ReportsView';
import { CommunicationView } from './components/views/CommunicationView';
import { NotificationsView } from './components/views/NotificationsView';
import { AuditView } from './components/views/AuditView';
import { SettingsView } from './components/views/SettingsView';
import { GoogleSheetsView } from './components/views/GoogleSheetsView';

interface AdminLayoutProps {
  onBackToSite: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onBackToSite }) => {
  const { currentUser, activeModule } = useAdmin();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If not logged in, render the login authentication screen
  if (!currentUser.isAuthenticated) {
    return <LoginScreen onBackToSite={onBackToSite} />;
  }

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardView />;
      case 'agenda':
        return <AgendaView />;
      case 'execution':
        return <ExecutionModeView />;
      case 'leads':
        return <LeadsView />;
      case 'clients':
        return <ClientsView />;
      case 'quotes':
        return <QuotesView />;
      case 'contracts':
        return <ContractsView />;
      case 'services':
        return <ServicesOSView />;
      case 'teams':
      case 'staff':
        return <TeamsStaffView />;
      case 'quality':
        return <QualityView />;
      case 'financial':
        return <FinancialView />;
      case 'documents':
        return <DocumentsRestrictedView />;
      case 'reports':
        return <ReportsView />;
      case 'sheets':
        return <GoogleSheetsView />;
      case 'communication':
        return <CommunicationView />;
      case 'notifications':
        return <NotificationsView />;
      case 'audit':
        return <AuditView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      {/* Global Search Modal (Ctrl + K) */}
      <GlobalSearchModal />

      {/* Sidebar for Desktop & Drawer for Mobile */}
      <AdminSidebar
        onBackToSite={onBackToSite}
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area (Offset by sidebar width on desktop) */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        {/* Topbar */}
        <AdminTopbar
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onBackToSite={onBackToSite}
        />

        {/* Dynamic View Page Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderActiveModule()}
        </main>
      </div>
    </div>
  );
};
