using BCrypt.Net;
using Microsoft.AspNetCore.Mvc;
using NutritionTracker.API.Contracts.Auth;
using NutritionTracker.Application.Interfaces;
using NutritionTracker.Domain.Entities;
using NutritionTracker.Application.Services;

namespace NutritionTracker.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserRepository _repository;

    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    private readonly IDailyGoalRepository _dailyGoalRepository;

    private readonly IWeightEntryRepository _weightRepository;

    public AuthController(
    IUserRepository repository,
    IJwtTokenGenerator jwtTokenGenerator,
    IDailyGoalRepository dailyGoalRepository,
    IWeightEntryRepository weightRepository)
    {
        _repository = repository;
        _jwtTokenGenerator = jwtTokenGenerator;
        _dailyGoalRepository = dailyGoalRepository;
        _weightRepository = weightRepository;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        var existingUser =
            await _repository.GetByEmailAsync(request.Email);

        if (existingUser is not null)
        {
            return BadRequest("Email already exists");
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            FirstName = request.FirstName,
            Gender = request.Gender,
            Age = request.Age,
            Height = request.Height,
            Weight = request.Weight,
            Goal = request.Goal,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        await _repository.AddAsync(user);

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

        var token = _jwtTokenGenerator.GenerateToken(
            user.Id,
            user.Email);

        return Ok(new LoginResponse
        {
            AccessToken = token
        });
    }
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var user = await _repository.GetByEmailAsync(request.Email);

        if (user is null)
        {
            return Unauthorized("Invalid email or password");
        }

        var passwordValid =
            BCrypt.Net.BCrypt.Verify(
                request.Password,
                user.PasswordHash);

        if (!passwordValid)
        {
            return Unauthorized("Invalid email or password");
        }

        var token =
            _jwtTokenGenerator.GenerateToken(
                user.Id,
                user.Email);

        return Ok(new LoginResponse
        {
            AccessToken = token
        });
    }
}