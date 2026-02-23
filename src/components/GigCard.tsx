import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import type { Gig } from '../types';
import Avatar from './ui/Avatar';
import StarRating from './ui/StarRating';

interface GigCardProps {
  gig: Gig;
  index?: number;
}

export default function GigCard({ gig, index = 0 }: GigCardProps) {
  return (
    <Link
      to={`/gigs/${gig.id}`}
      className="group block card overflow-hidden opacity-0 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="aspect-video overflow-hidden relative">
        <img
          src={gig.image}
          alt={gig.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Avatar src={gig.freelancer.avatar} alt={gig.freelancer.name} size="sm" isOnline={gig.freelancer.isOnline} />
          <span className="text-sm text-muted truncate">{gig.freelancer.name}</span>
          {gig.freelancer.level === 'pro' && (
            <span className="ml-auto text-[10px] font-bold bg-gold/20 text-gold px-2 py-0.5 rounded-full border border-gold/30">PRO</span>
          )}
        </div>

        <h3 className="text-sm font-medium text-heading leading-snug line-clamp-2 group-hover:text-gold transition-colors duration-300">
          {gig.title}
        </h3>

        <div className="flex items-center gap-3 text-sm">
          <StarRating rating={gig.rating} count={gig.reviewCount} />
          <span className="text-gold/20">|</span>
          <span className="flex items-center gap-1 text-muted">
            <Package size={13} />
            <span className="font-mono">{gig.ordersCount}+</span>
          </span>
        </div>

        <div className="border-t border-gold/10 pt-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {gig.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="px-2 py-0.5 text-xs bg-white/5 text-muted rounded-md border border-gold/5">
                  {tag}
                </span>
              ))}
            </div>
            <span className="text-lg font-bold text-gold font-mono whitespace-nowrap ml-2">
              от {gig.packages.economy.price.toLocaleString('ru-RU')} ₽
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
