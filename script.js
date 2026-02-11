// API Configuration
const apiKey = 'f155f877a67d334234b6aecb896fcb48';
const backendUrl = 'http://localhost:8080/api/weather';

// Weather emoji icons
const weatherEmojis = {
  Clear: '☀️',
  Clouds: '☁️',
  Rain: '🌧️',
  Snow: '❄️',
  Thunderstorm: '⚡',
  Drizzle: '🌦️',
  Mist: '🌫️',
  Smoke: '🌫️',
  Haze: '🌫️',
  Fog: '🌫️'
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
  setupEventListeners();
  generateParticles();
});

// Initialize app
function initializeApp() {
  // Check for saved theme
  const savedTheme = localStorage.getItem('weatherTheme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    updateThemeIcon();
  }
  
  // Load last searched city
  const lastCity = localStorage.getItem('lastSearchedCity');
  if (lastCity) {
    document.getElementById('cityInput').placeholder = `Last searched: ${lastCity}`;
  }
}

// Setup event listeners
function setupEventListeners() {
  // Enter key to search
  document.getElementById('cityInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      getWeather();
    }
  });
  
  // Input focus animation
  document.getElementById('cityInput').addEventListener('focus', function() {
    this.parentElement.style.transform = 'scale(1.02)';
  });
  
  document.getElementById('cityInput').addEventListener('blur', function() {
    this.parentElement.style.transform = 'scale(1)';
  });
}

// Main function to get weather
async function getWeather() {
  const cityInput = document.getElementById('cityInput');
  const city = cityInput.value.trim();
  
  if (!city) {
    showToast('Please enter a city name!', 'error');
    cityInput.focus();
    return;
  }

  try {
    showLoading(true);
    hideError();
    hideWeatherDisplay();

    // Fetch weather data
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );
    
    const data = await response.json();

    if (data.cod !== "200") {
      showError('City not found! Please check the spelling and try again.');
      showLoading(false);
      return;
    }

    // Save to localStorage
    localStorage.setItem('lastSearchedCity', city);

    // Save to database
    await saveWeatherToDatabase(city, data);

    // Display weather
    displayCurrentWeather(data);
    displayForecast(data);
    
    showToast(`Weather data loaded for ${data.city.name}!`, 'success');
    showLoading(false);

  } catch (error) {
    console.error('Error fetching weather:', error);
    showError('Network error! Please check your internet connection.');
    showLoading(false);
  }
}

// Quick search function
function quickSearch(city) {
  document.getElementById('cityInput').value = city;
  getWeather();
}

// Display current weather
function displayCurrentWeather(data) {
  const current = data.list[0];
  const city = data.city.name;
  const country = data.city.country;
  const temp = Math.round(current.main.temp);
  const description = current.weather[0].description;
  const weatherMain = current.weather[0].main;
  const icon = current.weather[0].icon;
  const humidity = current.main.humidity;
  const windSpeed = current.wind.speed;
  const pressure = current.main.pressure;
  const feelsLike = Math.round(current.main.feels_like);
  const emoji = weatherEmojis[weatherMain] || '🌍';

  const currentWeatherHTML = `
    <div class="weather-header">
      <div class="location-info">
        <h2>${emoji} ${city}, ${country}</h2>
        <p>${new Date().toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</p>
      </div>
      <img src="https://openweathermap.org/img/wn/${icon}@4x.png" alt="${description}" class="weather-icon-main">
    </div>
    
    <div class="temperature-display">
      <span class="temp-value">${temp}°C</span>
      <div class="weather-description">${description}</div>
    </div>
    
    <div class="weather-details-grid">
      <div class="detail-card">
        <i class="fas fa-temperature-high"></i>
        <div class="detail-label">Feels Like</div>
        <div class="detail-value">${feelsLike}°C</div>
      </div>
      <div class="detail-card">
        <i class="fas fa-tint"></i>
        <div class="detail-label">Humidity</div>
        <div class="detail-value">${humidity}%</div>
      </div>
      <div class="detail-card">
        <i class="fas fa-wind"></i>
        <div class="detail-label">Wind Speed</div>
        <div class="detail-value">${windSpeed} m/s</div>
      </div>
      <div class="detail-card">
        <i class="fas fa-compress-arrows-alt"></i>
        <div class="detail-label">Pressure</div>
        <div class="detail-value">${pressure} hPa</div>
      </div>
    </div>
  `;

  const weatherCard = document.getElementById('currentWeather');
  weatherCard.innerHTML = currentWeatherHTML;
  weatherCard.classList.add('active');
}

// Display 5-day forecast
function displayForecast(data) {
  const forecastContainer = document.getElementById('forecast');
  forecastContainer.innerHTML = '';

  // Get one forecast per day (every 8th item = 24 hours)
  for (let i = 0; i < data.list.length; i += 8) {
    const item = data.list[i];
    const date = new Date(item.dt * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const temp = Math.round(item.main.temp);
    const description = item.weather[0].description;
    const icon = item.weather[0].icon;
    const humidity = item.main.humidity;
    const windSpeed = item.wind.speed;
    const tempMin = Math.round(item.main.temp_min);
    const tempMax = Math.round(item.main.temp_max);

    const card = document.createElement('div');
    card.className = 'forecast-card';
    card.innerHTML = `
      <div class="forecast-day">${dayName}</div>
      <div class="forecast-date">${dateStr}</div>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" class="forecast-icon">
      <div class="forecast-temp">${temp}°C</div>
      <div class="forecast-desc">${description}</div>
      <div class="forecast-details">
        <div class="forecast-detail-item">
          <div class="forecast-detail-label">Max</div>
          <div class="forecast-detail-value">${tempMax}°C</div>
        </div>
        <div class="forecast-detail-item">
          <div class="forecast-detail-label">Min</div>
          <div class="forecast-detail-value">${tempMin}°C</div>
        </div>
        <div class="forecast-detail-item">
          <div class="forecast-detail-label">Humidity</div>
          <div class="forecast-detail-value">${humidity}%</div>
        </div>
        <div class="forecast-detail-item">
          <div class="forecast-detail-label">Wind</div>
          <div class="forecast-detail-value">${windSpeed} m/s</div>
        </div>
      </div>
    `;
    
    forecastContainer.appendChild(card);
  }
  
  document.getElementById('forecastSection').classList.add('active');
}

// Save weather to database
async function saveWeatherToDatabase(city, weatherData) {
  try {
    const current = weatherData.list[0];
    
    const weatherRecord = {
      cityName: city,
      country: weatherData.city.name,
      temperature: current.main.temp,
      description: current.weather[0].description,
      humidity: current.main.humidity,
      windSpeed: current.wind.speed,
      pressure: current.main.pressure,
      weatherCondition: current.weather[0].main,
      timestamp: new Date().toISOString()
    };

    const response = await fetch(`${backendUrl}/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(weatherRecord)
    });

    if (!response.ok) {
      console.warn('Backend not available - continuing without database');
    }
  } catch (error) {
    console.warn('Database save error:', error);
  }
}

// View search history
async function viewHistory() {
  try {
    const response = await fetch(`${backendUrl}/history`);
    
    if (!response.ok) {
      showToast('Cannot connect to database. Make sure backend is running.', 'warning');
      return;
    }

    const history = await response.json();
    displayHistory(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    showToast('Backend not available. Please start the Java server.', 'error');
  }
}

// Display history in modal
function displayHistory(history) {
  const modal = document.getElementById('historyModal');
  const historyList = document.getElementById('historyList');
  
  if (!history || history.length === 0) {
    historyList.innerHTML = `
      <div class="empty-history">
        <i class="fas fa-history"></i>
        <p>No search history found.</p>
        <p style="font-size: 0.9rem; margin-top: 0.5rem; opacity: 0.8;">Start searching for cities to build your history!</p>
      </div>
    `;
  } else {
    historyList.innerHTML = history.map(item => {
      const date = new Date(item.timestamp).toLocaleString();
      const emoji = weatherEmojis[item.weatherCondition] || '🌍';
      
      return `
        <div class="history-item">
          <div class="history-info">
            <div class="history-city">${emoji} ${item.cityName}</div>
            <div class="history-time"><i class="far fa-clock"></i> ${date}</div>
            <div class="history-weather">${item.temperature}°C - ${item.description}</div>
          </div>
          <button class="history-action" onclick="searchFromHistory('${item.cityName}')">
            <i class="fas fa-search"></i> Search
          </button>
        </div>
      `;
    }).join('');
  }
  
  modal.classList.add('active');
}

// Search from history
function searchFromHistory(city) {
  document.getElementById('cityInput').value = city;
  closeHistory();
  getWeather();
}

// Close history modal
function closeHistory() {
  document.getElementById('historyModal').classList.remove('active');
}

// Toggle theme
function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  const isDark = document.body.classList.contains('dark-theme');
  localStorage.setItem('weatherTheme', isDark ? 'dark' : 'light');
  updateThemeIcon();
  showToast(`${isDark ? 'Dark' : 'Light'} theme activated!`, 'success');
}

// Update theme icon
function updateThemeIcon() {
  const themeBtn = document.getElementById('themeBtn');
  const isDark = document.body.classList.contains('dark-theme');
  themeBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Show/hide loading
function showLoading(show) {
  const loader = document.getElementById('loadingSpinner');
  if (show) {
    loader.classList.add('active');
  } else {
    loader.classList.remove('active');
  }
}

// Show error message
function showError(message) {
  const errorEl = document.getElementById('error');
  errorEl.textContent = message;
  errorEl.style.display = 'block';
}

// Hide error message
function hideError() {
  const errorEl = document.getElementById('error');
  errorEl.textContent = '';
  errorEl.style.display = 'none';
}

// Hide weather display
function hideWeatherDisplay() {
  document.getElementById('currentWeather').classList.remove('active');
  document.getElementById('forecastSection').classList.remove('active');
}

// Show toast notification
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type}`;
  
  // Add icon based on type
  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : '⚠';
  toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : 'exclamation-triangle'}"></i> ${message}`;
  
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Generate floating particles
function generateParticles() {
  const particlesContainer = document.getElementById('particles');
  particlesContainer.innerHTML = ''; // Clear existing
  
  const particleCount = window.innerWidth < 768 ? 20 : 40;
  
  for(let i = 0; i < particleCount; i++) {
    const span = document.createElement('span');
    span.style.left = Math.random() * 100 + '%';
    span.style.animationDuration = (10 + Math.random() * 20) + 's';
    span.style.animationDelay = Math.random() * 10 + 's';
    const size = (5 + Math.random() * 15) + 'px';
    span.style.width = size;
    span.style.height = size;
    particlesContainer.appendChild(span);
  }
}

// Regenerate particles on resize
let resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    generateParticles();
  }, 250);
});

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('historyModal');
  if (event.target === modal) {
    closeHistory();
  }
}

// Service Worker for offline support (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker registered'))
      .catch(err => console.log('Service Worker registration failed'));
  });
}

// Geolocation support
function getUserLocation() {
  if (navigator.geolocation) {
    showToast('Getting your location...', 'success');
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
          );
          const data = await response.json();
          if (data.name) {
            document.getElementById('cityInput').value = data.name;
            getWeather();
          }
        } catch (error) {
          showToast('Could not get location weather', 'error');
        }
      },
      (error) => {
        showToast('Location access denied', 'error');
      }
    );
  } else {
    showToast('Geolocation not supported', 'error');
  }
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
  // Ctrl/Cmd + K to focus search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    document.getElementById('cityInput').focus();
  }
  
  // Escape to close modal
  if (e.key === 'Escape') {
    closeHistory();
  }
});

// Prevent zoom on mobile
document.addEventListener('gesturestart', function(e) {
  e.preventDefault();
});

// Add touch feedback for mobile
if ('ontouchstart' in window) {
  document.addEventListener('touchstart', function() {}, { passive: true });
}

console.log('%c🌤️ Weather App Ready!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cKeyboard shortcuts: Ctrl/Cmd + K to search, Escape to close modals', 'color: #8b5cf6; font-size: 14px;');
