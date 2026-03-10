# JINEN - Frontend Spring Boot + MongoDB

Angular 19 frontend adapted to work with the Spring Boot + MongoDB backend.

## Prerequisites

- **Node.js** 18+ and npm
- **Java** 17+
- **MongoDB** (local or Atlas)

## Quick Start

### 1. Configure MongoDB

Edit `backend-spring/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/nursery_db
SERVER_PORT=3000
```

For MongoDB Atlas, use your connection string:
```env
MONGODB_URI=mongodb+srv://user:password@cluster.xxxxx.mongodb.net/nursery_db
```

### 2. Start the Spring Boot Backend

```bash
cd backend-spring
./mvnw spring-boot:run
```

The API will be available at `http://localhost:3000/api`.

### 3. Start the Angular Frontend

```bash
cd frontend-spring
npm install
npm start
```

The app will be available at `http://localhost:4201`.

### 4. (Optional) Change API URL

Edit `frontend-spring/src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'  // Change this to your backend URL
};
```

## Project Structure

```
frontend-spring/
├── src/
│   ├── environments/          # API URL configuration
│   ├── app/
│   │   ├── components/        # Angular standalone components
│   │   ├── models/            # TypeScript interfaces
│   │   ├── services/          # HTTP services (adapted for Spring Boot)
│   │   ├── guards/            # Route guards
│   │   ├── shared/            # Shared components (sidebar)
│   │   ├── app.routes.ts      # Route definitions
│   │   └── app.config.ts      # App configuration
│   └── styles.scss            # Global styles
├── angular.json
├── package.json
└── tsconfig.json
```

## Key Differences from Original Frontend

| Aspect | Original (src/) | Spring Boot (frontend-spring/) |
|--------|-----------------|-------------------------------|
| Backend | Node.js + PostgreSQL | Spring Boot + MongoDB |
| API fields | snake_case | camelCase |
| Config | Hardcoded URL | environment.ts |
| Port | 4200 | 4201 |
| Message fields | French (contenu, expediteurId) | English (content, senderId) |
