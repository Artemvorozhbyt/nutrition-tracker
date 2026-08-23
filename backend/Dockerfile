FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build

WORKDIR /src

COPY backend/src/NutritionTracker.API/NutritionTracker.API.csproj backend/src/NutritionTracker.API/
COPY backend/src/NutritionTracker.Application/NutritionTracker.Application.csproj backend/src/NutritionTracker.Application/
COPY backend/src/NutritionTracker.Domain/NutritionTracker.Domain.csproj backend/src/NutritionTracker.Domain/
COPY backend/src/NutritionTracker.Infrastructure/NutritionTracker.Infrastructure.csproj backend/src/NutritionTracker.Infrastructure/

RUN dotnet restore backend/src/NutritionTracker.API/NutritionTracker.API.csproj

COPY backend/src backend/src

RUN dotnet publish backend/src/NutritionTracker.API/NutritionTracker.API.csproj \
    -c Release \
    -o /app/publish
    
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final

WORKDIR /app

COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:8080

EXPOSE 8080

ENTRYPOINT ["dotnet", "NutritionTracker.API.dll"]