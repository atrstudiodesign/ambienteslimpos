import React, { useState } from 'react';
import { Lock, Mail, KeyRound, ArrowRight, ShieldCheck, HelpCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { AmbientesLimposLogo } from '../../components/AmbientesLimposLogo';
import { useAdmin } from '../context/AdminContext';
import { BRAND_CONFIG } from '../../config/brandConfig';

interface LoginScreenProps {
  onBackToSite: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onBackToSite }) => {
  const { loginWithEmail } = useAdmin();
  const [email, setEmail] = useState('agtramposof@gmail.com');
  const [password, setPassword] = useState('••••••••');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const res = loginWithEmail(email, password);
      setLoading(false);
      if (!res.success) {
        setError(res.message);
      }
    }, 400);
  };

  const handleQuickLogin = (emailAddress: string) => {
    setEmail(emailAddress);
    loginWithEmail(emailAddress, '123456');
  };

  return (
    <div className="min-h-screen bg-[#08182f] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Back to Public Site Link */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 mb-4">
        <button
          onClick={onBackToSite}
          className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar para o site institucional</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <AmbientesLimposLogo variant="light" size="lg" showSlogan={false} />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Bem-vindo de volta.
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Centro de Gestão Operacional &bull; Ambientes Limpos
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-[#0b1d3a] py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-slate-800 relative z-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-rose-950/50 border border-rose-800 rounded-xl text-rose-300 text-xs font-semibold">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                E-mail Corporativo
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@empresa.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Acesso de administrador validado por e-mail (ex: agtramposof@gmail.com).
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Senha de Acesso
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-0 bg-slate-900"
                />
                <span>Lembrar acesso</span>
              </label>

              <button
                type="button"
                onClick={() => alert('Para redefinição de senha, solicite à administração ou assessoria ATR Studio.')}
                className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors cursor-pointer"
              >
                Esqueci minha senha
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'Validando Acesso...' : 'Entrar no Painel'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Profiles Shortcuts for Testing */}
          <div className="mt-6 pt-5 border-t border-slate-800">
            <p className="text-[10px] uppercase font-black tracking-wider text-slate-400 text-center mb-2.5">
              Acesso Rápido por Perfil (Homologação)
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => handleQuickLogin('agtramposof@gmail.com')}
                className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border border-slate-800 hover:border-cyan-500/50 text-left transition-colors cursor-pointer"
              >
                <div className="font-extrabold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin Geral</span>
                </div>
                <div className="text-[10px] text-slate-400 truncate">agtramposof@gmail.com</div>
              </button>

              <button
                onClick={() => handleQuickLogin('assessoria@ambienteslimpos.com.br')}
                className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 text-left transition-colors cursor-pointer"
              >
                <div className="font-extrabold">Assessoria ATR</div>
                <div className="text-[10px] text-slate-400 truncate">assessoria@ambientes...</div>
              </button>

              <button
                onClick={() => handleQuickLogin('atendimento@ambienteslimpos.com.br')}
                className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 text-left transition-colors cursor-pointer"
              >
                <div className="font-extrabold">Atendimento</div>
                <div className="text-[10px] text-slate-400 truncate">atendimento@ambientes...</div>
              </button>

              <button
                onClick={() => handleQuickLogin('maria.silva@ambienteslimpos.com.br')}
                className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-emerald-300 border border-slate-800 hover:border-emerald-500/50 text-left transition-colors cursor-pointer"
              >
                <div className="font-extrabold">Colaboradora</div>
                <div className="text-[10px] text-slate-400 truncate">maria.silva@ambientes...</div>
              </button>
            </div>
          </div>

          {/* Support Info */}
          <div className="mt-6 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            <span>Suporte Técnico:</span>
            <span className="font-mono text-cyan-400">{BRAND_CONFIG.contacts.assessoria}</span>
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] text-slate-500">
          Ambientes Limpos &bull; Assessoria ATR Studio &bull; CNPJ {BRAND_CONFIG.contacts.cnpj}
        </p>
      </div>
    </div>
  );
};
