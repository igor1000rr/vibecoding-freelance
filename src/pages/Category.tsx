import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import GigCard from '../components/GigCard';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Button from '../components/ui/Button';
import { gigs, categories } from '../data/mock';

const sortOptions = [
  { value: 'popular', label: 'Популярные' },
  { value: 'new', label: 'Новые' },
  { value: 'cheap', label: 'Дешёвые' },
  { value: 'expensive', label: 'Дорогие' },
  { value: 'rating', label: 'Лучший рейтинг' },
];

const techFilters = ['React', 'Next.js', 'TypeScript', 'Python', 'Node.js', 'Telegram', 'OpenAI', 'PostgreSQL', 'Docker', 'Figma'];

export default function Category() {
  const { slug } = useParams();
  const category = categories.find((c) => c.slug === slug) || categories[0];
  const [sort, setSort] = useState('popular');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categoryGigs = useMemo(() => {
    let filtered = slug ? gigs.filter((g) => g.categorySlug === slug) : gigs;
    if (filtered.length < 4) filtered = gigs;

    if (priceMin) filtered = filtered.filter((g) => g.packages.economy.price >= Number(priceMin));
    if (priceMax) filtered = filtered.filter((g) => g.packages.economy.price <= Number(priceMax));
    if (minRating > 0) filtered = filtered.filter((g) => g.rating >= minRating);
    if (selectedTechs.length > 0) filtered = filtered.filter((g) => g.tags.some((t) => selectedTechs.includes(t)));

    switch (sort) {
      case 'cheap': return [...filtered].sort((a, b) => a.packages.economy.price - b.packages.economy.price);
      case 'expensive': return [...filtered].sort((a, b) => b.packages.economy.price - a.packages.economy.price);
      case 'rating': return [...filtered].sort((a, b) => b.rating - a.rating);
      case 'new': return [...filtered].reverse();
      default: return filtered;
    }
  }, [slug, sort, priceMin, priceMax, minRating, selectedTechs]);

  const toggleTech = (tech: string) => {
    setSelectedTechs((prev) => prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      <Breadcrumbs items={[
        { label: 'Главная', href: '/' },
        { label: 'Категории', href: '/' },
        { label: category.name },
      ]} />

      <div className="mt-6 mb-8">
        <h1 className="font-display text-3xl font-bold text-gold-gradient tracking-[0.08em] uppercase mb-2">{category.name}</h1>
        <p className="text-body">{category.description}</p>
      </div>

      <div className="flex items-center justify-between mb-6 gap-4">
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white/5 border border-gold/15 rounded-xl text-sm text-body hover:text-heading transition-colors cursor-pointer"
        >
          <SlidersHorizontal size={16} />
          Фильтры
          {(selectedTechs.length > 0 || minRating > 0 || priceMin || priceMax) && (
            <span className="w-2 h-2 bg-gold rounded-full" />
          )}
        </button>

        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm text-muted hidden sm:inline">Сортировка:</span>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-nebula-light border border-gold/15 rounded-xl px-4 py-2 pr-8 text-sm text-body appearance-none cursor-pointer focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        <aside className={`${filtersOpen ? 'fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:static lg:bg-transparent lg:backdrop-blur-none' : 'hidden'} lg:block lg:w-64 flex-shrink-0`}>
          <div className={`${filtersOpen ? 'absolute right-0 top-0 h-full w-80 bg-deep-space p-6 overflow-y-auto shadow-xl border-l border-gold/10' : ''} lg:static lg:w-auto lg:bg-transparent lg:p-0 lg:shadow-none lg:border-0 space-y-6`}>
            {filtersOpen && (
              <div className="flex items-center justify-between lg:hidden mb-4">
                <h3 className="text-lg font-heading font-semibold text-heading">Фильтры</h3>
                <button onClick={() => setFiltersOpen(false)} className="text-muted hover:text-heading cursor-pointer">
                  <X size={20} />
                </button>
              </div>
            )}

            <div>
              <h4 className="text-sm font-heading font-medium text-heading mb-3">Цена (&#8381;)</h4>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="От"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  className="w-full bg-white/5 border border-gold/15 rounded-lg px-3 py-2 text-sm text-heading placeholder:text-muted focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 font-mono"
                />
                <input
                  type="number"
                  placeholder="До"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="w-full bg-white/5 border border-gold/15 rounded-lg px-3 py-2 text-sm text-heading placeholder:text-muted focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 font-mono"
                />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-heading font-medium text-heading mb-3">Минимальный рейтинг</h4>
              <div className="flex gap-2">
                {[0, 3, 4, 4.5].map((r) => (
                  <button
                    key={r}
                    onClick={() => setMinRating(r)}
                    className={`px-3 py-1.5 text-sm rounded-lg border transition-all cursor-pointer ${
                      minRating === r
                        ? 'border-gold bg-gold/10 text-gold'
                        : 'border-gold/10 bg-white/5 text-muted hover:text-body'
                    }`}
                  >
                    {r === 0 ? 'Все' : `${r}+`}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-heading font-medium text-heading mb-3">Технологии</h4>
              <div className="flex flex-wrap gap-2">
                {techFilters.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => toggleTech(tech)}
                    className={`px-3 py-1.5 text-xs rounded-lg border transition-all cursor-pointer ${
                      selectedTechs.includes(tech)
                        ? 'border-gold bg-gold/10 text-gold'
                        : 'border-gold/10 bg-white/5 text-muted hover:text-body'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>

            {filtersOpen && (
              <Button variant="primary" size="md" className="w-full lg:hidden" onClick={() => setFiltersOpen(false)}>
                Применить
              </Button>
            )}
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {categoryGigs.map((gig, i) => (
              <GigCard key={gig.id} gig={gig} index={i} />
            ))}
          </div>

          {categoryGigs.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted text-lg">Ничего не найдено</p>
              <p className="text-muted text-sm mt-2">Попробуйте изменить фильтры</p>
            </div>
          )}

          {categoryGigs.length > 0 && (
            <div className="flex justify-center gap-2 mt-12">
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  className={`w-10 h-10 rounded-xl text-sm font-mono transition-all cursor-pointer ${
                    p === 1
                      ? 'border border-gold bg-gold/10 text-gold'
                      : 'border border-gold/10 text-muted hover:text-body hover:border-gold/20'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
