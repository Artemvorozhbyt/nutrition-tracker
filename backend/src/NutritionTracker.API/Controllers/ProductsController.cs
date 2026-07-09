using Microsoft.AspNetCore.Mvc;
using NutritionTracker.Application.Interfaces;
using NutritionTracker.API.Contracts.Products;
using NutritionTracker.Domain.Entities;
using System.Linq;

namespace NutritionTracker.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductRepository _repository;

    public ProductsController(IProductRepository repository)
    {
        _repository = repository;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var product = await _repository.GetByIdAsync(id);

        if (product is null)
            return NotFound();

        var response = new ProductResponse
        {
            Id = product.Id,
            Name = product.Name,
            Category = product.Category,
            CaloriesPer100g = product.CaloriesPer100g,
            ProteinPer100g = product.ProteinPer100g,
            FatPer100g = product.FatPer100g,
            CarbsPer100g = product.CarbsPer100g
        };

        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateProductRequest request)
    {
        var product = new Product
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Category = request.Category,
            CaloriesPer100g = request.CaloriesPer100g,
            ProteinPer100g = request.ProteinPer100g,
            FatPer100g = request.FatPer100g,
            CarbsPer100g = request.CarbsPer100g,
            CreatedAt = DateTime.UtcNow
        };

        await _repository.AddAsync(product);

        var response = new ProductResponse
        {
            Id = product.Id,
            Name = product.Name,
            Category = product.Category,
            CaloriesPer100g = product.CaloriesPer100g,
            ProteinPer100g = product.ProteinPer100g,
            FatPer100g = product.FatPer100g,
            CarbsPer100g = product.CarbsPer100g
        };

        return CreatedAtAction(
            nameof(GetById),
            new { id = product.Id },
            response);
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
    Guid id,
    UpdateProductRequest request)
    {
        var product = await _repository.GetByIdAsync(id);

        if (product is null)
        {
            return NotFound();
        }

        product.Name = request.Name;
        product.CaloriesPer100g = request.CaloriesPer100g;
        product.ProteinPer100g = request.ProteinPer100g;
        product.FatPer100g = request.FatPer100g;
        product.CarbsPer100g = request.CarbsPer100g;

        await _repository.UpdateAsync(product);

        return NoContent();
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var product = await _repository.GetByIdAsync(id);

        if (product is null)
        {
            return NotFound();
        }

        await _repository.DeleteAsync(product);

        return NoContent();
    }



    [HttpGet]
    public async Task<IActionResult> GetAll(
    [FromQuery] string? search,
    [FromQuery] int page = 1,
    [FromQuery] int pageSize = 10)
    {
        List<Product> products;

        if (!string.IsNullOrWhiteSpace(search))
        {
            products = await _repository.SearchAsync(search);
        }
        else
        {
            products = await _repository.GetPagedAsync(page, pageSize);
        }

        var response = products.Select(product => new ProductResponse
        {
            Id = product.Id,
            Name = product.Name,
            Category = product.Category,
            CaloriesPer100g = product.CaloriesPer100g,
            ProteinPer100g = product.ProteinPer100g,
            FatPer100g = product.FatPer100g,
            CarbsPer100g = product.CarbsPer100g
        });

        return Ok(response);
    }
}