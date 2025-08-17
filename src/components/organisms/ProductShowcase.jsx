import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/molecules/ProductCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import productService from "@/services/api/productService";

const ProductShowcase = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await productService.getAll();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products. Please try again.");
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
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={retryLoading} />;
  if (!products.length) return <Empty message="No products available" />;

  return (
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
            Complete Smart Farming
            <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Solution Suite
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From weather monitoring to soil analysis, our integrated platform provides 
            everything you need to optimize your farming operations and maximize yields.
          </p>
        </motion.div>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.Id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard 
                product={{
                  ...product,
                  name: product.Name,
                  description: product.description_c,
                  features: product.features_c ? product.features_c.split(',') : [],
                  price: product.price_c,
                  image: product.image_c
                }} 
                onLearnMore={handleLearnMore} 
              />
            >
              <ProductCard product={product} onLearnMore={handleLearnMore} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-8">
            Ready to transform your farming operation?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-primary-500 to-primary-700 text-white px-8 py-4 rounded-lg font-medium hover:brightness-110 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
              Compare All Solutions
            </button>
            <button className="border-2 border-primary-500 text-primary-500 px-8 py-4 rounded-lg font-medium hover:bg-gradient-to-r hover:from-primary-500 hover:to-primary-700 hover:text-white transition-all duration-200">
              Schedule Consultation
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;