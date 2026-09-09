import React, { useState } from 'react';
import { Award, CheckCircle2, AlertTriangle, Camera, Star, Users2, Plus } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const QualityView: React.FC = () => {
  const { teams, staff } = useAdmin();

  const inspections = [
    {
      id: 'insp-1',
      date: '08/09/2026',
      client: 'Condomínio Residencial Jardins',
      team: 'Equipe Alpha (Alfa)',
      supervisor: 'Juliana Mendes (Supervisão)',
      score: 98,
      status: 'Aprovado sem ressalvas',
      itemsChecked: 24,
      notes: 'Sanitização dos halls impecável. Produtos e EPIs devidamente utilizados.',
    },
    {
      id: 'insp-2',
      date: '06/09/2026',
      client: 'TechCorp Soluções Digitais',
      team: 'Equipe Beta (Comercial)',
      supervisor: 'Juliana Mendes (Supervisão)',
      score: 95,
      status: 'Aprovado',
      itemsChecked: 32,
      notes: 'Excelente alinhamento nas salas de reunião. Vidros sem marcas.',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-black text-slate-900">
            Controle de Qualidade, Vistorias & Auditoria Técnica
          </h2>
          <p className="text-xs text-slate-600">
            Acompanhamento presencial de supervisão com score de conformidade e auditoria de EPIs.
          </p>
        </div>

        <button
          onClick={() => alert('Formulário de vistoria presencial pronto para coleta via tablet/celular.')}
          className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Nova Vistoria de Campo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {inspections.map((insp) => (
          <div
            key={insp.id}
            className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded font-mono">
                {insp.date}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800">
                Score: {insp.score}%
              </span>
            </div>

            <div>
              <h3 className="font-extrabold text-sm text-slate-900">{insp.client}</h3>
              <div className="text-xs text-slate-600 mt-0.5">
                {insp.team} &bull; Auditor: {insp.supervisor}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
              <strong className="block text-[10px] uppercase font-bold text-slate-500 mb-0.5">
                Parecer Técnico da Supervisão:
              </strong>
              {insp.notes}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span>{insp.itemsChecked} pontos de controle vistoriados</span>
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Homologado
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
