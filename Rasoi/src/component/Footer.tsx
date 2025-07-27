import { Button } from "./ui/button";
import { Users, Mail, Phone, MapPin } from "lucide-react";

export default function Footer(){
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                VendorHub
              </h3>
            </div>
            <p className="text-muted-foreground">
              Connecting street food vendors with verified local suppliers. Building trust, one connection at a time.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">For Vendors</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-smooth">Find Suppliers</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Place Orders</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Leave Reviews</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Track Orders</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">For Suppliers</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-smooth">List Products</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Manage Inventory</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Get Verified</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">View Analytics</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Contact Us</h4>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>hello@vendorhub.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2024 VendorHub. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-smooth">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-smooth">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-smooth">Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

