# Todo List App – Docker Setup

This project contains:

- Backend (Node.js / API)
- Frontend (Vite build served with Nginx)
- MongoDB
- Docker & Docker Compose setup

---

## 📁 Project Structure

Todo-List/
|
├── backend/
│ ├── Dockerfile
│ ├── docker-compose.yml
│ ├── .env
│ └── ...
│
└── frontend/
├── dist/
├── Dockerfile
├── nginx.conf
└── ...

---

## ✅ Prerequisites

Only these must be installed on the system:

- Docker
- Docker Compose

Nothing else is required (Node, Mongo, etc are not needed on host machine).

---

## ⚠️ Important

Before running containers, make sure:

Frontend is already built.

From the frontend folder:

cd frontend
npm install
npm run build

This creates the `dist/` folder which is used by Nginx.

---

## ▶️ How to build and run images

Go to backend folder (because docker-compose.yml is here):

cd backend

---

### Step 1 – Stop old containers (if any)

docker compose down

---

### Step 2 – Build images

docker compose build

(If you want clean build)

docker compose build --no-cache

---

### Step 3 – Run containers

docker compose up

or in background

docker compose up -d

---

## 🐳 What containers will run

- todo-backend → Node API
- todo-frontend → Nginx (serves frontend build)
- todo-mongo → MongoDB

---

## 🌐 Application URLs

Frontend:
http://localhost

Backend:
http://localhost:5000

---

## 🔧 MongoDB connection

Backend connects to MongoDB using this service name:

mongodb://mongo:27017/todoApp

(Defined in backend .env file)

---

## 📦 To check running containers

docker ps

---

## 📄 To see logs

Backend logs:

docker logs todo-backend

Frontend logs:

docker logs todo-frontend

Mongo logs:

docker logs todo-mongo

---

## 🛑 To stop everything

docker compose down

---

## Without Compose

1. Go to backend folder

cd backend

2. Create a Docker network

docker network create todo-net

3. Run MongoDB container

docker run -d \
 --name todo-mongo \
 --network todo-net \
 -p 27017:27017 \
 mongo:7

4. Set Mongo URL in backend .env

backend/.env

5. Build backend image

docker build -t todo-backend-img .

6. Run backend container

docker run -d \
 --name todo-backend \
 --network todo-net \
 -p 5000:5000 \
 --env-file .env \
 todo-backend-img

Backend will be available on:

http://localhost:5000

7. Build frontend image

cd ../frontend

docker build -t todo-frontend-img .

8. Run frontend container

docker run -d \
 --name todo-frontend \
 --network todo-net \
 -p 80:80 \
 todo-frontend-img

Frontend will be available on:

http://localhost

9. Check running containers

docker ps

You should see:

todo-mongo
todo-backend
todo-frontend

10. 🧹 Stop and remove all containers

docker stop todo-frontend todo-backend todo-mongo
docker rm todo-frontend todo-backend todo-mongo

(Optional) remove network:

docker network rm todo-net

## 💡 Important note for other laptops

On another laptop:

1. Install Docker
2. Clone the repository
3. Go to frontend folder and build

cd frontend
npm install
npm run build

4. Go to backend folder and run

cd backend
docker compose up --build

That’s all.

## Show MongoDB databases (inside Docker)

1. Make sure containers are running:

```bash
docker compose up -d

2. Enter Mongo container shell:

docker exec -it todo-mongo mongosh

3. Show all databases:

show dbs

4. Use project database:

use todoApp

5. Show collections:

show collections

6. View data

db.users.find().pretty()
db.todos.find().pretty()
```
