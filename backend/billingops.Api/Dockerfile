# Stage 1: Build and publish the API
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy project file first to leverage Docker layer caching for restore
COPY ["billingops.Api.csproj", "./"]
RUN dotnet restore "billingops.Api.csproj"

# Copy the remaining source code and publish a release build
COPY . .
RUN dotnet publish "billingops.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 2: Runtime image with only published artifacts
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app

# Ensure ASP.NET Core listens on port 8080 inside the container
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

# Copy published output from the build stage
COPY --from=build /app/publish .

# Start the BillingOps API
ENTRYPOINT ["dotnet", "billingops.Api.dll"]
