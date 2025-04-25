# Step 1: Use the official Maven image to build the app
FROM maven:3.9.9-openjdk-17 AS builder

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the pom.xml and the src directory to the working directory
COPY pom.xml .
COPY src ./src

# Step 4: Run Maven to build the app
RUN mvn clean package -DskipTests

# Step 5: Use OpenJDK 17 for running the application
FROM openjdk:17-jdk-slim

# Step 6: Set the working directory in the container
WORKDIR /app

# Step 7: Copy the jar file from the builder stage to the new image
COPY --from=builder /app/target/ems-0.0.1-SNAPSHOT.jar /app/ems.jar

# Step 8: Expose the port that the app will run on (default Spring Boot port is 8080)
EXPOSE 8080

# Step 9: Define the command to run the application
ENTRYPOINT ["java", "-jar", "/app/ems.jar"]
