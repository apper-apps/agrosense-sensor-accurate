import { useContext } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import NavigationMenu from '@/components/molecules/NavigationMenu';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { AuthContext } from '../../App';

const Header = () => {
  const { logout } = useContext(AuthContext);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center mr-3">
              <ApperIcon name="Sprout" className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">AgroSense Pro</h1>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <NavigationMenu />
            {isAuthenticated && (
              <div className="flex items-center space-x-3 ml-4">
                <span className="text-sm text-gray-600 hidden md:inline">
                  Welcome, {user?.firstName || 'User'}
                </span>
                <Button variant="ghost" size="sm" onClick={logout}>
                  <ApperIcon name="LogOut" className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;