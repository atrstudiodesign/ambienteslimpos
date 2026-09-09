import React, { useState } from 'react';
import {
  Lock,
  FileText,
  ShieldCheck,
  AlertTriangle,
  Printer,
  Download,
  BookOpen,
  CheckCircle2,
  FileCheck2,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { BRAND_CONFIG } from '../../../config/brandConfig';

export const DocumentsRestrictedView: React.FC = () => {
  const { canAccessRestrictedDocs, currentUser, switchUserRole } = useAdmin();
  const [selectedDoc, setSelectedDoc] = useState<'contrato-padrao' | 'manual-colaborador' | 'termo-confidencialidade'>('manual-colaborador');

  if (!canAccessRestrictedDocs) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 animate-in fade-in duration-200">
        <div className="bg-[#0b1d3a] rounded-3xl p-8 sm:p-10 border border-slate-800 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-3xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[10px] uppercase font-black tracking-widest text-amber-400 bg-amber-950/70 border border-amber-800/60 px-3 py-1 rounded-full">
              Área Restrita &bull; Acesso Protegido
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-3">
              Documentos Confidenciais da Administração
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed max-w-lg mx-auto">
              O contrato padrão e o manual do colaborador possuem cláusulas confidenciais e normas internas da empresa, com acesso restrito e validado exclusivamente para o administrador geral.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 max-w-md mx-auto text-left space-y-1.5 font-mono">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
              Credencial Exigida:
            </div>
            <div className="text-amber-400 font-bold">E-mail: agtramposof@gmail.com</div>
            <div className="text-slate-400 text-[11px]">
              Usuário atual: {currentUser.name} ({currentUser.email} - {currentUser.role})
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => switchUserRole('SUPER_ADMIN')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer"
            >
              Autenticar como Admin Geral (agtramposof@gmail.com)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner with Admin Validation Badge */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              Central Documental & Jurídica Confidencial
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Acesso Autorizado: {currentUser.email}</span>
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            Minutas completas do Contrato de Prestação de Serviços e Manual de Conduta do Colaborador.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Printer className="w-4 h-4" />
          <span>Imprimir Documento</span>
        </button>
      </div>

      {/* Document Selection Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-3 flex-wrap">
        <button
          onClick={() => setSelectedDoc('manual-colaborador')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            selectedDoc === 'manual-colaborador'
              ? 'bg-[#0a1e38] text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span>Manual do Colaborador Operacional</span>
        </button>

        <button
          onClick={() => setSelectedDoc('contrato-padrao')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            selectedDoc === 'contrato-padrao'
              ? 'bg-[#0a1e38] text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <FileCheck2 className="w-4 h-4 text-cyan-400" />
          <span>Contrato Oficial de Prestação de Serviços</span>
        </button>

        <button
          onClick={() => setSelectedDoc('termo-confidencialidade')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            selectedDoc === 'termo-confidencialidade'
              ? 'bg-[#0a1e38] text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Termo de Confidencialidade & Vistoria</span>
        </button>
      </div>

      {/* Document Content Paper View */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm max-w-4xl mx-auto space-y-8 text-slate-800 text-xs sm:text-sm leading-relaxed print:m-0 print:border-none print:shadow-none">
        {selectedDoc === 'manual-colaborador' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center pb-6 border-b border-slate-200">
              <span className="text-[10px] uppercase font-black tracking-widest text-cyan-700 bg-cyan-50 px-3 py-1 rounded">
                DOCUMENTO INTERNO CONFIDENCIAL &bull; AMBIENTES LIMPOS
              </span>
              <h1 className="text-2xl font-black text-slate-900 mt-3">
                MANUAL OPERACIONAL E CÓDIGO DE CONDUTA DO COLABORADOR
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Diretrizes de Excelência, Higienização Técnica, Segurança e Postura Profissional
              </p>
            </div>

            {/* Section 1 */}
            <div className="space-y-2">
              <h3 className="text-base font-black text-slate-900">
                1. APRESENTAÇÃO & MISSÃO DA EMPRESA
              </h3>
              <p className="text-slate-700">
                A <strong>AMBIENTES LIMPOS</strong> tem como compromisso transformar espaços através de limpeza técnica, hospitalidade, rigor nos detalhes e discrição absoluta. Cada colaborador representa a imagem de solidez e confiança construída junto aos nossos clientes residenciais e corporativos.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-2">
              <h3 className="text-base font-black text-slate-900">
                2. UNIFORME, APRESENTAÇÃO PESSOAL E EPIs OBRIGATÓRIOS
              </h3>
              <ul className="list-disc list-inside space-y-1.5 text-slate-700">
                <li>Uso diário do uniforme completo (calça, camisa com a marca bordada, calçado antiderrapante fechado).</li>
                <li>Cabelos presos com rede ou coque discreto; unhas curtas e limpas.</li>
                <li>Uso rigoroso dos Equipamentos de Proteção Individual (EPIs): luvas de borracha coloridas por ambiente (ex: amarela para cozinha/copa, azul para escritórios, vermelha exclusiva para sanitários).</li>
                <li>Óculos de proteção ao manusear produtos químicos concentrados ou desencrostantes.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="space-y-2">
              <h3 className="text-base font-black text-slate-900">
                3. POSTURA PROFISSIONAL E CONDUTA NO CLIENTE
              </h3>
              <ul className="list-disc list-inside space-y-1.5 text-slate-700">
                <li>Pontualidade inegociável: chegar com 15 minutos de antecedência ao horário agendado.</li>
                <li>Cumprimentar o cliente com cordialidade, educação e sem intimidades excessivas.</li>
                <li>É terminantemente proibido o uso de celular para fins pessoais durante a execução do serviço. O celular só deve ser utilizado para o aplicativo operacional (início, checklist e término).</li>
                <li>Jamais abrir gavetas, armários particulares ou pastas que não façam parte do escopo contratado.</li>
                <li>Não consumir alimentos ou bebidas do cliente sem autorização prévia expressa.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="space-y-2">
              <h3 className="text-base font-black text-slate-900">
                4. PROTOCOLO TÉCNICO DE LIMPEZA E CUIDADO COM SUPERFÍCIES
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <div>
                  <strong className="text-slate-900 block font-bold mb-1">Pisos de Madeira Nobre / Laminados:</strong>
                  <span>Proibido uso de água em abundância. Utilizar pano de microfibra levemente umedecido com solução neutra.</span>
                </div>
                <div>
                  <strong className="text-slate-900 block font-bold mb-1">Pedras Naturais (Mármore, Granito):</strong>
                  <span>Nunca utilizar produtos ácidos ou cloro puro, que causam corrosão imediata e perda de brilho.</span>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div className="space-y-2">
              <h3 className="text-base font-black text-slate-900">
                5. CUIDADO COM ANIMAIS DE ESTIMAÇÃO (PETS)
              </h3>
              <p className="text-slate-700">
                Verificar sempre a ficha do cliente antes de entrar. Nunca deixar portas ou portões abertos. Não alimentar os animais do cliente e não aplicar produtos químicos sanitizantes diretamente próximo aos potes de ração ou água.
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-2">
              <h3 className="text-base font-black text-slate-900">
                6. PROCEDIMENTO EM CASO DE AVARIA OU ACIDENTE
              </h3>
              <p className="text-slate-700">
                Caso ocorra quebra acidental de qualquer objeto ou falha em equipamento, comunicar <strong>imediatamente</strong> a líder de equipe e a administração. Tirar foto do local. A empresa possui seguro de responsabilidade civil e tratará a situação com transparência perante o cliente.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-50 border border-cyan-200 text-xs text-cyan-950">
              <strong>Declaração de Ciência:</strong> O colaborador atesta ter lido, compreendido e recebido treinamento sobre todas as normas contidas neste manual, comprometendo-se a cumpri-las integralmente sob pena de medidas disciplinares.
            </div>
          </div>
        )}

        {selectedDoc === 'contrato-padrao' && (
          <div className="space-y-6">
            <div className="text-center pb-6 border-b border-slate-200">
              <span className="text-[10px] uppercase font-black tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded">
                MINUTA CONTRATUAL PADRÃO HOMOLOGADA
              </span>
              <h1 className="text-2xl font-black text-slate-900 mt-3">
                INSTRUMENTO PARTICULAR DE PRESTAÇÃO DE SERVIÇOS DE LIMPEZA E HIGIENIZAÇÃO PROFISSIONAL
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Contrato Bilateral com Garantia de SLA e Responsabilidade Técnica
              </p>
            </div>

            <div className="space-y-3 text-slate-700">
              <p>
                <strong>CONTRATADA:</strong> AMBIENTES LIMPOS SERVIÇOS DE LIMPEZA PROFISSIONAL LTDA, inscrita no CNPJ sob o nº {BRAND_CONFIG.contacts.cnpj}, com sede operacional na Cidade de São Paulo - SP.
              </p>
              <p>
                <strong>CONTRATANTE:</strong> Pessoa física ou jurídica devidamente qualificada no anexo de cadastro de cliente integrante desta proposta.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-extrabold text-slate-900">CLÁUSULA 1ª — DO OBJETO</h4>
              <p className="text-slate-700">
                O presente contrato tem por objeto a prestação contínua de serviços especializados de limpeza, conservação e asseio técnico predial nos locais indicados pela CONTRATANTE, com fornecimento de mão de obra capacitada, maquinário adequado e saneantes homologados pela ANVISA.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-extrabold text-slate-900">CLÁUSULA 2ª — DO NÍVEL DE SERVIÇO (SLA) E REPOSIÇÃO</h4>
              <p className="text-slate-700">
                A CONTRATADA assegura o cumprimento integral dos dias e horários pactuados. Em caso de ausência involuntária de colaborador escalado, a CONTRATADA providenciará profissional substituto devidamente uniformizado e orientado em até 2 (duas) horas a contar da notificação.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-extrabold text-slate-900">CLÁUSULA 3ª — DO VALOR E FORMA DE PAGAMENTO</h4>
              <p className="text-slate-700">
                Pelos serviços prestados, a CONTRATANTE pagará à CONTRATADA o valor mensal estabelecido na proposta aceita, mediante emissão de Nota Fiscal Eletrônica e boleto/PIX com vencimento no dia acordado de cada mês subsequente. O reajuste será anual baseado na variação positiva do IPCA/IBGE.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-extrabold text-slate-900">CLÁUSULA 4ª — DA RESCISÃO</h4>
              <p className="text-slate-700">
                O presente instrumento possui vigência de 12 (doze) meses, podendo ser rescindido por qualquer das partes mediante aviso prévio por escrito com antecedência mínima de 30 (trinta) dias, sem incidência de multa após o prazo mínimo estabelecido.
              </p>
            </div>
          </div>
        )}

        {selectedDoc === 'termo-confidencialidade' && (
          <div className="space-y-6">
            <div className="text-center pb-6 border-b border-slate-200">
              <h1 className="text-2xl font-black text-slate-900">
                TERMO DE CONFIDENCIALIDADE, SIGILO E PROTEÇÃO DE DADOS (LGPD)
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Garantia jurídica de proteção aos dados e patrimônio dos clientes
              </p>
            </div>

            <div className="space-y-3 text-slate-700">
              <p>
                Todos os colaboradores e prestadores vinculados à Ambientes Limpos firmam compromisso irrevogável de manter absoluto sigilo sobre documentos, papéis de trabalho, sistemas, equipamentos e qualquer informação confidencial a que tenham acesso durante as atividades de limpeza.
              </p>
              <p>
                O descumprimento injustificado sujeita o infrator às sanções legais civis e criminais cabíveis, nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
