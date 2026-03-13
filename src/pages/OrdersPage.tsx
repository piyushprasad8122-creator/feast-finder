import Navbar from "@/components/Navbar";
import { sampleOrders } from "@/data/mock";
import { Package, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const statusColors: Record<string, string> = {
  placed: "bg-info/10 text-info",
  preparing: "bg-warning/10 text-warning",
  out_for_delivery: "bg-primary/10 text-primary",
  delivered: "bg-success/10 text-success",
  cancelled: "bg-destructive/10 text-destructive",
};

const statusLabels: Record<string, string> = {
  placed: "Placed",
  preparing: "Preparing",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default function OrdersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1 max-w-3xl">
        <h1 className="font-display text-2xl font-bold mb-6">Your Orders</h1>
        <div className="space-y-4">
          {sampleOrders.map(order => (
            <Link to={`/order/${order.id}`} key={order.id} className="block bg-card rounded-xl border border-border p-4 hover:shadow-card transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-semibold">{order.restaurantName}</h3>
                    <p className="text-xs text-muted-foreground">{order.id} · {order.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[order.status]}`}>{statusLabels[order.status]}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
              <div className="text-sm text-muted-foreground">{order.items.map(i => `${i.name} × ${i.qty}`).join(", ")}</div>
              <div className="flex justify-between mt-2 text-sm"><span className="text-muted-foreground">{order.paymentMethod}</span><span className="font-semibold">₹{order.total}</span></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
