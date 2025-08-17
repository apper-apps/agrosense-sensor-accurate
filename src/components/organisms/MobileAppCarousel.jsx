import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { useGesture } from 'react-use-gesture';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import { cn } from '@/utils/cn';

const mockupScreens = [
  {
    id: 1,
    title: "Real-time Dashboard",
    description: "Monitor all your sensors in one place",
    screen: "dashboard",
    features: ["Live sensor data", "Weather integration", "Alert notifications"]
  },
  {
    id: 2,
    title: "Irrigation Control",
    description: "Smart water management at your fingertips",
    screen: "irrigation",
    features: ["Zone control", "Schedule automation", "Water usage tracking"]
  },
  {
    id: 3,
    title: "Crop Analytics",
    description: "Data-driven insights for better yields",
    screen: "analytics",
    features: ["Growth tracking", "Yield predictions", "Health monitoring"]
  },
  {
    id: 4,
    title: "Weather Insights",
    description: "Hyperlocal weather data and forecasts",
    screen: "weather",
    features: ["7-day forecast", "Soil conditions", "Pest risk alerts"]
  }
];

const DashboardMockup = () => (
  <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 h-full">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-display font-bold text-primary-700">Dashboard</h3>
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
        <span className="text-sm text-primary-600">Online</span>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-2 mb-2">
          <ApperIcon name="Thermometer" size={16} className="text-accent-600" />
          <span className="text-sm text-gray-600">Temperature</span>
        </div>
        <p className="text-2xl font-bold text-primary-700">24°C</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-2 mb-2">
          <ApperIcon name="Droplets" size={16} className="text-secondary-600" />
          <span className="text-sm text-gray-600">Humidity</span>
        </div>
        <p className="text-2xl font-bold text-primary-700">68%</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-2 mb-2">
          <ApperIcon name="Zap" size={16} className="text-warning" />
          <span className="text-sm text-gray-600">pH Level</span>
        </div>
        <p className="text-2xl font-bold text-primary-700">6.8</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-2 mb-2">
          <ApperIcon name="Leaf" size={16} className="text-success" />
          <span className="text-sm text-gray-600">NPK</span>
        </div>
        <p className="text-2xl font-bold text-primary-700">Good</p>
      </div>
    </div>
    
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h4 className="font-semibold text-primary-700 mb-3">Recent Alerts</h4>
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-2 h-2 bg-warning rounded-full"></div>
          <span>Low soil moisture in Zone A</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-2 h-2 bg-success rounded-full"></div>
          <span>Irrigation completed successfully</span>
        </div>
      </div>
    </div>
  </div>
);

const IrrigationMockup = () => (
  <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 p-6 h-full">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-display font-bold text-secondary-700">Irrigation</h3>
      <ApperIcon name="Settings" size={20} className="text-secondary-600" />
    </div>
    
    <div className="space-y-4 mb-6">
      {['Zone A - Tomatoes', 'Zone B - Peppers', 'Zone C - Herbs'].map((zone, index) => (
        <div key={zone} className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-secondary-700">{zone}</span>
            <div className={cn(
              "w-3 h-3 rounded-full",
              index === 0 ? "bg-success animate-pulse" : "bg-gray-300"
            )}></div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Next: 6:00 AM</span>
            <Button size="sm" variant="outline" className="text-xs">
              {index === 0 ? 'Running' : 'Start'}
            </Button>
          </div>
        </div>
      ))}
    </div>
    
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h4 className="font-semibold text-secondary-700 mb-3">Water Usage Today</h4>
      <div className="flex items-end space-x-2 h-20">
        {[40, 60, 35, 80, 55].map((height, index) => (
          <div
            key={index}
            className="bg-secondary-500 w-8 rounded-t"
            style={{ height: `${height}%` }}
          ></div>
        ))}
      </div>
      <p className="text-sm text-gray-600 mt-2">Total: 847L</p>
    </div>
  </div>
);

const AnalyticsMockup = () => (
  <div className="bg-gradient-to-br from-accent-50 to-accent-100 p-6 h-full">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-display font-bold text-accent-700">Analytics</h3>
      <ApperIcon name="TrendingUp" size={20} className="text-accent-600" />
    </div>
    
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <h4 className="font-semibold text-accent-700 mb-3">Yield Prediction</h4>
      <div className="flex items-end space-x-1 h-24 mb-2">
        {[65, 70, 68, 75, 80, 78, 85].map((height, index) => (
          <div
            key={index}
            className="bg-gradient-to-t from-accent-500 to-accent-300 flex-1 rounded-t"
            style={{ height: `${height}%` }}
          ></div>
        ))}
      </div>
      <p className="text-2xl font-bold text-accent-700">+12% vs last season</p>
    </div>
    
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <ApperIcon name="Leaf" size={16} className="text-success mb-2" />
        <p className="text-sm text-gray-600">Plant Health</p>
        <p className="text-xl font-bold text-success">95%</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <ApperIcon name="Target" size={16} className="text-accent-600 mb-2" />
        <p className="text-sm text-gray-600">Efficiency</p>
        <p className="text-xl font-bold text-accent-700">87%</p>
      </div>
    </div>
  </div>
);

const WeatherMockup = () => (
  <div className="bg-gradient-to-br from-info to-secondary-100 p-6 h-full text-white">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-display font-bold">Weather</h3>
      <ApperIcon name="Cloud" size={20} />
    </div>
    
    <div className="text-center mb-6">
      <ApperIcon name="Sun" size={48} className="mx-auto mb-2" />
      <p className="text-3xl font-bold">26°C</p>
      <p className="text-secondary-100">Partly Cloudy</p>
    </div>
    
    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg mb-4">
      <h4 className="font-semibold mb-3">7-Day Forecast</h4>
      <div className="grid grid-cols-7 gap-1">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
          <div key={day} className="text-center text-xs">
            <p className="mb-1">{day}</p>
            <ApperIcon name={index % 2 === 0 ? "Sun" : "CloudRain"} size={16} className="mx-auto mb-1" />
            <p>{24 + index}°</p>
          </div>
        ))}
      </div>
    </div>
    
    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
      <h4 className="font-semibold mb-2">Alerts</h4>
      <div className="flex items-center space-x-2 text-sm">
        <ApperIcon name="AlertTriangle" size={14} className="text-warning" />
        <span>Rain expected tomorrow - adjust irrigation</span>
      </div>
    </div>
  </div>
);

const MockupScreen = ({ screen, isActive }) => {
  const screens = {
    dashboard: DashboardMockup,
    irrigation: IrrigationMockup,
    analytics: AnalyticsMockup,
    weather: WeatherMockup
  };
  
  const ScreenComponent = screens[screen];
  
  return (
    <motion.div
      className="relative w-80 h-[600px] mx-auto"
      initial={{ scale: 0.9, opacity: 0.7 }}
      animate={{ scale: isActive ? 1 : 0.9, opacity: isActive ? 1 : 0.7 }}
      transition={{ duration: 0.3 }}
    >
      {/* Phone Frame */}
      <div className="absolute inset-0 bg-gray-800 rounded-[2.5rem] p-3 shadow-2xl">
        <div className="bg-black rounded-[2rem] h-full relative overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-10"></div>
          
          {/* Screen Content */}
          <div className="pt-8 h-full overflow-hidden">
            <ScreenComponent />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

function MobileAppCarousel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'center',
    containScroll: 'trimSnaps',
    dragFree: false
  });

  const scrollTo = useCallback((index) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  const bind = useGesture({
    onDrag: ({ direction: [dx], velocity, cancel }) => {
      if (Math.abs(dx) < 0.2) return;
      if (dx > 0 && selectedIndex > 0) {
        scrollTo(selectedIndex - 1);
        cancel();
      } else if (dx < 0 && selectedIndex < mockupScreens.length - 1) {
        scrollTo(selectedIndex + 1);
        cancel();
      }
    }
  });

  return (
    <section className="py-20 bg-gradient-to-br from-background to-primary-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-display font-bold text-primary-700 mb-4">
            Experience AgroSense Pro Mobile
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Interact with our mobile app mockups to see how AgroSense Pro puts powerful 
            agricultural insights right at your fingertips
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div 
            className="overflow-hidden cursor-grab active:cursor-grabbing" 
            ref={emblaRef}
            {...bind()}
          >
            <div className="flex">
              {mockupScreens.map((mockup, index) => (
                <div key={mockup.id} className="flex-[0_0_100%] min-w-0 px-4">
                  <MockupScreen 
                    screen={mockup.screen} 
                    isActive={index === selectedIndex}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => selectedIndex > 0 && scrollTo(selectedIndex - 1)}
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-lg transition-all",
              selectedIndex > 0 
                ? "bg-white text-primary-600 hover:bg-primary-50" 
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            )}
            disabled={selectedIndex === 0}
          >
            <ApperIcon name="ChevronLeft" size={24} />
          </button>
          
          <button
            onClick={() => selectedIndex < mockupScreens.length - 1 && scrollTo(selectedIndex + 1)}
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-lg transition-all",
              selectedIndex < mockupScreens.length - 1
                ? "bg-white text-primary-600 hover:bg-primary-50"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            )}
            disabled={selectedIndex === mockupScreens.length - 1}
          >
            <ApperIcon name="ChevronRight" size={24} />
          </button>
        </div>

        {/* Content Info */}
        <motion.div 
          className="mt-12 max-w-2xl mx-auto text-center"
          key={selectedIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-2xl font-display font-bold text-primary-700 mb-3">
            {mockupScreens[selectedIndex].title}
          </h3>
          <p className="text-gray-600 text-lg mb-6">
            {mockupScreens[selectedIndex].description}
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {mockupScreens[selectedIndex].features.map((feature, index) => (
              <span 
                key={index}
                className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-3">
            {mockupScreens.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  index === selectedIndex 
                    ? "bg-primary-600 scale-125" 
                    : "bg-gray-300 hover:bg-gray-400"
                )}
              />
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Button size="lg" className="font-semibold">
            Get Started Today
            <ApperIcon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default MobileAppCarousel;