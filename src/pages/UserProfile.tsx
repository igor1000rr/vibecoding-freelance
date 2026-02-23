import { useParams } from 'react-router-dom';
import { MapPin, Clock, Calendar, TrendingUp, Star, ShieldCheck } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import StarRating from '../components/ui/StarRating';
import Tabs from '../components/ui/Tabs';
import GigCard from '../components/GigCard';
import { freelancers, gigs, reviews } from '../data/mock';

export default function UserProfile() {
  const { username } = useParams();
  const user = freelancers.find((f) => f.username === username) || freelancers[0];
  const userGigs = gigs.filter((g) => g.freelancer.id === user.id);

  const tabsData = [
    {
      id: 'gigs',
      label: `Кворки (${userGigs.length})`,
      content: (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userGigs.length > 0
            ? userGigs.map((gig, i) => <GigCard key={gig.id} gig={gig} index={i} />)
            : gigs.slice(0, 3).map((gig, i) => <GigCard key={gig.id} gig={gig} index={i} />)
          }
        </div>
      ),
    },
    {
      id: 'portfolio',
      label: 'Портфолио',
      content: (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {(userGigs.length > 0 ? userGigs : gigs.slice(0, 6)).map((gig) => (
            <div key={gig.id} className="aspect-video rounded-xl overflow-hidden group cursor-pointer border border-gold/10">
              <img
                src={gig.image}
                alt={gig.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'reviews',
      label: `Отзывы (${user.reviewCount})`,
      content: (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="card p-5 space-y-3">
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
              <p className="text-sm text-body leading-relaxed">{review.text}</p>
              {review.reply && (
                <div className="pl-4 border-l-2 border-gold/30">
                  <p className="text-xs text-gold mb-1">Ответ</p>
                  <p className="text-sm text-muted">{review.reply}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      <Breadcrumbs items={[
        { label: 'Главная', href: '/' },
        { label: 'Фрилансеры' },
        { label: user.name },
      ]} />

      <div className="mt-8 card p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-neon-violet/5" />
        <div className="absolute inset-0 sacred-bg opacity-30" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start gap-6">
          <Avatar src={user.avatar} alt={user.name} size="xl" isOnline={user.isOnline} />
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-heading font-bold text-heading">{user.name}</h1>
              {user.level === 'pro' && <Badge variant="amber">PRO</Badge>}
              {user.level === 'verified' && (
                <Badge variant="blue">
                  <ShieldCheck size={12} className="mr-1" />
                  Проверенный
                </Badge>
              )}
            </div>
            <p className="text-body">{user.title}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <StarRating rating={user.rating} count={user.reviewCount} />
              <span className="flex items-center gap-1 text-muted">
                <MapPin size={14} />
                {user.location}
              </span>
              <span className="flex items-center gap-1 text-muted">
                <Calendar size={14} />
                На платформе с {user.memberSince}
              </span>
            </div>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          <div className="bg-white/5 rounded-xl p-4 text-center border border-gold/5">
            <p className="text-2xl font-bold text-heading font-mono">{user.ordersCompleted}</p>
            <p className="text-xs text-muted mt-1">Заказов выполнено</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center border border-gold/5">
            <p className="text-2xl font-bold text-neon-emerald font-mono">{user.successRate}%</p>
            <p className="text-xs text-muted mt-1">Успешных заказов</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center border border-gold/5">
            <div className="flex items-center justify-center gap-1">
              <Clock size={16} className="text-gold" />
              <p className="text-lg font-bold text-heading">{user.responseTime}</p>
            </div>
            <p className="text-xs text-muted mt-1">Время ответа</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center border border-gold/5">
            <div className="flex items-center justify-center gap-1">
              <TrendingUp size={16} className="text-gold" />
              <p className="text-lg font-bold text-heading">{user.rating}</p>
            </div>
            <p className="text-xs text-muted mt-1">Рейтинг</p>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-8">
        <div>
          <h2 className="text-lg font-heading font-semibold text-heading mb-3">О себе</h2>
          <p className="text-sm text-body leading-relaxed">{user.bio}</p>
        </div>

        <div>
          <h2 className="text-lg font-heading font-semibold text-heading mb-3">Навыки</h2>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill) => (
              <span key={skill} className="px-3 py-1.5 text-sm bg-white/5 text-body rounded-lg border border-gold/10">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <Tabs tabs={tabsData} />
      </div>
    </div>
  );
}
