using billingops.web.Models;
using System.Net.Http.Json;

namespace billingops.web.Services;

public class AuthApiService
{
    private readonly HttpClient _httpClient;

    public AuthApiService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<(bool Success, string Message)> RegisterAsync(RegisterRequest request)
    {
        try
        {
            var response = await _httpClient.PostAsJsonAsync("api/auth/register", request);
            if (response.IsSuccessStatusCode)
            {
                return (true, "Registration successful.");
            }

            var errorBody = await response.Content.ReadAsStringAsync();
            return (false, $"Registration failed: {errorBody}");
        }
        catch (Exception ex)
        {
            return (false, $"Registration failed: {ex.Message}");
        }
    }

    public async Task<(bool Success, string Message)> LoginAsync(LoginRequest request)
    {
        try
        {
            var response = await _httpClient.PostAsJsonAsync("api/auth/login", request);
            if (response.IsSuccessStatusCode)
            {
                return (true, "Login successful.");
            }

            var errorBody = await response.Content.ReadAsStringAsync();
            return (false, $"Login failed: {errorBody}");
        }
        catch (Exception ex)
        {
            return (false, $"Login failed: {ex.Message}");
        }
    }

    public async Task<(bool Success, string Message)> LogoutAsync()
    {
        try
        {
            var response = await _httpClient.PostAsync("api/auth/logout", null);
            if (response.IsSuccessStatusCode)
            {
                return (true, "Logged out successfully.");
            }

            var errorBody = await response.Content.ReadAsStringAsync();
            return (false, $"Logout failed: {errorBody}");
        }
        catch (Exception ex)
        {
            return (false, $"Logout failed: {ex.Message}");
        }
    }

    public async Task<(bool Success, string Message)> MeAsync()
    {
        try
        {
            var response = await _httpClient.GetAsync("api/auth/me");
            if (response.IsSuccessStatusCode)
            {
                return (true, "Authenticated.");
            }

            var errorBody = await response.Content.ReadAsStringAsync();
            return (false, $"Not authenticated: {errorBody}");
        }
        catch (Exception ex)
        {
            return (false, $"Not authenticated: {ex.Message}");
        }
    }
}
