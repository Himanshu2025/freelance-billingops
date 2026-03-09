using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace billingops.Api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateInvoiceFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IssuedAt",
                table: "Invoices",
                newName: "IssueDate");

            migrationBuilder.AddColumn<string>(
                name: "ClientEmail",
                table: "Invoices",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ClientName",
                table: "Invoices",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Invoices",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClientEmail",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "ClientName",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Invoices");

            migrationBuilder.RenameColumn(
                name: "IssueDate",
                table: "Invoices",
                newName: "IssuedAt");
        }
    }
}
