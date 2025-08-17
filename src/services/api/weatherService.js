const weatherService = {
  async getCurrentWeather() {
    try {
      const tableName = 'weather_data_c';
      const params = {
        fields: [
          { field: { Name: "temperature_c" } },
          { field: { Name: "humidity_c" } },
          { field: { Name: "rainfall_c" } },
          { field: { Name: "wind_speed_c" } },
          { field: { Name: "timestamp_c" } }
        ],
        orderBy: [{ fieldName: "timestamp_c", sorttype: "DESC" }],
        pagingInfo: { limit: 1, offset: 0 }
      };
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response || !response.success || !response.data || response.data.length === 0) {
        // Return simulated data if no records found
        return {
          temperature_c: 72 + Math.round((Math.random() - 0.5) * 10),
          humidity_c: Math.max(30, Math.min(95, 65 + Math.round((Math.random() - 0.5) * 20))),
          rainfall_c: Math.max(0, 0.2 + Math.round((Math.random() - 0.5) * 0.5 * 100) / 100),
          wind_speed_c: Math.max(0, 8 + Math.round((Math.random() - 0.5) * 8)),
          timestamp_c: new Date().toISOString()
        };
      }
      
      return response.data[0];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching current weather:", error?.response?.data?.message);
      } else {
        console.error("Error fetching current weather:", error.message);
      }
      
      // Return fallback simulated data on error
      return {
        temperature_c: 72 + Math.round((Math.random() - 0.5) * 10),
        humidity_c: Math.max(30, Math.min(95, 65 + Math.round((Math.random() - 0.5) * 20))),
        rainfall_c: Math.max(0, 0.2 + Math.round((Math.random() - 0.5) * 0.5 * 100) / 100),
        wind_speed_c: Math.max(0, 8 + Math.round((Math.random() - 0.5) * 8)),
        timestamp_c: new Date().toISOString()
      };
    }
  },

  async getHistoricalData(days = 7) {
    try {
      const tableName = 'weather_data_c';
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - days);
      
      const params = {
        fields: [
          { field: { Name: "temperature_c" } },
          { field: { Name: "humidity_c" } },
          { field: { Name: "rainfall_c" } },
          { field: { Name: "wind_speed_c" } },
          { field: { Name: "timestamp_c" } }
        ],
        where: [
          {
            FieldName: "timestamp_c",
            Operator: "GreaterThanOrEqualTo",
            Values: [startDate.toISOString()]
          },
          {
            FieldName: "timestamp_c",
            Operator: "LessThanOrEqualTo",
            Values: [endDate.toISOString()]
          }
        ],
        orderBy: [{ fieldName: "timestamp_c", sorttype: "ASC" }]
      };
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response || !response.success || !response.data || response.data.length === 0) {
        // Return simulated historical data if no records found
        const data = [];
        const now = new Date();
        
        for (let i = days; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(date.getDate() - i);
          
          data.push({
            date: date.toISOString().split('T')[0],
            temperature_c: 65 + Math.round(Math.random() * 20),
            humidity_c: 40 + Math.round(Math.random() * 40),
            rainfall_c: Math.round(Math.random() * 100) / 100,
            wind_speed_c: Math.round(Math.random() * 15)
          });
        }
        
        return data;
      }
      
      return response.data.map(record => ({
        date: new Date(record.timestamp_c).toISOString().split('T')[0],
        temperature_c: record.temperature_c,
        humidity_c: record.humidity_c,
        rainfall_c: record.rainfall_c,
        wind_speed_c: record.wind_speed_c
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching historical weather data:", error?.response?.data?.message);
      } else {
        console.error("Error fetching historical weather data:", error.message);
      }
      
      // Return fallback simulated data on error
      const data = [];
      const now = new Date();
      
      for (let i = days; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        
        data.push({
          date: date.toISOString().split('T')[0],
          temperature_c: 65 + Math.round(Math.random() * 20),
          humidity_c: 40 + Math.round(Math.random() * 40),
          rainfall_c: Math.round(Math.random() * 100) / 100,
          wind_speed_c: Math.round(Math.random() * 15)
        });
      }
      
      return data;
    }
  },

  async getForecast(days = 7) {
    try {
      // Since forecast is predictive, we'll simulate it based on current trends
      // In a real implementation, this might come from a weather API or ML model
      const forecast = [];
      const now = new Date();
      
      for (let i = 1; i <= days; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() + i);
        
        forecast.push({
          date: date.toISOString().split('T')[0],
          high: 70 + Math.round(Math.random() * 15),
          low: 50 + Math.round(Math.random() * 15),
          humidity_c: 45 + Math.round(Math.random() * 30),
          precipChance: Math.round(Math.random() * 100),
          condition: ["sunny", "cloudy", "rainy", "partly-cloudy"][Math.floor(Math.random() * 4)]
        });
      }
      
      return forecast;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error generating weather forecast:", error?.response?.data?.message);
      } else {
        console.error("Error generating weather forecast:", error.message);
      }
      
      // Return fallback simulated data on error
      const forecast = [];
      const now = new Date();
      
      for (let i = 1; i <= days; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() + i);
        
        forecast.push({
          date: date.toISOString().split('T')[0],
          high: 70 + Math.round(Math.random() * 15),
          low: 50 + Math.round(Math.random() * 15),
          humidity_c: 45 + Math.round(Math.random() * 30),
          precipChance: Math.round(Math.random() * 100),
          condition: ["sunny", "cloudy", "rainy", "partly-cloudy"][Math.floor(Math.random() * 4)]
        });
      }
      
      return forecast;
    }
  },

  async createWeatherRecord(weatherData) {
    try {
      const tableName = 'weather_data_c';
      const params = {
        records: [{
          Name: weatherData.Name || `Weather ${new Date().toISOString().split('T')[0]}`,
          temperature_c: parseInt(weatherData.temperature_c) || 0,
          humidity_c: parseInt(weatherData.humidity_c) || 0,
          rainfall_c: parseFloat(weatherData.rainfall_c) || 0.0,
          wind_speed_c: parseInt(weatherData.wind_speed_c) || 0,
          timestamp_c: weatherData.timestamp_c || new Date().toISOString()
        }]
      };
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.createRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create weather record ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }
        
        const successfulRecords = response.results.filter(result => result.success);
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating weather record:", error?.response?.data?.message);
      } else {
        console.error("Error creating weather record:", error.message);
      }
      throw error;
    }
  }
};
export default weatherService;