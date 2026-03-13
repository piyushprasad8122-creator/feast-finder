import { useParams } from "react-router-dom";
import { useState } from "react";
import { Star, Clock, MapPin, Plus, Minus, ShoppingCart } from "lucide-react";
import { restaurants, menuItems } from "@/data/mock";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import VegBadge from "@/components/VegBadge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function RestaurantPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, items, updateQuantity } = useCart();
  const { isAuthenticated } = useAuth();
  const restaurant = restaurants.find(r => r.id === id);
  const menu = menuItems.filter(m => m.restaurantId === id);
  const categories = [...new Set(menu.map(m => m.category))];
  const [activeCategory, setActiveCategory] = useState(categories[0] || "");

  if (!restaurant) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Restaurant not found</div>;

  const getItemQty = (itemId: string) => items.find(i => i.id === itemId)?.quantity || 0;

  const handleAdd = (item: typeof menu[0]) => {
    if (!isAuthenticated) { navigate("/login"); return; }
    addItem({ id: item.id, name: item.name, price: item.price, image: item.image, isVeg: item.isVeg, restaurantId: restaurant.id, restaurantName: restaurant.name });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      {/* Hero image */}
      <div className="relative h-56 md:h-72 overflow-hidden">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute bottom-6 left-0 right-0 container mx-auto px-4">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">{restaurant.name}</h1>
          <p className="text-primary-foreground/80 text-sm mt-1">{restaurant.cuisine.join(", ")}</p>
          <div className="flex items-center gap-4 mt-2">
            <span className="flex items-center gap-1 bg-success text-success-foreground px-2 py-0.5 rounded text-sm font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />{restaurant.rating}
            </span>
            <span className="flex items-center gap-1 text-primary-foreground/80 text-sm"><Clock className="w-3.5 h-3.5" />{restaurant.deliveryTime}</span>
            <span className="flex items-center gap-1 text-primary-foreground/80 text-sm"><MapPin className="w-3.5 h-3.5" />{restaurant.address}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 flex-1">
        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 border-b border-border mb-6">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Menu items */}
        <div className="space-y-4">
          {menu.filter(m => m.category === activeCategory).map((item, i) => {
            const qty = getItemQty(item.id);
            return (
              <motion.div key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="flex gap-4 p-4 bg-card rounded-xl border border-border hover:shadow-card transition-shadow">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <VegBadge isVeg={item.isVeg} />
                    {item.isBestseller && <span className="text-[10px] font-bold text-accent border border-accent px-1.5 py-0.5 rounded">★ Bestseller</span>}
                  </div>
                  <h3 className="font-display font-semibold">{item.name}</h3>
                  <p className="font-semibold mt-1">₹{item.price}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-accent fill-accent" />
                    <span className="text-xs text-muted-foreground">{item.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{item.description}</p>
                </div>
                <div className="shrink-0 flex flex-col items-center gap-2">
                  <img src={item.image} alt={item.name} className="w-28 h-24 rounded-lg object-cover" loading="lazy" />
                  {qty === 0 ? (
                    <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary/5 font-semibold w-24" onClick={() => handleAdd(item)}>
                      <Plus className="w-3.5 h-3.5 mr-1" /> ADD
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2 bg-primary/5 rounded-lg px-2">
                      <button onClick={() => updateQuantity(item.id, qty - 1)} className="p-1 text-primary"><Minus className="w-4 h-4" /></button>
                      <span className="font-semibold text-primary min-w-[20px] text-center">{qty}</span>
                      <button onClick={() => updateQuantity(item.id, qty + 1)} className="p-1 text-primary"><Plus className="w-4 h-4" /></button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {items.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-lg z-40">
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <span className="font-semibold">{items.reduce((s, i) => s + i.quantity, 0)} items</span>
                <span className="text-muted-foreground">|</span>
                <span className="font-bold">₹{items.reduce((s, i) => s + i.price * i.quantity, 0)}</span>
              </div>
              <Link to="/cart">
                <Button className="gradient-primary text-primary-foreground shadow-primary-glow">View Cart</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
