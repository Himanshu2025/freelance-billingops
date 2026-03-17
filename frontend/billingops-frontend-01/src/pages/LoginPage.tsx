import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Zap, Mail, Lock, User } from 'lucide-react';
import { login, register as registerUser } from '../api/auth';

// ─── Schemas ─────────────────────────────────────────────────────────────────
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Minimum 6 characters'),
});

const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Full name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Minimum 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

// ─── SVG Hero ─────────────────────────────────────────────────────────────────
function HeroIllustration() {
  return (
    <svg viewBox="0 0 520 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-md">
      <ellipse cx="260" cy="210" rx="230" ry="185" fill="white" fillOpacity="0.03" />
      <ellipse cx="340" cy="120" rx="110" ry="85" fill="white" fillOpacity="0.05" />

      {/* Main invoice card */}
      <g style={{ animation: 'heroFloat 7s ease-in-out infinite', transformOrigin: '260px 195px' }}>
        <rect x="140" y="95" width="240" height="200" rx="18" fill="white" fillOpacity="0.11" />
        <rect x="140" y="95" width="240" height="200" rx="18" stroke="white" strokeOpacity="0.22" strokeWidth="1.5" />
        <rect x="160" y="118" width="95" height="9" rx="4.5" fill="white" fillOpacity="0.85" />
        <rect x="160" y="135" width="58" height="6" rx="3" fill="white" fillOpacity="0.38" />
        <rect x="308" y="116" width="56" height="13" rx="6" fill="#a5f3fc" fillOpacity="0.55" />
        <line x1="160" y1="160" x2="360" y2="160" stroke="white" strokeOpacity="0.1" />
        <rect x="160" y="174" width="115" height="5" rx="2.5" fill="white" fillOpacity="0.35" />
        <rect x="318" y="174" width="42" height="5" rx="2.5" fill="white" fillOpacity="0.35" />
        <rect x="160" y="191" width="88" height="5" rx="2.5" fill="white" fillOpacity="0.25" />
        <rect x="318" y="191" width="42" height="5" rx="2.5" fill="white" fillOpacity="0.25" />
        <rect x="160" y="208" width="100" height="5" rx="2.5" fill="white" fillOpacity="0.25" />
        <rect x="318" y="208" width="42" height="5" rx="2.5" fill="white" fillOpacity="0.25" />
        <line x1="160" y1="228" x2="360" y2="228" stroke="white" strokeOpacity="0.1" />
        <rect x="160" y="240" width="44" height="7" rx="3.5" fill="white" fillOpacity="0.42" />
        <rect x="302" y="238" width="58" height="12" rx="6" fill="#6366f1" fillOpacity="0.9" />
        <rect x="160" y="266" width="56" height="20" rx="10" fill="#4ade80" fillOpacity="0.16" />
        <rect x="161" y="267" width="54" height="18" rx="9" stroke="#4ade80" strokeOpacity="0.45" strokeWidth="1" />
        <rect x="172" y="274" width="32" height="4" rx="2" fill="#4ade80" fillOpacity="0.75" />
      </g>

      {/* Stats card */}
      <g style={{ animation: 'heroFloat 9s ease-in-out infinite 1.5s', transformOrigin: '435px 125px' }}>
        <rect x="370" y="55" width="130" height="90" rx="14" fill="white" fillOpacity="0.08" />
        <rect x="370" y="55" width="130" height="90" rx="14" stroke="white" strokeOpacity="0.18" strokeWidth="1" />
        <rect x="386" y="73" width="60" height="6" rx="3" fill="white" fillOpacity="0.62" />
        <rect x="386" y="87" width="80" height="14" rx="4" fill="white" fillOpacity="0.07" />
        <rect x="390" y="91" width="70" height="7" rx="3" fill="#a5f3fc" fillOpacity="0.52" />
        <polyline points="386,130 402,120 422,126 440,112 460,106 482,114" stroke="#4ade80" strokeWidth="2" strokeOpacity="0.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="482" cy="114" r="4" fill="#4ade80" fillOpacity="0.9" />
      </g>

      {/* Bar chart card */}
      <g style={{ animation: 'heroFloat 8s ease-in-out infinite 3s', transformOrigin: '100px 345px' }}>
        <rect x="26" y="282" width="148" height="120" rx="14" fill="white" fillOpacity="0.08" />
        <rect x="26" y="282" width="148" height="120" rx="14" stroke="white" strokeOpacity="0.18" strokeWidth="1" />
        <rect x="42" y="300" width="62" height="6" rx="3" fill="white" fillOpacity="0.62" />
        <rect x="42" y="340" width="14" height="54" rx="3" fill="#818cf8" fillOpacity="0.65" />
        <rect x="62" y="328" width="14" height="66" rx="3" fill="#818cf8" fillOpacity="0.75" />
        <rect x="82" y="316" width="14" height="78" rx="3" fill="#6366f1" fillOpacity="0.88" />
        <rect x="102" y="324" width="14" height="70" rx="3" fill="#818cf8" fillOpacity="0.72" />
        <rect x="122" y="334" width="14" height="60" rx="3" fill="#818cf8" fillOpacity="0.62" />
      </g>

      {/* Floating dots */}
      <circle cx="116" cy="68" r="5" fill="white" fillOpacity="0.22" style={{ animation: 'heroFloat 6s ease-in-out infinite 0.5s' }} />
      <circle cx="402" cy="238" r="7" fill="white" fillOpacity="0.1" style={{ animation: 'heroFloat 10s ease-in-out infinite 2s' }} />
      <circle cx="60" cy="244" r="4" fill="#a5f3fc" fillOpacity="0.38" style={{ animation: 'heroFloat 7s ease-in-out infinite 1s' }} />
      <circle cx="462" cy="368" r="5" fill="#818cf8" fillOpacity="0.45" style={{ animation: 'heroFloat 8s ease-in-out infinite 4s' }} />
      <circle cx="490" cy="48" r="8" fill="white" fillOpacity="0.07" style={{ animation: 'heroFloat 11s ease-in-out infinite 0.8s' }} />
      <text x="482" y="298" fontSize="20" fill="white" fillOpacity="0.16" fontFamily="monospace" style={{ animation: 'heroFloat 9s ease-in-out infinite 2.5s' }}>$</text>
      <text x="20" y="196" fontSize="16" fill="white" fillOpacity="0.14" fontFamily="monospace" style={{ animation: 'heroFloat 7s ease-in-out infinite 1.2s' }}>$</text>
      <line x1="158" y1="188" x2="130" y2="304" stroke="white" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="4 5" />
      <line x1="372" y1="138" x2="384" y2="160" stroke="white" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="4 5" />
    </svg>
  );
}

// ─── Field wrapper ────────────────────────────────────────────────────────────
function Field({
  label,
  icon,
  error,
  action,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
          {icon}
          {label}
        </label>
        {action}
      </div>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
type Tab = 'login' | 'register';

export default function LoginPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('login');
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const loginForm = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });
  const regForm = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) });

  const onLogin = async (data: LoginValues) => {
    setServerError(null);
    try {
      await login(data);
      navigate('/');
    } catch (err: unknown) {
      setServerError(
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
          'Login failed. Please check your credentials.'
      );
    }
  };

  const onRegister = async (data: RegisterValues) => {
    setServerError(null);
    try {
      await registerUser(data);
      navigate('/');
    } catch (err: unknown) {
      setServerError(
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
          'Registration failed. Please try again.'
      );
    }
  };

  const switchTab = (t: Tab) => {
    setServerError(null);
    setTab(t);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* ── Left hero panel ── */}
      <div
        className="hidden lg:flex lg:w-3/5 relative flex-col items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 50%, #6d28d9 100%)' }}
      >
        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
        {/* Bottom wave */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C480,80 960,0 1440,40 L1440,80 L0,80 Z" fill="white" fillOpacity="0.04" />
        </svg>

        <div className="relative z-10 flex w-full flex-col items-center gap-8 px-14 text-white">
          <div className="flex items-center gap-3 self-start">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-sm">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">BillingOps</span>
          </div>

          <HeroIllustration />

          <div className="text-center">
            <p className="text-xl font-semibold tracking-tight text-white/90">
              Invoice smarter. Get paid faster.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/50">
              Manage clients, invoices and payments in one beautiful dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* ── Right auth panel ── */}
      <div className="flex w-full lg:w-2/5 flex-col items-center justify-center overflow-y-auto bg-white px-8 py-10">
        {/* Mobile logo (hidden on lg) */}
        <div className="mb-8 flex items-center gap-2 lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">BillingOps</span>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-7">
            <h1 className="text-[1.625rem] font-bold tracking-tight text-gray-900">
              {tab === 'login' ? 'Welcome back' : 'Create account'}
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              {tab === 'login'
                ? 'Sign in to continue to your dashboard.'
                : 'Start managing invoices in minutes.'}
            </p>
          </div>

          {/* Sliding tab switcher */}
          <div className="relative mb-7 flex rounded-xl bg-gray-100 p-1">
            <button
              onClick={() => switchTab('login')}
              className={`relative z-10 flex-1 rounded-lg py-2 text-sm font-medium transition-colors duration-150 ${
                tab === 'login' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => switchTab('register')}
              className={`relative z-10 flex-1 rounded-lg py-2 text-sm font-medium transition-colors duration-150 ${
                tab === 'register' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Register
            </button>
            {/* Animated sliding pill */}
            <div
              className="absolute bottom-1 top-1 w-[calc(50%-4px)] rounded-lg bg-white shadow-sm"
              style={{
                transition: 'transform 0.22s cubic-bezier(0.34,1.56,0.64,1)',
                transform: tab === 'login' ? 'translateX(4px)' : 'translateX(calc(100%))',
              }}
            />
          </div>

          {/* Server error banner */}
          {serverError && (
            <div className="mb-5 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-xs text-red-600">
              {serverError}
            </div>
          )}

          {/* ── Login form ── */}
          {tab === 'login' && (
            <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
              <Field
                label="Email address"
                icon={<Mail className="h-3.5 w-3.5" />}
                error={loginForm.formState.errors.email?.message}
              >
                <input
                  {...loginForm.register('email')}
                  type="email"
                  className="auth-input"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </Field>
              <Field
                label="Password"
                icon={<Lock className="h-3.5 w-3.5" />}
                error={loginForm.formState.errors.password?.message}
                action={
                  <button
                    type="button"
                    onClick={() => setShowPass((p) => !p)}
                    className="text-xs font-medium text-indigo-500 hover:text-indigo-700"
                  >
                    {showPass ? 'Hide' : 'Show'}
                  </button>
                }
              >
                <input
                  {...loginForm.register('password')}
                  type={showPass ? 'text' : 'password'}
                  className="auth-input"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </Field>
              <button
                type="submit"
                disabled={loginForm.formState.isSubmitting}
                className="mt-1 w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-60"
              >
                {loginForm.formState.isSubmitting ? 'Signing in…' : 'Sign In'}
              </button>
            </form>
          )}

          {/* ── Register form ── */}
          {tab === 'register' && (
            <form onSubmit={regForm.handleSubmit(onRegister)} className="space-y-4">
              <Field
                label="Full name"
                icon={<User className="h-3.5 w-3.5" />}
                error={regForm.formState.errors.fullName?.message}
              >
                <input
                  {...regForm.register('fullName')}
                  type="text"
                  className="auth-input"
                  placeholder="Jane Doe"
                  autoComplete="name"
                />
              </Field>
              <Field
                label="Email address"
                icon={<Mail className="h-3.5 w-3.5" />}
                error={regForm.formState.errors.email?.message}
              >
                <input
                  {...regForm.register('email')}
                  type="email"
                  className="auth-input"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </Field>
              <Field
                label="Password"
                icon={<Lock className="h-3.5 w-3.5" />}
                error={regForm.formState.errors.password?.message}
                action={
                  <button
                    type="button"
                    onClick={() => setShowPass((p) => !p)}
                    className="text-xs font-medium text-indigo-500 hover:text-indigo-700"
                  >
                    {showPass ? 'Hide' : 'Show'}
                  </button>
                }
              >
                <input
                  {...regForm.register('password')}
                  type={showPass ? 'text' : 'password'}
                  className="auth-input"
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
                />
              </Field>
              <Field
                label="Confirm password"
                icon={<Lock className="h-3.5 w-3.5" />}
                error={regForm.formState.errors.confirmPassword?.message}
                action={
                  <button
                    type="button"
                    onClick={() => setShowConfirm((p) => !p)}
                    className="text-xs font-medium text-indigo-500 hover:text-indigo-700"
                  >
                    {showConfirm ? 'Hide' : 'Show'}
                  </button>
                }
              >
                <input
                  {...regForm.register('confirmPassword')}
                  type={showConfirm ? 'text' : 'password'}
                  className="auth-input"
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                />
              </Field>
              <button
                type="submit"
                disabled={regForm.formState.isSubmitting}
                className="mt-1 w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-60"
              >
                {regForm.formState.isSubmitting ? 'Creating account…' : 'Create Account'}
              </button>
            </form>
          )}

          <p className="mt-8 text-center text-[11px] text-gray-400">
            By continuing you agree to our{' '}
            <span className="cursor-pointer text-indigo-500 hover:underline">Terms</span>
            {' '}and{' '}
            <span className="cursor-pointer text-indigo-500 hover:underline">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
