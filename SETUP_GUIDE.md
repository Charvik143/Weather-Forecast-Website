# 🚀 Quick Setup Guide - Weather Prediction Application

## Step-by-Step Installation Instructions

### ⚙️ STEP 1: Install Prerequisites

#### 1.1 Install Java JDK 11 or higher
- Download from: https://www.oracle.com/java/technologies/downloads/
- Or use OpenJDK: https://adoptium.net/
- Verify installation:
```bash
java -version
```

#### 1.2 Install MySQL
- Download from: https://dev.mysql.com/downloads/installer/
- During installation, set root password (remember this!)
- Verify installation:
```bash
mysql --version
```

#### 1.3 Install Maven
- Download from: https://maven.apache.org/download.cgi
- Add to PATH environment variable
- Verify installation:
```bash
mvn -version
```

### 📊 STEP 2: Setup MySQL Database

#### 2.1 Start MySQL Service
Windows:
```bash
net start MySQL80
```

Linux/Mac:
```bash
sudo service mysql start
```

#### 2.2 Login to MySQL
```bash
mysql -u root -p
```
Enter your root password when prompted.

#### 2.3 Create Database
Run these commands in MySQL:
```sql
CREATE DATABASE weather_db;
USE weather_db;
```

#### 2.4 Run Setup Script
Exit MySQL and run:
```bash
mysql -u root -p weather_db < database_setup.sql
```

Or copy and paste the contents of `database_setup.sql` into MySQL Workbench and execute.

### ☕ STEP 3: Configure Java Backend

#### 3.1 Update Database Credentials
Open `application.properties` and modify:
```properties
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

#### 3.2 Create Proper Package Structure
Create the following folder structure:
```
src/
└── main/
    ├── java/
    │   └── com/
    │       └── weather/
    │           └── app/
    │               ├── WeatherApplication.java
    │               ├── controller/
    │               │   └── WeatherController.java
    │               ├── model/
    │               │   └── WeatherRecord.java
    │               ├── repository/
    │               │   └── WeatherRepository.java
    │               └── service/
    │                   └── WeatherService.java
    └── resources/
        └── application.properties
```

#### 3.3 Move Files to Correct Locations
- Move `WeatherApplication.java` to `src/main/java/com/weather/app/`
- Move `WeatherController.java` to `src/main/java/com/weather/app/controller/`
- Move `WeatherRecord.java` to `src/main/java/com/weather/app/model/`
- Move `WeatherRepository.java` to `src/main/java/com/weather/app/repository/`
- Move `WeatherService.java` to `src/main/java/com/weather/app/service/`
- Move `application.properties` to `src/main/resources/`
- Keep `pom.xml` in the root directory

### 🏃 STEP 4: Run the Application

#### 4.1 Build the Project
Open command prompt in project directory:
```bash
mvn clean install
```

#### 4.2 Start the Backend Server
```bash
mvn spring-boot:run
```

You should see:
```
Started WeatherApplication in X.XXX seconds
```

The backend is now running on `http://localhost:8080`

#### 4.3 Open the Frontend
Simply double-click `index.html` or open it in your browser:
```
file:///C:/Users/sudar/OneDrive/Desktop/Weather%20Predection%20Using%20API/index.html
```

### ✅ STEP 5: Test the Application

#### 5.1 Test Frontend
1. Open `index.html` in browser
2. Enter a city name (e.g., "Kakinada")
3. Click "Get Forecast"
4. You should see weather data and 5-day forecast

#### 5.2 Test Backend Connection
1. Click "View History" button
2. If backend is running, you'll see the history modal
3. If not connected, you'll see an error message

#### 5.3 Verify Database
Check if data is being saved:
```sql
USE weather_db;
SELECT * FROM weather_records ORDER BY timestamp DESC LIMIT 10;
```

### 🐛 Common Issues & Solutions

#### Issue 1: Port 8080 already in use
**Solution**: Change port in `application.properties`:
```properties
server.port=8081
```
And update in `script.js`:
```javascript
const backendUrl = 'http://localhost:8081/api/weather';
```

#### Issue 2: MySQL connection refused
**Solutions**:
- Verify MySQL service is running
- Check username/password in `application.properties`
- Ensure `weather_db` database exists
- Check MySQL port (default: 3306)

#### Issue 3: Maven build fails
**Solutions**:
- Ensure Java JDK 11+ is installed
- Check internet connection (Maven downloads dependencies)
- Run `mvn clean` then `mvn install`

#### Issue 4: CORS errors in browser
**Solution**: The backend has CORS enabled. If still seeing errors:
- Use a local server instead of opening file directly
- Install "Live Server" extension in VS Code
- Use Python simple server: `python -m http.server 3000`

#### Issue 5: Weather data not loading
**Solutions**:
- Check internet connection
- Verify API key is valid
- Check browser console for errors
- Try a different city name

### 🎓 Alternative Simple Setup (Without Database)

If you want to test the frontend only without database:

1. Open `script.js`
2. Comment out database save function calls
3. The app will work perfectly for weather display, just won't save history

The frontend works independently! Database is only for search history feature.

### 📱 Testing Checklist

- [ ] Java installed and working
- [ ] MySQL installed and running
- [ ] Database `weather_db` created
- [ ] `weather_records` table exists
- [ ] Backend runs without errors
- [ ] Can access http://localhost:8080
- [ ] Frontend loads in browser
- [ ] Can search for weather
- [ ] Weather data displays correctly
- [ ] Forecast cards flip on hover
- [ ] History button works
- [ ] Data saves to database

### 🎉 You're All Set!

If all steps completed successfully, you have a fully functional weather prediction application with:
- Beautiful interactive UI
- Real-time weather data
- Database integration
- Search history feature

Enjoy your weather app! 🌤️

---

**Need Help?**
Check the main README.md for detailed documentation and troubleshooting.
