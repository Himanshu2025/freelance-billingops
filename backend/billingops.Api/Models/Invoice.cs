namespace BillingOps.Api.Models;

public class Invoice
{
    public int Id { get; set; }
    public string InvoiceNumber { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public DateTime IssuedAt { get; set; } = DateTime.UtcNow;
    public DateTime DueDate { get; set; }
    public string Status { get; set; } = "Draft";

    public string UserId { get; set; } = string.Empty;
    public ApplicationUser? User { get; set; }
}