import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Card from '../components/ui/Card';
import StatusBadge from '../components/ui/StatusBadge';
import { formatCurrency, formatDate } from '../utils/formatters';
import type { Invoice } from '../types/invoice';

// ── Mock data (replace with real API data via useInvoices) ──────────────────
const revenueData = [
  { month: 'Jan', revenue: 4200 },
  { month: 'Feb', revenue: 5800 },
  { month: 'Mar', revenue: 3900 },
  { month: 'Apr', revenue: 6700 },
  { month: 'May', revenue: 7100 },
  { month: 'Jun', revenue: 8500 },
  { month: 'Jul', revenue: 7600 },
];

const recentInvoices: Pick<Invoice, 'id' | 'invoiceNumber' | 'clientName' | 'issueDate' | 'dueDate' | 'amount' | 'status'>[] = [
  { id: 1, invoiceNumber: 'INV-001', clientName: 'Acme Corp', issueDate: '2026-03-01', dueDate: '2026-03-31', amount: 2500, status: 'Paid' },
  { id: 2, invoiceNumber: 'INV-002', clientName: 'Globex Inc', issueDate: '2026-03-05', dueDate: '2026-04-04', amount: 1800, status: 'Sent' },
  { id: 3, invoiceNumber: 'INV-003', clientName: 'Initech', issueDate: '2026-02-15', dueDate: '2026-03-15', amount: 950, status: 'Overdue' },
  { id: 4, invoiceNumber: 'INV-004', clientName: 'Umbrella Ltd', issueDate: '2026-03-10', dueDate: '2026-04-09', amount: 3300, status: 'Draft' },
];

const stats = [
  { label: 'Total Revenue', value: formatCurrency(44800), change: '+12%' },
  { label: 'Outstanding', value: formatCurrency(5750), change: '2 invoices' },
  { label: 'Overdue', value: formatCurrency(950), change: '1 invoice' },
  { label: 'Active Clients', value: '8', change: '+2 this month' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-r from-indigo-600 via-blue-600 to-cyan-500 p-6 text-white shadow-lg shadow-indigo-100">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/70">Overview</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Your business at a glance</h2>
            <p className="mt-2 max-w-2xl text-sm text-white/80">
              Strong payment health this month. Keep momentum by following up on due invoices.
            </p>
          </div>
          <div className="rounded-xl border border-white/25 bg-white/10 px-4 py-3 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.14em] text-white/70">Collected This Month</p>
            <p className="mt-1 text-xl font-semibold">{formatCurrency(12840)}</p>
          </div>
        </div>
      </section>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border border-slate-200/80 bg-white shadow-sm shadow-slate-200/60">
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="mt-1 text-xs text-emerald-600">{stat.change}</p>
          </Card>
        ))}
      </div>

      {/* Revenue chart */}
      <Card className="border border-slate-200/80 bg-white shadow-sm shadow-slate-200/60">
        <h2 className="mb-4 text-base font-semibold text-slate-900">Revenue Over Time</h2>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={revenueData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(v) => `$${v / 1000}k`} axisLine={false} tickLine={false} />
            <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Revenue']} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Recent invoices table */}
      <Card className="border border-slate-200/80 bg-white shadow-sm shadow-slate-200/60">
        <h2 className="mb-4 text-base font-semibold text-slate-900">Recent Invoices</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs font-medium uppercase text-slate-400">
                <th className="pb-3 pr-4">Invoice</th>
                <th className="pb-3 pr-4">Client</th>
                <th className="pb-3 pr-4">Issued</th>
                <th className="pb-3 pr-4">Due</th>
                <th className="pb-3 pr-4">Amount</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentInvoices.map((inv) => (
                <tr key={inv.id} className="transition hover:bg-slate-50/80">
                  <td className="py-3 pr-4 font-medium text-indigo-600">{inv.invoiceNumber}</td>
                  <td className="py-3 pr-4 text-slate-700">{inv.clientName}</td>
                  <td className="py-3 pr-4 text-slate-500">{formatDate(inv.issueDate)}</td>
                  <td className="py-3 pr-4 text-slate-500">{formatDate(inv.dueDate)}</td>
                  <td className="py-3 pr-4 font-medium text-slate-900">{formatCurrency(inv.amount)}</td>
                  <td className="py-3">
                    <StatusBadge status={inv.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
