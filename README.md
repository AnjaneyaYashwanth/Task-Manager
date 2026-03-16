# Next.js + Drizzle ORM + PostgreSQL Task Manager

This project is a full-stack task manager built with **Next.js 15**, **Drizzle ORM**, and **PostgreSQL**, with **Docker support** for running the database and the application.

The application allows users to:

* Create tasks
* View tasks
* Delete tasks
* Store data in PostgreSQL
* Run the application locally or fully inside Docker

---

# Tech Stack

* **Next.js 15 (App Router)**
* **TypeScript**
* **Drizzle ORM**
* **PostgreSQL**
* **Docker & Docker Compose**
* **pnpm**

---

# Project Structure

```
app/
 ├─ api/
 │   └─ tasks/
 │       ├─ route.ts
 │       └─ [taskId]/route.ts

config/
 └─ db/

db/
 └─ schema.ts

repositories/
 └─ tasks.repositories.ts
```

The architecture separates:

* **API routes**
* **Database logic**
* **Schema definitions**
* **Repository layer**

---

# Prerequisites

Make sure the following are installed:

* Node.js
* pnpm
* Docker
* Docker Compose

---

# Running the Project

## Local Development

Start only the PostgreSQL container and run the Next.js application locally.

| Purpose         | Command                         |
| --------------- | ------------------------------- |
| Start database  | `docker compose up -d postgres` |
| Run app locally | `pnpm dev`                      |

Open:

```
http://localhost:3000
```

---

## Docker Deployment

Run the entire stack (Next.js + PostgreSQL) using Docker.

| Purpose               | Command                     |
| --------------------- | --------------------------- |
| Run full docker stack | `docker compose up --build` |
| Stop containers       | `docker compose down`       |

After starting the containers, open:

```
http://localhost:3000
```

---

# Database

The application uses **PostgreSQL** with **Drizzle ORM**.

Database schema is defined in:

```
db/schema.ts
```

Migrations can be run using:

```
pnpm migrate
```

---

# API Endpoints

### Get all tasks

```
GET /api/tasks
```

### Create task

```
POST /api/tasks
```

### Update task

```
PATCH /api/tasks/:taskId
```

### Delete task

```
DELETE /api/tasks/:taskId
```

---

# Features

* Full-stack Next.js application
* Clean repository architecture
* PostgreSQL database integration
* Drizzle ORM for type-safe queries
* Dockerized development environment
* RESTful API design
