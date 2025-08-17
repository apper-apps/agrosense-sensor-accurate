import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary-100 border-t-primary-500 rounded-full mx-auto mb-4"
        />
        <p className="text-gray-600">Loading smart farming solutions...</p>
      </div>
    </div>
  );
};

export default Loading;