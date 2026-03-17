import { Outlet, useLocation } from 'react-router-dom';
import TopNav from '../components/TopNav';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/invoices': 'Invoices',
  '/clients': 'Clients',
  '/settings': 'Settings',
};

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const title = pageTitles[pathname] ?? 'BillingOps';

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNav title={title} />
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
