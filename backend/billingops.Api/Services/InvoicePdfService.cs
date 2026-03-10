using BillingOps.Api.Models;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace BillingOps.Api.Services;

public class InvoicePdfService
{
    public byte[] GenerateInvoicePdf(Invoice invoice)
    {
        var freelancerName = invoice.User?.FullName ?? "Freelancer";

        return Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Margin(40);
                page.Size(PageSizes.A4);
                page.DefaultTextStyle(x => x.FontSize(11));

                page.Header().Column(column =>
                {
                    column.Item().Text("INVOICE").Bold().FontSize(24);
                    column.Item().Text($"Invoice Number: {invoice.InvoiceNumber}").SemiBold();
                    column.Item().Text($"Issue Date: {invoice.IssueDate:yyyy-MM-dd}");
                    column.Item().Text($"Due Date: {invoice.DueDate:yyyy-MM-dd}");
                    column.Item().Text($"Status: {invoice.Status}");
                });

                page.Content().PaddingVertical(20).Column(column =>
                {
                    column.Spacing(12);

                    column.Item().Background(Colors.Grey.Lighten4).Padding(12).Column(info =>
                    {
                        info.Item().Text("From").Bold();
                        info.Item().Text(freelancerName);
                    });

                    column.Item().Background(Colors.Grey.Lighten4).Padding(12).Column(info =>
                    {
                        info.Item().Text("Bill To").Bold();
                        info.Item().Text(invoice.ClientName);
                        info.Item().Text(invoice.ClientEmail);
                    });

                    column.Item().Column(info =>
                    {
                        info.Spacing(6);
                        info.Item().Text("Description").Bold();
                        info.Item().Text(invoice.Description);
                    });
                });

                page.Footer().AlignRight().Column(column =>
                {
                    column.Item().Text($"Total Amount: {invoice.Amount:C}").Bold().FontSize(14);
                });
            });
        }).GeneratePdf();
    }
}
