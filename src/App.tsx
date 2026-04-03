import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { AtlasFab } from './components/layout/AtlasFab';
import { Dashboard } from './components/screens/Dashboard';
import { useNavigationStore } from './stores/navigationStore';

const screenMap: Record<string, JSX.Element> = {
  dashboard: <Dashboard />
};

export default function App() {
  const activeScreen = useNavigationStore((s) => s.activeScreen);

  return (
    <div className="h-screen bg-[var(--bg)] text-[var(--text)] font-body">
      <Sidebar />
      <div className="ml-[var(--sidebar-w)]">
        <Topbar />
        <main className="mt-[var(--topbar-h)] p-6">{screenMap[activeScreen] ?? <Dashboard />}</main>
      </div>
      <AtlasFab />
    </div>
  );
}
