import type { HeaderConfig } from '@vibecoding/shared';
import type { FooterConfig } from '../components/Footer';
import { megaMenuCategories } from '../data/megaMenu';

export const freelanceHeaderConfig: Omit<HeaderConfig, 'onOpenSearch'> = {
  logoText: 'VIBECODER',
  logoTo: '/',
  megaMenu: megaMenuCategories,
  searchPlaceholder: 'Найти услуги',
  loginPath: '/auth',
  profilePath: '/dashboard',
};

export const freelanceFooterConfig: FooterConfig = {
  brandName: 'VibeCoder',
  brandDescription: 'Биржа фриланс-услуг для вайб-кодеров. AI-ассистированная разработка быстрее, доступнее, прозрачнее.',
  sections: [
    {
      title: 'Категории',
      titleColor: 'var(--neon-cyan, #00f5ff)',
      links: [
        { label: 'Разработка сайтов', to: '/categories/web-development' },
        { label: 'Мобильные приложения', to: '/categories/cross-platform' },
        { label: 'Боты и автоматизация', to: '/categories/telegram-bots' },
        { label: 'AI Интеграции', to: '/categories/ai-integrations' },
      ],
    },
    {
      title: 'Платформа',
      titleColor: 'var(--neon-cyan, #00f5ff)',
      links: [
        { label: 'Как это работает' },
        { label: 'Стать фрилансером' },
        { label: 'Безопасные сделки' },
        { label: 'Поддержка' },
      ],
    },
  ],
  contacts: {
    telegramUrl: 'https://t.me/vibecodingby',
    telegramLabel: 'Telegram',
  },
  copyrightText: '© 2024-2026 VibeCoder. Все права защищены.',
  copyrightLinks: [
    { label: 'Условия использования' },
    { label: 'Политика конфиденциальности' },
  ],
  loginPath: '/auth',
};
