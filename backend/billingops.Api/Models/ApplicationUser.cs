using Microsoft.AspNetCore.Identity;

namespace BillingOps.Api.Models;

public class ApplicationUser : IdentityUser
{
    public string FullName { get; set; } = string.Empty;
}