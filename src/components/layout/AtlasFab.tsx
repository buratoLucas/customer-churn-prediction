import { Bot } from 'lucide-react';

export function AtlasFab() {
  return (
    <button
      className="fixed bottom-6 right-6 flex items-center gap-2 rounded-full bg-[var(--primary)] px-5 py-3 text-white shadow-lg"
      aria-label="Open Atlas"
    >
      <Bot size={18} />
      Atlas
    </button>
  );
}
