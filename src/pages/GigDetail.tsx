import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, ShieldCheck, MessageCircle, Star, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import StarRating from '../components/ui/StarRating';
import { gigs, reviews } from '../data/mock';
import type { GigPackage } from '../types';

type PackageKey = 'economy' | 'standard' | 'premium';

const packageLabels: Record<PackageKey, string> = {
  economy: 'Эконом',
  standard: 'Стандарт',
  premium: 'Премиум',
};

export default function GigDetail() {
  const { id } = useParams();
  const gig = gigs.find((g) => g.id === id) || gigs[0];
  const [activePackage, setActivePackage] = useState<PackageKey>('standard');
  const [currentImage, setCurrentImage] = useState(0);

  const pkg: GigPackage = gig.packages[activePackage];

  const prevImage = () => setCurrentImage((p) => (p === 0 ? gig.images.length - 1 : p - 1));
  const nextImage = () => setCurrentImage((p) => (p === gig.images.length - 1 ? 0 : p + 1));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      <Breadcrumbs items={[
        { label: 'Главная', href: '/' },
        { label: gig.category, href: `/categories/${gig.categorySlug}` },
        { label: gig.title },
      ]} />

      <div className="mt-6 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0 space-y-8">
          <div className="space-y-3">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-nebula">
              <img
                src={gig.images[currentImage]}
                alt={gig.title}
                className="w-full h-full object-cover"
              />
              {gig.images.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-void/80 backdrop-blur-sm border border-gold/20 flex items-center justify-center text-heading hover:bg-void transition-colors cursor-pointer">
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-void/80 backdrop-blur-sm border border-gold/20 flex items-center justify-center text-heading hover:bg-void transition-colors cursor-pointer">
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
            {gig.images.length > 1 && (
              <div className="flex gap-2">
                {gig.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      i === currentImage ? 'border-gold' : 'border-gold/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-heading font-bold text-heading mb-4">{gig.title}</h1>
            <div className="flex items-center gap-4 mb-6">
              <Link to={`/users/${gig.freelancer.username}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Avatar src={gig.freelancer.avatar} alt={gig.freelancer.name} size="sm" isOnline={gig.freelancer.isOnline} />
                <span className="text-sm text-body">{gig.freelancer.name}</span>
              </Link>
              <StarRating rating={gig.rating} count={gig.reviewCount} />
              {gig.freelancer.level === 'pro' && <Badge variant="amber">PRO</Badge>}
            </div>
            <div className="max-w-none">
              {gig.description.split('\n').map((line, i) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <h3 key={i} className="text-base font-heading font-semibold text-heading mt-6 mb-2">{line.replace(/\*\*/g, '')}</h3>;
                }
                if (line.startsWith('- ')) {
                  return (
                    <div key={i} className="flex items-start gap-2 ml-1 mb-1">
                      <Check size={14} className="text-neon-emerald mt-1 flex-shrink-0" />
                      <span className="text-sm text-body">{line.slice(2)}</span>
                    </div>
                  );
                }
                if (line.trim() === '') return <div key={i} className="h-2" />;
                return <p key={i} className="text-sm text-body leading-relaxed">{line}</p>;
              })}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-heading mb-4">Сравнение пакетов</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gold/10">
                    <th className="text-left py-3 px-4 text-sm text-muted font-medium">Пакет</th>
                    {(Object.keys(gig.packages) as PackageKey[]).map((key) => (
                      <th key={key} className="text-center py-3 px-4">
                        <span className={`text-sm font-semibold ${key === activePackage ? 'text-gold' : 'text-heading'}`}>
                          {packageLabels[key]}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gold/10">
                    <td className="py-3 px-4 text-sm text-muted">Цена</td>
                    {(Object.keys(gig.packages) as PackageKey[]).map((key) => (
                      <td key={key} className="text-center py-3 px-4 font-mono text-sm font-bold text-gold">
                        {gig.packages[key].price.toLocaleString('ru-RU')} &#8381;
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gold/10">
                    <td className="py-3 px-4 text-sm text-muted">Срок</td>
                    {(Object.keys(gig.packages) as PackageKey[]).map((key) => (
                      <td key={key} className="text-center py-3 px-4 text-sm text-body font-mono">
                        {gig.packages[key].deliveryDays} дней
                      </td>
                    ))}
                  </tr>
                  {gig.packages.premium.features.map((_, fi) => (
                    <tr key={fi} className="border-b border-gold/5">
                      <td className="py-3 px-4 text-sm text-muted">
                        {gig.packages.premium.features[fi]}
                      </td>
                      {(Object.keys(gig.packages) as PackageKey[]).map((key) => (
                        <td key={key} className="text-center py-3 px-4">
                          {fi < gig.packages[key].features.length ? (
                            <Check size={16} className="text-neon-emerald mx-auto" />
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {gig.tags.map((tag) => (
              <span key={tag} className="px-3 py-1.5 text-xs bg-white/5 text-muted rounded-lg border border-gold/10">
                {tag}
              </span>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-heading mb-6">
              Отзывы
              <span className="text-sm font-normal text-muted ml-2">({gig.reviewCount})</span>
            </h2>
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar src={review.avatar} alt={review.author} size="sm" />
                    <div>
                      <p className="text-sm font-medium text-heading">{review.author}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={12} className={i < review.rating ? 'fill-gold text-gold' : 'text-muted/30'} />
                          ))}
                        </div>
                        <span className="text-xs text-muted">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-body leading-relaxed pl-11">{review.text}</p>
                  {review.reply && (
                    <div className="ml-11 pl-4 border-l-2 border-gold/30">
                      <p className="text-xs text-gold mb-1">Ответ фрилансера</p>
                      <p className="text-sm text-muted">{review.reply}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-[380px] flex-shrink-0">
          <div className="lg:sticky lg:top-24 space-y-6">
            <div className="card p-6 space-y-5">
              <div className="flex rounded-xl overflow-hidden border border-gold/15">
                {(Object.keys(gig.packages) as PackageKey[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActivePackage(key)}
                    className={`flex-1 py-3 text-sm font-medium text-center transition-all cursor-pointer ${
                      activePackage === key
                        ? 'bg-gold/10 text-gold border-b-2 border-gold'
                        : 'text-muted hover:text-body'
                    }`}
                  >
                    {packageLabels[key]}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-body text-sm">{pkg.description}</span>
                  <span className="text-2xl font-bold text-gold font-mono">
                    {pkg.price.toLocaleString('ru-RU')} &#8381;
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted">
                  <Clock size={14} />
                  <span>Срок доставки: <span className="text-body font-mono">{pkg.deliveryDays} дней</span></span>
                </div>

                <div className="space-y-2 pt-2">
                  {pkg.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <Check size={14} className="text-neon-emerald flex-shrink-0" />
                      <span className="text-sm text-body">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="primary" size="lg" className="w-full">
                Заказать за {pkg.price.toLocaleString('ru-RU')} &#8381;
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-muted">
                <ShieldCheck size={14} className="text-neon-cyan" />
                <span>Безопасная сделка</span>
              </div>
            </div>

            <div className="card p-6 space-y-4">
              <Link to={`/users/${gig.freelancer.username}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <Avatar src={gig.freelancer.avatar} alt={gig.freelancer.name} size="lg" isOnline={gig.freelancer.isOnline} />
                <div>
                  <p className="text-sm font-semibold text-heading">{gig.freelancer.name}</p>
                  <p className="text-xs text-muted">{gig.freelancer.title}</p>
                  <StarRating rating={gig.freelancer.rating} count={gig.freelancer.reviewCount} size={12} />
                </div>
              </Link>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-white/5 rounded-xl p-3 border border-gold/5">
                  <p className="text-lg font-bold text-heading font-mono">{gig.freelancer.ordersCompleted}</p>
                  <p className="text-xs text-muted">заказов</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-gold/5">
                  <p className="text-lg font-bold text-neon-emerald font-mono">{gig.freelancer.successRate}%</p>
                  <p className="text-xs text-muted">успех</p>
                </div>
              </div>

              <div className="text-xs text-muted">
                <span>Среднее время ответа: </span>
                <span className="text-body">{gig.freelancer.responseTime}</span>
              </div>

              <Button variant="secondary" size="md" className="w-full">
                <MessageCircle size={16} />
                Написать
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
