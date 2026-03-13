import { deliveryOrders } from "@/data/mock";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package, MapPin, Phone, IndianRupee, LogOut, CheckCircle, Clock, Navigation, Truck } from "lucide-react";
import { useState } from "react";

export default function DeliveryDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState(deliveryOrders);

  if (user?.role !== "delivery") {
    return <div className="min-h-screen flex items-center justify-center"><div className="text-center"><p className="text-muted-foreground mb-4">Delivery partner access required</p><Link to="/login"><Button>Login as Delivery Partner</Button></Link></div></div>;
  }

  const updateStatus = (id: string, status: "out_for_delivery" | "delivered") => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const totalEarnings = orders.filter(o => o.status === "delivered").reduce((s, o) => s + o.earnings, 0);

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm h-14 flex items-center px-6 justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center"><Truck className="w-4 h-4 text-primary-foreground" /></div>
          <span className="font-display font-bold">Delivery Hub</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{user.name}</span>
          <Button variant="ghost" size="icon" onClick={() => { logout(); navigate("/"); }}><LogOut className="w-4 h-4" /></Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <Package className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="font-display font-bold text-xl">{orders.length}</p>
            <p className="text-xs text-muted-foreground">Assigned</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <CheckCircle className="w-5 h-5 text-success mx-auto mb-1" />
            <p className="font-display font-bold text-xl">{orders.filter(o => o.status === "delivered").length}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <IndianRupee className="w-5 h-5 text-accent mx-auto mb-1" />
            <p className="font-display font-bold text-xl">₹{totalEarnings}</p>
            <p className="text-xs text-muted-foreground">Earnings</p>
          </div>
        </div>

        <h2 className="font-display text-xl font-bold mb-4">Active Orders</h2>
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{order.restaurantName}</h3>
                  <p className="text-xs text-muted-foreground">{order.id}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  order.status === "delivered" ? "bg-success/10 text-success" : order.status === "out_for_delivery" ? "bg-primary/10 text-primary" : "bg-warning/10 text-warning"
                }`}>
                  {order.status.replace(/_/g, " ")}
                </span>
              </div>

              <div className="space-y-2 text-sm mb-3">
                <div className="flex items-start gap-2"><Navigation className="w-4 h-4 text-accent shrink-0 mt-0.5" /><span><strong>Pickup:</strong> {order.pickupAddress}</span></div>
                <div className="flex items-start gap-2"><MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong>Drop:</strong> {order.address}</span></div>
                <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-muted-foreground" /><span>{order.customerName} · {order.customerPhone}</span></div>
              </div>

              <div className="bg-muted rounded-lg h-32 mb-3 flex items-center justify-center text-muted-foreground text-xs">
                📍 MapTiler pickup/drop route
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">Earnings: ₹{order.earnings}</span>
                <div className="flex gap-2">
                  {order.status === "placed" && (
                    <Button size="sm" className="gradient-primary text-primary-foreground" onClick={() => updateStatus(order.id, "out_for_delivery")}>Accept & Pickup</Button>
                  )}
                  {order.status === "out_for_delivery" && (
                    <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90" onClick={() => updateStatus(order.id, "delivered")}>Mark Delivered</Button>
                  )}
                  {order.status === "delivered" && (
                    <span className="text-success text-sm font-medium flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Completed</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
