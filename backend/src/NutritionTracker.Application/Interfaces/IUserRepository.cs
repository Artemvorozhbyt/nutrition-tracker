using NutritionTracker.Domain.Entities;

namespace NutritionTracker.Application.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByEmailAsync(string email);

    Task<User?> GetByGoogleSubjectAsync(string googleSubject);

    Task<User?> GetByIdAsync(Guid id);

    Task AddAsync(User user);

    Task UpdateAsync(User user);
}