import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, MapPin, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1 max-w-2xl">
        <h1 className="font-display text-2xl font-bold mb-6">Profile</h1>
        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-xl">{user?.name?.[0]}</span>
            </div>
            <div>
              <h2 className="font-display font-bold text-lg">{user?.name}</h2>
              <p className="text-sm text-muted-foreground capitalize">{user?.role}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm"><Mail className="w-4 h-4 text-muted-foreground" /><span>{user?.email}</span></div>
            <div className="flex items-center gap-3 text-sm"><Phone className="w-4 h-4 text-muted-foreground" /><span>{user?.phone || "Not set"}</span></div>
            <div className="flex items-center gap-3 text-sm"><MapPin className="w-4 h-4 text-muted-foreground" /><span>Banjara Hills, Hyderabad</span></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={() => navigate("/orders")}>My Orders</Button>
            <Button variant="outline" onClick={() => navigate("/")}>Favorites</Button>
          </div>
          <Button variant="ghost" className="w-full text-destructive" onClick={() => { logout(); navigate("/"); }}>
            <LogOut className="w-4 h-4 mr-2" /> Log out
          </Button>
        </div>
      </div>
    </div>
  );
}
