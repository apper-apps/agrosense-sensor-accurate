import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import WeatherWidget from "@/components/molecules/WeatherWidget";
import weatherService from "@/services/api/weatherService";
import ApperIcon from "@/components/ApperIcon";

const Hero = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        const data = await weatherService.getCurrentWeather();
        setWeatherData(data);
      } catch (error) {
        console.error("Failed to load weather data:", error);
      }
    };

    loadWeatherData();
    const interval = setInterval(loadWeatherData, 300000); // Update every 5 minutes
    
    return () => clearInterval(interval);
  }, []);

  return (
<section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2323D160%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:pr-8"
          >
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-accent-100 to-accent-200 px-4 py-2 rounded-full">
                <span className="text-accent-700 font-semibold text-sm">
                  🚀 Trusted by 10,000+ farmers worldwide
                </span>
              </div>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Smart Farming
              <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Increase crop yields by 25% and reduce water usage by 30% with our 
              AI-powered agricultural monitoring system. Real-time data, predictive 
              analytics, and actionable insights at your fingertips.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button variant="primary" size="lg" className="group">
                Start Free Trial
                <ApperIcon name="ArrowRight" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="outline" size="lg" className="group">
                <ApperIcon name="Play" className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-1">25%</div>
                <div className="text-sm text-gray-600">Yield Increase</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-600 mb-1">30%</div>
                <div className="text-sm text-gray-600">Water Savings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-600 mb-1">$2,500</div>
                <div className="text-sm text-gray-600">Avg. Annual Savings</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="space-y-6">
<WeatherWidget 
                weatherData={weatherData ? {
                  temperature: weatherData.temperature_c,
                  humidity: weatherData.humidity_c,
                  rainfall: weatherData.rainfall_c,
                  windSpeed: weatherData.wind_speed_c
                } : null} 
              />
              
              {/* Additional dashboard preview */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Crop Health Status</h3>
                  <div className="flex items-center text-sm text-success">
                    <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                    Excellent
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-success/10 to-success/20 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <ApperIcon name="Leaf" className="w-8 h-8 text-success" />
                      <span className="text-2xl font-bold text-success">94%</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Soil Health</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-info/10 to-info/20 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <ApperIcon name="Droplets" className="w-8 h-8 text-info" />
                      <span className="text-2xl font-bold text-info">87%</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Irrigation Efficiency</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full opacity-20"
            />
            
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full opacity-20"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;