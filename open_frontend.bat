@echo off
echo ========================================
echo Weather Prediction Application
echo Opening Frontend in Browser
echo ========================================
echo.

:: Check if index.html exists
if not exist "index.html" (
    echo ERROR: index.html not found!
    echo Make sure you're running this from the project directory.
    pause
    exit /b 1
)

echo Opening index.html in default browser...
echo.

:: Open in default browser
start "" "index.html"

echo.
echo Frontend opened in browser!
echo.
echo NOTE: For full functionality (search history),
echo make sure the Java backend is running on port 8080
echo.
echo Run 'run_backend.bat' in another terminal to start backend.
echo.

pause
