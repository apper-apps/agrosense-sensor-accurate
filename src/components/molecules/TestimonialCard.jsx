import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-8 h-full">
        <div className="flex items-center mb-6">
          <img
            src={testimonial.image}
            alt={testimonial.farmerName}
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div>
            <h4 className="text-lg font-semibold text-gray-900">{testimonial.farmerName}</h4>
            <p className="text-gray-600">{testimonial.farmLocation}</p>
            <p className="text-sm text-primary-600 font-medium">{testimonial.cropType}</p>
          </div>
        </div>

        <div className="flex text-accent-500 mb-4">
          {[...Array(5)].map((_, i) => (
            <ApperIcon key={i} name="Star" className="w-5 h-5 fill-current" />
          ))}
        </div>

        <blockquote className="text-gray-700 italic mb-4">
          "{testimonial.results}"
        </blockquote>

        <div className="border-t pt-4">
          <div className="flex items-center text-sm text-gray-600">
            <ApperIcon name="TrendingUp" className="w-4 h-4 text-success mr-2" />
            <span className="font-semibold text-success">25% yield increase</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TestimonialCard;