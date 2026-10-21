# Nutrition Tracker

A full-stack web application for tracking daily nutrition, managing food products and meals, and monitoring weight progress. The application helps users set personalized nutrition goals based on their profile, fitness goals, and physical activity level.

**Live Demo:** [Frontend](https://nutriflow-web.netlify.app/) · [Backend API](https://nutrition-tracker-api-w9ie.onrender.com)

**Tech Stack:** C# · ASP.NET Core 9 · Entity Framework Core · PostgreSQL · React · TypeScript · Docker

---

## Screenshots

<img width="1916" height="943" alt="image" src="https://github.com/user-attachments/assets/d5c6a364-eb9a-4589-b968-7f7a4c3ad3c5" />
<img width="1917" height="944" alt="image" src="https://github.com/user-attachments/assets/3913e147-e053-401c-9f8b-93a1d7c4dff8" />
<img width="1916" height="943" alt="image" src="https://github.com/user-attachments/assets/3dfea4a7-81ea-480a-bf24-dfa5b30be3fe" />
<img width="1904" height="947" alt="image" src="https://github.com/user-attachments/assets/ab2e4dac-d2ae-450a-bfb4-86b1174c50b6" />
<img width="1917" height="945" alt="image" src="https://github.com/user-attachments/assets/61541d62-178c-4fd8-b349-a2619248c51a" />

---

## Features

### Authentication and User Profile
- User registration and login with JWT-based authentication.
- Google OAuth sign-in.
- User profile management, including age, gender, height, weight, fitness goal, and activity level.
- Protected application routes for authenticated users.

### Nutrition Tracking
- Create, update, delete, and search food products.
- Manage meals and food entries.
- Track daily calorie and macronutrient intake.
- View daily nutrition summaries and dashboard statistics.

### Personalized Nutrition Goals
- Calculate daily calorie requirements using the Mifflin–St Jeor equation and an activity multiplier.
- Support five physical activity levels, from sedentary to extremely active.
- Calculate daily protein, fat, and carbohydrate targets.
- Set and update daily nutrition goals manually.

### Weight Tracking
- Record body weight.
- Review weight history and monitor changes over time.

---

## Technology Stack

### Backend
- **C# / ASP.NET Core 9** — REST API development.
- **Entity Framework Core** — database access and schema migrations.
- **PostgreSQL** — relational database.
- **JWT Bearer Authentication** — API authentication and authorization.
- **Google OAuth** — external authentication.
- **Swagger / OpenAPI** — API exploration and testing.

### Frontend
- **React** — component-based user interface.
- **TypeScript** — static typing.
- **Vite** — development server and production build.
- **Material UI (MUI)** — UI components and styling.
- **TanStack React Query** — server state management and caching.
- **Axios** — HTTP requests to the backend.
- **React Router** — client-side routing.

### Development and Deployment
- **Docker Compose** — local PostgreSQL and pgAdmin environment.
- **Render** — backend hosting.
- **Netlify** — frontend hosting.
- **Git / GitHub** — version control.

---

## Architecture

The backend follows a layered Clean Architecture approach to separate business logic, application concerns, infrastructure, and HTTP endpoints.

```text
NutritionTracker
├── backend
│   └── src
│       ├── NutritionTracker.Domain
│       ├── NutritionTracker.Application
│       ├── NutritionTracker.Infrastructure
│       └── NutritionTracker.API
│
└── frontend
    └── nutrition-tracker
        └── src
            ├── api
            ├── features
            ├── components
            └── app
```

### Backend layers

- **Domain** — core entities, enums, and business concepts.
- **Application** — application services and business operations.
- **Infrastructure** — database access, Entity Framework Core, and repository implementations.
- **API** — controllers, HTTP endpoints, request contracts, authentication, and dependency configuration.

The frontend is organized around application features, with API functions, React Query hooks, forms, and page components.

---

## Getting Started

### Prerequisites

Install the following tools before running the application:

- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Node.js](https://nodejs.org/) and npm
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)

### 1. Clone the repository

```bash
git clone https://github.com/Artemvorozhbyt/nutrition-tracker.git
cd nutrition-tracker
```

### 2. Start PostgreSQL

From the repository root, start the database services using the existing Docker Compose configuration:

```bash
docker compose up -d
```

If your Compose file is located in a subdirectory, run the command from that directory or specify the file with `-f`.

Check the running containers:

```bash
docker compose ps
```

### 3. Configure the backend

Navigate to the API project:

```bash
cd backend/src/NutritionTracker.API
```

Configure the required settings for your local environment, including:

- PostgreSQL connection string.
- JWT signing key and authentication settings.
- Google OAuth client configuration, if using Google sign-in.

Use the existing `appsettings.json` structure and your local configuration or .NET User Secrets. Do not commit real passwords, tokens, client secrets, or production credentials.

### 4. Apply database migrations

From the API project directory, run:

```bash
dotnet ef database update
```

If the EF Core command is unavailable, install the EF Core command-line tool and ensure the project references and design-time configuration are correctly configured.

### 5. Run the backend

```bash
dotnet run
```

The API uses the URLs configured in `Properties/launchSettings.json`. In the local development setup, the expected addresses are:

- `http://localhost:5218`
- `https://localhost:7140`

Use the configured HTTPS address when setting up local Google OAuth redirect URIs.

Swagger is available at the Swagger route configured by the API, typically `/swagger` in Development.

### 6. Configure and run the frontend

Open a second terminal:

```bash
cd frontend/nutrition-tracker
npm install
```

Create a local `.env` file if needed and configure the frontend API base URL according to the existing environment configuration:

```env
VITE_API_BASE_URL=/api
```

The `/api` value is intended for a setup with a development proxy. If you are connecting directly to the backend, configure the URL according to your Vite and Axios configuration.

Start the development server:

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

---

## API Overview

The API exposes endpoints for authentication, profile management, products, meals, daily nutrition goals, dashboard data, and weight tracking.

The main endpoint groups include:

| Area | Purpose |
|---|---|
| Authentication | Registration, login, and authentication flows |
| Profile | User profile data and profile updates |
| Products | Product CRUD and search |
| Meals | Meal and food-entry management |
| Daily Goals | Read, update, and calculate daily targets |
| Dashboard | Daily nutrition overview and summaries |
| Weight | Weight entries and history |

The exact endpoint routes and request contracts are available in the backend controllers and Swagger documentation.

---

## Nutrition Calculation

Daily calorie requirements are estimated using the Mifflin–St Jeor equation to calculate basal metabolic rate (BMR), followed by an activity multiplier to estimate total daily energy expenditure (TDEE).

The application supports five activity levels:

| Activity level | Multiplier |
|---|---:|
| Sedentary | 1.200 |
| Lightly active | 1.375 |
| Moderately active | 1.550 |
| Very active | 1.725 |
| Extremely active | 1.900 |

The calorie target is adjusted according to the selected fitness goal. Protein and fat targets are calculated using body-weight-based coefficients, while carbohydrates account for the remaining calories.

These calculations are estimates intended for general nutrition tracking, not medical advice.

---

## Build and Test

### Backend

From the repository root:

```bash
dotnet build backend/NutritionTracker.sln
```

If your solution file is located elsewhere, use its actual path.

Run the available tests:

```bash
dotnet test backend/NutritionTracker.sln
```

### Frontend

From the frontend directory:

```bash
npm run build
```

Run the frontend test command only if a test script is configured in `package.json`.

---

## Deployment

The application is split into two deployed services:

- **Frontend:** Netlify
- **Backend API:** Render

The frontend must be configured with the correct backend API URL for the deployed environment. The backend must have the correct database connection, JWT configuration, and Google OAuth settings.

Authentication redirect URIs, allowed origins, and environment variables must match the deployed domains.

---

## Future Improvements

Potential areas for further development include:

- Expanding automated integration and end-to-end test coverage.
- Improving validation and error handling across the application.
- Adding more nutrition insights and historical reports.
- Improving API documentation and deployment configuration.
- Optimizing frontend bundle size through code splitting.

---

## Author

**Artem Vorozhbyt**

GitHub: [@Artemvorozhbyt](https://github.com/Artemvorozhbyt)

---

*Nutrition Tracker is a personal full-stack project built to practice backend development with ASP.NET Core, database design, API integration, and modern frontend development with React and TypeScript.*


