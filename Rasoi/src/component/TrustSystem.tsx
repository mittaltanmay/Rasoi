import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Star, Shield, ThumbsUp, Award } from "lucide-react";

const TrustSystem = () => {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      business: "Kumar's Street Kitchen",
      rating: 5,
      review: "Found amazing local suppliers with great prices. The rating system helped me choose the best vendors!",
      badge: "Verified Vendor"
    },
    {
      name: "Priya Supplies",
      business: "Fresh Vegetable Supplier",
      rating: 5,
      review: "VendorHub connected us with so many local food vendors. Our business has grown 3x in just 6 months!",
      badge: "Gold Supplier"
    },
    {
      name: "Mumbai Food Co.",
      business: "Spice & Ingredient Supplier", 
      rating: 4.8,
      review: "The trust system really works. Vendors know they can rely on us because of our community ratings.",
      badge: "Verified Supplier"
    }
  ];

  return (
    <section id="trust" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built on{" "}
            <span className="bg-gradient-trust bg-clip-text text-transparent">
              Trust & Community
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our rating and verification system ensures you're working with reliable partners
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Community Reviews</h3>
                  <p className="text-muted-foreground">Real feedback from vendors and suppliers builds transparent trust scores for everyone.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-trust rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Verified Badges</h3>
                  <p className="text-muted-foreground">Top-rated suppliers earn verified badges, making it easy to identify trusted partners.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
                  <p className="text-muted-foreground">Continuous monitoring and feedback ensure consistent quality across our marketplace.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card shadow-card hover:shadow-elegant transition-smooth">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-hero text-primary-foreground">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{testimonial.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{testimonial.business}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-gradient-trust text-accent-foreground">
                      <Shield className="w-3 h-3 mr-1" />
                      {testimonial.badge}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(testimonial.rating) ? 'text-primary fill-primary' : 'text-muted-foreground'}`} />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">{testimonial.rating}</span>
                  </div>
                  <p className="text-muted-foreground">{testimonial.review}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-gradient-subtle rounded-2xl p-8 text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">4.8/5</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-secondary">95%</div>
              <div className="text-muted-foreground">Verified Suppliers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent">1,500+</div>
              <div className="text-muted-foreground">Trust Reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSystem;