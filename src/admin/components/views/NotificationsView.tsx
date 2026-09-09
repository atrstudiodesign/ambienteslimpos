import React from 'react';
import { Bell, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const NotificationsView: React.FC = () => {
  const {
    notifications,
    markAllNotificationsAsRead,
    setActiveModule,
  } = useAdmin();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-black text-slate-900">
            Central de Notificações & Eventos do Sistema
          </h2>
          <p className="text-xs text-slate-600">
            Acompanhe avisos de contratos a vencer, faturas, início de serviços e solicitações.
          </p>
        </div>

        <button
          onClick={markAllNotificationsAsRead}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
        >
          Marcar todas como lidas
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => {
              if (n.targetModule) setActiveModule(n.targetModule);
            }}
            className={`p-5 flex items-start justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer ${
              !n.isRead ? 'bg-cyan-50/30' : ''
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 ${
                  n.type === 'alert'
                    ? 'bg-amber-100 text-amber-700'
                    : n.type === 'warning'
                    ? 'bg-rose-100 text-rose-700'
                    : 'bg-cyan-100 text-cyan-700'
                }`}
              >
                <Bell className="w-4 h-4" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm text-slate-900">{n.title}</h4>
                  {!n.isRead && (
                    <span className="w-2 h-2 rounded-full bg-cyan-600" title="Não lida" />
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-2xl">{n.message}</p>
                <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                  {n.timestamp}
                </span>
              </div>
            </div>

            {n.targetModule && (
              <span className="text-xs font-bold text-cyan-700 hover:text-cyan-800 flex items-center gap-1 shrink-0 mt-1">
                <span>Ver Módulo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
