using NutritionTracker.Domain.Entities;

namespace NutritionTracker.Application.Interfaces;

public interface IGoogleLoginCodeRepository
{
    Task AddAsync(GoogleLoginCode code);

    Task<GoogleLoginCode?> GetByIdAsync(Guid id);

    Task<GoogleLoginCode?> GetByCodeHashAsync(string codeHash);

    Task UpdateAsync(GoogleLoginCode code);
}