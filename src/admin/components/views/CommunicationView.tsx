import React, { useState } from 'react';
import {
  MessageSquare,
  ExternalLink,
  Copy,
  Check,
  Send,
  Sparkles,
  Users,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { BRAND_CONFIG } from '../../../config/brandConfig';

export const CommunicationView: React.FC = () => {
  const { clients, quotes, contracts } = useAdmin();
  const [selectedClientId, setSelectedClientId] = useState(clients[0]?.id || '');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const selectedClient = clients.find((c) => c.id === selectedClientId) || clients[0];

  const templates = [
    {
      id: 'orcamento',
      title: '1. Orçamento Enviado',
      desc: 'Para envio de proposta comercial após alinhamento de escopo.',
      generateText: (clientName: string) =>
        `Olá, ${clientName}! Tudo bem? Aqui é da equipe Ambientes Limpos. Conforme conversamos, acabamos de preparar a sua proposta personalizada de limpeza técnica. Você pode conferir os detalhes e o checklist de escopo. Ficamos à disposição para tirar qualquer dúvida!`,
    },
    {
      id: 'lembrete-amanha',
      title: '2. Lembrete de Serviço Amanhã',
      desc: 'Notificação preventiva 24h antes do início da diária.',
      generateText: (clientName: string) =>
        `Olá, ${clientName}! Passando para confirmar o nosso atendimento de limpeza profissional agendado para amanhã. Nossa equipe devidamente uniformizada e com todos os saneantes e EPIs chegará no horário programado. Até amanhã!`,
    },
    {
      id: 'equipe-caminho',
      title: '3. Equipe a Caminho',
      desc: 'Aviso imediato de deslocamento.',
      generateText: (clientName: string) =>
        `Olá, ${clientName}! A equipe operacional da Ambientes Limpos já está a caminho do seu endereço. Previsão de chegada nos próximos minutos. Qualquer instrução sobre portaria, pode nos avisar por aqui.`,
    },
    {
      id: 'servico-concluido',
      title: '4. Serviço Concluído & Checklist',
      desc: 'Entrega técnica da limpeza.',
      generateText: (clientName: string) =>
        `Olá, ${clientName}! O atendimento de limpeza no seu imóvel foi concluído com sucesso. Todos os cômodos foram higienizados conforme o nosso rigoroso padrão de qualidade. Agradecemos a confiança em nossos serviços!`,
    },
    {
      id: 'pesquisa-satisfacao',
      title: '5. Pesquisa de Satisfação (NPS)',
      desc: 'Coleta de avaliação da qualidade.',
      generateText: (clientName: string) =>
        `Olá, ${clientName}! Sua opinião é fundamental para a Ambientes Limpos. Como você avalia o serviço executado pela nossa equipe hoje (de 1 a 5 estrelas)? Se tiver qualquer observação ou sugestão, adoraríamos ouvir!`,
    },
    {
      id: 'cobranca-vencimento',
      title: '6. Cobrança de Vencimento / Fatura',
      desc: 'Lembrete discreto no dia do vencimento da mensalidade.',
      generateText: (clientName: string) =>
        `Olá, ${clientName}! Esperamos que esteja tudo bem. Segue o lembrete de vencimento da fatura mensal referente aos serviços de limpeza profissional deste mês. A chave PIX ou boleto segue anexa para seu conforto. Obrigado pela parceria!`,
    },
    {
      id: 'renovacao-contrato',
      title: '7. Renovação Contratual Anual',
      desc: 'Comunicação para contratos a vencer em 30 dias.',
      generateText: (clientName: string) =>
        `Prezado(a) ${clientName}, informamos que o seu contrato de prestação contínua de serviços de limpeza com a Ambientes Limpos está próximo da data de renovação anual. Gostaríamos de apresentar o balanço operacional do período e confirmar a continuidade da nossa parceria de sucesso.`,
    },
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenWhatsApp = (text: string) => {
    const rawPhone = selectedClient?.phone?.replace(/\D/g, '') || '5511939026928';
    const targetPhone = rawPhone.startsWith('55') ? rawPhone : `55${rawPhone}`;
    const url = `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-black text-slate-900">
            Modelos de Comunicação Prontos para WhatsApp
          </h2>
          <p className="text-xs text-slate-600">
            Mensagens oficiais padronizadas para cada etapa da jornada do cliente.
          </p>
        </div>

        {/* Client Selector */}
        <div className="flex items-center gap-2 text-xs">
          <Users className="w-4 h-4 text-cyan-600" />
          <span className="font-bold text-slate-700">Cliente Destinatário:</span>
          <select
            value={selectedClientId}
            onChange={(e) => setSelectedClientId(e.target.value)}
            className="p-2 rounded-xl border border-slate-300 bg-white font-medium text-slate-900 outline-none"
          >
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.phone})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((tpl) => {
          const messageText = tpl.generateText(selectedClient?.name || 'Cliente');

          return (
            <div
              key={tpl.id}
              className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:border-cyan-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-slate-900">{tpl.title}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    WhatsApp
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">{tpl.desc}</p>

                {/* Message Box */}
                <div className="mt-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed font-sans select-all">
                  {messageText}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => handleCopy(tpl.id, messageText)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedId === tpl.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copiar Texto</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleOpenWhatsApp(messageText)}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar no WhatsApp</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
