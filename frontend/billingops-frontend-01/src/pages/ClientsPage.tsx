import { useState } from 'react';
import type { FormEvent } from 'react';
import { Plus, Mail, Phone, Building2 } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useClients, useCreateClient } from '../hooks/useClients';
import type { CreateClientRequest } from '../types/client';

export default function ClientsPage() {
  const { data: clients, isLoading, isError } = useClients();
  const { mutateAsync: createClient, isPending: isCreating, error: createError } = useCreateClient();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [form, setForm] = useState<CreateClientRequest>({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
  });

  const handleCreateClient = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createClient({
      ...form,
      phone: form.phone?.trim() || undefined,
      company: form.company?.trim() || undefined,
      address: form.address?.trim() || undefined,
    });

    setForm({ name: '', email: '', phone: '', company: '', address: '' });
    setShowCreateForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{clients?.length ?? 0} clients total</p>
        <Button size="sm" onClick={() => setShowCreateForm((v) => !v)}>
          <Plus className="h-4 w-4" />
          {showCreateForm ? 'Close' : 'Add Client'}
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <h2 className="mb-4 text-base font-semibold text-gray-900">Add Client</h2>
          <form onSubmit={handleCreateClient} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
              <input
                required
                className="input w-full"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Jane Smith"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
              <input
                required
                type="email"
                className="input w-full"
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="jane@company.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Company</label>
              <input
                className="input w-full"
                value={form.company}
                onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))}
                placeholder="Acme Inc"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
              <input
                className="input w-full"
                value={form.phone}
                onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="+1 555 0100"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Address</label>
              <input
                className="input w-full"
                value={form.address}
                onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
                placeholder="123 Main Street"
              />
            </div>
            <div className="md:col-span-2 flex items-center justify-end gap-2 pt-2">
              <Button type="button" variant="secondary" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isCreating}>
                {isCreating ? 'Adding...' : 'Add Client'}
              </Button>
            </div>
          </form>
          {createError && (
            <p className="mt-3 text-sm text-red-500">Failed to add client. Please try again.</p>
          )}
        </Card>
      )}

      {isLoading && <p className="py-8 text-center text-sm text-gray-400">Loading clients…</p>}
      {isError && <p className="py-8 text-center text-sm text-red-500">Failed to load clients.</p>}

      {clients && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {clients.map((client) => (
            <Card key={client.id} className="flex flex-col gap-3">
              <div>
                <h3 className="font-semibold text-gray-900">{client.name}</h3>
                {client.company && (
                  <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                    <Building2 className="h-3.5 w-3.5" />
                    {client.company}
                  </div>
                )}
              </div>
              <div className="space-y-1 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  {client.email}
                </div>
                {client.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5" />
                    {client.phone}
                  </div>
                )}
              </div>
            </Card>
          ))}
          {clients.length === 0 && (
            <p className="col-span-full py-8 text-center text-gray-400">
              No clients yet. Add your first one!
            </p>
          )}
        </div>
      )}
    </div>
  );
}
