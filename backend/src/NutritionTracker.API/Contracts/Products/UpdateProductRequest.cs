namespace NutritionTracker.API.Contracts.Products;
using NutritionTracker.Domain.Enums;

public class UpdateProductRequest
{
    public string Name { get; set; } = string.Empty;

    public ProductCategory Category { get; set; }

    public decimal CaloriesPer100g { get; set; }

    public decimal ProteinPer100g { get; set; }

    public decimal FatPer100g { get; set; }

    public decimal CarbsPer100g { get; set; }
}