using BillingOps.Api.Data;
using BillingOps.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;

namespace BillingOps.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[EnableRateLimiting("general")]
public class WebhooksController : ControllerBase
{
	private readonly BillingDbContext _dbContext;
	private readonly ILogger<WebhooksController> _logger;

	public WebhooksController(BillingDbContext dbContext, ILogger<WebhooksController> logger)
	{
		_dbContext = dbContext;
		_logger = logger;
	}

	[HttpPost("payment")]
	public async Task<IActionResult> PaymentWebhook(PaymentWebhookRequest request)
	{
		_logger.LogInformation(
			"Payment webhook received. InvoiceId: {InvoiceId}, Status: {Status}, TransactionId: {TransactionId}",
			request.InvoiceId,
			request.Status,
			request.TransactionId);

		var invoice = await _dbContext.Invoices
			.FirstOrDefaultAsync(i => i.Id == request.InvoiceId);

		if (invoice == null)
		{
			return NotFound(new { message = "Invoice not found." });
		}

		if (string.Equals(request.Status, "paid", StringComparison.OrdinalIgnoreCase))
		{
			invoice.Status = "Paid";
			await _dbContext.SaveChangesAsync();
		}

		return Ok(new
		{
			message = "Webhook processed successfully",
			invoiceId = invoice.Id,
			status = invoice.Status
		});
	}
}
