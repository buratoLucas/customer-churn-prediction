import { MetricCard } from '../shared/MetricCard';

export function Dashboard() {
  return (
    <section className="space-y-4">
      <h3 className="font-display text-2xl">Dashboard</h3>
      <div className="grid grid-cols-4 gap-4">
        <MetricCard title="Available cash" value="£0.00" />
        <MetricCard title="Monthly income" value="£0.00" />
        <MetricCard title="Monthly outflow" value="£0.00" />
        <MetricCard title="Debt pressure" value="0%" />
      </div>
    </section>
  );
}
