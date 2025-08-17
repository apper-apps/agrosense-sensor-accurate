import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ message, action, onAction }) => {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="Sprout" className="w-8 h-8 text-primary-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Ready to grow smarter?
        </h3>
        <p className="text-gray-600 mb-6">{message}</p>
        {action && onAction && (
          <Button onClick={onAction} variant="primary">
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            {action}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Empty;