using NutritionTracker.Domain.Enums;

namespace NutritionTracker.API.Contracts.Meals;

public class MealEntryResponse
{
    public Guid Id { get; set; }

    public Guid ProductId { get; set; }

    public string ProductName { get; set; } = string.Empty;

    public MealType MealType { get; set; }

    public DateOnly Date { get; set; }

    public decimal WeightInGrams { get; set; }

    public decimal Calories { get; set; }

    public decimal Protein { get; set; }

    public decimal Fat { get; set; }

    public decimal Carbs { get; set; }
}