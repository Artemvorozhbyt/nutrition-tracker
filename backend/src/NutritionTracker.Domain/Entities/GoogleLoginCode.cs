namespace NutritionTracker.Domain.Entities;

public class GoogleLoginCode
{
    public Guid Id { get; set; }

    public string CodeHash { get; set; } = string.Empty;

    public Guid UserId { get; set; }

    public bool ProfileCompleted { get; set; }

    public DateTime ExpiresAt { get; set; }

    public DateTime? UsedAt { get; set; }
}