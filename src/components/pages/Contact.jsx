import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import contactService from "@/services/api/contactService";
import ApperIcon from "@/components/ApperIcon";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    farmSize: "",
    region: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const regions = [
    { value: "", label: "Select your region" },
    { value: "midwest", label: "Midwest" },
    { value: "southwest", label: "Southwest" },
    { value: "southeast", label: "Southeast" },
    { value: "northwest", label: "Northwest" },
    { value: "northeast", label: "Northeast" }
  ];

  const contactMethods = [
    {
      icon: "Phone",
      title: "Call Us",
      description: "Speak with our farming experts",
      contact: "1-800-AGRO-PRO",
      subtext: "Mon-Fri 8AM-8PM EST"
    },
    {
      icon: "Mail",
      title: "Email Support",
      description: "Get detailed technical help",
      contact: "support@agrosensepro.com",
      subtext: "Response within 4 hours"
    },
    {
      icon: "MessageCircle",
      title: "Live Chat",
      description: "Quick questions and demos",
      contact: "Chat now",
      subtext: "Available 24/7"
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.farmSize.trim()) newErrors.farmSize = "Farm size is required";
    if (!formData.region) newErrors.region = "Region is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    setIsSubmitting(true);

    try {
      await contactService.submitLead(formData);
      toast.success("Thank you! We'll contact you within 24 hours.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        farmSize: "",
        region: "",
        message: ""
      });
    } catch (error) {
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
              Get Started
              <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Today
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to transform your farming operation? Our team of agricultural 
              technology experts is here to help you implement the perfect solution for your needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-8 text-center h-full hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name={method.icon} className="w-8 h-8 text-primary-600" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {method.description}
                  </p>
                  
                  <p className="text-lg font-semibold text-primary-600 mb-2">
                    {method.contact}
                  </p>
                  
                  <p className="text-sm text-gray-500">
                    {method.subtext}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Request a Demo
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and our team will contact you to schedule 
                  a personalized demo of our smart farming solutions.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    label="Full Name *"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    error={errors.name}
                    placeholder="John Smith"
                  />

                  <FormField
                    label="Email Address *"
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    error={errors.email}
                    placeholder="john@example.com"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    label="Phone Number *"
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    error={errors.phone}
                    placeholder="(555) 123-4567"
                  />

                  <FormField
                    label="Farm Size (acres) *"
                    id="farmSize"
                    type="number"
                    value={formData.farmSize}
                    onChange={(e) => handleInputChange("farmSize", e.target.value)}
                    error={errors.farmSize}
                    placeholder="500"
                  />
                </div>

                <div>
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">
                    Farm Region *
                  </label>
                  <select
                    id="region"
                    value={formData.region}
                    onChange={(e) => handleInputChange("region", e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all duration-200"
                  >
                    {regions.map((region) => (
                      <option key={region.value} value={region.value}>
                        {region.label}
                      </option>
                    ))}
                  </select>
                  {errors.region && (
                    <p className="mt-1 text-sm text-error">{errors.region}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Tell us about your farming operation *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all duration-200"
                    placeholder="What crops do you grow? What challenges are you facing? What goals do you have for your operation?"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-error">{errors.message}</p>
                  )}
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Request Demo
                        <ApperIcon name="ArrowRight" className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>

                  <p className="text-center text-sm text-gray-500 mt-4">
                    By submitting this form, you agree to receive communications from AgroSense Pro. 
                    We respect your privacy and will never share your information.
                  </p>
                </div>
              </form>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Location Section */}
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
              We're Here to Help
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our team of agricultural technology experts is spread across the country, 
              ready to provide local support and expertise for your farming operation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                region: "Midwest Region",
                city: "Des Moines, IA",
                phone: "(515) 555-0123",
                email: "midwest@agrosensepro.com",
                coverage: "IA, IL, IN, OH, MI"
              },
              {
                region: "Southwest Region", 
                city: "Austin, TX",
                phone: "(512) 555-0124",
                email: "southwest@agrosensepro.com",
                coverage: "TX, OK, NM, AZ"
              },
              {
                region: "California Region",
                city: "Fresno, CA", 
                phone: "(559) 555-0125",
                email: "california@agrosensepro.com",
                coverage: "CA, NV"
              }
            ].map((office, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {office.region}
                  </h3>
                  
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-center">
                      <ApperIcon name="MapPin" className="w-4 h-4 mr-2 text-primary-500" />
                      <span>{office.city}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <ApperIcon name="Phone" className="w-4 h-4 mr-2 text-primary-500" />
                      <span>{office.phone}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <ApperIcon name="Mail" className="w-4 h-4 mr-2 text-primary-500" />
                      <span className="text-sm">{office.email}</span>
                    </div>
                    
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-500">
                        <strong>Coverage:</strong> {office.coverage}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;