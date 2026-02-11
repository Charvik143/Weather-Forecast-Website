@echo off
echo ========================================
echo Weather Prediction Application
echo Starting Java Backend Server
echo ========================================
echo.

:: Check if Maven is installed
where mvn >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Maven is not installed or not in PATH
    echo Please install Maven from https://maven.apache.org/download.cgi
    pause
    exit /b 1
)

:: Check if Java is installed
where java >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Java is not installed or not in PATH
    echo Please install Java JDK 11+ from https://adoptium.net/
    pause
    exit /b 1
)

echo Maven and Java found!
echo.

:: Build the project
echo Building the project...
echo.
call mvn clean install

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Build failed!
    echo Please check the error messages above.
    pause
    exit /b 1
)

echo.
echo Build successful!
echo.

:: Run the application
echo Starting Spring Boot application...
echo Server will run on http://localhost:8080
echo Press Ctrl+C to stop the server
echo.
echo ========================================
echo.

call mvn spring-boot:run

pause
