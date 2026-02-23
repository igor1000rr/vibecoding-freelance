import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('en') ? 'en' : 'ru';

  const toggle = () => {
    i18n.changeLanguage(currentLang === 'ru' ? 'en' : 'ru');
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono text-gold/70 hover:text-gold border border-gold/30 hover:border-gold/30 rounded-lg bg-gold/10 transition-all cursor-pointer uppercase tracking-wider"
      title={currentLang === 'ru' ? 'Switch to English' : 'Переключить на русский'}
    >
      <Globe size={14} />
      {currentLang === 'ru' ? 'EN' : 'RU'}
    </button>
  );
}
