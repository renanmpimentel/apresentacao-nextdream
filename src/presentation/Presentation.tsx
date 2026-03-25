import { useState, useEffect, useCallback, useRef, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight, Heart, Printer, Clock, HandHeart, Users, Sparkles, Star, Quote, ArrowRight, Loader2, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logoImg from '../assets/logo.png';
import { jsPDF } from 'jspdf';

const BRAND = '#D91B8C';
const BRAND_DARK = '#B0146E';
const BRAND_LIGHT = '#F9E0F0';

const IMG = {
  grandma: 'https://images.unsplash.com/photo-1593100126453-19b562a800c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFuZG1vdGhlciUyMGdyYW5kY2hpbGQlMjBodWdnaW5nJTIwbG92ZXxlbnwxfHx8fDE3NzQyNzQ4ODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  hands: 'https://images.unsplash.com/photo-1581612129334-551ccd069e62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWluYm93JTIwY29sb3JmdWwlMjBoYW5kcyUyMHRvZ2V0aGVyJTIwc29saWRhcml0eXxlbnwxfHx8fDE3NzQyNzUxMzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  togetherness: 'https://images.unsplash.com/photo-1743956242693-cc024361ae9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwcGF0aWVudCUyMGhvbGRpbmclMjBoYW5kcyUyMHZvbHVudGVlciUyMGhvc3BpdGFsJTIwd2FybXRoJTIwY2FyZXxlbnwxfHx8fDE3NzQyNzU2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  community: 'https://images.unsplash.com/photo-1630068846062-3ffe78aa5049?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjB0b2dldGhlciUyMGRpdmVyc2l0eSUyMGNvbW11bml0eSUyMGhlYXJ0fGVufDF8fHx8MTc3NDI3NDg4NHww&ixlib=rb-4.1.0&q=80&w=1080',
  dandelion: 'https://images.unsplash.com/photo-1765947378663-9e7ad34ca310?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGJhbGxvb25zJTIwY2hpbGRyZW4lMjBjZWxlYnJhdGlvbiUyMGpveXxlbnwxfHx8fDE3NzQyNzUxMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  family: 'https://images.unsplash.com/photo-1644665088789-b5a3de58f278?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjByZXVuaW9uJTIwZW1icmFjZSUyMHRlYXJzJTIwam95fGVufDF8fHx8MTc3NDI3NDg4NXww&ixlib=rb-4.1.0&q=80&w=1080',
  mentor: 'https://images.unsplash.com/photo-1700462246313-257db1ff61b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjB3b21hbiUyMHNtaWxpbmclMjBmbG93ZXJzJTIwY29sb3JmdWwlMjBnYXJkZW58ZW58MXx8fHwxNzc0Mjc1MTM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  stars: 'https://images.unsplash.com/photo-1773408922182-e547cc3e0a93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwcGFpbnRpbmclMjBjb2xvcmZ1bCUyMGFydCUyMGhhcHB5JTIwaGFuZHN8ZW58MXx8fHwxNzc0Mjc1MTM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
};

// ─── SLIDE FOOTER (logo + page) ───
function SlideFooter({ slideNum, total, dark = false }: { slideNum: number; total: number; dark?: boolean }) {
  return (
    <div className={`absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-3 ${dark ? 'bg-black/30' : 'bg-white/60 backdrop-blur-sm'}`}>
      <img src={logoImg} alt="NextDream" className={`h-5 w-auto ${dark ? 'brightness-0 invert opacity-60' : 'opacity-50'}`} />
      <span className={`text-xs ${dark ? 'text-white/50' : 'text-gray-400'}`}>{slideNum} / {total}</span>
    </div>
  );
}

// ─── SLIDE WRAPPER ───
function SlideWrap({ children, slideNum, total, dark = false }: { children: ReactNode; slideNum: number; total: number; dark?: boolean }) {
  return (
    <div className="relative h-full w-full">
      {children}
      <SlideFooter slideNum={slideNum} total={total} dark={dark} />
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

        <div className="relative z-10 h-full flex flex-col justify-center pl-20 pr-16">
          {/* Tag line */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px" style={{ background: BRAND }} />
              <span className="text-xs tracking-[0.3em] uppercase" style={{ color: BRAND, fontFamily: 'Inter' }}>
                Uma plataforma feita de amor
              </span>
            </div>
          </motion.div>

          {/* Logo */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}>
            <img src={logoImg} alt="NextDream" className="h-14 w-auto brightness-0 invert mb-10" />
          </motion.div>

          {/* Main phrase — serif for emotional weight */}
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }} className="max-w-xl">
            <h1
              className="text-[2.6rem] leading-[1.2] text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}
            >
              Porque os sonhos mais bonitos{' '}
              <span className="italic" style={{ color: '#F4A3D1' }}>não custam dinheiro.</span>
            </h1>
          </motion.div>

          {/* Sub-phrase — sans-serif, lighter, staggered words */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.6 }} className="max-w-lg">
            <p className="text-lg text-white/60 tracking-wide" style={{ fontFamily: 'Inter' }}>
              Custam{' '}
              <span className="text-white/90" style={{ fontWeight: 500 }}>presença</span>.{' '}
              Custam{' '}
              <span className="text-white/90" style={{ fontWeight: 500 }}>carinho</span>.{' '}
              Custam{' '}
              <span className="text-white/90" style={{ fontWeight: 500 }}>tempo</span>.
            </p>
          </motion.div>

          {/* Decorative bottom accent */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.8 }} className="mt-12 flex items-center gap-3">
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
        <div className="relative z-10 h-full flex flex-col justify-end p-16 pb-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="max-w-3xl">
            <p className="text-pink-300 uppercase tracking-widest text-sm mb-4">O que nos move</p>
            <h2 className="text-5xl text-white mb-6 leading-tight">
              Existem pessoas que só precisam de
              <span className="text-pink-400"> um abraço</span>,
              <span className="text-pink-300"> uma visita</span>,
              <span className="text-pink-200"> uma palavra</span>.
            </h2>
            <p className="text-lg text-white/70 max-w-xl leading-relaxed">
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
      <div className="h-full flex flex-col p-12 pb-16" style={{ background: `linear-gradient(135deg, ${BRAND_LIGHT} 0%, white 100%)` }}>
        <div className="mb-8">
          <p className="uppercase tracking-widest text-sm mb-2" style={{ color: BRAND }}>Sonhos reais, apoio real</p>
          <h2 className="text-4xl text-gray-900">Cada sonho é uma história de <span style={{ color: BRAND }}>esperança</span></h2>
        </div>
        <div className="flex-1 grid grid-cols-3 gap-6">
          {stories.map((s, i) => (
            <motion.div key={s.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.15 }} className="bg-white rounded-2xl p-6 shadow-lg shadow-pink-100/50 border border-pink-50 flex flex-col">
              <div className="text-4xl mb-3">{s.icon}</div>
              <h3 className="text-gray-900 text-lg">{s.name}</h3>
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
      <div className="h-full flex overflow-hidden">
        <div className="w-1/2 p-12 pb-16 flex flex-col justify-center" style={{ background: `linear-gradient(180deg, ${BRAND} 0%, ${BRAND_DARK} 100%)` }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Sparkles className="w-10 h-10 text-pink-200 mb-6" />
            <h2 className="text-4xl text-white mb-6 leading-tight">
              Uma plataforma que conecta<br />
              <span className="text-pink-200">quem precisa de carinho</span><br />
              a <span className="text-pink-200">quem tem carinho para dar</span>.
            </h2>
            <p className="text-white/70 leading-relaxed mb-8">
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
        <div className="w-1/2 relative">
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
      <div className="h-full flex flex-col p-12 pb-16 bg-white">
        <div className="mb-8">
          <p className="uppercase tracking-widest text-sm mb-2" style={{ color: BRAND }}>Simples e acolhedor</p>
          <h2 className="text-4xl text-gray-900">Como funciona?</h2>
        </div>
        <div className="flex-1 flex items-center">
          <div className="w-full flex flex-col gap-2">
            {steps.map((step, i) => (
              <motion.div key={step.title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.1 }} className="flex items-start gap-5 p-4 rounded-xl hover:bg-pink-50/50 transition-colors">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-white" style={{ background: BRAND }}>{step.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-300">0{i + 1}</span>
                    <h3 className="text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500">{step.desc}</p>
                </div>
                {i < steps.length - 1 && <ArrowRight className="w-4 h-4 text-gray-200 mt-3 shrink-0" />}
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
        <div className="relative z-10 h-full flex flex-col justify-center px-16 pb-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="max-w-2xl">
            <Clock className="w-12 h-12 text-pink-300 mb-6" />
            <h2 className="text-5xl text-white leading-tight mb-8">
              A moeda mais valiosa<br />do mundo é o <span className="text-pink-400">tempo</span>.
            </h2>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              No NextDream, ninguém doa dinheiro.<br />
              As pessoas doam o que têm de mais precioso:
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-lg">
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
      <div className="h-full flex flex-col p-12 pb-16" style={{ background: `linear-gradient(135deg, white 0%, ${BRAND_LIGHT} 100%)` }}>
        <div className="mb-10">
          <p className="uppercase tracking-widest text-sm mb-2" style={{ color: BRAND }}>Nosso impacto</p>
          <h2 className="text-4xl text-gray-900">Números que representam <span style={{ color: BRAND }}>vidas</span></h2>
        </div>
        <div className="flex-1 grid grid-cols-4 gap-6 items-center">
          {metrics.map((m, i) => (
            <motion.div key={m.label} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.1 }} className="bg-white rounded-3xl p-8 shadow-lg shadow-pink-100/50 text-center flex flex-col items-center gap-3 border border-pink-50">
              <span className="text-5xl" style={{ color: BRAND }}>{m.value}</span>
              <span className="text-lg text-gray-800">{m.label}</span>
              <span className="text-xs text-gray-400">{m.desc}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 bg-white rounded-2xl p-6 flex items-center gap-6 shadow-sm border border-pink-50">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: BRAND_LIGHT }}>
            <HandHeart className="w-8 h-8" style={{ color: BRAND }} />
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
      <div className="h-full flex overflow-hidden">
        <div className="w-1/2 relative">
          <img src={IMG.community} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white" />
        </div>
        <div className="w-1/2 p-12 pb-16 flex flex-col justify-center bg-white">
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <p className="uppercase tracking-widest text-sm mb-3" style={{ color: BRAND }}>Todo mundo pode ajudar</p>
            <h2 className="text-4xl text-gray-900 mb-6 leading-tight">
              Você também pode fazer parte dessa <span style={{ color: BRAND }}>corrente de amor</span>
            </h2>
            <div className="flex flex-col gap-5">
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
      <div className="h-full flex flex-col p-12 pb-16 bg-gray-900">
        <div className="mb-10">
          <p className="uppercase tracking-widest text-sm mb-2 text-pink-400">Confiança e segurança</p>
          <h2 className="text-4xl text-white">Cuidamos de quem cuida</h2>
        </div>
        <div className="flex-1 grid grid-cols-3 gap-6 items-center">
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
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-12 pb-12">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="max-w-2xl">
            <img src={logoImg} alt="NextDream" className="h-12 w-auto brightness-0 invert mx-auto mb-8" />
            <h2 className="text-5xl text-white mb-6 leading-tight">
              Você não precisa de dinheiro<br />para mudar uma vida.
            </h2>
            <p className="text-xl text-white/70 mb-4">
              Precisa de coração.
            </p>
            <p className="text-lg text-pink-300 mb-10">
              E se você está lendo isso, você já tem.
            </p>
            <div className="mt-12 flex items-center justify-center gap-2 text-white/40 text-sm">
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
const slides = [
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

// ─── PDF GENERATOR (jsPDF puro, visual fiel aos slides) ───
function generatePDF() {
  const pdf = new jsPDF('l', 'mm', 'a4');
  const W = 297;
  const H = 210;

  const drawAccentBar = (x: number, y: number, h: number) => {
    pdf.setFillColor(217, 27, 140);
    pdf.rect(x, y, 1.5, h, 'F');
  };

  const addFooter = (page: number, dark = false) => {
    const ly = H - 16;
    pdf.setDrawColor(dark ? 80 : 220, dark ? 80 : 220, dark ? 80 : 220);
    pdf.line(10, ly, W - 10, ly);
    pdf.setFontSize(7);
    pdf.setTextColor(dark ? 120 : 160, dark ? 120 : 160, dark ? 120 : 160);
    pdf.text('NextDream', 14, H - 9);
    pdf.text(`${page} / ${TOTAL}`, W - 22, H - 9);
  };

  const sectionLabel = (text: string, x: number, y: number) => {
    pdf.setFontSize(9);
    pdf.setTextColor(217, 27, 140);
    pdf.setDrawColor(217, 27, 140);
    pdf.line(x, y - 1, x + 8, y - 1);
    pdf.text(text.toUpperCase(), x + 11, y);
  };

  const sectionLabelDark = (text: string, x: number, y: number) => {
    pdf.setFontSize(9);
    pdf.setTextColor(244, 163, 209);
    pdf.setDrawColor(244, 163, 209);
    pdf.line(x, y - 1, x + 8, y - 1);
    pdf.text(text.toUpperCase(), x + 11, y);
  };

  // ═══ SLIDE 1: CAPA ═══
  pdf.setFillColor(18, 18, 22);
  pdf.rect(0, 0, W, H, 'F');
  pdf.setFillColor(35, 30, 38);
  pdf.rect(W * 0.55, 0, W * 0.45, H, 'F');
  drawAccentBar(0, 0, H);
  sectionLabelDark('Uma plataforma feita de amor', 30, 48);
  pdf.setFontSize(36);
  pdf.setTextColor(255, 255, 255);
  pdf.text('NextDream', 30, 78);
  pdf.setFillColor(217, 27, 140);
  pdf.circle(30 + pdf.getTextWidth('NextDream') + 4, 73, 2.5, 'F');
  pdf.setFontSize(22);
  pdf.setTextColor(255, 255, 255);
  pdf.text('Porque os sonhos mais bonitos', 30, 100);
  pdf.setTextColor(244, 163, 209);
  pdf.setFont('helvetica', 'italic');
  pdf.text('não custam dinheiro.', 30, 112);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(13);
  pdf.setTextColor(160, 160, 165);
  pdf.text('Custam ', 30, 132);
  let cx = 30 + pdf.getTextWidth('Custam ');
  pdf.setTextColor(230, 230, 230);
  pdf.text('presença', cx, 132); cx += pdf.getTextWidth('presença');
  pdf.setTextColor(160, 160, 165);
  pdf.text('.  Custam ', cx, 132); cx += pdf.getTextWidth('.  Custam ');
  pdf.setTextColor(230, 230, 230);
  pdf.text('carinho', cx, 132); cx += pdf.getTextWidth('carinho');
  pdf.setTextColor(160, 160, 165);
  pdf.text('.  Custam ', cx, 132); cx += pdf.getTextWidth('.  Custam ');
  pdf.setTextColor(230, 230, 230);
  pdf.text('tempo', cx, 132); cx += pdf.getTextWidth('tempo');
  pdf.setTextColor(160, 160, 165);
  pdf.text('.', cx, 132);
  pdf.setFillColor(217, 27, 140);
  pdf.circle(32, 152, 2, 'F');
  pdf.setDrawColor(217, 27, 140);
  pdf.line(37, 152, 55, 152);
  addFooter(1, true);

  // ═══ SLIDE 2: A DOR ═══
  pdf.addPage();
  pdf.setFillColor(25, 25, 30);
  pdf.rect(0, 0, W, H, 'F');
  pdf.setFillColor(15, 15, 18);
  pdf.rect(0, H * 0.6, W, H * 0.4, 'F');
  sectionLabelDark('O que nos move', 30, 95);
  pdf.setFontSize(26);
  pdf.setTextColor(255, 255, 255);
  pdf.text('Existem pessoas que só precisam de', 30, 115);
  pdf.setTextColor(244, 130, 190);
  pdf.text('um abraço', 30, 128);
  let ax = 30 + pdf.getTextWidth('um abraço');
  pdf.setTextColor(255, 255, 255);
  pdf.text(', ', ax, 128); ax += pdf.getTextWidth(', ');
  pdf.setTextColor(244, 163, 209);
  pdf.text('uma visita', ax, 128); ax += pdf.getTextWidth('uma visita');
  pdf.setTextColor(255, 255, 255);
  pdf.text(', ', ax, 128); ax += pdf.getTextWidth(', ');
  pdf.setTextColor(244, 190, 220);
  pdf.text('uma palavra.', ax, 128);
  pdf.setFontSize(11);
  pdf.setTextColor(180, 180, 185);
  const painD = pdf.splitTextToSize('Pacientes em tratamento contra o câncer enfrentam muito mais que a doença. Enfrentam a solidão, o medo, e a sensação de que seus sonhos ficaram para trás.', W - 100);
  pdf.text(painD, 30, 150);
  addFooter(2, true);

  // ═══ SLIDE 3: HISTÓRIAS ═══
  pdf.addPage();
  pdf.setFillColor(252, 240, 248);
  pdf.rect(0, 0, W, H, 'F');
  pdf.setFillColor(255, 250, 253);
  pdf.rect(W * 0.3, 0, W * 0.7, H, 'F');
  sectionLabel('Sonhos reais, apoio real', 24, 28);
  pdf.setFontSize(22);
  pdf.setTextColor(30, 30, 30);
  pdf.text('Cada sonho é uma história de ', 24, 44);
  pdf.setTextColor(217, 27, 140);
  pdf.text('esperança', 24 + pdf.getTextWidth('Cada sonho é uma história de '), 44);
  const st = [
    { name: 'Dona Maria, 72 anos', cond: 'Câncer de mama', dream: '"Eu só queria alguém para me ensinar a fazer videochamada com meu neto."', res: 'Uma voluntária ensinou. Hoje, Dona Maria liga toda semana.' },
    { name: 'Pedro, 9 anos', cond: 'Leucemia', dream: '"Eu queria que alguém lesse histórias de super-herói pra mim no hospital."', res: 'Um apoiador leu por 3 semanas. Pedro diz que ganhou superpoderes.' },
    { name: 'Carlos, 45 anos', cond: 'Linfoma', dream: '"Eu queria aprender a tocar violão antes de terminar o tratamento."', res: 'Um músico voluntário deu aulas. Carlos tocou pela primeira vez no dia da alta.' },
  ];
  st.forEach((s, i) => {
    const x = 18 + i * 90;
    pdf.setFillColor(240, 220, 235);
    pdf.roundedRect(x + 1.5, 56.5, 82, 128, 5, 5, 'F');
    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(x, 55, 82, 128, 5, 5, 'F');
    pdf.setFillColor(217, 27, 140);
    pdf.rect(x, 55, 82, 3, 'F');
    pdf.setFontSize(12);
    pdf.setTextColor(30, 30, 30);
    pdf.text(s.name, x + 10, 72);
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.text(s.cond, x + 10, 79);
    pdf.setFontSize(20);
    pdf.setTextColor(217, 27, 140);
    pdf.text('"', x + 8, 94);
    pdf.setFontSize(9);
    pdf.setTextColor(80, 80, 80);
    pdf.setFont('helvetica', 'italic');
    pdf.text(pdf.splitTextToSize(s.dream, 62), x + 16, 92);
    pdf.setFont('helvetica', 'normal');
    pdf.setDrawColor(249, 224, 240);
    pdf.line(x + 10, 135, x + 72, 135);
    pdf.setFontSize(8);
    pdf.setTextColor(176, 20, 110);
    pdf.setFillColor(217, 27, 140);
    pdf.circle(x + 12, 145, 1.2, 'F');
    pdf.text(pdf.splitTextToSize(s.res, 60), x + 16, 147);
  });
  addFooter(3);

  // ═══ SLIDE 4: O QUE É ═══
  pdf.addPage();
  pdf.setFillColor(217, 27, 140);
  pdf.rect(0, 0, W / 2, H, 'F');
  pdf.setFillColor(176, 20, 110);
  pdf.rect(0, H * 0.7, W / 2, H * 0.3, 'F');
  pdf.setFillColor(252, 242, 248);
  pdf.rect(W / 2, 0, W / 2, H, 'F');
  pdf.setFontSize(28);
  pdf.setTextColor(255, 200, 230);
  pdf.text('✦', 22, 45);
  pdf.setFontSize(20);
  pdf.setTextColor(255, 255, 255);
  pdf.text(pdf.splitTextToSize('Uma plataforma que conecta quem precisa de carinho a quem tem carinho para dar.', 118), 22, 62);
  pdf.setFontSize(10);
  pdf.setTextColor(255, 210, 235);
  pdf.text(pdf.splitTextToSize('O NextDream é um espaço seguro onde pacientes em tratamento oncológico cadastram sonhos simples — e pessoas com coração grande se oferecem para realizá-los.', 118), 22, 115);
  ['Sem dinheiro', 'Sem burocracia', 'Com muito amor'].forEach((tag, i) => {
    const ty = 155 + i * 12;
    pdf.setDrawColor(255, 255, 255);
    pdf.roundedRect(22, ty - 5, 55, 9, 3, 3, 'S');
    pdf.setFontSize(9);
    pdf.setTextColor(255, 255, 255);
    pdf.text(tag, 28, ty);
  });
  pdf.setFontSize(14);
  pdf.setTextColor(120, 60, 90);
  pdf.text('Conectando corações', W / 2 + 20, H / 2 - 5);
  pdf.setFontSize(10);
  pdf.setTextColor(160, 100, 130);
  pdf.text('desde o primeiro sonho.', W / 2 + 20, H / 2 + 8);
  addFooter(4);

  // ═══ SLIDE 5: COMO FUNCIONA ═══
  pdf.addPage();
  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, W, H, 'F');
  sectionLabel('Simples e acolhedor', 30, 28);
  pdf.setFontSize(26);
  pdf.setTextColor(30, 30, 30);
  pdf.text('Como funciona?', 30, 48);
  const stepsD = [
    { num: '01', title: 'O paciente sonha', desc: 'Cadastra um desejo simples: uma visita, uma carta, aprender algo novo...' },
    { num: '02', title: 'O apoiador encontra', desc: 'Explora sonhos publicados e escolhe aquele que toca seu coração.' },
    { num: '03', title: 'A proposta nasce', desc: 'Envia uma proposta dizendo como pode ajudar.' },
    { num: '04', title: 'A conexão acontece', desc: 'Chat seguro e mediado. Sem dados pessoais expostos.' },
    { num: '05', title: 'O sonho se realiza', desc: 'E a gente celebra junto. Cada sonho realizado é uma vitória de todos.' },
  ];
  stepsD.forEach((step, i) => {
    const y = 68 + i * 26;
    pdf.setFillColor(217, 27, 140);
    pdf.circle(40, y - 2, 7, 'F');
    pdf.setFontSize(10);
    pdf.setTextColor(255, 255, 255);
    pdf.text(step.num, 37, y);
    pdf.setFontSize(12);
    pdf.setTextColor(30, 30, 30);
    pdf.text(step.title, 52, y - 2);
    pdf.setFontSize(9);
    pdf.setTextColor(130, 130, 130);
    pdf.text(step.desc, 52, y + 5);
    if (i < stepsD.length - 1) {
      pdf.setDrawColor(230, 230, 230);
      pdf.line(40, y + 6, 40, y + 18);
    }
  });
  addFooter(5);

  // ═══ SLIDE 6: TEMPO ═══
  pdf.addPage();
  pdf.setFillColor(25, 18, 28);
  pdf.rect(0, 0, W, H, 'F');
  pdf.setFillColor(35, 28, 38);
  pdf.rect(W * 0.6, 0, W * 0.4, H, 'F');
  pdf.setFontSize(24);
  pdf.setTextColor(244, 163, 209);
  pdf.text('⏱', 30, 42);
  pdf.setFontSize(30);
  pdf.setTextColor(255, 255, 255);
  pdf.text('A moeda mais valiosa', 30, 65);
  pdf.text('do mundo é o ', 30, 82);
  pdf.setTextColor(244, 130, 190);
  pdf.text('tempo.', 30 + pdf.getTextWidth('do mundo é o '), 82);
  pdf.setFontSize(12);
  pdf.setTextColor(200, 200, 205);
  pdf.text('No NextDream, ninguém doa dinheiro.', 30, 102);
  pdf.text('As pessoas doam o que têm de mais precioso:', 30, 113);
  const vd = [
    { e: '⏰', l: 'Seu tempo' }, { e: '💛', l: 'Seu carinho' },
    { e: '🎵', l: 'Seu talento' }, { e: '🤝', l: 'Sua presença' },
    { e: '📖', l: 'Sua história' }, { e: '🌟', l: 'Sua esperança' },
  ];
  vd.forEach((v, i) => {
    const col = i % 2; const row = Math.floor(i / 2);
    const vx = 30 + col * 85; const vy = 130 + row * 18;
    pdf.setFillColor(50, 42, 55);
    pdf.roundedRect(vx, vy - 6, 78, 14, 3, 3, 'F');
    pdf.setFontSize(11);
    pdf.setTextColor(255, 255, 255);
    pdf.text(`${v.e}  ${v.l}`, vx + 6, vy + 2);
  });
  addFooter(6, true);

  // ═══ SLIDE 7: IMPACTO ═══
  pdf.addPage();
  pdf.setFillColor(255, 252, 254);
  pdf.rect(0, 0, W, H, 'F');
  pdf.setFillColor(252, 240, 248);
  pdf.rect(W * 0.5, 0, W * 0.5, H, 'F');
  sectionLabel('Nosso impacto', 24, 28);
  pdf.setFontSize(22);
  pdf.setTextColor(30, 30, 30);
  pdf.text('Números que representam ', 24, 46);
  pdf.setTextColor(217, 27, 140);
  pdf.text('vidas', 24 + pdf.getTextWidth('Números que representam '), 46);
  const md = [
    { v: '100%', l: 'Gratuito', d: 'Sem taxas, sem custos, sem barreiras' },
    { v: '3', l: 'Perfis', d: 'Paciente, Apoiador e Admin' },
    { v: '30+', l: 'Telas', d: 'Experiência completa e acolhedora' },
    { v: '∞', l: 'Amor', d: 'Porque carinho não tem limite' },
  ];
  md.forEach((m, i) => {
    const mx = 20 + i * 67;
    pdf.setFillColor(245, 225, 238);
    pdf.roundedRect(mx + 1.5, 62.5, 60, 70, 6, 6, 'F');
    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(mx, 61, 60, 70, 6, 6, 'F');
    pdf.setFontSize(28);
    pdf.setTextColor(217, 27, 140);
    pdf.text(m.v, mx + 30, 88, { align: 'center' });
    pdf.setFontSize(12);
    pdf.setTextColor(50, 50, 50);
    pdf.text(m.l, mx + 30, 102, { align: 'center' });
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.splitTextToSize(m.d, 50).forEach((line: string, li: number) => {
      pdf.text(line, mx + 30, 112 + li * 5, { align: 'center' });
    });
  });
  pdf.setFillColor(255, 255, 255);
  pdf.roundedRect(20, 148, W - 40, 34, 5, 5, 'F');
  pdf.setFillColor(252, 240, 248);
  pdf.circle(40, 165, 9, 'F');
  pdf.setFontSize(14);
  pdf.setTextColor(217, 27, 140);
  pdf.text('♡', 37, 168);
  pdf.setFontSize(11);
  pdf.setTextColor(30, 30, 30);
  pdf.text('Sonhos não têm preço. Têm ', 58, 161);
  pdf.setTextColor(217, 27, 140);
  pdf.text('significado', 58 + pdf.getTextWidth('Sonhos não têm preço. Têm '), 161);
  pdf.setTextColor(30, 30, 30);
  pdf.text('.', 58 + pdf.getTextWidth('Sonhos não têm preço. Têm significado'), 161);
  pdf.setFontSize(8);
  pdf.setTextColor(130, 130, 130);
  pdf.text('Cada sonho realizado reacende a esperança de quem luta contra o câncer todos os dias.', 58, 172);
  addFooter(7);

  // ═══ SLIDE 8: QUEM PODE AJUDAR ═══
  pdf.addPage();
  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, W, H, 'F');
  pdf.setFillColor(245, 235, 242);
  pdf.rect(0, 0, W / 2, H, 'F');
  pdf.setFontSize(40);
  pdf.setTextColor(217, 27, 140);
  pdf.text('🤝', W / 4 - 10, H / 2 + 5);
  sectionLabel('Todo mundo pode ajudar', W / 2 + 15, 35);
  pdf.setFontSize(20);
  pdf.setTextColor(30, 30, 30);
  pdf.text(pdf.splitTextToSize('Você também pode fazer parte dessa corrente de amor', 120), W / 2 + 15, 52);
  const pd = [
    { t: 'Profissionais de saúde', d: 'Indiquem pacientes que precisam de apoio emocional. Nós cuidamos do resto.' },
    { t: 'Voluntários e comunidades', d: 'Ampliem o alcance dos sonhos. Juntos, chegamos a mais pessoas.' },
    { t: 'Pessoas como você', d: 'Doe seu tempo, talento ou presença. Um gesto pode transformar um dia.' },
    { t: 'Quem quer inspirar outros', d: 'Compartilhe sonhos reais. Uma história pode ser a ponte.' },
  ];
  pd.forEach((p, i) => {
    const py = 88 + i * 26;
    pdf.setFillColor(217, 27, 140);
    pdf.circle(W / 2 + 18, py - 2, 1.5, 'F');
    pdf.setFontSize(11);
    pdf.setTextColor(30, 30, 30);
    pdf.text(p.t, W / 2 + 24, py);
    pdf.setFontSize(9);
    pdf.setTextColor(130, 130, 130);
    pdf.text(pdf.splitTextToSize(p.d, 108), W / 2 + 24, py + 7);
  });
  addFooter(8);

  // ═══ SLIDE 9: SEGURANÇA ═══
  pdf.addPage();
  pdf.setFillColor(24, 24, 27);
  pdf.rect(0, 0, W, H, 'F');
  sectionLabelDark('Confiança e segurança', 24, 28);
  pdf.setFontSize(24);
  pdf.setTextColor(255, 255, 255);
  pdf.text('Cuidamos de quem cuida', 24, 48);
  const sd = [
    { i: '🔒', t: 'Chat Moderado', d: 'Conversas mediadas. Dados protegidos.' },
    { i: '🛡️', t: 'Painel Admin', d: 'Moderação em tempo real de propostas e mensagens.' },
    { i: '👁️', t: 'Auditoria', d: 'Ações registradas. Transparência total.' },
    { i: '🚫', t: 'Filtro de Conteúdo', d: 'Bloqueio automático de conteúdo inadequado.' },
    { i: '✅', t: 'Verificação', d: 'Apoiadores verificados antes de interagir.' },
    { i: '📋', t: 'Diretrizes', d: 'Termos e diretrizes que protegem todos.' },
  ];
  sd.forEach((s, i) => {
    const col = i % 3; const row = Math.floor(i / 3);
    const sx = 18 + col * 90; const sy = 60 + row * 60;
    pdf.setFillColor(38, 38, 42);
    pdf.roundedRect(sx, sy, 82, 50, 4, 4, 'F');
    pdf.setFillColor(217, 27, 140);
    pdf.rect(sx, sy, 82, 1.5, 'F');
    pdf.setFontSize(18);
    pdf.setTextColor(255, 255, 255);
    pdf.text(s.i, sx + 8, sy + 16);
    pdf.setFontSize(11);
    pdf.text(s.t, sx + 8, sy + 28);
    pdf.setFontSize(8);
    pdf.setTextColor(160, 160, 165);
    pdf.text(pdf.splitTextToSize(s.d, 66), sx + 8, sy + 36);
  });
  addFooter(9, true);

  // ═══ SLIDE 10: ENCERRAMENTO ═══
  pdf.addPage();
  pdf.setFillColor(18, 12, 22);
  pdf.rect(0, 0, W, H, 'F');
  pdf.setFillColor(28, 20, 35);
  pdf.circle(W / 2, H / 2, 80, 'F');
  pdf.setFillColor(22, 16, 28);
  pdf.circle(W / 2, H / 2, 60, 'F');
  pdf.setFontSize(14);
  pdf.setTextColor(217, 27, 140);
  pdf.text('NextDream', W / 2, 55, { align: 'center' });
  pdf.setDrawColor(217, 27, 140);
  pdf.line(W / 2 - 20, 60, W / 2 + 20, 60);
  pdf.setFontSize(28);
  pdf.setTextColor(255, 255, 255);
  pdf.text('Você não precisa de dinheiro', W / 2, 85, { align: 'center' });
  pdf.text('para mudar uma vida.', W / 2, 100, { align: 'center' });
  pdf.setFontSize(15);
  pdf.setTextColor(200, 200, 205);
  pdf.text('Precisa de coração.', W / 2, 122, { align: 'center' });
  pdf.setTextColor(244, 163, 209);
  pdf.text('E se você está lendo isso, você já tem.', W / 2, 138, { align: 'center' });
  pdf.setFontSize(8);
  pdf.setTextColor(100, 100, 105);
  pdf.text('♡  NextDream — Feito com amor, para quem precisa de amor  ♡', W / 2, 170, { align: 'center' });
  addFooter(10, true);

  pdf.save('NextDream_Apresentacao.pdf');
}

// ─── MAIN COMPONENT ───
export default function Presentation() {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

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

  const SlideComponent = slides[current].render;

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4">
      {/* Top bar */}
      <div className="mb-4 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <img src={logoImg} alt="NextDream" className="h-6 w-auto brightness-0 invert opacity-70" />
        </div>
        <span className="text-sm text-gray-600">Slide {current + 1} de {total}</span>
        <button
          onClick={generatePDF}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white transition-transform hover:scale-105"
          style={{ background: BRAND }}
        >
          <Download className="w-4 h-4" /> Baixar PDF
        </button>
        <span className="text-xs text-gray-600">Use ← → ou espaço para navegar</span>
      </div>

      {/* Slide container */}
      <div className="w-full max-w-6xl aspect-[16/9] bg-white rounded-2xl shadow-2xl shadow-pink-900/10 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[current].id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <SlideComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex items-center gap-6">
        <button onClick={prev} disabled={current === 0} className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-20 transition-all">
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              className="w-3 h-3 rounded-full transition-all"
              style={{
                background: i === current ? BRAND : 'rgba(255,255,255,0.15)',
                transform: i === current ? 'scale(1.3)' : 'scale(1)',
              }}
            />
          ))}
        </div>
        <button onClick={next} disabled={current === total - 1} className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-20 transition-all">
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}
