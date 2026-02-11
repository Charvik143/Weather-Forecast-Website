# 🌟 Weather Prediction Application

A modern, interactive weather forecast application with a beautiful UI, built using HTML, CSS, JavaScript, Java Spring Boot, and MySQL database.

## 📋 Features

- ✨ **Interactive UI** with animated gradient backgrounds and floating particles
- 🌍 **Real-time Weather Data** from OpenWeatherMap API
- 📊 **5-Day Forecast** with detailed weather information
- 🔄 **Flip Cards** for additional weather details
- 💾 **Database Storage** of search history using MySQL
- 📜 **Search History** view with timestamps
- 🎨 **Dynamic Backgrounds** that change based on weather conditions
- 📱 **Responsive Design** for mobile and desktop

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3 (with animations and transitions)
- JavaScript (ES6+)
- OpenWeatherMap API

### Backend
- Java 11+
- Spring Boot 2.7.14
- Spring Data JPA
- Maven

### Database
- MySQL 8.0+

## 📦 Project Structure

```
Weather Predection Using API/
├── index.html              # Main HTML file
├── styles.css              # Stylesheet with animations
├── script.js               # JavaScript logic
├── WeatherApplication.java # Spring Boot main application
├── WeatherRecord.java      # JPA Entity model
├── WeatherRepository.java  # Data access layer
├── WeatherService.java     # Business logic layer
├── WeatherController.java  # REST API controller
├── application.properties  # Spring Boot configuration
├── pom.xml                # Maven dependencies
├── database_setup.sql     # MySQL database setup script
└── README.md              # This file
```

## 🚀 Installation & Setup

### Prerequisites
- Java JDK 11 or higher
- MySQL 8.0 or higher
- Maven 3.6+
- Modern web browser
- OpenWeatherMap API key (already included)

### Step 1: Database Setup

1. Install and start MySQL server
2. Open MySQL command line or MySQL Workbench
3. Run the database setup script:

```bash
mysql -u root -p < database_setup.sql
```

Or manually:
```sql
CREATE DATABASE weather_db;
USE weather_db;
-- Then run the rest of database_setup.sql
```

### Step 2: Configure Database Connection

Edit `application.properties` and update database credentials:

```properties
spring.datasource.username=root
spring.datasource.password=your_password
```

### Step 3: Build and Run Java Backend

1. Navigate to the project directory
2. Build the project:

```bash
mvn clean install
```

3. Run the Spring Boot application:

```bash
mvn spring-boot:run
```

Or run the compiled JAR:

```bash
java -jar target/weather-app-1.0.0.jar
```

The backend will start on `http://localhost:8080`

### Step 4: Run the Frontend

Simply open `index.html` in your web browser, or use a local server:

Using Python:
```bash
python -m http.server 3000
```

Then visit `http://localhost:3000`

## 📖 Usage

1. **Search Weather**: Enter a city name and click "Get Forecast"
2. **View Details**: Hover over forecast cards to see detailed information
3. **View History**: Click "View History" to see past searches (requires backend)
4. **Search from History**: Click "Search Again" on any history item

## 🔌 API Endpoints

### Backend REST API

- `POST /api/weather/save` - Save weather data
- `GET /api/weather/history` - Get all search history
- `GET /api/weather/city/{cityName}` - Get weather by city
- `GET /api/weather/condition/{condition}` - Get weather by condition
- `GET /api/weather/{id}` - Get weather by ID
- `DELETE /api/weather/{id}` - Delete weather record
- `GET /api/weather/count` - Get total record count

## 🎨 Features in Detail

### Frontend Features
- **Animated gradient background** that shifts colors
- **Floating particles** animation effect
- **Flip cards** with front and back views
- **Dynamic weather backgrounds** based on conditions
- **Weather emoji icons** for visual appeal
- **Responsive design** for all devices
- **Loading animations** during data fetch
- **Error handling** with user-friendly messages

### Backend Features
- **RESTful API** architecture
- **JPA/Hibernate** for database operations
- **CORS enabled** for cross-origin requests
- **Automatic table creation** via Hibernate
- **Indexed database** for faster queries
- **Transaction management** for data integrity

## 🗄️ Database Schema

### weather_records table

| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT | Primary key (auto-increment) |
| city_name | VARCHAR(100) | City name |
| country | VARCHAR(100) | Country name |
| temperature | DOUBLE | Temperature in Celsius |
| description | VARCHAR(255) | Weather description |
| humidity | INT | Humidity percentage |
| wind_speed | DOUBLE | Wind speed in m/s |
| pressure | INT | Atmospheric pressure in hPa |
| weather_condition | VARCHAR(50) | Weather condition (Clear, Rain, etc.) |
| timestamp | DATETIME | Search timestamp |

## 🔧 Troubleshooting

### Backend won't start
- Check if MySQL is running
- Verify database credentials in `application.properties`
- Ensure port 8080 is not in use

### Cannot connect to database
- Verify MySQL service is running
- Check username/password in `application.properties`
- Ensure `weather_db` database exists

### Frontend shows "Cannot connect to database"
- Make sure Java backend is running on port 8080
- Check browser console for CORS errors
- Verify backend URL in `script.js`

### Weather data not loading
- Check internet connection
- Verify OpenWeatherMap API key is valid
- Check browser console for errors

## 🌐 Weather Backgrounds

The app automatically changes background based on weather:
- ☀️ Clear - Sunny sky background
- ☁️ Clouds - Cloudy sky background
- 🌧️ Rain - Rainy weather background
- ❄️ Snow - Snowy landscape background
- ⚡ Thunderstorm - Storm background
- 🌫️ Mist/Fog - Misty background

## 📝 Configuration

### Change API Key
Edit `script.js` line 2:
```javascript
const apiKey = 'your_api_key_here';
```

### Change Backend Port
Edit `application.properties`:
```properties
server.port=8080
```

And update `script.js`:
```javascript
const backendUrl = 'http://localhost:8080/api/weather';
```

## 🎯 Future Enhancements

- [ ] User authentication and personalized dashboards
- [ ] Weather alerts and notifications
- [ ] Graph visualization of temperature trends
- [ ] Favorite cities list
- [ ] Export weather data to PDF/CSV
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Weather maps integration

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Vemavarapu Lakshmiprasannakumar

## 🙏 Acknowledgments

- OpenWeatherMap for the weather API
- Spring Boot framework
- MySQL database
- All open-source contributors

---

**Note**: Make sure to keep your API keys secure and never commit them to public repositories!

