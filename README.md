# Task Management API

A full-stack project management and task tracking application built with Spring Boot and React, secured with JWT and Oauth2 authentication.

## Features

- **Auth0 Authentication** - Secure OAuth2 authentication with scope-based authorization
- **Project Management** - Create, read, update, and delete projects with status tracking
- **Task Management** - Kanban-style task board
- **User Management** - Manage users and assign tasks

> **Note:** The frontend is still a work in progress. Some features may be incomplete or under active development.

## Prerequisites

- Java 21 or higher
- Maven 3.6+
- PostgreSQL 14+
- Node.js 18+
- npm 
- Auth0 account (for authentication)

## Setup

### Backend Setup

1. Navigate to the project root:
   ```bash
   cd task-management-api
   ```

2. Build the project:
   ```bash
   ./mvnw clean install
   ```

3. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```

The backend will be available at `http://localhost:8080`

### Frontend Setup (WIP)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

## API Endpoints

### Projects
- `GET /projects` - Get all projects
- `GET /projects/{id}` - Get project by ID
- `POST /projects` - Create a new project
- `PUT /projects/{id}` - Update project details
- `PUT /projects/{id}/status` - Update project status
- `DELETE /projects/{id}` - Delete project

Only users with admin roles can access these endpoints.

### Tasks
- `GET /tasks` - Get all tasks
- `GET /tasks/{id}` - Get task by ID
- `GET /tasks/project/{projectId}` - Get tasks associated with a project
- `POST /tasks` - Create a new task
- `PUT /tasks/{id}/status` - Update task status
- `DELETE /tasks/{id}` - Delete task

Regular users can only modify and delete their own tasks. User with admin roles can modify and delete all tasks. 

### Users
- `GET /users` - Get all users
- `GET /users/{id}` - Get user by ID

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
