import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const WeatherWidget = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="p-6 bg-gradient-to-br from-secondary-50 to-primary-50 border-primary-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Live Farm Conditions</h3>
          <div className="flex items-center text-sm text-gray-600">
            <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
            Live Data
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <ApperIcon name="Thermometer" className="w-6 h-6 text-accent-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{weatherData.temperature}°F</p>
            <p className="text-sm text-gray-600">Temperature</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <ApperIcon name="Droplets" className="w-6 h-6 text-info" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{weatherData.humidity}%</p>
            <p className="text-sm text-gray-600">Humidity</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <ApperIcon name="CloudRain" className="w-6 h-6 text-secondary-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{weatherData.rainfall}"</p>
            <p className="text-sm text-gray-600">Rainfall</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <ApperIcon name="Wind" className="w-6 h-6 text-primary-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{weatherData.windSpeed} mph</p>
            <p className="text-sm text-gray-600">Wind Speed</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default WeatherWidget;