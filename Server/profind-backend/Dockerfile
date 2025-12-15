# Use Maven to build the application
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

# Copy source code and build
COPY . .
RUN mvn clean package -DskipTests -Dmaven.wagon.http.retryHandler.count=5

# Use a lightweight JDK image to run the app
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port (matches docker-compose)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]

