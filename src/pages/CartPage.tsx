import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import VegBadge from "@/components/VegBadge";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { coupons } from "@/data/mock";
import { motion } from "framer-motion";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, total, deliveryFee } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<typeof coupons[0] | null>(null);

  const discount = appliedCoupon ? Math.min(
    appliedCoupon.discount.includes("%") ? total * parseInt(appliedCoupon.discount) / 100 : parseInt(appliedCoupon.discount.replace(/[^0-9]/g, "")),
    appliedCoupon.maxDiscount
  ) : 0;
  const grandTotal = total + deliveryFee - discount;

  const applyCoupon = () => {
    const found = coupons.find(c => c.code === couponCode.toUpperCase());
    if (found && total >= found.minOrder) setAppliedCoupon(found);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <ShoppingBag className="w-16 h-16 text-muted-foreground/30" />
          <h2 className="font-display text-xl font-bold">Your cart is empty</h2>
          <p className="text-muted-foreground">Add items from a restaurant to get started</p>
          <Link to="/"><Button className="gradient-primary text-primary-foreground">Browse Restaurants</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl font-bold">Your Cart</h1>
          <Button variant="ghost" size="sm" className="text-destructive" onClick={clearCart}><Trash2 className="w-4 h-4 mr-1" />Clear</Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            {items.map(item => (
              <motion.div key={item.id} layout className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2"><VegBadge isVeg={item.isVeg} /><h3 className="font-semibold truncate">{item.name}</h3></div>
                  <p className="text-xs text-muted-foreground">{item.restaurantName}</p>
                  <p className="font-semibold mt-1">₹{item.price * item.quantity}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted"><Minus className="w-3.5 h-3.5" /></button>
                  <span className="w-6 text-center font-semibold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted"><Plus className="w-3.5 h-3.5" /></button>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="space-y-4">
            {/* Coupon */}
            <div className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-3"><Tag className="w-4 h-4 text-primary" /><h3 className="font-display font-semibold">Apply Coupon</h3></div>
              <div className="flex gap-2">
                <input type="text" placeholder="Enter code" value={couponCode} onChange={e => setCouponCode(e.target.value)} className="flex-1 h-10 px-3 rounded-lg border border-input bg-background text-sm" />
                <Button variant="outline" size="sm" onClick={applyCoupon}>Apply</Button>
              </div>
              {appliedCoupon && <p className="text-xs text-success mt-2">✓ {appliedCoupon.description}</p>}
              <div className="mt-3 space-y-2">
                {coupons.map(c => (
                  <button key={c.code} onClick={() => { setCouponCode(c.code); setAppliedCoupon(c); }}
                    className="w-full text-left p-2 rounded-lg border border-dashed border-border hover:border-primary/50 text-xs">
                    <span className="font-bold text-primary">{c.code}</span> — {c.description}
                  </button>
                ))}
              </div>
            </div>

            {/* Bill */}
            <div className="bg-card rounded-xl border border-border p-4 space-y-3">
              <h3 className="font-display font-semibold">Bill Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Item Total</span><span>₹{total}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Delivery Fee</span><span>{deliveryFee === 0 ? <span className="text-success">FREE</span> : `₹${deliveryFee}`}</span></div>
                {discount > 0 && <div className="flex justify-between text-success"><span>Discount</span><span>-₹{discount}</span></div>}
                <div className="border-t border-border pt-2 flex justify-between font-bold text-base">
                  <span>To Pay</span><span>₹{grandTotal}</span>
                </div>
              </div>
              <Button className="w-full h-12 gradient-primary text-primary-foreground font-semibold shadow-primary-glow" onClick={() => {
                if (!isAuthenticated) navigate("/login");
                else navigate("/checkout");
              }}>
                Proceed to Checkout <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
