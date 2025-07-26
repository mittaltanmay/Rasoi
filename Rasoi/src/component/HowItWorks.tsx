import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCheck, Search, MessageSquare, Truck } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      icon: UserCheck,
      title: "Register Your Business",
      description: "Quick and easy registration for vendors and suppliers with location verification.",
      userType: "Both vendors and suppliers"
    },
    {
      step: "02", 
      icon: Search,
      title: "Discover & Connect",
      description: "Vendors search for local suppliers by location, product type, and price range.",
      userType: "Vendors find suppliers"
    },
    {
      step: "03",
      icon: MessageSquare,
      title: "Build Trust",
      description: "Leave reviews, check ratings, and communicate directly with verified partners.",
      userType: "Community feedback"
    },
    {
      step: "04",
      icon: Truck,
      title: "Order & Track",
      description: "Place orders through our simple cart system and track status updates.",
      userType: "Seamless ordering"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              VendorHub
            </span>{" "}
            Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple steps to connect with local suppliers and grow your street food business
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <Card key={index} className="relative bg-gradient-subtle border-0 shadow-card hover:shadow-elegant transition-smooth">
              <CardContent className="p-6 text-center">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                
                <div className="mt-6 mb-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-trust rounded-full flex items-center justify-center mb-4">
                    <step.icon className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground mb-3">{step.description}</p>
                  <div className="text-sm text-primary font-medium">{step.userType}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="hero" size="xl" className="group">
            Start Your Journey Today
            <UserCheck className="w-5 h-5 group-hover:scale-110 transition-bounce" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;