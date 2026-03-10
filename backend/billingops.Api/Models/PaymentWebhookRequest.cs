namespace BillingOps.Api.Models;

public class PaymentWebhookRequest
{
    public int InvoiceId { get; set; }
    public string Status { get; set; } = string.Empty;
    public string TransactionId { get; set; } = string.Empty;
}
