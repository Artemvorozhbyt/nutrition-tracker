using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NutritionTracker.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddUserActivityLevel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ActivityLevel",
                table: "Users",
                type: "integer",
                nullable: false,
                defaultValue: 2);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActivityLevel",
                table: "Users");
        }
    }
}
