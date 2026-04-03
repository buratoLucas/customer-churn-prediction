import { useThemeStore } from '../../stores/themeStore';

export function Topbar() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="fixed left-[var(--sidebar-w)] right-0 top-0 flex h-[var(--topbar-h)] items-center justify-between border-b border-[var(--line)] bg-[var(--panel)] px-6">
      <h2 className="font-display text-xl">Life Operating System</h2>
      <button className="rounded-full border border-[var(--line)] px-4 py-2" onClick={toggleTheme}>
        {theme === 'light' ? 'Dark mode' : 'Light mode'}
      </button>
    </header>
  );
}
