using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NutritionTracker.API.Contracts.Profile;
using NutritionTracker.Application.Interfaces;
using NutritionTracker.Application.Services;
using NutritionTracker.Domain.Entities;

namespace NutritionTracker.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProfileController : ControllerBase
{
    private readonly IUserRepository _userRepository;
    private readonly IDailyGoalRepository _dailyGoalRepository;
    private readonly IWeightEntryRepository _weightRepository;

    public ProfileController(
        IUserRepository userRepository,
        IDailyGoalRepository dailyGoalRepository,
        IWeightEntryRepository weightRepository)
    {
        _userRepository = userRepository;
        _dailyGoalRepository = dailyGoalRepository;
        _weightRepository = weightRepository;
    }

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetProfile()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)
                     ?? User.FindFirstValue("sub");

        if (!Guid.TryParse(userId, out var id))
        {
            return Unauthorized();
        }

        var user = await _userRepository.GetByIdAsync(id);

        if (user is null)
        {
            return NotFound("User not found");
        }

        return Ok(new
        {
            user.Id,
            user.Email,
            user.FirstName,
            user.Gender,
            user.Age,
            user.Height,
            user.Weight,
            user.Goal
        });
    }

    [Authorize]
    [HttpPut]
    public async Task<IActionResult> CompleteProfile(
        CompleteProfileRequest request)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)
                     ?? User.FindFirstValue("sub");

        if (!Guid.TryParse(userId, out var id))
        {
            return Unauthorized();
        }

        var user = await _userRepository.GetByIdAsync(id);

        if (user is null)
        {
            return NotFound("User not found");
        }

        user.FirstName = request.FirstName;
        user.Gender = request.Gender;
        user.Age = request.Age;
        user.Height = request.Height;
        user.Weight = request.Weight;
        user.Goal = request.Goal;
        user.UpdatedAt = DateTime.UtcNow;

        await _userRepository.UpdateAsync(user);

        var calculator = new DailyGoalCalculator();

        var calculatedGoal = calculator.Calculate(
            user.Gender,
            user.Age,
            user.Height,
            user.Weight,
            user.Goal);

        var dailyGoal = new DailyGoal
        {
            Id = Guid.NewGuid(),
            UserId = user.Id,
            TargetCalories = calculatedGoal.Calories,
            TargetProtein = calculatedGoal.Protein,
            TargetFat = calculatedGoal.Fat,
            TargetCarbs = calculatedGoal.Carbs,
            CalculatedAt = DateTime.UtcNow
        };

        await _dailyGoalRepository.AddAsync(dailyGoal);

        var initialWeightEntry = new WeightEntry
        {
            Id = Guid.NewGuid(),
            UserId = user.Id,
            Weight = user.Weight,
            Date = DateOnly.FromDateTime(DateTime.UtcNow),
            CreatedAt = DateTime.UtcNow
        };

        await _weightRepository.AddAsync(initialWeightEntry);

        return Ok(new
        {
            message = "Profile completed"
        });
    }
}