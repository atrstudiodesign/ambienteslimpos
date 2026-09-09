/**
 * Ambientes Limpos - Configuração Central da Marca e Parâmetros
 * Qualquer informação comercial pode ser ajustada diretamente aqui sem alterar código-fonte.
 */

export const BRAND_CONFIG = {
  name: 'Ambientes Limpos',
  tagline: 'Serviços de Limpeza Profissional',
  headline: {
    part1: 'MAIS PESSOAS.',
    part2: 'MENOS TEMPO.',
    highlight: 'MAIS RESULTADO.',
  },
  subheadline: 'Equipe profissional para residências, empresas e lojas.',
  complementText:
    'Limpeza profissional com organização, eficiência e cuidado em cada detalhe.',

  contacts: {
    whatsappPrincipal: '+5511939026928',
    whatsappCommercial: '(11) 93902-6928',
    whatsappCommercialClean: '5511939026928',
    assessoria: '(11) 93902-6928',
    assessoriaClean: '5511939026928',
    assessoriaEmpresa: 'ATR studio assessoria',
    cnpj: '57.514.866/0001-38',
    email: 'contato@ambienteslimpos.com.br',
    instagram: 'https://instagram.com/ambienteslimpos.sp',
    cidade: 'São Paulo — SP',
    regiaoPrincipal: 'Zona Leste (Itaim Paulista, São Miguel Paulista, Guaianases, Ferraz de Vasconcelos e regiões próximas)',
    targetPhoneFull: '+5511939026928',
  },

  footerInfo: {
    cnpj: '57.514.866/0001-38',
    nome: 'ATR studio assessoria',
    whatsappPrincipal: '+5511939026928',
  },

  /** Helper para redirecionar qualquer ação CTA diretamente para o WhatsApp oficial */
  getWhatsAppUrl: (message?: string) => {
    const text = message || 'Olá! Gostaria de falar com a assessoria da Ambientes Limpos e solicitar um orçamento.';
    return `https://wa.me/5511939026928?text=${encodeURIComponent(text)}`;
  },

  // Regra obrigatória: configurável para locomoção
  LOCOMOCAO_INCLUSA: 'definir_com_assessoria',

  hours: {
    weekdays: '08h às 12h | 13h às 17h',
    saturdays: '08h às 13h',
    sundaysAndHolidays: 'Somente mediante disponibilidade e com possibilidade de valor diferenciado.',
    morningShift: 'Entrada entre 08h e 09h',
    afternoonShift: 'Entrada entre 13h e 14h',
    disclaimer: 'Nunca prometer horário exato antes da confirmação.',
  },

  quotes: [
    'MAIS PESSOAS. MENOS TEMPO. MAIS RESULTADO.',
    'LIMPEZA COM CUIDADO. RESULTADO QUE SE PERCEBE.',
    'SEU AMBIENTE MERECE O MELHOR.',
    'ORGANIZAÇÃO QUE TRANSFORMA.',
    'PROFISSIONALISMO EM CADA DETALHE.',
  ],

  // Tabela de Referência Residencial / Comercial
  residentialPricing: [
    { type: 'Apartamento até 50m²', basica: 'R$ 150', soft: 'R$ 200', pesada: 'R$ 300' },
    { type: 'Casa até 70m²', basica: 'R$ 170', soft: 'R$ 230', pesada: 'R$ 330' },
    { type: 'Loja até 50m²', basica: 'R$ 150', soft: 'R$ 190', pesada: 'R$ 280' },
    { type: 'Empresa/Sala até 50m²', basica: 'R$ 150', soft: 'R$ 190', pesada: 'R$ 280' },
  ],

  // Tabela Corporativa de Equipe
  corporateTeamPricing: [
    { equipe: '2 profissionais', valor: 'R$ 1.400', ideal: 'Imóveis médios, lojas e salas comerciais' },
    { equipe: '3 profissionais', valor: 'R$ 1.800', ideal: 'Casas amplas, empresas médias e escritórios' },
    { equipe: '4 profissionais', valor: 'R$ 2.500', ideal: 'Grandes áreas corporativas e demandas intensivas' },
  ],

  // Bairros prioritários para SEO Local (Zona Leste SP)
  localCoverage: [
    {
      id: 'itaim-paulista',
      name: 'Itaim Paulista',
      zone: 'Zona Leste de SP',
      highlight: 'Atendimento prioritário residencial e para comércios locais.',
      description: 'Equipes preparadas para casas, sobrados, condomínios de apartamentos e salas comerciais no Itaim Paulista e imediações.',
    },
    {
      id: 'sao-miguel',
      name: 'São Miguel Paulista',
      zone: 'Zona Leste de SP',
      highlight: 'Foco em empresas, consultórios, lojas e residências.',
      description: 'Atendimento ágil para regiões centrais e bairros vizinhos de São Miguel com cronograma flexível.',
    },
    {
      id: 'guaianases',
      name: 'Guaianases',
      zone: 'Zona Leste de SP',
      highlight: 'Residências unifamiliares e estabelecimentos de bairro.',
      description: 'Equipe dedicada para manutenções programadas, limpezas completas e pós-avaliação.',
    },
    {
      id: 'ferraz',
      name: 'Ferraz de Vasconcelos',
      zone: 'Região Metropolitana / Leste',
      highlight: 'Casas, apartamentos e condomínios fechados.',
      description: 'Atendimento sob consulta de agenda com transporte e equipe pré-agendados.',
    },
    {
      id: 'outras-regioes',
      name: 'Regiões Próximas (Zona Leste e Capital)',
      zone: 'São Paulo — SP',
      highlight: 'Conforme disponibilidade de agenda.',
      description: 'Consulte nossa assessoria comercial para confirmar o encaixe da sua região.',
    },
  ],
};
