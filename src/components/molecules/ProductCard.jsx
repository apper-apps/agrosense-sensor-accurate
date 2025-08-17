import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const ProductCard = ({ product, onLearnMore }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="p-8 h-full flex flex-col">
        <div className="relative mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center mb-4">
            <img src={product.image} alt={product.name} className="w-10 h-10" />
          </div>
          <Badge variant="primary" className="absolute -top-2 -right-2">
            Popular
          </Badge>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3">{product.name}</h3>
        <p className="text-gray-600 mb-6 flex-grow">{product.description}</p>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Features:</h4>
          <ul className="space-y-2">
            {product.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <ApperIcon name="Check" className="w-4 h-4 text-primary-500 mr-2" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
              <span className="text-sm font-normal text-gray-500">/month</span>
            </span>
          </div>
          <Button 
            onClick={() => onLearnMore(product)} 
            variant="primary" 
            size="md" 
            className="w-full"
          >
            Learn More
            <ApperIcon name="ArrowRight" className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProductCard;