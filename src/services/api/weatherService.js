import weatherData from "@/services/mockData/weather.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const weatherService = {
  async getCurrentWeather() {
    await delay(250);
    // Simulate real-time data with small variations
    const baseData = { ...weatherData };
    return {
      ...baseData,
      temperature: baseData.temperature + Math.round((Math.random() - 0.5) * 10),
      humidity: Math.max(30, Math.min(95, baseData.humidity + Math.round((Math.random() - 0.5) * 20))),
      rainfall: Math.max(0, baseData.rainfall + Math.round((Math.random() - 0.5) * 0.5 * 100) / 100),
      windSpeed: Math.max(0, baseData.windSpeed + Math.round((Math.random() - 0.5) * 8)),
      timestamp: new Date().toISOString()
    };
  },

  async getHistoricalData(days = 7) {
    await delay(400);
    const data = [];
    const now = new Date();
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toISOString().split('T')[0],
        temperature: 65 + Math.round(Math.random() * 20),
        humidity: 40 + Math.round(Math.random() * 40),
        rainfall: Math.round(Math.random() * 100) / 100,
        windSpeed: Math.round(Math.random() * 15)
      });
    }
    
    return data;
  },

  async getForecast(days = 7) {
    await delay(300);
    const forecast = [];
    const now = new Date();
    
    for (let i = 1; i <= days; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() + i);
      
      forecast.push({
        date: date.toISOString().split('T')[0],
        high: 70 + Math.round(Math.random() * 15),
        low: 50 + Math.round(Math.random() * 15),
        humidity: 45 + Math.round(Math.random() * 30),
        precipChance: Math.round(Math.random() * 100),
        condition: ["sunny", "cloudy", "rainy", "partly-cloudy"][Math.floor(Math.random() * 4)]
      });
    }
    
    return forecast;
  }
};

export default weatherService;