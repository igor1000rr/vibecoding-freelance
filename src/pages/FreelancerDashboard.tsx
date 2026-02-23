import { useState } from 'react';
import {
  LayoutDashboard, Package, ShoppingBag, BarChart3, Wallet,
  Eye, TrendingUp, ArrowUpRight, Pause, Edit3, Trash2,
} from 'lucide-react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { gigs, orders } from '../data/mock';

const sidebarItems = [
  { id: 'overview', icon: LayoutDashboard, label: 'Обзор' },
  { id: 'gigs', icon: Package, label: 'Мои кворки' },
  { id: 'orders', icon: ShoppingBag, label: 'Заказы' },
  { id: 'analytics', icon: BarChart3, label: 'Аналитика' },
  { id: 'wallet', icon: Wallet, label: 'Вывод средств' },
];

export default function FreelancerDashboard() {
  const [activeSection, setActiveSection] = useState('overview');

  const myGigs = gigs.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      <div className="flex gap-8">
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <nav className="card p-3 space-y-1 sticky top-24">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm transition-all cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-gold/10 text-gold'
                    : 'text-muted hover:text-body hover:bg-white/5'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="lg:hidden flex gap-2 mb-6 overflow-x-auto pb-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-gold/10 text-gold border border-gold'
                    : 'bg-white/5 text-muted border border-gold/10'
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
          </div>

          {activeSection === 'overview' && (
            <div className="space-y-8">
              <h1 className="text-2xl font-bold text-heading">Кабинет фрилансера</h1>

              <div className="card p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-neon-violet/5" />
                <div className="relative z-10">
                  <p className="text-sm text-muted mb-1">Доход за месяц</p>
                  <p className="text-5xl font-bold text-heading font-mono">38 000 ₽</p>
                  <div className="flex items-center gap-1 mt-2 text-accent-emerald text-sm">
                    <ArrowUpRight size={16} />
                    <span>+24% к прошлому месяцу</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Активные заказы', value: '3', color: 'text-accent-violet' },
                  { label: 'Просмотры', value: '1,247', color: 'text-gold' },
                  { label: 'Конверсия', value: '8.2%', color: 'text-accent-emerald' },
                  { label: 'Рейтинг', value: '4.9', color: 'text-accent-amber' },
                ].map((stat) => (
                  <div key={stat.label} className="card p-5">
                    <p className="text-xs text-muted mb-1">{stat.label}</p>
                    <p className={`text-2xl font-bold font-mono ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="text-lg font-semibold text-heading mb-4">Активные заказы</h2>
                <div className="space-y-3">
                  {orders.filter((o) => o.status === 'in_progress').map((order) => (
                    <div key={order.id} className="card p-4 flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-heading">{order.gigTitle}</p>
                        <p className="text-xs text-muted">{order.date} / {order.packageType}</p>
                      </div>
                      <Badge variant="violet">В работе</Badge>
                      <span className="text-sm font-mono text-heading font-semibold">{order.price.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'gigs' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-heading">Мои кворки</h1>
                <Button variant="primary" size="sm" onClick={() => window.location.href = '/dashboard/create-gig'}>
                  Создать кворк
                </Button>
              </div>
              <div className="space-y-4">
                {myGigs.map((gig) => (
                  <div key={gig.id} className="card p-5 flex flex-col sm:flex-row items-start gap-4">
                    <img src={gig.image} alt={gig.title} className="w-full sm:w-32 h-20 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-heading">{gig.title}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted">
                        <span className="flex items-center gap-1"><Eye size={12} /> 342 просмотра</span>
                        <span className="flex items-center gap-1"><Package size={12} /> {gig.ordersCount} заказов</span>
                        <span className="flex items-center gap-1"><TrendingUp size={12} /> {gig.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <span className="text-sm font-mono text-heading font-bold">
                        от {gig.packages.economy.price.toLocaleString('ru-RU')} ₽
                      </span>
                      <button className="p-2 text-muted hover:text-body rounded-lg hover:bg-white/5 transition-all cursor-pointer">
                        <Edit3 size={16} />
                      </button>
                      <button className="p-2 text-muted hover:text-gold rounded-lg hover:bg-white/5 transition-all cursor-pointer">
                        <Pause size={16} />
                      </button>
                      <button className="p-2 text-muted hover:text-neon-rose rounded-lg hover:bg-white/5 transition-all cursor-pointer">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'orders' && (
            <div>
              <h1 className="text-2xl font-bold text-heading mb-6">Заказы</h1>
              <div className="space-y-3">
                {orders.map((order) => {
                  const cfg = { new: { label: 'Новый', variant: 'green' as const }, in_progress: { label: 'В работе', variant: 'violet' as const }, delivered: { label: 'Доставлен', variant: 'emerald' as const }, completed: { label: 'Завершён', variant: 'blue' as const } };
                  return (
                    <div key={order.id} className="card p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-heading">{order.gigTitle}</p>
                        <p className="text-xs text-muted mt-0.5">{order.date} / {order.packageType}</p>
                      </div>
                      <Badge variant={cfg[order.status].variant}>{cfg[order.status].label}</Badge>
                      <span className="text-sm font-bold font-mono text-heading">{order.price.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeSection === 'analytics' && (
            <div>
              <h1 className="text-2xl font-bold text-heading mb-6">Аналитика</h1>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="card p-6">
                  <h3 className="text-sm text-muted mb-4">Просмотры за 30 дней</h3>
                  <div className="flex items-end gap-1 h-40">
                    {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100, 55, 80].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gold/15 rounded-t hover:bg-gold/25 transition-colors"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="card p-6">
                  <h3 className="text-sm text-muted mb-4">Конверсия по кворкам</h3>
                  <div className="space-y-4">
                    {myGigs.slice(0, 3).map((gig) => (
                      <div key={gig.id}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-body truncate pr-4">{gig.title.slice(0, 30)}...</span>
                          <span className="text-gold font-mono">{(Math.random() * 10 + 3).toFixed(1)}%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gold/30 rounded-full"
                            style={{ width: `${Math.random() * 60 + 20}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'wallet' && (
            <div>
              <h1 className="text-2xl font-bold text-heading mb-6">Вывод средств</h1>
              <div className="card p-8 max-w-md space-y-6">
                <div>
                  <p className="text-sm text-muted mb-1">Доступно к выводу</p>
                  <p className="text-4xl font-bold text-heading font-mono">38 000 ₽</p>
                </div>
                <div>
                  <label className="block text-sm text-muted mb-1.5">Сумма вывода</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full bg-white/5 border border-gold/15 rounded-xl px-4 py-3 text-lg text-heading font-mono placeholder:text-muted focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted mb-1.5">Способ вывода</label>
                  <select className="w-full bg-white/5 border border-gold/15 rounded-xl px-4 py-3 text-sm text-body appearance-none cursor-pointer focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20">
                    <option>Банковская карта</option>
                    <option>ЮMoney</option>
                    <option>QIWI</option>
                  </select>
                </div>
                <Button variant="primary" size="lg" className="w-full">Вывести средства</Button>
                <p className="text-xs text-muted text-center">Комиссия: 0%. Зачисление: 1-3 рабочих дня</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
