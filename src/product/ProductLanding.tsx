import React, { useEffect } from 'react';
import {
  ArrowRight, BadgeCheck, BarChart3, BriefcaseBusiness, CheckCircle2, ClipboardCheck,
  FileSignature, LayoutDashboard, LockKeyhole, MessageCircle, ShieldCheck, Sparkles,
  UsersRound, WalletCards, Wrench, X
} from 'lucide-react';

interface ProductLandingProps {
  onOpenDemo: () => void;
  onBackToSite: () => void;
}

const features = [
  { icon: LayoutDashboard, title: 'Dashboard operacional', text: 'Visão central de leads, clientes, serviços, alertas e operação.' },
  { icon: UsersRound, title: 'CRM e clientes', text: 'Organize oportunidades, histórico de atendimento e evolução comercial.' },
  { icon: FileSignature, title: 'Orçamentos e contratos', text: 'Fluxo comercial integrado da proposta ao contrato e execução.' },
  { icon: Wrench, title: 'Ordens de serviço', text: 'Acompanhe execução, equipes, status e checklists operacionais.' },
  { icon: ClipboardCheck, title: 'Qualidade', text: 'Vistorias, supervisão e controle de padrão por serviço e equipe.' },
  { icon: WalletCards, title: 'Financeiro', text: 'Recebíveis, despesas e visão financeira conforme o perfil autorizado.' },
  { icon: BarChart3, title: 'Relatórios', text: 'Indicadores para acompanhamento administrativo e tomada de decisão.' },
  { icon: ShieldCheck, title: 'RBAC por perfil', text: 'Cada usuário visualiza somente os módulos compatíveis com sua função.' },
];

const roles = [
  ['Super Admin', 'Gestão integral do ambiente e das permissões.'],
  ['Assessoria', 'Contratos, governança, financeiro, documentos e relatórios.'],
  ['Atendimento / CRM', 'Leads, clientes, agenda, orçamentos e comunicação.'],
  ['Supervisão', 'Serviços, qualidade, equipes, colaboradores e relatórios.'],
  ['Colaborador', 'Visão operacional focada na execução do serviço.'],
];

export function ProductLanding({ onOpenDemo, onBackToSite }: ProductLandingProps) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Sistema de Gestão para Empresas de Limpeza | ATR Studio';
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white antialiased">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <button onClick={onBackToSite} className="text-left">
            <div className="text-sm font-black tracking-tight">ATR STUDIO</div>
            <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-400">Software para operações de limpeza</div>
          </button>
          <div className="flex items-center gap-2">
            <button onClick={onBackToSite} className="hidden rounded-xl px-4 py-2 text-xs font-bold text-slate-300 hover:bg-white/5 sm:block">Ambientes Limpos</button>
            <button onClick={onOpenDemo} className="rounded-xl bg-cyan-500 px-4 py-2.5 text-xs font-black text-slate-950 hover:bg-cyan-400">
              Testar demonstração
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_70%_20%,rgba(6,182,212,.28),transparent_35%),radial-gradient(circle_at_20%_60%,rgba(14,116,144,.18),transparent_35%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-20 lg:grid-cols-[1.08fr_.92fr] lg:px-8 lg:py-28">
            <div className="flex flex-col justify-center">
              <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-cyan-300">
                <Sparkles className="h-3.5 w-3.5" /> Gestão criada a partir de uma operação real
              </div>
              <h1 className="max-w-4xl text-4xl font-black leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
                Sua empresa de limpeza inteira em <span className="text-cyan-400">um só painel.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                CRM, propostas, contratos, ordens de serviço, equipes, qualidade, financeiro e permissões por usuário — organizados para reduzir improviso e dar controle à operação.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button onClick={onOpenDemo} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-6 py-3.5 text-sm font-black text-slate-950 hover:bg-cyan-400">
                  Explorar o sistema em modo demo <ArrowRight className="h-4 w-4" />
                </button>
                <a href="#recursos" className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/5">
                  Ver recursos
                </a>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-slate-400">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-cyan-400" /> Demo isolado</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-cyan-400" /> Perfis RBAC</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-cyan-400" /> Ambiente real protegido</span>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-3 shadow-2xl shadow-cyan-950/40">
                <div className="rounded-[1.5rem] border border-white/10 bg-slate-900 p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-wider text-cyan-400">Painel de gestão</div>
                      <div className="mt-1 text-lg font-black">Controle operacional</div>
                    </div>
                    <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-black text-emerald-300">DEMO ATIVO</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      ['Leads / CRM', 'Atendimento'], ['Contratos', 'Governança'],
                      ['Ordens de Serviço', 'Operação'], ['Qualidade', 'Supervisão'],
                      ['Equipes', 'Escala'], ['Financeiro', 'Gestão']
                    ].map(([name, desc]) => (
                      <div key={name} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                        <div className="text-xs font-black">{name}</div>
                        <div className="mt-1 text-[10px] text-slate-500">{desc}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
                    <div className="flex items-center gap-2 text-xs font-black text-cyan-200"><LockKeyhole className="h-4 w-4" /> Controle de acesso por função</div>
                    <p className="mt-1.5 text-[11px] leading-5 text-slate-400">Simule perfis no ambiente demonstrativo sem misturar os dados do ambiente real.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="recursos" className="border-y border-white/10 bg-white/[0.025] py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-3xl">
              <div className="text-xs font-black uppercase tracking-[0.22em] text-cyan-400">Do comercial à execução</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Menos ferramentas soltas. Mais processo.</h2>
              <p className="mt-4 text-sm leading-6 text-slate-400">A estrutura conecta as áreas que normalmente ficam espalhadas entre mensagens, planilhas e controles separados.</p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400"><Icon className="h-5 w-5" /></div>
                  <h3 className="text-sm font-black">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-8">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.22em] text-cyan-400">Permissões por usuário</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight">Cada pessoa vê o que precisa para trabalhar.</h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">O RBAC organiza a experiência por função. No modo Demo, os perfis podem ser simulados para demonstrar o produto. No modo Real, a troca arbitrária de perfil fica bloqueada.</p>
              <button onClick={onOpenDemo} className="mt-7 inline-flex items-center gap-2 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 text-xs font-black text-cyan-200 hover:bg-cyan-400/15">
                Simular perfis agora <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2">
              {roles.map(([role, desc]) => (
                <div key={role} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
                  <div><div className="text-sm font-black">{role}</div><div className="mt-1 text-xs text-slate-400">{desc}</div></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-cyan-400 text-slate-950">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.2em]">Veja antes de contratar</div>
                <h2 className="mt-2 text-3xl font-black tracking-tight">Abra o painel, troque os perfis e conheça o fluxo.</h2>
                <p className="mt-3 max-w-2xl text-sm font-semibold text-slate-800">A demonstração usa dados próprios e permanece separada do ambiente real.</p>
              </div>
              <button onClick={onOpenDemo} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-black text-white hover:bg-slate-900">
                Abrir demonstração <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-5xl px-5 text-center lg:px-8">
            <BriefcaseBusiness className="mx-auto h-9 w-9 text-cyan-400" />
            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">Quer levar essa estrutura para sua operação?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400">Projeto desenvolvido pela ATR Studio para digitalizar rotinas comerciais, administrativas e operacionais de empresas de serviços.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="https://wa.me/5511939026928?text=Quero%20conhecer%20o%20sistema%20de%20gest%C3%A3o%20para%20empresas%20de%20limpeza" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3.5 text-sm font-black text-slate-950 hover:bg-emerald-400">
                <MessageCircle className="h-4 w-4" /> Falar com a ATR Studio
              </a>
              <button onClick={onOpenDemo} className="rounded-2xl border border-white/15 px-6 py-3.5 text-sm font-black hover:bg-white/5">Testar o painel</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <span>Produto digital desenvolvido por ATR Studio.</span>
          <button onClick={onBackToSite} className="text-left font-bold text-slate-400 hover:text-white">Voltar para Ambientes Limpos</button>
        </div>
      </footer>
    </div>
  );
}
