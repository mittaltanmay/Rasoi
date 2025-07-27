import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useToast } from "@/hooks/use-toast";
import supabase from "../integeration/supabase/supabase";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [shopName, setShopName] = useState("");
  const [deliveryAvailable, setDeliveryAvailable] = useState(false);

  useEffect(() => {
    fetchUserData();
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

      // Pre-fill form if user exists
      if (data) {
        setName(data.name || "");
        setPhone(data.phone_number || "");
        setRole(data.role || "");
        setCity(data.city || "");
        setPincode(data.pincode || "");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !role || !city || !pincode) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // Update user profile
      const { error: userError } = await supabase
        .from("users")
        .upsert({
          id: user.id,
          name,
          phone_number: phone,
          role,
          city,
          pincode,
        });

      if (userError) throw userError;

      // If supplier, create supplier profile
      if (role === "supplier" && shopName) {
        const { error: supplierError } = await supabase
          .from("supplier_profiles")
          .upsert({
            user_id: user.id,
            shop_name: shopName,
            delivery_available: deliveryAvailable,
          });

        if (supplierError) throw supplierError;
      }

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
      });

      // Refresh user data
      fetchUserData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Complete Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <Select value={role} onValueChange={setRole} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vendor">Vendor</SelectItem>
                  <SelectItem value="supplier">Supplier</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pincode">Pincode *</Label>
              <Input
                id="pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter your pincode"
                required
              />
            </div>

            {role === "supplier" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="shopName">Shop Name</Label>
                  <Input
                    id="shopName"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    placeholder="Enter your shop name"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="delivery"
                    checked={deliveryAvailable}
                    onChange={(e) => setDeliveryAvailable(e.target.checked)}
                  />
                  <Label htmlFor="delivery">Delivery Available</Label>
                </div>
              </>
            )}

            <div className="flex gap-2">
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? "Saving..." : "Save Profile"}
              </Button>
              <Button type="button" variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;