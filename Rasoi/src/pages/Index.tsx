// import Header from "/components/Header";
import Header from "../component/Header";
import Hero from "../component/Hero";
import Features from "../component/Features";
import HowItWorks from "../component/HowItWorks";
import TrustSystem from "../component/TrustSystem";
import Footer from "../component/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <TrustSystem />
      <Footer />
    </div>
  );
};

export default Index;