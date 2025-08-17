import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TestimonialCard from "@/components/molecules/TestimonialCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import testimonialService from "@/services/api/testimonialService";

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await testimonialService.getAll();
        setTestimonials(data);
      } catch (err) {
        setError("Failed to load testimonials. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  const retryLoading = () => {
    const loadTestimonials = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await testimonialService.getAll();
        setTestimonials(data);
      } catch (err) {
        setError("Failed to load testimonials. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadTestimonials();
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={retryLoading} />;
  if (!testimonials.length) return <Empty message="No testimonials available" />;

  return (
    <section className="py-24 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Farmers
            <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Worldwide
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how AgroSense Pro is helping farmers increase yields, reduce costs, 
            and build more sustainable operations across different crops and regions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.Id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <TestimonialCard testimonial={testimonial} />
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
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join the AgroSense Community
            </h3>
            <p className="text-gray-600 mb-6">
              Connect with thousands of progressive farmers who are already using data-driven 
              insights to optimize their operations and increase profitability.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">10,000+</div>
                <div className="text-gray-600">Active Farmers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-600 mb-2">2M+</div>
                <div className="text-gray-600">Acres Monitored</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-600 mb-2">$50M+</div>
                <div className="text-gray-600">Savings Generated</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;