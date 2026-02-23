import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Zap, Mail, Lock, User, AtSign, Github, Globe, Eye, EyeOff } from 'lucide-react';
import Button from '../components/ui/Button';

type AuthMode = 'login' | 'register';
type Role = 'client' | 'freelancer';

export default function Auth() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<AuthMode>('login');
  const [role, setRole] = useState<Role>('client');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (mode === 'register' && !form.name.trim()) e.name = t('auth.enter_name');
    if (mode === 'register' && !form.username.trim()) e.username = t('auth.enter_username');
    if (!form.email.includes('@')) e.email = t('auth.invalid_email');
    if (form.password.length < 6) e.password = t('auth.min_6_chars');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) { /* placeholder */ }
  };

  const inputClass = (field: string) =>
    `w-full bg-gold/10 border ${errors[field] ? 'border-neon-rose' : 'border-gold/30 focus:border-gold'} rounded-xl px-4 py-3 pl-10 text-sm text-heading placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-gold/40 transition-all`;

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 sacred-bg">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <Zap size={28} className="text-gold" />
            <span className="text-2xl font-display font-bold tracking-wider text-gold-gradient">VIBECODER</span>
          </Link>
          <h1 className="text-2xl font-heading font-bold text-heading">
            {mode === 'login' ? t('auth.welcome') : t('auth.create_account')}
          </h1>
          <p className="text-sm text-muted mt-1">
            {mode === 'login' ? t('auth.login_to_account') : t('auth.join_vibecoder')}
          </p>
        </div>

        <div className="card p-8 space-y-6">
          <div className="flex rounded-xl overflow-hidden border border-gold/30">
            <button
              onClick={() => { setMode('login'); setErrors({}); }}
              className={`flex-1 py-3 text-sm font-medium text-center transition-all cursor-pointer ${
                mode === 'login' ? 'bg-gold/10 text-gold' : 'text-muted hover:text-body'
              }`}
            >
              {t('auth.tab_login')}
            </button>
            <button
              onClick={() => { setMode('register'); setErrors({}); }}
              className={`flex-1 py-3 text-sm font-medium text-center transition-all cursor-pointer ${
                mode === 'register' ? 'bg-gold/10 text-gold' : 'text-muted hover:text-body'
              }`}
            >
              {t('auth.tab_register')}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <>
                <div>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                    <input type="text" placeholder={t('auth.name')} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass('name')} />
                  </div>
                  {errors.name && <p className="text-xs text-neon-rose mt-1">{errors.name}</p>}
                </div>
                <div>
                  <div className="relative">
                    <AtSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                    <input type="text" placeholder={t('auth.username')} value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className={inputClass('username')} />
                  </div>
                  {errors.username && <p className="text-xs text-neon-rose mt-1">{errors.username}</p>}
                </div>
              </>
            )}
            <div>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input type="email" placeholder={t('auth.email')} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass('email')} />
              </div>
              {errors.email && <p className="text-xs text-neon-rose mt-1">{errors.email}</p>}
            </div>
            <div>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input type={showPassword ? 'text' : 'password'} placeholder={t('auth.password')} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={inputClass('password')} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-body cursor-pointer">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-neon-rose mt-1">{errors.password}</p>}
            </div>

            {mode === 'register' && (
              <div>
                <p className="text-sm text-muted mb-2">{t('auth.role')}</p>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setRole('client')}
                    className={`flex-1 py-3 text-sm rounded-xl border transition-all cursor-pointer ${role === 'client' ? 'border-gold bg-gold/10 text-gold' : 'border-gold/20 text-muted hover:text-body'}`}>
                    {t('auth.customer')}
                  </button>
                  <button type="button" onClick={() => setRole('freelancer')}
                    className={`flex-1 py-3 text-sm rounded-xl border transition-all cursor-pointer ${role === 'freelancer' ? 'border-gold bg-gold/10 text-gold' : 'border-gold/20 text-muted hover:text-body'}`}>
                    {t('auth.freelancer')}
                  </button>
                </div>
              </div>
            )}

            <Button type="submit" variant="primary" size="lg" className="w-full">
              {mode === 'login' ? t('auth.loginButton') : t('auth.registerButton')}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gold/20" /></div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-nebula px-3 text-muted">{t('auth.orContinueWith')}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[{ icon: Globe, label: 'Google' }, { icon: Globe, label: 'VK' }, { icon: Github, label: 'GitHub' }].map((provider) => (
              <button key={provider.label}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gold/20 text-sm text-muted hover:text-gold hover:border-gold/25 transition-all cursor-pointer">
                <provider.icon size={16} />
                <span className="hidden sm:inline">{provider.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
