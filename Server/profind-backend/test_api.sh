

# Test server health
curl -s -X GET "http://localhost:8080/actuator/health"

# Test registration endpoint
curl -s -X POST "http://localhost:8080/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpass",
    "uni_id": "202110077"
    "fullName": "Test User",
  }'

# Test login endpoint 
curl -s -X POST "http://localhost:8080/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpass"
  }'

