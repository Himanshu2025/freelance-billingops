using BillingOps.Api.Data;
using BillingOps.Api.Dtos;
using BillingOps.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BillingOps.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class InvoicesController : ControllerBase
{
    private readonly BillingDbContext _dbContext;
    private readonly UserManager<ApplicationUser> _userManager;

    public InvoicesController(BillingDbContext dbContext, UserManager<ApplicationUser> userManager)
    {
        _dbContext = dbContext;
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<InvoiceResponse>>> GetMyInvoices()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized(new { message = "User is not authenticated." });
        }

        var invoices = await _dbContext.Invoices
            .Where(i => i.UserId == user.Id)
            .OrderByDescending(i => i.IssueDate)
            .Select(i => ToResponse(i))
            .ToListAsync();

        return Ok(invoices);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<InvoiceResponse>> GetMyInvoiceById(int id)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized(new { message = "User is not authenticated." });
        }

        var invoice = await _dbContext.Invoices
            .FirstOrDefaultAsync(i => i.Id == id && i.UserId == user.Id);

        if (invoice == null)
        {
            return NotFound(new { message = "Invoice not found." });
        }

        return Ok(ToResponse(invoice));
    }

    [HttpPost]
    public async Task<ActionResult<InvoiceResponse>> CreateInvoice(CreateInvoiceRequest request)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized(new { message = "User is not authenticated." });
        }

        var invoice = new Invoice
        {
            InvoiceNumber = GenerateInvoiceNumber(),
            ClientName = request.ClientName.Trim(),
            ClientEmail = request.ClientEmail.Trim(),
            Description = request.Description.Trim(),
            Amount = request.Amount,
            DueDate = request.DueDate,
            Status = string.IsNullOrWhiteSpace(request.Status) ? "Draft" : request.Status.Trim(),
            IssueDate = DateTime.UtcNow,
            UserId = user.Id
        };

        _dbContext.Invoices.Add(invoice);
        await _dbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetMyInvoiceById), new { id = invoice.Id }, ToResponse(invoice));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<InvoiceResponse>> UpdateInvoice(int id, UpdateInvoiceRequest request)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized(new { message = "User is not authenticated." });
        }

        var invoice = await _dbContext.Invoices
            .FirstOrDefaultAsync(i => i.Id == id && i.UserId == user.Id);

        if (invoice == null)
        {
            return NotFound(new { message = "Invoice not found." });
        }

        invoice.ClientName = request.ClientName.Trim();
        invoice.ClientEmail = request.ClientEmail.Trim();
        invoice.Description = request.Description.Trim();
        invoice.Amount = request.Amount;
        invoice.DueDate = request.DueDate;
        invoice.Status = string.IsNullOrWhiteSpace(request.Status) ? invoice.Status : request.Status.Trim();

        await _dbContext.SaveChangesAsync();

        return Ok(ToResponse(invoice));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteInvoice(int id)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized(new { message = "User is not authenticated." });
        }

        var invoice = await _dbContext.Invoices
            .FirstOrDefaultAsync(i => i.Id == id && i.UserId == user.Id);

        if (invoice == null)
        {
            return NotFound(new { message = "Invoice not found." });
        }

        _dbContext.Invoices.Remove(invoice);
        await _dbContext.SaveChangesAsync();

        return NoContent();
    }

    private static InvoiceResponse ToResponse(Invoice invoice)
    {
        return new InvoiceResponse
        {
            Id = invoice.Id,
            InvoiceNumber = invoice.InvoiceNumber,
            ClientName = invoice.ClientName,
            ClientEmail = invoice.ClientEmail,
            Description = invoice.Description,
            Amount = invoice.Amount,
            IssueDate = invoice.IssueDate,
            DueDate = invoice.DueDate,
            Status = invoice.Status
        };
    }

    private static string GenerateInvoiceNumber()
    {
        return $"INV-{DateTime.UtcNow:yyyyMMddHHmmss}-{Random.Shared.Next(100, 999)}";
    }
}
