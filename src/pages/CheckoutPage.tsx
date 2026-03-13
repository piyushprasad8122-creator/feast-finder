import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { MapPin, CreditCard, Banknote, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { items, total, deliveryFee, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");
  const [address, setAddress] = useState("");
  const [placed, setPlaced] = useState(false);

  if (placed) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 animate-fade-in">
          <CheckCircle className="w-20 h-20 text-success" />
          <h2 className="font-display text-2xl font-bold">Order Placed!</h2>
          <p className="text-muted-foreground">Your food is being prepared</p>
          <Button onClick={() => navigate("/orders")} className="gradient-primary text-primary-foreground">Track Order</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1 max-w-2xl">
        <h1 className="font-display text-2xl font-bold mb-6">Checkout</h1>

        {/* Address */}
        <div className="bg-card rounded-xl border border-border p-4 mb-4">
          <div className="flex items-center gap-2 mb-3"><MapPin className="w-4 h-4 text-primary" /><h3 className="font-display font-semibold">Delivery Address</h3></div>
          <textarea value={address} onChange={e => setAddress(e.target.value)} placeholder="Enter your full delivery address..." className="w-full h-24 p-3 rounded-lg border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <p className="text-xs text-muted-foreground mt-2">📍 Map selection would use MapTiler API in production</p>
        </div>

        {/* Payment */}
        <div className="bg-card rounded-xl border border-border p-4 mb-4">
          <h3 className="font-display font-semibold mb-3">Payment Method</h3>
          <div className="space-y-2">
            <button onClick={() => setPaymentMethod("online")}
              className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${paymentMethod === "online" ? "border-primary bg-primary/5" : "border-border"}`}>
              <CreditCard className="w-5 h-5 text-primary" />
              <div className="text-left"><p className="font-medium text-sm">Pay Online</p><p className="text-xs text-muted-foreground">Razorpay · Cards, UPI, Wallets</p></div>
            </button>
            <button onClick={() => setPaymentMethod("cod")}
              className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${paymentMethod === "cod" ? "border-primary bg-primary/5" : "border-border"}`}>
              <Banknote className="w-5 h-5 text-success" />
              <div className="text-left"><p className="font-medium text-sm">Cash on Delivery</p><p className="text-xs text-muted-foreground">Pay when your order arrives</p></div>
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-card rounded-xl border border-border p-4 mb-4">
          <h3 className="font-display font-semibold mb-3">Order Summary</h3>
          <div className="space-y-2 text-sm">
            {items.map(i => (
              <div key={i.id} className="flex justify-between"><span className="text-muted-foreground">{i.name} × {i.quantity}</span><span>₹{i.price * i.quantity}</span></div>
            ))}
            <div className="border-t border-border pt-2 flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span></div>
            <div className="flex justify-between font-bold text-base"><span>Total</span><span>₹{total + deliveryFee}</span></div>
          </div>
        </div>

        <Button className="w-full h-12 gradient-primary text-primary-foreground font-semibold shadow-primary-glow" disabled={!address.trim()}
          onClick={() => { setPlaced(true); clearCart(); }}>
          {paymentMethod === "online" ? "Pay & Place Order" : "Place Order (COD)"}
        </Button>
      </div>
    </div>
  );
}
