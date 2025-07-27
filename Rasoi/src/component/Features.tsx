import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { UserPlus, MapPin, DollarSign, Star, ShoppingCart, Smartphone } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: UserPlus,
      title: "Easy Onboarding",
      description: "Simple registration for vendors and suppliers with location and contact details.",
      color: "text-primary"
    },
    {
      icon: MapPin,
      title: "Location-Based Discovery",
      description: "Find suppliers in your area using GPS or pin code with smart filtering.",
      color: "text-secondary"
    },
    {
      icon: DollarSign,
      title: "Transparent Pricing",
      description: "Clear pricing and availability listings for all raw materials and supplies.",
      color: "text-accent"
    },
    {
      icon: Star,
      title: "Trust System",
      description: "Community-driven reviews and ratings with verified supplier badges.",
      color: "text-primary"
    },
    {
      icon: ShoppingCart,
      title: "Simple Ordering",
      description: "Lightweight cart system with order tracking and status updates.",
      color: "text-secondary"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Optimized for mobile devices with an intuitive, easy-to-use interface.",
      color: "text-accent"
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Connect & Grow
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform provides all the essential tools to help street food vendors find reliable suppliers and build lasting business relationships.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card hover:shadow-card transition-smooth border-0 shadow-sm">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-subtle flex items-center justify-center mb-4 ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;