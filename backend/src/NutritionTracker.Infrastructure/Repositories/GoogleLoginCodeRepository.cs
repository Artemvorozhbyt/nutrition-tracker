using Microsoft.EntityFrameworkCore;
using NutritionTracker.Application.Interfaces;
using NutritionTracker.Domain.Entities;
using NutritionTracker.Infrastructure.Persistence;

namespace NutritionTracker.Infrastructure.Repositories;

public class GoogleLoginCodeRepository : IGoogleLoginCodeRepository
{
    private readonly ApplicationDbContext _context;

    public GoogleLoginCodeRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(GoogleLoginCode code)
    {
        await _context.GoogleLoginCodes.AddAsync(code);
        await _context.SaveChangesAsync();
    }

    public async Task<GoogleLoginCode?> GetByIdAsync(Guid id)
    {
        return await _context.GoogleLoginCodes
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<GoogleLoginCode?> GetByCodeHashAsync(
    string codeHash)
    {
        return await _context.GoogleLoginCodes
            .FirstOrDefaultAsync(x => x.CodeHash == codeHash);
    }

    public async Task UpdateAsync(GoogleLoginCode code)
    {
        _context.GoogleLoginCodes.Update(code);
        await _context.SaveChangesAsync();
    }
}