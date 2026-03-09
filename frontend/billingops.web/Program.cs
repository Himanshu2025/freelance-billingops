using billingops.web.Components;
using billingops.web.Services;
using System.Net;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

var backendApiBaseUrl = builder.Configuration["BackendApi:BaseUrl"] ?? "http://localhost:5114/";

builder.Services.AddScoped(_ =>
{
    var handler = new HttpClientHandler
    {
        UseCookies = true,
        CookieContainer = new CookieContainer()
    };

    return new HttpClient(handler)
    {
        BaseAddress = new Uri(backendApiBaseUrl)
    };
});

builder.Services.AddScoped<AuthApiService>();
builder.Services.AddScoped<InvoiceApiService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.UseStatusCodePagesWithReExecute("/not-found", createScopeForStatusCodePages: true);
app.UseHttpsRedirection();

app.UseAntiforgery();

app.MapStaticAssets();
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.Run();
