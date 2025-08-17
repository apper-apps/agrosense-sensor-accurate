import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const NavigationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/solutions", label: "Solutions" },
    { path: "/roi-calculator", label: "ROI Calculator" },
    { path: "/resources", label: "Resources" },
    { path: "/contact", label: "Contact" }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "text-primary-600 border-b-2 border-primary-600"
                  : "text-gray-600 hover:text-primary-600"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
        <Button variant="primary" size="sm">
          Request Demo
        </Button>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ApperIcon
          name={isOpen ? "X" : "Menu"}
          className="w-6 h-6 text-gray-600"
        />
      </button>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 md:hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                  <button onClick={() => setIsOpen(false)}>
                    <ApperIcon name="X" className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `block px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200 ${
                          isActive
                            ? "bg-primary-50 text-primary-700 border-l-4 border-primary-700"
                            : "text-gray-600 hover:bg-gray-50"
                        }`
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                  <div className="pt-4">
                    <Button variant="primary" size="md" className="w-full">
                      Request Demo
                    </Button>
                  </div>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavigationMenu;