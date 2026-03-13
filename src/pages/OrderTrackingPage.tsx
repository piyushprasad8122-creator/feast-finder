import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { sampleOrders } from "@/data/mock";
import { CheckCircle, Circle, Package, Truck, ChefHat, MapPin, Phone, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { key: "placed", label: "Order Placed", icon: Package },
  { key: "preparing", label: "Preparing", icon: ChefHat },
  { key: "out_for_delivery", label: "Out for Delivery", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle },
];

export default function OrderTrackingPage() {
  const { id } = useParams();
  const order = sampleOrders.find(o => o.id === id) || sampleOrders[0];
  const currentStepIdx = steps.findIndex(s => s.key === order.status);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1 max-w-2xl">
        <h1 className="font-display text-2xl font-bold mb-2">Order #{order.id}</h1>
        <p className="text-muted-foreground mb-8">{order.restaurantName} · {order.date}</p>

        {/* Progress tracker */}
        <div className="bg-card rounded-xl border border-border p-6 mb-6">
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, i) => {
              const done = i <= currentStepIdx;
              const Icon = step.icon;
              return (
                <div key={step.key} className="flex flex-col items-center flex-1 relative">
                  {i > 0 && <div className={`absolute top-5 right-1/2 w-full h-0.5 ${i <= currentStepIdx ? "bg-success" : "bg-border"}`} style={{ transform: "translateX(50%)", zIndex: 0 }} />}
                  <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${done ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"}`}>
                    {done ? <Icon className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                  </div>
                  <span className={`text-xs mt-2 text-center ${done ? "text-foreground font-medium" : "text-muted-foreground"}`}>{step.label}</span>
                </div>
              );
            })}
          </div>
          {order.status === "out_for_delivery" && (
            <div className="bg-primary/5 rounded-lg p-4 text-sm">
              <p className="font-medium text-primary">🛵 Your delivery partner is on the way!</p>
              <p className="text-muted-foreground mt-1">Estimated arrival: 10-15 minutes</p>
              <div className="mt-3 bg-muted rounded-lg h-40 flex items-center justify-center text-muted-foreground text-xs">
                📍 MapTiler live tracking would appear here
              </div>
            </div>
          )}
        </div>

        {/* Order details */}
        <div className="bg-card rounded-xl border border-border p-4 mb-4">
          <h3 className="font-display font-semibold mb-3">Items</h3>
          <div className="space-y-2">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm"><span>{item.name} × {item.qty}</span><span>₹{item.price * item.qty}</span></div>
            ))}
            <div className="border-t border-border pt-2 flex justify-between font-bold"><span>Total</span><span>₹{order.total}</span></div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-4 mb-4 space-y-2 text-sm">
          <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /><span>{order.address}</span></div>
          {order.deliveryPartner && <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-muted-foreground" /><span>Delivery: {order.deliveryPartner}</span></div>}
        </div>

        <Button variant="outline" className="w-full gap-2"><FileText className="w-4 h-4" /> Download Invoice</Button>
      </div>
    </div>
  );
}
