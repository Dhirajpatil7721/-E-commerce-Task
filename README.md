Here's a `README.md` file that summarizes your full setup with microservices (NestJS), RabbitMQ, PostgreSQL, Docker, and a Next.js frontend using Tailwind CSS and Axios.

---

```md
# 🧩 Full Stack Microservices Application

This project is a full-stack microservices-based system consisting of:
- 🚀 **Two NestJS microservices** (`customer-ms`, `product-order-ms`)
- 🐘 **PostgreSQL** database
- 🐇 **RabbitMQ** as the message broker
- 🐳 **Docker Compose** to manage containers
- 🌐 **Next.js** frontend with Tailwind CSS and Axios

---

## 📦 Tech Stack

| Layer        | Technology       |
|--------------|------------------|
| Frontend     | Next.js, Tailwind CSS, Axios |
| Backend      | NestJS (Microservices) |
| Messaging    | RabbitMQ         |
| Database     | PostgreSQL       |
| Container    | Docker + Docker Compose |


## 🚀 Getting Started

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
````

---

### 2️⃣ Environment Variables

Create `.env` files in each service (`customer-ms`, `product-order-ms`) with:

```env
# .env
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=root
DB_NAME=your_db_name

RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672
```

---

### 3️⃣ Docker Setup

Build and run all services:

```bash
docker-compose up --build
```

* PostgreSQL: \[localhost:5432]
* RabbitMQ UI: [http://localhost:15672](http://localhost:15672) (guest/guest)
* Customer MS: [http://localhost:3002](http://localhost:3002)
* Product MS: [http://localhost:3001](http://localhost:3001)

---

### 4️⃣ Frontend Setup (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Access frontend: [http://localhost:3000](http://localhost:3000)

---

## ✨ Features

### ✅ NestJS Microservices

* Created via `nest new project-name`
* CRUD operations with DTOs and Repositories
* RabbitMQ messaging for inter-service communication

### ✅ PostgreSQL

* Used as persistent database
* Volumes mounted via Docker

### ✅ RabbitMQ

* Handles communication between services
* RabbitMQ setup with Management UI

### ✅ Docker

* Each service is containerized using Dockerfile
* All services managed via `docker-compose.yml`

### ✅ Next.js Frontend

* Created with:

  ```bash
  npx create-next-app@latest
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  ```
* Uses Axios to fetch API data
* Central `types.ts` for type safety

---

## 📬 API Endpoints

### Customer MS (`localhost:3002`)

* `GET /customer`
* `POST /customer`
* `PUT /customer/:id`
* `DELETE /customer/:id`

### Product-Order MS (`localhost:3001`)

* `GET /product`
* `POST /product`
* `POST /order`

---

## 🛠 Commands

### Docker

```bash
docker-compose up --build   # Start all services
docker-compose down         # Stop all services
```

### NestJS (in each service folder)

```bash
npm run start:dev
```

---

## 📌 Notes

* RabbitMQ queues are created in `rabbitmq.service.ts` using `amqplib`
* Microservices communicate asynchronously via RabbitMQ
* Database initialization scripts can be placed in `./postgres-init` and mounted

