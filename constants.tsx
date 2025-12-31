
import { Module, Achievement } from './types';

export const COLORS = {
  primary: '#0066FF',
  secondary: '#FFFFFF',
  accent: '#F3F4F6'
};

export const MARKET_DATA = [
  { symbol: 'OT-TX 2028', price: '102.5%', change: '+0.2%' },
  { symbol: 'USD/AOA', price: '945.00', change: '-0.1%' },
  { symbol: 'BT 364D', price: '18.5%', change: '0.0%' },
];

export const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: '1', title: 'Poupador Iniciante', icon: '💰', unlocked: true, description: 'Completou o primeiro módulo de finanças.' },
  { id: '2', title: 'Mestre dos Juros', icon: '📈', unlocked: false, description: 'Usou o simulador de investimentos.' },
  { id: '3', title: 'Investidor Kwanza', icon: '🇦🇴', unlocked: false, description: 'Atingiu 1000 pontos na plataforma.' },
  { id: '4', title: 'Visão PRO', icon: '💎', unlocked: false, description: 'Tornou-se membro Premium Zifolio.' },
];

export const MODULES: Module[] = [
  {
    id: '1',
    title: 'Raio-X das Finanças',
    category: 'Básico',
    description: 'Aprenda a mapear todas as suas entradas e saídas de Kwanza.',
    content: 'O primeiro passo para a liberdade financeira em Angola é entender o custo de vida. Angola tem desafios económicos únicos, e por isso cada Kwanza conta. Comece listando seus gastos fixos (renda, energia, água) e variáveis.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    isPremium: false,
    quiz: [
      { 
        question: 'Qual a recomendação principal para quem quer começar a poupar?', 
        options: ['Gastar tudo', 'Fazer um orçamento mensal', 'Pedir kumbu emprestado', 'Ignorar as contas'], 
        answer: 1 
      },
      { 
        question: 'O que é a reserva de emergência?', 
        options: ['Dinheiro para as férias', 'Kumbu guardado para imprevistos urgentes', 'Dinheiro para comprar um iPhone', 'Um tipo de seguro de vida'], 
        answer: 1 
      },
      { 
        question: 'Por que a inflação é um risco para quem guarda dinheiro em casa?', 
        options: ['O dinheiro pode ser roubado', 'As notas podem estragar', 'O poder de compra do Kwanza diminui com o tempo', 'Não há risco nenhum'], 
        answer: 2 
      }
    ]
  },
  {
    id: '2',
    title: 'Comportamento Financeiro',
    category: 'Mentalidade',
    description: 'Entenda os gatilhos emocionais que fazem você gastar mais.',
    content: 'Muitas vezes em Angola somos levados pelo status social. Aprenda a diferenciar necessidade de desejo. Ter um bom comportamento financeiro significa dizer "não" hoje para ter um futuro "sim" permanente.',
    isPremium: false,
    quiz: [
      { 
        question: 'O que é um gasto por impulso?', 
        options: ['Pagar a escola dos filhos', 'Comprar algo que não planeou', 'Pagar o damba do carro', 'Investir em títulos'], 
        answer: 1 
      },
      { 
        question: 'Qual a diferença entre necessidade e desejo?', 
        options: ['São a mesma coisa', 'Necessidade é o que preciso para viver; Desejo é o que gostaria de ter', 'Desejo é mais importante que necessidade', 'Necessidade é opcional'], 
        answer: 1 
      }
    ]
  },
  {
    id: '3',
    title: 'Investimentos na Prática',
    category: 'Avançado',
    description: 'Títulos do Tesouro, BODIVA e Fundos de Investimento em Angola.',
    content: 'A BODIVA é a Bolsa de Dívida e Valores de Angola. Aqui você pode comprar Bilhetes do Tesouro (BTs) e Obrigações do Tesouro (OTs). Estes são considerados os investimentos mais seguros do país, pagando juros atrativos para vencer a inflação.',
    isPremium: true,
    quiz: [
      { 
        question: 'Onde se compram Títulos do Tesouro em Angola?', 
        options: ['No mercado informal', 'Através de bancos e corretoras registadas', 'No supermercado', 'Não existem títulos'], 
        answer: 1 
      },
      { 
        question: 'O que significa a sigla BODIVA?', 
        options: ['Bolsa de Valores e Investimentos de Angola', 'Bolsa de Dívida e Valores de Angola', 'Banco de Investimentos de Angola', 'Boletim de Dividendos de Angola'], 
        answer: 1 
      },
      { 
        question: 'Qual o imposto (IAC) retido sobre os juros de Títulos do Tesouro?', 
        options: ['5%', '10%', '15%', '20%'], 
        answer: 1 
      },
      { 
        question: 'Qual a diferença principal entre BT e OT?', 
        options: ['OT é curto prazo, BT é longo prazo', 'BT é curto prazo, OT é médio/longo prazo', 'BT não paga juros', 'São exatamente a mesma coisa'], 
        answer: 1 
      }
    ]
  },
  {
    id: '4',
    title: 'Descubra seu Perfil Financeiro',
    category: 'Diagnóstico',
    description: 'Saiba se você é conservador, moderado ou arrojado.',
    content: 'Antes de investir, você precisa saber quanto risco seu coração (e seu bolso) suporta. Este teste dirá se você prefere a segurança dos títulos públicos ou o risco das ações e fundos imobiliários.',
    isPremium: false,
    isProfileQuiz: true,
    quiz: [
      { 
        question: 'Por quanto tempo pretende deixar o seu kumbu investido?', 
        options: ['Menos de 1 ano (Curto Prazo)', 'De 1 a 5 anos (Médio Prazo)', 'Mais de 5 anos (Longo Prazo)'], 
        answer: 0,
        weight: [1, 2, 3] 
      },
      { 
        question: 'Qual o seu principal objetivo ao investir?', 
        options: ['Preservar o que já tenho (Segurança)', 'Aumentar o património com cautela', 'Máximo crescimento possível (Arriscar)'], 
        answer: 0,
        weight: [1, 2, 3] 
      },
      { 
        question: 'Qual o seu nível de conhecimento sobre o mercado angolano (BODIVA)?', 
        options: ['Nenhum, conheço apenas a poupança do banco', 'Básico, já ouvi falar de Títulos do Tesouro', 'Bom, entendo como funcionam ações e fundos'], 
        answer: 0,
        weight: [1, 2, 3] 
      },
      { 
        question: 'Se o mercado em Angola entrar em crise e os seus investimentos caírem 15% amanhã, o que faz?', 
        options: ['Retiro tudo imediatamente para não perder mais', 'Mantenho e espero a recuperação', 'Compro mais para aproveitar a baixa de preços'], 
        answer: 0,
        weight: [1, 2, 3] 
      },
      { 
        question: 'Qual a percentagem da sua renda mensal que consegue poupar hoje?', 
        options: ['Abaixo de 10%', 'Entre 10% e 30%', 'Mais de 30%'], 
        answer: 0,
        weight: [1, 2, 3] 
      },
      { 
        question: 'Sobre a sua reserva de emergência (kumbu para imprevistos):', 
        options: ['Não tenho nada guardado ainda', 'Tenho entre 1 a 3 meses de despesas', 'Já tenho mais de 6 meses garantidos'], 
        answer: 0,
        weight: [1, 2, 3] 
      }
    ]
  }
];

export const MOCK_RANKING = [
  { name: 'Bernardo S.', points: 2450, avatar: '👤' },
  { name: 'Maria K.', points: 2100, avatar: '👩' },
  { name: 'João D.', points: 1850, avatar: '👨' },
  { name: 'Você', points: 150, avatar: '🌟' }
];
