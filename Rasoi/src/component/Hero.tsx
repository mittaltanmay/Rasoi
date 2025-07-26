import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Star, Shield } from "lucide-react";
import heroImage from "@/assets/hero-marketplace.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-subtle">
      <div className="container mx-auto px-4 lg:px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Connect Street Food{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  Vendors
                </span>{" "}
                with Local{" "}
                <span className="bg-gradient-trust bg-clip-text text-transparent">
                  Suppliers
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                A simple platform that helps street food vendors find verified, affordable suppliers in their area. Build trust, save money, and grow your business.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="vendor" size="xl" className="group" onClick={() => window.location.href = "/auth"}>
                I'm a Vendor
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-smooth" />
              </Button>
              <Button variant="supplier" size="xl" className="group" onClick={() => window.location.href = "/auth"}>
                I'm a Supplier
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-smooth" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Local suppliers in your area</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Star className="w-5 h-5 text-primary" />
                <span>Verified quality ratings</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="w-5 h-5 text-primary" />
                <span>Trusted community platform</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img 
                src={heroImage} 
                alt="Street food vendors and suppliers marketplace" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-card border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">500+</span>
                </div>
                <div>
                  <p className="font-semibold">Active Vendors</p>
                  <p className="text-sm text-muted-foreground">Growing daily</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-card p-4 rounded-xl shadow-card border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-trust rounded-full flex items-center justify-center">
                  <span className="text-accent-foreground font-bold">300+</span>
                </div>
                <div>
                  <p className="font-semibold">Verified Suppliers</p>
                  <p className="text-sm text-muted-foreground">Quality assured</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;