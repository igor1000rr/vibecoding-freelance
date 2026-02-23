import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, ShoppingBag, MessageCircle, Heart, Settings, TrendingUp, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import GigCard from '../components/GigCard';
import { orders, messages, gigs, freelancers } from '../data/mock';
import type { Order } from '../types';

export default function Dashboard() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('overview');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const statusConfig: Record<Order['status'], { label: string; variant: 'green' | 'violet' | 'emerald' | 'blue' }> = {
    new: { label: t('dashboard.status_new'), variant: 'green' },
    in_progress: { label: t('dashboard.status_in_progress'), variant: 'violet' },
    delivered: { label: t('dashboard.status_delivered'), variant: 'emerald' },
    completed: { label: t('dashboard.status_completed'), variant: 'blue' },
  };

  const sidebarItems = [
    { id: 'overview', icon: LayoutDashboard, label: t('dashboard.overview') },
    { id: 'orders', icon: ShoppingBag, label: t('dashboard.my_orders') },
    { id: 'messages', icon: MessageCircle, label: t('dashboard.messages') },
    { id: 'favorites', icon: Heart, label: t('dashboard.favorites') },
    { id: 'settings', icon: Settings, label: t('dashboard.settings') },
  ];

  const filteredOrders = statusFilter === 'all' ? orders : orders.filter((o) => o.status === statusFilter);

  const stats = [
    { label: t('dashboard.active'), value: orders.filter((o) => o.status === 'in_progress').length, icon: Clock, color: 'text-accent-violet' },
    { label: t('dashboard.completed'), value: orders.filter((o) => o.status === 'completed').length, icon: CheckCircle2, color: 'text-accent-emerald' },
    { label: t('dashboard.total_orders'), value: orders.length, icon: TrendingUp, color: 'text-gold' },
    { label: t('dashboard.pending'), value: orders.filter((o) => o.status === 'new' || o.status === 'delivered').length, icon: AlertCircle, color: 'text-accent-amber' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      <div className="flex gap-8">
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <nav className="card p-3 space-y-1 sticky top-24">
            {sidebarItems.map((item) => (
              <button key={item.id} onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm transition-all cursor-pointer ${activeSection === item.id ? 'bg-gold/10 text-gold' : 'text-muted hover:text-body hover:bg-gold/10'}`}>
                <item.icon size={18} />{item.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="lg:hidden flex gap-2 mb-6 overflow-x-auto pb-2">
            {sidebarItems.map((item) => (
              <button key={item.id} onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all cursor-pointer ${activeSection === item.id ? 'bg-gold/10 text-gold border border-gold' : 'bg-gold/10 text-muted border border-gold/20'}`}>
                <item.icon size={16} />{item.label}
              </button>
            ))}
          </div>

          {activeSection === 'overview' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-bold text-heading mb-6">{t('dashboard.overview')}</h1>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="card p-5">
                      <div className="flex items-center gap-3 mb-2"><stat.icon size={20} className={stat.color} /><span className="text-xs text-muted">{stat.label}</span></div>
                      <p className="text-3xl font-bold text-heading font-mono">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-heading mb-4">{t('dashboard.recent_orders')}</h2>
                <div className="space-y-3">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="card p-4 flex items-center gap-4">
                      <Avatar src={order.freelancerAvatar} alt={order.freelancerName} size="sm" />
                      <div className="flex-1 min-w-0"><p className="text-sm text-heading truncate">{order.gigTitle}</p><p className="text-xs text-muted">{order.freelancerName}</p></div>
                      <Badge variant={statusConfig[order.status].variant}>{statusConfig[order.status].label}</Badge>
                      <span className="text-sm font-mono text-heading font-semibold hidden sm:block">{order.price.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'orders' && (
            <div>
              <h1 className="text-2xl font-bold text-heading mb-6">{t('dashboard.my_orders')}</h1>
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {[{ value: 'all', label: t('common.all') }, ...Object.entries(statusConfig).map(([k, v]) => ({ value: k, label: v.label }))].map((f) => (
                  <button key={f.value} onClick={() => setStatusFilter(f.value)}
                    className={`px-4 py-2 text-sm rounded-xl border whitespace-nowrap transition-all cursor-pointer ${statusFilter === f.value ? 'border-gold bg-gold/10 text-gold' : 'border-gold/20 text-muted hover:text-body'}`}>{f.label}</button>
                ))}
              </div>
              <div className="space-y-3">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="card p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Avatar src={order.freelancerAvatar} alt={order.freelancerName} size="md" />
                    <div className="flex-1 min-w-0"><p className="text-sm font-medium text-heading">{order.gigTitle}</p><p className="text-xs text-muted mt-0.5">{order.freelancerName} / {order.packageType}</p></div>
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <span className="text-xs text-muted font-mono">{order.date}</span>
                      <Badge variant={statusConfig[order.status].variant}>{statusConfig[order.status].label}</Badge>
                      <span className="text-sm font-bold font-mono text-heading ml-auto sm:ml-0">{order.price.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'messages' && (
            <div>
              <h1 className="text-2xl font-bold text-heading mb-6">{t('dashboard.messages')}</h1>
              <div className="space-y-2">
                {messages.map((msg) => (
                  <div key={msg.id} className="card p-4 flex items-center gap-4 cursor-pointer hover:border-gold/30 transition-all">
                    <Avatar src={msg.avatar} alt={msg.name} size="md" isOnline={msg.isOnline} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between"><p className="text-sm font-medium text-heading">{msg.name}</p><span className="text-xs text-muted">{msg.time}</span></div>
                      <p className="text-sm text-muted truncate">{msg.lastMessage}</p>
                    </div>
                    {msg.unread > 0 && <span className="w-5 h-5 bg-gold text-void text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">{msg.unread}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'favorites' && (
            <div>
              <h1 className="text-2xl font-bold text-heading mb-6">{t('dashboard.favorites')}</h1>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">{gigs.slice(0, 6).map((gig, i) => <GigCard key={gig.id} gig={gig} index={i} />)}</div>
            </div>
          )}

          {activeSection === 'settings' && (
            <div>
              <h1 className="text-2xl font-bold text-heading mb-6">{t('dashboard.settings')}</h1>
              <div className="card p-6 space-y-6 max-w-xl">
                <div className="flex items-center gap-4">
                  <Avatar src={freelancers[0].avatar} alt="User" size="lg" />
                  <div><p className="text-sm font-medium text-heading">Иван Иванов</p><p className="text-xs text-muted">ivan@example.com</p></div>
                </div>
                {[{ label: t('dashboard.name_label'), value: 'Иван Иванов' }, { label: t('dashboard.email_label'), value: 'ivan@example.com' }, { label: t('dashboard.city_label'), value: 'Москва' }].map((field) => (
                  <div key={field.label}>
                    <label className="block text-sm text-muted mb-1.5">{field.label}</label>
                    <input type="text" defaultValue={field.value} className="w-full bg-gold/10 border border-gold/30 rounded-xl px-4 py-3 text-sm text-heading focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/40 transition-all" />
                  </div>
                ))}
                <Button variant="primary" size="md">{t('common.save')}</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
