import React, { useState } from 'react';
import { Mail, MapPin, Phone, CheckCircle2, ArrowRight } from 'lucide-react';
import { HERO_IMAGE, AUDIO_SPEAKER_IMAGE } from '../data/products';

interface AboutViewProps {
  onExploreCatalog: () => void;
  onStartCuratedSelection: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onExploreCatalog,
  onStartCuratedSelection
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Curadoria personalizada');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FBFBF9] min-h-screen text-[#1C1D20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Brand Intro */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#283628] font-semibold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#283628]" />
            <span>Sobre a FORMA</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-normal tracking-tight text-[#1C1D20] leading-[1.1]">
            Design que desafia o ordinário.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#5E626B] leading-relaxed">
            Nascida da necessidade de uma alternativa ao consumo rápido e homogêneo, a FORMA é uma concept store autoral que investiga o equilíbrio entre arquitetura, precisão de materiais e calor sensorial.
          </p>
        </div>

        {/* 2-Column Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-20 border-b border-[#EAEAE4]">
          <div className="lg:col-span-6 space-y-5 text-sm sm:text-base text-[#5E626B] leading-relaxed">
            <h2 className="font-display text-2xl sm:text-3xl font-normal text-[#1C1D20] tracking-tight">
              Acreditamos em objetos com alma estrutural.
            </h2>
            <p>
              Não acreditamos em acumulação decorativa. Cada item selecionado no acervo da FORMA cumpre uma tripla exigência: relevância formal, excelência tátil e longevidade utilitária.
            </p>
            <p>
              Trabalhamos em conjunto com estúdios independentes, oficinas autorais e artesãos contemporâneos do Brasil, Japão, Suíça e Escandinávia.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={onStartCuratedSelection}
                className="px-6 py-3.5 bg-[#283628] hover:bg-[#1E281E] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-xs"
              >
                <span>Conhecer "Monte sua Seleção"</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onExploreCatalog}
                className="px-5 py-3.5 bg-[#F4F4EE] hover:bg-[#EAEAE4] text-[#1C1D20] border border-[#DCDCD4] text-xs sm:text-sm font-medium rounded-lg transition-colors"
              >
                <span>Explorar Catálogo</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#F2F2EC] border border-[#E6E6DF] shadow-xs">
              <img
                src={HERO_IMAGE}
                alt="Atelier FORMA"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#F2F2EC] border border-[#E6E6DF] translate-y-6 shadow-xs">
              <img
                src={AUDIO_SPEAKER_IMAGE}
                alt="Design autoral"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Physical Spaces & Contact Details */}
        <div className="py-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#283628] font-semibold block mb-2">
                Atendimento & Concierge
              </span>
              <h2 className="font-display text-3xl font-normal text-[#1C1D20]">
                Fale com a nossa equipe
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#5E626B]">
                Precisa de orientação para mobiliar um projeto arquitetônico ou encomendar presentes corporativos numerados?
              </p>
            </div>

            <div className="space-y-4 pt-2 text-xs sm:text-sm">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-[#E6E6DF] shadow-xs">
                <MapPin className="w-5 h-5 text-[#283628] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#1C1D20] font-medium">Concept Gallery São Paulo</strong>
                  <span className="text-[#6A6D74] text-xs">Alameda Gabriel Monteiro da Silva, 1420 — Jardim América</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-[#E6E6DF] shadow-xs">
                <Mail className="w-5 h-5 text-[#283628] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#1C1D20] font-medium">Concierge Digital</strong>
                  <span className="text-[#6A6D74] text-xs">concierge@forma.design · Resposta em até 2 horas</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-[#E6E6DF] shadow-xs">
                <Phone className="w-5 h-5 text-[#283628] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#1C1D20] font-medium">Atendimento Direto</strong>
                  <span className="text-[#6A6D74] text-xs">+55 (11) 98720-0044 · Segunda a Sábado, das 10h às 19h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#E6E6DF] rounded-2xl p-6 sm:p-10 shadow-xs">
            {formSubmitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#283628]/10 border border-[#283628]/20 flex items-center justify-center mx-auto text-[#283628]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#1C1D20]">
                  Mensagem Enviada
                </h3>
                <p className="text-xs sm:text-sm text-[#5E626B] max-w-sm mx-auto">
                  Agradecemos seu contato. Nosso concierge de curadoria retornará para {email} nas próximas horas.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 px-4 py-2 bg-[#F4F4EE] border border-[#DCDCD4] text-xs text-[#5E626B] hover:text-[#1C1D20] rounded-lg transition-colors"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-display text-xl font-bold text-[#1C1D20]">
                  Envie uma mensagem direta
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#6A6D74] mb-1 font-semibold">
                      Seu Nome
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Beatriz Lima"
                      className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#DCDCD4] rounded-lg text-xs text-[#1C1D20] placeholder-[#8C8F96] focus:outline-none focus:border-[#283628] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#6A6D74] mb-1 font-semibold">
                      Seu E-mail
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="beatriz@estudio.com.br"
                      className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#DCDCD4] rounded-lg text-xs text-[#1C1D20] placeholder-[#8C8F96] focus:outline-none focus:border-[#283628] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#6A6D74] mb-1 font-semibold">
                    Assunto
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#DCDCD4] rounded-lg text-xs text-[#1C1D20] focus:outline-none focus:border-[#283628] transition-colors"
                  >
                    <option value="Curadoria personalizada">Curadoria personalizada para ambiente</option>
                    <option value="Projeto de arquitetura">Projetos de arquitetura / corporativo</option>
                    <option value="Dúvida sobre produto">Dúvida sobre produto ou especificações</option>
                    <option value="Outro">Outro assunto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#6A6D74] mb-1 font-semibold">
                    Mensagem
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Descreva seu projeto, dúvidas sobre dimensões ou interesses de seleção..."
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#DCDCD4] rounded-lg text-xs text-[#1C1D20] placeholder-[#8C8F96] focus:outline-none focus:border-[#283628] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#283628] hover:bg-[#1E281E] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#283628]"
                >
                  Enviar Mensagem ao Concierge
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
