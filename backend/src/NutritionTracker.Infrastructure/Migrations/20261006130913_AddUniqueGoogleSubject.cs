using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NutritionTracker.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddUniqueGoogleSubject : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Users_GoogleSubject",
                table: "Users",
                column: "GoogleSubject",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_GoogleSubject",
                table: "Users");
        }
    }
}
