using billingops.web.Models;
using System.Net.Http.Json;

namespace billingops.web.Services;

public class InvoiceApiService
{
    private readonly HttpClient _httpClient;

    public InvoiceApiService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<List<InvoiceResponse>> GetInvoicesAsync()
    {
        var invoices = await _httpClient.GetFromJsonAsync<List<InvoiceResponse>>("api/invoices");
        return invoices ?? new List<InvoiceResponse>();
    }

    public async Task<(bool Success, string Message)> CreateInvoiceAsync(CreateInvoiceRequest request)
    {
        try
        {
            var response = await _httpClient.PostAsJsonAsync("api/invoices", request);
            if (response.IsSuccessStatusCode)
            {
                return (true, "Invoice created successfully.");
            }

            var errorBody = await response.Content.ReadAsStringAsync();
            return (false, $"Create invoice failed: {errorBody}");
        }
        catch (Exception ex)
        {
            return (false, $"Create invoice failed: {ex.Message}");
        }
    }
}
