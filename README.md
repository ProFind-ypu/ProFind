# ProFind

![TypeScript](https://img.shields.io/badge/TypeScript-58.6%25-blue)
![Java](https://img.shields.io/badge/Java-33.5%25-orange)
![License](https://img.shields.io/badge/license-MIT-green)

**ProFind** is a full-stack web application designed to connect students with professors for academic projects and research opportunities. The platform facilitates project discovery, proposal submission, and collaboration management within educational institutions.

## ✨ Features

- **Project Discovery**: Browse and search for professor-led projects
- **Proposal Management**: Submit, review, and track project proposals
- **User Authentication**: Secure registration and login system with JWT
- **Dashboard**: Personalized dashboard showing your projects and proposals
- **Real-time Updates**: Track proposal status (accepted, rejected, pending)
- **AI Assistant Integration**: Built-in messaging connected to n8n AI assistant
- **Responsive Design**: Modern UI built with React and Tailwind CSS

## 🏗️ Architecture

ProFind follows a modern microservices-inspired architecture:
ProFind/
├── Interface/ # Frontend (React + TypeScript + Vite)
│ └── profind/
├── Server/ # Backend (Spring Boot + Java 21)
│ └── profind-backend/
├── Build.sh # Linux/Mac build script
└── Build.bat # Windows build scriptProFind/
├── Interface/ # Frontend (React + TypeScript + Vite)
│ └── profind/
├── Server/ # Backend (Spring Boot + Java 21)
│ └── profind-backend/
├── Build.sh # Linux/Mac build script
└── Build.bat # Windows build script

### 🛠️ Tech Stack

**Frontend:**
- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- React Router DOM
- Axios

**Backend:**
- Spring Boot 3.5.7
- Java 21
- PostgreSQL 15
- Redis (caching)
- JWT Authentication
- Flyway (database migrations)
- Spring Security
- OpenAPI/Swagger documentation

## 📋 Prerequisites

Before running ProFind, ensure you have the following installed:

- **Java 21 JDK** - [Download here](https://adoptium.net/)
- **Maven 3.6+** - [Download here](https://maven.apache.org/)
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Docker & Docker Compose** (recommended) - [Download here](https://www.docker.com/)

Alternatively, you can install PostgreSQL 15+ and Redis 7+ locally instead of using Docker.

## 🚀 Installation & Setup

### Quick Start with Docker (Recommended)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ProFind-ypu/ProFind.git
   cd ProFind
2. **Start backend services (PostgreSQL + Redis):**
   ```bash
    cd Server/profind-backend
    docker-compose up -d db redis
3. **Build and run the backend:**
   ```bash
    mvn clean install
    mvn spring-boot:run
  The frontend will be available at http://localhost:5173

##  Manual Setup (Without Docker)

  If you prefer not to use Docker, you'll need to set up PostgreSQL and Redis manually:
  1. Install PostgreSQL 15+:
    Create database: profind_db
    Create user: profind with password: profindpass
  2. Install Redis 7+:
    Ensure Redis is running on port 6379
    Update application.properties in Server/profind-backend/src/main/resources/ with your local database credentials
  3. Follow steps 3-4 from the Docker setup above

**Usage**
  **Accessing the Application**
      Once both services are running:
      Frontend: http://localhost:5173
      Backend API: http://localhost:8081
    
  **First-Time Setup**
    Navigate to the frontend URL
    Register a new account using the signup form
    Login with your credentials
    Explore available projects or create proposals
  **API Testing**
    We include Postman collections for API testing:
    Server/profind-backend/ProFind_API.postman_collection.json
    Server/profind-backend/ProFind_Local.postman_environment.json
    Import these into Postman to test endpoints easily.
## ⚙️Configuration
  **Environment Variables**
    The backend supports configuration via environment variables:
|Variable|Description|Default Value|
|---|:---:|:---:|
|SPRING_DATASOURCE_URL|PostgreSQL connection URL|jdbc:postgresql://db:5432/profind_db|
|SPRING_DATASOURCE_USERNAME|Database username|profind|
|SPRING_DATASOURCE_PASSWORD|Database password|profindpass|
|SPRING_REDIS_HOST|Redis host|localhost|
|SPRING_REDIS_PORT|Redis port|6379|

## Code Structure
**Backend (Server/profind-backend/src/main/java/com/profind/):**
* **controller/** - REST API endpoints 
* **service/** - Business logic
* **repository/** - Data access layer
* **entity/** - JPA entities
* **config/** - Configuration classes
* **security/** - Authentication and authorization

**Frontend (Interface/profind/src/):**
- **components/** - Reusable React components
- **pages/** - Page components
- **services/** - API service calls
- **context/** - React context providers
- **hooks/** - Custom React hooks
## 👥 Creators:
- **Elie-AboZraa - [Github Profile](https://github.com/Elie-AboZraa)**
- **AGminuse - [Github Profile](https://github.com/AGminuse)**

## License
- This project is licensed under the MIT License - see the LICENSE file for details.
## Acknowledgments
- Spring Boot team for the excellent framework
- React community for continuous innovation

**Need Help? Open an issue on GitHub or reach out to the Creator directly.**
  
