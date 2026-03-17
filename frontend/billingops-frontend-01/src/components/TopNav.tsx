import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Bell, Search, User, Zap } from 'lucide-react';
import { getMe, logout } from '../api/auth';

interface TopNavProps {
  title: string;
}

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/invoices', label: 'Invoices' },
  { to: '/clients', label: 'Clients' },
  { to: '/settings', label: 'Settings' },
];

export default function TopNav({ title }: TopNavProps) {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const queryClient = useQueryClient();

  const meQuery = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: getMe,
    enabled: false,
    retry: false,
    staleTime: 0,
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      window.location.href = '/login';
    },
  });

  const onAccountClick = () => {
    setIsAccountOpen((prev) => {
      const next = !prev;
      if (next) {
        void meQuery.refetch();
      }
      return next;
    });
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 shadow-sm shadow-indigo-200">
            <Zap className="h-4.5 w-4.5 text-white" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-slate-900">BillingOps</p>
            <p className="text-xs text-slate-400">{title}</p>
          </div>
        </div>

        <nav className="ml-4 hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-400 transition hover:border-slate-300 hover:text-slate-600 sm:flex">
            <Search className="h-4 w-4" />
            <span>Search</span>
          </button>
          <button className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emerald-500" />
          </button>
          <div className="relative">
            <button
              type="button"
              onClick={onAccountClick}
              className="flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1.5 text-indigo-700 transition hover:bg-indigo-100"
            >
              <User className="h-4 w-4" />
              <span className="hidden text-sm font-medium sm:inline">My Account</span>
            </button>

            {isAccountOpen && (
              <div className="absolute right-0 top-12 z-50 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Account</p>

                {meQuery.isFetching && (
                  <p className="mt-3 text-sm text-slate-500">Loading profile...</p>
                )}

                {!meQuery.isFetching && meQuery.error && (
                  <div className="mt-3 space-y-2">
                    <p className="text-sm text-red-500">Failed to load profile.</p>
                    <button
                      type="button"
                      onClick={() => void meQuery.refetch()}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                    >
                      Retry
                    </button>
                  </div>
                )}

                {!meQuery.isFetching && meQuery.data && (
                  <div className="mt-3 space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{meQuery.data.fullName}</p>
                      <p className="text-sm text-slate-500">{meQuery.data.email}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => logoutMutation.mutate()}
                      disabled={logoutMutation.isPending}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {logoutMutation.isPending ? 'Signing out...' : 'Sign out'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-7xl items-center gap-1 overflow-x-auto px-4 pb-3 md:hidden sm:px-6 lg:px-8">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </header>
  );
}
