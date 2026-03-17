import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const settingsSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  businessName: z.string().optional(),
  currency: z.enum(['USD', 'EUR', 'GBP']),
  taxRate: z.number().min(0).max(100),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: { name: '', email: '', businessName: '', currency: 'USD', taxRate: 0 },
  });

  const onSubmit = async (data: SettingsFormValues) => {
    // TODO: persist via API
    console.log('Settings saved:', data);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <Card>
        <h2 className="mb-6 text-base font-semibold text-gray-900">Profile & Business</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field label="Full Name" error={errors.name?.message}>
            <input
              {...register('name')}
              className="input"
              placeholder="Your name"
            />
          </Field>
          <Field label="Email Address" error={errors.email?.message}>
            <input
              {...register('email')}
              type="email"
              className="input"
              placeholder="you@example.com"
            />
          </Field>
          <Field label="Business Name" error={errors.businessName?.message}>
            <input
              {...register('businessName')}
              className="input"
              placeholder="Acme Freelance"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Currency" error={errors.currency?.message}>
              <select {...register('currency')} className="input">
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </Field>
            <Field label="Default Tax Rate (%)" error={errors.taxRate?.message}>
              <input
                {...register('taxRate', { valueAsNumber: true })}
                type="number"
                step="0.1"
                className="input"
                placeholder="0"
              />
            </Field>
          </div>
          <div className="pt-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving…' : 'Save Settings'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
