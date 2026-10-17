using NutritionTracker.Domain.Enums;

namespace NutritionTracker.API.Contracts.DailyGoals;

public class CalculateDailyGoalRequest
{
    public ActivityLevel ActivityLevel { get; set; }
}