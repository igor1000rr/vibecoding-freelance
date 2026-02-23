import { Link } from 'react-router-dom';
import {
  Search, Zap, ShieldCheck, ArrowRight,
  Globe, Smartphone, Bot, Brain, Layout, Server, Database, Rocket,
  ClipboardList, CreditCard, MessageSquare, Sparkles, Code, Bug, Cloud,
} from 'lucide-react';
import GigCard from '../components/GigCard';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import { gigs, categories, freelancers, popularSearches } from '../data/mock';
import { useInView } from '../hooks/useInView';

const iconMap: Record<string, React.ElementType> = {
  Globe, Smartphone, Bot, Brain, Layout, Server, Database, Rocket, Sparkles, Code, Bug, Cloud,
};

const steps = [
  { num: 1, icon: Search, title: 'Найдите услугу', desc: 'Выберите подходящий кворк из каталога или через поиск' },
  { num: 2, icon: ClipboardList, title: 'Оформите заказ', desc: 'Выберите пакет и оформите безопасную сделку' },
  { num: 3, icon: CreditCard, title: 'Получите результат', desc: 'Фрилансер выполнит работу в указанные сроки' },
  { num: 4, icon: MessageSquare, title: 'Оставьте отзыв', desc: 'Оцените работу и помогите другим заказчикам' },
];

function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 15 }).map((_, i) => (
        <span
          key={i}
          className="particle animate-float-particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 6}s`,
            opacity: 0.3 + Math.random() * 0.4,
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const { ref: whyRef, isInView: whyVisible } = useInView();
  const { ref: catRef, isInView: catVisible } = useInView();
  const { ref: gigsRef, isInView: gigsVisible } = useInView();
  const { ref: stepsRef, isInView: stepsVisible } = useInView();

  const featuredGigs = gigs.filter((g) => g.isFeatured);

  return (
    <div className="pb-20 md:pb-0">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden sacred-bg">
        {/* Radial glow */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.12)_0%,transparent_60%)] animate-glow-breathe" />
          <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(139,92,246,0.08)_0%,transparent_60%)]" />
          <div className="absolute bottom-20 left-20 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(0,245,255,0.06)_0%,transparent_60%)]" />
        </div>

        <ParticleField />

        {/* Golden spiral decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20">
          <div className="w-full h-full bg-[conic-gradient(from_0deg,transparent,rgba(255,215,0,0.15),transparent)] rounded-full animate-spiral-rotate" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20 sm:py-28 space-y-10">
          <div className="space-y-6">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-[0.08em] uppercase leading-[1.1]">
              <span className="text-gold-gradient">Найди вайб-кодера</span>
              <br />
              <span className="text-heading text-3xl sm:text-4xl lg:text-5xl tracking-[0.15em]">для своего проекта</span>
            </h1>
            <p className="text-lg sm:text-xl text-body max-w-2xl mx-auto font-heading font-light tracking-wide">
              AI-ассистированная разработка: быстрее, доступнее, прозрачнее
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-gold/15 p-1.5 shadow-[0_0_40px_rgba(255,215,0,0.08)] group focus-within:border-gold/40 focus-within:shadow-glow-gold transition-all duration-500">
              <div className="flex items-center gap-3 px-4 py-3">
                <Search size={20} className="text-gold/60 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Попробуйте: лендинг, Telegram бот, React приложение..."
                  className="flex-1 bg-transparent text-heading placeholder:text-muted text-base outline-none"
                />
                <Button variant="primary" size="sm" className="flex-shrink-0">Найти</Button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {popularSearches.slice(0, 6).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-sm bg-white/5 text-body rounded-full border border-gold/10 cursor-pointer hover:border-gold/30 hover:text-gold hover:bg-gold/5 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 pt-4">
            <div className="flex -space-x-2">
              {freelancers.slice(0, 4).map((f) => (
                <Avatar key={f.id} src={f.avatar} alt={f.name} size="sm" className="ring-2 ring-void" />
              ))}
            </div>
            <div className="text-sm text-body">
              Уже <span className="text-gold font-semibold font-mono">500+</span> выполненных заказов
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY VIBE CODING ═══════════════ */}
      <section ref={whyRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gold-gradient tracking-[0.1em] uppercase mb-4">
            Почему вайб-кодинг?
          </h2>
          <p className="text-body font-heading font-light tracking-wide">Разработка нового поколения с AI-ассистентами</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Zap, color: 'text-gold', glow: 'shadow-glow-gold', title: 'На 30-50% дешевле', desc: 'AI ускоряет разработку, снижая стоимость без потери качества' },
            { icon: Rocket, color: 'text-neon-cyan', glow: 'shadow-glow-cyan', title: 'В 2-3 раза быстрее', desc: 'Вайб-кодеры используют AI-инструменты для молниеносной разработки' },
            { icon: ShieldCheck, color: 'text-neon-violet', glow: 'shadow-glow-violet', title: '100% прозрачность', desc: 'Безопасные сделки, фиксированные цены, гарантия возврата средств' },
          ].map((item, i) => (
            <div
              key={item.title}
              className={`card p-8 text-center transition-all duration-700 hover:${item.glow} ${whyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-gold/10 flex items-center justify-center mx-auto mb-6">
                <item.icon size={30} className={item.color} />
              </div>
              <h3 className="text-lg font-heading font-semibold text-heading mb-3 tracking-wide">{item.title}</h3>
              <p className="text-sm text-body leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ CATEGORIES ═══════════════ */}
      <section ref={catRef} className="py-24 relative">
        <div className="absolute inset-0 bg-deep-space sacred-bg" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl font-bold text-gold-gradient tracking-[0.1em] uppercase mb-3">
                Категории
              </h2>
              <p className="text-body font-heading font-light">Найдите специалиста в нужной области</p>
            </div>
            <Link to="/categories/web-development" className="hidden sm:flex items-center gap-1.5 text-sm text-gold/70 hover:text-gold transition-colors font-heading font-medium tracking-wide">
              Все категории <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat, i) => {
              const Icon = iconMap[cat.icon] || Globe;
              return (
                <Link
                  key={cat.slug}
                  to={`/categories/${cat.slug}`}
                  className={`card p-6 group hover:border-gold/30 transition-all duration-500 ${catVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="w-12 h-12 bg-gold/5 border border-gold/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gold/10 group-hover:border-gold/25 group-hover:shadow-[0_0_20px_rgba(255,215,0,0.15)] transition-all duration-500">
                    <Icon size={24} className="text-gold" />
                  </div>
                  <h3 className="text-sm font-heading font-semibold text-heading mb-1 group-hover:text-gold transition-colors">{cat.name}</h3>
                  <p className="text-xs text-muted font-mono">{cat.gigCount} кворков</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURED GIGS ═══════════════ */}
      <section ref={gigsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="font-display text-3xl font-bold text-gold-gradient tracking-[0.1em] uppercase mb-3">
              Топ кворки
            </h2>
            <p className="text-body font-heading font-light">Лучшие предложения наших фрилансеров</p>
          </div>
        </div>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-opacity duration-700 ${gigsVisible ? 'opacity-100' : 'opacity-0'}`}>
          {featuredGigs.map((gig, i) => (
            <GigCard key={gig.id} gig={gig} index={i} />
          ))}
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section ref={stepsRef} id="how-it-works" className="py-24 relative">
        <div className="absolute inset-0 bg-deep-space" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-gold-gradient tracking-[0.1em] uppercase mb-4">
              Как это работает
            </h2>
            <p className="text-body font-heading font-light">4 простых шага до результата</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-10 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`relative text-center transition-all duration-700 ${stepsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <div className="w-20 h-20 rounded-full border border-gold/30 bg-void flex items-center justify-center mx-auto mb-6 relative z-10 shadow-[0_0_25px_rgba(255,215,0,0.1)]">
                  <step.icon size={28} className="text-gold" />
                </div>
                <span className="text-xs font-mono text-gold/60 mb-2 block tracking-[0.2em] uppercase">Шаг {step.num}</span>
                <h3 className="text-base font-heading font-semibold text-heading mb-2">{step.title}</h3>
                <p className="text-sm text-body leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-nebula via-nebula-light to-nebula" />
          <div className="absolute inset-0 sacred-bg opacity-50" />
          <div className="absolute inset-0 border border-gold/15 rounded-2xl" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          
          <div className="relative p-12 sm:p-16 text-center space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[0.08em] uppercase">
              <span className="text-gold-gradient">Начните зарабатывать</span>
              <br />
              <span className="text-heading text-2xl sm:text-3xl tracking-[0.12em]">как вайб-кодер</span>
            </h2>
            <p className="text-body max-w-lg mx-auto font-heading font-light">
              Используйте свои навыки AI-разработки и находите заказчиков на нашей платформе
            </p>
            <Link to="/auth">
              <Button variant="primary" size="lg" className="mt-4">
                Стать фрилансером
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ TRUST BADGES ═══════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-neon-cyan" />
            <span className="font-heading">Безопасная сделка</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-gold" />
            <span className="font-heading">Гарантия возврата</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-neon-violet" />
            <span className="font-heading">Быстрое выполнение</span>
          </div>
        </div>
      </section>
    </div>
  );
}
