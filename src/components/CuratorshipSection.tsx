import React from 'react';

export const CuratorshipSection: React.FC = () => {
  const criteria = [
    {
      title: 'Estilo',
      subtitle: 'Atemporalidade sem excessos',
      description: 'Rejeitamos o efêmero descartável. Nossas peças carregam silhuetas gráficas puras que mantêm vigor estético ao longo de décadas.',
      accent: '01'
    },
    {
      title: 'Utilidade',
      subtitle: 'Ergonomia & propósito honesto',
      description: 'Cada botão, dobra ou articulação existe para servir a uma função tangível. Sem recursos ornamentais supérfluos que atrapalhem o fluxo diário.',
      accent: '02'
    },
    {
      title: 'Qualidade',
      subtitle: 'Matéria-prima de alta linhagem',
      description: 'Titânio aeroespacial, alumínio usinado em CNC de 5 eixos, rochas minerais e couros vegetais. Rigor construtivo sem concessões industriais.',
      accent: '03'
    },
    {
      title: 'Personalidade',
      subtitle: 'Expressão individual sutil',
      description: 'Objetos que não gritam, mas afirmam uma presença inconfundível. Para pessoas que constroem ambientes com assinatura e calma mental.',
      accent: '04'
    }
  ];

  return (
    <section className="py-20 sm:py-28 border-b border-[#EAEAE4] bg-[#F4F4EE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column Statement */}
          <div className="lg:col-span-5">
            <span className="text-xs font-mono uppercase tracking-widest text-[#283628] font-semibold block mb-2">
              Manifesto Editorial
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-normal text-[#1C1D20] tracking-tight leading-[1.12]">
              A Curadoria <br />
              como Filtro <br />
              do Ruído.
            </h2>
            <p className="mt-6 text-sm text-[#5E626B] leading-relaxed">
              Em um mundo saturado de produção em massa e descartabilidade precoce, a FORMA opera como um crivo rigoroso. Não vendemos milhares de itens aleatórios: apenas objetos que merecem ocupar espaço na sua vida.
            </p>

            <div className="mt-8 p-5 bg-white border border-[#E2E2DC] rounded-xl shadow-xs">
              <span className="text-xs font-mono text-[#283628] block uppercase tracking-wider mb-1 font-semibold">
                Compromisso FORMA
              </span>
              <p className="text-xs text-[#6A6D74] leading-relaxed">
                Menos de 3% dos protótipos e objetos avaliados pelo nosso conselho de design entram para o catálogo oficial da marca.
              </p>
            </div>
          </div>

          {/* Right Column: 4 Criteria Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {criteria.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-[#E6E6DF] p-6 rounded-xl relative overflow-hidden transition-all duration-300 hover:border-[#D0D0C8] shadow-xs group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-[#283628] font-bold">
                    CRITÉRIO {item.accent}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#DCDCD4] group-hover:bg-[#283628] transition-colors" />
                </div>

                <h3 className="font-display text-xl font-medium text-[#1C1D20] group-hover:text-[#283628] transition-colors">
                  {item.title}
                </h3>
                <span className="text-xs font-medium text-[#7C828E] block mt-1">
                  {item.subtitle}
                </span>

                <p className="mt-4 text-xs text-[#6A6D74] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
