import Hero from "@/components/organisms/Hero";
import ProductShowcase from "@/components/organisms/ProductShowcase";
import MobileAppCarousel from "@/components/organisms/MobileAppCarousel";
import TestimonialsSection from "@/components/organisms/TestimonialsSection";
const Home = () => {
  return (
    <>
<Hero />
      <ProductShowcase />
      <MobileAppCarousel />
      <TestimonialsSection />
    </>
  );
};

export default Home;