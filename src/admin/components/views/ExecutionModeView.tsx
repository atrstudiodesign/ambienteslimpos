import React, { useState } from 'react';
import {
  Smartphone,
  MapPin,
  Clock,
  Play,
  Check,
  Camera,
  Navigation,
  CheckCircle2,
  AlertCircle,
  PenTool,
  Upload,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { BRAND_CONFIG } from '../../../config/brandConfig';

export const ExecutionModeView: React.FC = () => {
  const {
    serviceOrders,
    startServiceOrder,
    completeServiceOrder,
    toggleChecklistItem,
  } = useAdmin();

  // Find the active or next service for today
  const currentService =
    serviceOrders.find((o) => o.status === 'Em andamento') ||
    serviceOrders.find((o) => o.status === 'Confirmado') ||
    serviceOrders[0];

  const [notes, setNotes] = useState('');
  const [signatureName, setSignatureName] = useState('');
  const [isSigned, setIsSigned] = useState(false);
  const [photoCount, setPhotoCount] = useState(2);
  const [isFinishedSuccess, setIsFinishedSuccess] = useState(false);

  if (!currentService) {
    return (
      <div className="max-w-md mx-auto py-12 text-center text-slate-500 text-xs">
        Nenhum serviço programado para execução no momento.
      </div>
    );
  }

  const completedChecklistCount = currentService.checklist.filter((c) => c.done).length;
  const totalChecklistCount = currentService.checklist.length;
  const progressPercent = Math.round((completedChecklistCount / totalChecklistCount) * 100);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    currentService.locationAddress
  )}`;
  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(currentService.locationAddress)}`;

  const handleFinish = () => {
    if (!isSigned) {
      alert('Por favor, solicite ao cliente a confirmação da assinatura antes de finalizar.');
      return;
    }
    completeServiceOrder(currentService.id, notes || 'Serviço concluído com êxito e checklist assinado.');
    setIsFinishedSuccess(true);
  };

  return (
    <div className="max-w-xl mx-auto space-y-5 animate-in fade-in duration-200">
      {/* Mobile Top Header Card */}
      <div className="bg-[#0a1e38] text-white p-5 rounded-3xl border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-black uppercase tracking-wider text-cyan-400">
              Modo Operação em Campo
            </span>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-900/60 text-cyan-300 border border-cyan-700">
            {currentService.status}
          </span>
        </div>

        <div>
          <h2 className="text-xl font-black">{currentService.clientName}</h2>
          <div className="text-xs text-amber-400 font-semibold mt-0.5">
            {currentService.serviceType} &bull; {currentService.osNumber}
          </div>
        </div>

        {/* Time and Address */}
        <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="font-mono font-bold">
              {currentService.scheduledDate} das {currentService.startTime} às {currentService.endTime}
            </span>
          </div>

          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span className="leading-snug">{currentService.locationAddress}</span>
          </div>
        </div>

        {/* Navigation GPS Buttons (Google Maps & Waze) */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Navigation className="w-3.5 h-3.5 text-cyan-400" />
            <span>Google Maps</span>
          </a>
          <a
            href={wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Navigation className="w-3.5 h-3.5 text-cyan-400" />
            <span>Abrir no Waze</span>
          </a>
        </div>
      </div>

      {/* Main Execution Actions */}
      {currentService.status === 'Confirmado' && (
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs text-center space-y-3">
          <h3 className="text-sm font-black text-slate-900">Iniciar Atendimento no Local</h3>
          <p className="text-xs text-slate-500">
            Ao clicar em iniciar, o cronômetro do serviço começa e a central é notificada da chegada da equipe.
          </p>
          <button
            onClick={() => startServiceOrder(currentService.id)}
            className="w-full py-3.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-cyan-600/30 flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
          >
            <Play className="w-4 h-4" />
            <span>Cheguei no Local • Iniciar Serviço</span>
          </button>
        </div>
      )}

      {/* Interactive Checklist by Room */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">
              Checklist de Execução
            </h3>
            <p className="text-xs text-slate-500">Toque no item após concluir a limpeza.</p>
          </div>
          <span className="text-xs font-black text-cyan-700 font-mono">
            {progressPercent}% Concluído
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-cyan-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* List of Tasks */}
        <div className="space-y-2">
          {currentService.checklist.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleChecklistItem(currentService.id, item.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                item.done
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => {}}
                  className="w-4 h-4 rounded text-cyan-600 focus:ring-0 cursor-pointer"
                />
                <div>
                  <div className="text-xs leading-tight">{item.task}</div>
                  <div className="text-[10px] text-slate-500 uppercase font-mono mt-0.5">
                    {item.area}
                  </div>
                </div>
              </div>
              {item.done && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      {/* Before & After Photo Proof */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <Camera className="w-4 h-4 text-cyan-600" />
            <span>Fotos Antes / Depois</span>
          </h3>
          <span className="text-xs text-slate-500 font-mono">{photoCount} fotos anexadas</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-cyan-50">
            <Camera className="w-5 h-5 text-slate-400" />
            <span className="text-[10px] font-bold text-slate-600">Foto Antes</span>
          </div>

          <div className="p-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-cyan-50">
            <Camera className="w-5 h-5 text-slate-400" />
            <span className="text-[10px] font-bold text-slate-600">Foto Depois</span>
          </div>

          <button
            onClick={() => setPhotoCount((prev) => prev + 1)}
            className="p-3 rounded-2xl bg-cyan-50 border border-cyan-200 text-cyan-800 font-bold flex flex-col items-center justify-center gap-1 hover:bg-cyan-100 transition-colors"
          >
            <Upload className="w-4 h-4 text-cyan-600" />
            <span className="text-[10px]">Anexar Foto</span>
          </button>
        </div>
      </div>

      {/* Observations */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
        <h3 className="font-extrabold text-sm text-slate-900">Observações Operacionais</h3>
        <textarea
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Ex: Cliente solicitou atenção especial na sala de reuniões. Tudo higienizado com produto neutro."
          className="w-full p-3 rounded-2xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-cyan-500"
        />
      </div>

      {/* Digital Client Sign-Off */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <PenTool className="w-4 h-4 text-cyan-600" />
            <span>Assinatura Digital do Responsável</span>
          </h3>
          {isSigned && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Assinado
            </span>
          )}
        </div>

        <p className="text-xs text-slate-500">
          Peça para a pessoa responsável no local conferir e validar a entrega do serviço.
        </p>

        {!isSigned ? (
          <div className="space-y-3">
            <input
              type="text"
              value={signatureName}
              onChange={(e) => setSignatureName(e.target.value)}
              placeholder="Nome legível do responsável no local"
              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold"
            />
            <div className="h-24 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-xs text-slate-400 font-handwriting">
              [ Área de assinatura digital no celular ]
            </div>
            <button
              onClick={() => {
                if (!signatureName) {
                  alert('Digite o nome do responsável.');
                  return;
                }
                setIsSigned(true);
              }}
              className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer"
            >
              Coletar Assinatura
            </button>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between">
            <div>
              <span className="font-bold block">Assinatura Coletada</span>
              <span className="text-[11px] text-emerald-700">Responsável: {signatureName}</span>
            </div>
            <button
              onClick={() => setIsSigned(false)}
              className="text-[10px] text-slate-500 underline"
            >
              Refazer
            </button>
          </div>
        )}
      </div>

      {/* Completion Button */}
      {currentService.status !== 'Concluído' && (
        <button
          onClick={handleFinish}
          className="w-full py-4 rounded-3xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
        >
          <Check className="w-5 h-5" />
          <span>Finalizar Atendimento & Enviar Comprovante</span>
        </button>
      )}

      {isFinishedSuccess && (
        <div className="p-4 rounded-3xl bg-emerald-600 text-white text-center space-y-2 shadow-xl animate-in zoom-in-95">
          <CheckCircle2 className="w-8 h-8 mx-auto" />
          <h4 className="font-black text-base">Atendimento Finalizado com Sucesso!</h4>
          <p className="text-xs text-emerald-100">
            A central de operações e o cliente foram sincronizados com o checklist completo.
          </p>
        </div>
      )}
    </div>
  );
};
