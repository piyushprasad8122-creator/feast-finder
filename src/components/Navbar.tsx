import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, MapPin, Search, Menu, X, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-sm">Z</span>
          </div>
          <span className="font-display font-bold text-xl text-foreground hidden sm:block">Zomato</span>
        </Link>

        {/* Location */}
        <button className="hidden md:flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="font-medium text-foreground">Hyderabad</span>
          <span className="text-muted-foreground">·</span>
          <span className="truncate max-w-[120px]">Banjara Hills</span>
        </button>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for restaurant, cuisine or a dish"
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted border-0 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              onClick={() => navigate("/search")}
              readOnly
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {isAuthenticated && user?.role === "customer" && (
            <Link to="/cart" className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full gradient-primary text-[10px] text-primary-foreground flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </Link>
          )}

          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-2">
              <Link to={user?.role === "admin" ? "/admin" : user?.role === "delivery" ? "/delivery" : "/profile"}>
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user?.name?.split(" ")[0]}</span>
                </Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={logout} className="text-muted-foreground">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login"><Button variant="ghost" size="sm">Log in</Button></Link>
              <Link to="/signup"><Button size="sm" className="gradient-primary text-primary-foreground shadow-primary-glow">Sign up</Button></Link>
            </div>
          )}

          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card p-4 animate-fade-in space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Search..." className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted text-sm" onClick={() => { navigate("/search"); setMobileOpen(false); }} readOnly />
          </div>
          {isAuthenticated ? (
            <>
              <Link to={user?.role === "admin" ? "/admin" : user?.role === "delivery" ? "/delivery" : "/profile"} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted" onClick={() => setMobileOpen(false)}>
                <User className="w-4 h-4" /><span>{user?.name}</span>
              </Link>
              {user?.role === "customer" && (
                <Link to="/orders" className="block p-2 rounded-lg hover:bg-muted" onClick={() => setMobileOpen(false)}>My Orders</Link>
              )}
              <button onClick={() => { logout(); setMobileOpen(false); }} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted text-destructive w-full">
                <LogOut className="w-4 h-4" /><span>Logout</span>
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}><Button variant="outline" className="w-full">Log in</Button></Link>
              <Link to="/signup" className="flex-1" onClick={() => setMobileOpen(false)}><Button className="w-full gradient-primary text-primary-foreground">Sign up</Button></Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
