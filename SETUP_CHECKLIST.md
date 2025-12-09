# ProFind Project - Setup Checklist

This document outlines everything you need to fully run the ProFind project.

## 🔴 Critical Missing Components

### 1. **Signup/Register Endpoint** ⚠️ HIGH PRIORITY
- **Status**: `UserService.register()` exists but no REST endpoint
- **Location**: `AuthController.java` is missing `/api/auth/register` endpoint
- **Impact**: Users cannot sign up
- **Fix**: Add `@PostMapping("/register")` to `AuthController`

### 2. **CORS Configuration** ⚠️ HIGH PRIORITY
- **Status**: No CORS configuration found
- **Impact**: Frontend (port 5173) cannot communicate with backend (port 8080/8081)
- **Fix**: Add CORS configuration to `SecurityConfig.java` or create `CorsConfig.java`

### 3. **JSONB Mapping for Project Tags** ⚠️ MEDIUM PRIORITY
- **Status**: `Project.tags` field uses `List<String>` with `@Column(columnDefinition = "jsonb")`
- **Issue**: Hibernate doesn't automatically map `List<String>` to JSONB
- **Impact**: Tags may not serialize/deserialize correctly
- **Fix**: Use `@Type(JsonBinaryType.class)` from `hibernate-types-52` (already in pom.xml)

## 🟡 Infrastructure Requirements

### 4. **Database Setup**
- **Required**: PostgreSQL 15+
- **Database Name**: `profind_db`
- **Username**: `profind`
- **Password**: `profindpass`
- **Port**: `5432`
- **Setup Options**:
  - **Option A**: Use Docker Compose (recommended)
    ```bash
    cd ProFind/Server/profind-backend
    docker-compose up -d db
    ```
  - **Option B**: Install PostgreSQL locally and create database manually
    ```sql
    CREATE DATABASE profind_db;
    CREATE USER profind WITH PASSWORD 'profindpass';
    GRANT ALL PRIVILEGES ON DATABASE profind_db TO profind;
    ```
- **Migrations**: Flyway will run automatically on startup (V1-V4)

### 5. **Redis Setup** (Optional but Recommended)
- **Required**: Redis 7+ for caching
- **Port**: `6379`
- **Setup Options**:
  - **Option A**: Use Docker Compose
    ```bash
    docker-compose up -d redis
    ```
  - **Option B**: Install Redis locally
- **Note**: App will fail to start if Redis is not available (unless you disable cache)

### 6. **Java 21**
- **Required**: JDK 21 (as specified in pom.xml)
- **Verify**: `java -version` should show 21.x.x
- **Install**: Download from Oracle or use OpenJDK

### 7. **Maven**
- **Required**: Maven 3.6+ for building backend
- **Verify**: `mvn -version`

### 8. **Node.js & npm**
- **Required**: Node.js 18+ for frontend
- **Verify**: `node -v` and `npm -v`
- **Location**: Frontend is in `Interface/profind/`

## 🟢 Configuration Files

### 9. **Backend Configuration** (`application.properties`)
- ✅ Already configured
- **File**: `Server/profind-backend/src/main/resources/application.properties`
- **Key Settings**:
  - Server port: `8080` (or `8081` in Docker)
  - Database: PostgreSQL connection string
  - Redis: localhost:6379
  - JWT: Uses environment variables with defaults

### 10. **Frontend Configuration** (`vite.config.ts`)
- ✅ Already configured
- **File**: `Interface/profind/vite.config.ts`
- **Proxy**: Frontend proxies `/api` to `http://localhost:8081`
- **Note**: Backend must run on port 8081 (Docker) or update proxy to 8080

## 🔵 Code Fixes Needed

### 11. **Fix Project Tags JSONB Mapping**
Add to `Project.java`:
```java
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import org.hibernate.annotations.Type;

@Type(JsonBinaryType.class)
@Column(columnDefinition = "jsonb")
private List<String> tags;
```

### 12. **Add Register Endpoint**
Add to `AuthController.java`:
```java
@PostMapping("/register")
public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
    try {
        User user = userService.register(
            body.get("email"),
            body.get("password"),
            body.get("fullName"),
            body.get("uni_id")
        );
        return ResponseEntity.ok(Map.of("message", "User registered successfully", "userId", user.getId()));
    } catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
    }
}
```

### 13. **Add CORS Configuration**
Add to `SecurityConfig.java` or create `CorsConfig.java`:
```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```
Then add to `SecurityFilterChain`:
```java
.httpBasic().and()
.cors().configurationSource(corsConfigurationSource())
```

## 📋 Step-by-Step Setup Instructions

### Backend Setup:
1. **Install Dependencies**:
   - Java 21 JDK
   - Maven 3.6+
   - PostgreSQL 15+ (or use Docker)
   - Redis 7+ (or use Docker, optional)

2. **Start Database & Redis**:
   ```bash
   cd ProFind/Server/profind-backend
   docker-compose up -d db redis
   ```

3. **Build Backend**:
   ```bash
   cd ProFind/Server/profind-backend
   mvn clean install
   ```

4. **Run Backend**:
   ```bash
   mvn spring-boot:run
   # OR
   java -jar target/profind-backend-0.0.1-SNAPSHOT.jar
   ```

### Frontend Setup:
1. **Install Dependencies**:
   ```bash
   cd ProFind/Interface/profind
   npm install
   ```

2. **Start Frontend**:
   ```bash
   npm run dev
   ```

### Using Docker (Full Stack):
```bash
cd ProFind/Server/profind-backend
docker-compose up
```

## 🧪 Testing

### Test Backend Health:
```bash
curl http://localhost:8080/actuator/health
```

### Test Registration (after adding endpoint):
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpass",
    "fullName": "Test User",
    "uni_id": "202110077"
  }'
```

### Test Login:
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpass"
  }'
```

## 📝 Environment Variables (Optional)

Create `.env` file or set environment variables:
```bash
APP_JWT_SECRET=YourSecretKeyMustBeAtLeast32CharactersLong
APP_JWT_EXPIRATION_MS=3600000
APP_JWT_REFRESH_EXPIRATION_MS=2592000000
```

## ⚠️ Known Issues

1. **SecurityConfig.csrf() deprecated**: Update to use `csrf(csrf -> csrf.disable())`
2. **Unused imports**: Clean up unused imports in controllers
3. **Null safety warnings**: Consider adding null checks or using Optional properly
4. **projectRepo unused**: Remove unused field from `RequestService` or implement usage

## 🎯 Priority Order

1. **Must Fix First**:
   - Add Register endpoint
   - Add CORS configuration
   - Fix JSONB mapping for tags

2. **Infrastructure**:
   - Set up PostgreSQL
   - Set up Redis (or disable cache)
   - Verify Java 21

3. **Nice to Have**:
   - Fix deprecation warnings
   - Clean up unused code
   - Add proper error handling

## 📚 Additional Resources

- **Backend API Docs**: http://localhost:8080/swagger-ui.html (after adding SpringDoc)
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8080 (or 8081 in Docker)

