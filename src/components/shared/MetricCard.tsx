type Props = { title: string; value: string };

export function MetricCard({ title, value }: Props) {
  return (
    <article className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--panel)] p-4 shadow-[0_4px_24px_rgba(12,22,55,.07)]">
      <p className="text-sm text-[var(--muted)]">{title}</p>
      <p className="mt-2 font-display text-2xl">{value}</p>
    </article>
  );
}
