import React, { useState } from 'react';
import { Sparkles, Layers, ShieldCheck, UserCheck, ArrowRight } from 'lucide-react';
import { HERO_IMAGE, AUDIO_SPEAKER_IMAGE, MINIMAL_WATCH_IMAGE, DESK_ORGANIZER_IMAGE } from '../data/products';

interface BrandExperienceProps {
  onStartCuratedSelection: () => void;
}

export const BrandExperience: React.FC<BrandExperienceProps> = ({ onStartCuratedSelection }) => {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      title: 'Curadoria',
      index: '01',
      tagline: 'Seleção sem ruído',
      headline: 'Apenas o essencial de excelência.',
      summary: 'Cada peça passa por testes de durabilidade física, ergonomia tátil e análise de proporção harmônica antes de receber a homologação FORMA.',
      points: [
        'Avaliação minuciosa de fornecedores e oficinas autorais',
        'Tiragens limitadas com controle rigoroso de qualidade',
        'Relatórios de proveniência de matéria-prima e conformidade'
      ],
      image: HERO_IMAGE,
      icon: Sparkles
    },
    {
      title: 'Design',
      index: '02',
      tagline: 'Geometria & Função',
      headline: 'A forma segue a clareza do pensamento.',
      summary: 'Desenhamos e selecionamos estruturas que dialogam com a arquitetura contemporânea. Ângulos precisos, ausência de ornamentos supérfluos e acabamentos foscos.',
      points: [
        'Influência do modernismo arquitetônico e proporção áurea',
        'Superfícies táteis em metal usinado e rocha natural',
        'Tolerâncias milimétricas em encaixes e articulações'
      ],
      image: DESK_ORGANIZER_IMAGE,
      icon: Layers
    },
    {
      title: 'Qualidade',
      index: '03',
      tagline: 'Rigor Material',
      headline: 'Objetos construídos para transcender gerações.',
      summary: 'Tratamentos superficiais PVD, anodização profunda e ligas de titânio grau 5 conferem resistência contra desgastes térmicos, mecânicos e químicos.',
      points: [
        'Garantia estrutural de até 5 anos para todo o catálogo',
        'Materiais 100% recicláveis ou de origem vegetal sustentável',
        'Montagem de precisão inspecionada manualmente'
      ],
      image: AUDIO_SPEAKER_IMAGE,
      icon: ShieldCheck
    },
    {
      title: 'Personalidade',
      index: '04',
      tagline: 'Identidade Espacial',
      headline: 'Seu ambiente como reflexo de quem você é.',
      summary: 'Acreditamos que o espaço onde você vive e trabalha molda sua clareza de pensamento. Nossos produtos são catalisadores de foco, calma e autenticidade.',
      points: [
        'Harmonia cromática neutra: grafite, mineral, oliva e prata',
        'Integração suave entre dispositivos tecnológicos e mobiliário',
        'Experiência exclusiva de seleção personalizada sob medida'
      ],
      image: MINIMAL_WATCH_IMAGE,
      icon: UserCheck
    }
  ];

  const current = pillars[activePillar];

  return (
    <section className="py-20 sm:py-28 border-b border-[#EAEAE4] bg-[#FBFBF9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#283628] font-semibold block mb-2">
            Pilares Estruturais
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-normal text-[#1C1D20]">
            Experiência da Marca
          </h2>
          <p className="mt-4 text-sm text-[#5E626B]">
            Quatro princípios inegociáveis que regem cada decisão, protótipo e seleção da FORMA.
          </p>
        </div>

        {/* Pillar Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-12 bg-[#F4F4EE] p-2 rounded-2xl border border-[#E2E2DC]">
          {pillars.map((pillar, idx) => {
            const isActive = activePillar === idx;
            return (
              <button
                key={pillar.title}
                onClick={() => setActivePillar(idx)}
                className={`py-3.5 px-4 rounded-xl text-left transition-all duration-200 flex flex-col justify-between ${
                  isActive
                    ? 'bg-white text-[#1C1D20] shadow-sm border border-[#E0E0D8]'
                    : 'text-[#6A6D74] hover:text-[#1C1D20] hover:bg-[#EBEBE4]'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                  <span>{pillar.index}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#283628]" />}
                </div>
                <div className="font-display font-bold text-sm sm:text-base">
                  {pillar.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Presentation */}
        <div className="bg-white border border-[#E6E6DF] rounded-2xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-xs">
          {/* Left Text Detail (7 cols) */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-mono text-[#283628] uppercase tracking-wider mb-2 font-semibold">
              <span>{current.tagline}</span>
            </div>

            <h3 className="font-display text-2xl sm:text-4xl font-normal sm:font-medium text-[#1C1D20] leading-tight">
              {current.headline}
            </h3>

            <p className="mt-4 text-sm text-[#5E626B] leading-relaxed">
              {current.summary}
            </p>

            {/* Pillar Points Checklist */}
            <div className="mt-8 space-y-3">
              {current.points.map((pt, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#3E4249]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#283628] mt-2 shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#F0F0EA] flex flex-wrap items-center gap-4">
              <button
                onClick={onStartCuratedSelection}
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#283628] hover:bg-[#1E281E] text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
              >
                <span>Experimentar "Monte sua Seleção"</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs text-[#7A7E86]">
                Curadoria personalizada em 2 minutos
              </span>
            </div>
          </div>

          {/* Right Image Showcase (5 cols) */}
          <div className="lg:col-span-5">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#F4F4EE] border border-[#E6E6DF] shadow-xs">
              <img
                src={current.image}
                alt={current.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
