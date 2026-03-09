# freelance-billingops

BillingOps Mini a lightweight .NET / C# invoice tracking API built for freelancers and small service businesses. It allows users to create invoices, track invoice lifecycle status, simulate payment provider webhooks, prevent duplicate event processing, and maintain an audit log of important billing events.

This project is designed as a practical backend portfolio project that demonstrates real-world engineering concepts beyond basic CRUD.

## Features

- Create invoices
- Auto-generate invoice numbers
- Set issue date and due date
- Track invoice status (`Draft`, `Sent`, `Paid`, `Failed`, `Overdue`)
- List all invoices
- View invoice details
- Process mock payment webhooks
- Prevent duplicate webhook processing using idempotency checks
- Record billing activity in an audit log

## Why this project?

As a freelancer, I often need to generate and track invoices. I wanted to build something that solves a real personal need while also demonstrating backend engineering concepts that are useful in production systems.


These are patterns commonly seen in real billing and payment systems.

## Tech Stack

- ASP.NET Core Web API
- C#
- Entity Framework Core
- SQLite
- Swagger / OpenAPI

## Project Structure

```text
BillingOpsMini/
├── Controllers/
│   ├── InvoicesController.cs
│   └── WebhooksController.cs
├── Data/
│   └── BillingDbContext.cs
├── Dtos/
│   ├── CreateInvoiceRequest.cs
│   └── PaymentWebhookRequest.cs
├── Models/
│   ├── Invoice.cs
│   ├── WebhookEvent.cs
│   └── AuditLog.cs
├── Services/
│   └── BillingService.cs
├── Program.cs
└── README.md
