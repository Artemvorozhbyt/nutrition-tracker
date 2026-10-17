using Microsoft.EntityFrameworkCore;
using NutritionTracker.Domain.Entities;
using NutritionTracker.Domain.Enums;

namespace NutritionTracker.Infrastructure.Persistence;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<MealEntry> MealEntries => Set<MealEntry>();
    public DbSet<DailyGoal> DailyGoals => Set<DailyGoal>();
    public DbSet<WeightEntry> WeightEntries => Set<WeightEntry>();
    public DbSet<GoogleLoginCode> GoogleLoginCodes => Set<GoogleLoginCode>();


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>()
            .HasIndex(x => x.Email)
            .IsUnique();

        modelBuilder.Entity<User>()
            .HasIndex(x => x.GoogleSubject)
            .IsUnique();

        modelBuilder.Entity<User>()
            .Property(x => x.ActivityLevel)
            .HasDefaultValue(ActivityLevel.LightlyActive);
    }
}