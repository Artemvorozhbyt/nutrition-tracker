using NutritionTracker.Domain.Enums;

namespace NutritionTracker.Application.Services;

public class DailyGoalCalculator
{
    private const decimal ActivityFactor = 1.375m;

    public DailyGoalCalculation Calculate(
        Gender gender,
        int age,
        decimal height,
        decimal weight,
        GoalType goal)
    {
        var bmr = gender switch
        {
            Gender.Male =>
                10m * weight +
                6.25m * height -
                5m * age +
                5m,

            Gender.Female =>
                10m * weight +
                6.25m * height -
                5m * age -
                161m,

            _ => throw new ArgumentOutOfRangeException(nameof(gender))
        };

        var tdee = bmr * ActivityFactor;

        var calories = goal switch
        {
            GoalType.LoseWeight => tdee * 0.85m,
            GoalType.MaintainWeight => tdee,
            GoalType.GainWeight => tdee * 1.10m,

            _ => throw new ArgumentOutOfRangeException(nameof(goal))
        };

        var protein = weight * 1.8m;
        var fat = weight * 0.8m;

        var proteinCalories = protein * 4m;
        var fatCalories = fat * 9m;

        var carbsCalories = calories - proteinCalories - fatCalories;
        var carbs = carbsCalories / 4m;

        return new DailyGoalCalculation(
            Math.Round(calories),
            Math.Round(protein, 1),
            Math.Round(fat, 1),
            Math.Round(carbs, 1));
    }
}

public record DailyGoalCalculation(
    decimal Calories,
    decimal Protein,
    decimal Fat,
    decimal Carbs);