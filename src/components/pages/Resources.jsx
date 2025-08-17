import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import resourceService from "@/services/api/resourceService";
import ApperIcon from "@/components/ApperIcon";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Resources" },
    { id: "guides", label: "Getting Started" },
    { id: "case-studies", label: "Case Studies" },
    { id: "webinars", label: "Webinars" },
    { id: "whitepapers", label: "Whitepapers" }
  ];

  useEffect(() => {
    const loadResources = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await resourceService.getAll();
        setResources(data);
      } catch (err) {
        setError("Failed to load resources. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, []);

  const filteredResources = selectedCategory === "all" 
    ? resources 
    : resources.filter(resource => resource.category === selectedCategory);

  const retryLoading = () => {
    const loadResources = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await resourceService.getAll();
        setResources(data);
      } catch (err) {
        setError("Failed to load resources. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadResources();
  };

  const handleResourceClick = (resource) => {
    console.log("View resource:", resource.title);
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
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Resources &
              <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Learning Center
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access guides, case studies, webinars, and expert insights to help you 
              maximize the potential of your smart farming technology.
            </p>
          </motion.div>

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
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && <Loading />}
          {error && <Error message={error} onRetry={retryLoading} />}
          {!loading && !error && filteredResources.length === 0 && (
            <Empty message="No resources found for this category" />
          )}
          
          {!loading && !error && filteredResources.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource, index) => (
                <motion.div
                  key={resource.Id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full overflow-hidden group cursor-pointer">
                    <div className="relative">
                      <img 
                        src={resource.image} 
                        alt={resource.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="primary">{resource.type}</Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                          <ApperIcon name="Clock" className="w-4 h-4 text-gray-600" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span>{resource.readTime}</span>
                        <span className="mx-2">•</span>
                        <span>{resource.date}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                        {resource.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {resource.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <img 
                            src={resource.authorImage} 
                            alt={resource.author}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                          <span>{resource.author}</span>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleResourceClick(resource)}
                          className="group-hover:text-primary-600"
                        >
                          Read More
                          <ApperIcon name="ArrowRight" className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="p-12 bg-white/80 backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <ApperIcon name="Bell" className="w-8 h-8 text-primary-600" />
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Stay Informed
              </h3>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Get the latest smart farming insights, tips, and resources 
                delivered directly to your inbox every week.
              </p>
              
              <div className="max-w-md mx-auto flex gap-4 mb-6">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all duration-200"
                />
                <Button variant="primary" size="md">
                  Subscribe
                </Button>
              </div>
              
              <p className="text-sm text-gray-500">
                Join 15,000+ farmers already subscribed. Unsubscribe anytime.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Resources;