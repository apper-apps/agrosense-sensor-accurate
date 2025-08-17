import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";

const ROICalculator = () => {
  const [formData, setFormData] = useState({
    farmSize: "",
    currentYield: "",
    waterCost: "",
    laborCost: "",
    cropType: "corn",
    region: "midwest"
  });

  const [results, setResults] = useState({
    yieldIncrease: 0,
    waterSavings: 0,
    laborSavings: 0,
    totalSavings: 0,
    roiPercentage: 0,
    paybackMonths: 0
  });

  const [isCalculating, setIsCalculating] = useState(false);

  const cropTypes = [
    { value: "corn", label: "Corn", multiplier: 1.0 },
    { value: "soybeans", label: "Soybeans", multiplier: 0.8 },
    { value: "wheat", label: "Wheat", multiplier: 0.9 },
    { value: "cotton", label: "Cotton", multiplier: 1.2 },
    { value: "vegetables", label: "Vegetables", multiplier: 1.5 }
  ];

  const regions = [
    { value: "midwest", label: "Midwest", factor: 1.0 },
    { value: "southwest", label: "Southwest", factor: 1.2 },
    { value: "southeast", label: "Southeast", factor: 0.9 },
    { value: "northwest", label: "Northwest", factor: 0.8 },
    { value: "northeast", label: "Northeast", factor: 0.85 }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateROI = () => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const farmSize = parseFloat(formData.farmSize) || 0;
      const currentYield = parseFloat(formData.currentYield) || 0;
      const waterCost = parseFloat(formData.waterCost) || 0;
      const laborCost = parseFloat(formData.laborCost) || 0;

      const cropMultiplier = cropTypes.find(c => c.value === formData.cropType)?.multiplier || 1.0;
      const regionFactor = regions.find(r => r.value === formData.region)?.factor || 1.0;

      // Calculate improvements
      const yieldImprovement = Math.round(currentYield * farmSize * 0.25 * cropMultiplier * regionFactor);
      const waterSavingsAmount = Math.round(waterCost * 0.3 * regionFactor);
      const laborSavingsAmount = Math.round(laborCost * 0.15);
      const totalAnnualSavings = yieldImprovement + waterSavingsAmount + laborSavingsAmount;

      // ROI calculation (assuming $15,000 initial investment)
      const initialInvestment = 15000;
      const roiPercent = Math.round((totalAnnualSavings / initialInvestment) * 100);
      const paybackTime = Math.round((initialInvestment / totalAnnualSavings) * 12);

      setResults({
        yieldIncrease: yieldImprovement,
        waterSavings: waterSavingsAmount,
        laborSavings: laborSavingsAmount,
        totalSavings: totalAnnualSavings,
        roiPercentage: roiPercent,
        paybackMonths: paybackTime
      });

      setIsCalculating(false);
    }, 1000);
  };

  useEffect(() => {
    if (formData.farmSize && formData.currentYield && formData.waterCost && formData.laborCost) {
      calculateROI();
    }
  }, [formData]);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ROI Calculator
            <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Calculate Your Savings
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how much you could save with AgroSense Pro smart farming solutions. 
            Enter your farm details below to get a personalized ROI analysis.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Farm Information
              </h2>
              
              <div className="space-y-6">
                <FormField
                  label="Farm Size (acres)"
                  id="farmSize"
                  type="number"
                  placeholder="e.g., 500"
                  value={formData.farmSize}
                  onChange={(e) => handleInputChange("farmSize", e.target.value)}
                />

                <FormField
                  label="Current Yield per Acre ($)"
                  id="currentYield"
                  type="number"
                  placeholder="e.g., 800"
                  value={formData.currentYield}
                  onChange={(e) => handleInputChange("currentYield", e.target.value)}
                />

                <FormField
                  label="Annual Water Costs ($)"
                  id="waterCost"
                  type="number"
                  placeholder="e.g., 10000"
                  value={formData.waterCost}
                  onChange={(e) => handleInputChange("waterCost", e.target.value)}
                />

                <FormField
                  label="Annual Labor Costs ($)"
                  id="laborCost"
                  type="number"
                  placeholder="e.g., 25000"
                  value={formData.laborCost}
                  onChange={(e) => handleInputChange("laborCost", e.target.value)}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Crop Type
                  </label>
                  <select
                    value={formData.cropType}
                    onChange={(e) => handleInputChange("cropType", e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all duration-200"
                  >
                    {cropTypes.map((crop) => (
                      <option key={crop.value} value={crop.value}>
                        {crop.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Farm Region
                  </label>
                  <select
                    value={formData.region}
                    onChange={(e) => handleInputChange("region", e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all duration-200"
                  >
                    {regions.map((region) => (
                      <option key={region.value} value={region.value}>
                        {region.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Your Projected Savings
              </h2>

              {isCalculating ? (
                <div className="flex items-center justify-center py-12">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-4 border-primary-100 border-t-primary-500 rounded-full"
                  />
                  <span className="ml-3 text-gray-600">Calculating...</span>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-success/10 to-success/20 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-success mb-1">
                        {results.roiPercentage}%
                      </div>
                      <div className="text-sm text-gray-600">Annual ROI</div>
                    </div>
                    <div className="bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-primary-600 mb-1">
                        {results.paybackMonths}
                      </div>
                      <div className="text-sm text-gray-600">Months Payback</div>
                    </div>
                  </div>

                  {/* Detailed Savings */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <ApperIcon name="TrendingUp" className="w-5 h-5 text-success mr-3" />
                        <span className="font-medium">Yield Increase</span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">
                        ${results.yieldIncrease.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <ApperIcon name="Droplets" className="w-5 h-5 text-info mr-3" />
                        <span className="font-medium">Water Savings</span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">
                        ${results.waterSavings.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <ApperIcon name="Users" className="w-5 h-5 text-secondary-500 mr-3" />
                        <span className="font-medium">Labor Savings</span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">
                        ${results.laborSavings.toLocaleString()}
                      </span>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg">
                        <div className="flex items-center">
                          <ApperIcon name="DollarSign" className="w-5 h-5 text-accent-500 mr-3" />
                          <span className="font-bold text-lg">Total Annual Savings</span>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                          ${results.totalSavings.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <Button variant="primary" size="lg" className="w-full mb-4">
                      Get Detailed Analysis
                      <ApperIcon name="ArrowRight" className="w-5 h-5 ml-2" />
                    </Button>
                    <p className="text-sm text-gray-600 text-center">
                      Results are estimates based on industry averages and may vary.
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="p-8 bg-gradient-to-br from-primary-50 to-secondary-50">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Start Saving?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                These calculations are based on real customer data and industry research. 
                Schedule a consultation to get a more detailed analysis specific to your farm.
              </p>
              <Button variant="accent" size="lg">
                Schedule Free Consultation
                <ApperIcon name="Calendar" className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ROICalculator;