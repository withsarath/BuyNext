# BuyNext
BuyNext is a full-stack product sharing app where users can sign in, create product listings, edit/delete their own products, and comment on listings.

## Tech Stack
- Frontend: React + Vite, Tailwind CSS v4, daisyUI, TanStack Query, Clerk
- Backend: Express (TypeScript), Drizzle ORM, PostgreSQL, Clerk
- Package manager: pnpm

## Project Structure
- `client/` - React frontend
- `server/` - Express API + database layer
- `package.json` (root) - top-level build/start scripts

## Prerequisites
- Node.js `>=20`
- pnpm `>=10`
- PostgreSQL database
- Clerk project (for auth keys)

## Environment Variables
Create these files before running the app.

### `server/.env`
```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DB_NAME
FRONTEND_URL=http://localhost:5173
CLERK_SECRET_KEY=sk_test_xxx
CLERK_PUBLISHABLE_KEY=pk_test_xxx
PORT=3000
NODE_ENV=development
```

### `client/.env`
```env
VITE_API_URL=http://localhost:3000/api
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxx
```

## Install Dependencies
From the project root:

```bash
pnpm --prefix server install
pnpm --prefix client install
```

## Run in Development
Run backend and frontend in separate terminals:

Backend:
```bash
pnpm --prefix server dev
```

Frontend:
```bash
pnpm --prefix client dev
```

## Database Setup
Push schema to your database:

```bash
pnpm --prefix server run db:push
```

## Build
Build both apps from root:

```bash
pnpm build
```

This runs:
- install server dependencies
- install client dependencies
- build client
- build server

## Start (Production Mode)
From root:

```bash
pnpm start
```

This runs database push and starts the server.  
In production mode, the server serves static files from `client/dist`, so make sure client build artifacts exist first.

## API Base Routes
- `GET /api/health`
- `/api/users`
- `/api/products`
- `/api/comments`

## Available Scripts
Root:
- `pnpm build`
- `pnpm start`

Client (`client/package.json`):
- `pnpm --prefix client dev`
- `pnpm --prefix client build`
- `pnpm --prefix client lint`

Server (`server/package.json`):
- `pnpm --prefix server dev`
- `pnpm --prefix server build`
- `pnpm --prefix server start`
- `pnpm --prefix server db:push`
