import { LayoutDashboard, Receipt, WalletCards, TrendingUp, Calendar, BarChart3, Lightbulb, Settings } from 'lucide-react';
import { useNavigationStore } from '../../stores/navigationStore';

const items = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: Receipt },
  { id: 'accounts', label: 'Accounts', icon: WalletCards },
  { id: 'investments', label: 'Investments', icon: TrendingUp },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'insights', label: 'Insights', icon: Lightbulb },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export function Sidebar() {
  const { activeScreen, setActiveScreen, phaseSummary } = useNavigationStore();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[var(--sidebar-w)] border-r border-[var(--line)] bg-[var(--panel)] p-4">
      <h1 className="font-display text-2xl">Altan OS</h1>
      <p className="mt-2 rounded-full bg-[var(--primary-lt)] px-3 py-1 text-xs text-[var(--primary)]">{phaseSummary}</p>
      <nav className="mt-6 space-y-2">
        {items.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveScreen(id)}
            className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left ${
              activeScreen === id ? 'bg-[var(--primary-lt)] text-[var(--primary)]' : 'hover:bg-[var(--panel-2)]'
            }`}
          >
            <Icon size={16} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
