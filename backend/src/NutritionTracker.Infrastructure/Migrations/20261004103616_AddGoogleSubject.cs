using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NutritionTracker.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddGoogleSubject : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "GoogleSubject",
                table: "Users",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GoogleSubject",
                table: "Users");
        }
    }
}
