namespace billingops.web.Models;

public class CreateInvoiceRequest
{
    public string ClientName { get; set; } = string.Empty;
    public string ClientEmail { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public DateTime DueDate { get; set; } = DateTime.Today;
    public string Status { get; set; } = "Draft";
}
