import { Product, ProductCategory } from '../types';

export const HERO_IMAGE = '/src/assets/images/forma_hero_lamp_1790832441052.jpg';
export const AUDIO_SPEAKER_IMAGE = '/src/assets/images/forma_audio_speaker_1790832453210.jpg';
export const MINIMAL_WATCH_IMAGE = '/src/assets/images/forma_minimal_watch_1790832465405.jpg';
export const DESK_ORGANIZER_IMAGE = '/src/assets/images/forma_desk_organizer_1790832477095.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'forma-01',
    name: 'Luminária Monólito I',
    subtitle: 'Escultura luminosa articulada em alumínio usinado e base de grafite',
    category: 'Design',
    collection: 'Série Monólito',
    price: 1890,
    originalPrice: 2150,
    isFeatured: true,
    isSpotlight: true,
    isWeeklyHighlight: true,
    image: HERO_IMAGE,
    secondaryImages: [
      HERO_IMAGE,
      DESK_ORGANIZER_IMAGE,
      AUDIO_SPEAKER_IMAGE
    ],
    description: 'Concebida como uma declaração de geometria pura. O braço balanceado por contrapeso permite transições de iluminação difusa a focal sem ruído mecânico.',
    editorialNote: 'Usinada a partir de bloco maciço de alumínio aeroespacial com anodização mineral resistente a marcas.',
    specs: [
      { key: 'Material', value: 'Alumínio usinado CNC & pedra basalto' },
      { key: 'Iluminação', value: 'LED COB 2700K–4000K dimmer contínuo' },
      { key: 'Potência', value: '18W / 1400 lúmens' },
      { key: 'Consumo', value: 'Classe A+ sustentável' },
      { key: 'Garantia', value: '5 anos estrutural' }
    ],
    materials: ['Alumínio Usinado', 'Basalto Mineral', 'Vidro Óptico'],
    dimensions: '48 × 16 × 52 cm',
    colors: [
      { name: 'Grafite Mineral', hex: '#1C1E24' },
      { name: 'Alumínio Prateado', hex: '#D1D5DB' },
      { name: 'Azul Cobalto Profundo', hex: '#1A56DB' }
    ],
    badge: 'Objeto Ícone',
    styleProfile: ['minimalista', 'aluminio'],
    intentMatch: ['casa', 'estilo', 'colecao']
  },
  {
    id: 'forma-02',
    name: 'Monitor Acústico Voxel Titanium',
    subtitle: 'Alto-falante ativo de precisão em titânio e dispersão radial de 360°',
    category: 'Tecnologia',
    collection: 'Acústica Arquitetônica',
    price: 3420,
    isFeatured: true,
    isWeeklyHighlight: true,
    image: AUDIO_SPEAKER_IMAGE,
    secondaryImages: [
      AUDIO_SPEAKER_IMAGE,
      HERO_IMAGE,
      MINIMAL_WATCH_IMAGE
    ],
    description: 'Corpo monolítico selado com microperfurações a laser que eliminam ressonâncias parasitas. Assinatura sonora equilibrada para audição crítica e imersão espacial.',
    editorialNote: 'Desenvolvido para conectar a estética industrial brutalista à mais avançada acústica DSP ativa.',
    specs: [
      { key: 'Drivers', value: 'Woofer 4.5" neodímio + Tweeter domo de seda 1"' },
      { key: 'Conexão', value: 'Wi-Fi Hi-Res Lossless, AirPlay 2, Bluetooth 5.4' },
      { key: 'Resposta', value: '38 Hz – 24.000 Hz' },
      { key: 'Potência Real', value: '120W RMS classe D bi-amplificado' },
      { key: 'Acabamento', value: 'Titânio escovado com microjato cerâmico' }
    ],
    materials: ['Titânio', 'Alumínio Anodizado', 'Aço Cirúrgico'],
    dimensions: '22 × 22 × 28 cm',
    colors: [
      { name: 'Titânio Escuro', hex: '#23262D' },
      { name: 'Prata Lunar', hex: '#E2E4E8' },
      { name: 'Grafite Fosco', hex: '#15171C' }
    ],
    badge: 'Hi-Fi Master',
    styleProfile: ['aluminio', 'minimalista', 'urbano'],
    intentMatch: ['casa', 'estilo', 'diaadia']
  },
  {
    id: 'forma-03',
    name: 'Cronômetro Chronos T-01',
    subtitle: 'Relógio de calibre automático com caixa geométrica em titânio grau 5',
    category: 'Estilo',
    collection: 'Tempo & Estrutura',
    price: 4890,
    originalPrice: 5300,
    isNew: true,
    isFeatured: true,
    isWeeklyHighlight: true,
    image: MINIMAL_WATCH_IMAGE,
    secondaryImages: [
      MINIMAL_WATCH_IMAGE,
      AUDIO_SPEAKER_IMAGE,
      DESK_ORGANIZER_IMAGE
    ],
    description: 'Uma reinterpretação arquitetônica da relojoaria moderna. Mostrador em camadas com ponteiro de segundos em azul cobalto polido e cristal de safira antirreflexo duplo.',
    editorialNote: 'Movimento automático com reserva de marcha de 68 horas e resistência à água de 100 metros.',
    specs: [
      { key: 'Calibre', value: 'Automático Suíço modificado FORMA Cal. 09' },
      { key: 'Caixa', value: 'Titânio Grau 5 usinado com bisel chanfrado' },
      { key: 'Vidro', value: 'Safira abobadada com tratamento antirreflexo' },
      { key: 'Pulseira', value: 'Borracha FKM técnica com fecho desplegante' },
      { key: 'Diâmetro', value: '40 mm / Espessura 9.8 mm' }
    ],
    materials: ['Titânio Grau 5', 'Safira Cristal', 'Borracha FKM'],
    dimensions: '40 mm × 9.8 mm',
    colors: [
      { name: 'Titânio Natural', hex: '#8E929A' },
      { name: 'Preto Grafite DLC', hex: '#101114' },
      { name: 'Aço Escovado', hex: '#CCD0D9' }
    ],
    badge: 'Edição Numerada',
    styleProfile: ['urbano', 'expressivo', 'aluminio'],
    intentMatch: ['estilo', 'presentear', 'colecao']
  },
  {
    id: 'forma-04',
    name: 'Sistema Stratum Desktop Organizer',
    subtitle: 'Bandejas modulares articuláveis em alumínio fosco e pedra vulcânica',
    category: 'Essenciais',
    collection: 'Ambiente de Foco',
    price: 940,
    isNew: true,
    isFeatured: true,
    isWeeklyHighlight: true,
    image: DESK_ORGANIZER_IMAGE,
    secondaryImages: [
      DESK_ORGANIZER_IMAGE,
      HERO_IMAGE,
      AUDIO_SPEAKER_IMAGE
    ],
    description: 'Três módulos magnéticos encaixáveis para canetas, cartões, smartphone e periféricos. Base pesada com pés de micro-sucção que não riscam superfícies.',
    editorialNote: 'A geometria com cantos vivos de 90° e ranhuras milimétricas organiza a rotina de quem busca rigor e tranquilidade mental.',
    specs: [
      { key: 'Configuração', value: '3 bandejas modulares magnéticas' },
      { key: 'Material', value: 'Alumínio anodizado fosco 4mm' },
      { key: 'Acessório', value: 'Porta-caneta em rocha vulcânica esculpida' },
      { key: 'Acoplamento', value: 'Ímãs de neodímio embutidos' }
    ],
    materials: ['Alumínio Maciço', 'Rocha Vulcânica', 'Silicone'],
    dimensions: '34 × 18 × 4.5 cm',
    colors: [
      { name: 'Mineral Grafite', hex: '#1C1F26' },
      { name: 'Prata Industrial', hex: '#D7DAE0' },
      { name: 'Azul Cobalto Elétrico', hex: '#1A56DB' }
    ],
    badge: 'Essencial de Mesa',
    styleProfile: ['minimalista', 'aluminio', 'urbano'],
    intentMatch: ['diaadia', 'casa', 'presentear']
  },
  {
    id: 'forma-05',
    name: 'Mochila Estrutural Arc-1',
    subtitle: 'Nylon balístico laminado com chassi rígido interno e fechos Fidlock',
    category: 'Estilo',
    collection: 'Mobilidade Urbana',
    price: 1540,
    isNew: true,
    image: AUDIO_SPEAKER_IMAGE, // Clean tech-aesthetic image with fallback styling
    secondaryImages: [AUDIO_SPEAKER_IMAGE, MINIMAL_WATCH_IMAGE],
    description: 'Silhueta escultural sem dobras desnecessárias. Compartimento suspenso com proteção antichoque para laptop de até 16 polegadas e bolsos de acesso rápido blindados contra intempéries.',
    editorialNote: 'Projetada para resistir a ciclos severos de deslocamento urbano mantendo uma silhueta arquitetônica imaculada.',
    specs: [
      { key: 'Volume', value: '22 Litros' },
      { key: 'Material', value: 'Tecido técnico laminado Cordura® 1000D' },
      { key: 'Fechos', value: 'Fivelas magnéticas Fidlock® V-Buckle' },
      { key: 'Proteção', value: 'Zíperes YKK AquaGuard® impermeáveis' }
    ],
    materials: ['Cordura® 1000D', 'Alumínio Anodizado', 'Couro Sintético Vegano'],
    dimensions: '49 × 31 × 15 cm',
    colors: [
      { name: 'Grafite Meia-Noite', hex: '#111215' },
      { name: 'Cinza Asfalto', hex: '#373B44' },
      { name: 'Azul Cobalto Militar', hex: '#163E9B' }
    ],
    badge: 'Lançamento',
    styleProfile: ['urbano', 'expressivo'],
    intentMatch: ['estilo', 'diaadia', 'presentear']
  },
  {
    id: 'forma-06',
    name: 'Difusor de Névoa Basalto 03',
    subtitle: 'Atomizador ultrassônico silencioso esculpido em rocha monolítica',
    category: 'Bem-estar',
    collection: 'Calmaria & Sentidos',
    price: 880,
    isFeatured: true,
    image: HERO_IMAGE,
    secondaryImages: [HERO_IMAGE, DESK_ORGANIZER_IMAGE],
    description: 'O vapor frio é liberado por uma fenda milimétrica no topo da escultura de basalto cinza, harmonizando o ar e transformando a fragrância em atmosfera pura.',
    editorialNote: 'Operação ultrassônica a 2.4 MHz imperceptível ao ouvido humano com desligamento inteligente.',
    specs: [
      { key: 'Capacidade', value: '250 ml (até 10 horas contínuas)' },
      { key: 'Área de Ação', value: 'Até 45 m²' },
      { key: 'Iluminação', value: 'Halo inferior em âmbar suave 1800K' },
      { key: 'Alimentação', value: 'USB-C com cabo revestido em tecido' }
    ],
    materials: ['Basalto Natural', 'Cerâmica Fosca', 'Aço Inox'],
    dimensions: '14 × 14 × 19 cm',
    colors: [
      { name: 'Basalto Cinza', hex: '#262930' },
      { name: 'Cerâmica Branca', hex: '#EBECE8' }
    ],
    badge: 'Bem-estar',
    styleProfile: ['minimalista', 'expressivo'],
    intentMatch: ['casa', 'diaadia', 'presentear']
  },
  {
    id: 'forma-07',
    name: 'Garrafa Térmica Isométrica 750',
    subtitle: 'Aço cirúrgico 316 com vácuo triplo e tampa de engate rápido usinada',
    category: 'Essenciais',
    collection: 'Dia a Dia Tecnológico',
    price: 360,
    isNew: true,
    image: DESK_ORGANIZER_IMAGE,
    secondaryImages: [DESK_ORGANIZER_IMAGE, AUDIO_SPEAKER_IMAGE],
    description: 'Mantém líquidos gelados por 32 horas e quentes por 16 horas. O gargalo lapidado a laser oferece fluxo controlado e limpeza simplificada sem cantos ocultos.',
    editorialNote: 'Livre de BPA e revestimentos sintéticos internos que alteram o paladar de cafés especiais ou chás finos.',
    specs: [
      { key: 'Capacidade', value: '750 ml' },
      { key: 'Isolamento', value: 'Tripla parede com barreira de cobre a vácuo' },
      { key: 'Bocal', value: 'Diâmetro ergonômico 44 mm para cubos de gelo' },
      { key: 'Vedação', value: 'Anel de silicone farmacêutico de alta densidade' }
    ],
    materials: ['Aço Inoxidável 316', 'Silicone Alimentar', 'Cobre Eletrolítico'],
    dimensions: '7.5 × 7.5 × 26 cm',
    colors: [
      { name: 'Cobalto Satin', hex: '#1A56DB' },
      { name: 'Preto Grafite Texturizado', hex: '#17181C' },
      { name: 'Aço Puro Escovado', hex: '#E1E3E8' }
    ],
    badge: 'Best-Seller',
    styleProfile: ['aluminio', 'urbano', 'minimalista'],
    intentMatch: ['diaadia', 'estilo', 'presentear']
  },
  {
    id: 'forma-08',
    name: 'Cadeira Balance Cantilever',
    subtitle: 'Estrutura tubular contínua em aço cromo acetinado e couro vegetal',
    category: 'Casa',
    collection: 'Mobiliário Autoral',
    price: 5200,
    isFeatured: true,
    image: HERO_IMAGE,
    secondaryImages: [HERO_IMAGE, MINIMAL_WATCH_IMAGE],
    description: 'Inspirada nos princípios bauhausianos de balanço estrutural, a forma em balanço distribui a pressão corporal gerando uma sensação de leveza e flutuação.',
    editorialNote: 'Couro de curtimento vegetal de 3.5mm com costura manual e estrutura tubular curvada sem soldas aparentes.',
    specs: [
      { key: 'Estrutura', value: 'Tubo de aço curvado em CNC com acabamento cromado acetinado' },
      { key: 'Assento/Encosto', value: 'Couro vegetal tratado com óleos naturais' },
      { key: 'Carga Máxima', value: '180 kg com certificação de fadiga estática' }
    ],
    materials: ['Aço Carbono', 'Couro Bovino Vegetal', 'Feltro Protetor'],
    dimensions: '62 × 78 × 82 cm',
    colors: [
      { name: 'Couro Grafite & Aço', hex: '#1F2228' },
      { name: 'Couro Cobalto Especial', hex: '#1A4AB8' },
      { name: 'Couro Areia Mineral', hex: '#D3CEBE' }
    ],
    badge: 'Mobiliário Exclusivo',
    styleProfile: ['expressivo', 'minimalista'],
    intentMatch: ['casa', 'colecao']
  },
  {
    id: 'forma-09',
    name: 'Óculos Arquitetônicos V-02',
    subtitle: 'Armação monobloco em folha de titânio japonês com lentes Zeiss',
    category: 'Estilo',
    collection: 'Óptica de Precisão',
    price: 1980,
    isNew: true,
    image: MINIMAL_WATCH_IMAGE,
    secondaryImages: [MINIMAL_WATCH_IMAGE, AUDIO_SPEAKER_IMAGE],
    description: 'Pesa apenas 14 gramas sem parafusos em suas charneiras. O corte tridimensional na ponte cria uma sombra geométrica sutil e inconfundível.',
    editorialNote: 'Lentes solares Carl Zeiss com polarização de 99.8% e proteção UVA/UVB total.',
    specs: [
      { key: 'Armação', value: 'Beta-Titânio japonês de 0.6mm ultra flexível' },
      { key: 'Lentes', value: 'Zeiss Polarized Gray Gradient cat. 3' },
      { key: 'Peso', value: '14.2 gramas' },
      { key: 'Estojo', value: 'Aço dobrável magnético forrado em alcântara' }
    ],
    materials: ['Beta-Titânio', 'Policarbonato Zeiss', 'Silicone Hipoalergênico'],
    dimensions: '142 mm largura × 145 mm hastes',
    colors: [
      { name: 'Titânio Escovado Fosco', hex: '#71757E' },
      { name: 'Preto Grafite PVD', hex: '#131418' },
      { name: 'Azul Cobalto Escuro', hex: '#18367A' }
    ],
    badge: 'Série Limitada',
    styleProfile: ['urbano', 'minimalista', 'expressivo'],
    intentMatch: ['estilo', 'presentear', 'colecao']
  },
  {
    id: 'forma-10',
    name: 'Fone Linear Zero Hi-Fi',
    subtitle: 'Circumaural semi-aberto com drivers magnéticos planares de 50mm',
    category: 'Tecnologia',
    collection: 'Acústica de Estúdio',
    price: 2750,
    originalPrice: 2990,
    image: AUDIO_SPEAKER_IMAGE,
    secondaryImages: [AUDIO_SPEAKER_IMAGE, MINIMAL_WATCH_IMAGE],
    description: 'Palco sonoro tridimensional ultra-amplo com distorção harmônica inferior a 0.05%. Almofadas de veludo acústico e fita de cabeça em titânio autoajustável.',
    editorialNote: 'A escolha predileta de produtores e audiófilos que buscam precisão tímbrica cirúrgica sem fadiga auditiva.',
    specs: [
      { key: 'Transdutor', value: 'Planar Magnético 50 mm com ímãs simétricos' },
      { key: 'Impedância', value: '32 Ohms (compatível com saídas portáteis)' },
      { key: 'Cabo', value: 'Cobre OFC banhado a prata com plugue intercambiável' },
      { key: 'Resposta', value: '10 Hz – 48.000 Hz' }
    ],
    materials: ['Alumínio Usinado', 'Titânio', 'Couro Sintético Perfurado'],
    dimensions: '20 × 18 × 9 cm',
    colors: [
      { name: 'Grafite Estúdio', hex: '#181A1F' },
      { name: 'Alumínio Puro', hex: '#D2D6DC' }
    ],
    badge: 'Referência',
    styleProfile: ['aluminio', 'urbano'],
    intentMatch: ['diaadia', 'estilo', 'colecao']
  },
  {
    id: 'forma-11',
    name: 'Tapete Gráfico Vector 04',
    subtitle: 'Lã pura da Nova Zelândia tecida à mão com baixo-relevo escultural',
    category: 'Casa',
    collection: 'Espaços Vivos',
    price: 3800,
    image: HERO_IMAGE,
    secondaryImages: [HERO_IMAGE, DESK_ORGANIZER_IMAGE],
    description: 'Composição assimétrica com contrastes entre felpa alta e desníveis talhados à tesoura. Uma tela têxtil que ancora a iluminação de salas contemporâneas.',
    editorialNote: 'Fios selecionados sem aditivos químicos sintéticos, com tingimento mineral ecológico de alta solidez.',
    specs: [
      { key: 'Técnica', value: 'Tufagem manual (Hand-tufted)' },
      { key: 'Fibras', value: '100% Lã Neozelandesa fiada a mão' },
      { key: 'Altura do Fio', value: 'Variável de 10 mm a 18 mm esculpido' },
      { key: 'Base', value: 'Algodão reforçado com látex natural antiaderente' }
    ],
    materials: ['Lã Natural', 'Algodão Cru', 'Látex Vegetal'],
    dimensions: '200 × 300 cm',
    colors: [
      { name: 'Monocromático Grafite/Giz', hex: '#2A2C33' },
      { name: 'Acento Azul Cobalto', hex: '#1C3A7A' }
    ],
    badge: 'Artesanal Autoral',
    styleProfile: ['expressivo', 'minimalista'],
    intentMatch: ['casa', 'colecao']
  },
  {
    id: 'forma-12',
    name: 'Caderno Moleskine de Linho & Alumínio',
    subtitle: 'Encadernação artesanal em linho belga com lombada de alumínio anodizado',
    category: 'Essenciais',
    collection: 'Registro & Pensamento',
    price: 240,
    isNew: true,
    image: DESK_ORGANIZER_IMAGE,
    secondaryImages: [DESK_ORGANIZER_IMAGE, MINIMAL_WATCH_IMAGE],
    description: 'Papel japonês Tomoe River de 68 g/m² ideal para canetas tinteiro sem sangramento. A lombada metálica permite abertura 180° absolutamente plana.',
    editorialNote: 'Criado para registrar projetos, esquissos e reflexões com o prazer tátil que o meio digital não substitui.',
    specs: [
      { key: 'Páginas', value: '240 páginas pautadas com grade isométrica pontilhada' },
      { key: 'Papel', value: 'Tomoe River 68g livre de ácido' },
      { key: 'Lombada', value: 'Perfil extrudado de alumínio anodizado com gravação a laser' },
      { key: 'Marcador', value: 'Fita gorgurão azul cobalto' }
    ],
    materials: ['Linho Belga', 'Papel Tomoe River', 'Alumínio'],
    dimensions: '14.8 × 21 cm (A5)',
    colors: [
      { name: 'Linho Grafite', hex: '#21242B' },
      { name: 'Linho Areia Fria', hex: '#C2C4B8' },
      { name: 'Cobalto Intenso', hex: '#1A56DB' }
    ],
    badge: 'Favorito do Curador',
    styleProfile: ['minimalista', 'urbano'],
    intentMatch: ['diaadia', 'presentear', 'estilo']
  }
];

export const CATEGORIES: ProductCategory[] = [
  'Essenciais',
  'Design',
  'Tecnologia',
  'Estilo',
  'Casa',
  'Bem-estar'
];

export const COLLECTIONS = [
  {
    name: 'Série Monólito',
    subtitle: 'Iluminação & Geometria Pura',
    count: 3,
    description: 'Volumes maciços usinados em alumínio e rocha mineral.',
    category: 'Design'
  },
  {
    name: 'Acústica Arquitetônica',
    subtitle: 'Alta Fidelidade & Brutalismo',
    count: 4,
    description: 'Dispositivos de reprodução acústica que dialogam com o espaço.',
    category: 'Tecnologia'
  },
  {
    name: 'Tempo & Estrutura',
    subtitle: 'Precisão Micro-Mecânica',
    count: 2,
    description: 'Instrumentos de pulso e óptica com materiais de calibre aeroespacial.',
    category: 'Estilo'
  },
  {
    name: 'Ambiente de Foco',
    subtitle: 'Ordem Visual & Produtividade',
    count: 3,
    description: 'Módulos de mesa criados para desacelerar o ruído da rotina.',
    category: 'Essenciais'
  },
  {
    name: 'Espaços Vivos',
    subtitle: 'Mobiliário & Texturas',
    count: 3,
    description: 'Peças de apoio com presença escultórica e conforto honesto.',
    category: 'Casa'
  }
];

export const CURATED_INTENTS = [
  {
    id: 'estilo' as const,
    label: 'Meu estilo',
    description: 'Acessórios pessoais, instrumentos de pulso e peças de transporte diário.',
    iconName: 'Sparkles',
    recommendedIds: ['forma-03', 'forma-05', 'forma-09', 'forma-07']
  },
  {
    id: 'casa' as const,
    label: 'Minha casa',
    description: 'Iluminação escultural, objetos de destaque e mobiliário autoral.',
    iconName: 'Home',
    recommendedIds: ['forma-01', 'forma-06', 'forma-08', 'forma-11']
  },
  {
    id: 'diaadia' as const,
    label: 'Meu dia a dia',
    description: 'Ferramentas de foco, térmicas de precisão e organização de mesa.',
    iconName: 'Clock',
    recommendedIds: ['forma-04', 'forma-07', 'forma-10', 'forma-12']
  },
  {
    id: 'presentear' as const,
    label: 'Presentear',
    description: 'Seleções memoráveis com acabamento nobre para surpreender quem valoriza design.',
    iconName: 'Gift',
    recommendedIds: ['forma-03', 'forma-06', 'forma-12', 'forma-04']
  },
  {
    id: 'colecao' as const,
    label: 'Criar uma coleção',
    description: 'Peças numeradas de tiragem restrita e materiais de engenharia extrema.',
    iconName: 'Layers',
    recommendedIds: ['forma-01', 'forma-02', 'forma-03', 'forma-08']
  }
];

export const CURATED_STYLES = [
  {
    id: 'minimalista' as const,
    title: 'Minimalista & Técnico',
    description: 'Linhas ortogonais, preto grafite, geometria limpa sem ornamentos.',
    accent: '#8E929A'
  },
  {
    id: 'aluminio' as const,
    title: 'Puro Alumínio & Titânio',
    description: 'Foco em superfícies metálicas usinadas, reflexos e precisão industrial.',
    accent: '#D1D5DB'
  },
  {
    id: 'expressivo' as const,
    title: 'Expressivo & Marcante',
    description: 'Presença escultural marcante, contrastes altos e detalhes em cobalto.',
    accent: '#1A56DB'
  },
  {
    id: 'urbano' as const,
    title: 'Urbano Essencial',
    description: 'Funcionalidade tática de alto padrão para quem se movimenta na metrópole.',
    accent: '#373B44'
  }
];
