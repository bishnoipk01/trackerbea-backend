## TrackerBea

**TrackerBea** is a habit-tracking and task management application built with NestJS, PostgreSQL, and Prisma ORM.

### Features

- Track habits and tasks
- Set goals and track progress
- get email reminders
- tailored dashboard for all activities

### Tech Stack

- **Backend:** NestJS
- **Database:** PostgreSQL
- **Data Access:** Prisma ORM

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

### API Documentation

API documentation is created using swagger. You can find it at http://localhost:3000/api/docs after running the application locally
