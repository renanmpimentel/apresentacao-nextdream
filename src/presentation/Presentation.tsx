import { useState, useEffect, useCallback, useRef, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight, Heart, Clock, HandHeart, Users, Sparkles, Star, Quote, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logoImg from '../assets/logo.png';
import grandmaImg from '../assets/slides/grandma.jpg';
import handsImg from '../assets/slides/hands.jpg';
import togethernessImg from '../assets/slides/togetherness.jpg';
import communityImg from '../assets/slides/community.jpg';
import dandelionImg from '../assets/slides/dandelion.jpg';
import starsImg from '../assets/slides/stars.jpg';

const BRAND = '#D91B8C';
const BRAND_DARK = '#B0146E';
const BRAND_LIGHT = '#F9E0F0';

const IMG = {
  grandma: grandmaImg,
  hands: handsImg,
  togetherness: togethernessImg,
  community: communityImg,
  dandelion: dandelionImg,
  stars: starsImg,
};

// ─── SLIDE FOOTER (logo + page) ───
function SlideFooter({ slideNum, total, dark = false }: { slideNum: number; total: number; dark?: boolean }) {
  return (
    <div className={`absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-2 md:px-6 md:py-3 ${dark ? 'bg-black/30' : 'bg-white/60 backdrop-blur-sm'}`}>
      <img src={logoImg} alt="NextDream" className={`h-4 w-auto md:h-5 ${dark ? 'brightness-0 invert opacity-60' : 'opacity-50'}`} />
      <span className={`text-xs ${dark ? 'text-white/50' : 'text-gray-400'}`}>{slideNum} / {total}</span>
    </div>
  );
}

// ─── SLIDE WRAPPER ───
function SlideWrap({ children, slideNum, total, dark = false }: { children: ReactNode; slideNum: number; total: number; dark?: boolean }) {
  return (
    <div className="relative h-full w-full">
      {children}
    </div>
  );
}

const TOTAL = 10;

// ─── SLIDE 1: CAPA EMOCIONAL ───
function SlideCover() {
  return (
    <SlideWrap slideNum={1} total={TOTAL} dark>
      <div className="relative h-full w-full overflow-hidden">
        <img src={IMG.dandelion} alt="" className="absolute inset-0 w-full h-full object-cover" />
        {/* Gradient overlay: stronger left for readability */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.15) 100%)' }} />
        {/* Accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: BRAND }} />

        <div className="relative z-10 flex h-full flex-col justify-center px-6 py-10 sm:px-10 md:pl-20 md:pr-16">
          {/* Tag line */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
            <div className="mb-6 flex items-center gap-3 md:mb-8">
              <div className="w-8 h-px" style={{ background: BRAND }} />
              <span className="text-xs tracking-[0.3em] uppercase" style={{ color: BRAND, fontFamily: 'Inter' }}>
                Uma plataforma feita de amor
              </span>
            </div>
          </motion.div>

          {/* Logo */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}>
            <img src={logoImg} alt="NextDream" className="mb-6 h-10 w-auto brightness-0 invert md:mb-10 md:h-14" />
          </motion.div>

          {/* Main phrase — serif for emotional weight */}
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }} className="max-w-xl">
            <h1
              className="mb-4 text-3xl leading-[1.15] text-white sm:text-4xl md:text-[2.6rem]"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}
            >
              Porque os sonhos mais bonitos{' '}
              <span className="italic" style={{ color: '#F4A3D1' }}>não custam dinheiro.</span>
            </h1>
          </motion.div>

          {/* Sub-phrase — sans-serif, lighter, staggered words */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.6 }} className="max-w-lg">
            <p className="text-base tracking-wide text-white/60 sm:text-lg" style={{ fontFamily: 'Inter' }}>
              Custam{' '}
              <span className="text-white/90" style={{ fontWeight: 500 }}>presença</span>.{' '}
              Custam{' '}
              <span className="text-white/90" style={{ fontWeight: 500 }}>carinho</span>.{' '}
              Custam{' '}
              <span className="text-white/90" style={{ fontWeight: 500 }}>tempo</span>.
            </p>
          </motion.div>

          {/* Decorative bottom accent */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.8 }} className="mt-8 flex items-center gap-3 md:mt-12">
            <Heart className="w-3.5 h-3.5" style={{ color: BRAND }} fill={BRAND} />
            <div className="w-16 h-px" style={{ background: `linear-gradient(to right, ${BRAND}, transparent)` }} />
          </motion.div>
        </div>
      </div>
    </SlideWrap>
  );
}

// ─── SLIDE 2: A DOR ───
function SlideThePain() {
  return (
    <SlideWrap slideNum={2} total={TOTAL} dark>
      <div className="relative h-full w-full overflow-hidden">
        <img src={IMG.hands} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10 flex h-full flex-col justify-end p-6 pb-14 sm:p-10 sm:pb-16 md:p-16 md:pb-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="max-w-3xl">
            <p className="mb-3 text-xs uppercase tracking-widest text-pink-300 md:mb-4 md:text-sm">O que nos move</p>
            <h2 className="mb-4 text-3xl leading-tight text-white sm:text-4xl md:mb-6 md:text-5xl">
              Existem pessoas que só precisam de
              <span className="text-pink-400"> um abraço</span>,
              <span className="text-pink-300"> uma visita</span>,
              <span className="text-pink-200"> uma palavra</span>.
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              Pacientes em tratamento contra o câncer enfrentam muito mais que a doença.
              Enfrentam a solidão, o medo, e a sensação de que seus sonhos ficaram para trás.
            </p>
          </motion.div>
        </div>
      </div>
    </SlideWrap>
  );
}

// ─── SLIDE 3: HISTÓRIAS REAIS ───
function SlideStories() {
  const stories = [
    { icon: '👵', name: 'Dona Maria, 72 anos', condition: 'Câncer de mama', dream: '"Eu só queria alguém para me ensinar a fazer videochamada com meu neto que mora longe."', result: 'Uma voluntária foi até sua casa e ensinou. Hoje, Dona Maria liga toda semana.' },
    { icon: '👦', name: 'Pedro, 9 anos', condition: 'Leucemia', dream: '"Eu queria que alguém lesse histórias de super-herói pra mim no hospital."', result: 'Um apoiador leu para ele durante 3 semanas. Pedro diz que ganhou superpoderes.' },
    { icon: '🧑', name: 'Carlos, 45 anos', condition: 'Linfoma', dream: '"Eu queria aprender a tocar violão antes de terminar o tratamento."', result: 'Um músico voluntário deu aulas semanais. Carlos tocou pela primeira vez no dia da alta.' },
  ];

  return (
    <SlideWrap slideNum={3} total={TOTAL}>
      <div className="flex h-full flex-col p-5 pb-12 md:p-12 md:pb-16" style={{ background: `linear-gradient(135deg, ${BRAND_LIGHT} 0%, white 100%)` }}>
        <div className="mb-5 md:mb-8">
          <p className="mb-2 text-xs uppercase tracking-widest md:text-sm" style={{ color: BRAND }}>Sonhos reais, apoio real</p>
          <h2 className="text-2xl text-gray-900 sm:text-3xl md:text-4xl">Cada sonho é uma história de <span style={{ color: BRAND }}>esperança</span></h2>
        </div>
        <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {stories.map((s, i) => (
            <motion.div key={s.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.15 }} className="flex flex-col rounded-2xl border border-pink-50 bg-white p-4 shadow-lg shadow-pink-100/50 md:p-6">
              <div className="mb-2 text-3xl md:mb-3 md:text-4xl">{s.icon}</div>
              <h3 className="text-base text-gray-900 md:text-lg">{s.name}</h3>
              <p className="text-xs text-gray-400 mb-4">{s.condition}</p>
              <div className="flex-1">
                <div className="flex gap-2 mb-3">
                  <Quote className="w-4 h-4 shrink-0 mt-1" style={{ color: BRAND }} />
                  <p className="text-gray-600 italic text-sm leading-relaxed">{s.dream}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-pink-50">
                <p className="text-xs" style={{ color: BRAND_DARK }}>
                  <Star className="w-3 h-3 inline mr-1" fill={BRAND} style={{ color: BRAND }} />
                  {s.result}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideWrap>
  );
}

// ─── SLIDE 4: O QUE É O NEXTDREAM ───
function SlideWhatIs() {
  return (
    <SlideWrap slideNum={4} total={TOTAL}>
      <div className="flex h-full flex-col overflow-hidden md:flex-row">
        <div className="flex w-full flex-col justify-center p-6 pb-8 md:w-1/2 md:p-12 md:pb-16" style={{ background: `linear-gradient(180deg, ${BRAND} 0%, ${BRAND_DARK} 100%)` }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Sparkles className="mb-4 h-8 w-8 text-pink-200 md:mb-6 md:h-10 md:w-10" />
            <h2 className="mb-4 text-2xl leading-tight text-white sm:text-3xl md:mb-6 md:text-4xl">
              Uma plataforma que conecta<br />
              <span className="text-pink-200">quem precisa de carinho</span><br />
              a <span className="text-pink-200">quem tem carinho para dar</span>.
            </h2>
            <p className="mb-6 leading-relaxed text-white/70 md:mb-8">
              O NextDream é um espaço seguro onde pacientes em tratamento oncológico
              cadastram sonhos simples — e pessoas com coração grande se oferecem para realizá-los.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Sem dinheiro', 'Sem burocracia', 'Com muito amor'].map(tag => (
                <span key={tag} className="px-4 py-2 rounded-full bg-white/10 text-white text-sm border border-white/20">{tag}</span>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="relative min-h-[24vh] w-full md:w-1/2 md:min-h-0">
          <img src={IMG.grandma} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${BRAND}20, transparent)` }} />
        </div>
      </div>
    </SlideWrap>
  );
}

// ─── SLIDE 5: COMO FUNCIONA ───
function SlideHowItWorks() {
  const steps = [
    { icon: <Heart className="w-6 h-6" />, title: 'O paciente sonha', desc: 'Cadastra um desejo simples: uma visita, uma carta, aprender algo novo, ouvir uma música...' },
    { icon: <Users className="w-6 h-6" />, title: 'O apoiador encontra', desc: 'Explora sonhos publicados e escolhe aquele que toca seu coração.' },
    { icon: <HandHeart className="w-6 h-6" />, title: 'A proposta nasce', desc: 'Envia uma proposta dizendo como pode ajudar — com seu tempo, talento ou presença.' },
    { icon: <Clock className="w-6 h-6" />, title: 'A conexão acontece', desc: 'Chat seguro e mediado. Sem dados pessoais expostos. Só carinho e cuidado.' },
    { icon: <Sparkles className="w-6 h-6" />, title: 'O sonho se realiza', desc: 'E a gente celebra junto. Porque cada sonho realizado é uma vitória de todos.' },
  ];

  return (
    <SlideWrap slideNum={5} total={TOTAL}>
      <div className="flex h-full flex-col bg-white p-5 pb-12 md:p-12 md:pb-16">
        <div className="mb-5 md:mb-8">
          <p className="mb-2 text-xs uppercase tracking-widest md:text-sm" style={{ color: BRAND }}>Simples e acolhedor</p>
          <h2 className="text-2xl text-gray-900 sm:text-3xl md:text-4xl">Como funciona?</h2>
        </div>
        <div className="flex-1 flex items-center">
          <div className="w-full flex flex-col gap-2">
            {steps.map((step, i) => (
              <motion.div key={step.title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.1 }} className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-pink-50/50 md:gap-5 md:p-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-white" style={{ background: BRAND }}>{step.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-300">0{i + 1}</span>
                    <h3 className="text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500">{step.desc}</p>
                </div>
                {i < steps.length - 1 && <ArrowRight className="mt-3 hidden h-4 w-4 shrink-0 text-gray-200 md:block" />}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}

// ─── SLIDE 6: VALORES / TEMPO ───
function SlideValues() {
  return (
    <SlideWrap slideNum={6} total={TOTAL} dark>
      <div className="relative h-full w-full overflow-hidden">
        <img src={IMG.togetherness} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/20" />
        <div className="relative z-10 flex h-full flex-col justify-center px-6 pb-10 pt-10 sm:px-10 md:px-16 md:pb-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="max-w-2xl">
            <Clock className="mb-4 h-8 w-8 text-pink-300 md:mb-6 md:h-12 md:w-12" />
            <h2 className="mb-6 text-3xl leading-tight text-white sm:text-4xl md:mb-8 md:text-5xl">
              A moeda mais valiosa<br />do mundo é o <span className="text-pink-400">tempo</span>.
            </h2>
            <p className="mb-6 text-base leading-relaxed text-white/80 md:mb-8 md:text-xl">
              No NextDream, ninguém doa dinheiro.<br />
              As pessoas doam o que têm de mais precioso:
            </p>
            <div className="grid max-w-lg grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
              {[
                { emoji: '⏰', label: 'Seu tempo' },
                { emoji: '💛', label: 'Seu carinho' },
                { emoji: '🎵', label: 'Seu talento' },
                { emoji: '🤝', label: 'Sua presença' },
                { emoji: '📖', label: 'Sua história' },
                { emoji: '🌟', label: 'Sua esperança' },
              ].map(v => (
                <div key={v.label} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                  <span className="text-2xl">{v.emoji}</span>
                  <span className="text-white">{v.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SlideWrap>
  );
}

// ─── SLIDE 7: IMPACTO / NÚMEROS ───
function SlideImpact() {
  const metrics = [
    { value: '100%', label: 'Gratuito', desc: 'Sem taxas, sem custos, sem barreiras' },
    { value: '3', label: 'Perfis', desc: 'Paciente, Apoiador e Administrador' },
    { value: '30+', label: 'Telas', desc: 'Experiência completa e acolhedora' },
    { value: '∞', label: 'Amor', desc: 'Porque carinho não tem limite' },
  ];

  return (
    <SlideWrap slideNum={7} total={TOTAL}>
      <div className="flex h-full flex-col p-5 pb-12 md:p-12 md:pb-16" style={{ background: `linear-gradient(135deg, white 0%, ${BRAND_LIGHT} 100%)` }}>
        <div className="mb-6 md:mb-10">
          <p className="mb-2 text-xs uppercase tracking-widest md:text-sm" style={{ color: BRAND }}>Nosso impacto</p>
          <h2 className="text-2xl text-gray-900 sm:text-3xl md:text-4xl">Números que representam <span style={{ color: BRAND }}>vidas</span></h2>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-3 items-center md:grid-cols-4 md:gap-6">
          {metrics.map((m, i) => (
            <motion.div key={m.label} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.1 }} className="flex flex-col items-center gap-2 rounded-3xl border border-pink-50 bg-white p-4 text-center shadow-lg shadow-pink-100/50 md:gap-3 md:p-8">
              <span className="text-3xl md:text-5xl" style={{ color: BRAND }}>{m.value}</span>
              <span className="text-base text-gray-800 md:text-lg">{m.label}</span>
              <span className="text-xs text-gray-400">{m.desc}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-5 flex items-start gap-4 rounded-2xl border border-pink-50 bg-white p-4 shadow-sm md:mt-8 md:items-center md:gap-6 md:p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full md:h-16 md:w-16" style={{ background: BRAND_LIGHT }}>
            <HandHeart className="h-6 w-6 md:h-8 md:w-8" style={{ color: BRAND }} />
          </div>
          <div>
            <h3 className="text-gray-900 mb-1">Sonhos não têm preço. Têm <span style={{ color: BRAND }}>significado</span>.</h3>
            <p className="text-sm text-gray-500">Cada sonho realizado reacende a esperança de quem luta contra o câncer todos os dias.</p>
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}

// ─── SLIDE 8: QUEM PODE AJUDAR ───
function SlideWhoCanHelp() {
  return (
    <SlideWrap slideNum={8} total={TOTAL}>
      <div className="flex h-full flex-col overflow-hidden md:flex-row">
        <div className="relative min-h-[24vh] w-full md:w-1/2 md:min-h-0">
          <img src={IMG.community} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white" />
        </div>
        <div className="flex w-full flex-col justify-center bg-white p-5 pb-12 md:w-1/2 md:p-12 md:pb-16">
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <p className="mb-2 text-xs uppercase tracking-widest md:mb-3 md:text-sm" style={{ color: BRAND }}>Todo mundo pode ajudar</p>
            <h2 className="mb-5 text-2xl leading-tight text-gray-900 sm:text-3xl md:mb-6 md:text-4xl">
              Você também pode fazer parte dessa <span style={{ color: BRAND }}>corrente de amor</span>
            </h2>
            <div className="flex flex-col gap-4 md:gap-5">
              {[
                { title: 'Profissionais de saúde', desc: 'Indiquem pacientes que precisam de apoio emocional. Nós cuidamos do resto com segurança e carinho.' },
                { title: 'Voluntários e comunidades', desc: 'Ampliem o alcance dos sonhos. Juntos, chegamos a mais pessoas que precisam de um abraço.' },
                { title: 'Pessoas como você', desc: 'Doe seu tempo, seu talento ou simplesmente sua presença. Um gesto seu pode transformar um dia inteiro.' },
                { title: 'Quem quer inspirar outros', desc: 'Compartilhe sonhos reais. Uma história pode ser a ponte entre alguém que sofre e alguém que se importa.' },
              ].map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.1 }} className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: BRAND }} />
                  <div>
                    <h4 className="text-gray-900 mb-0.5">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SlideWrap>
  );
}

// ─── SLIDE 9: SEGURANÇA ───
function SlideSecurity() {
  return (
    <SlideWrap slideNum={9} total={TOTAL} dark>
      <div className="flex h-full flex-col bg-gray-900 p-5 pb-12 md:p-12 md:pb-16">
        <div className="mb-6 md:mb-10">
          <p className="mb-2 text-xs uppercase tracking-widest text-pink-400 md:text-sm">Confiança e segurança</p>
          <h2 className="text-2xl text-white sm:text-3xl md:text-4xl">Cuidamos de quem cuida</h2>
        </div>
        <div className="grid flex-1 grid-cols-1 gap-4 items-center md:grid-cols-3 md:gap-6">
          {[
            { icon: '🔒', title: 'Chat Moderado', desc: 'Todas as conversas são mediadas. Nenhum dado pessoal é exposto sem consentimento.' },
            { icon: '🛡️', title: 'Painel Admin', desc: 'Equipe de moderação acompanha propostas, mensagens e denúncias em tempo real.' },
            { icon: '👁️', title: 'Auditoria', desc: 'Cada ação é registrada. Transparência total para proteger todos os envolvidos.' },
            { icon: '🚫', title: 'Filtro de Conteúdo', desc: 'Bloqueio automático de conteúdo inadequado. Ambiente seguro para todos.' },
            { icon: '✅', title: 'Verificação', desc: 'Apoiadores passam por verificação antes de interagir com pacientes.' },
            { icon: '📋', title: 'Diretrizes Claras', desc: 'Termos de uso e diretrizes de comunidade protegem a experiência de todos.' },
          ].map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08 }} className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <span className="text-3xl mb-3 block">{item.icon}</span>
              <h3 className="text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideWrap>
  );
}

// ─── SLIDE 10: ENCERRAMENTO EMOCIONAL ───
function SlideClosing() {
  return (
    <SlideWrap slideNum={10} total={TOTAL} dark>
      <div className="relative h-full w-full overflow-hidden">
        <img src={IMG.stars} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 pb-10 pt-10 text-center md:px-12 md:pb-12">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="max-w-2xl">
            <img src={logoImg} alt="NextDream" className="mx-auto mb-6 h-10 w-auto brightness-0 invert md:mb-8 md:h-12" />
            <h2 className="mb-5 text-3xl leading-tight text-white sm:text-4xl md:mb-6 md:text-5xl">
              Você não precisa de dinheiro<br />para mudar uma vida.
            </h2>
            <p className="mb-3 text-lg text-white/70 md:mb-4 md:text-xl">
              Precisa de coração.
            </p>
            <p className="mb-8 text-base text-pink-300 md:mb-10 md:text-lg">
              E se você está lendo isso, você já tem.
            </p>
            <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-white/40 md:mt-12 md:text-sm">
              <Heart className="w-3 h-3" />
              <span>NextDream — Feito com amor, para quem precisa de amor</span>
              <Heart className="w-3 h-3" />
            </div>
          </motion.div>
        </div>
      </div>
    </SlideWrap>
  );
}

// ─── SLIDES ARRAY ───
export const slides = [
  { id: 'cover', render: SlideCover },
  { id: 'pain', render: SlideThePain },
  { id: 'stories', render: SlideStories },
  { id: 'what-is', render: SlideWhatIs },
  { id: 'how', render: SlideHowItWorks },
  { id: 'values', render: SlideValues },
  { id: 'impact', render: SlideImpact },
  { id: 'who-can-help', render: SlideWhoCanHelp },
  { id: 'security', render: SlideSecurity },
  { id: 'closing', render: SlideClosing },
];

export function PresentationExport() {
  return (
    <main data-testid="presentation-export" className="bg-neutral-950 px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6 md:gap-8">
        {slides.map((slide, index) => {
          const SlideComponent = slide.render;

          return (
            <section
              key={slide.id}
              data-testid={`presentation-export-slide-${index + 1}`}
              data-export-slide={slide.id}
              className="mx-auto aspect-[16/9] w-full overflow-hidden rounded-[32px] bg-white shadow-[0_32px_100px_rgba(0,0,0,0.35)] print:rounded-none print:shadow-none"
            >
              <SlideComponent />
            </section>
          );
        })}
      </div>
    </main>
  );
}

// ─── MAIN COMPONENT ───
export default function Presentation() {
  const [current, setCurrent] = useState(0);
  const total = slides.length;
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const prev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), []);
  const next = useCallback(() => setCurrent((c) => Math.min(total - 1, c + 1)), [total]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  const handleTouchStart = useCallback((event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback((event: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    const touch = event.changedTouches[0];
    if (!start || !touch) {
      return;
    }

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    touchStartRef.current = null;

    if (Math.abs(deltaX) < 60 || Math.abs(deltaX) <= Math.abs(deltaY)) {
      return;
    }

    if (deltaX < 0) {
      next();
      return;
    }

    prev();
  }, [next, prev]);

  const SlideComponent = slides[current].render;

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-gray-950">
      <div
        data-testid="presentation-stage"
        className="relative h-full w-full overflow-hidden bg-white"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[current].id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute inset-0 overflow-y-auto md:overflow-hidden"
          >
            <SlideComponent />
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between p-3 md:p-5">
          <div className="pointer-events-auto flex items-center gap-3 rounded-full bg-black/30 px-3 py-2 text-white backdrop-blur-md">
            <img src={logoImg} alt="NextDream" className="h-4 w-auto brightness-0 invert opacity-80 md:h-5" />
            <span className="text-xs tracking-[0.18em] text-white/70 uppercase hidden sm:inline">Apresentação</span>
            <span className="text-xs text-white/80">{current + 1} / {total}</span>
          </div>
          <div className="hidden rounded-full bg-black/25 px-3 py-2 text-[11px] text-white/60 backdrop-blur-md md:block">
            Use ← → ou espaço para navegar
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-30 flex items-center justify-between px-3 md:px-5">
          <button
            aria-label="Slide anterior"
            onClick={prev}
            disabled={current === 0}
            className="pointer-events-auto rounded-full border border-white/15 bg-black/30 p-3 text-white backdrop-blur-md transition hover:bg-black/45 disabled:cursor-not-allowed disabled:opacity-25"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Próximo slide"
            onClick={next}
            disabled={current === total - 1}
            className="pointer-events-auto rounded-full border border-white/15 bg-black/30 p-3 text-white backdrop-blur-md transition hover:bg-black/45 disabled:cursor-not-allowed disabled:opacity-25"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex justify-center p-3 md:p-5">
          <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-black/30 px-3 py-2 backdrop-blur-md">
            {slides.map((s, i) => (
              <button
                key={s.id}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setCurrent(i)}
                className="h-2.5 w-2.5 rounded-full transition md:h-3 md:w-3"
                style={{
                  background: i === current ? '#ffffff' : 'rgba(255,255,255,0.28)',
                  transform: i === current ? 'scale(1.2)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
