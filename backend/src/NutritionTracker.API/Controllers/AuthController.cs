using BCrypt.Net;
using Microsoft.AspNetCore.Mvc;
using NutritionTracker.API.Contracts.Auth;
using NutritionTracker.Application.Interfaces;
using NutritionTracker.Domain.Entities;
using NutritionTracker.Application.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using System.Security.Claims;
using System.Security.Cryptography;

namespace NutritionTracker.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserRepository _repository;
    private readonly IGoogleLoginCodeRepository _googleLoginCodeRepository;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;
    private readonly IDailyGoalRepository _dailyGoalRepository;
    private readonly IWeightEntryRepository _weightRepository;

    public AuthController(
    IUserRepository repository,
    IGoogleLoginCodeRepository googleLoginCodeRepository,
    IJwtTokenGenerator jwtTokenGenerator,
    IDailyGoalRepository dailyGoalRepository,
    IWeightEntryRepository weightRepository)
    {
        _repository = repository;
        _googleLoginCodeRepository = googleLoginCodeRepository;
        _jwtTokenGenerator = jwtTokenGenerator;
        _dailyGoalRepository = dailyGoalRepository;
        _weightRepository = weightRepository;
    }

    private static string GenerateLoginCode()
    {
        var bytes = RandomNumberGenerator.GetBytes(32);

        return Convert.ToBase64String(bytes);
    }

    private static string HashLoginCode(string code)
    {
        var bytes = SHA256.HashData(
            System.Text.Encoding.UTF8.GetBytes(code));

        return Convert.ToHexString(bytes);
    }

    private static bool IsProfileCompleted(User user)
    {
        return user.Age > 0
            && user.Height > 0
            && user.Weight > 0;
    }

    [HttpGet("google")]
    public IActionResult GoogleLogin()
    {
        var properties = new AuthenticationProperties
        {
            RedirectUri = "/api/auth/google-callback"
        };

        return Challenge(
            properties,
            GoogleDefaults.AuthenticationScheme);
    }

    [HttpGet("google-callback")]
    public async Task<IActionResult> GoogleCallback()
    {
        var result =
            await HttpContext.AuthenticateAsync("External");

        if (!result.Succeeded)
        {
            return Unauthorized("Google authentication failed");
        }

        var email =
            result.Principal?.FindFirstValue(ClaimTypes.Email);

        var googleSubject =
            result.Principal?.FindFirstValue(ClaimTypes.NameIdentifier);

        var firstName =
            result.Principal?.FindFirstValue(ClaimTypes.GivenName);

        if (string.IsNullOrWhiteSpace(email) ||
            string.IsNullOrWhiteSpace(googleSubject))
        {
            return Unauthorized("Google account information is incomplete");
        }

        var user =
            await _repository.GetByGoogleSubjectAsync(googleSubject);

        if (user is null)
        {
            user =
                await _repository.GetByEmailAsync(email);
        }

        if (user is null)
        {
            user = new User
            {
                Id = Guid.NewGuid(),
                Email = email,
                PasswordHash =
                    BCrypt.Net.BCrypt.HashPassword(
                        Guid.NewGuid().ToString()),
                GoogleSubject = googleSubject,
                FirstName = firstName ?? string.Empty,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await _repository.AddAsync(user);
        }
        else if (string.IsNullOrWhiteSpace(user.GoogleSubject))
        {
            user.GoogleSubject = googleSubject;
            user.UpdatedAt = DateTime.UtcNow;

            await _repository.UpdateAsync(user);
        }

        var code = GenerateLoginCode();

        var loginCode = new GoogleLoginCode
        {
            Id = Guid.NewGuid(),
            CodeHash = HashLoginCode(code),
            UserId = user.Id,
            ProfileCompleted = IsProfileCompleted(user),
            ExpiresAt = DateTime.UtcNow.AddMinutes(2)
        };

        await _googleLoginCodeRepository.AddAsync(loginCode);

        await HttpContext.SignOutAsync("External");

        var frontendBaseUrl =
            HttpContext.RequestServices
                .GetRequiredService<IConfiguration>()["Frontend:BaseUrl"];

        if (string.IsNullOrWhiteSpace(frontendBaseUrl))
        {
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                "Frontend URL is not configured");
        }

        return Redirect(
            $"{frontendBaseUrl.TrimEnd('/')}" +
            $"/auth/google/callback?code={Uri.EscapeDataString(code)}");
    }

    [HttpPost("google-exchange")]
    public async Task<IActionResult> GoogleExchange(
    [FromBody] string code)
    {
        if (string.IsNullOrWhiteSpace(code))
        {
            return BadRequest("Google login code is required");
        }

        var codeHash = HashLoginCode(code);

        var loginCode =
            await _googleLoginCodeRepository
                .GetByCodeHashAsync(codeHash);

        if (loginCode is null)
        {
            return Unauthorized("Invalid Google login code");
        }

        if (loginCode.UsedAt is not null)
        {
            return Unauthorized("Google login code has already been used");
        }

        if (loginCode.ExpiresAt <= DateTime.UtcNow)
        {
            return Unauthorized("Google login code has expired");
        }

        var user =
            await _repository.GetByIdAsync(loginCode.UserId);

        if (user is null)
        {
            return Unauthorized("User not found");
        }

        loginCode.UsedAt = DateTime.UtcNow;

        await _googleLoginCodeRepository.UpdateAsync(loginCode);

        var token =
            _jwtTokenGenerator.GenerateToken(
                user.Id,
                user.Email);

        return Ok(new
        {
            accessToken = token,
            profileCompleted = loginCode.ProfileCompleted
        });
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