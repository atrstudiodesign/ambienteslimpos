import React from 'react';
import { X, ShieldCheck, FileText, Lock, AlertCircle, CheckCircle, Scale } from 'lucide-react';
import { ActiveModal } from '../types';
import { BRAND_CONFIG } from '../config/brandConfig';

interface LegalModalsProps {
  activeModal: ActiveModal;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ activeModal, onClose }) => {
  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0b1d3a] text-cyan-400 flex items-center justify-center">
              {activeModal === 'contract' ? (
                <FileText className="w-5 h-5" />
              ) : activeModal === 'privacy' ? (
                <Lock className="w-5 h-5" />
              ) : activeModal === 'legal' ? (
                <AlertCircle className="w-5 h-5" />
              ) : activeModal === 'terms' ? (
                <Scale className="w-5 h-5" />
              ) : (
                <ShieldCheck className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#0b1d3a] uppercase tracking-wide">
                {activeModal === 'contract' && 'Contrato de Prestação de Serviços'}
                {activeModal === 'terms' && 'Termos de Serviço'}
                {activeModal === 'legal' && 'Aviso Legal'}
                {activeModal === 'privacy' && 'Política de Privacidade (LGPD)'}
                {activeModal === 'manual' && 'Manual do Colaborador — Padrão Técnico'}
                {activeModal === 'cookiePrefs' && 'Preferências de Privacidade e Cookies'}
              </h3>
              <p className="text-[11px] text-slate-500">
                Ambientes Limpos • Documentação Operacional e Legal
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto text-xs sm:text-sm text-slate-600 space-y-6 leading-relaxed">
          
          {/* CONTRATO DE PRESTAÇÃO DE SERVIÇOS */}
          {activeModal === 'contract' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs font-medium">
                <strong>Aviso:</strong> Este documento constitui um modelo operacional de referência para as contratações da Ambientes Limpos.
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm uppercase">1. IDENTIFICAÇÃO DAS PARTES</h4>
                <p>
                  <strong>CONTRATANTE:</strong> Pessoa física ou jurídica devidamente qualificada no formulário de atendimento ou proposta comercial.
                </p>
                <p>
                  <strong>CONTRATADA / PRESTADORA:</strong> Serviços especializados executados sob a marca <strong>Ambientes Limpos</strong>, com assessoria operacional, comercial e gestão contratual sob responsabilidade de <strong>{BRAND_CONFIG.contacts.assessoriaEmpresa}</strong>, inscrita no <strong>CNPJ nº {BRAND_CONFIG.contacts.cnpj}</strong>, com canais oficiais de atendimento no telefone/WhatsApp <strong>{BRAND_CONFIG.contacts.whatsappCommercial}</strong>.
                </p>

                <h4 className="font-bold text-slate-900 text-sm uppercase">2. OBJETO</h4>
                <p>Prestação de serviços profissionais de higienização e organização de ambientes residenciais ou empresariais conforme modalidade acordada (Básica, Soft/Completa, Pesada ou Equipe Corporativa).</p>

                <h4 className="font-bold text-slate-900 text-sm uppercase">3. DESCRIÇÃO DO SERVIÇO & ESCOPO</h4>
                <p>A execução seguirá o checklist padrão informado previamente. Serviços não contemplados no escopo básico contratado deverão ser prévia e formalmente combinados.</p>

                <h4 className="font-bold text-slate-900 text-sm uppercase">4. DATA, HORÁRIO & JANELAS DE ENTRADA</h4>
                <p>O atendimento ocorrerá na data agendada. Em razão do tráfego urbano na Capital e Zona Leste, a entrada opera em janelas: Manhã (08h às 09h) e Tarde (13h às 14h).</p>

                <h4 className="font-bold text-slate-900 text-sm uppercase">5. LOCAL</h4>
                <p>Endereço e dependências informadas pelo Contratante no momento da solicitação do orçamento.</p>

                <h4 className="font-bold text-slate-900 text-sm uppercase">6. VALOR & FORMA DE PAGAMENTO</h4>
                <p>O valor ajustado no orçamento formal deverá ser quitado na forma pactuada (transferência bancária, PIX ou fatura corporativa), sem cobrança de taxas adicionais não autorizadas.</p>

                <h4 className="font-bold text-slate-900 text-sm uppercase">7. SERVIÇOS EXTRAS</h4>
                <p>Serviços como limpeza interna de fornos, geladeiras, lavar roupas, passar ou áreas externas não estão inclusos automaticamente e necessitam de contratação avulsa prévia.</p>

                <h4 className="font-bold text-slate-900 text-sm uppercase">8. PRODUTOS & MATERIAIS</h4>
                <p>A condição de fornecimento de insumos será ajustada no orçamento. Produtos específicos fora do padrão serão de encargo do Contratante ou faturados à parte.</p>

                <h4 className="font-bold text-slate-900 text-sm uppercase">9. LOCOMOÇÃO</h4>
                <p>Condição definida previamente com a assessoria conforme a localização do imóvel e rotas da equipe.</p>

                <h4 className="font-bold text-slate-900 text-sm uppercase">10. OBRIGAÇÕES DO CONTRATANTE</h4>
                <p>Garantir acesso ao local no horário, fornecer água e energia elétrica, guardar devidamente pertences de valor e dinheiro, e informar particularidades de pisos ou animais domésticos.</p>

                <h4 className="font-bold text-slate-900 text-sm uppercase">11. OBRIGAÇÕES DA PRESTADORA</h4>
                <p>Executar os serviços com zelo, cordialidade, pontualidade dentro da janela acordada, colaboradores devidamente uniformizados e respeitando a integridade do patrimônio.</p>

                <h4 className="font-bold text-slate-900 text-sm uppercase">12. LIMITAÇÕES DE SEGURANÇA</h4>
                <p>A equipe não realiza trabalhos em altura, não sobe em telhados, muros, móveis instáveis ou caixas improvisadas, nem manuseia entulhos pesados ou substâncias perigosas.</p>

                <h4 className="font-bold text-slate-900 text-sm uppercase">13. CANCELAMENTO & REAGENDAMENTO</h4>
                <p>Cancelamentos ou reagendamentos devem ser solicitados com antecedência mínima de 24 (vinte e quatro) horas úteis junto à assessoria.</p>

                <h4 className="font-bold text-slate-900 text-sm uppercase">14. DANOS E OCORRÊNCIAS</h4>
                <p>Qualquer intercorrência deverá ser comunicada de imediato à assessoria da Ambientes Limpos para averiguação e providências tempestivas.</p>

                <h4 className="font-bold text-slate-900 text-sm uppercase">15. PROTEÇÃO DE DADOS (LGPD)</h4>
                <p>Os dados pessoais do Contratante são utilizados estritamente para fins de orçamento, faturamento e execução contratual, em conformidade com a Lei Geral de Proteção de Dados.</p>

                <h4 className="font-bold text-slate-900 text-sm uppercase">16. FORO</h4>
                <p>Fica eleito o Foro da Comarca de São Paulo — SP para dirimir quaisquer controvérsias decorrentes do presente ajuste.</p>
              </div>

              <div className="pt-4 border-t border-slate-200 text-slate-400 text-xs italic">
                Modelo operacional sujeito à revisão jurídica conforme a estrutura empresarial e as condições específicas de cada contratação.
              </div>
            </div>
          )}

          {/* TERMOS DE SERVIÇO */}
          {activeModal === 'terms' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-sm uppercase">1. UTILIZAÇÃO DO SITE</h4>
              <p>O website da Ambientes Limpos tem caráter estritamente institucional e comercial, destinado à apresentação de serviços de higienização profissional e facilitação de orçamentos.</p>

              <h4 className="font-bold text-slate-900 text-sm uppercase">2. SOLICITAÇÃO DE ORÇAMENTO & CONTRATAÇÃO</h4>
              <p>O preenchimento do formulário ou contato por WhatsApp configura solicitação de proposta comercial e não obriga a contratação automática até que haja aceitação de ambas as partes.</p>

              <h4 className="font-bold text-slate-900 text-sm uppercase">3. VERACIDADE DAS INFORMAÇÕES</h4>
              <p>O cliente declara que as metragens, condições do imóvel e necessidades informadas correspondem à realidade. Divergências expressivas no local podem ensejar readequação de equipe e valores.</p>

              <h4 className="font-bold text-slate-900 text-sm uppercase">4. DISPONIBILIDADE DE AGENDA</h4>
              <p>A prestação dos serviços depende de confirmação prévia de disponibilidade na data e período solicitados.</p>

              <h4 className="font-bold text-slate-900 text-sm uppercase">5. LIMITAÇÃO DE RESPONSABILIDADE & SEGURANÇA</h4>
              <p>Por diretriz inegociável, nossas colaboradoras não executam atividades em altura ou de risco físico iminente.</p>

              <h4 className="font-bold text-slate-900 text-sm uppercase">6. GESTÃO E ASSESSORIA CONTRATUAL</h4>
              <p>A intermediação comercial, assessoria operacional e gestão formal de contratos são conduzidas por <strong>{BRAND_CONFIG.contacts.assessoriaEmpresa}</strong>, inscrita no <strong>CNPJ nº {BRAND_CONFIG.contacts.cnpj}</strong>, contato oficial: {BRAND_CONFIG.contacts.whatsappCommercial}.</p>
            </div>
          )}

          {/* AVISO LEGAL */}
          {activeModal === 'legal' && (
            <div className="space-y-4">
              <div className="p-3 bg-cyan-50 border border-cyan-200 rounded-xl text-cyan-900 text-xs">
                <strong>Transparência Comercial Ambientes Limpos</strong>
              </div>
              <ul className="space-y-2 list-disc pl-5">
                <li><strong>Assessoria & Contratos:</strong> Gestão comercial e contratos sob responsabilidade de <strong>{BRAND_CONFIG.contacts.assessoriaEmpresa}</strong> — <strong>CNPJ: {BRAND_CONFIG.contacts.cnpj}</strong>. Contato: {BRAND_CONFIG.contacts.whatsappCommercial}.</li>
                <li><strong>Valores Publicados:</strong> São referenciais para imóveis de metragens e condições padrão. O orçamento definitivo é estabelecido após avaliação individual.</li>
                <li><strong>Imagens:</strong> Fotografias reais de nossas profissionais em uniformes oficiais. Outras ilustrações de ambientes têm finalidade ilustrativa do padrão almejado.</li>
                <li><strong>Disponibilidade:</strong> O atendimento está condicionado à disponibilidade de agenda das equipes na Zona Leste e Capital de São Paulo.</li>
                <li><strong>Serviços Especiais:</strong> Limpezas pesadas ou após reformas exigem avaliação detalhada prévia.</li>
                <li><strong>Segurança:</strong> Atividades de risco físico não são realizadas em nenhuma hipótese.</li>
              </ul>
            </div>
          )}

          {/* POLÍTICA DE PRIVACIDADE */}
          {activeModal === 'privacy' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Em conformidade com a Lei Federal nº 13.709/2018 (Lei Geral de Proteção de Dados - LGPD).
              </p>

              <h4 className="font-bold text-slate-900 text-sm uppercase">1. DADOS COLETADOS</h4>
              <p>Coletamos exclusivamente os dados necessários para a elaboração do orçamento: Nome, número de WhatsApp/telefone, bairro/cidade, tipo e tamanho estimado do imóvel e observações enviadas.</p>

              <h4 className="font-bold text-slate-900 text-sm uppercase">2. FINALIDADE DO TRATAMENTO</h4>
              <p>Os dados são utilizados com o propósito exclusivo de calcular a proposta, retornar o contato via WhatsApp ou telefone e organizar o roteiro de atendimento.</p>

              <h4 className="font-bold text-slate-900 text-sm uppercase">3. COMPARTILHAMENTO DE DADOS</h4>
              <p>Não comercializamos dados pessoais. O compartilhamento ocorre exclusivamente com operadores de infraestrutura estritamente necessários (ex: serviço de WhatsApp e provedores de hospedagem segura).</p>

              <h4 className="font-bold text-slate-900 text-sm uppercase">4. DIREITOS DO TITULAR</h4>
              <p>Você pode a qualquer momento solicitar a confirmação da existência de tratamento, o acesso aos seus dados ou a eliminação dos mesmos através de nosso canal oficial de atendimento.</p>

              <h4 className="font-bold text-slate-900 text-sm uppercase">5. SEGURANÇA</h4>
              <p>Adotamos medidas técnicas e organizacionais para proteger seus dados contra acessos não autorizados e situações acidentais ou ilícitas.</p>
            </div>
          )}

          {/* MANUAL DO COLABORADOR */}
          {activeModal === 'manual' && (
            <div className="space-y-4">
              <div className="p-3 bg-slate-100 rounded-xl text-slate-800 text-xs">
                Protocolo interno oficial de qualidade técnica e conduta ética da equipe Ambientes Limpos.
              </div>

              <h4 className="font-bold text-slate-900 text-sm uppercase">Deveres e Diretrizes Operacionais</h4>
              <ul className="space-y-1.5 list-disc pl-5">
                <li>Cumprimento estrito das janelas de horário acordadas.</li>
                <li>Uso contínuo do uniforme limpo e identificação profissional.</li>
                <li>Separação de panos de microfibra por cor e setor (ex: banheiros não compartilham materiais com cozinha).</li>
                <li>Zelo irrestrito pelos bens e móveis do cliente.</li>
                <li>Comunicação imediata à supervisão sobre qualquer eventualidade.</li>
              </ul>

              <h4 className="font-bold text-rose-800 text-sm uppercase">Vedações Expressas</h4>
              <ul className="space-y-1.5 list-disc pl-5 text-slate-700">
                <li>Fotografar ou filmar o interior do imóvel sem consentimento formal.</li>
                <li>Mexer em gavetas ou pertences fora do escopo contratado.</li>
                <li>Subir em parapeitos, muros ou escadas improvisadas.</li>
                <li>Tratar de negociação financeira no local quando houver assessoria responsável.</li>
              </ul>
            </div>
          )}

          {/* PREFERÊNCIAS DE COOKIES */}
          {activeModal === 'cookiePrefs' && (
            <div className="space-y-4">
              <p>Gerencie como os cookies e tecnologias de navegação são utilizados neste site:</p>
              
              <div className="p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Cookies Essenciais (Obrigatórios)</span>
                  <span className="text-xs bg-slate-200 px-2 py-0.5 rounded text-slate-700 font-bold">Ativo</span>
                </div>
                <p className="text-xs text-slate-500">
                  Necessários para o funcionamento básico, segurança e integridade do formulário e sessões.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Cookies de Análise e Métricas</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-cyan-600 rounded" />
                </div>
                <p className="text-xs text-slate-500">
                  Permitem compreender a navegação e melhorar a experiência e tempos de resposta do site.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl bg-[#0b1d3a] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Salvar Preferências
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-right shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
