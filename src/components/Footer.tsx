import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Zap, Github, MessageCircle } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-gold/20 bg-deep-space relative z-[1]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Zap size={20} className="text-gold" />
              <span className="text-lg font-display font-bold tracking-wider text-gold-gradient">VIBECODER</span>
            </Link>
            <p className="text-sm text-body leading-relaxed">{t('footer.description')}</p>
          </div>

          <div>
            <h4 className="text-sm font-heading font-semibold text-gold/70 mb-4 uppercase tracking-wider">{t('footer.categories')}</h4>
            <ul className="space-y-2">
              {[t('footer.cat_websites'), t('footer.cat_mobile'), t('footer.cat_bots'), t('footer.cat_ai')].map((item) => (
                <li key={item}>
                  <Link to="/categories/web-development" className="text-sm text-body hover:text-gold transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-heading font-semibold text-gold/70 mb-4 uppercase tracking-wider">{t('footer.platform')}</h4>
            <ul className="space-y-2">
              {[t('footer.how_it_works'), t('footer.become_freelancer'), t('footer.safe_deals'), t('footer.support')].map((item) => (
                <li key={item}>
                  <span className="text-sm text-body hover:text-gold transition-colors cursor-pointer">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-heading font-semibold text-gold/70 mb-4 uppercase tracking-wider">{t('footer.contacts')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex items-center gap-2 text-sm text-body hover:text-gold transition-colors">
                  <MessageCircle size={14} />
                  Telegram
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-sm text-body hover:text-gold transition-colors">
                  <Github size={14} />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">2024-2026 VibeCoder. {t('footer.rights')}</p>
          <div className="flex gap-6">
            <span className="text-xs text-muted hover:text-gold cursor-pointer transition-colors">{t('footer.terms')}</span>
            <span className="text-xs text-muted hover:text-gold cursor-pointer transition-colors">{t('footer.privacy')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
