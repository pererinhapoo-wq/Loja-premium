import React from 'react';
import { ArrowUpRight, Cpu, Compass, Sliders, Feather, Sparkles, Box } from 'lucide-react';
import { ProductCategory } from '../types';

interface CollectionsGridProps {
  onSelectCategory: (category: ProductCategory) => void;
}

const CATEGORY_ITEMS: {
  category: ProductCategory;
  index: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    category: 'Essenciais',
    index: '01',
    tagline: 'Ordem & Ritual',
    description: 'Objetos utilitários meticulosamente calibrados para uso diário contínuo.',
    icon: Sliders
  },
  {
    category: 'Design',
    index: '02',
    tagline: 'Luz & Escultura',
    description: 'Peças focais com proporções autorais e presença visual imponente.',
    icon: Compass
  },
  {
    category: 'Tecnologia',
    index: '03',
    tagline: 'Hi-Fi & Precisão',
    description: 'Engenharia acústica e dispositivos com acabamentos metálicos industriais.',
    icon: Cpu
  },
  {
    category: 'Estilo',
    index: '04',
    tagline: 'Identidade & Pulso',
    description: 'Relojoaria, óptica técnica e peças de transporte pessoal de alta durabilidade.',
    icon: Sparkles
  },
  {
    category: 'Casa',
    index: '05',
    tagline: 'Mobiliário & Atmosfera',
    description: 'Mobiliário com princípios autorais e têxteis naturais com relevo escultural.',
    icon: Box
  },
  {
    category: 'Bem-estar',
    index: '06',
    tagline: 'Calmaria & Sentidos',
    description: 'Difusores de rocha vulcânica e elementos sensoriais que desaceleram o ritmo.',
    icon: Feather
  }
];

export const CollectionsGrid: React.FC<CollectionsGridProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-16 sm:py-24 border-b border-[#EAEAE4] bg-[#FBFBF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#EAEAE4] gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#283628] font-semibold block mb-1">
              Arquitetura de Produtos
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-normal text-[#1C1D20]">
              Coleções Modulares
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5E626B] max-w-md">
            Organização autoral dividida por princípios de uso, matéria-prima e ressonância estética.
          </p>
        </div>

        {/* Modular Graphic Grid in Warm Stone Styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E2E2DC] border border-[#E2E2DC] rounded-2xl overflow-hidden shadow-xs">
          {CATEGORY_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.category}
                onClick={() => onSelectCategory(item.category)}
                className="group relative bg-[#FBFBF9] hover:bg-[#F4F4EE] p-7 sm:p-8 text-left transition-all duration-300 flex flex-col justify-between min-h-[220px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#283628]"
              >
                {/* Top Metas */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-semibold text-[#8C8F96] group-hover:text-[#283628] transition-colors">
                      {item.index}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#C8C8C0]" />
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#6A6D74]">
                      {item.tagline}
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-[#F2F2EC] border border-[#DCDCD4] text-[#5E626B] group-hover:text-[#1C1D20] group-hover:border-[#283628] group-hover:bg-[#283628]/5 transition-all">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Bottom Title & Description */}
                <div className="mt-8">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-[#5E626B] group-hover:text-[#283628] transition-colors" />
                    <h3 className="font-display text-xl font-bold text-[#1C1D20] group-hover:text-[#283628] transition-colors">
                      {item.category}
                    </h3>
                  </div>
                  <p className="text-xs text-[#6A6D74] leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Subtle bottom indicator line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-[#283628] transition-colors duration-300" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
