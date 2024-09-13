## TrackerBea

**TrackerBea** is a habit-tracking and task management application built with NestJS, PostgreSQL, and Prisma ORM.

### Features
* Track habits and tasks
* Set goals and track progress

### Tech Stack
* **Backend:** NestJS
* **Database:** PostgreSQL
* **Data Access:** Prisma ORM

### Getting Started
1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd trackerbea
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables: Create a .env file with your PostgreSQL database URL:**
```bash
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<database_name>?schema=public"
```

4. **Run migrations and generate Prisma client:**
```bash
npx prisma migrate dev
npx prisma generate
```

5. **Start the application:**
```bash
npm run start:dev
```
### API Endpoints
* **POST /auth/signup:** Sign up
* **POST /auth/login:** Log in
* **GET /habits:** List habits
* **POST /habits:** Create habit
* **GET /tasks:** List tasks
* **POST /tasks:** Create task
