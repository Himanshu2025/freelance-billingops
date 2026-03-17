/** Mirror of backend InvoiceResponse DTO */
export interface Invoice {
  id: number;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  description: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: string; // "Draft" | "Sent" | "Paid" | "Overdue"
}

export interface CreateInvoiceRequest {
  clientName: string;
  clientEmail: string;
  description: string;
  amount: number;
  dueDate: string;
  status?: string;
}

export type UpdateInvoiceRequest = Partial<CreateInvoiceRequest>;
