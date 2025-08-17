import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/molecules/ProductCard";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import productService from "@/services/api/productService";
import ApperIcon from "@/components/ApperIcon";

const Solutions = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Solutions", count: 6 },
    { id: "monitoring", label: "Monitoring", count: 2 },
    { id: "analysis", label: "Analysis", count: 2 },
    { id: "automation", label: "Automation", count: 2 }
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await productService.getAll();
        setProducts(data);
      } catch (err) {
        setError("Failed to load solutions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleLearnMore = (product) => {
    console.log("Learn more about:", product.name);
  };

  const retryLoading = () => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await productService.getAll();
        setProducts(data);
      } catch (err) {
        setError("Failed to load solutions. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Smart Farming
              <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Solutions
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover our comprehensive suite of agricultural technology solutions 
              designed to help you increase yields, reduce costs, and build a more 
              sustainable farming operation.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-primary-500 to-primary-700 text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-primary-50 border border-gray-200"
                  }`}
                >
                  {category.label}
                  <Badge variant="default" className="ml-2">
                    {category.count}
                  </Badge>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && <Loading />}
          {error && <Error message={error} onRetry={retryLoading} />}
          {!loading && !error && products.length === 0 && (
            <Empty message="No solutions available" />
          )}
          
          {!loading && !error && products.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.Id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ProductCard product={product} onLearnMore={handleLearnMore} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Compare All Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our solutions work together to create a comprehensive 
              smart farming ecosystem for your operation.
            </p>
          </motion.div>

          <Card className="p-8 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Feature</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Weather Station</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Soil Monitor</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Irrigation Pro</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Real-time Monitoring", weather: true, soil: true, irrigation: true },
                  { feature: "Mobile App Access", weather: true, soil: true, irrigation: true },
                  { feature: "Weather Forecasting", weather: true, soil: false, irrigation: false },
                  { feature: "Soil Analysis", weather: false, soil: true, irrigation: false },
                  { feature: "Automated Control", weather: false, soil: false, irrigation: true },
                  { feature: "Historical Data", weather: true, soil: true, irrigation: true },
                  { feature: "Custom Alerts", weather: true, soil: true, irrigation: true },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium text-gray-900">{row.feature}</td>
                    <td className="py-4 px-6 text-center">
                      {row.weather ? (
                        <ApperIcon name="Check" className="w-5 h-5 text-success mx-auto" />
                      ) : (
                        <ApperIcon name="X" className="w-5 h-5 text-gray-300 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {row.soil ? (
                        <ApperIcon name="Check" className="w-5 h-5 text-success mx-auto" />
                      ) : (
                        <ApperIcon name="X" className="w-5 h-5 text-gray-300 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {row.irrigation ? (
                        <ApperIcon name="Check" className="w-5 h-5 text-success mx-auto" />
                      ) : (
                        <ApperIcon name="X" className="w-5 h-5 text-gray-300 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button variant="primary" size="lg">
              Get Complete Package Deal
              <ApperIcon name="ArrowRight" className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;