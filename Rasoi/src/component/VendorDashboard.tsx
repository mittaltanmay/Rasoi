import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Search, MapPin, Phone, Star, ShoppingCart } from "lucide-react";
import supabase  from "../integeration/supabase/supabase"
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  price_per_unit: number;
  unit: string;
  quantity_available: number;
  image_url?: string;
  supplier: {
    name: string;
    city: string;
    pincode: string;
    phone_number: string;
    supplier_profiles: {
      shop_name: string;
      delivery_available: boolean;
    }[];
  };
}

interface Supplier {
  id: string;
  name: string;
  city: string;
  pincode: string;
  phone_number: string;
  supplier_profiles: {
    shop_name: string;
    delivery_available: boolean;
  }[];
  avg_rating?: number;
}

const VendorDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("products");
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchUserData();
    fetchProducts();
    fetchSuppliers();
  }, []);

  const fetchUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();
      setUser(data);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          supplier:users!products_supplier_id_fkey (
            name,
            city,
            pincode,
            phone_number,
            supplier_profiles (
              shop_name,
              delivery_available
            )
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading products",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select(`
          *,
          supplier_profiles (
            shop_name,
            delivery_available
          )
        `)
        .eq("role", "supplier");

      if (error) throw error;
      setSuppliers(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading suppliers",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleContactSupplier = (phoneNumber: string) => {
    const message = `Hi! I found your shop on RasoiLink and I'm interested in your products. Can we discuss?`;
    const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.supplier?.supplier_profiles?.[0]?.shop_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.supplier_profiles?.[0]?.shop_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">RasoiLink</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Welcome, {user?.name}</span>
              <Button 
                variant="ghost" 
                onClick={() => supabase.auth.signOut()}
                size="sm"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex gap-4 mb-4">
            <Button
              variant={activeTab === "products" ? "default" : "outline"}
              onClick={() => setActiveTab("products")}
            >
              Browse Products
            </Button>
            <Button
              variant={activeTab === "suppliers" ? "default" : "outline"}
              onClick={() => setActiveTab("suppliers")}
            >
              Find Suppliers
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={activeTab === "products" ? "Search products..." : "Search suppliers..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {activeTab === "products" && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <Badge variant="secondary">
                      ₹{product.price_per_unit}/{product.unit}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {product.supplier?.supplier_profiles?.[0]?.shop_name || product.supplier?.name}
                    </div>
                    <div>{product.supplier?.city}, {product.supplier?.pincode}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <span className="font-medium">Available:</span> {product.quantity_available} {product.unit}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleContactSupplier(product.supplier.phone_number)}
                        className="flex-1"
                      >
                        <Phone className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Order
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "suppliers" && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSuppliers.map((supplier) => (
              <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {supplier.supplier_profiles?.[0]?.shop_name || supplier.name}
                  </CardTitle>
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {supplier.city}, {supplier.pincode}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant={supplier.supplier_profiles?.[0]?.delivery_available ? "default" : "secondary"}>
                        {supplier.supplier_profiles?.[0]?.delivery_available ? "Delivery Available" : "Pickup Only"}
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleContactSupplier(supplier.phone_number)}
                      className="w-full"
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Contact Supplier
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {((activeTab === "products" && filteredProducts.length === 0) ||
          (activeTab === "suppliers" && filteredSuppliers.length === 0)) && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchTerm ? "No results found. Try a different search term." : "No items available yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;