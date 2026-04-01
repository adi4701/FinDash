# FinDash Backend Assignment

Finance data processing and access-control backend built with:

- Node.js runtime
- Express.js framework
- MongoDB with Mongoose
- JWT authentication + bcryptjs
- Zod validation
- dotenv configuration
- Nodemon dev server

## Features Covered

- User and role management (`viewer`, `analyst`, `admin`)
- User active/inactive status enforcement
- Financial records CRUD APIs
- Record filtering by type, category, date range
- Pagination and sorting for records list
- Dashboard analytics APIs:
  - total income
  - total expenses
  - net balance
  - category-wise totals
  - recent activity
  - monthly trends
- Role-based access control (RBAC) at middleware layer
- Centralized validation and error handling
- MongoDB persistence via Mongoose

## RBAC Matrix

- Viewer:
  - Can read dashboard endpoints
  - Cannot access records or user management mutations
- Analyst:
  - Can read records and dashboard data
  - Cannot create/update/delete records or users
- Admin:
  - Full access to records CRUD
  - Full access to user management

## Project Structure

- `src/config` environment and database config
- `src/common/middleware` auth, authorization, validation, errors
- `src/modules/auth` login/me APIs
- `src/modules/users` admin-managed user APIs
- `src/modules/records` financial record CRUD/filter APIs
- `src/modules/dashboard` summary and trend APIs
- `src/routes` route composition
- `scripts/seed.js` demo data seeding
- `tests` smoke tests

## Setup

1. Install dependencies:
   - `npm install`
2. Create env file:
   - Copy `.env.example` to `.env`
3. Ensure MongoDB is running locally (or update URI).
4. Seed demo data:
   - `npm run seed`
5. Start dev server:
   - `npm run dev`

## Environment Variables

From `.env.example`:

- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `BCRYPT_SALT_ROUNDS`

## API Base

- `http://localhost:4000/api/v1`

## Key Endpoints

Auth:

- `POST /auth/login`
- `GET /auth/me`

Users (admin only):

- `POST /users`
- `GET /users`
- `GET /users/:id`
- `PATCH /users/:id`

Records:

- `POST /records` (admin)
- `GET /records` (analyst/admin)
- `GET /records/:id` (analyst/admin)
- `PATCH /records/:id` (admin)
- `DELETE /records/:id` (admin)

Dashboard:

- `GET /dashboard/summary`
- `GET /dashboard/category-totals`
- `GET /dashboard/recent-activity`
- `GET /dashboard/monthly-trends`

## Sample Login Request

```bash
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@findash.local","password":"Password@123"}'
```

## Assumptions and Tradeoffs

- Financial records are organization-wide shared records.
- Only admin can mutate records and users.
- Refresh tokens and rate limiting are intentionally out of scope.
- Focus is on correctness, clarity, and maintainability for assessment.

## Run Tests

- `npm test`
